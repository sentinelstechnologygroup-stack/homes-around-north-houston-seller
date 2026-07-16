import { Play } from "lucide-react";

export default function VideoPlayer() {
  return (
    <div className="relative w-full aspect-video bg-slate-midnight group cursor-pointer overflow-hidden">
      {/* Video placeholder gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-midnight via-slate-800 to-slate-midnight/90" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      {/* Warm accent glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-burnished/20 rounded-full blur-3xl" />

      {/* Center play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full bg-amber-burnished/30 animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full bg-amber-burnished/20 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
          {/* Button */}
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-amber-burnished/95 backdrop-blur-sm flex items-center justify-center group-hover:bg-amber-burnished transition-all duration-300 group-hover:scale-110 shadow-2xl shadow-amber-burnished/30">
            <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 md:p-8">
        <p className="text-white/80 text-sm font-body tracking-wide uppercase">Watch the Seller Strategy Video</p>
      </div>
    </div>
  );
}