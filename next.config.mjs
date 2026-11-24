/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // As antigas páginas internas estavam vazias ou eram rascunhos. Para o Google,
  // páginas vazias pesam contra o site. Agora tudo vive na página inicial, e os
  // endereços antigos levam direto à seção certa (redirecionamento permanente).
  async redirects() {
    return [
      { source: '/sobre', destination: '/#sobre', permanent: true },
      { source: '/inscricao', destination: '/#inscricao', permanent: true },
      { source: '/edicoes-anteriores', destination: '/#edicoes-anteriores', permanent: true },
      { source: '/contato', destination: '/#contato', permanent: true },
    ]
  },
}

export default nextConfig
