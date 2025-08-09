'use client'
import { checkOtp, sendOtp } from '@/services/authOtp';
import { checkOtpSchema } from '@/shared/schema/authSchema'
// import { setAuthCookies } from '@/utils/authCookie';
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner';
import { Label } from './ui/label';
import OTPInput from 'react-otp-input';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore ';

function CheckOtpForm() {

    const [timer, setTimer] = useState(25)
    const [canResend, setCanResend] = useState(false);
    const router = useRouter()
    const searchParam = useSearchParams()
    const mobile = searchParam.get('mobile')

    const setUser = useAuthStore(state => state.setUser);
    const otpCodeFromStore = useAuthStore(state => state.otpCode);   
    
    useEffect(() => {
            if (timer === 0) {
                setCanResend(true);
                return;
            }
            const intervalId = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }, [timer]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(checkOtpSchema),
        defaultValues: {
            code: otpCodeFromStore || "",
        }
    });

    const { mutate: checkOtpMutate, isPending } = useMutation({
        mutationFn: checkOtp,
        onSuccess: (data) => {
            console.log("this is on data log=>", data);

            // setAuthCookies('accessToken')       
            // setAuthCookies(data)
            setUser(data.user)
            console.log(data);
            toast.success('ورود با موفقیت انجام شد')
            router.push('/profile')
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'کد وارد شده صحیح نمی باشد'
            toast.error(errorMessage)
            console.log("this is on error log=>", error);
        }
    })

    //! resend code
    const { mutate: resendOtpMutate, isPending: isResending } = useMutation({
        mutationFn: sendOtp,
        onSuccess: (data) => {
            console.log("this is on submit log=>", data);
            setTimer(25);
            toast.info(`${data.code} کد جدید : `)
            setCanResend(false);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'خطا در ارسال مجدد کد.';
            toast.error(errorMessage);
            console.log("OTP ERROR:", error);
        }
    })

    const onSubmit = (data) => {
        if (!mobile) {
            router.push('/auth/login')
            return
        }
        checkOtpMutate({ mobile, code: data.code });
    }

    const handleResendCode = () => {
        if (!mobile) return
        resendOtpMutate(mobile)
        console.log(`[FRONTEND-RESEND] Resending OTP to: ${mobile}`);
    }

    return (
        <>
            <form
                className=""
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-fit max-w-md bg-white p-8 rounded-xl shadow-md">
                    <div className="flex flex-col gap-6">

                        {/* --- Back to login page and edit number ---*/}
                        <Link href="/auth/login"
                            className='flex justify-end cursor-pointer'>
                            <ArrowLeft />
                        </Link>

                        {/* --- Check Otp Form --- */}
                        <div className="grid gap-y-3.5">
                            <Label
                                htmlFor="code"
                                className="mb-6 flex-col gap-2">
                                <p className='text-lg font-bold'>
                                    کد تأیید را وارد کنید
                                </p>
                                <span className='text-sm text-gray-800'>
                                    کد تأیید  به شماره {mobile} ارسال شد
                                </span>
                            </Label>
                            <Controller
                                name="code"
                                control={control}
                                render={({ field }) => (
                                    <OTPInput
                                        value={field.value}
                                        onChange={field.onChange}
                                        numInputs={6}
                                        renderSeparator={<span>-</span>}
                                        containerStyle={{ direction: 'ltr' }}
                                        inputStyle={{
                                            width: '3rem',
                                            height: '3rem',
                                            margin: '0 0.3rem',
                                            fontSize: '1.5rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid #ccc',
                                        }}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                )}
                            />
                            {
                                errors.code && (
                                    <p className="mt-1 text-right text-sm text-red-600">
                                        {errors.code.message}
                                    </p>
                                )
                            }

                            {/* --- Resend OTP Code Logic --- */}
                            <div className="text-center mt-2 text-sm">
                                {canResend ? (
                                    <button
                                        onClick={handleResendCode}
                                        disabled={isResending}
                                        className="text-gray-900 bg-transparent font-bold  underline cursor-pointer "
                                    >
                                        {isResending ? "در حال ارسال..." : "ارسال مجدد"}
                                    </button>
                                ) : <span className="text-gray-500">
                                    ارسال مجدد تا {timer} ثانیه دیگر
                                </span>}
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full text-white bg-[var(--color-primary)] cursor-pointer"
                            disabled={isPending}
                        >
                            {isPending ? "در حال بررسی..." : "تایید کد"}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CheckOtpForm