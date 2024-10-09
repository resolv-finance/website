import React, { useState } from "react";
import Image from "next/image";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { shortenAddress } from "@/utils/functions";
import { ReferralTracker } from "./ReferralTracker";
import { REFERRAL_TRACKER_URL } from "@/utils/constants";
import axios from "axios";
import {
  SignOut,
  User,
  UserCircle,
  Wallet,
  Copy,
} from "@phosphor-icons/react/dist/ssr";
import * as Toast from "@radix-ui/react-toast";

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
  const [showToast, setShowToast] = useState(false);
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const copyReferralLink = () => {
    const link = `https://resolv.finance?referredBy=${referralCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

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
          <div
            className="mt-4 p-2 border border-dashed border-gray-300 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
            onClick={copyReferralLink}
          >
            <span className="text-sm font-medium">
              Referral Code: {referralCode}
            </span>
            <Copy size={16} />
          </div>
          <button
            onClick={() => disconnect()}
            className="mt-4 w-full p-2 bg-[#EC625C] text-white rounded-md text-sm"
          >
            <div className="w-full flex items-center justify-center gap-4">
              <p>Sign Out</p>
              <SignOut color="white" />
            </div>
          </button>
        </div>
      )}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
          open={showToast}
          onOpenChange={setShowToast}
        >
          <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate900 text-[15px]">
            Copied to clipboard
          </Toast.Title>
          <Toast.Description asChild>
            <p className="[grid-area:_description] m-0 text-slate400 text-[13px] leading-[1.3]">
              Referral link copied successfully!
            </p>
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </div>
  );
};
