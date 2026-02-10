import { useEffect, useState } from "react";
import { isIPValid } from "../utils/isIPValid";
import { useIPInfo } from "../hooks/useIPInfo";

export default function SearchAndInfo({
  setIpInfo,
  refetchUserHistory,
}: {
  setIpInfo: (info: any) => void;
  refetchUserHistory: () => void;
}) {
  const [ip, setIp] = useState("");
  const [submittedIp, setSubmittedIp] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");

  // if submittedIp exists, run search mode
  // otherwise run self mode
  const requestType = submittedIp ? "search" : "self";

  const {
    data: result,
    error: hookError,
    isLoading,
  } = useIPInfo(requestType, submittedIp);

  // if input becomes empty, go back to self mode
  useEffect(() => {
    if (ip.trim() === "") {
      setSubmittedIp(undefined);
      setError("");
    }
  }, [ip]);

  useEffect(() => {
    if (result && !isLoading && !hookError) {
      setIpInfo(result);
      if (refetchUserHistory) {
        refetchUserHistory();
      }
    }
  }, [result, isLoading, hookError, setIpInfo, refetchUserHistory]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (ip.trim() === "") {
      setSubmittedIp(undefined);
      setError("");
      return;
    }

    if (!isIPValid(ip)) {
      setError("Invalid IP address");
      return;
    }

    setError("");
    setSubmittedIp(ip);
  };

  return (
    <div className="flex flex-col gap-6 min-h-100">
      <form
        className="bg-gray-900 p-6 rounded-2xl"
        onSubmit={handleSubmit}
        style={{
          minHeight: 420,
          maxHeight: 420,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter IP address..."
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Validation Error */}
        {error && (
          <div className="text-red-500">
            {(error as any)?.response?.data?.message
              ? (error as any).response.data.message
              : error}
          </div>
        )}

        {/* Server Error */}
        {hookError && (
          <div className="flex items-center justify-center flex-1">
            <p className="text-red-500">
              {(hookError as any)?.response?.data?.message || hookError.message}
            </p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-400">Loading...</p>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && !hookError && (
          <div className="bg-gray-800 p-4 rounded-lg text-left max-h-96 overflow-auto flex-1">
            <pre className="text-white">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
}
