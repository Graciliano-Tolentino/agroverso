// 🎖️ Certificado com Exportação PDF – Padrão Agroverso
import html2pdf from 'html2pdf.js'

export default function CertificadoComExportacao({ nome, curso, data, qrCodeUrl }) {
  // Função para gerar PDF
  const handleDownload = () => {
    const element = document.getElementById('certificado-pdf')

    const options = {
      margin: 0,
      filename: `certificado-${nome.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }

    html2pdf().set(options).from(element).save()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div id="certificado-pdf" className="bg-white border border-gray-200 shadow-xl rounded-xl px-8 py-10 text-center relative font-opensans text-grayIntelligent">
        <img
          src="/src/assets/images/logo_agroverso.png"
          alt="Logo Agroverso"
          className="w-24 mx-auto mb-6"
        />

        <h2 className="text-2xl font-montserrat font-bold text-greenRegenerative mb-2">
          Certificado de Conclusão
        </h2>

        <p className="mb-6 text-sm">
          Declaramos que <span className="font-bold">{nome}</span> concluiu com êxito o curso:
        </p>

        <h3 className="text-lg font-roboto font-semibold mb-6">
          “{curso}”
        </h3>

        <p className="text-sm mb-6">
          Emitido em: <span className="font-semibold">{data}</span>
        </p>

        {/* QR Code */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-md overflow-hidden border border-gray-300 shadow">
            <img src={qrCodeUrl} alt="QR Code de validação" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Assinaturas */}
        <div className="mt-10 flex justify-center gap-10 text-xs text-gray-500">
          <div>
            __________________________
            <br />
            Coordenação Agroverso
          </div>
          <div>
            __________________________
            <br />
            Instituto Graciliana Maria da Conceição
          </div>
        </div>
      </div>

      {/* Botão de exportação */}
      <div className="text-center mt-6">
        <button
          onClick={handleDownload}
          className="bg-greenRegenerative text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-600 transition duration-200"
        >
          Baixar Certificado em PDF
        </button>
      </div>
    </div>
  )
}
