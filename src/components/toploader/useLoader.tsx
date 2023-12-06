import { ReactNode, createContext, useContext, useState } from "react";

interface LoaderState {
  status: boolean;
  loaders: Promise<any>[];
  setStatus: React.Dispatch<
    React.SetStateAction<{ status: boolean; loaders: Promise<any>[] }>
  >;
}

const LoaderStateContext = createContext<LoaderState | undefined>(undefined);

interface LoaderStateProviderProps {
  children: ReactNode;
}

export const LoaderStateProvider: React.FC<LoaderStateProviderProps> = ({
  children,
}) => {
  const [status, setStatus] = useState({
    status: false,
    loaders: [] as Promise<any>[],
  });
  const loaderState: LoaderState = {
    status: status.status,
    loaders: status.loaders,
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
  function setStatusFalse(loader: Promise<any>) {
    context!.loaders.splice(context!.loaders.indexOf(loader), 1);
    if (context!.loaders.length == 0)
      context!.setStatus({ status: false, loaders: context!.loaders });
    else context!.setStatus({ status: true, loaders: context!.loaders });
  }
  function addLoader(loader: Promise<any>) {
    context!.loaders.push(loader);
    context!.setStatus({ status: true, loaders: context!.loaders });
    loader
      .then(() => {
        setStatusFalse(loader);
      })
      .catch(() => {
        setStatusFalse(loader);
      });
  }
  const props = {
    status: context!.status,
    addLoader: addLoader,
  };

  return props;
};

export default LoaderStateProvider;
// exports useLoader = useLoader;
