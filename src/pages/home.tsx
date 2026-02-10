import { useState } from "react";
import InfoAndHistory from "../components/info-and-history";
import SearchAndInfo from "../components/search-and-info";
import Map from "../components/map";
import { useAuthContext } from "../provider/auth-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchUserHistory } from "../hooks/useFetchUserHistory";

export default function Home() {
  const [ipInfo, setIpInfo] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuthContext();
  const queryClient = useQueryClient();
  const { refetch: refetchUserHistory } = useFetchUserHistory();

  const handleLogout = () => {
    setIpInfo(null);
    queryClient.clear();
    logout();
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center bg-black text-white pt-10 px-6">
      {/* HEADER */}
      <div className="relative flex items-center pr-8 pb-8 pl-8 rounded-2xl w-full bg-black">
        <div className="flex-1 text-left">
          <h1 className="text-4xl font-bold mb-4">Welcome to IP Details</h1>
          <h2 className="text-xl text-gray-400 mb-0">
            A website whose sole purpose is to provide information about IP
            addresses!
          </h2>
        </div>
        {showLogoutModal ? (
          <div className="flex gap-2 items-center">
            <span className="text-base mr-2">Are you sure?</span>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Yes, Logout
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </button>
        )}
      </div>

      {/* BODY */}
      <div className="flex flex-row w-full max-w gap-6 px-6">
        {/* LEFT SIDE (Search Bar) */}
        <div className="flex-1 bg-gray-900 p-6 rounded-2xl">
          <SearchAndInfo
            setIpInfo={setIpInfo}
            refetchUserHistory={refetchUserHistory}
          />
        </div>

        {/* RIGHT SIDE (IP Info) */}
        <div className="flex-1 bg-gray-900 p-6 rounded-2xl">
          <InfoAndHistory />
        </div>
      </div>

      <div className="flex flex-col w-full max-w gap-6 px-6 py-6">
        <Map ipInfo={ipInfo} />
      </div>
    </div>
  );
}
