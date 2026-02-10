import { useState } from "react";
import { useFetchUserHistory } from "../hooks/useFetchUserHistory";
import { useDeleteUserHistory } from "../hooks/useDeleteUserHistory";

export default function InfoAndHistory() {
  const {
    data: userHistory = [],
    isLoading,
    error,
    refetch,
  } = useFetchUserHistory();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const deleteMutation = useDeleteUserHistory();

  const handleSelect = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(userHistory.map((item) => item.userHistoryId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    await deleteMutation.mutateAsync(selectedIds);
    setSelectedIds([]);
    refetch();
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        className="bg-gray-900 p-6 rounded-2xl shadow-lg"
        style={{ maxHeight: 400, minHeight: 200, overflowY: "auto" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Search History
        </h2>
        {isLoading && (
          <div className="flex justify-center items-center h-24">
            <span className="text-gray-400">Loading...</span>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-24">
            <span className="text-red-500 text-center">
              {(error as any)?.response?.data?.message
                ? (error as any).response.data.message
                : error.message}
            </span>
          </div>
        )}
        {!isLoading && !error && userHistory.length === 0 && (
          <div className="flex justify-center items-center h-24">
            <span className="text-gray-400">No history found.</span>
          </div>
        )}
        {!isLoading && !error && userHistory.length > 0 && (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <label className="inline-flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === userHistory.length &&
                    userHistory.length > 0
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="mr-2 accent-blue-500"
                />
                Select All
              </label>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow disabled:opacity-50 transition"
                onClick={handleDelete}
                disabled={selectedIds.length === 0}
              >
                Delete Selected
              </button>
            </div>
            <ul className="space-y-3">
              {userHistory.map((item, idx) => {
                const isSelected = selectedIds.includes(item.userHistoryId);
                return (
                  <li
                    key={item.userHistoryId || idx}
                    className={`rounded-lg p-4 flex flex-col border transition ${
                      isSelected
                        ? "border-blue-500 bg-gray-800/80"
                        : "border-gray-800 bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) =>
                          handleSelect(item.userHistoryId, e.target.checked)
                        }
                        className="mr-2 accent-blue-500"
                      />
                      <span className="text-sm text-gray-400">
                        {isSelected ? "Selected" : "Select"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-sm text-gray-200">
                      <span>
                        <strong>IP:</strong> {item.ipAddress}
                      </span>
                      <span>
                        <strong>City:</strong> {item.city}
                      </span>
                      <span>
                        <strong>Region:</strong> {item.region}
                      </span>
                      <span>
                        <strong>Country:</strong> {item.country}
                      </span>
                      <span>
                        <strong>Postal:</strong> {item.postal}
                      </span>
                      <span>
                        <strong>Latitude:</strong> {item.latitude}
                      </span>
                      <span>
                        <strong>Longitude:</strong> {item.longitude}
                      </span>
                      <span>
                        <strong>Date:</strong>{" "}
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
