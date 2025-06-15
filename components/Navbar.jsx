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
import SearchProducts from "./SearchForm";

const Navbar = () => {
  return (
    <nav className="flex justify-around gap-x-2 sticky top-2  items-center p-2 z-999 ">
      <div className="space-x-4 bg-white p-4 shadow-md rounded-full      hover:animate-none transition duration-200 mt-2 border-gray-300 border-1">
        <ul className="flex justify-around gap-x-1 text-gray-500 ">
          {NavbarList.map((item, ind) => {
            return (
              <li key={item.name} className=" ">
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-1 text-md  "
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
                            <NavigationMenuLink key={location.name}>
                              <ul>
                                <Link href={`/location/${location.href}`}>
                                  <li>{location.name}</li>
                                </Link>
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
      div
  
        <Link href={"/host"}>host</Link>
        <p>sidebar</p>
      </div> */}
      <div>
        <SearchProducts />
      </div>
    </nav>
  );
};

export default Navbar;
