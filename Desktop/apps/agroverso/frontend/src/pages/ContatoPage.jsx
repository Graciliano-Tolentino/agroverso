/*
  ===================================================================
  📄 ContatoPage.jsx | Agroverso – Página Institucional de Contato
  📁 Diretório: src/pages/
  🎯 Finalidade:
      Permitir que usuários entrem em contato com o Agroverso de forma acessível,
      validada e visualmente refinada. Preparado para integração futura via API.
  🧭 Justificativa:
      Arquivo renomeado de Contato.jsx para ContatoPage.jsx, alinhando à convenção
      adotada para componentes de página da aplicação (HomePage, LoginPage, etc.).
  🌟 Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
  ===================================================================
*/
import React, { useState } from 'react';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';

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

    if (!nome || !email || !mensagem) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro('E-mail inválido. Verifique o endereço digitado.');
      return;
    }

    setEnviando(true);

    try {
      // ✉️ Simulação de envio (substituir por integração real futura)
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSucesso('Mensagem enviada com sucesso! Em breve entraremos em contato.');
      setForm({ nome: '', email: '', mensagem: '' });
    } catch (err) {
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
        <FormInput
          label="Nome completo"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <FormInput
          label="E-mail"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Mensagem"
          name="mensagem"
          textarea
          value={form.mensagem}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          disabled={enviando}
          ariaLabel="Enviar mensagem de contato"
        >
          {enviando ? 'Enviando...' : 'Enviar mensagem'}
        </Button>
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
  ===================================================================
  🔚 Fim do Componente: ContatoPage.jsx
  📬 Formulário institucional acessível, validado e estilizado
  🧩 Integrado com componentes reutilizáveis FormInput e Button
  🛡️ Preparado para integração futura com backend/API (Formspree, SMTP, etc.)
  🎨 Visual harmônico e responsivo com base no Design System Agroverso
  🧠 Mantenedor: Equipe Agroverso | https://agroverso.tec.br
  📆 Última atualização: 10/05/2025
  ===================================================================
*/
