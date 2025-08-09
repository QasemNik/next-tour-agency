import Link from "next/link"
import { Phone } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Contact */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">T</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Torino</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>تلفن پشتیبانی: ۰۲۱-۸۵۷۴</span>
                        </div>
                    </div>

                    {/* Torino Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">تورینو</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link href="/about-us" className="hover:text-green-600">
                                    درباره ما
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-green-600">
                                    تماس با ما
                                </Link>
                            </li>
                            <li>
                                <Link href="/why-torino" className="hover:text-green-600">
                                    چرا تورینو
                                </Link>
                            </li>
                            <li>
                                <Link href="/travel-insurance" className="hover:text-green-600">
                                    بیمه مسافرتی
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Services */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">خدمات مشتریان</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link href="/support" className="hover:text-green-600">
                                    پشتیبانی آنلاین
                                </Link>
                            </li>
                            <li>
                                <Link href="/purchase-guide" className="hover:text-green-600">
                                    راهنمای خرید
                                </Link>
                            </li>
                            <li>
                                <Link href="/refund-guide" className="hover:text-green-600">
                                    راهنمای استرداد
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-green-600">
                                    پرسش و پاسخ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Certifications */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">مجوزها</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-xs text-gray-500">مجوز {i}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
                    کلیه حقوق این وب سایت متعلق به تورینو میباشد.
                </div>
            </div>
        </footer>
    )
}