import { z } from "zod";


export const sendOtpSchema = z.object({
    mobile: z.string()
    .min(1, "شماره تلفن الزامی است.")
    .max(11, "حداکثر ۱۱ رقم باشد")
    .regex(/^[0-9]+$/, "شماره موبایل را به شکل صحیح وارد کنید"),
});

export const checkOtpSchema = z.object({
    code: z.string()
        .min(6, 'کد نا معتبر')
        .max(6, 'کد تایید باید ۶ رقم باشد.')
})

export const updateProfileSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد.'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد.'),
});