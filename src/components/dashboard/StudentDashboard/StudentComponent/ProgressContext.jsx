import { createContext, useState, useEffect } from 'react';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children, role }) => {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  useEffect(() => {
    const savedSteps = localStorage.getItem(`${role}_completedSteps`);
    const savedCompletion = localStorage.getItem(`${role}_isFormCompleted`);
    if (savedSteps) setCompletedSteps(new Set(JSON.parse(savedSteps)));
    if (savedCompletion) setIsFormCompleted(JSON.parse(savedCompletion));
  }, [role]);

  useEffect(() => {
    localStorage.setItem(`${role}_completedSteps`, JSON.stringify([...completedSteps]));
  }, [completedSteps, role]);

  useEffect(() => {
    localStorage.setItem(`${role}_isFormCompleted`, JSON.stringify(isFormCompleted));
  }, [isFormCompleted, role]);

  return (
    <ProgressContext.Provider
      value={{ completedSteps, setCompletedSteps, isFormCompleted, setIsFormCompleted }}
    >
      {children}
    </ProgressContext.Provider>
  );
};