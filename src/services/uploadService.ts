import type { Highlight } from '../types/highlight';

function formatDayOfYear(dayOfYear: number): string {
  const date = new Date(2024, 0);
  date.setDate(dayOfYear + 1);
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

export const uploadService = {
  verify(file: File) {
    return file.name.endsWith('.csv');
  },
  parseChunk(chunk: unknown): Highlight {
    if (
      typeof chunk !== 'object' || chunk === null ||
      typeof (chunk as any).total_spend_galactic !== 'number' ||
      typeof (chunk as any).rows_affected !== 'number' ||
      typeof (chunk as any).less_spent_at !== 'number' ||
      typeof (chunk as any).big_spent_at !== 'number' ||
      typeof (chunk as any).less_spent_value !== 'number' ||
      typeof (chunk as any).big_spent_value !== 'number' ||
      typeof (chunk as any).average_spend_galactic !== 'number' ||
      typeof (chunk as any).big_spent_civ !== 'string' ||
      typeof (chunk as any).less_spent_civ !== 'string'
    ) {
      throw new Error('Invalid highlight data format');
    }
    return chunk as Highlight;
  },
  mapHighlightToDisplay(highlight: Highlight) {
    return [
      {
        label: 'общие расходы в галактическиз кредитах',
        value: highlight.total_spend_galactic,
      },
      {
        label: 'цивилизация с минимальными расходами',
        value: highlight.less_spent_civ,
      },
      {
        label: 'количество обработанных записей',
        value: highlight.rows_affected,
      },
      {
        label: 'день года с максимальными расходами',
        value: formatDayOfYear(highlight.big_spent_at),
      },
      {
        label: 'день года с минимальными расходами',
        value: formatDayOfYear(highlight.less_spent_at),
      },
      {
        label: 'максимальная сумма расходов за день',
        value: highlight.big_spent_value,
      },
      {
        label: 'цивилизация с максимальными расходами',
        value: highlight.big_spent_civ,
      },
      {
        label: 'средние расходы в галактических кредитах',
        value: Math.round(highlight.average_spend_galactic),
      },
    ];
  },
};
