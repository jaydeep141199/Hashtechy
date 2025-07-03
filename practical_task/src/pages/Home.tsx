import {
  AppShell,
  Text,
  Button,
  Card,
  Group,
  Image,
  Title,
  Grid,
  Divider,
  ActionIcon,
  Burger,
  Drawer,
  Stack,
  Modal,
  Badge,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconHeart,
  IconAlertTriangle,
  IconCircleCheck,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
};

type CartItem = Product & { quantity: number };

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [count, setCount] = useState(0);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data));

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    setCount(cart.length);
  }, []);

  const handleAddToCart = (product: Product) => {
    const existingCart = [...cartItems];
    const existingIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingIndex >= 0) {
      notifications.show({
        title: "Already in Cart",
        message: `${product.title} is already in your cart.`,
        color: "yellow",
        icon: <IconAlertTriangle size={25} />,
        withBorder: true,
      });
      return;
    }

    const updatedCart = [...existingCart, { ...product, quantity: 1 }];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCount(updatedCart.length);

    notifications.show({
      title: "Added to Cart",
      message: `${product.title} added successfully!`,
      color: "green",
      icon: <IconCircleCheck size={25} />,
      withBorder: true,
    });
  };

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
            <Group>
              <Text fw={700} size="lg">
                Hashtechy
              </Text>
            </Group>
            <Group gap="xs">
              <ActionIcon
                variant="transparent"
                color="white"
                style={{ position: "relative" }}
                onClick={() => navigate("/cart")}
              >
                <Badge
                  color="red"
                  size="md"
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -1,
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                  radius="xl"
                  px={4}
                >
                  {count}
                </Badge>
                <IconHeart size={80} />
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
          <Title order={3} mb="md">
            All Products Listing
          </Title>

          <Grid gutter="md">
            {products.map((p) => (
              <Grid.Col key={p.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Card shadow="sm" padding="md" radius="md" withBorder p={40}>
                  <Card.Section>
                    <Image
                      src={p.image}
                      height={160}
                      alt={p.title}
                      fit="contain"
                    />
                  </Card.Section>
                  <Text fw={600} my="sm" lineClamp={1}>
                    {p.title}
                  </Text>
                  <Text size="sm" c="dimmed" lineClamp={2}>
                    {p.description}
                  </Text>
                  <Text fw={700} mt="sm">
                    ₹ {p.price}
                  </Text>
                  <Button
                    fullWidth
                    mt="md"
                    onClick={() => handleAddToCart(p)}
                    bg="black"
                  >
                    Add To Cart
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
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
