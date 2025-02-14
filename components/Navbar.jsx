"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

export default function Navbar({ session }) {
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const handleSignOut = () => {
    setToggleDropDown(false);
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="flex_between w-full my-4 pt-3">
      <a href="/" className="flex gap-2 flex_center">
        <Image
          src="/assets/images/logo.svg"
          width="30"
          height="30"
          alt="Promptopia Logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </a>
      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/prompt/create" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image || ""}
                width="37"
                height="37"
                alt="User Profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => signIn("google")}
            className="black_btn"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="flex relative sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image || ""}
              width="37"
              height="37"
              alt="User Profile"
              className="rounded-full"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/prompt/create"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => signIn("google")}
            className="black_btn"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
