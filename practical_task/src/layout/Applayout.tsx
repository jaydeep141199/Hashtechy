// import {
//   AppShell,
//   Burger,
//   Group,
//   Text,
//   ActionIcon,
//   Badge,
// } from "@mantine/core";
// import { IconHeart } from "@tabler/icons-react";
// import { useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";

// export default function AppLayout() {
//   const [drawerOpened, setDrawerOpened] = useState(false);
//   const [cartCount] = useState(
//     JSON.parse(localStorage.getItem("cart") || "[]").length
//   );

//   const navigate = useNavigate();

//   return (
//     <AppShell padding="md" header={{ height: 60 }}>
//       <AppShell.Header h={60} px="md" bg="dark.9" c="white">
//         <Group justify="space-between" h="100%">
//           <Text fw={700}>Hashtechy</Text>
//           <Group>
//             <ActionIcon
//               variant="transparent"
//               color="white"
//               onClick={() => navigate("/cart")}
//               style={{ position: "relative" }}
//             >
//               <Badge
//                 color="red"
//                 size="md"
//                 style={{
//                   position: "absolute",
//                   top: -4,
//                   right: -5,
//                   zIndex: 1,
//                   pointerEvents: "none",
//                 }}
//                 radius="xl"
//                 px={6}
//               >
//                 {cartCount}
//               </Badge>
//               <IconHeart size={28} />
//             </ActionIcon>

//             <Burger
//               opened={drawerOpened}
//               onClick={() => setDrawerOpened(!drawerOpened)}
//               color="white"
//             />
//           </Group>
//         </Group>
//       </AppShell.Header>

//       <AppShell.Main>
//         <Outlet />
//       </AppShell.Main>
//     </AppShell>
//   );
// }
// src/layout/AppLayout.tsx
import {
  AppShell,
  Burger,
  Group,
  Text,
  ActionIcon,
  Badge,
  Drawer,
  Stack,
  Title,
  Divider,
  Button,
  Modal,
} from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <>
      <AppShell padding="md" header={{ height: 60 }}>
        <AppShell.Header h={60} px="md" bg="dark.9" c="white">
          <Group justify="space-between" h="100%">
            <Text fw={700}>Hashtechy</Text>
            <Group gap="xs">
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
                onClick={() => setDrawerOpened((o) => !o)}
                color="white"
              />
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        position="right"
        size={240}
      >
        <Stack>
          <Title order={5}>Categories</Title>
          <Divider />
          <Text fw={600}>Makeup</Text>
          <Text pl="md">Face Makeup</Text>
          <Text pl="md">Lip Makeup</Text>
          <Text pl="md">Eye Makeup</Text>
          <Text pl="md">Brushes & Tools</Text>
          <Divider my="sm" />
          <Button
            color="red"
            variant="light"
            onClick={() => setLogoutModalOpen(true)}
          >
            Logout
          </Button>
        </Stack>
      </Drawer>

      <Modal
        opened={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Confirm Logout"
        centered
      >
        <Text mb="md">Are you sure you want to logout?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setLogoutModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleLogout}>
            Yes, Logout
          </Button>
        </Group>
      </Modal>
    </>
  );
}
