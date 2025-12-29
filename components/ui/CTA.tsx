"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"


export default function CTA() {
    const router = useRouter()

    return(
        <section className="cta-section">
            <div className="cta-badge">Start learning your way.</div>
            <h2 className="text-3xl font-bold">Build and Personalize Your Learning Companion</h2>
            <p>Pick a name, a subject, voice & personality - and start learning through voice conversations that feel natural and fun.</p>
            <Image 
                src="/images/cta.svg" 
                alt="cta"
                width={362}
                height={232}
            />
            <button className="btn-primary" onClick={() => router.push("/companions/new")}>
                <Image 
                    src="/icons/plus.svg"
                    alt="plus"
                    width={12}
                    height={12}
                />
                <span>Build a New Companion</span>
            </button>
        </section>
    )
}