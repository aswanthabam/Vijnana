import { ReactNode, createContext, useContext, useState } from "react";

interface LoaderState {
  status: { status: boolean };
  setStatus: React.Dispatch<React.SetStateAction<{ status: boolean }>>;
}

const LoaderStateContext = createContext<LoaderState | undefined>(undefined);

interface LoaderStateProviderProps {
  children: ReactNode;
}

export const LoaderStateProvider: React.FC<LoaderStateProviderProps> = ({
  children,
}) => {
  const [status, setStatus] = useState({ status: false });

  const loaderState: LoaderState = {
    status,
    setStatus,
  };

  return (
    <LoaderStateContext.Provider value={loaderState}>
      {children}
    </LoaderStateContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderStateContext);
  if (!context) {
    throw new Error("useLoaderState must be used within a SharedStateProvider");
  }
  function setLoaderStatus(status: boolean) {
    context!.setStatus({ status: status });
  }
  const props = {
    status: context!.status.status,
    setLoaderStatus: setLoaderStatus,
    // setLoaderPercentage: setLoaderPercentage,
  };
  //   window.lstatus = status;

  return props;
};

export default LoaderStateProvider;
// exports useLoader = useLoader;
