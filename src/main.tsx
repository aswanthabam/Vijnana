import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import LoaderStateProvider from "./components/toploader/useLoader.tsx";
import ToastStateProvider from "./components/toast/useToast.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <LoaderStateProvider>
      <ToastStateProvider>
        <App />
      </ToastStateProvider>
    </LoaderStateProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
