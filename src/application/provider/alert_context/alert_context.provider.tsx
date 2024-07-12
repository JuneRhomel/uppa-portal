// src/contexts/AlertContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AlertComponent from "../../../components/alert/alert.component";

interface AlertContextProps {
  showAlert: (
    message: string,
    severity?: "success" | "info" | "warning" | "error",
    title?: string
  ) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("info");

  const showAlert = (newMessage: string, newSeverity: "success" | "info" | "warning" | "error", newTitle?: string) => {
    setMessage(newMessage);
    setTitle(newTitle);
    setSeverity(newSeverity);
    setIsOpen(true);
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 4000); // Set the timer to 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertComponent
        open={isOpen}
        severity={severity}
        title={title}
        onClose={handleClose}
        slideDirection="right"
      >
        {message}
      </AlertComponent>
    </AlertContext.Provider>
  );
};
