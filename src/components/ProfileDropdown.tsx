import React, { useState } from "react";
import Image from "next/image";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { shortenAddress } from "@/utils/functions";
import { ReferralTracker } from "./ReferralTracker";
import { REFERRAL_TRACKER_URL } from "@/utils/constants";
import axios from "axios";

interface ProfileDropdownProps {
  email: string;
  onEmailChange: (email: string) => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  email,
  onEmailChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const [referralCode, setReferralCode] = useState("");
  const [freeMonths, setFreeMonths] = useState(3);

  const toggleDropdown = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    // Callback to get referral code
    const fetchReferralCode = async () => {
      const options = {
        walletAddress: address,
      };
      try {
        const response = await axios.post(
          `${REFERRAL_TRACKER_URL}/wallet-referral-system`,
          options
        );
        if (response.status == 200 || response.status == 201) {
          const body = response.data.body;
          const bodyObject = JSON.parse(body);
          setReferralCode(bodyObject.referralCode);
          setFreeMonths(bodyObject.freeMonths);
        }
      } catch (error) {}
    };
    fetchReferralCode();
  }, [address]);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="p-2 rounded-full bg-gray-200">
        <Image src="/profile-icon.svg" alt="Profile" width={24} height={24} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4">
          <p className="text-sm font-medium">{shortenAddress(address)}</p>
          <p className="text-sm mt-2">
            Balance: {balance?.formatted} {balance?.symbol}
          </p>
          {email ? (
            <p className="text-sm mt-2">{email}</p>
          ) : (
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full p-2 border rounded-md text-sm placeholder-red-300"
              onChange={(e) => onEmailChange(e.target.value)}
            />
          )}
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
