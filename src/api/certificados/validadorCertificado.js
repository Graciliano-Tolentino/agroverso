/*
  =====================================================================================
  📄 validadorCertificado.js
  📁 src/api/certificados
  ✍️ Desenvolvido por: Graciliano Tolentino
  📅 Atualizado em: 25/05/2025
  🎯 Validação antifraude de certificados Agroverso via JWT

       • Decodifica token assinado e garante integridade
       • Exibe dados do certificado de forma segura
       • Permite validação pública por QR Code

  🌍 Framework Agroverso — Transparência para validação institucional e pública
  =====================================================================================
*/

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'agroverso_cert_secret';

/**
 * Valida o certificado via token JWT assinado.
 */
export function validarCertificado(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ status: 'erro', mensagem: 'Token ausente.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return res.status(200).json({
      status: 'válido',
      ...decoded,
      verificadoEm: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(401).json({
      status: 'inválido',
      mensagem: 'Certificado não pôde ser validado. Token inválido ou expirado.',
    });
  }
}
