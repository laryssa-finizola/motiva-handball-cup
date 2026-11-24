'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  className?: string
  /** Seletor de um elemento que já usa a fonte do título, para o logo da bola usar a mesma fonte. */
  fontSourceSelector?: string
}

/**
 * Bola de handebol 3D interativa (three.js).
 * O three.js só é baixado no navegador, depois que a página carrega.
 */
export function HandballBall({ className, fontSourceSelector }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let dispose: (() => void) | undefined
    let cancelled = false

    const canWebGL = (() => {
      try {
        const c = document.createElement('canvas')
        return !!(c.getContext('webgl2') || c.getContext('webgl'))
      } catch {
        return false
      }
    })()
    if (!canWebGL) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fontEl = fontSourceSelector ? document.querySelector(fontSourceSelector) : null
    const logoFont = fontEl ? getComputedStyle(fontEl).fontFamily : undefined

    const start = async () => {
      if (logoFont) {
        try { await document.fonts.load(`100px ${logoFont}`) } catch { /* usa a fonte reserva */ }
      }
      const { createHandballScene } = await import('./handball-scene')
      if (cancelled) return
      dispose = createHandballScene(el, { reducedMotion, logoFont })
      setReady(true)
    }
    start()

    return () => {
      cancelled = true
      dispose?.()
    }
  }, [fontSourceSelector])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`${className ?? ''} transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}
