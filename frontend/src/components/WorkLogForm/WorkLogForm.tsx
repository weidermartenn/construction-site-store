import { createWorkLog, getWorkTypes, updateWorkLog } from "@/api";
import type { CreateWorkLogDto, WorkLog, WorkType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from 'react-hot-toast';

interface WorkLogFormProps {
  workLog?: WorkLog | null;
  onClose: () => void;
}

export const WorkLogForm = ({ workLog, onClose }: WorkLogFormProps) => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<CreateWorkLogDto>({
    date: workLog ? new Date(workLog.date).toISOString().split("T")[0] : "",
    workTypeId: workLog?.workTypeId ?? "",
    volume: workLog?.volume ?? 0,
    executor: workLog?.executor ?? "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateWorkLogDto, string>>
  >({});

  const { data: workTypesData } = useQuery({
    queryKey: ["work-types"],
    queryFn: getWorkTypes,
  });

  const createMutation = useMutation({
    mutationFn: createWorkLog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workLogs"],
      });
      toast.success('Запись добавлена')
      onClose();
    },
    onError: () => toast.error('Ошибка при добавлении записи'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Partial<CreateWorkLogDto> }) =>
      updateWorkLog(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workLogs"],
      });
      toast.success('Запись изменена')
      onClose();
    },
    onError: () => toast.error('Ошибка при изменении записи'),
  });

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateWorkLogDto, string>> = {};

    if (!form.date) newErrors.date = "Укажите дату";
    if (!form.workTypeId) newErrors.workTypeId = "Выберите вид работ";
    if (!form.volume || form.volume <= 0) newErrors.volume = "Укажите объём";
    if (!form.executor.trim()) newErrors.executor = "Укажите исполнителя";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (workLog) {
      updateMutation.mutate({ id: workLog.id, dto: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Дата</label>
        <input
          type="date"
          className={`input ${errors.date ? "input-error" : ""}`}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Вид работ</label>
        <select
          className={`input ${errors.workTypeId ? "input-error" : ""}`}
          value={form.workTypeId}
          onChange={(e) => setForm({ ...form, workTypeId: e.target.value })}
        >
          <option value="">Выберите вид работ</option>
          {workTypesData?.data.map((wt: WorkType) => (
            <option key={wt.id} value={wt.id}>
              {wt.name} ({wt.unit})
            </option>
          ))}
        </select>
        {errors.workTypeId && (
          <p className="text-red-500 text-xs mt-1">{errors.workTypeId}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Объём</label>
        <input
          type="text"
          placeholder="0"
          className={`input ${errors.volume ? "input-error" : ""}`}
          value={form.volume === 0 ? '' : String(form.volume)}
          onChange={(e) =>
            setForm({ ...form, volume: e.target.value === '' ? 0 : parseFloat(e.target.value) })
          }
        />
        {errors.volume && (
          <p className="text-red-500 text-xs mt-1">{errors.volume}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Исполнитель</label>
        <input
          type="text"
          className={`input ${errors.executor ? "input-error" : ""}`}
          value={form.executor}
          onChange={(e) => setForm({ ...form, executor: e.target.value })}
        />
        {errors.executor && (
          <p className="text-red-500 text-xs mt-1">{errors.executor}</p>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        <button className="btn btn-secondary" onClick={onClose}>
          Отмена
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Сохранение..." : workLog ? "Сохранить" : "Добавить"}
        </button>
      </div>
    </div>
  );
};
