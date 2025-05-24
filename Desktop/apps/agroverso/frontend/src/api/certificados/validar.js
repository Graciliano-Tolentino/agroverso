/*
  ==============================================================================
  📄 validar.js
  📁 src/api/certificados
  ✍️ Desenvolvido por: Graciliano Tolentino
  📅 Atualizado em: 25/05/2025
  🎯 API de validação pública de certificados emitidos pela Agroverso

       • Recebe ID do certificado via query
       • Verifica integridade e responde status
       • Pronto para integração futura com banco de dados ou JWT assinado
       • Ideal para QR Code público, validação impressa e antifraude

  🌍 Framework Agroverso — Transparência auditável com sabedoria, força e beleza
  ==============================================================================
*/

export async function validarCertificado(req, res) {
  const { id } = req.query;

  // Validação mínima do formato
  if (!id || !id.startsWith('AGRO-')) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'ID do certificado inválido ou ausente.',
    });
  }

  // Simulação de consulta ao "banco" (mock ou futuro MongoDB, PostgreSQL, etc)
  const bancoSimulado = {
    'AGRO-ABC12345': {
      nome: 'Graciliano Tolentino',
      curso: 'Engenharia de Software Ética',
      data: '25/05/2025',
      status: 'válido',
    },
    'AGRO-XYZ98765': {
      nome: 'Maria Clara Oliveira',
      curso: 'Agrotecnologia Aplicada',
      data: '17/04/2025',
      status: 'válido',
    },
  };

  const certificado = bancoSimulado[id];

  if (!certificado) {
    return res.status(404).json({
      status: 'não encontrado',
      mensagem: 'Certificado não localizado. Verifique o código ou entre em contato com o suporte.',
    });
  }

  return res.status(200).json({
    status: 'válido',
    id,
    ...certificado,
    verificadoEm: new Date().toISOString(),
    origem: 'Agroverso API Pública',
  });
}
