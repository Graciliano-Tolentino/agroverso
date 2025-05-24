/*
  ==============================================================================
  📄 PermissionMessage.jsx
  📁 src/components/ui
  ✍️ Desenvolvido por: Graciliano Tolentino
  📅 Atualizado em: 25/05/2025
  🎯 Mensagem visual contextual para quando uma seção do layout for ocultada

       • Exibe motivo técnico e explicação funcional
       • Suporte a i18n, cor, código e explicações amigáveis
       • Ideal para sistemas auditáveis, públicos ou administrativos

  🌍 Framework Agroverso — Transparência visual com sabedoria, força e beleza
  ==============================================================================
*/

import React from 'react';
import { DECISION_REASONS } from '@/constants/DECISION_REASONS';
import { useTranslation } from 'react-i18next';

/**
 * @param {Object} props
 * @param {Object} props.sectionData - Objeto retornado por `buildLayoutView().layout[section]`
 * @returns {JSX.Element|null}
 */
export const PermissionMessage = ({ sectionData }) => {
  const { t } = useTranslation();

  if (!sectionData || sectionData.visible) return null;

  const { section, message, code, reason, i18nKey } = sectionData;

  // Define cor visual mínima (padrão futuro: criticidade por código)
  const colorMap = {
    'L001': 'bg-red-100 border-red-400 text-red-700',
    'L002': 'bg-yellow-100 border-yellow-400 text-yellow-800',
    'L003': 'bg-gray-100 border-gray-400 text-gray-700',
  };

  const style = colorMap[code] || 'bg-gray-100 border-gray-400 text-gray-800';

  return (
    <div
      className={`border-l-4 p-4 mb-4 rounded ${style}`}
      role="alert"
      aria-live="polite"
      aria-label={t(i18nKey)}
    >
      <p className="text-sm font-semibold">{t(message)}</p>
      <p className="text-xs italic mt-1 text-opacity-80">
        [{code}] {t(reason)} – {section}
      </p>
    </div>
  );
};

export default PermissionMessage;
