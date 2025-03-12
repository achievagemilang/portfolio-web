import type { Metadata } from "next"
import ContactForm from "@/components/about/contact-form"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About | Achieva Gemilang",
  description: "Learn more about me and my professional journey",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl flex justify-center lg:justify-start font-bold mb-6">About Me</h1>

          {/* Profile picture */}
          <div className="flex justify-center lg:justify-start mb-8">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20">
              <Image src="/new_pas_foto.jpeg?height=160&width=160" alt="Your Name" fill className="object-cover" />
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
            Hi, I'm Cip, a Software Engineer with a business-driven mindset, blending technical expertise with strategic thinking to build scalable, user-centric solutions. 

            </p>
            <p className="mb-4">
            With a strong foundation in mobile development (Flutter, Kotlin, Swift) and full-stack technologies (Next.js, Go, Spring Boot, Django, etc.), 
            I’ve built and delivered various projects like Citizen Journalism, BikunTracker Mobile, Questify, and more!
            </p>
            
            <p className="mb-4">
              I LOVE learning especially self improvement stuffs. In tech niche, I'm currently dive in learning more about AI agents, Blockchain, and WEB3 to elevate my products. Occasionally, I write blogs/threads to share my perspective and takeaways from my learning journey just to document them in public. As they say, the most effective learning technique is arguably learning in public 🚀.
            </p>

            <p className="mb-4">
              When I'm not coding, you can find me singing, reading, or gaming.
            </p>

            <p className="mb-4">
              Feel free to reach out if you'd like to collaborate or just chat!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-8">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="https://drive.google.com/drive/u/0/folders/1GJxg0jQSK2cSS-4r4W7QKeSIfZIAyRKB">Resume/CV</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="https://linktr.ee/achieva.futura" target="_blank" rel="noopener noreferrer">My Socials</Link>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

