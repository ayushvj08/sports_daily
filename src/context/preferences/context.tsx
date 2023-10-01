import React, { createContext, useReducer } from "react";
import { Actions, PreferencesState, preferencesReducer } from "./reducer";
const initialState = {
  preferences: { sports: [0], teams: [0] },
  isLoading: false,
  isError: false,
  errorMessage: "",
};
type PreferencesContextType = {
  preferencesState: PreferencesState;
  preferencesDispatch: React.Dispatch<Actions>;
};
export const PreferencesContext = createContext<PreferencesContextType>({
  preferencesState: initialState,
  preferencesDispatch: () => {},
});

export const PreferencesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [preferencesState, preferencesDispatch] = useReducer(
    preferencesReducer,
    initialState
  );
  return (
    <PreferencesContext.Provider
      value={{ preferencesState, preferencesDispatch }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};
