import { useCallback, useEffect, useState } from "react";

// Watches mouse movement, rage clicks and hesitation while "active" is true.
// Returns a struggle score (0 to 100) and a short log of what was detected.
export default function useTracker(active) {
  const [score, setScore] = useState(0);
  const [log, setLog] = useState([]);

  const add = useCallback((message, weight) => {
    setScore((s) => Math.min(100, s + weight));
    setLog((l) => [{ time: new Date().toLocaleTimeString(), message }, ...l].slice(0, 6));
  }, []);

  // The score cools down by 2 every second.
  useEffect(() => {
    const id = setInterval(() => setScore((s) => Math.max(0, s - 2)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!active) return;
    let lastX = null;
    let lastTime = 0;
    let lastDir = 0;
    let flips = 0;
    let clicks = [];
    let hesitationTimer = null;

    // Erratic movement: many quick left-right direction changes.
    const onMove = (e) => {
      const now = performance.now();
      if (lastX !== null) {
        const dx = e.clientX - lastX;
        const speed = Math.abs(dx) / (now - lastTime || 1);
        const dir = Math.sign(dx);
        if (dir && lastDir && dir !== lastDir && speed > 0.5) flips += 1;
        if (dir) lastDir = dir;
        if (flips >= 6) {
          add("Erratic mouse movement", 10);
          flips = 0;
        }
      }
      lastX = e.clientX;
      lastTime = now;
    };

    // Rage click: 4 clicks within 1.5 seconds.
    const onClick = () => {
      const now = Date.now();
      clicks = clicks.filter((c) => now - c < 1500).concat(now);
      if (clicks.length >= 4) {
        add("Rage click (4 clicks in 1.5s)", 25);
        clicks = [];
      }
    };

    // Hesitation: 6 seconds on one field without typing.
    const onFocus = (e) => {
      clearTimeout(hesitationTimer);
      const label = e.target.labels && e.target.labels[0] ? e.target.labels[0].textContent : "a field";
      hesitationTimer = setTimeout(() => add(`Hesitation on '${label}' for 6s`, 15), 6000);
    };
    const stopHesitation = () => clearTimeout(hesitationTimer);
    const resetFlips = setInterval(() => {
      flips = 0;
    }, 3000);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("input", stopHesitation);
    document.addEventListener("focusout", stopHesitation);

    return () => {
      clearInterval(resetFlips);
      clearTimeout(hesitationTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("input", stopHesitation);
      document.removeEventListener("focusout", stopHesitation);
    };
  }, [active, add]);

  const simulate = () => add("Simulated rage click", 25);
  return { score, log, simulate };
}
