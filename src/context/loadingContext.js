import { createContext, useState, useContext } from "react";
const LoadingContext = createContext();
const UpdateLoadingContext = createContext();

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};

export const useUpdateLoadingContext = () => {
  return useContext(UpdateLoadingContext);
};

export const LoadingProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState(true);
  return (
    <LoadingContext.Provider value={loadingState}>
      <UpdateLoadingContext.Provider value={setLoadingState}>
        {children}
      </UpdateLoadingContext.Provider>
    </LoadingContext.Provider>
  );
};
