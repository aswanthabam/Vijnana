import { ReactNode, createContext, useContext, useState } from "react";

interface LoaderState {
  status: { status: boolean; much: number };
  setStatus: React.Dispatch<
    React.SetStateAction<{ status: boolean; much: number }>
  >;
}

const LoaderStateContext = createContext<LoaderState | undefined>(undefined);

interface LoaderStateProviderProps {
  children: ReactNode;
}

export const LoaderStateProvider: React.FC<LoaderStateProviderProps> = ({
  children,
}) => {
  const [status, setStatus] = useState({ status: false, much: 0 });

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
  function setLoaderStatus(status: boolean, percentage: number) {
    context!.setStatus({ status: status, much: percentage });
  }
  const props = {
    status: context!.status.status,
    setLoaderStatus: setLoaderStatus,
    percentage: context!.status.much,
    // setLoaderPercentage: setLoaderPercentage,
  };
  //   window.lstatus = status;

  return props;
};

export default LoaderStateProvider;
// exports useLoader = useLoader;
