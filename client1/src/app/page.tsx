'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { ThemeToggleButton } from "@/components/theme-toggle-button";

export default function Home() {
  useEffect(() => {
    document.title = "Home - proPAL AI";
  }, []);

  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-screen"> {/* Removed py-2 for full height navbar integration */}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <ThemeToggleButton className="border border-gray-300 dark:border-gray-600" />
            </div>
            <Link href="/signup">
              <NavbarButton variant="primary">Sign Up</NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <ThemeToggleButton />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <Link href="/signup">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Sign Up
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <main className="flex flex-col items-center justify-center flex-1 px-4 md:px-20 text-center pt-24 md:pt-32"> {/* Adjusted padding top */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Redefine conversations with VoiceAI
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Our AI-powered voice agents create human-like, emotionally expressive
                    conversations that transform customer interactions across your business.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  >
                    Explore features
                  </Link>
                </div>
              </div>
              {/* Placeholder for an image or animation if you have one */}
              {/* <Image src="/placeholder.svg" alt="Hero" width="550" height="550" className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square" /> */}
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Enterprise-ready Voice AI platform
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform helps businesses create custom AI voice agents that deliver 10x
                  productivity across all customer interactions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">🗣️ Human-like Voice Agents</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Create custom AI voice agents with expressive emotions and personalities tailored to your brand in minutes.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">📞 Automated Call Handling</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Simplify both inbound and outbound calls with automated workflows that handle customer interactions 10x faster.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">🔁 Seamless Campaign Management</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Auto-schedule and run large-scale outreach campaigns with detailed reporting and follow-up capabilities.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* Placeholder for an image or animation */}
              {/* <Image src="/placeholder.svg" alt="Features" width="550" height="310" className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last" /> */}
            </div>
             <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {/* Placeholder for an image or animation */}
              {/* <Image src="/placeholder.svg" alt="Features" width="550" height="310" className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full" /> */}
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">📁 Complete Conversation Storage</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Access full call logs, audio files and transcript storage for compliance, training and performance analysis.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">📊 Real-Time Analytics</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Gain valuable business insights through advanced call analytics that identify trends and improvement opportunities.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">🚀 Ultra-Low Latency</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Industry-leading call latency and voice responsiveness for natural, human-like conversations at scale.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to transform your business communication?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Experience how our Voice AI agents can enhance your customer interactions and boost productivity.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              >
                Get Started
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No credit card required. Free consultation.
              </p>
            </div>
          </div>
        </section>
        {/* Removed original content to replace with fetched content */}
      </main>
    </div>
  );
}
