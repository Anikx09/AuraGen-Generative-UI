import { useCallback, useEffect, useRef, useState } from "react";

// Watches mouse movement, rage clicks and hesitation while "active" is true.
// Returns score (0-100), event log, counters, score history, simulate and reset.
export default function useTracker(active) {
  const [score, setScore] = useState(0);
  const [log, setLog] = useState([]);
  const [counts, setCounts] = useState({ erratic: 0, rage: 0, hesitation: 0 });
  const [history, setHistory] = useState([]);
  const scoreRef = useRef(0);
  scoreRef.current = score;

  const add = useCallback((message, weight, type) => {
    setScore((s) => Math.min(100, s + weight));
    setCounts((c) => ({ ...c, [type]: c[type] + 1 }));
    setLog((l) => [{ time: new Date().toLocaleTimeString(), message }, ...l].slice(0, 6));
  }, []);

  // The score cools down by 2 every second, and we save it for the chart.
  useEffect(() => {
    const id = setInterval(() => {
      setScore((s) => Math.max(0, s - 2));
      setHistory((h) => [...h, scoreRef.current].slice(-30));
    }, 1000);
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

    const onMove = (e) => {
      const now = performance.now();
      if (lastX !== null) {
        const dx = e.clientX - lastX;
        const speed = Math.abs(dx) / (now - lastTime || 1);
        const dir = Math.sign(dx);
        if (dir && lastDir && dir !== lastDir && speed > 0.5) flips += 1;
        if (dir) lastDir = dir;
        if (flips >= 6) {
          add("Erratic mouse movement", 10, "erratic");
          flips = 0;
        }
      }
      lastX = e.clientX;
      lastTime = now;
    };

    const onClick = () => {
      const now = Date.now();
      clicks = clicks.filter((c) => now - c < 1500).concat(now);
      if (clicks.length >= 4) {
        add("Rage click (4 clicks in 1.5s)", 25, "rage");
        clicks = [];
      }
    };

    const onFocus = (e) => {
      clearTimeout(hesitationTimer);
      const label = e.target.labels && e.target.labels[0] ? e.target.labels[0].textContent : "a field";
      hesitationTimer = setTimeout(() => add(`Hesitation on '${label}' for 6s`, 15, "hesitation"), 6000);
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

  const simulate = () => add("Simulated rage click", 25, "rage");
  const reset = () => {
    setScore(0);
    setLog([]);
    setCounts({ erratic: 0, rage: 0, hesitation: 0 });
    setHistory([]);
  };
  return { score, log, counts, history, simulate, reset };
}
