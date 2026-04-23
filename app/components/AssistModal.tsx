"use client";

import { useState } from "react";

type AssistModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type AssistStep = "welcome" | "recommendations" | "manual";

export default function AssistModal({ setIsModalOpen }: AssistModalProps) {
  const name = "";
  const [step, setStep] = useState<AssistStep>("welcome");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-background px-10 py-8 shadow-xl">
        {" "}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition hover:bg-black/5 hover:opacity-80"
          aria-label="Close modal"
        >
          X
        </button>
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/welcome.svg"
            alt="Welcome image"
            className="mb-4 h-auto w-64"
          />

          <p className="mb-4 text-base font-medium text-text">
            Hi {name || "there"}, welcome to B&FC! 👋
          </p>

          {(step === "welcome" || step === "recommendations") && (
            <>
              <p className="mb-6 max-w-3xl text-sm leading-7 text-text-secondary">
                Before you get started, let’s make things a bit easier to read
                and navigate so everything works better for you.
                <br />
                What challenges do you experience when reading or navigating
                online systems?
              </p>

              <input
                type="text"
                placeholder="Describe any challenges you face... type help for suggestions"
                className="mb-5 w-full max-w-2xl rounded-md border border-divider bg-surface-variant px-4 py-3 text-sm text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <button
                onClick={() => setStep("recommendations")}
                className="mb-5 w-full max-w-2xl rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {step === "recommendations"
                  ? "Update Recommendations"
                  : "Show Recommendations"}
              </button>
            </>
          )}

          {step === "recommendations" && (
            <>
              <p className="mb-5 text-sm text-text-secondary">
                Based on your input, here’s what might help:
              </p>

              <div className="mb-5 flex items-center justify-center gap-4">
                <button
                  onClick={() => setStep("manual")}
                  className="rounded-md border border-accent bg-background px-8 py-3 text-sm font-semibold text-accent transition hover:opacity-90"
                >
                  Preview
                </button>

                <button className="rounded-md bg-accent px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                  Apply Changes
                </button>
              </div>

              <p className="text-sm text-text-secondary opacity-80">
                Prefer to adjust things yourself?{" "}
                <button
                  onClick={() => setStep("manual")}
                  className="text-text underline underline-offset-2"
                >
                  Click here!
                </button>
              </p>
            </>
          )}

          {step === "welcome" && (
            <p className="text-sm text-text-secondary opacity-80">
              Prefer to adjust things yourself?{" "}
              <button
                onClick={() => setStep("manual")}
                className="text-text underline underline-offset-2"
              >
                Click here!
              </button>
            </p>
          )}

          {step === "manual" && (
            <>
              <p className="mb-4 max-w-2xl text-sm leading-6 text-text-secondary">
                Before you get started, you can adjust settings to make things
                easier to read and navigate so everything works better for you.
              </p>

              <div className="mb-4 flex w-full max-w-3xl flex-col gap-3 text-left">
                {/* Text size */}

                <div className="flex items-center justify-between rounded-xl bg-surface-variant px-5 py-4">
                  <span className="text-sm text-text">Text size</span>

                  <div className="flex w-[55%] items-center gap-3">
                    <span className="text-sm text-text">A</span>

                    <input
                      type="range"
                      min="1"
                      max="5"
                      defaultValue="3"
                      className="slider w-full"
                    />

                    <span className="text-xl text-text">A</span>
                  </div>
                </div>

                {/* High contrast */}

                <div className="flex items-center justify-between rounded-xl bg-surface-variant px-5 py-4">
                  <span className="text-sm text-text">High contrast</span>
                  <input type="checkbox" className="toggle-switch" />
                </div>

                {/* Dyslexic font */}

                <div className="flex items-center justify-between rounded-xl bg-surface-variant px-5 py-4">
                  <span className="text-sm text-text">
                    Dyslexic friendly font
                  </span>

                  <input type="checkbox" className="toggle-switch" />
                </div>

                {/* Dark mode */}

                <div className="flex items-center justify-between rounded-xl bg-surface-variant px-5 py-4">
                  <span className="text-sm text-text">Dark mode</span>

                  <input type="checkbox" className="toggle-switch" />
                </div>

                {/* Language */}

                <div className="flex items-center justify-between rounded-xl bg-surface-variant px-5 py-3">
                  <span className="text-sm text-text">Language selection</span>

                  <div className="relative">
                    <select className="min-w-[140px] appearance-none rounded-md border border-divider bg-background px-3 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent">
                      <option>English UK</option>
                      <option>Spanish</option>
                    </select>

                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary">
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-5 flex items-center justify-center gap-4">


                <button className="rounded-md bg-accent px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                  Apply Changes
                </button>
              </div>

              <p className="text-sm text-text-secondary opacity-80">
                Need assistance?{" "}
                <button
                  onClick={() => setStep("welcome")}
                  className="text-text underline underline-offset-2"
                >
                  Click here!
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
