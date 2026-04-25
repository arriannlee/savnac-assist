// "use client";

// import { useState } from "react";
// import Dashboard from "./components/Dashboard";
// import Panel from "./components/Panel";
// import AssistModal from "./components/AssistModal";

// export default function Home() {
//   const [isModalOpen, setIsModalOpen] = useState(true);
//   const [language, setLanguage] = useState("en");

//   return (
//     <>
//       {language === "en" ? <Dashboard /> : <Panel />}

//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="fixed right-0 top-[75%] -translate-y-1/2 z-40 rounded-l-xl bg-accent px-3 py-6 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
//       >
//         <span className="[writing-mode:vertical-rl] rotate-180">
//           Savnac Assist
//         </span>
//       </button>

//       {isModalOpen && (
//         <AssistModal
//           setIsModalOpen={setIsModalOpen}
//           language={language}
//           setLanguage={setLanguage}
//         />
//       )}
//     </>
//   );
// }

"use client";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <section className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left brand panel */}
        <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#3f31ba] to-[#6b5cff] px-12 py-16 text-white">
          {/* Background mark */}
          <img
            src="/images/savnac-logo-bg.svg "
            alt="Savnac Logo"
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-5"
          />
          <div className="relative z-10 max-w-xl">
            <div className="relative z-10 flex flex-col items-start">
              <img
                src="/images/savnac-logo-bg.svg"
                alt="Savnac Logo"
                className="w-24 h-auto"
              />

              <h1 className="mb-2 ml-4 !text-[6.5rem] font-bold leading-[1] tracking-tight">
                Savnac
                <br />
                Assist
              </h1>
            </div>
            <p className="mb-4 ml-4 !text-lg font-semibold leading-7">
              AI-powered accessibility support for smart campus systems
            </p>
            <ul className="ml-4 space-y-2 text-base leading-6 text-white/85">
              <li>✓ Personalises your dashboard</li>
              <li>✓ Recommends tailored settings</li>
              <li>✓ Saves your preferences</li>
            </ul>
            {/* <p className="mt-12 text-sm font-semibold opacity-90">
              Built for inclusive digital learning
            </p> */}
          </div>
        </div>
        {/* Right login panel */}
        <div className="flex items-center justify-center px-10 py-16">
          <div className="w-full max-w-sm">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-[#5a4ae0] focus:ring-2 focus:ring-[#5a4ae0]/20"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-[#5a4ae0] focus:ring-2 focus:ring-[#5a4ae0]/20"
              />

              <button className="w-full bg-[#5a4ae0] px-5 py-3 text-base font-semibold text-white transition hover:opacity-90">
                Login
              </button>

              <p className="text-center text-xs text-gray-500">
                Prototype access only
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
