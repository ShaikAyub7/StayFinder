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
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="navbar mb-2 p-5 sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex  justify-around items-center w-full ">
        <div className="flex items-center justify-center">StayFInder</div>
        <div className="">
          <ul className="flex gap-x-1 text-gray-500 ">
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
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center">{<UserButton />}</div>
        {/* <div className=" search-bar p-8 shadow-2xl">
          <SearchProducts />
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
