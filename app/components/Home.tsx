"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] p-6">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl grid-cols-1 overflow-hidden rounded-xl bg-white shadow-xl lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left brand panel */}
        <div className="relative flex flex-col justify-center overflow-hidden bg-[#5a4ae0] px-12 py-16 text-white">
          {/* Background mark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-[38rem] font-black leading-none">S</span>
          </div>

          <div className="relative z-10 max-w-xl">
            <h1 className="mb-6 text-6xl font-bold leading-tight tracking-tight">
              Savnac
              <br />
              Assist
            </h1>

            <p className="mb-5 text-lg font-semibold leading-7">
              AI-powered accessibility support for smart campus systems
            </p>

            <ul className="space-y-2 text-base leading-7">
              <li>✓ Personalises your dashboard</li>
              <li>✓ Recommends tailored settings</li>
              <li>✓ Saves your preferences</li>
            </ul>

            <p className="mt-12 text-sm font-semibold opacity-90">
              Built for inclusive digital learning
            </p>
          </div>
        </div>

        {/* Right login panel */}
        <div className="flex items-center justify-center px-10 py-16">
          <div className="w-full max-w-sm">
            <h2 className="mb-6 text-2xl font-bold text-[#5a4ae0]">
              Sign in to continue
            </h2>

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
