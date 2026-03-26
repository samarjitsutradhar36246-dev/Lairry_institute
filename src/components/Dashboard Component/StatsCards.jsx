import { useEffect, useState } from "react";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
export default function StatsCards({ setLoading }) {
  const { user, fetchInstituteAndExamData, fetchInstituteAndSubjectData, fetchTestpaperIdAndName, fetchAllQuestionsData } = useSupabase()
  const [examCount, setExamCount] = useState(0)
  const [subjectCount, setSubjectCount] = useState(0)
  const [testPaperCount, seTestPaperCount] = useState(0)
  const [questionsCount, setQuestionsCount] = useState(0)
  useEffect(() => {
    const loadExamdata = async () => {
      try {
        setLoading(true)
        const examData = await fetchInstituteAndExamData(user.auth_user_id);
        const subjectData = await fetchInstituteAndSubjectData(user.auth_user_id);
        const testpaperData = await fetchTestpaperIdAndName(user.auth_user_id);

        const TestPaperIds = [...new Set(testpaperData.SubjectsData?.flatMap(i => i.subject_test_paper_ids || []))];
        
        const questions = await fetchAllQuestionsData(TestPaperIds);

        setExamCount(examData.ExamsData || []);
        setSubjectCount(subjectData.SubjectsData || [])
        seTestPaperCount(testpaperData.TestPapersData || [])
        setQuestionsCount(questions.QuestionsData || [])
      } catch (error) {
        console.error("Exams Data Fetching Error!", error);
      }
    };

    if (user?.auth_user_id) loadExamdata();
    setLoading(false)
  }, [user?.auth_user_id]);
  const totalExams = examCount.length || 0;
  const totalSubject = subjectCount.length || 0;
  const totalTestPaper = testPaperCount.length || 0;
  const totalQuestions = questionsCount.length || 0;

  return (
    <div className="mt-16 flex flex-wrap gap-4 p-2">
      {[
        ["assignment_turned_in", "Active Exams", totalExams],
        ["library_books", "Active Subjects", totalSubject],
        ["description", "Active Test Paper", totalTestPaper],
        ["checklist", "Total Questions", totalQuestions],
      ].map(([icon, label, value], i) => (
        <div
          key={i}
          className="
          flex-1 min-w-[260px]
          rounded-2xl p-6
          flex items-center gap-5
          transition-all duration-300
          bg-[var(--bg-paper)]
          border border-[color-mix(in_srgb,var(--text-primary)_8%,transparent)]
          hover:shadow-lg
          hover:-translate-y-1
        "
        >
          {/* Icon */}
          <div
            className="
            p-3 rounded-xl
            bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]
            border border-[color-mix(in_srgb,var(--primary)_30%,transparent)]
          "
          >
            <span className="material-symbols-outlined text-[var(--primary)] text-2xl">
              {icon}
            </span>
          </div>

          {/* Text Content */}
          <div>
            <p className="text-[var(--text-secondary)] text-xs uppercase tracking-wide">
              {label}
            </p>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-[var(--text-primary)]">
                {value}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

}
