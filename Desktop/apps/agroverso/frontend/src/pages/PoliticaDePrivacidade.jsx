/*
  ===================================================================
  📄 PoliticaDePrivacidade.jsx | Agroverso – Página de Privacidade
  📁 Diretório: src/pages/
  🎯 Finalidade:
      Exibir com clareza os critérios de coleta, uso, proteção e direitos
      dos usuários em relação aos dados pessoais, conforme a LGPD.
  🧭 Justificativa:
      Arquivo existente que agora precisa ser registrado na rota
      `/politica-de-privacidade` no AppRoutes.jsx para funcionar corretamente.
  ⚖️ Relevância:
      Essencial para conformidade legal, integridade institucional e
      transparência com o usuário final.
  🌟 Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
  ===================================================================
*/
import React from 'react';

export default function PoliticaDePrivacidade() {
  return (
    <section
      className="max-w-4xl mx-auto px-6 py-16 font-opensans leading-relaxed text-gray-800"
      aria-labelledby="titulo-politica"
    >
      <h1
        id="titulo-politica"
        className="text-3xl font-montserrat font-bold text-center mb-8 text-grayIntelligent"
      >
        Política de Privacidade
      </h1>

      <p className="mb-6">
        A presente Política de Privacidade tem como objetivo informar aos usuários da plataforma Agroverso
        sobre as práticas de coleta, uso, armazenamento e proteção de dados pessoais, em conformidade com
        a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
      </p>

      <div className="space-y-6 text-justify">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Consentimento</h2>
          <p>
            Ao utilizar a plataforma Agroverso, o usuário manifesta seu consentimento livre, informado e inequívoco
            para o tratamento de seus dados pessoais conforme as finalidades descritas nesta política.
            O usuário pode, a qualquer momento, revogar seu consentimento mediante solicitação formal.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Dados Coletados</h2>
          <p>
            Os dados coletados podem incluir: nome, e-mail, telefone, localização geográfica, dados de
            navegação e preferências de uso da plataforma. Tais informações são obtidas via formulários,
            cookies e ferramentas de análise para oferecer uma experiência personalizada e segura.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Finalidade do Uso de Dados</h2>
          <p>
            Os dados são utilizados para autenticação, comunicações, melhorias na plataforma, atendimento,
            emissão de certificados e cumprimento de obrigações legais.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Compartilhamento de Dados</h2>
          <p>
            O Agroverso não compartilha dados com terceiros, salvo em casos essenciais ao funcionamento
            da plataforma, exigência legal ou consentimento expresso do usuário.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Cookies e Tecnologias</h2>
          <p>
            Utilizamos cookies para melhorar sua navegação e personalizar conteúdos. O controle pode ser
            feito diretamente no navegador do usuário.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">6. Segurança da Informação</h2>
          <p>
            Implementamos medidas técnicas e organizacionais para proteger os dados pessoais
            contra acessos indevidos, perda ou vazamento. A equipe tem acesso restrito e monitorado.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">7. Retenção de Dados</h2>
          <p>
            Os dados são mantidos apenas pelo tempo necessário às finalidades descritas, respeitando
            obrigações legais. Após esse período, são eliminados ou anonimizados de forma segura.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">8. Direitos do Usuário</h2>
          <p>
            O usuário pode acessar, corrigir, atualizar ou solicitar exclusão de seus dados pessoais
            a qualquer momento, via contato institucional.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">9. Contato</h2>
          <p>
            Dúvidas, sugestões ou solicitações sobre esta Política podem ser enviadas para:
            <a
              href="mailto:privacidade@agroverso.tec.br"
              className="text-blue-600 underline ml-1"
            >
              privacidade@agroverso.tec.br
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
/*
  ===================================================================
  🔚 Fim do Componente: PoliticaDePrivacidade.jsx
  ⚖️ Página oficial de transparência e conformidade com a LGPD
  🛡️ Redigida com base em práticas legais e integridade institucional
  ♿ Acessível, responsiva e semanticamente estruturada para leitura digital
  🧠 Mantenedor: Equipe Agroverso | https://agroverso.tec.br
  📆 Última atualização: 10/05/2025
  ===================================================================
*/
