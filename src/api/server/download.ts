import { BaseUrl } from './constants';

export async function downloadReport({
  size,
  withErrors = 'off',
  maxSpend = '1000',
}: {
  size: number;
  withErrors?: string;
  maxSpend?: string;
}) {
  const params = new URLSearchParams({
    size: String(size),
    withErrors,
    maxSpend,
  });
  const response = await fetch(`${BaseUrl}/report?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Ошибка при генерации отчета');
  }
  const blob = await response.blob();
  return blob;
}
