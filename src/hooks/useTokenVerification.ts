import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../provider/auth-provider";

async function verifyToken(): Promise<boolean> {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.post(
    "http://localhost:20179/api/verify",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export function useTokenVerification() {
  const { token, logout } = useAuthContext();

  const {
    data: isValid,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tokenVerification", token],
    queryFn: verifyToken,
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // Consider stale after 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
    retry: false, // Don't retry on failure
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    refetchOnWindowFocus: true, // Verify when user returns to tab
  });

  // Logout if verification fails
  if (error) {
    console.warn("Token verification failed, logging out");
    logout();
  }

  return {
    isValid: isValid ?? false,
    error: error as Error | null,
    refetch,
  };
}
