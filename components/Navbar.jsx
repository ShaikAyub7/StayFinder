import Link from "next/link";
import { NavbarList } from "@/data";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-8 ">
      <div className="text-lg font-bold">MyApp</div>
      <div className="space-x-4">
        <ul className="flex justify-around gap-x-5 text-gray-500">
          {NavbarList.map((item) => {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-2 text-lg  "
                >
                  <Image
                    src={item.icon}
                    alt="House Icon"
                    width={36}
                    height={36}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-3.5">
        <Link href={"/host"}>host</Link>
        <p>sidebar</p>
      </div>
    </div>
  );
};

export default Navbar;
