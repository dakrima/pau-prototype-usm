import React, { createContext, useContext, ReactNode } from "react";
import { useApplications } from "@/hooks/use-applications";
import { Assistantship } from "@/components/AssistantshipCard";

interface ApplicationsContextData {
  applications: Assistantship[];
  setApplications: React.Dispatch<React.SetStateAction<Assistantship[]>>; // Actualizado
  addApplication: (assistantship: Assistantship) => void;
  isApplied: (id: string) => boolean;
}

const ApplicationsContext = createContext<ApplicationsContextData | undefined>(undefined);

export const ApplicationsProvider = ({ children }: { children: ReactNode }) => {
  const { applications, setApplications, addApplication, isApplied } = useApplications();

  return (
    <ApplicationsContext.Provider value={{ applications, setApplications, addApplication, isApplied }}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplicationsContext = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error("useApplicationsContext must be used within an ApplicationsProvider");
  }
  return context;
};