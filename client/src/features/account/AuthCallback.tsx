import { useNavigate, useSearchParams } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";

function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { fetchGitHubToken } = useAccount();
  const code = params.get("code");
  const [loading, setLoading] = useState<boolean>(true);
  const fetched = useRef(false);
  const [response, setResponse] = useState<object | null>(null);

  useEffect(() => {
    if (!code || fetched.current) return;

    fetched.current = true;

    fetchGitHubToken
      .mutateAsync(code)
      .then(() => navigate("/activities"))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [code, fetchGitHubToken, navigate]);

  if (!code) return <Typography>Problem authenticating with GitHub</Typography>;

  return (
    <Box
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        gap: 3,
        maxWidth: "md",
        mx: "auto",
        borderRadius: 3,
        backgroundColor: "white",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
        <GitHub fontSize="large" />
        <Typography variant="h4">Logging in with GitHub</Typography>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Typography>Problem signing in with GitHub</Typography>
      )}
    </Box>
  );
}

export default AuthCallback;
