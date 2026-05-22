import { useEffect, useRef, useState } from "react";
import { useAccount } from "../../lib/hooks/useAccount";
import { Link, useSearchParams } from "react-router";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { EmailRounded } from "@mui/icons-material";

function VerifyEmail() {
  const { verifyEmail, resendConfirmationEmail } = useAccount();
  const [status, setStatus] = useState<string>("verifying");
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const code = searchParams.get("code");
  const hadRun = useRef(false);

  useEffect(() => {
    if (code && userId && !hadRun.current) {
      hadRun.current = true;
      verifyEmail
        .mutateAsync({ userId, code })
        .then(() => setStatus("verified"))
        .catch(() => setStatus("failed"));
    }
  }, [userId, code, verifyEmail]);

  const getBody = () => {
    switch (status) {
      case "verifying":
        return <Typography>Verifying...</Typography>;
      case "failed":
        return (
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="center"
          >
            <Typography>
              Verification failed. You can try resending the verify link to your
              email.
            </Typography>
            <Button
              onClick={() => resendConfirmationEmail.mutate({ userId })}
              disabled={resendConfirmationEmail.isPending}
            >
              Resend verification email
            </Button>
          </Box>
        );
      case "verified":
        return (
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="center"
          >
            <Typography>Email has been verified - you can now login</Typography>
            <Button component={Link} to="/login">
              Go to login
            </Button>
          </Box>
        );
      default:
        break;
    }
  };

  return (
    <Paper
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 6,
      }}
    >
      <EmailRounded sx={{ fontSize: 100 }} color="primary" />
      <Typography gutterBottom variant="h3">
        Email verification
      </Typography>
      <Divider />
      {getBody()}
    </Paper>
  );
}

export default VerifyEmail;
