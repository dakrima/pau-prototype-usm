import { useState, useEffect } from "react";
import { Assistantship } from "@/components/AssistantshipCard";

const STORAGE_KEY = "assistantship_applications";

export const useApplications = () => {
  const [applications, setApplications] = useState<Assistantship[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const addApplication = (assistantship: Assistantship) => {

    const status = assistantship.department === "Matemática" ? "accepted" : "pending";
    const newApplication: Assistantship = {
      ...assistantship,
      status,
    };
    setApplications(prev => [...prev, newApplication]);
  };

  const isApplied = (id: string) => {
    return applications.some(app => app.id === id);
  };

  return {
    applications,
    setApplications,
    addApplication,
    isApplied,
  };
};
