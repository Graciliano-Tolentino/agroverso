/*
  =====================================================================================
  📄 emissorCertificado.js
  📁 src/api/certificados
  ✍️ Desenvolvido por: Graciliano Tolentino
  📅 Atualizado em: 25/05/2025
  🎯 Emissão segura de certificados com JWT antifraude assinado no backend

       • Assina dados críticos com chave privada
       • Protege contra falsificação e alterações
       • Integra com frontend via token no QR Code

  🌍 Framework Agroverso — Emissão confiável com sabedoria, força e beleza
  =====================================================================================
*/

import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'agroverso_cert_secret';

/**
 * Simula emissão de certificado no backend.
 */
export function emitirCertificado(req, res) {
  const { nome, curso, data } = req.body;

  if (!nome || !curso || !data) {
    return res.status(400).json({ erro: 'Dados obrigatórios ausentes.' });
  }

  const certificadoId = `AGRO-${uuidv4().slice(0, 8).toUpperCase()}`;
  const payload = {
    id: certificadoId,
    nome,
    curso,
    data,
    emitidoEm: new Date().toISOString(),
    origem: 'agroverso.tec.br',
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '10y' });

  // (Opcional) salvar no banco de dados aqui

  return res.status(201).json({
    certificadoId,
    token,
    urlValidacao: `https://certificados.agroverso.tec.br/validar?token=${token}`,
  });
}
