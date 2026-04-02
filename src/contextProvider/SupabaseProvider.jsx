import { createContext, useContext, useEffect, useState, useRef } from "react";
import { supabase } from "../services/supabaseClient";

/* ---------------------------------------------
   1. Create Context
--------------------------------------------- */
const SupabaseContext = createContext(null);

/* ---------------------------------------------
   2. Provider Component
--------------------------------------------- */
export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null); // full institute row
  const [session, setSession] = useState(null); // Supabase session
  const [loading, setLoading] = useState(true);
  const syncingRef = useRef(false);

  const syncUserToDatabase = async (authUser, source = "unknown") => {
    if (!authUser || syncingRef.current) return;
    syncingRef.current = true;

    try {
      const { data: inst, error } = await supabase
        .from("institutes")
        .select("*")
        .eq("auth_user_id", authUser.id)
        .maybeSingle();

      if (error || !inst || inst.account_status !== "ACTIVE") {
        await supabase.auth.signOut();
        setUser((prev) => (prev ? null : prev)); // only update if changed
        setSession((prev) => (prev ? null : prev));
      } else {
        setUser((prev) =>
          JSON.stringify(prev) === JSON.stringify(inst) ? prev : inst,
        );
      }
    } catch {
      setUser((prev) => (prev ? null : prev));
      setSession((prev) => (prev ? null : prev));
    } finally {
      setLoading(false);
      syncingRef.current = false;
    }
  };

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session?.user) {
        await syncUserToDatabase(data.session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession((prev) => {
        // Only update if access_token changed
        if (prev?.access_token === session?.access_token) return prev;
        return session;
      });
      if (!session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }
      syncUserToDatabase(session.user, event);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signupInstitute = async ({ email, temp_password, password }) => {
    const cleanedEmail = String(email ?? "")
      .trim()
      .toLowerCase();
    const safePassword = String(password ?? "");

    // 1️⃣ Fetch institute
    const { data: inst, error: fetchError } = await supabase
      .from("institutes")
      .select("*")
      .eq("institute_email", cleanedEmail)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!inst) throw new Error("Invalid email or not invited");
    if (inst.account_status !== "Invited") throw new Error("Already signed up");
    if (inst.password !== temp_password)
      throw new Error("Temp password incorrect");

    // 2️⃣ Create auth user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: cleanedEmail,
      password: safePassword,
    });

    if (signUpError) throw signUpError;

    // 3️⃣ Update institutes table
    const { error: updateError } = await supabase
      .from("institutes")
      .update({
        auth_user_id: authData.user.id,
        account_status: "ACTIVE",
        activated_at: new Date().toISOString(),
      })
      .eq("institute_email", cleanedEmail);

    if (updateError) throw updateError;

    // 6️⃣ Update KPI with error check
    const { error: kpiError } = await supabase.rpc("update_kpi", {
      kpi_name: "active_institutes",
      delta: 1,
    });

    if (kpiError) throw kpiError;

    return authData;
  };

  const loginUser = async (email, password) => {
    const cleanedEmail = email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanedEmail,
      password,
    });
    if (error) throw error;

    await syncUserToDatabase(data.user);
    return data;
  };

  const logoutUser = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };
  // Reset Password
  const resetPassword = async (email) => {
    if (!email) {
      throw new Error("Please enter your email address");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  };
  /* ---------------------------------------------
     3. Fetch Notifications
  --------------------------------------------- */
  const fetchNotifications = async () => {
    if (!user?.auth_user_id) return [];

    const { data, error } = await supabase
      .from("institute_notification")
      .select("*")
      .eq("user_id", user.auth_user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  };
  // MARK ALL READ
  const markAllNotificationsRead = async () => {
    if (!user?.auth_user_id) return;

    const { error } = await supabase
      .from("institute_notification")
      .update({ is_read: true })
      .eq("user_id", user.auth_user_id);

    if (error) throw error;
  };
  // MARK Single READ
  const markSingleNotificationsRead = async (id, isRead) => {
    if (!user?.auth_user_id) return;

    const { error } = await supabase
      .from("institute_notification")
      .update({ is_read: isRead })
      .eq("id", id)
      .eq("user_id", user.auth_user_id);

    if (error) throw error;
  };

  // CLEAR ALL
  const clearNotifications = async () => {
    if (!user?.auth_user_id) return;

    const { error } = await supabase
      .from("institute_notification")
      .delete()
      .eq("user_id", user.auth_user_id);

    if (error) throw error;
  };

  // 5️⃣ FETCH USER PROFILE (FROM users TABLE)
  const fetchUserProfile = async (userId) => {
    if (!userId) throw new Error("User ID required");

    const { data, error } = await supabase
      .from("institutes_data")
      .select(
        "institute_name,institute_description,profile_image,phone_number,email,institute_id",
      )
      .eq("institute_id", userId)
      .single();

    if (error) throw error;

    return data;
  };
  // upload profile image + update user table
  const uploadProfileImage = async (file, userId) => {
    if (!file || !userId) throw new Error("Missing file or userId");

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `profile-images/${fileName}`;

    // 1️⃣ Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("Institute Uploads") // ⬅️ create this bucket
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type, // ✅ important
      });

    if (uploadError) throw uploadError;

    // 2️⃣ Get public URL
    const { data } = supabase.storage
      .from("Institute Uploads")
      .getPublicUrl(filePath);

    const imageUrl = data.publicUrl;

    // 3️⃣ Update user profile image to public.users table
    const { data: updateImage, error: updateError } = await supabase
      .from("institutes_data")
      .update({ profile_image: imageUrl })
      .eq("institute_id", userId)
      .select();

    if (updateError) throw updateError;
    if (!data || data.length === 0) {
      throw new Error("Profile image update blocked by RLS");
    }
    return imageUrl;
  };
  //update the user profile data in public.users table
  const updateUserProfile = async (userId, updates) => {
    const { data, error } = await supabase
      .from("institutes_data")
      .update(updates)
      .eq("institute_id", userId)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Update blocked by RLS or no matching row");
    }
  };
  const fetchInstituteAndExamData = async (user_id) => {
    const { data: InstituteData, error: InstituteDataError } = await supabase
      .from("institutes_data")
      .select("exam_ids")
      .eq("institute_id", user_id);
    if (InstituteDataError) throw InstituteDataError;

    const examIds = [
      ...new Set(InstituteData.flatMap((i) => i.exam_ids || [])),
    ];
    const { data: ExamsData, error: ExamsDataError } = await supabase
      .from("institute_exams_data")
      .select("*")
      .in("id", examIds);
    if (ExamsDataError) throw ExamsDataError;

    // const subjectIds = [...new Set(ExamsData.flatMap(i => i.subject_ids || []))];
    // const { data: SubjectsData, error: SubjectsDataError } = await supabase
    //   .from("institute_exam_subjects_data")
    //   .select("*")
    //   .in("id", subjectIds)
    // if (SubjectsDataError) throw SubjectsDataError;

    // const TestPaperIds = [...new Set(SubjectsData.flatMap(i => i.subject_test_paper_ids || []))];
    // const { data: TestPaperData, error: TestPaperDataError } = await supabase
    //   .from("subject_test_paper_data")
    //   .select("*")
    //   .in("id", TestPaperIds)
    // if (TestPaperDataError) throw TestPaperDataError;

    return { ExamsData };
  };
  // ➕ CREATE EXAM
  const createInstituteExam = async ({
    institute_id,
    exam_name,
    category,
    language,
    icon,
    status,
  }) => {
    // 1️⃣ INSERT EXAM
    const { data: exam, error } = await supabase
      .from("institute_exams_data")
      .insert({
        exam_title: exam_name,
        exam_category: category,
        language,
        icon,
        exam_status: status,
      })
      .select()
      .single();

    if (error) throw error;
    // 2️⃣ FETCH EXISTING exam_ids
    const { data: institute, error: fetchError } = await supabase
      .from("institutes_data")
      .select("exam_ids")
      .eq("institute_id", institute_id)
      .single();

    if (fetchError) throw fetchError;

    const existingExamIds = institute?.exam_ids || [];

    if (existingExamIds.length > 0) {
      // 3️⃣ APPEND NEW EXAM ID
      const updatedExamIds = [...new Set([...existingExamIds, exam.id])];

      // 4️⃣ UPDATE institutes_data
      const { error: updateError } = await supabase
        .from("institutes_data")
        .update({ exam_ids: updatedExamIds })
        .eq("institute_id", institute_id);

      if (updateError) throw updateError;
    } else {
      // 4️⃣ UPDATE institutes_data
      const { error: updateError } = await supabase
        .from("institutes_data")
        .update({ exam_ids: [exam.id] })
        .eq("institute_id", institute_id);

      if (updateError) throw updateError;
    }

    return exam;
  };

  const fecthUpdateInstituteExamData = async (exam_id) => {
    // 1️⃣ fetch Updated EXAM
    const { data: exam, error } = await supabase
      .from("institute_exams_data")
      .select("exam_title,exam_category,language,icon,exam_status")
      .eq("id", exam_id)
      .single();
    if (error) throw error;
    return exam;
  };
  const updateInstituteExam = async ({
    exam_id,
    exam_name,
    category,
    language,
    icon,
    status,
  }) => {
    // 1️⃣ Update EXAM
    const { error } = await supabase
      .from("institute_exams_data")
      .update({
        exam_title: exam_name,
        exam_category: category,
        language,
        icon,
        exam_status: status,
      })
      .eq("id", exam_id);

    if (error) throw error;
  };

  const deleteExamData = async (exam_id, institute_id) => {
    try {
      const { error } = await supabase.rpc("delete_exam_cascade", {
        p_exam_id: exam_id,
        p_institute_id: institute_id,
      });

      if (error) throw error;

      return true;
    } catch (error) {
      console.error("Delete Exam Error:", error.message);
      throw error;
    }
  };

  const fetchInstituteAndSubjectData = async (institute_id) => {
    const { data: institutes, error: institutesError } = await supabase
      .from("institutes_data")
      .select("exam_ids")
      .eq("institute_id", institute_id);
    if (institutesError) throw institutesError;

    const examIds = [...new Set(institutes.flatMap((i) => i.exam_ids || []))];
    const { data: ExamsData, error: ExamsDataError } = await supabase
      .from("institute_exams_data")
      .select("subject_ids")
      .in("id", examIds);
    if (ExamsDataError) throw ExamsDataError;

    const subjectIds = [
      ...new Set(ExamsData.flatMap((i) => i.subject_ids || [])),
    ];
    const { data: SubjectsData, error: SubjectsDataError } = await supabase
      .from("institute_exam_subjects_data")
      .select("*")
      .in("id", subjectIds);
    if (SubjectsDataError) throw SubjectsDataError;

    return { SubjectsData };
  };

  const fetchExamsSubjectData = async (exam_id) => {
    if (!exam_id) return { SubjectsData: [] };

    // 1️⃣ Get subject_ids
    const { data: exam, error: examError } = await supabase
      .from("institute_exams_data")
      .select("subject_ids")
      .eq("id", exam_id)
      .single();

    if (examError) throw examError;

    const subjectIds = exam?.subject_ids || [];

    if (subjectIds.length === 0) {
      return { SubjectsData: [] };
    }

    // 2️⃣ Fetch subjectsData details
    const { data: SubjectsData, error: subjectsDataError } = await supabase
      .from("institute_exam_subjects_data")
      .select("*")
      .in("id", subjectIds);

    if (subjectsDataError) throw subjectsDataError;

    return { SubjectsData };
  };

  const createInstituteSubjectWithChapters = async (payload, exam_id) => {
    try {
      const { error, data: subjectData } = await supabase
        .from("institute_exam_subjects_data")
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      // 2️⃣ FETCH EXISTING subject_ids
      const { data: exams, error: fetchError } = await supabase
        .from("institute_exams_data")
        .select("subject_ids")
        .eq("id", exam_id)
        .single();

      if (fetchError) throw fetchError;

      const existingSubjectIds = exams?.subject_ids || [];

      // 3️⃣ APPEND NEW Subject ID
      const updatedSubjectIds = [
        ...new Set([...existingSubjectIds, subjectData.id]),
      ];

      // 4️⃣ UPDATE institute_exams_data table
      const { error: updateError } = await supabase
        .from("institute_exams_data")
        .update({ subject_ids: updatedSubjectIds })
        .eq("id", exam_id);

      if (updateError) throw updateError;

      return subjectData;
    } catch (err) {
      console.error("Create Subject Error:", err.message);
      throw err;
    }
  };

  const fecthUpdateInstituteExamSubjectData = async (subject_id) => {
    // 1️⃣ fetch Updated Subject
    const { data: updatedSubject, error } = await supabase
      .from("institute_exam_subjects_data")
      .select("*")
      .eq("id", subject_id)
      .single();
    if (error) throw error;
    return updatedSubject;
  };
  const updateInstituteExamSubject = async (subject_id, payload) => {
    // 1️⃣ Update EXAM
    const { error } = await supabase
      .from("institute_exam_subjects_data")
      .update([payload])
      .eq("id", subject_id);

    if (error) throw error;
  };

  const deleteExamAndSubjectData = async (subject_id) => {
    try {
      const { error } = await supabase.rpc("delete_subject_cascade", {
        p_subject_id: subject_id,
      });

      if (error) throw error;

      return true;
    } catch (error) {
      console.error("Delete Subject Error:", error.message);
      throw error;
    }
  };

  const fetchTestpaperIdAndName = async (user_id) => {
    const { data: InstituteData, error: InstituteDataError } = await supabase
      .from("institutes_data")
      .select("exam_ids")
      .eq("institute_id", user_id);
    if (InstituteDataError) throw InstituteDataError;

    const examIds = [
      ...new Set(InstituteData.flatMap((i) => i.exam_ids || [])),
    ];
    const { data: ExamsData, error: ExamsDataError } = await supabase
      .from("institute_exams_data")
      .select("subject_ids")
      .in("id", examIds);
    if (ExamsDataError) throw ExamsDataError;

    const subjectIds = [
      ...new Set(ExamsData.flatMap((i) => i.subject_ids || [])),
    ];
    const { data: SubjectsData, error: SubjectsDataError } = await supabase
      .from("institute_exam_subjects_data")
      .select("subject_test_paper_ids")
      .in("id", subjectIds);
    if (SubjectsDataError) throw SubjectsDataError;

    const TestPaperIds = [
      ...new Set(SubjectsData.flatMap((i) => i.subject_test_paper_ids || [])),
    ];
    const { data: TestPapersData, error: TestPaperDataError } = await supabase
      .from("subject_test_paper_data")
      .select(
        "id,test_paper_name,total_time_per_test_paper_in_minute,total_marks,total_questions_per_test_paper",
      )
      .in("id", TestPaperIds);
    if (TestPaperDataError) throw TestPaperDataError;

    return { SubjectsData, TestPapersData };
  };

  const fetchSubjectsTestPapersData = async (subject_id) => {
    if (!subject_id) return { TestPapersData: [] };

    // 1️⃣ Get subject_test_paper_ids
    const { data: subject, error: subjectError } = await supabase
      .from("institute_exam_subjects_data")
      .select("subject_test_paper_ids")
      .eq("id", subject_id)
      .single();

    if (subjectError) throw subjectError;

    const testpaperIds = subject?.subject_test_paper_ids || [];

    if (testpaperIds.length === 0) {
      return { TestPapersData: [] };
    }

    // 2️⃣ Fetch testpaper details
    const { data: TestPapersData, error: testpaperError } = await supabase
      .from("subject_test_paper_data")
      .select("*")
      .in("id", testpaperIds);

    if (testpaperError) throw testpaperError;

    return { TestPapersData };
  };

  const createTestpaperForSubject = async (payload, subject_id) => {
    try {
      const { error, data: TestpaperData } = await supabase
        .from("subject_test_paper_data")
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      // 2️⃣ FETCH EXISTING Test Paper Ids
      const { data: testpaperIds, error: fetchError } = await supabase
        .from("institute_exam_subjects_data")
        .select("subject_test_paper_ids")
        .eq("id", subject_id)
        .single();

      if (fetchError) throw fetchError;

      const existingSubjectTestpaperIds =
        testpaperIds?.subject_test_paper_ids || [];

      // 3️⃣ APPEND NEW Subject ID
      const updatedSubjectTestpaperIds = [
        ...new Set([...existingSubjectTestpaperIds, TestpaperData.id]),
      ];

      // 4️⃣ UPDATE Test Paper Ids in institute_exam_subjects_data table
      const { error: updateError } = await supabase
        .from("institute_exam_subjects_data")
        .update({ subject_test_paper_ids: updatedSubjectTestpaperIds })
        .eq("id", subject_id);

      if (updateError) throw updateError;

      return TestpaperData;
    } catch (err) {
      console.error("Create Subject Error:", err.message);
      throw err;
    }
  };
  const fecthUpdateInstituteExamSubjectTestpaperData = async (
    test_paper_id,
  ) => {
    // 1️⃣ fetch Updated Subject
    const { data: updatedTestpaper, error } = await supabase
      .from("subject_test_paper_data")
      .select("*")
      .eq("id", test_paper_id)
      .single();
    if (error) throw error;
    return updatedTestpaper;
  };
  const updateInstituteExamSubjectTestpaper = async (
    test_paper_id,
    payload,
  ) => {
    // 1️⃣ Update EXAM
    const { error } = await supabase
      .from("subject_test_paper_data")
      .update([payload])
      .eq("id", test_paper_id);

    if (error) throw error;
  };

  const deleteSubjectAndTestpaperData = async (test_paper_id) => {
    try {
      const { error } = await supabase.rpc("delete_testpaper_cascade", {
        p_test_paper_id: test_paper_id,
      });

      if (error) throw error;

      return true;
    } catch (error) {
      console.error("Delete Testpaper Error:", error.message);
      throw error;
    }
  };

  const createQuestionForTestpaper = async (payload) => {
    try {
      const safePayload = {
        ...payload,
        options: Array.isArray(payload.options) ? payload.options : [],
        correct_option_s: Array.isArray(payload.correct_option_s)
          ? payload.correct_option_s
          : [payload.correct_option_s],
      };
      const { error, data: QuestionData } = await supabase
        .from("subject_test_paper_questions")
        .insert(safePayload);

      if (error) throw error;

      return QuestionData;
    } catch (err) {
      console.error("Create Subject Error:", err.message);
      throw err;
    }
  };
  const fetchSubjectsTestPapersQuestionsData = async (test_paper_id) => {
    const { data: QuestionsData, error: QuestionsDataError } = await supabase
      .from("subject_test_paper_questions")
      .select("*")
      .eq("test_paper_id", test_paper_id);
    if (QuestionsDataError) throw QuestionsDataError;

    return { QuestionsData };
  };

  const fetchAllQuestionsData = async (test_paper_ids) => {
    const { data: QuestionsData, error: QuestionsDataError } = await supabase
      .from("subject_test_paper_questions")
      .select("q_id")
      .in("test_paper_id", test_paper_ids);
    if (QuestionsDataError) throw QuestionsDataError;

    return { QuestionsData };
  };

  const fecthUpdateInstituteExamSubjectTestpaperQuestionData = async (
    question_id,
  ) => {
    // 1️⃣ fetch Updated Subject
    const { data: updatedQuestion, error } = await supabase
      .from("subject_test_paper_questions")
      .select("*")
      .eq("q_id", question_id)
      .single();
    if (error) throw error;
    return updatedQuestion;
  };

  const updateInstituteExamSubjectTestpaperQuestionData = async (payload) => {
    if (!payload.q_id) throw new Error("Missing q_id");

    const safePayload = {
      question_text: payload.question_text,
      options: payload.options ?? [],
      question_instruction: payload.question_instruction,
      correct_option_s: payload.correct_option_s ?? [],
      positive_mark: Number(payload.positive_mark),
      negative_mark: Number(payload.negative_mark),
      expected_time_for_each_question: Number(
        payload.expected_time_for_each_question,
      ),
      chapter_name: payload.chapter_name,
      topic_name: payload.topic_name,
    };

    const { error } = await supabase
      .from("subject_test_paper_questions")
      .update(safePayload)
      .eq("q_id", payload.q_id);

    if (error) throw error;
  };

  const deleteSubjectAndTestpaperQuestionData = async (question_id) => {
    if (!question_id) return;

    try {
      /* 5️⃣ Delete Testpaper row */
      const { error: questionsDeleteError } = await supabase
        .from("subject_test_paper_questions")
        .delete()
        .eq("q_id", question_id);

      if (questionsDeleteError) throw questionsDeleteError;

      return true;
    } catch (error) {
      console.error("Delete Subject Cascade Error:", error.message);
      throw error;
    }
  };

  const fetchStudentEnrollmentInfo = async (institute_id) => {
    const { data: enrolledInfo, error: enrolledInfoError } = await supabase
      .from("institute_pricing")
      .select("*")
      .eq("institute_id", institute_id);
    if (enrolledInfoError) throw enrolledInfoError;

    const student_id = enrolledInfo?.map((s) => s.user_id);

    const { data: studentInfo, error: studentInfoError } = await supabase
      .from("users")
      .select("*")
      .in("id", student_id);
    if (studentInfoError) throw studentInfoError;
    return {
      enrolledInfo,
      studentInfo,
    };
  };

  const fetchStudentInfo = async (student_id) => {
    const { data, error } = await supabase
      .from("users")
      .select("id,full_name,profile_image")
      .eq("id", student_id);

    if (error) throw error;
    return data;
  };
  const fetchExamInfo = async (exam_id) => {
    const { data, error } = await supabase
      .from("institute_exams_data")
      .select("exam_title,exam_category,language,exam_status")
      .eq("id", exam_id);

    if (error) throw error;
    return data;
  };
  const fecthSubjectInfo = async (subject_id) => {
    const { data, error } = await supabase
      .from("institute_exam_subjects_data")
      .select("subject_name,total_chapters,chapters_and_topics_name")
      .eq("id", subject_id);

    if (error) throw error;
    return data;
  };
  const fetchTestPaperInfo = async (test_paper_ids) => {
    const { data, error } = await supabase
      .from("subject_test_paper_data")
      .select(
        "test_paper_name,test_paper_description,test_paper_rules,test_paper_marking_scheme,total_time_per_test_paper_in_minute,total_questions_per_test_paper,total_marks,passing_mark,test_paper_status",
      )
      .in("id", test_paper_ids);

    if (error) throw error;
    return data;
  };
  const fetchInstituteData = async (institute_id) => {
    const { data, error } = await supabase
      .from("institutes_data")
      .select("institute_name,profile_image")
      .eq("institute_id", institute_id);

    if (error) throw error;
    return data;
  };
  /* ---------------------------------------------
     CONTEXT VALUE
  --------------------------------------------- */
  const value = {
    user,
    session,
    loading,
    signupInstitute,
    loginUser,
    logoutUser,
    resetPassword,

    fetchNotifications,
    markAllNotificationsRead,
    markSingleNotificationsRead,
    clearNotifications,
    fetchUserProfile,
    uploadProfileImage,
    updateUserProfile,

    fetchInstituteAndExamData,
    createInstituteExam,
    fecthUpdateInstituteExamData,
    updateInstituteExam,
    deleteExamData,

    fetchInstituteAndSubjectData,
    fetchExamsSubjectData,
    createInstituteSubjectWithChapters,
    fecthUpdateInstituteExamSubjectData,
    updateInstituteExamSubject,
    deleteExamAndSubjectData,

    fetchSubjectsTestPapersData,
    createTestpaperForSubject,
    fecthUpdateInstituteExamSubjectTestpaperData,
    updateInstituteExamSubjectTestpaper,
    deleteSubjectAndTestpaperData,

    fetchTestpaperIdAndName,
    fetchSubjectsTestPapersQuestionsData,
    createQuestionForTestpaper,
    fecthUpdateInstituteExamSubjectTestpaperQuestionData,
    updateInstituteExamSubjectTestpaperQuestionData,
    deleteSubjectAndTestpaperQuestionData,

    fetchStudentEnrollmentInfo,
    fetchAllQuestionsData,

    fetchStudentInfo,
    fetchExamInfo,
    fecthSubjectInfo,
    fetchTestPaperInfo,
    fetchInstituteData,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

/* ---------------------------------------------
   3. Custom Hook
--------------------------------------------- */
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }
  return context;
};
