import {
  Button,
  TextInput,
  PasswordInput,
  Paper,
  Stack,
  Container,
  Title,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  logindefaultvalue,
  loginSchema,
  type LoginFormValues,
} from "../validation/login.schema";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { IconCircleCheck } from "@tabler/icons-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: logindefaultvalue,
  });

  const onSubmit = (data: LoginFormValues) => {
    notifications.show({
      message: `User login sucessfully !!`,
      color: "yellow",
      icon: <IconCircleCheck size={25} />,
      withBorder: true,
    });
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/home");
  };

  return (
    <div style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
      <div
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "16px 32px",
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        Hashtechy
      </div>

      <Container size={420} pt={80}>
        <Paper p="lg" radius="md" bg="#333" style={{ color: "white" }}>
          <Title order={3} mb="lg" style={{ color: "white" }}>
            Login
          </Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="Enter email"
                {...register("email")}
                error={errors.email?.message}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter password"
                {...register("password")}
                error={errors.password?.message}
              />

              <Button type="submit" fullWidth color="cyan" mt="md">
                Go
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
