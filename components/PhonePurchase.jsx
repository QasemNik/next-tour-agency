'use client'

import Image from "next/image"
import Link from "next/link"

function PhonePurchase() {
    return (
        <section className="flex justify-center items-center">
            <Link href='/contact-us'>
                <Image className="h-auto"  sizes="100vw" priority src={"/images/Group 44.png"} alt="our-group" height={251} width={1188} />
            </Link>
        </section>
    )
}

export default PhonePurchase