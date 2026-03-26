import { useEffect, useRef, useState } from "react";

const banners = [
  {
    icon: "analytics",
    title: "Empowering Digital Education",
    desc: "All-in-one institute management solution with real-time sync.",
    gradient: "from-indigo-900 via-primary to-violet-900",
    bgSvg:"/banners/banner1.png"
  },
  {
    icon: "speed",
    title: "Real-time Performance",
    desc: "Monitor student progress with advanced live telemetry tools.",
    gradient: "from-violet-900 via-[#5d3cf3] to-indigo-800",
    bgSvg:"/banners/banner2.png"
  },
  {
    icon: "psychology",
    title: "AI-Driven Insights",
    desc: "Detailed insights into every examination and learning gap.",
    gradient: "from-[#1e1b4b] via-primary to-[#4338ca]",
    bgSvg:"/banners/banner3.png"
  },
];

export default function HeroBanners() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [paused, setPaused] = useState(false);

  /* 🔁 Auto-scroll one card at a time */
  useEffect(() => {
    if (paused) return;
   
    const interval = setInterval(() => {
      if (!containerRef.current || !cardRef.current) return;

      const cardWidth = cardRef.current.offsetWidth + 24;
      containerRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });

      // Infinite loop reset
      if (
        containerRef.current.scrollLeft +
          containerRef.current.offsetWidth >=
        containerRef.current.scrollWidth - cardWidth
      ) {
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [paused]);

  /* 🖱 Mouse wheel → horizontal scroll */

  useEffect(() => {
  const el = containerRef.current;
  if (!el) return;

  const onWheel = (e) => {
    e.preventDefault();
    el.scrollBy({
      left: e.deltaY,
      behavior: "smooth",
    });
  };

  el.addEventListener("wheel", onWheel, { passive: false });

  return () => {
    el.removeEventListener("wheel", onWheel);
  };
}, []);

  return (
    <section className="pt-10 pb-10 overflow-hidden ">
      {/* Header */}
      <div className="px-6 md:px-1 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
  Institute Performance{" "}
  <span className="text-[var(--primary)]">Overview</span>
</h1>

<p className="mt-2 text-lg text-[var(--text-secondary)]">
  Centralized command center for mock examination delivery and analytics.
</p>

      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        // onWheel={handleWheel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="
          flex gap-6 px-6 md:px-1 md:pt-5 md:pb-5
          overflow-x-auto scroll-smooth
          snap-x snap-mandatory
          hide-scrollbar
        "
      >
        {[...banners, ...banners].map((b, i) => (
          <BannerCard
            key={i}
            data={b}
            refProp={i === 0 ? cardRef : null}
          />
        ))}
      </div>
    </section>
  );
}

function BannerCard({ data, refProp }) {
  return (
    <div
  ref={refProp}
  className="
    snap-center
    min-w-[90%] sm:min-w-[75%] md:min-w-[600px]
    h-[260px] md:h-[280px]
    rounded-2xl p-8 flex items-end
    bg-[var(--bg-paper)]
    relative overflow-hidden
     
    transition-all duration-500
    hover:scale-[1.03]
    border border-black/5 dark:border-white/10
  "
>

      
{/* SVG Background */}
<div
  className="absolute inset-0 opacity-30 bg-no-repeat bg-cover bg-center"
  style={{
    backgroundImage: `url(${data.bgSvg})`,
  }}
/>

      {/* Content */}
      <div className="relative z-10">
        <span className="material-symbols-outlined text-5xl text-[var(--primary)]/80 mb-4 block">
  {data.icon}
</span>

<h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
  {data.title}
</h2>

<p className="text-[var(--text-secondary)] text-base md:text-lg">
  {data.desc}
</p>

      </div>
    </div>
  );
}
