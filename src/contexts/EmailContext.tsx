import { createContext, useContext, useState, ReactNode } from "react";

interface EmailContextType {
  pendingEmail: string;
  setPendingEmail: (email: string) => void;
  clearPendingEmail: () => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailProvider({ children }: { children: ReactNode }) {
  const [pendingEmail, setPendingEmail] = useState("");

  const clearPendingEmail = () => setPendingEmail("");

  return (
    <EmailContext.Provider
      value={{ pendingEmail, setPendingEmail, clearPendingEmail }}
    >
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error("useEmail must be used within an EmailProvider");
  }
  return context;
}
