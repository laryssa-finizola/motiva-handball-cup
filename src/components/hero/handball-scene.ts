// Cena 3D da bola de handebol da hero.
// A bola é um icosaedro truncado (12 pentágonos + 20 hexágonos), como as bolas
// de handebol de verdade. Cada painel é uma peça separada: o ponteiro empurra os
// painéis próximos para fora e uma mola os traz de volta. A bola inteira quica.
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export type HandballSceneOptions = {
  hexColor?: string
  pentColor?: string
  logoColor?: string
  logoTextColor?: string
  seamColor?: string
  logoText?: string
  logoFont?: string
  reducedMotion?: boolean
}

const R = 1 // raio da bola
const INSET = 0.075 // largura da costura entre painéis (fração do painel)
const PILLOW = 0.035 // quanto a borda do painel afunda (efeito "almofadado")
const THICK = 0.14 // espessura do painel
const FLOOR_Y = -1.35
const BOUNCE_H = 0.85
const BOUNCE_T = 1.15 // segundos por quique

type Tile = {
  mesh: THREE.Mesh
  normal: THREE.Vector3
  rest: THREE.Vector3
  disp: number
  vel: number
  tiltAxis: THREE.Vector3
  tilt: number
  tiltVel: number
}

// ---------- geometria ----------

function icosahedron() {
  const t = (1 + Math.sqrt(5)) / 2
  const v = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map(([x, y, z]) => new THREE.Vector3(x, y, z))
  const f = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ]
  return { v, f }
}

function sortAround(points: THREE.Vector3[], n: THREE.Vector3) {
  const u = new THREE.Vector3().subVectors(points[0], n.clone().multiplyScalar(points[0].dot(n))).normalize()
  const w = new THREE.Vector3().crossVectors(n, u)
  return points
    .map((p) => ({ p, a: Math.atan2(p.dot(w), p.dot(u)) }))
    .sort((a, b) => a.a - b.a)
    .map((o) => o.p)
}

/** Polígonos do icosaedro truncado: 12 pentágonos e 20 hexágonos. */
function truncatedIcosahedronFaces() {
  const { v, f } = icosahedron()
  const third = (a: THREE.Vector3, b: THREE.Vector3) => a.clone().lerp(b, 1 / 3)
  const neighbors: number[][] = v.map(() => [])
  for (const [a, b, c] of f) {
    for (const [x, y] of [[a, b], [b, c], [c, a]]) {
      if (!neighbors[x].includes(y)) neighbors[x].push(y)
      if (!neighbors[y].includes(x)) neighbors[y].push(x)
    }
  }
  const faces: { corners: THREE.Vector3[]; pent: boolean }[] = []
  v.forEach((a, i) => {
    const n = a.clone().normalize()
    faces.push({ corners: sortAround(neighbors[i].map((j) => third(a, v[j])), n), pent: true })
  })
  for (const [ia, ib, ic] of f) {
    const a = v[ia], b = v[ib], c = v[ic]
    const pts = [third(a, b), third(a, c), third(b, a), third(b, c), third(c, a), third(c, b)]
    const n = a.clone().add(b).add(c).normalize()
    faces.push({ corners: sortAround(pts, n), pent: false })
  }
  return faces
}

