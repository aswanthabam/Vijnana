import { ReactNode, createContext, useContext, useState } from "react";

interface ToastState {
  status: { status: boolean; message: string | null; hideAfter: number | null };
  setStatus: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      message: string | null;
      hideAfter: number | null;
    }>
  >;
}

const ToastStateContext = createContext<ToastState | undefined>(undefined);

interface ToastStateProviderProps {
  children: ReactNode;
}

export const ToastStateProvider: React.FC<ToastStateProviderProps> = ({
  children,
}) => {
  const [status, setStatus] = useState<{
    status: boolean;
    message: string | null;
    hideAfter: number | null;
  }>({ status: false, message: null, hideAfter: null });

  const toastState: ToastState = {
    status,
    setStatus,
  };

  return (
    <ToastStateContext.Provider value={toastState}>
      {children}
    </ToastStateContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastStateContext);
  if (!context) {
    throw new Error("useToastState must be used within a SharedStateProvider");
  }
  function setToastStatus(
    status: boolean,
    message: string | null = null,
    hideAfter: number | null = null
  ) {
    context!.setStatus({
      status: status,
      message: message,
      hideAfter: hideAfter,
    });
  }
  const props = {
    status: context!.status.status,
    message: context!.status.message,
    hideAfter: context!.status.hideAfter,
    setToastStatus: setToastStatus,
    // setLoaderPercentage: setLoaderPercentage,
  };
  //   window.lstatus = status;

  return props;
};

export default ToastStateProvider;
// exports useLoader = useLoader;
