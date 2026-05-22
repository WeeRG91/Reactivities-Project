import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";
import { useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";
import type { ChangePasswordSchema } from "../schemas/changePasswordSchema";

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: async (credentials: LoginSchema) => {
      await agent.post("/login?useCookies=true", credentials);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const register = useMutation({
    mutationFn: async (credentials: RegisterSchema) => {
      await agent.post("/account/register", credentials);
    },
  });

  const verifyEmail = useMutation({
    mutationFn: async ({ userId, code }: { userId: string; code: string }) => {
      await agent.post(`/account/confirm-email?userId=${userId}&code=${code}`);
    },
  });

  const resendConfirmationEmail = useMutation({
    mutationFn: async ({
      email,
      userId,
    }: {
      email?: string;
      userId?: string | null;
    }) => {
      await agent.get(`/account/resendConfirmEmail`, {
        params: {
          email,
          userId,
        },
      });
    },
    onSuccess: () => {
      toast.success("Email sent - please check your email.");
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      await agent.post("/account/logout");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["activities"] });
      navigate("/");
    },
  });

  const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await agent.get<User>("/account/user-info");
      return response.data;
    },
    enabled: !queryClient.getQueryData(["user"]),
  });

  const changePassword = useMutation({
    mutationFn: async (data: ChangePasswordSchema) => {
      await agent.post("/account/change-password", data);
    },
  });

  const forgotPassword = useMutation({
    mutationFn: async (email: string) => {
      await agent.post("/forgotPassword", { email });
    },
  });

  const resetPassword = useMutation({
    mutationFn: async (data: ResetPassword) => {
      await agent.post("/resetPassword", data);
    },
  });

  const fetchGitHubToken = useMutation({
    mutationFn: async (code: string) => {
      const response = await agent.post(`/account/github-login?code=${code}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    login,
    register,
    logout,
    currentUser,
    loadingUserInfo,
    verifyEmail,
    resendConfirmationEmail,
    changePassword,
    forgotPassword,
    resetPassword,
    fetchGitHubToken,
  };
};
