import {
  IPInfoWithHistoryListSchema,
  type IPInfoWithHistoryIdData,
} from "../schemas/ipinfo.schema";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

async function fetchUserHistory(): Promise<IPInfoWithHistoryIdData[]> {
  const token = localStorage.getItem("authToken");
  const response = await axios.get(
    "https://ipinfocheck.dcism.org/api/history",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log("API Response for user history:", response.data);
  const parsedResponse = IPInfoWithHistoryListSchema.safeParse(response.data);
  if (!parsedResponse.success) {
    throw new Error("Invalid response from API");
  }

  return parsedResponse.data;
}

export function useFetchUserHistory() {
  const {
    data: apiResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userHistory"],
    queryFn: async () => {
      const apiResponse = await fetchUserHistory();

      return apiResponse;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });

  return {
    data: apiResponse || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
