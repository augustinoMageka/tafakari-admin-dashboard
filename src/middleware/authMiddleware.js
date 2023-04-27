import { useEffect } from "react";
import { useAuthContext } from "@/context/authContext";
import { useLoadingContext } from "@/context/loadingContext";
import { useRouter } from "next/router";

export default function AuthMiddleware({ children }) {
  const router = useRouter();
  const user = useAuthContext();
  const loading = useLoadingContext();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [loading, user]);
  return <>{children}</>;
}
