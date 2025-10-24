export default function SobrePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-brand-blue dark:text-brand-gold mb-6">
        Sobre a Copa Motiva
      </h1>
      <p className="text-lg">
        Aqui vamos contar a história do campeonato, sua missão, visão e valores.
        Também teremos links para:
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li>Inscrições</li>
        <li>Categorias</li>
        <li>Regulamento</li>
      </ul>
    </div>
  )
}