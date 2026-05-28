import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { WorkLog, WorkType } from "@/types";
import { getWorkLogs, getWorkTypes, deleteWorkLog } from "@/api";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
interface WorkLogTableProps {
  dateFrom?: string;
  dateTo?: string;
  onEdit: (workLog: WorkLog) => void;
}

export const WorkLogTable = ({
  dateFrom,
  dateTo,
  onEdit,
}: WorkLogTableProps) => {
  const queryClient = useQueryClient();

  const { data: workLogsData, isLoading } = useQuery({
    queryKey: ["workLogs", dateFrom, dateTo],
    queryFn: () => getWorkLogs({ dateFrom, dateTo }),
  });

  const { data: workTypesData } = useQuery({
    queryKey: ["work-types"],
    queryFn: getWorkTypes,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWorkLog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workLogs", dateFrom, dateTo],
      });
      toast.success("Запись удалена");
    },
    onError: () => toast.error("Ошибка при удалении записи"),
  });

  const getWorkTypeName = (workTypeId: string): string => {
    const workType = workTypesData?.data.find(
      (wt: WorkType) => wt.id === workTypeId,
    );
    return workType ? `${workType.name} (${workType.unit})` : "-";
  };

  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (isLoading) return <div className="text-center py-8">Загрузка...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="table-header">
            <th className="table-cell">Дата</th>
            <th className="table-cell">Вид работ</th>
            <th className="table-cell">Объём</th>
            <th className="table-cell">Исполнитель</th>
            <th className="table-cell">Действия</th>
          </tr>
        </thead>
        <tbody>
          {workLogsData?.data.map((workLog: WorkLog) => (
            <tr key={workLog.id} className="table-row">
              <td className="table-cell">
                {new Date(workLog.date).toLocaleDateString("ru-RU")}
                <div className="text-xs text-gray-400 mt-1 flex flex-col">
                  Создано:{" "}
                  {new Date(workLog.createdAt).toLocaleString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {workLog.createdAt !== workLog.updatedAt && (
                    <span>
                      Изменено:{" "}
                      {new Date(workLog.updatedAt).toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              </td>
              <td className="table-cell">
                {getWorkTypeName(workLog.workTypeId)}
              </td>
              <td className="table-cell">{workLog.volume}</td>
              <td className="table-cell">{workLog.executor}</td>
              <td className="table-cell">
                <div className="flex gap-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => onEdit(workLog)}
                    title="Изменить"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setDeletingId(workLog.id)}
                    title="Удалить"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {workLogsData?.data.length === 0 && (
        <div className="text-center py-8 text-gray-500">Записей нет</div>
      )}
      {deletingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Удалить запись?</h2>
            <p className="text-gray-500 text-sm mb-6">
              Это действие нельзя отменить.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                className="btn btn-secondary"
                onClick={() => setDeletingId(null)}
              >
                Отмена
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteMutation.mutate(deletingId);
                  setDeletingId(null);
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
