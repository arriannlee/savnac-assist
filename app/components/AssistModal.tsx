"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type AssistModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  name: string;
};

type AssistStep = "welcome" | "recommendations" | "manual";

type AccessibilitySettings = {
  darkMode: boolean;
  highContrast: boolean;
  dyslexicFont: boolean;
  fontStep: number;
  language: string;
};

export default function AssistModal({
  setIsModalOpen,
  language,
  setLanguage,
  name,
}: AssistModalProps) {
  const [step, setStep] = useState<AssistStep>("welcome");
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [fontStep, setFontStep] = useState(0);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const [userNeed, setUserNeed] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string[]>([]);
  const [pendingSettings, setPendingSettings] =
    useState<AccessibilitySettings | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [inputError, setInputError] = useState("");
  const [aiError, setAiError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const modalText = {
    en: {
      welcome: `Hi ${name || "there"}, welcome to B&FC! 👋`,
      intro:
        "Before you get started, let’s make things a bit easier to read and navigate so everything works better for you. What challenges do you experience when reading or navigating online systems?",
      promptHints: [
        "The text feels too small...",
        "Bright screens hurt my eyes...",
        "I struggle to focus when reading...",
        "I find low contrast hard to read...",
      ],
      inputError: "Please describe what you need help with first.",
      aiUnavailable:
        "Savnac Assist is temporarily unavailable. Please try again or use manual settings.",
      aiFailed:
        "Something went wrong while checking your preferences. Please try again.",
      invalidInput:
        "Please describe a difficulty you experience when reading or using online systems so Savnac Assist can help.",
      showRecommendations: "Show Recommendations",
      updateRecommendations: "Update Recommendations",
      basedOnInput: "Based on your input, here’s what might help:",
      basedOnOutput:
        "These settings may improve your experience. You can preview them before applying changes.",
      preview: "Preview",
      apply: "Apply Changes",
      preferManual: "Prefer to adjust things yourself?",
      needAssistance: "Need assistance?",
      clickHere: "Click here!",
      manualIntro:
        "Before you get started, you can adjust settings to make things easier to read and navigate so everything works better for you.",
      textSize: "Text size",
      highContrast: "High contrast",
      dyslexicFont: "Dyslexic friendly font",
      darkMode: "Dark mode",
      language: "Language selection",
      saved: "Preferences saved.",
      previewFallback:
        "These settings may improve your experience. You can preview them before applying changes.",
      english: "English UK",
      spanish: "Spanish",
    },
    es: {
      welcome: "Hola, bienvenido a B&FC 👋",
      intro:
        "Antes de comenzar, ajustemos la pantalla para que sea más fácil de leer y navegar. ¿Qué dificultades tienes al leer o navegar por sistemas en línea?",
      promptHints: [
        "El texto se ve demasiado pequeño...",
        "Las pantallas brillantes me molestan...",
        "Me cuesta concentrarme al leer...",
        "Me cuesta leer con poco contraste...",
      ],
      inputError: "Describe primero con qué necesitas ayuda.",
      aiUnavailable:
        "Savnac Assist no está disponible temporalmente. Inténtalo de nuevo o usa la configuración manual.",
      aiFailed:
        "Algo salió mal al revisar tus preferencias. Inténtalo de nuevo.",
      invalidInput:
        "Describe una dificultad que tengas al leer o usar sistemas en línea para que Savnac Assist pueda ayudarte.",
      showRecommendations: "Mostrar recomendaciones",
      updateRecommendations: "Actualizar recomendaciones",
      basedOnInput: "Según tu respuesta, esto podría ayudarte:",
      basedOnOutput:
        "Estas configuraciones pueden mejorar tu experiencia. Puedes previsualizarlas antes de aplicar los cambios.",
      preview: "Vista previa",
      apply: "Aplicar cambios",
      preferManual: "¿Prefieres ajustar las opciones tú mismo?",
      needAssistance: "¿Necesitas ayuda?",
      clickHere: "Haz clic aquí",
      manualIntro:
        "Antes de comenzar, puedes ajustar la configuración para facilitar la lectura y la navegación.",
      textSize: "Tamaño del texto",
      highContrast: "Alto contraste",
      dyslexicFont: "Fuente para dislexia",
      darkMode: "Modo oscuro",
      language: "Selección de idioma",
      saved: "Preferencias guardadas.",
      previewFallback:
        "Estos ajustes pueden mejorar tu experiencia. Puedes verlos antes de aplicar los cambios.",
      english: "Inglés Reino Unido",
      spanish: "Español",
    },
  };

  const t = modalText[language as "en" | "es"];

  // Animate modal appearance with GSAP

  useEffect(() => {
    if (!modalRef.current) return;

    gsap.fromTo(
      modalRef.current,
      {
        opacity: 0,
        y: 20,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      },
    );
  }, []);

  const handleClose = () => {
    if (!modalRef.current) {
      setIsModalOpen(false);
      return;
    }

    gsap.to(modalRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.98,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIsModalOpen(false);
      },
    });
  };

  //  Load saved settings from localStorage on mount and apply them

  useEffect(() => {
    const savedSettings = localStorage.getItem("savnac-accessibility-settings");

    if (!savedSettings) return;

    const parsedSettings = JSON.parse(
      savedSettings,
    ) as Partial<AccessibilitySettings>;

    setDarkMode(parsedSettings.darkMode ?? false);
    setHighContrast(parsedSettings.highContrast ?? false);
    setDyslexicFont(parsedSettings.dyslexicFont ?? false);
    setFontStep(parsedSettings.fontStep ?? 0);
    setLanguage(parsedSettings.language ?? language);
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [setIsModalOpen]);

  // Apply dark mode and high contrast by toggling a data attribute on the root element

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode && highContrast) {
      root.setAttribute("data-theme", "high-contrast-dark");
    } else if (darkMode) {
      root.setAttribute("data-theme", "dark");
    } else if (highContrast) {
      root.setAttribute("data-theme", "high-contrast-light");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [darkMode, highContrast]);

  // Apply dyslexic-friendly font by toggling a data attribute on the root element

  useEffect(() => {
    const root = document.documentElement;

    if (dyslexicFont) {
      root.setAttribute("data-font", "accessible");
    } else {
      root.removeAttribute("data-font");
    }
  }, [dyslexicFont]);

  // Map fontStep to actual CSS scale values and apply as a CSS variable

  useEffect(() => {
    const getFontScale = (step: number) => {
      switch (step) {
        case -2:
          return 0.9;
        case -1:
          return 0.95;
        case 0:
          return 1;
        case 1:
          return 1.15;
        case 2:
          return 1.3;
        default:
          return 1;
      }
    };

    document.documentElement.style.setProperty(
      "--font-scale",
      getFontScale(fontStep).toString(),
    );
  }, [fontStep]);

  // Function to call AI recommendations

  const handleShowRecommendations = async () => {
    setAiError("");

    const trimmedInput = userNeed.trim();

    if (!trimmedInput) {
      setInputError(t.inputError);
      return;
    }

    setInputError("");
    setIsAiLoading(true);

    try {
      const response = await fetch("/.netlify/functions/getRecommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: trimmedInput }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI function failed:", errorText);

        setAiError(t.aiUnavailable);
        setAiSummary([]);
        setPendingSettings(null);
        setStep("recommendations");
        return;
      }

      const result = await response.json();

      if (!result.isRelevant) {
        setAiError(t.invalidInput);
        setAiSummary([]);
        setPendingSettings(null);
        setStep("recommendations");
        return;
      }

      const summary = Array.isArray(result.summary)
        ? result.summary
        : result.summary
          ? [result.summary]
          : [];

      if (summary.length === 0) {
        setAiError(t.aiUnavailable);
        setAiSummary([]);
        setPendingSettings(null);
        setStep("recommendations");
        return;
      }

      setAiSummary(summary);
      setPendingSettings({
        darkMode: result.darkMode ?? false,
        highContrast: result.highContrast ?? false,
        dyslexicFont: result.dyslexicFont ?? false,
        fontStep: result.fontStep ?? 0,
        language: result.language ?? language,
      });

      setStep("recommendations");
    } catch (error) {
      console.error("AI recommendation failed", error);

      setAiError(t.aiFailed);
      setAiSummary([]);
      setPendingSettings(null);
      setStep("recommendations");
    } finally {
      setIsAiLoading(false);
    }
  };
  const handlePreviewRecommendations = () => {
    if (!pendingSettings) return;

    setDarkMode(pendingSettings.darkMode);
    setHighContrast(pendingSettings.highContrast);
    setDyslexicFont(pendingSettings.dyslexicFont);
    setFontStep(pendingSettings.fontStep);
    setLanguage(pendingSettings.language);
  };

  const handleApplyChanges = () => {
    const settings: AccessibilitySettings = pendingSettings
      ? pendingSettings
      : {
          darkMode,
          highContrast,
          dyslexicFont,
          fontStep,
          language,
        };

    setDarkMode(settings.darkMode);
    setHighContrast(settings.highContrast);
    setDyslexicFont(settings.dyslexicFont);
    setFontStep(settings.fontStep);
    setLanguage(settings.language);

    localStorage.setItem(
      "savnac-accessibility-settings",
      JSON.stringify(settings),
    );

    setPendingSettings(null);
    setSettingsSaved(true);
    handleClose();
  };

  // Rotate through prompt hints every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHintIndex((current) => (current + 1) % t.promptHints.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [t.promptHints.length]);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-background px-10 py-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
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

          <p className="mb-4 text-base font-medium text-text">{t.welcome}</p>

          {(step === "welcome" || step === "recommendations") && (
            <>
              <p className="mb-6 max-w-3xl assist-option-text leading-7 text-text-secondary">
                {t.intro}
              </p>

              <input
                type="text"
                value={userNeed}
                onChange={(e) => setUserNeed(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleShowRecommendations();
                  }
                }}
                placeholder={t.promptHints[hintIndex]}
                className="mb-5 w-full max-w-2xl rounded-md border border-divider bg-surface-variant px-4 py-3 assist-option-text text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {inputError && (
                <p className="mb-4 w-full max-w-2xl text-left text-sm text-accent font-semibold">
                  {t.inputError}
                </p>
              )}

              <button
                onClick={handleShowRecommendations}
                className="mb-5 w-full max-w-2xl rounded-md bg-accent px-6 py-3 assist-option-text font-semibold text-white transition hover:opacity-90"
              >
                {isAiLoading
                  ? "Checking..."
                  : step === "recommendations"
                    ? t.updateRecommendations
                    : t.showRecommendations}
              </button>
            </>
          )}

          {step === "recommendations" && (
            <>
              {aiError ? (
                <div className="mb-4 max-w-2xl px-4 py-3 text-left">
                  <p className="assist-option-text text-text-secondary">
                    {aiError}
                  </p>
                </div>
              ) : (
                <div className="mb-4 max-w-2xl px-4 py-3 text-left">
                  <p className="mb-2 assist-option-text font-semibold text-text">
                    {t.basedOnInput}
                  </p>

                  <ul className="list-disc pl-5 assist-option-text text-text-secondary space-y-2">
                    {aiSummary.length > 0 ? (
                      aiSummary.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    ) : (
                      <li>{t.previewFallback}</li>
                    )}
                  </ul>

                  <p className="mt-2 assist-option-text text-text-secondary">
                    {t.basedOnOutput}
                  </p>
                </div>
              )}

              {!aiError && (
                <div className="mb-5 flex items-center justify-center gap-4">
                  <button
                    onClick={handlePreviewRecommendations}
                    className="rounded-md border border-accent bg-background px-8 py-3 assist-option-text font-semibold text-accent transition hover:opacity-90"
                  >
                    {t.preview}
                  </button>

                  <button
                    onClick={handleApplyChanges}
                    className="rounded-md bg-accent px-8 py-3 assist-option-text font-semibold text-white transition hover:opacity-90"
                  >
                    {t.apply}
                  </button>
                </div>
              )}

              {settingsSaved && (
                <p className="mt-1 mb-2 text-sm text-text-secondary">
                  {t.saved}
                </p>
              )}

              <p className="assist-option-text text-text-secondary opacity-80">
                {t.preferManual}{" "}
                <button
                  onClick={() => setStep("manual")}
                  className="text-text underline underline-offset-2"
                >
                  {t.clickHere}
                </button>
              </p>
            </>
          )}

          {step === "welcome" && (
            <p className="assist-option-text text-text-secondary opacity-80">
              {t.preferManual}{" "}
              <button
                onClick={() => setStep("manual")}
                className="text-text underline underline-offset-2"
              >
                {t.clickHere}
              </button>
            </p>
          )}

          {step === "manual" && (
            <>
              <p className="mb-4 max-w-2xl assist-option-text leading-6 text-text-secondary">
                {t.manualIntro}
              </p>

              <div className="mb-4 flex w-full max-w-3xl flex-col gap-3 text-left">
                <div className="flex items-center justify-between rounded-xl bg-surface-variant px-5 py-4">
                  <span className="assist-option-text text-text">
                    {t.textSize}
                  </span>

                  <div className="flex w-[55%] items-center gap-3">
                    <span className="assist-option-text text-text">A</span>

                    <input
                      type="range"
                      min={-2}
                      max={2}
                      step={1}
                      value={fontStep}
                      onChange={(e) => setFontStep(parseInt(e.target.value))}
                      className="slider w-full"
                    />

                    <span className="text-xl text-text">A</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-surface-variant px-5 py-4">
                  <span className="assist-option-text text-text">
                    {t.highContrast}
                  </span>

                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={highContrast}
                    onChange={(e) => setHighContrast(e.target.checked)}
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-surface-variant px-5 py-4">
                  <span className="assist-option-text text-text">
                    {t.dyslexicFont}
                  </span>

                  <input
                    type="checkbox"
                    checked={dyslexicFont}
                    onChange={(e) => setDyslexicFont(e.target.checked)}
                    className="toggle-switch"
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-surface-variant px-5 py-4">
                  <span className="assist-option-text text-text">
                    {t.darkMode}
                  </span>

                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="toggle-switch"
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-surface-variant px-5 py-3">
                  <span className="assist-option-text text-text">
                    {t.language}
                  </span>

                  <div className="relative">
                    <select
                      className="min-w-[140px] appearance-none rounded-md border border-divider bg-background px-3 py-1.5 assist-option-text text-text focus:outline-none focus:ring-2 focus:ring-accent"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="en">{t.english}</option>
                      <option value="es">{t.spanish}</option>
                    </select>

                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary">
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-5 flex items-center justify-center gap-4">
                <button
                  onClick={handleApplyChanges}
                  className="rounded-md bg-accent px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {t.apply}
                </button>
              </div>

              {settingsSaved && (
                <p className="mt-1 mb-2 text-sm text-text-secondary">
                  {t.saved}
                </p>
              )}

              <p className="assist-option-text text-text-secondary opacity-80">
                {t.needAssistance}{" "}
                <button
                  onClick={() => setStep("welcome")}
                  className="text-text underline underline-offset-2"
                >
                  {t.clickHere}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
