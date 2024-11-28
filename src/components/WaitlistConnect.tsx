import { useState, useEffect, useRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import axios from "axios";
import { useEmail } from "@/contexts/EmailContext";
import { REFERRAL_TRACKER_URL } from "@/utils/constants";
import * as Toast from "@radix-ui/react-toast";

const WaitlistConnect = ({ onSuccess }: { onSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { setPendingEmail } = useEmail();
  const { address } = useAccount();
  const prevAddressRef = useRef<string | undefined>();

  const validateEmail = (email: string) => {
    return email.indexOf("@") !== -1;
  };

  const handleEmailSubmit = async (openConnectModal: () => void) => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setPendingEmail(email);
    openConnectModal();
  };

  useEffect(() => {
    const checkWalletAndStoreEmail = async () => {
      if (address && address !== prevAddressRef.current) {
        setIsSubmitting(true);
        try {
          // First, store the wallet address
          const referralPayload = {
            walletAddress: address,
            ipAddress: await fetchIpAddress(),
          };

          const referredBy = localStorage.getItem("referredBy");
          if (referredBy) {
            referralPayload.referredBy = referredBy;
          }

          const walletResponse = await axios.post(
            `${REFERRAL_TRACKER_URL}/wallet-referral-system`,
            referralPayload
          );

          if (walletResponse.status === 200) {
            // Then, store the email
            const emailResponse = await axios.post(
              "https://dkq9ddk2fc.execute-api.us-east-1.amazonaws.com/Prod/add-email-to-wallet",
              {
                walletAddress: address,
                email: email,
              }
            );

            if (emailResponse.status === 200) {
              setToastMessage("Email saved successfully!");
              setShowToast(true);
              onSuccess();
            }
          }
        } catch (error) {
          setError("Failed to complete registration. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    checkWalletAndStoreEmail();
    prevAddressRef.current = address;
  }, [address, email]);

  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      return response.data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return null;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto mb-16">
        <div className="relative w-full">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div className="relative flex items-center h-14 bg-white rounded-full border-2 border-gray-200">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 px-8 bg-transparent border-none outline-none text-gray-500 placeholder-gray-400 text-lg"
                  />
                  <button
                    onClick={() => handleEmailSubmit(openConnectModal)}
                    disabled={isSubmitting}
                    className="h-full px-8 rounded-r-full bg-gradient-to-r from-[#D1FFE7] to-[#D0EAFF] text-gray-800 font-medium text-lg transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-90 focus:outline-none whitespace-nowrap"
                  >
                    {isSubmitting
                      ? "Processing..."
                      : "Join waitlist and connect wallet"}
                  </button>
                </div>
              );
            }}
          </ConnectButton.Custom>
          {error && (
            <p className="text-[#EC625C] text-base mt-2 ml-8">{error}</p>
          )}
        </div>
      </div>

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
          open={showToast}
          onOpenChange={setShowToast}
        >
          <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate900 text-[15px]">
            Notification
          </Toast.Title>
          <Toast.Description asChild>
            <p className="[grid-area:_description] m-0 text-slate400 text-[13px] leading-[1.3]">
              {toastMessage}
            </p>
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </>
  );
};

export default WaitlistConnect;
