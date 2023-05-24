"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Nav() {
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { data: session } = useSession();
  const profileLink = `/profile/${session?.user.id}`;

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const Avatar = ({ mobile = false }) => {
    return (
      <Image
        src={session?.user.image}
        width={37}
        height={37}
        className="rounded-full cursor-pointer"
        alt="profile"
        onClick={() => mobile && setToggleDropdown(!toggleDropdown)}
      />
    );
  };

  const ProvidersButton = ({ providers }) => {
    return (
      <>
        {providers &&
          Object.values(providers).map(({ id, name }) => (
            <button
              key={name}
              onClick={signIn.bind(this, id)}
              className="black_btn"
            >
              Sign in
              <span className="hidden sm:block">&nbsp;with {name}</span>
            </button>
          ))}
      </>
    );
  };

  return (
    <nav className="z-20 sticky flex justify-between items-center max-w-7xl mx-auto w-full text-center mb-16 pt-3 px-8">
      <Link href="/" className="flex_center gap-2">
        <Image
          src="/next.svg"
          alt="logo"
          width={100}
          height={100}
          className="object-contain"
        />
        <p className="logo_text ml-2">Hands-on</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create" className="black_btn">
              Create New
            </Link>

            <button onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href={profileLink}>
              <Avatar />
            </Link>
          </div>
        ) : (
          <ProvidersButton providers={providers} />
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex ">
        {session?.user ? (
          <>
            <Avatar mobile />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={profileLink}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create New
                </Link>
                <button
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </>
        ) : (
          <ProvidersButton providers={providers} />
        )}
      </div>
    </nav>
  );
}
