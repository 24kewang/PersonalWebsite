import {useState, useRef, useEffect} from "react";
import clsx from "clsx";

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
  menu,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState("About");

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

  // Refs for menu and navbar to handle outside click logic
  const menuRef = useRef();
  const navRef = useRef();

  // Close menu when clicking outside -- for small screens only
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        isMenuOpen &&
        menuRef.current &&
        !(menuRef.current.contains(event.target) || navRef.current.contains(event.target))
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMenuOpen]);

  // Override background scroll lock when menu is open
  useEffect(() => {
    document.documentElement.style.overflow = "auto";
  }, [isMenuOpen]);

  const menuItems = [
    "About",
    "Experiences",
    "Projects",
  ];

  return (
    <Navbar className="fixed" ref={navRef} onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden cursor-pointer"
        />
        <Link className="font-bold text-inherit" href="#">
          <AcmeLogo />
          <p>Kevin Wang</p>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        <Tabs
          aria-label="Navigation tabs"
          variant="underlined"
          selectedKey={selected}
          onSelectionChange={handleTabChange}
        >
          {menuItems.map((item) => (
            <Tab key={item} title={item} className="text-primary" />
          ))}
        </Tabs>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#Contact" variant="flat">
            Contact
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu ref={menuRef} className="w-1/4">
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item}`}>
            <Link
              className={clsx("w-full", selected === item && "text-selected font-bold")}
              color="primary"
              href={`#${item}`}
              onClick={() => handleTabChange(item)}
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
