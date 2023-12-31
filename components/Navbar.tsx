import { NavLinks } from "@/constants";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import { ProfileMenu } from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <>
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
          {session?.user ? (
            <>
              <ProfileMenu session={session} />
              <Link href={`create-sketch`}>Share Work</Link>
            </>
          ) : (
            <AuthProviders />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
