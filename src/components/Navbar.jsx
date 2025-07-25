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
  Tabs,
  Tab,
  menu,
  Progress,
} from "@heroui/react";
import ContactButton from "./ContactButton.jsx";


export const Logo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 64 32" width="72" xmlns="http://www.w3.org/2000/svg">
  <path
    fill="currentColor"
    d="
      M7 4 H11 V28 H7 V4 Z
      M11 16 L20 28 H24 L15 17 L24 4 H20 L11 16 Z
    "
  />
  <path
    fill="currentColor"
    d="
      M32 2 L32 4 L38 24 L42 4 L46 28 H42 L38 10 L34 28 H32 Z
    "
  />
</svg>





  );
};

export default function Nav(/*ONLY if using refs: {refs}*/) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState("");

  // Scroll progress calculation

  // Below uses HeroUI native Progress logic, which has delay

  // const [scrollProgress, setScrollProgress] = useState(0);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  //     const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  //     setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // Native scroll progress calculation without delay, uses recurring event listener
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    document.body.style.setProperty('--scroll-progress-width', `${progress}%`);
  };

  window.addEventListener('scroll', handleScroll);
  // Set once initially (in case already scrolled)
  // handleScroll();



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
    <div className="fixed top-0 left-0 right-0 z-50" ref={navRef}>
    {/* Navbar height can be set as such or via CSS override (which centralizes control in index.css) */}
    <Navbar /* height="2rem" */ className="navbar-custom" onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden cursor-pointer"
        />
        <Link className="font-bold logo" href=""
          onClick={handleLogoClick}>
          <Logo />
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
          <ContactButton />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu 
        ref={menuRef} 
        className="navbar-menu-custom"
      >
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item}`}>
            <Link
              className={clsx("navbar-menu-text-size", selected === item && "text-selected font-bold")}
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
    <Progress
        // value={scrollProgress}
        className="absolute bottom-0 left-0 right-0 z-51"
        classNames={{
          base: "w-full",
          track: "bg-transparent",
          indicator: "scroll-progress absolute bottom-0 left-0 right-0 bg-primary h-1"
        }}
        aria-label="Page scroll progress"
    />
    </div>
  );
}
