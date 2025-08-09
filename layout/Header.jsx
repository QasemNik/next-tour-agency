"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, User, X } from "lucide-react";
import SigninBottomSVG from "@/public/svg/signinBottom";
import { UserProfileMenu } from "./UserMenuDropdown";
import { useAuthStore } from "@/store/useAuthStore ";
import { usePathname } from "next/navigation";
import { navLinks } from "@/shared/constants/navLinks";
import { useMounted } from "@/hooks/useMounted";
import { Progress } from "@/components/ui/progress";

export function Header() {

    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user } = useAuthStore();
    const mounted = useMounted()
 
    if (!mounted) return <Progress value={33} />

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 font-Yekan">
            <div className="flex h-20 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/*  Logo & Navigation  --- */}
                <div className="hidden md:flex items-center gap-x-8">
                    <Link href="/">
                        <Image
                            priority
                            className="w-20 h-20"
                            src={"/images/torino.png"}
                            width={100}
                            height={100}
                            alt="logo-torino"
                        />
                    </Link>
                    <nav className="flex items-center gap-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={` text-gray-700 hover:text-green-600 ${pathname === link.href ? "font-bold active" : "text-gray-800"}`}>{link.label}</Link>
                        )
                        )}
                    </nav>
                </div>

                {/* --- Auth Section  --- */}
                <div className="hidden md:flex items-center ">
                    {isAuthenticated ? (
                        <>
                            <UserProfileMenu />
                        </>
                    ) : (
                        <Link href="/auth/login" >
                            <Button
                                className="flex items-center  cursor-pointer ring-3  ring-[var(--color-primary)] gap-x-4 bg-transparent">
                                <User className="w-3 h-3" fill="#28A745" stroke="#28A745" />
                                <span className="font-bold text-[var(--color-primary)]">ورود | ثبت نام</span>
                            </Button>
                        </Link>
                    )}
                </div>

                {/* --- Burger Menu --- */}
                <div className="flex md:hidden w-full items-center justify-between">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                        {isOpen ? <X size={28} /> : <Menu size={30} />}
                    </button>
                    {isAuthenticated ? (
                        <div className="space-y-2">
                            <Link href="/profile" onClick={() => setIsOpen(false)} className="block font-semibold px-2">
                                {user.mobile}
                            </Link>
                        </div>
                    ) : (<Link href={'/auth/login'}>
                        <SigninBottomSVG className="cursor-pointer" />
                    </Link>
                    )}
                </div>
            </div>

            {/* ---  Dropdown Panel --- */}
            {isOpen && (
                <div className="md:hidden fixed inset-y-0 right-0 top-13 w-1/2   bg-white z-50 transition-transform duration-300">
                    <div className="px-8 pt-6 ">
                        <nav className="flex flex-col gap-4 text-gray-700  font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${pathname === link.href ? "active font-bold" : "text-gray-800"}`}
                                    onClick={!setIsOpen}>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}