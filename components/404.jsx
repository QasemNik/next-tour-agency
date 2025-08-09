import { Header } from "@/layout/Header"
import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
    return (
        <>
            <Header />
            <main className="mx-auto max-w-6xl px-4 mb-40 mt-16">
                <div className="flex flex-col-reverse items-center justify-between gap-10 sm:flex-row">
                    <div className="text-center sm:text-right sm:max-w-md flex flex-col items-center sm:items-start">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-6">صفحه مورد نظر یافت نشد!</h1>
                        <Link
                            href="/"
                            className="bg-[#D8FFE1] text-[#28A745] font-semibold py-3 px-8 rounded-lg mt-3"
                        >
                            بازگشت به صفحه اصلی
                        </Link>
                    </div>

                    {/* تصویر */}
                    <div>
                        <Image
                            priority
                            alt="404 تصویر"
                            src="/images/Error TV.png"
                            width={320}
                            height={320}
                            className="h-72 w-72 object-contain sm:h-80 sm:w-80"
                        />
                    </div>
                </div>
            </main>

        </>
    )
}
