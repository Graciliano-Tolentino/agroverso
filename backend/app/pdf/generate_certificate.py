from fpdf import FPDF
from datetime import datetime
import os
import uuid

class CertificatePDF(FPDF):
    def header(self):
        # Título do Certificado
        self.set_font("Arial", "B", 18)
        self.cell(0, 10, "Certificado de Conclusão", 0, 1, "C")
        self.ln(10)

    def footer(self):
        self.set_y(-20)
        self.set_font("Arial", "I", 8)
        self.cell(0, 10, f"Certificado gerado em {datetime.now().strftime('%d/%m/%Y')}", 0, 0, "C")

def generate_certificate(nome_aluno, curso, carga_horaria, output_dir="certificados"):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    pdf = CertificatePDF()
    pdf.add_page()

    # Corpo do Certificado
    pdf.set_font("Arial", size=12)
    texto_certificado = (
        f"Certificamos que o(a) aluno(a) {nome_aluno} concluiu com êxito o curso "
        f"\"{curso}\", com carga horária total de {carga_horaria} horas, "
        f"oferecido pela plataforma Agroverso em parceria com o Instituto "
        "Graciliana Maria da Conceição."
    )
    pdf.multi_cell(0, 10, texto_certificado, align="J")
    pdf.ln(15)

    # Código de validação UUID
    codigo_validacao = str(uuid.uuid4()).split("-")[0].upper()
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 10, f"Código de Validação: {codigo_validacao}", 0, 1, "C")

    # Salvar o PDF com nome formatado
    nome_arquivo = f"{nome_aluno.replace(' ', '_')}_{curso.replace(' ', '_')}.pdf"
    caminho_arquivo = os.path.join(output_dir, nome_arquivo)
    pdf.output(caminho_arquivo)

    return {
        "arquivo": caminho_arquivo,
        "codigo_validacao": codigo_validacao
    }

# Exemplo rápido para teste (pode ser removido em produção)
if __name__ == "__main__":
    resultado = generate_certificate(
        nome_aluno="Graciliano Tolentino",
        curso="Introdução ao Agroverso",
        carga_horaria=10
    )
    print(f"Certificado gerado com sucesso: {resultado}")
