import Link from "next/link";
import { NavbarList } from "@/data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import NavigationMenuPage from "./NavigationMenu";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center p-2 fixed w-full top-0 left-0 z-999">
      <div className="space-x-4 bg-white p-4 shadow-md rounded-full   hover:shadow-xl hover:p-6 hover:animate-none transition duration-200 mt-2 border-gray-300 border-1">
        <ul className="flex justify-around gap-x-8 text-gray-500 ">
          {NavbarList.map((item) => {
            return (
              <li key={item.href} className=" ">
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-2 text-md  "
                >
                  <Image
                    src={item.icon}
                    alt="House Icon"
                    width={26}
                    height={26}
                  />
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          {item.menu?.map((location) => (
                            <NavigationMenuLink>
                              <ul>
                                <li>{location}</li>
                              </ul>
                            </NavigationMenuLink>
                          ))}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  {/* {item.name}
                  {item.menu} */}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <div className="flex gap-3.5">
        <Link href={"/host"}>host</Link>
        <p>sidebar</p>
      </div> */}
    </nav>
  );
};

export default Navbar;
