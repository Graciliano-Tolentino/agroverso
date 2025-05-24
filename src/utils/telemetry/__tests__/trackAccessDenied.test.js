// =====================================================================================
// 📄 trackAccessDenied.test.js | Testes para telemetria de RBAC negado
// =====================================================================================

import {
  trackAccessDenied,
  registerTelemetryPlugin,
  isSSR,
} from '../trackAccessDenied';

// Mocks dos módulos de destino
jest.mock('../destinos/sendToGTM', () => ({
  sendToGTM: jest.fn(),
}));

jest.mock('../destinos/sendToLogRocket', () => ({
  sendToLogRocket: jest.fn(),
}));

jest.mock('../destinos/sendToDatadog', () => ({
  sendToDatadog: jest.fn(),
}));

import { sendToGTM } from '../destinos/sendToGTM';
import { sendToLogRocket } from '../destinos/sendToLogRocket';
import { sendToDatadog } from '../destinos/sendToDatadog';

describe('trackAccessDenied()', () => {
  const eventoMock = {
    userRole: 'editor',
    esperado: ['admin'],
    rota: '/admin/painel',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('chama os três destinos principais com evento válido', () => {
    trackAccessDenied(eventoMock);

    expect(sendToGTM).toHaveBeenCalledTimes(1);
    expect(sendToLogRocket).toHaveBeenCalledTimes(1);
    expect(sendToDatadog).toHaveBeenCalledTimes(1);
  });

  it('registra e executa plugin externo com sucesso', () => {
    const pluginMock = jest.fn();
    registerTelemetryPlugin(pluginMock);

    trackAccessDenied(eventoMock);

    expect(pluginMock).toHaveBeenCalledWith(expect.objectContaining({
      userRole: 'editor',
      expectedRoles: ['admin'],
      path: '/admin/painel',
      traceId: expect.any(String),
      timestamp: expect.any(String),
    }));
  });

  it('ignora evento em ambiente SSR (modo passivo)', () => {
    const originalWindow = global.window;
    delete global.window; // Simula SSR

    expect(() => trackAccessDenied(eventoMock, 'passivo')).not.toThrow();

    global.window = originalWindow; // Restaura
  });

  it('em SSR modo ativo, deve logar aviso', () => {
    const originalConsole = console.warn;
    console.warn = jest.fn();

    const originalWindow = global.window;
    delete global.window;

    trackAccessDenied(eventoMock, 'ativo');

    expect(console.warn).toHaveBeenCalledWith(
      '[SSR][RBAC] Evento ignorado (modo ativo)',
      expect.objectContaining({ userRole: 'editor' })
    );

    global.window = originalWindow;
    console.warn = originalConsole;
  });
});
