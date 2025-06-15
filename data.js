import Image from "next/image";
import NavigationMenuPage from "./components/NavigationMenu";
export const NavbarList = [
  {
    href: "/",
    name: "Homes",
    icon: "/house.png",
    menu: [
      {
        name: "hi",
      },
    ],
  },
  {
    href: "/",
    name: "locations",
    icon: "/summer.png",
    menu: [
      {
        name: "hyderabad",
        href: "hyderabad",
      },
      {
        name: "Mumbai",
        href: "mumbai",
      },
      {
        name: "delhi",
        href: "delhi",
      },
      {
        name: "goa",
        href: "goa",
      },
    ],
  },
  {
    href: "/services",
    name: "Services",
    icon: "/room-service.png",
    menu: [
      {
        name: "hi",
      },
    ],
  },
  {
    href: "/shortList",
    name: "ShortLits",
    icon: "/summer.png",
    menu: [
      {
        name: "hi",
      },
    ],
  },
  {
    href: "/host",
    name: "Host",
    icon: "/summer.png",
    menu: [
      {
        name: "hi",
      },
    ],
  },
];
