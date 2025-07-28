"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"

export function Header() {
  return (
    <header className="bg-[#ffffff] border-b border-[#eaeaea] px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-[#a797fd] to-[#5a5a5a] rounded-md"></div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-[#333333] hover:text-[#222222] font-medium">
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
          <Button className="bg-[#a797fd] hover:bg-[#9485fc] text-white px-6 py-2 rounded-2xl">Create Jobs</Button>
        </DialogTrigger>
      </div>
    </header>
  )
}
