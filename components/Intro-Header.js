import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { User, Settings, History } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="p text-white" style={{ backgroundColor: '#012130' }}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center mb-4">
            <Image
              src="/logo-actual.png" // Replace with your logo path
              alt="CareerCraft Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </Link>

        <nav>
          <ul className="flex space-x-4 items-center text-m text-white mr-10">
            <li className="mx-2">
              <Link href="#footer" className="hover:underline">Contact Us</Link>
            </li>
            <li className="mx-2">
              <Link href="https://forms.gle/YkyaFLeZzA2BQCTi6" className="hover:underline">Help</Link>
            </li>
            <li className="mx-2">
              <Link href="/login" className="hover:underline">Login</Link>
            </li>
            <li className="mx-2">
              <Link href="/signup" className="hover:underline">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}