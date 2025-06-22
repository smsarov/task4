import type { Highlight } from '../../types/highlight';
import { BaseUrl } from './constants';

interface AggregateOptions {
  file: File;
  rows: number;
  onChunk: (chunk: Highlight) => void;
  onFinish: () => void;
  onError?: (err: Error) => void;
}

export async function aggregate({
  file,
  rows,
  onChunk,
  onFinish,
  onError,
}: AggregateOptions) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BaseUrl}/aggregate?rows=${rows}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.body) {
      throw new Error('Нет потока данных от сервера');
    }
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'Ошибка при агрегации файла');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        if (line.trim() === '') continue;
        const chunk: Highlight = JSON.parse(line);
        onChunk(chunk);
      }
    }
    if (buffer.trim() !== '') {
      const chunk: Highlight = JSON.parse(buffer);
      onChunk(chunk);
    }
    onFinish();
  } catch (err: unknown) {
    if (onError) onError(err as Error);
    else throw err;
  }
}
