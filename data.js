import Image from "next/image";
import NavigationMenuPage from "./components/NavigationMenu";
export const NavbarList = [
  {
    href: "/",
    name: "Homes",
    icon: "/house.png",
  },
  {
    href: "/",
    name: "locations",
    icon: "/summer.png",
    menu: ["hyderabad", "mumbai", "delhi"],
  },
  {
    href: "/services",
    name: "Services",
    icon: "/room-service.png",
  },
  {
    href: "/shortList",
    name: "ShortLits",
    icon: "/summer.png",
  },
  {
    href: "/host",
    name: "Host",
    icon: "/summer.png",
  },
];
