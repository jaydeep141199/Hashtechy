import {
  AppShell,
  Burger,
  Group,
  Text,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [cartCount] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]").length
  );

  const navigate = useNavigate();

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header h={60} px="md" bg="dark.9" c="white">
        <Group justify="space-between" h="100%">
          <Text fw={700}>Hashtechy</Text>
          <Group>
            <ActionIcon
              variant="transparent"
              color="white"
              onClick={() => navigate("/cart")}
              style={{ position: "relative" }}
            >
              <Badge
                color="red"
                size="md"
                style={{
                  position: "absolute",
                  top: -4,
                  right: -5,
                  zIndex: 1,
                  pointerEvents: "none",
                }}
                radius="xl"
                px={6}
              >
                {cartCount}
              </Badge>
              <IconHeart size={28} />
            </ActionIcon>

            <Burger
              opened={drawerOpened}
              onClick={() => setDrawerOpened(!drawerOpened)}
              color="white"
            />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
