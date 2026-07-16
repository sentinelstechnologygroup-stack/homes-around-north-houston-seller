import { useRef } from "react";

export default function MagneticButton({ children, className = "", onClick, variant = "primary", type = "button" }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0, 0)";
  };

  const base = "magnetic-btn inline-flex items-center justify-center font-semibold rounded-full transition-colors duration-300 text-base";
  const variants = {
    primary: "bg-amber-burnished text-white hover:bg-amber-700 px-8 py-4 shadow-lg shadow-amber-burnished/20",
    secondary: "bg-white text-slate-midnight border-2 border-slate-midnight hover:bg-slate-midnight hover:text-white px-8 py-4",
    ghost: "text-amber-burnished hover:text-amber-700 underline underline-offset-4 px-4 py-2 font-medium",
  };

  return (
    <button
      ref={btnRef}
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}