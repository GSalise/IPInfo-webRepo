import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function deleteUserHistory(userHistoryIds: number[]) {
  const token = localStorage.getItem("authToken");
  await axios.delete(`http://localhost:20179/api/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: userHistoryIds,
  });
}

export function useDeleteUserHistory() {
  return useMutation({
    mutationFn: (userHistoryIds: number[]) => deleteUserHistory(userHistoryIds),
  });
}
