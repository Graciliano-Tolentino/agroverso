// ========================================================================================
// 🧠 useCursos.ts (v1.0) | Agroverso — Hook de Cursos Inteligente, Modular e Escalável
// ========================================================================================

import { useState, useEffect } from 'react'

export type Curso = {
  id: string
  titulo: string
  descricao: string
  duracaoHoras?: number
  imagem?: string
  linkInscricao?: string
}

export default function useCursos() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregarCursos() {
      try {
        setLoading(true)
        // 🔁 Mock inicial (simulação local)
        const mockCursos: Curso[] = [
          {
            id: '1',
            titulo: 'Irrigação Inteligente com IoT',
            descricao: 'Aprenda a automatizar irrigação em hortas e plantações usando sensores e microcontroladores.',
            duracaoHoras: 8
          },
          {
            id: '2',
            titulo: 'Energia Solar Fotovoltaica Descomplicada',
            descricao: 'Entenda os fundamentos da energia solar e aprenda a dimensionar sistemas para pequenas propriedades.',
            duracaoHoras: 6
          }
        ]
        setCursos(mockCursos)
      } catch (err) {
        setErro('Erro ao carregar cursos.')
      } finally {
        setLoading(false)
      }
    }

    carregarCursos()
  }, [])

  return { cursos, loading, erro, setCursos }
}

