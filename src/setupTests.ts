// ==========================================================================================
// 🧪 setupTests.ts | Agroverso – Setup Global para Testes com @testing-library/react + Vitest
// ==========================================================================================
// 🎯 Finalidade:
//     • Inicializar ambiente de testes com suporte a matchers customizados e simulações DOM.
//     • Integrar comportamento acessível e confiável para testes unitários e de integração.
// ==========================================================================================

import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Exemplo: mock global de console.error para falhas críticas
beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation((...args) => {
    const ignoraAvisos = [
      /Warning:.*not wrapped in act/,
      /React does not recognize the prop/,
    ]

    const ehIgnoravel = ignoraAvisos.some((regex) =>
      args.some((arg) => typeof arg === 'string' && regex.test(arg))
    )

    if (!ehIgnoravel) {
      console.warn('[erro de teste real]:', ...args)
    }
  })
})
