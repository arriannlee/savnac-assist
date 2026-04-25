"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Dashboard from "./components/Dashboard";
import Panel from "./components/Panel";
import AssistModal from "./components/AssistModal";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const loginRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const PROTOTYPE_PASSWORD = "savnac2026";

  const handleLogin: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoginError("");

    if (!name.trim()) {
      setLoginError("Please enter your name");
      return;
    }

    if (password !== PROTOTYPE_PASSWORD) {
      setLoginError("Incorrect prototype password");
      return;
    }

    const formattedName = name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    localStorage.setItem("savnacUserName", formattedName);
    setName(formattedName);
    gsap.to(loginRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        setIsLoggedIn(true);
      },
    });
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !appRef.current) return;

    gsap.fromTo(
      appRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
    );

    const modalTimer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1200);

    return () => clearTimeout(modalTimer);
  }, [isLoggedIn]);

  if (isSmallScreen) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-accent px-6 text-center text-white">
        <div className="max-w-md space-y-4">
          <img
            src="/images/savnac-logo-bg.svg"
            alt="Savnac Logo"
            className="mx-auto w-16"
          />
          <h1 className="text-3xl font-bold">Screen Size Not Supported</h1>

          <p className="text-base text-white/80">
            {" "}
            Savnac Assist is currently optimised for desktop and larger tablet
            devices. Please access this prototype on a larger screen.
          </p>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <div ref={loginRef}>
        <main className="min-h-screen w-full bg-white">
          <section className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#3f31ba] to-[#6b5cff] px-12 py-16 text-white">
              <img
                src="/images/savnac-logo-bg.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-5"
              />

              <div className="relative z-10 max-w-xl">
                <img
                  src="/images/savnac-logo-bg.svg"
                  alt="Savnac Logo"
                  className="h-auto w-24"
                />

                <h1 className="mb-2 ml-4 !text-[6.5rem] font-bold leading-[1] tracking-tight">
                  Savnac
                  <br />
                  Assist
                </h1>

                <p className="mb-4 ml-4 text-lg font-semibold leading-7">
                  AI-powered accessibility support for smart campus systems
                </p>

                <ul className="ml-4 space-y-2 text-base leading-6 text-white/85">
                  <li>✓ Personalises your dashboard</li>
                  <li>✓ Recommends tailored settings</li>
                  <li>✓ Saves your preferences</li>
                </ul>
                <p className="mt-30 ml-4 text-lg font-semibold leading-7">
                  V1.0
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center px-10 py-16">
              <form
                onSubmit={handleLogin}
                className="w-full max-w-sm space-y-4"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-[#5a4ae0] focus:ring-2 focus:ring-[#5a4ae0]/20"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-[#5a4ae0] focus:ring-2 focus:ring-[#5a4ae0]/20"
                />
                {loginError && (
                  <p className="text-sm font-medium text-red-600">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#5a4ae0] px-5 py-3 text-base font-semibold text-white transition hover:opacity-90"
                >
                  Login
                </button>

                <p className="text-center text-xs text-gray-500">
                  Prototype access only
                </p>
              </form>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <>
      <div ref={appRef} className="opacity-0">
        {language === "en" ? <Dashboard /> : <Panel />}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-0 top-[75%] z-40 -translate-y-1/2 rounded-l-xl bg-accent px-3 py-6 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
      >
        <span className="[writing-mode:vertical-rl] rotate-180">
          Savnac Assist
        </span>
      </button>

      {isModalOpen && (
        <AssistModal
          setIsModalOpen={setIsModalOpen}
          language={language}
          setLanguage={setLanguage}
          name={name}
        />
      )}
    </>
  );
}
