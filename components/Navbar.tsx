import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";

function Navbar() {
    const session = {};
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href={"/"}>
          <Image
            src={"/logo.svg"}
            width={0}
            height={0}
            className={"logoImage"}
            alt="Sketch Haven"
          />
        </Link>
        <ul className="xl:flex hidden gap-7">
          {NavLinks.map((link, i) => (
            <Link href={link.href} key={i}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {
            session ? (<>USER PHOTO </>) : (<AuthProviders />)
        }
      </div>
    </nav>
  );
}

export default Navbar;
