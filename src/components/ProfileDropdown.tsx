import React, { useState } from "react";
import Image from "next/image";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { shortenAddress } from "@/utils/functions";
import { ReferralTracker } from "./ReferralTracker";
import { REFERRAL_TRACKER_URL } from "@/utils/constants";
import axios from "axios";
import { User, UserCircle, Wallet } from "@phosphor-icons/react/dist/ssr";

interface ProfileDropdownProps {
  email: string;
  onEmailChange: (email: string) => void;
  referralCode: string;
  freeMonths: number;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  email,
  onEmailChange,
  referralCode,
  freeMonths,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="p-2 rounded-full bg-gray-200">
        <UserCircle size={32} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4">
          <p className="text-sm">
            <strong>Wallet Address:</strong> {shortenAddress(address)}
          </p>
          <p className="text-sm mt-2">
            <strong>Balance:</strong> {balance?.formatted} {balance?.symbol}
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-2 w-full p-2 border rounded-md text-sm placeholder-red-300"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          <div className="mt-4">
            <ReferralTracker freeMonths={freeMonths} />
          </div>
          <p className="text-sm mt-4">Referral Code: {referralCode}</p>
          <button
            onClick={() => disconnect()}
            className="mt-4 w-full p-2 bg-red-500 text-white rounded-md text-sm"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
