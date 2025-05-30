// ========================================================================================
// 📄 HeroButton.jsx | Agroverso – Botão CTA com Semântica Visual, Modularidade e Clareza
// 📁 src/components/ui/
// ========================================================================================
// 🎯 Propósito:
//     • Botão de ação principal reutilizável para sessões tipo Hero ou páginas de entrada
//     • Comportamento previsível com estilização acessível e animações suaves
//     • Flexível: aceita `children`, `onClick`, `aria-label` e desativação dinâmica
// ========================================================================================

export default function HeroButton({
  onClick,
  children = 'Começar Agora',
  disabled = false,
  ariaLabel = 'Ação principal do Agroverso'
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`px-6 py-3 text-white font-semibold rounded-xl transition 
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
    >
      {children}
    </button>
  )
}
