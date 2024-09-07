import Link from "next/link";

export default function Nav() {
    return (
      <nav className="flex gap-5">
            <Link href="/" className="hover:underline hover:font-bold hover:bg-blue-900 hover:text-white">
                Home
            </Link>
            <Link href="/about" className="hover:underline hover:font-bold hover:bg-blue-900 hover:text-white">
                About
            </Link>
            <Link href="/profiles" className="hover:underline hover:font-bold hover:bg-blue-900 hover:text-white">
                Profiles
            </Link>
      </nav>
    );
  }
  