/*
  ===================================================================
  📄 TermosDeUso.jsx | Agroverso – Termos de Uso da Plataforma
  📁 Diretório: src/pages/
  🎯 Finalidade:
      Informar claramente as condições de uso, responsabilidades legais,
      direitos autorais e regras de conduta para todos os usuários da plataforma.
   ⚖️ Relevância:
      Essencial para conformidade legal e clareza institucional junto aos usuários.
  🌟 Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
  ===================================================================
*/
import React from 'react';

export default function TermosDeUso() {
  return (
    <section
      className="max-w-4xl mx-auto px-6 py-16 font-opensans leading-relaxed text-gray-800"
      aria-labelledby="titulo-termos"
    >
      <h1
        id="titulo-termos"
        className="text-3xl font-montserrat font-bold text-center mb-8 text-grayIntelligent"
      >
        Termos de Uso
      </h1>

      <p className="mb-6">
        Este documento estabelece os termos e condições para utilização da plataforma Agroverso,
        acessível por meio do endereço <strong>https://agroverso.tec.br</strong>, administrado pelo
        Instituto Graciliana Maria da Conceição.
      </p>

      <div className="space-y-6 text-justify">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar ou utilizar os serviços do Agroverso, o usuário concorda integralmente com estes
            Termos de Uso e com a nossa Política de Privacidade. Caso não concorde, recomendamos não utilizar a plataforma.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Objetivo da Plataforma</h2>
          <p>
            O Agroverso disponibiliza ferramentas, conteúdos e soluções tecnológicas voltadas ao setor agro,
            promovendo sustentabilidade, inovação e conectividade entre produtores, técnicos e instituições.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Cadastro e Responsabilidades</h2>
          <p>
            Algumas funcionalidades exigem cadastro prévio. O usuário é responsável pela veracidade dos dados,
            confidencialidade das credenciais e conduta ética no uso da plataforma.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Propriedade Intelectual</h2>
          <p>
            Todos os conteúdos (textos, imagens, vídeos, código, marcas) são propriedade do Agroverso ou licenciados
            ao Instituto Graciliana Maria da Conceição. É proibida a reprodução ou uso indevido sem autorização formal.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Uso Indevido e Penalidades</h2>
          <p>
            Violações às normas, ataques à segurança ou conteúdos ilícitos podem acarretar em bloqueio de acesso,
            responsabilização civil e penal, além de medidas legais aplicáveis.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">6. Alterações nos Termos</h2>
          <p>
            Os Termos podem ser atualizados a qualquer momento. A continuidade de uso após mudanças indica aceitação tácita.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">7. Foro e Legislação</h2>
          <p>
            Estes termos são regidos pelas leis brasileiras. O foro competente será o da Comarca de Cotia – SP,
            com renúncia a qualquer outro por mais privilegiado que seja.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">8. Contato</h2>
          <p>
            Para dúvidas ou solicitações sobre estes Termos, entre em contato pelo e-mail:
            <a
              href="mailto:contato@agroverso.tec.br"
              className="text-blue-600 underline ml-1"
            >
              contato@agroverso.tec.br
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
/*
  ===================================================================
  🔚 Fim do Componente: TermosDeUso.jsx
  ⚖️ Documento institucional com fundamentos legais e cláusulas de uso
  🛡️ Estruturado para garantir clareza jurídica e transparência ao usuário
  ♿ Responsivo, acessível e semanticamente organizado para leitura web
  🧠 Mantenedor: Equipe Agroverso | https://agroverso.tec.br
  📆 Última atualização: 10/05/2025
  ===================================================================
*/
