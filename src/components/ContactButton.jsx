import {
    Button,
    Link
} from "@heroui/react";

export default function ContactButton() {
  return (
    <Button as={Link} color="primary" href="#Contact" variant="flat">Contact</Button>
  );
}
