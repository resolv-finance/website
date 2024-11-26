import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";

const WaitlistConnect = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return email.indexOf("@") !== -1;
  };

  const handleSubmit = async (openConnectModal: () => void) => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(
        "https://dkq9ddk2fc.execute-api.us-east-1.amazonaws.com/Prod/add-email-to-wallet",
        {
          email: email,
        }
      );

      if (response.status === 200) {
        // Immediately open the wallet connect modal after successful email submission
        openConnectModal();
      } else {
        throw new Error("Failed to join waitlist");
      }
    } catch (error) {
      setError("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                  onClick={() => handleSubmit(openConnectModal)}
                  disabled={isSubmitting}
                  className="h-full px-8 rounded-full bg-gradient-to-r from-[#D1FFE7] to-[#D0EAFF] text-gray-800 font-medium text-lg transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-90 focus:outline-none whitespace-nowrap"
                >
                  {isSubmitting
                    ? "Joining..."
                    : "Join waitlist and connect wallet"}
                </button>
              </div>
            );
          }}
        </ConnectButton.Custom>
        {error && <p className="text-[#EC625C] text-base mt-2 ml-8">{error}</p>}
      </div>
    </div>
  );
};

export default WaitlistConnect;
