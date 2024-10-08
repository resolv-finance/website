import React from "react";

interface ReferralTrackerProps {
  status: "bronze" | "silver" | "gold" | "diamond";
}

export const ReferralTracker: React.FC<ReferralTrackerProps> = ({ status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case "bronze":
        return {
          text: "You're 3 referrals away from 1 year",
          months: 3,
          completed: 1,
          emoji: "🥉",
        };
      case "silver":
        return {
          text: "You're 2 referrals away from 1 year",
          months: 6,
          completed: 2,
          emoji: "🥈",
        };
      case "gold":
        return {
          text: "You're 1 referral away from 1 year",
          months: 9,
          completed: 3,
          emoji: "🥇",
        };
      case "diamond":
        return {
          text: "You've secured 1 year",
          months: 12,
          completed: 4,
          emoji: "💎",
        };
      default:
        return {
          text: "You're 3 referrals away from 1 year",
          months: 3,
          completed: 1,
          emoji: "🥉",
        };
    }
  };

  const { text, months, completed, emoji } = getStatusInfo();

  const getProgressBarColor = (index: number) => {
    const colors = ["#F0A868", "#C0C0C0", "#FFD700", "#B9F2FF"];
    return index < completed ? colors[index] : "#E5E7EB";
  };

  return (
    <div className="bg-white rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-2">Referral tracker</h3>
      <p className="text-sm text-gray-600 mb-4">{text} of free protection.</p>
      <div className="flex space-x-1 mb-4">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="h-2 flex-1 rounded-full"
            style={{
              backgroundColor: getProgressBarColor(index),
              boxShadow:
                index < completed ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "none",
            }}
          ></div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="text-sm mr-2">{emoji}</span>
        <span className="text-sm font-medium">
          {status.charAt(0).toUpperCase() + status.slice(1)} status
        </span>
      </div>
      <p className="text-sm font-semibold mt-2">
        {months} months free protection!
      </p>
    </div>
  );
};
