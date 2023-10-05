import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import { getCurretUser } from "@/lib/session";
import { signOut } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurretUser();
  // console.log(session);

  return (
    <nav className=" flexBetween navbar">
      <div className="flex-1 flexStart gap-10 ">
        <Link href={"/"}>
          <Image src="/logo.svg" width={115} height={43} alt="Fleiable-logo" />
        </Link>
        <ul className=" xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4 ">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link
              href={"/create-project"}
              className="bg-primary-purple text-white rounded-xl text-sm font-meddium max-md:w-full flexCenter gap-3 px-4 py-3"
            >
              <Image src="/plus.svg" width={14} height={14} alt="left" />
              Project
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
