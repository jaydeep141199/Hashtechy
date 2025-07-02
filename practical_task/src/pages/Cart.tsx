import {
  Box,
  Button,
  Group,
  Image,
  Modal,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const updateCart = (id: number, change: number) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    if (item.quantity === 1 && change === -1) {
      setItemToRemove(item);
      setConfirmOpen(true);
      return;
    }

    const updated = cart.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + change } : i
    );

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const confirmDeleteItem = () => {
    if (!itemToRemove) return;

    const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setConfirmOpen(false);
    setItemToRemove(null);
  };

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Box>
      <Title order={3} mb="lg">
        My Cart
      </Title>

      <Table striped withTableBorder verticalSpacing="md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "1px solid black" }}>
          {cart.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: "20px" }}>
                <Group>
                  <Image src={item.image} w={50} h={50} fit="contain" />
                  <Box>
                    <Text fw={600}>{item.title}</Text>
                    <Text size="xs" c="dimmed">
                      {item.description.slice(0, 60)}...
                    </Text>
                  </Box>
                </Group>
              </td>
              <td>₹ {item.price}</td>
              <td>
                <Group>
                  <Button size="xs" onClick={() => updateCart(item.id, -1)}>
                    -
                  </Button>
                  <Text>{item.quantity}</Text>
                  <Button size="xs" onClick={() => updateCart(item.id, 1)}>
                    +
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td style={{ padding: "10px", textAlign: "center" }}>
              <Title order={2} fw={700}>
                Total
              </Title>
            </td>
            <td>
              <Title order={4} fw={700}>
                ₹ {total} /-
              </Title>
            </td>
          </tr>
        </tfoot>
      </Table>

      <Modal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Remove Item"
        centered
      >
        <Text>
          Are you sure you want to remove <b>{itemToRemove?.title}</b> from the
          cart?
        </Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={confirmDeleteItem}>
            Yes, Remove
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}
