// =====================================================================================
// 📄 CourseCard.jsx | Agroverso – Cartão Institucional com Design Token, A11y e Analytics
// =====================================================================================
// 🎯 Finalidade:
//     • Componente padrão ouro para cursos, com fallback multilíngue, acessibilidade formal e rastreamento inteligente.
//     • Visual documentado por tokens, pronto para generalização e compatível com CI/CD, Storybook e Design System.
// =====================================================================================

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { ActionButton } from '@/components/ui/ActionButton';
import { CourseIcon } from '@/components/icons/CourseIcon';
import { AlertBadge } from '@/components/ui/AlertBadge';
import { useCourseAudit } from '@/hooks/useCourseAudit';
import { getAssistiveKey } from '@/utils/getAssistiveKey';
import { createPropsComparator } from '@/utils/compareProps';
import { renderAssistiveText } from '@/utils/renderAssistiveText';

const CourseCard = ({
  curso,
  onClick,
  assistiveKeyOverride,
  exibirAlertasVisuais = true,
}) => {
  const { t, i18n } = useTranslation();

  const idUnico = useMemo(() => curso.id ?? uuidv4(), [curso.id]);

  const titulo = curso.titulo ?? t('cursos.semTitulo');
  const descricao = curso.descricao ?? t('cursos.descricaoIndisponivel');
  const carga = curso.carga ?? t('cursos.cargaIndisponivel');
  const tipo = curso.tipo ?? 'padrao';

  if (process.env.NODE_ENV !== 'production') {
    if (!curso.titulo) console.warn('⚠️ Curso sem título:', curso);
    if (!curso.carga) console.warn('⚠️ Curso sem carga horária:', curso);
  }

  const resolvedKey =
    typeof assistiveKeyOverride === 'function'
      ? assistiveKeyOverride(curso)
      : assistiveKeyOverride;

  const assistivaKey = resolvedKey || getAssistiveKey(tipo, i18n.language, {
    publico: curso.publico,
    tema: curso.tema,
  });

  useCourseAudit(curso, titulo, t);

  return (
    <div
      role="article"
      aria-roledescription="Cartão de curso"
      aria-labelledby={`titulo-curso-${idUnico}`}
      aria-describedby={`descricao-curso-${idUnico}${
        !curso.titulo ? ` alerta-titulo-${idUnico}` : ''
      }${!curso.carga ? ` alerta-carga-${idUnico}` : ''}`}
      data-testid={`curso-${idUnico}`}
      tabIndex={0}
      className="card-course focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <CourseIcon />
        <h3
          id={`titulo-curso-${idUnico}`}
          className="text-xl font-semibold text-green-700 dark:text-green-300"
        >
          {titulo}
        </h3>
        {exibirAlertasVisuais && !curso.titulo && (
          <>
            <AlertBadge
              tooltip="Este campo é obrigatório"
              ariaLabel="Campo obrigatório ausente: título"
            />
            <p id={`alerta-titulo-${idUnico}`} className="sr-only">
              O campo de título não foi preenchido.
            </p>
          </>
        )}
      </div>

      <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
        {descricao}
      </p>

      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {t('cursos.carga')}: {carga}
        {exibirAlertasVisuais && !curso.carga && (
          <>
            <AlertBadge
              tooltip="Este campo é obrigatório"
              ariaLabel="Campo obrigatório ausente: carga horária"
            />
            <p id={`alerta-carga-${idUnico}`} className="sr-only">
              A carga horária não foi informada.
            </p>
          </>
        )}
      </p>

      {/* ♿ Texto assistivo oculto internacionalizado */}
      <p id={`descricao-curso-${idUnico}`} className="sr-only">
        {renderAssistiveText({ key: assistivaKey, data: { titulo, carga }, t })}
      </p>

      {curso.disponivel === false && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="status">
          Este curso está temporariamente indisponível.
        </p>
      )}

      <div className="mt-4">
        <ActionButton
          type="button"
          label={t('cursos.saibaMais')}
          onClick={() => {
            window?.gtag?.('event', 'click-saiba-mais', {
              event_category: 'card-curso',
              event_label: titulo,
              value: curso.id,
              publico: curso.publico,
              tema: curso.tema,
            });
            onClick();
          }}
          disabled={curso.disponivel === false}
          aria-describedby={`descricao-curso-${idUnico}`}
          data-testid={`botao-saiba-mais-${idUnico}`}
        />
      </div>
    </div>
  );
};

// 📐 Tipagem completa e contextual
CourseCard.propTypes = {
  curso: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    titulo: PropTypes.string,
    descricao: PropTypes.string,
    carga: PropTypes.string,
    tipo: PropTypes.string,
    disponivel: PropTypes.bool,
    publico: PropTypes.string,
    tema: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  assistiveKeyOverride: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  exibirAlertasVisuais: PropTypes.bool,
};

// 🧠 Exportação com memoização configurável por conteúdo significativo
export default React.memo(
  CourseCard,
  createPropsComparator(
    ['id', 'titulo', 'descricao', 'carga', 'tipo', 'disponivel', 'publico', 'tema'],
    {
      mode: 'shallow',
      exclude: [],
    }
  )
);
