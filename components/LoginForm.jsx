'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import SendOtpForm from "./SendOtpForm"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"

function LoginPage() {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const GoogleLoginHandler = async (e) => {
        setIsGoogleLoading(true)
        e.preventDefault()
        await signIn("google", { callbackUrl: "/dashboard" })
    }

    return (
        
        <>  
        <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-none">
                <Link href="/"
                 className="flex justify-end ml-5">
                    <X size={20} className="cursor-pointer text-gray-500" />
                </Link>
            <CardHeader className="text-center font-black">
                <CardTitle>ورود به تورينو</CardTitle>
            </CardHeader>
            <CardContent>
                <SendOtpForm />
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button
                    onClick={GoogleLoginHandler}
                    disabled={isGoogleLoading}
                    className="w-fit bg-transparent text-black cursor-pointer shadow-gray-400/50"
                    >
                    با حساب گوگل وارد شوید
                </Button>
            </CardFooter>
        </Card>
            </>
    )
}

export default LoginPage
