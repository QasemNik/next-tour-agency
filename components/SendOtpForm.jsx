'use client'

import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { sendOtpSchema } from "@/shared/schema/authSchema"
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query"
import { sendOtp } from "@/services/authOtp"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuthStore } from "@/store/useAuthStore "

function SendOtpForm() {
    const setOtpCode = useAuthStore((state) => state.setOtpCode )
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: zodResolver(sendOtpSchema) })

    const { mutate, isPending } = useMutation({
        mutationFn: sendOtp,
        onSuccess: (data, variable) => {
            setOtpCode(data.code)
            console.log(`[FRONTEND-RECEIVE] OTP from server is: ${data}`);
            router.push(`/auth/verify-otp?mobile=${variable}`)
            // toast.info(`${data.code} کد ورود : `)
            console.log(data, variable);

        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || "خطایی رخ داده"
            toast.error(errorMessage);
        }
    })
    const onSubmit = (data) => {
        console.log(data);
        mutate(data.mobile)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6 ">
                    <div className="grid gap-y-3.5 ">
                        <Label
                            className="text-gray-900/80 font-extralight"
                            htmlFor="mobile">شماره موبایل خود را وارد کنید</Label>
                        <Input
                            className={`w-full mt-2 border-gray-300`}
                            id="mobile"
                            type="tel"
                            placeholder="09123456789"
                            {...register("mobile")}
                            dir="ltr"
                            required
                        />
                        {
                            errors.mobile && (
                                <p className="mt-1 text-right text-sm text-red-600">{errors.mobile.message}</p>
                            )}
                    </div>
                </div>
                <Button
                    className="w-full mt-5 text-white bg-[var(--color-primary)] cursor-pointer"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? 'در حال ارسال' : 'ارسال کد تأیید'}

                </Button>
            </form>
        </div>
    )
}

export default SendOtpForm