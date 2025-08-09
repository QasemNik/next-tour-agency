"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, UserCog } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore ";
import ProfileSVG from "@/public/svg/profile";
import LogoutSVG from "@/public/svg/logout";


export function UserProfileMenu() {
    const router = useRouter();
    const { user, logout: logoutAction } = useAuthStore();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            logoutAction()
            router.push('/');
            toast.info("از حساب خود خارج شدید");
        } catch (error) {
            toast.error("خروج با خطا مواجه شد.");
            console.log(error);

        }

    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-semibold text-[#28A745] focus-visible:ring-0">
                    {user?.mobile}
                    <ChevronDown className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 ml-3 bg-white  border-none px-2" dir="rtl">
                <DropdownMenuLabel className="flex items-center  gap-3" >
                    <div className="bg-gray-200 p-2 rounded-full w-8">
                        <ProfileSVG className="w-4 h-4" />
                    </div>
                    {user?.mobile}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer ">
                        <UserCog className="mr-2 h-4 w-4" />
                        <span>اطلاعات حساب کاربری</span>
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}
                    className="cursor-pointer text-red-600 border-t border-gray-300/50">
                    <LogoutSVG className="mr-2 " />
                    <span>خروج از حساب کاربری</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}