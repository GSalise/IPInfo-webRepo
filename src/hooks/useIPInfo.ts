import { IPInfoSchema, type IPInfoData } from "../schemas/ipinfo.schema";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type RequestType = "self" | "search";

async function fetchSelfIPInfo(): Promise<IPInfoData> {
  const token = localStorage.getItem("authToken");
  const response = await axios.get(
    "https://ipinfocheck.dcism.org/api/ipinfo",
    // "http://localhost:20179/api/ipinfo",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const parsedResponse = IPInfoSchema.safeParse(response.data);
  if (!parsedResponse.success) {
    throw new Error("Invalid response from API");
  }
  return parsedResponse.data;
}

async function searchIPInfo(requestedIP: string): Promise<IPInfoData> {
  const token = localStorage.getItem("authToken");
  const response = await axios.get(
    `https://ipinfocheck.dcism.org/api/ipinfo/search/${requestedIP}`,
    // `http://localhost:20179/api/ipinfo/search/${requestedIP}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const parsedResponse = IPInfoSchema.safeParse(response.data);
  if (!parsedResponse.success) {
    throw new Error("Invalid response from API");
  }

  return parsedResponse.data;
}

export function useIPInfo(type: RequestType, requestedIP?: string) {
  const enabled =
    type === "self" || (type === "search" && !!requestedIP?.trim());

  const {
    data: apiResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ipInfo", type, requestedIP],
    queryFn: async () => {
      let apiResponse: IPInfoData;
      if (type === "self") {
        apiResponse = await fetchSelfIPInfo();
      } else {
        // before using the hook, make sure that the api is valid and not empty before calling the API
        apiResponse = await searchIPInfo(requestedIP!);
      }

      return apiResponse;
    },
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });

  return {
    data: apiResponse || [],
    isLoading,
    error: error as Error | null,
  };
}
