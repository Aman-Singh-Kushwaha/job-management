"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import logo from "@/public/logo.svg"

export function Header() {
  return (
    <header className="px-6 py-4">
      <div className="max-w-[890px] w-[calc(100%-80px)] h-20 mx-auto rounded-[122px] shadow-[0_0_20px_0_rgba(127,127,127,0.15)] flex items-center justify-around text-xl font-semibold">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 rounded-md">
              <img src={logo.src} alt="Logo" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-[#333333] hover:text-[#222222]">
              Home
            </Link>
            <Link href="/" className="text-[#686868] hover:text-[#333333]">
              Find Jobs
            </Link>
            <Link href="#" className="text-[#686868] hover:text-[#333333]">
              Find Talents
            </Link>
            <Link href="#" className="text-[#686868] hover:text-[#333333]">
              About us
            </Link>
            <Link href="#" className="text-[#686868] hover:text-[#333333]">
              Testimonials
            </Link>
          </nav>
        </div>

        <DialogTrigger asChild>
          <Button className="bg-gradient-to-b from-[#A128FF] to-[#6100AD] text-lg  px-4 py-2 rounded-full hover:bg-gradient-to-t">Create Jobs</Button>
        </DialogTrigger>
      </div>
    </header>
  )
}
