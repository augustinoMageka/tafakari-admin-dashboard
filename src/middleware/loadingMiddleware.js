import LoadingScreen from "@/components/loadingScreen";
import { useLoadingContext } from "@/context/loadingContext";

export default function LoadingMiddleware({ children }) {
  const loading = useLoadingContext();
  return loading ? <LoadingScreen /> : children;
}
