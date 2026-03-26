import {useNavigate} from  'react-router-dom'
const cards = [
  {
    title: "Exam Management",
    desc: "Schedule, publish, and monitor live mock tests in real-time.",
    icon: "timer",
  },
  {
    title: "Subject Management",
    desc: "Organize curriculum and define complex hierarchies.",
    icon: "library_books",
  },
  {
    title: "Testpaper Management",
    desc: "Create dynamic papers and configure marking schemes.",
    icon: "description",
  },
  {
    title: "Question Management",
    desc: "Build question banks with LaTeX and image support.",
    icon: "checklist",
    highlight: true,
  },
];

export default function ManagementCards() {
  const navigate=useNavigate()
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:p-2">
  {cards.map((c, i) => (
    <div
      key={i}
      className={`
        relative overflow-hidden rounded-2xl
        bg-[var(--bg-paper)]
        border border-[color-mix(in_srgb,var(--text-primary)_8%,transparent)]
        p-8 flex flex-col gap-6
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-lg
        ${
          c.highlight
            ? "ring-1 ring-[var(--primary)]/40"
            : ""
        }
      `}
    >
      {/* Soft Hover Glow */}
      <div className="
        absolute inset-0 
        bg-gradient-to-br 
        from-[var(--primary)]/10 
        to-transparent 
        opacity-0 hover:opacity-100 
        transition-opacity duration-500
      " />

      {/* Icon */}
      <div className="
        relative z-10 w-14 h-14 rounded-xl
        bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]
        flex items-center justify-center
        border border-[color-mix(in_srgb,var(--primary)_30%,transparent)]
      ">
        <span className="material-symbols-outlined text-[var(--primary)] text-3xl">
          {c.icon}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          {c.title}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          {c.desc}
        </p>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-auto pt-1 pb-1 ">
        <button
          className="
            group inline-flex items-center gap-2
            font-medium
            px-4 py-2 rounded-lg
            cursor-pointer
            transition-all duration-300

            bg-[color-mix(in_srgb,var(--primary)_15%,transparent)]
            text-[var(--primary)]
            border border-[color-mix(in_srgb,var(--primary)_35%,transparent)]

            hover:bg-[var(--primary)]
            hover:text-white
          "
          onClick={() => {
            if (c.title === "Exam Management") {
              navigate("/institute/exams-overview");
            }
            if (c.title === "Subject Management") {
              navigate("/institute/exam/subjects-overview");
            }
            if (c.title === "Testpaper Management") {
              navigate("/institute/exam/subject/testpapers-overview");
            }
            if (c.title === "Question Management") {
              navigate("/institute/exam/subject/testpaper/questions-overview");
            }
          }}
        >
          Launch Module
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
            arrow_forward_ios
          </span>
        </button>
      </div>
    </div>
  ))}
</div>


  );
}
