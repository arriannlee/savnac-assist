"use client";

import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Panel from "./components/Panel";
import AssistModal from "./components/AssistModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true); // true for testing
  const [language, setLanguage] = useState("en");

  return (
    <>
      {language === "en" ? <Dashboard /> : <Panel />}{" "}
      {isModalOpen && (
        <AssistModal
          setIsModalOpen={setIsModalOpen}
          language={language}
          setLanguage={setLanguage}
        />
      )}
    </>
  );
}
