import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLinkedInAPI } from "@/hooks/useLinkedInAPI";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const LinkedInCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { exchangeToken } = useLinkedInAPI();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setErrorMsg(error === "user_cancelled_authorize" ? "Authorization was cancelled" : error);
      setTimeout(() => navigate("/dashboard/linkedin"), 3000);
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMsg("No authorization code received");
      setTimeout(() => navigate("/dashboard/linkedin"), 3000);
      return;
    }

    const handleExchange = async () => {
      const success = await exchangeToken(code);
      if (success) {
        setStatus("success");
        toast.success("LinkedIn connected successfully!");
        setTimeout(() => navigate("/dashboard/linkedin"), 1500);
      } else {
        setStatus("error");
        setErrorMsg("Failed to connect LinkedIn account");
        setTimeout(() => navigate("/dashboard/linkedin"), 3000);
      }
    };

    handleExchange();
  }, [searchParams, exchangeToken, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        {status === "loading" && (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <p className="text-lg font-medium">Connecting your LinkedIn account...</p>
            <p className="text-sm text-muted-foreground">Please wait while we verify your credentials</p>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="w-12 h-12 text-success mx-auto" />
            <p className="text-lg font-medium text-success">LinkedIn Connected!</p>
            <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
          </>
        )}
        {status === "error" && (
          <>
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <p className="text-lg font-medium text-destructive">Connection Failed</p>
            <p className="text-sm text-muted-foreground">{errorMsg}</p>
            <p className="text-xs text-muted-foreground">Redirecting...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LinkedInCallback;
