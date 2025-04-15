// 📬 Contato.jsx – Comunicação Institucional Agroverso
import React, { useState } from 'react'

export default function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' })
  const [sucesso, setSucesso] = useState(null)
  const [erro, setErro] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.nome || !form.email || !form.mensagem) {
      setErro('Por favor, preencha todos os campos.')
      return
    }

    // ✅ Simulação de envio (substituir por fetch com backend ou Formspree)
    setSucesso('Mensagem enviada com sucesso! Em breve entraremos em contato.')
    setErro(null)
    setForm({ nome: '', email: '', mensagem: '' })
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-20 font-opensans">
      <h2 className="text-3xl font-montserrat font-bold text-grayIntelligent mb-6 text-center">
        Fale Conosco
      </h2>

      <p className="text-center text-gray-600 text-sm mb-10">
        Entre em contato para dúvidas, sugestões ou parcerias. Teremos alegria em te responder.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nome" className="block text-sm mb-1">Nome completo</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Seu nome"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-greenRegenerative text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@exemplo.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-greenRegenerative text-sm"
          />
        </div>

        <div>
          <label htmlFor="mensagem" className="block text-sm mb-1">Mensagem</label>
          <textarea
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            placeholder="Escreva sua mensagem..."
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-greenRegenerative text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-greenRegenerative text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Enviar mensagem
        </button>
      </form>

      {sucesso && <p className="mt-6 text-sm text-greenRegenerative text-center">{sucesso}</p>}
      {erro && <p className="mt-6 text-sm text-red-600 text-center">{erro}</p>}
    </section>
  )
}
