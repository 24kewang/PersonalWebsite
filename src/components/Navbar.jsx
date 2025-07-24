import {useState, useRef, useEffect} from "react";
import clsx from "clsx";
import { flushSync } from 'react-dom';
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
  const [selected, setSelected] = useState("");

  // Scroll to section on initial load if user already selected one
  useEffect(() => {
    if (window.location.hash) {
      handleTabChange(window.location.hash.substring(1)); // get the hash without the #
    }
  }, []); // Run only once after initial mount

  // Handle tab change and scroll into view
  const handleTabChange = (key) => {
    // Force immediate render of updated tab -- mainly for mobile menu display before menu disappears
    flushSync(() => {
      setSelected(key); // Force immediate render
    });
    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState('', document.title, '#' + key); // Manually reset URL
    }
    setIsMenuOpen(false);
    // If using refs
    //refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    
  };

  // Handle logo click to scroll to top and reset selected tab
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setSelected(""); // Reset selected tab
    window.history.pushState('', document.title, '/'); // Manually reset URL
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
    // Navbar height can be set as such or via CSS override (which centralizes control in index.css)
    <Navbar /* height="2rem" */ className="fixed navbar-custom" ref={navRef} onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden cursor-pointer"
        />
        <Link className="font-bold text-logo" href=""
          onClick={handleLogoClick}>
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
            <Tab key={item} title={item} />
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
      <NavbarMenu 
        ref={menuRef} 
        className="!w-fit !max-h-fit !overflow-hidden !p-5 backdrop-blur-md bg-header"
      >
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item}`}>
            <Link
              className={clsx("navbarmenu-text-size", selected === item && "text-selected font-bold")}
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
