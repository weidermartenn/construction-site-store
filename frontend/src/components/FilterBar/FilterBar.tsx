interface FilterBarProps {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onReset: () => void;
}

export const FilterBar = ({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onReset,
}: FilterBarProps) => {
  return (
    <div className="flex gap-4 items-end">
      <div>
        <label className="block text-sm font-medium mb-1">Дата с</label>
        <input
          type="date"
          className="input"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Дата по</label>
        <input
          type="date"
          className="input"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
        />
      </div>

      <button className="btn btn-secondary" onClick={onReset}>
        Сбросить
      </button>
    </div>
  );
};
