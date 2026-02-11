import { AuthResponseSchema, type AuthResponse } from "../schemas/auth.schema";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type AuthType = "login" | "register";

async function loginToApi(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await axios.post("http://localhost:20179/api/login", {
    email,
    password,
  });
  const parsedResponse = AuthResponseSchema.safeParse(response.data);
  if (!parsedResponse.success) {
    throw new Error("Invalid response from API");
  }
  return parsedResponse.data;
}

async function registerToApi(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await axios.post("http://localhost:20179/api/register", {
    email,
    password,
  });
  const parsedResponse = AuthResponseSchema.safeParse(response.data);
  if (!parsedResponse.success) {
    throw new Error("Invalid response from API");
  }
  return parsedResponse.data;
}

export function useAuth(type: AuthType) {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      let apiResponse: AuthResponse;
      if (type === "login") {
        apiResponse = await loginToApi(email, password);
      } else {
        apiResponse = await registerToApi(email, password);
      }
      localStorage.setItem("authToken", apiResponse);
      return apiResponse;
    },
  });
}
