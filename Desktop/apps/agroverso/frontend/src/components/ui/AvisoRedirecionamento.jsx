/*
  ==============================================================================
  📄 Componente: AvisoRedirecionamento v2.0
  📁 Caminho: src/components/ui/AvisoRedirecionamento.jsx
  ✍️ Autor: Graciliano Tolentino
  📆 Atualizado em: 21/05/2025
  🎯 Finalidade:
       Exibir mensagem empática com contagem regressiva para redirecionamento,
       respeitando acessibilidade, rastreabilidade e previsibilidade.

  ♿ Acessibilidade:
       • Suporte a leitores de tela com foco inicial e aria-live
       • Fallback <noscript> para redirecionamento sem JavaScript
       • Compatível com leitores braille digitais

  🔁 Funcionalidade:
       • Redirecionamento programado com timer visual e previsível
       • Customização completa de tempo, rota e mensagem
       • Integração com contexto seguro via react-router-dom

  🔐 Padrão Agroverso – Sabedoria, Força e Beleza no controle do tempo e da atenção
  ==============================================================================
*/

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const AvisoRedirecionamento = ({
  tempo = 3000,
  destino = '/',
  fallback = '/',
  mensagem = 'Redirecionando...',
}) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [contador, setContador] = useState(Math.ceil(tempo / 1000));

  // 🎯 Garantir foco visual e leitura automática
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  // ⏳ Atualização do contador visual por segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setContador((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔁 Redirecionamento programado
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(destino, { replace: true });
    }, tempo);
    return () => clearTimeout(timeout);
  }, [tempo, destino, navigate]);
  return (
    <div
      ref={containerRef}
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
      className="flex flex-col items-center justify-center min-h-screen px-4 bg-amber-50 text-amber-800"
    >
      <AlertTriangle
        className="text-amber-500 mb-4"
        size={48}
        aria-hidden="true"
      />
      <p className="text-lg font-semibold text-center max-w-md">{mensagem}</p>
      <p className="mt-2 text-sm italic">
        Você será redirecionado em {contador} segundo{contador > 1 ? 's' : ''}...
      </p>

      {/* 🔒 Redirecionamento seguro para navegadores sem JS */}
      <noscript>
        <meta httpEquiv="refresh" content={`5;url=${fallback}`} />
        <p className="mt-4 text-xs text-gray-600 italic">
          Redirecionamento automático via HTML ativado (JavaScript desativado).
        </p>
      </noscript>
    </div>
  );
};

AvisoRedirecionamento.propTypes = {
  /**
   * Tempo total até o redirecionamento automático (em milissegundos)
   */
  tempo: PropTypes.number,

  /**
   * Caminho de destino para onde o usuário será redirecionado
   */
  destino: PropTypes.string,

  /**
   * Rota alternativa para fallback <noscript>
   */
  fallback: PropTypes.string,

  /**
   * Mensagem visual principal que será exibida
   */
  mensagem: PropTypes.string,
};

export default AvisoRedirecionamento;

/*
  ==============================================================================
  🔚 Fim do componente AvisoRedirecionamento v2.0
  🧠 Blindagem emocional + previsibilidade UX + rastreabilidade em múltiplas camadas
  ♿ Compatível com screen readers, leitores braille, fallback HTML e timeout JS
  📊 Recomendado para fluxos de segurança, proteção por RBAC, validações assíncronas
  🌿 Agroverso — Arquitetura regenerativa com elegância de transição e empatia visual
  ==============================================================================
*/
