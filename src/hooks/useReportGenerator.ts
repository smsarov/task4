import { useState, useCallback } from 'react';
import { downloadReport } from '../api/server/download';

export type ReportStatus = 'idle' | 'generating' | 'done' | 'error';

interface UseReportGeneratorOptions {
  size?: number;
  withErrors?: string;
  maxSpend?: string;
}

export function useReportGenerator(defaults: UseReportGeneratorOptions = {}) {
  const [status, setStatus] = useState<ReportStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [reportBlob, setReportBlob] = useState<Blob | null>(null);

  const generateReport = useCallback(
    async (options: UseReportGeneratorOptions = {}) => {
      setStatus('generating');
      setError(null);
      setReportBlob(null);
      try {
        const params = {
          size: options.size ?? defaults.size ?? 0.01,
          withErrors: options.withErrors ?? defaults.withErrors ?? 'off',
          maxSpend: options.maxSpend ?? defaults.maxSpend ?? '1000',
        };
        const blob = await downloadReport(params);
        setReportBlob(blob);
        setStatus('done');
      } catch (e: unknown) {
        setStatus('error');
        setError(
          e instanceof Error ? e.message : 'Ошибка при скачивании файла',
        );
      }
    },
    [defaults],
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setReportBlob(null);
  }, []);

  return { status, error, reportBlob, generateReport, reset };
}
