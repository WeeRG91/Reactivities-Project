import { useForm, useWatch } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { GitHub, LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

function LoginForm() {
  const [notVerified, setNotVerified] = useState<boolean>(false);
  const { login, resendConfirmationEmail } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const email = useWatch({ control, name: "email" });

  const handleResendEmail = async () => {
    try {
      await resendConfirmationEmail.mutateAsync({ email });
      setNotVerified(false);
    } catch (error) {
      console.log(error);
      toast.error("Problem sending email - please check email address");
    }
  };

  const onSubmit = async (data: LoginSchema) => {
    await login.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || "/activities");
      },
      onError: (error) => {
        if (error.message === "NotAllowed") {
          setNotVerified(true);
        }
      },
    });
  };

  const loginWithGitHub = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirectUri=${redirectUrl}&scope=read:user user:email`;
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 3,
        maxWidth: "md",
        mx: "auto",
        borderRadius: 3,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        color={"secondary.main"}
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Sign in</Typography>
      </Box>
      <TextInput label="Email" control={control} name="email" />
      <TextInput
        label="Password"
        type="password"
        control={control}
        name="password"
      />
      <Button
        loading={!isValid || isSubmitting}
        type="submit"
        variant="contained"
        size="large"
      >
        Login
      </Button>

      <Button
        onClick={loginWithGitHub}
        startIcon={<GitHub />}
        sx={{ backgroundColor: "black" }}
        type="button"
        variant="contained"
        size="large"
      >
        Login with GitHub
      </Button>

      {notVerified ? (
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography textAlign="center" color="error">
            Your email had not been verified. You can click the button to resend
            the verification email.
          </Typography>
          <Button
            disabled={resendConfirmationEmail.isPending}
            onClick={handleResendEmail}
          >
            Resend email link
          </Button>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
          <Typography>
            Forgot password ? Click <Link to="/forgot-password">here</Link>
          </Typography>

          <Typography sx={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Typography component={Link} to="/register" color="primary">
              Sign up
            </Typography>
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default LoginForm;
