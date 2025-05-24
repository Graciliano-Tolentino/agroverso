/**
 * Author: [Seu Nome ou Equipe Agroverso]
 * Date: 10/05/2025
 * Description: Componente de Certificado Agroverso em React.
 *              Exibe um certificado institucional com layout responsivo,
 *              usando fontes e cores oficiais (opensans, roboto, montserrat, greenRegenerative etc.).
 * Standard: High Tech Agroverso
 */

import React from 'react';

const Certificado = () => {
  return (
    <article className="max-w-4xl mx-auto bg-white border-4 border-greenRegenerative p-8 md:p-12">
      {/* Cabeçalho: Logos e Título */}
      <header className="flex items-center justify-between">
        <img 
          src="/assets/images/logo-agroverso.png" 
          alt="Logo Agroverso" 
          className="h-16 w-auto" 
          loading="lazy" 
        />
        <h1 className="text-3xl md:text-4xl font-montserrat text-center text-black flex-grow">
          CERTIFICADO
        </h1>
        <img 
          src="/assets/images/logo-parceiro.png" 
          alt="Logo Parceiro" 
          className="h-16 w-auto" 
          loading="lazy" 
        />
      </header>

      {/* Corpo do Certificado: Nome, curso, texto de conclusão */}
      <section className="mt-8 text-center">
        <p className="text-lg font-roboto text-gray-800">
          Certificamos que
        </p>
        <p className="text-2xl font-montserrat text-black mt-4">
          [NOME COMPLETO DO PARTICIPANTE]
        </p>
        <p className="text-lg font-roboto text-gray-800 mt-4">
          concluiu o curso <strong>[NOME DO CURSO]</strong> com êxito,
          totalizando [X] horas de carga horária, em [DATA DE CONCLUSÃO].
        </p>
      </section>

      {/* Rodapé: Assinaturas e Selo */}
      <footer className="mt-10 flex flex-col md:flex-row items-center justify-between">
        {/* Assinatura 1 */}
        <div className="text-center mb-8 md:mb-0">
          <img 
            src="/assets/images/assinatura1.png" 
            alt="Assinatura de [Autoridade 1]" 
            className="h-20 w-auto mx-auto" 
            loading="lazy" 
          />
          <p className="mt-2 font-opensans text-black">
            [Nome Autoridade 1]
          </p>
          <p className="text-sm font-opensans text-gray-700">
            [Cargo Autoridade 1]
          </p>
        </div>
        {/* Assinatura 2 */}
        <div className="text-center mb-8 md:mb-0">
          <img 
            src="/assets/images/assinatura2.png" 
            alt="Assinatura de [Autoridade 2]" 
            className="h-20 w-auto mx-auto" 
            loading="lazy" 
          />
          <p className="mt-2 font-opensans text-black">
            [Nome Autoridade 2]
          </p>
          <p className="text-sm font-opensans text-gray-700">
            [Cargo Autoridade 2]
          </p>
        </div>
        {/* Selo de autenticidade */}
        <div className="text-center">
          <img 
            src="/assets/images/selo-autenticidade.png" 
            alt="Selo de Autenticidade Agroverso" 
            className="h-16 w-auto mx-auto" 
            loading="lazy" 
          />
          <p className="mt-2 font-opensans text-sm text-gray-700">
            Selo de Autenticidade
          </p>
        </div>
      </footer>
    </article>
  );
};

export default Certificado;

/* End of Certificado.jsx - High Tech Agroverso standard */
/**
 * Author: [Seu Nome ou Equipe Agroverso]
 * Date: 10/05/2025
 * Description: Componente de Certificado Agroverso em React.
 *              Exibe um certificado institucional com layout responsivo,
 *              usando fontes e cores oficiais (opensans, roboto, montserrat, greenRegenerative etc.).
 * Standard: High Tech Agroverso
 */

import React from 'react';

const Certificado = () => {
  return (
    <article className="max-w-4xl mx-auto bg-white border-4 border-greenRegenerative p-8 md:p-12">
      {/* Cabeçalho: Logos e Título */}
      <header className="flex items-center justify-between">
        <img 
          src="/assets/images/logo-agroverso.png" 
          alt="Logo Agroverso" 
          className="h-16 w-auto" 
          loading="lazy" 
        />
        <h1 className="text-3xl md:text-4xl font-montserrat text-center text-black flex-grow">
          CERTIFICADO
        </h1>
        <img 
          src="/assets/images/logo-parceiro.png" 
          alt="Logo Parceiro" 
          className="h-16 w-auto" 
          loading="lazy" 
        />
      </header>

      {/* Corpo do Certificado: Nome, curso, texto de conclusão */}
      <section className="mt-8 text-center">
        <p className="text-lg font-roboto text-gray-800">
          Certificamos que
        </p>
        <p className="text-2xl font-montserrat text-black mt-4">
          [NOME COMPLETO DO PARTICIPANTE]
        </p>
        <p className="text-lg font-roboto text-gray-800 mt-4">
          concluiu o curso <strong>[NOME DO CURSO]</strong> com êxito,
          totalizando [X] horas de carga horária, em [DATA DE CONCLUSÃO].
        </p>
      </section>

      {/* Rodapé: Assinaturas e Selo */}
      <footer className="mt-10 flex flex-col md:flex-row items-center justify-between">
        {/* Assinatura 1 */}
        <div className="text-center mb-8 md:mb-0">
          <img 
            src="/assets/images/assinatura1.png" 
            alt="Assinatura de [Autoridade 1]" 
            className="h-20 w-auto mx-auto" 
            loading="lazy" 
          />
          <p className="mt-2 font-opensans text-black">
            [Nome Autoridade 1]
          </p>
          <p className="text-sm font-opensans text-gray-700">
            [Cargo Autoridade 1]
          </p>
        </div>
        {/* Assinatura 2 */}
        <div className="text-center mb-8 md:mb-0">
          <img 
            src="/assets/images/assinatura2.png" 
            alt="Assinatura de [Autoridade 2]" 
            className="h-20 w-auto mx-auto" 
            loading="lazy" 
          />
          <p className="mt-2 font-opensans text-black">
            [Nome Autoridade 2]
          </p>
          <p className="text-sm font-opensans text-gray-700">
            [Cargo Autoridade 2]
          </p>
        </div>
        {/* Selo de autenticidade */}
        <div className="text-center">
          <img 
            src="/assets/images/selo-autenticidade.png" 
            alt="Selo de Autenticidade Agroverso" 
            className="h-16 w-auto mx-auto" 
            loading="lazy" 
          />
          <p className="mt-2 font-opensans text-sm text-gray-700">
            Selo de Autenticidade
          </p>
        </div>
      </footer>
    </article>
  );
};

export default Certificado;

/* End of Certificado.jsx - High Tech Agroverso standard */
