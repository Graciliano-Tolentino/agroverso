/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/pages/ContatoPage.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 08/05/2025
  📝 Descrição:
     Página de contato institucional do Agroverso.
     Permite envio de mensagens com validação, acessibilidade
     e visual refinado. Preparada para integração real via API ou Formspree.
     Desenvolvida com sabedoria, força e beleza – padrão Agroverso High Tech.
  ============================================
*/

import React, { useState } from 'react';

export default function ContatoPage() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    const { nome, email, mensagem } = form;

    // 🔍 Validação básica
    if (!nome || !email || !mensagem) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    // 📧 Validação simples de e-mail (HTML5 também cobre)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro('E-mail inválido. Verifique o endereço digitado.');
      return;
    }

    setEnviando(true);

    try {
      // ✉️ Simulação de envio (substituir por integração real)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // ✅ Envio bem-sucedido
      setSucesso('Mensagem enviada com sucesso! Em breve entraremos em contato.');
      setForm({ nome: '', email: '', mensagem: '' });
    } catch (err) {
      // ❌ Erro ao enviar
      setErro('Não foi possível enviar a mensagem. Tente novamente mais tarde.');
    } finally {
      setEnviando(false);
    }
  };
  return (
    <section
      className="max-w-2xl mx-auto px-6 py-20 font-opensans"
      aria-labelledby="titulo-contato"
    >
      <h2
        id="titulo-contato"
        className="text-3xl font-montserrat font-bold text-grayIntelligent mb-6 text-center"
      >
        📬 Fale Conosco
      </h2>

      <p className="text-center text-gray-600 text-sm mb-10">
        Entre em contato para dúvidas, sugestões ou parcerias. Teremos alegria em te responder.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label htmlFor="nome" className="block text-sm mb-1">
            Nome completo
          </label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Seu nome"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-greenRegenerative text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@exemplo.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-greenRegenerative text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="mensagem" className="block text-sm mb-1">
            Mensagem
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            placeholder="Escreva sua mensagem..."
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-greenRegenerative text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className={`w-full font-semibold px-6 py-3 rounded-lg transition duration-200 ${
            enviando
              ? 'bg-green-400 cursor-not-allowed text-white'
              : 'bg-greenRegenerative hover:bg-green-600 text-white'
          }`}
          aria-busy={enviando}
        >
          {enviando ? 'Enviando...' : 'Enviar mensagem'}
        </button>
      </form>
      {/* 🔔 Mensagens de retorno */}
      <div aria-live="polite" className="mt-6 text-center">
        {sucesso && (
          <p className="text-sm text-greenRegenerative font-medium">
            ✅ {sucesso}
          </p>
        )}
        {erro && (
          <p className="text-sm text-red-600 font-medium">
            ⚠️ {erro}
          </p>
        )}
      </div>
    </section>
  );
}

/*
  ============================================
  🔚 Fim do arquivo src/pages/ContatoPage.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