/** Painel almofadado com espessura, construído no espaço da bola e centralizado no painel. */
function tileGeometry(cornersRaw: THREE.Vector3[]) {
  const center = cornersRaw.reduce((s, p) => s.add(p), new THREE.Vector3()).divideScalar(cornersRaw.length)
  const n = center.clone().normalize()
  const u = cornersRaw[0].clone().sub(center).normalize()
  const w = new THREE.Vector3().crossVectors(n, u)
  const circum = cornersRaw[0].distanceTo(center)

  const S = 7 // anéis do centro até a borda
  const E = 6 // subdivisões de cada aresta
  const m = cornersRaw.length
  const pos: number[] = []
  const uv: number[] = []
  const idx: number[] = []

  const surfacePoint = (s: number, k: number, e: number, radiusScale = 1) => {
    const a = cornersRaw[k]
    const b = cornersRaw[(k + 1) % m]
    const edge = a.clone().lerp(b, e / E)
    const t = (s / S) * (1 - INSET)
    const flat = center.clone().lerp(edge, t)
    const local = flat.clone().sub(center)
    const edgeness = s / S
    const drop = PILLOW * Math.pow(THREE.MathUtils.smoothstep(edgeness, 0.55, 1), 2)
    const p = flat.normalize().multiplyScalar((R - drop) * radiusScale)
    return { p, uu: local.dot(u) / (2 * circum) + 0.5, vv: local.dot(w) / (2 * circum) + 0.5 }
  }

  // superfície externa
  for (let k = 0; k < m; k++) {
    const base = pos.length / 3
    for (let s = 0; s <= S; s++) {
      for (let e = 0; e <= E; e++) {
        const { p, uu, vv } = surfacePoint(s, k, e)
        pos.push(p.x, p.y, p.z)
        uv.push(uu, vv)
      }
    }
    for (let s = 0; s < S; s++) {
      for (let e = 0; e < E; e++) {
        const a = base + s * (E + 1) + e
        const b = a + 1
        const c = a + (E + 1)
        const d = c + 1
        idx.push(a, c, b, b, c, d)
      }
    }
  }

  // laterais e fundo (aparecem quando o painel se solta)
  const inner = 1 - THICK
  const ring: THREE.Vector3[] = []
  for (let k = 0; k < m; k++) for (let e = 0; e < E; e++) ring.push(surfacePoint(S, k, e).p)
  const sideBase = pos.length / 3
  ring.forEach((p) => {
    const q = p.clone().normalize().multiplyScalar(R * inner)
    pos.push(p.x, p.y, p.z, q.x, q.y, q.z)
    uv.push(0, 0, 0, 0)
  })
  for (let i = 0; i < ring.length; i++) {
    const j = (i + 1) % ring.length
    const a = sideBase + i * 2, b = a + 1, c = sideBase + j * 2, d = c + 1
    idx.push(a, b, c, c, b, d)
  }
  const backCenter = pos.length / 3
  const bc = n.clone().multiplyScalar(R * inner)
  pos.push(bc.x, bc.y, bc.z)
  uv.push(0, 0)
  for (let i = 0; i < ring.length; i++) {
    const j = (i + 1) % ring.length
    idx.push(backCenter, sideBase + j * 2 + 1, sideBase + i * 2 + 1)
  }

  let g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))
  g.setIndex(idx)
  g = mergeVertices(g, 1e-5)
  g.computeVertexNormals()
  const rest = n.clone().multiplyScalar(R)
  g.translate(-rest.x, -rest.y, -rest.z)
  return { geometry: g, normal: n, rest }
}

// ---------- texturas ----------

function gripTexture() {
  // relevo de "grip" das bolas de handebol: pontinhos em alto relevo
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, 256, 256)
  let seed = 7
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  for (let i = 0; i < 900; i++) {
    const x = rnd() * 256, y = rnd() * 256, r = 2 + rnd() * 3
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, 'rgba(255,255,255,0.9)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(3, 3)
  return t
}

function logoTexture(bg: string, fg: string, text: string, font: string) {
  const c = document.createElement('canvas')
  c.width = c.height = 512
  const ctx = c.getContext('2d')!
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 512, 512)
  ctx.fillStyle = fg
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  let size = 150
  ctx.font = `${size}px ${font}`
  while (ctx.measureText(text).width > 300 && size > 40) {
    size -= 4
    ctx.font = `${size}px ${font}`
  }
  ctx.fillText(text, 256, 262)
  ctx.font = `600 26px ${font}`
  ctx.fillText('COPA · HANDEBOL', 256, 262 + size * 0.62)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

function shadowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(0,0,0,0.85)')
  g.addColorStop(0.5, 'rgba(0,0,0,0.35)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

// ---------- cena ----------

export function createHandballScene(container: HTMLElement, opts: HandballSceneOptions = {}) {
  const {
    hexColor = '#F57C00',
    pentColor = '#0D47A1',
    logoColor = '#F4F2EE',
    logoTextColor = '#1a2a45',
    seamColor = '#0b1220',
    logoText = 'MOTIVA',
    logoFont = 'Impact, "Arial Black", sans-serif',
    reducedMotion = false,
  } = opts

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  // Neutral mantém o laranja e o azul da marca saturados (ACES lavava as cores)
  renderer.toneMapping = THREE.NeutralToneMapping
  renderer.toneMappingExposure = 1
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
  camera.position.set(0, 0.25, 7.2)
  camera.lookAt(0, -0.05, 0)

  // luzes: chave branca + recortes laranja e azul para casar com a marca
  scene.add(new THREE.HemisphereLight(0xffffff, 0x1a2a45, 0.35))
  const key = new THREE.DirectionalLight(0xffffff, 1.8)
  key.position.set(3, 4, 5)
  scene.add(key)
  const rimA = new THREE.DirectionalLight(0xff8a1f, 1.6)
  rimA.position.set(-4, 1.5, -3)
  scene.add(rimA)
  const rimB = new THREE.DirectionalLight(0x4f8cff, 1.2)
  rimB.position.set(4, -2, -3)
  scene.add(rimB)

  // grupo do quique (posição + achatamento) > grupo de rotação > painéis
  const bounce = new THREE.Group()
  const spin = new THREE.Group()
  bounce.add(spin)
  scene.add(bounce)

  const grip = gripTexture()
  const logoMap = logoTexture(logoColor, logoTextColor, logoText, logoFont)
  const matBase = {
    roughness: 0.5,
    clearcoat: 0.4,
    clearcoatRoughness: 0.4,
    envMapIntensity: 0.45, // reflexo moderado para a cor não ficar desbotada
    bumpMap: grip,
    bumpScale: 0.6,
  }
  const hexMat = new THREE.MeshPhysicalMaterial({ color: hexColor, ...matBase })
  const pentMat = new THREE.MeshPhysicalMaterial({ color: pentColor, ...matBase })
  const logoMat = new THREE.MeshPhysicalMaterial({ map: logoMap, ...matBase, bumpScale: 0.3 })

  // núcleo escuro: é o que aparece nas costuras e quando os painéis se abrem
  const coreGeo = new THREE.SphereGeometry(R * (1 - THICK * 0.6), 48, 32)
  const coreMat = new THREE.MeshStandardMaterial({ color: seamColor, roughness: 0.9 })
  spin.add(new THREE.Mesh(coreGeo, coreMat))

  // dois hexágonos opostos levam o logo, de frente para a câmera no início
  const faces = truncatedIcosahedronFaces()
  const front = new THREE.Vector3(0, 0, 1)
  let logoA = -1
  let best = -2
  faces.forEach((f, i) => {
    if (f.pent) return
    const c = f.corners.reduce((s, p) => s.add(p), new THREE.Vector3()).normalize()
    const d = c.dot(front)
    if (d > best) { best = d; logoA = i }
  })

  const logoNormal = faces[logoA].corners.reduce((s, p) => s.add(p), new THREE.Vector3()).normalize()

  const tiles: Tile[] = []
  const geometries: THREE.BufferGeometry[] = [coreGeo]
  faces.forEach((f, i) => {
    const { geometry, normal, rest } = tileGeometry(f.corners)
    geometries.push(geometry)
    // o logo vai no hexágono da frente e no seu oposto
    const isLogo = i === logoA || (!f.pent && normal.dot(logoNormal) < -0.999)
    const mesh = new THREE.Mesh(geometry, f.pent ? pentMat : isLogo ? logoMat : hexMat)
    mesh.position.copy(rest)
    spin.add(mesh)
    tiles.push({ mesh, normal, rest, disp: 0, vel: 0, tiltAxis: new THREE.Vector3(1, 0, 0), tilt: 0, tiltVel: 0 })
  })

  // inclina a bola para o logo aparecer levemente de lado
  spin.rotation.set(0.25, -0.35, 0.05)

  // esfera invisível para detectar o ponteiro
  const hitSphere = new THREE.Mesh(new THREE.SphereGeometry(R * 1.05, 24, 16), new THREE.MeshBasicMaterial({ visible: false }))
  spin.add(hitSphere)
  geometries.push(hitSphere.geometry)

  // sombra no chão
  const shadowMap = shadowTexture()
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowMap, transparent: true, depthWrite: false })
  const shadowGeo = new THREE.PlaneGeometry(2.6, 2.6)
  geometries.push(shadowGeo)
  const shadow = new THREE.Mesh(shadowGeo, shadowMat)
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = FLOOR_Y
  scene.add(shadow)

  // ---------- ponteiro ----------
  const raycaster = new THREE.Raycaster()
  const ndc = new THREE.Vector2()
  let pointerInside = false
  let lastX = 0, lastY = 0, hasLast = false
  const swing = new THREE.Vector2() // velocidade angular vinda do movimento do ponteiro
  const hitDir = new THREE.Vector3()
  let hovering = false

  const onMove = (e: PointerEvent) => {
    const r = renderer.domElement.getBoundingClientRect()
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    pointerInside = true
    if (hasLast) {
      swing.x += (e.clientY - lastY) * 0.0035
      swing.y += (e.clientX - lastX) * 0.0035
    }
    lastX = e.clientX; lastY = e.clientY; hasLast = true
  }
  const onLeave = () => { pointerInside = false; hasLast = false }
  const onDown = (e: PointerEvent) => {
    onMove(e)
    // clique/toque: estoura todos os painéis para fora
    tiles.forEach((t) => { t.vel += 5 + Math.random() * 2.5; t.tiltVel += (Math.random() - 0.5) * 8 })
  }
  renderer.domElement.addEventListener('pointermove', onMove)
  renderer.domElement.addEventListener('pointerleave', onLeave)
  renderer.domElement.addEventListener('pointerdown', onDown)

  // ---------- tamanho ----------
  const resize = () => {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // em telas estreitas, afasta a câmera para a bola caber inteira
    camera.position.z = w / h < 0.8 ? 7.2 / Math.max(w / h / 0.8, 0.6) : 7.2
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(container)
  resize()

  // ---------- loop ----------
  let visible = true
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
  io.observe(container)

  const clock = new THREE.Clock()
  let elapsed = 0
  let raf = 0
  const tmpQ = new THREE.Quaternion()
  const PUSH = 0.55 // quanto os painéis saem sob o ponteiro
  const K = 140, C = 13 // mola e amortecimento dos painéis

  const tick = () => {
    raf = requestAnimationFrame(tick)
    if (!visible || document.hidden) { clock.getDelta(); return }
    const dt = Math.min(clock.getDelta(), 1 / 30)
    elapsed += dt

    // quique: parábola + achatamento no contato com o chão
    let y = FLOOR_Y + R
    let squash = 0
    if (!reducedMotion) {
      const phase = (elapsed % BOUNCE_T) / BOUNCE_T
      y += BOUNCE_H * 4 * phase * (1 - phase)
      squash = Math.max(0, 1 - Math.min(phase, 1 - phase) / 0.07)
    } else {
      y += BOUNCE_H * 0.5
    }
    bounce.position.y = y - squash * 0.09
    bounce.scale.set(1 + squash * 0.08, 1 - squash * 0.12, 1 + squash * 0.08)
    const heightRatio = (y - FLOOR_Y - R) / BOUNCE_H
    shadow.scale.setScalar(1.05 - heightRatio * 0.4 + squash * 0.08)
    shadowMat.opacity = 0.75 - heightRatio * 0.45

    // giro: rotação base + balanço do ponteiro que decai
    swing.multiplyScalar(Math.pow(0.04, dt))
    const baseSpin = reducedMotion ? 0 : 0.35
    spin.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), (baseSpin + swing.y * 2.2) * dt)
    spin.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), swing.x * 2.2 * dt)

    // ponteiro sobre a bola?
    hovering = false
    if (pointerInside) {
      raycaster.setFromCamera(ndc, camera)
      const hit = raycaster.intersectObject(hitSphere, false)[0]
      if (hit) {
        hovering = true
        hitDir.copy(spin.worldToLocal(hit.point.clone())).normalize()
      }
    }
    renderer.domElement.style.cursor = hovering ? 'grab' : 'default'

    // molas dos painéis (com subpassos para ficar estável)
    const steps = 3
    const h = dt / steps
    for (const t of tiles) {
      let target = 0
      if (hovering) {
        const d = t.normal.dot(hitDir)
        const wgt = THREE.MathUtils.smoothstep(d, 0.55, 0.98)
        target = PUSH * wgt
        if (wgt > 0.001) {
          t.tiltAxis.crossVectors(t.normal, hitDir)
          if (t.tiltAxis.lengthSq() > 1e-6) t.tiltAxis.normalize()
        }
      }
      const tiltTarget = target * 0.9
      for (let s = 0; s < steps; s++) {
        t.vel += (K * (target - t.disp) - C * t.vel) * h
        t.disp += t.vel * h
        t.tiltVel += (K * (tiltTarget - t.tilt) - C * t.tiltVel) * h
        t.tilt += t.tiltVel * h
      }
      if (t.disp < -0.05) { t.disp = -0.05; t.vel = Math.max(t.vel, 0) }
      t.mesh.position.copy(t.rest).addScaledVector(t.normal, t.disp)
      tmpQ.setFromAxisAngle(t.tiltAxis, -t.tilt * 0.6)
      t.mesh.quaternion.copy(tmpQ)
    }

    renderer.render(scene, camera)
  }
  tick()

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    renderer.domElement.removeEventListener('pointermove', onMove)
    renderer.domElement.removeEventListener('pointerleave', onLeave)
    renderer.domElement.removeEventListener('pointerdown', onDown)
    geometries.forEach((g) => g.dispose())
    ;[hexMat, pentMat, logoMat, coreMat, shadowMat, hitSphere.material as THREE.Material].forEach((m) => m.dispose())
    ;[grip, logoMap, shadowMap, envTex].forEach((t) => t.dispose())
    pmrem.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}
