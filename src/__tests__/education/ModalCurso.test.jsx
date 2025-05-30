// 📁 src/__tests__/education/ModalCurso.test.jsx

import { render, screen, fireEvent } from '@testing-library/react'
import ModalCurso from '@/components/education/ModalCurso'

describe('ModalCurso', () => {
  const mockCurso = {
    titulo: 'Curso de Energia Solar',
    descricao: 'Aprenda sobre fotovoltaico',
    duracaoHoras: 6,
    publico: 'Produtores rurais',
    tema: 'Energia',
    linkInscricao: 'https://agroverso.tec.br/curso/solar',
  }

  it('renderiza os dados do curso corretamente', () => {
    render(<ModalCurso curso={mockCurso} onClose={() => {}} />)
    expect(screen.getByText(/Energia Solar/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Inscreva-se Agora/i })).toBeInTheDocument()
  })

  it('dispara onClose ao clicar em ×', () => {
    const onClose = vi.fn()
    render(<ModalCurso curso={mockCurso} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText(/Fechar modal/))
    expect(onClose).toHaveBeenCalled()
  })
})
