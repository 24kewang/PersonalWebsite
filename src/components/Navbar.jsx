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
  const [selected, setSelected] = useState("");

  // Scroll to section on initial load if user already selected one
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.substring(1)); // Get hash without the #
      setSelected(window.location.hash.substring(1));
      if(el){
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []); // Run only once after initial mount

  // Handle tab change and scroll into view
  const handleTabChange = (key) => {
    setIsMenuOpen(false);
    setSelected(key);
    // If using refs
    //refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState('', document.title, '#' + key); // Manually reset URL
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
    <Navbar className="fixed navbar-custom" ref={navRef} onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden cursor-pointer"
        />
        <Link className="font-bold text-inherit" href=""
          onClick={((e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
            setSelected(""); // Reset selected tab
            window.history.pushState('', document.title, '/'); // Manually reset URL
          })}>
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
        classNames={
          "h-auto gap-5 pl-6 pr-0 mt-2 !w-auto !h-auto !inset-x-auto !bottom-auto !right-0 !left-auto !top-[var(--navbar-height)] !max-w-none min-w-fit !p-4 !gap-1"
        }
      >
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item}`}>
            <Link
              className={clsx("navbarmenu-text-size w-full", selected === item && "text-selected font-bold")}
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
