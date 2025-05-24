// ============================================================================
// 📄 logger.test.js | Testes Unitários do Logger Corporativo Agroverso (v2.5)
// 📁 Diretório: src/utils/__tests__/
// 🧪 Framework: Jest – Cobertura de throttle, sanitização, persistência e dispatch
// ============================================================================

import {
  throttleLog,
  sanitizeLogData,
  saveOfflineLog,
  replayOfflineLogs,
  logToDestinations,
  logToConsole,
  logToSentry,
  logToDatadog,
  logToLogRocket,
  logToGTM,
} from '../logger';

// Mock do localStorage
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('🕒 throttleLog()', () => {
  it('permite log se for a primeira vez', () => {
    expect(throttleLog('testKey')).toBe(true);
  });

  it('bloqueia log se chamado em menos de 2s', () => {
    throttleLog('testKey');
    expect(throttleLog('testKey')).toBe(false);
  });

  it('permite log após 2s', () => {
    jest.useFakeTimers();
    throttleLog('testKey');
    jest.advanceTimersByTime(2100);
    expect(throttleLog('testKey')).toBe(true);
    jest.useRealTimers();
  });
});

describe('🔐 sanitizeLogData()', () => {
  it('remove campos sensíveis como token e password', () => {
    const input = { message: 'fail', token: '123', password: 'abc', user: 'admin' };
    const sanitized = sanitizeLogData(input);
    expect(sanitized.token).toBeUndefined();
    expect(sanitized.password).toBeUndefined();
    expect(sanitized.user).toBe('admin');
  });
});

describe('💾 saveOfflineLog() e replayOfflineLogs()', () => {
  const testLog = { level: 'info', message: 'offline test' };

  it('armazena log no localStorage', () => {
    saveOfflineLog(testLog);
    const stored = JSON.parse(localStorage.getItem('agroverso_logs'));
    expect(stored.length).toBe(1);
    expect(stored[0].message).toBe('offline test');
  });

  it('reenvia e limpa logs do buffer', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    saveOfflineLog(testLog);
    replayOfflineLogs();
    const after = JSON.parse(localStorage.getItem('agroverso_logs'));
    expect(after.length).toBe(0);
    spy.mockRestore();
  });
});

describe('📡 logToDestinations()', () => {
  const sampleLog = {
    level: 'warn',
    message: 'Falha detectada',
    stack: 'stacktrace aqui',
    component: 'LoginPage',
  };

  beforeEach(() => {
    global.console.warn = jest.fn();
    global.window = {
      Sentry: { captureException: jest.fn(), captureMessage: jest.fn() },
      LogRocket: { log: jest.fn() },
      DD_LOGS: { logger: { warn: jest.fn() } },
      dataLayer: [],
    };
  });

  it('chama logToConsole corretamente', () => {
    logToConsole('warn', 'Algo aconteceu', 'stack aqui', { extra: 1 });
    expect(console.warn).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ extra: 1 }));
  });

  it('encaminha para todos os destinos corretamente', () => {
    logToDestinations(sampleLog);
    expect(window.Sentry.captureException).toHaveBeenCalled();
    expect(window.LogRocket.log).toHaveBeenCalled();
    expect(window.DD_LOGS.logger.warn).toHaveBeenCalled();
    expect(window.dataLayer.length).toBeGreaterThan(0);
  });
});
