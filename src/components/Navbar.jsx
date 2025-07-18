import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Tabs,
  Tab,
} from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Nav(/*ONLY if using refs: {refs}*/) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("about");

  const handleTabChange = (key) => {
    setIsMenuOpen(false);
    setSelected(key);
    // If using refs
    //refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const menuItems = [
    "About",
    "Experiences",
    "Projects",
    "Contact",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        <Tabs
          aria-label="Navigation tabs"
          variant="underlined"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="About" title="About" href="#about"/>
          <Tab key="Experiences" title="Experiences" />
          <Tab key="Projects" title="Projects" />
          <Tab key="Contact" title="Contact" />
        </Tabs>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="w-1/4">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}`}>
            <Link
              className="w-full"
              color="primary"
              href={`#${item.toLowerCase()}`}
              onClick={() => handleTabChange(item.toLowerCase())}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
