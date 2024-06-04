import React from "react";

import { useEffect } from "react";

interface useScriptsProps {
  scriptUrls: string[];
}

// TODO: Update when you start working with actual data
const useScripts: React.FC<useScriptsProps> = ({ scriptUrls }) => {
  useEffect(() => {
    const fetchAndLoadScripts = async () => {
      try {
        setTimeout(async () => {
          for (const scriptUrl of scriptUrls) {
            const script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            document.body.appendChild(script);
          }
        }, 3000);
      } catch (error) {
        console.error("Error loading scripts:", error);
      }
    };

    fetchAndLoadScripts();
  }, [scriptUrls]);

  return <></>;
};

export default useScripts;
