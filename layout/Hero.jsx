import Image from 'next/image'
import React from 'react'

export default function HeroSection() {
    return (
        <div>
            <Image
                className="h-auto w-full lg:h-80"
                src={"/images/hero.png"}
                priority
                alt="hero-section"
                width={1800}
                height={900}
            />
        </div>
    )
}
