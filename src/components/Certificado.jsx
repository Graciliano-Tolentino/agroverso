// 🎖️ Certificado Digital Regenerativo Agroverso
export default function Certificado({ nome, curso, data, qrCodeUrl }) {
  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-xl rounded-xl px-8 py-10 text-center relative font-opensans text-grayIntelligent">
      {/* Logo Agroverso */}
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

      {/* QR Code para validação */}
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-md overflow-hidden border border-gray-300 shadow">
          <img src={qrCodeUrl} alt="QR Code de validação" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Assinaturas institucionais */}
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
  )
}
