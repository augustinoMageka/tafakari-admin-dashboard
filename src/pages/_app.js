import "@/styles/globals.css";
import AuthProvider from "@/context/authContext";
import AuthMiddleware from "@/middleware/authMiddleware";
import LoadingMiddleware from "@/middleware/loadingMiddleware";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider } from "@/context/loadingContext";
import { ModalProvider } from "@/context/modalContext";

export default function App({ Component, pageProps }) {
  return (
    <ModalProvider>
      <LoadingProvider>
        <AuthProvider>
          <AuthMiddleware>
            <LoadingMiddleware>
              <div className="bg-slate-100 min-h-screen">
                <Component {...pageProps} />
              </div>
            </LoadingMiddleware>
          </AuthMiddleware>
        </AuthProvider>
        <ToastContainer />
      </LoadingProvider>
    </ModalProvider>
  );
}
