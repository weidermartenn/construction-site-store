import { useState } from "react";
import type { WorkLog } from "./types";
import { WorkLogTable } from "./components/WorkLogTable/WorkLogTable";
import { WorkLogForm } from "./components/WorkLogForm/WorkLogForm";
import { FilterBar } from "./components/FilterBar/FilterBar";
import { Toaster } from "react-hot-toast";

function App() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWorkLog, setEditingWorkLog] = useState<WorkLog | null>(null);

  const handleEdit = (workLog: WorkLog) => {
    setEditingWorkLog(workLog);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingWorkLog(null);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingWorkLog(null);
  };

  const handleReset = () => {
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Журнал работ</h1>
          <p className="text-gray-500 text-sm mt-1">
            Учёт выполненных работ на объекте
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-end">
            <FilterBar
              dateFrom={dateFrom}
              dateTo={dateTo}
              onDateFromChange={setDateFrom}
              onDateToChange={setDateTo}
              onReset={handleReset}
            />
            <button className="btn btn-primary" onClick={handleAdd}>
              + Добавить запись
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <WorkLogTable
            dateFrom={dateFrom}
            dateTo={dateTo}
            onEdit={handleEdit}
          />
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {editingWorkLog ? "Редактировать запись" : "Добавить запись"}
              </h2>
              <WorkLogForm workLog={editingWorkLog} onClose={handleClose} />
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
