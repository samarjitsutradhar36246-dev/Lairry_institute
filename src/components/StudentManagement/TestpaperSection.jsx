const TestpaperSection = ({ testPaperData }) => {
  return (
    <>
      {testPaperData.map((data, index) => (
        <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Details */}
         <div
  className="lg:col-span-2 rounded-3xl p-12"
  style={{
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    color: "var(--text-primary)"
  }}
>
  {/* Top Section */}
  <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-10 mb-12">

    <div className="flex-1">
      <h2
        className="text-3xl lg:text-4xl font-extrabold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        {data.test_paper_name}
      </h2>

      <p
        className="max-w-2xl mx-auto lg:mx-0 leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {data.test_paper_description}
      </p>
    </div>

    {/* Status Card */}
    <div
      className="px-10 py-8 rounded-2xl min-w-[180px] flex flex-col justify-center items-center transition-all duration-300 cursor-pointer"
      style={{
        background: "var(--muted-bg)",
        border: "1px solid var(--card-border)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--primary)";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(0,0,0,0.15), 0 0 20px var(--primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--muted-bg)";
        e.currentTarget.style.color = "var(--text-primary)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <p className="text-xs uppercase tracking-widest opacity-80 mb-2">
        Status
      </p>

      <p className="text-lg font-bold">
        {data.test_paper_status}
      </p>
    </div>
  </div>

  {/* Divider */}
  <div
    className="mb-12 h-[1px]"
    style={{ background: "var(--card-border)" }}
  />

  {/* Rules & Marking */}
  <div className="grid md:grid-cols-2 gap-10 items-stretch">

    {/* Rules Card */}
    <div className="flex flex-col h-full">
      <h4
        className="uppercase font-semibold text-sm mb-6 tracking-wide text-center"
        style={{ color: "var(--primary)" }}
      >
        Examination Rules
      </h4>

      <div
        className="rounded-2xl p-8 flex-1 flex items-center justify-center text-center transition-all duration-300 cursor-pointer"
        style={{
          background: "var(--muted-bg)",
          border: "1px solid var(--card-border)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--primary)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.boxShadow =
            "0 15px 40px rgba(0,0,0,0.15), 0 0 25px var(--primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--muted-bg)";
          e.currentTarget.style.color = "var(--text-primary)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <p className="leading-relaxed font-medium">
          {data.test_paper_rules}
        </p>
      </div>
    </div>

    {/* Marking Card */}
    <div className="flex flex-col h-full">
      <h4
        className="uppercase font-semibold text-sm mb-6 tracking-wide text-center"
        style={{ color: "var(--primary)" }}
      >
        Marking Scheme
      </h4>

      <div
        className="rounded-2xl p-8 flex-1 flex items-center justify-center text-center transition-all duration-300 cursor-pointer"
        style={{
          background: "var(--muted-bg)",
          border: "1px solid var(--card-border)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--primary)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.boxShadow =
            "0 15px 40px rgba(0,0,0,0.15), 0 0 25px var(--primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--muted-bg)";
          e.currentTarget.style.color = "var(--text-primary)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <p className="leading-relaxed font-medium">
          {data.test_paper_marking_scheme}
        </p>
      </div>
    </div>

  </div>
</div>


          {/* Stats */}
          <div className="space-y-6">
            <Stat title="Total Questions" value={data.total_questions_per_test_paper} subtitle="MCQ & Subjective"   />
            <Stat title="Total Marks" value={data.total_marks} subtitle="Passing: 180" />
            <Stat title="Total Time" value={data.total_time_per_test_paper_in_minute} subtitle="Minutes" />
          </div>

        </div>
      ))}
    </>
  );
};

export default TestpaperSection;
function Stat({ title, value, subtitle }) {
  return (
    <div
      className="p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-center items-center text-center"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        color: "var(--text-primary)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--primary)";
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.border = "1px solid var(--primary)";
        e.currentTarget.style.boxShadow =
          "0 15px 40px rgba(0,0,0,0.15), 0 0 25px var(--primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--card-bg)";
        e.currentTarget.style.color = "var(--text-primary)";
        e.currentTarget.style.border = "1px solid var(--card-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <p className="text-xs uppercase tracking-widest opacity-80 mb-2">
        {title}
      </p>

      <h3 className="text-5xl font-extrabold my-2">
        {value}
      </h3>

      <p className="text-xs opacity-80">
        {subtitle}
      </p>
    </div>
  );
}


