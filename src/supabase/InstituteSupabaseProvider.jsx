// src/admin/supabase/InstituteSupabaseProvider.jsx
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { supabase } from "./SupabaseClient";

const InstituteSupabaseContext = createContext(null);

export const InstituteSupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // full institute row
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
      setUser(prev => (prev ? null : prev)); // only update if changed
      setSession(prev => (prev ? null : prev));
    } else {
      setUser(prev => (JSON.stringify(prev) === JSON.stringify(inst) ? prev : inst));
    }
  } catch {
    setUser(prev => (prev ? null : prev));
    setSession(prev => (prev ? null : prev));
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
  setSession(prev => {
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
    const cleanedEmail = String(email ?? "").trim().toLowerCase();
const safeTempPassword = String(temp_password ?? "");
const safePassword = String(password ?? "");


    // fetch institute by email
    const { data: inst, error: fetchError } = await supabase
      .from("institutes")
      .select("*")
      .eq("institute_email", cleanedEmail)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!inst) throw new Error("Invalid email or not invited");
    if (inst.account_status !== "Invited") throw new Error("Already signed up");
    if (inst.password !== temp_password) throw new Error("Temp password incorrect");

// Validate password locally
if (!safePassword || safePassword.length < 6) throw new Error("Password must be at least 6 characters");

// Sign up with Supabase safely
let authData;
try {
  const { data, error } = await supabase.auth.signUp({
    email: cleanedEmail,
    password: safePassword,
  });
  if (error) {
    console.error("Supabase signup error:", error);
    throw new Error(error.message || "Signup failed");
  }
  authData = data;
} catch (err) {
  console.error("Signup failed:", err);
  throw err;
}
    // if (authError) throw authError;

    // update institute row
    const { error: updateError } = await supabase
      .from("institutes")
      .update({
        auth_user_id: authData.user.id,
        account_status: "ACTIVE",
        password,
        activated_at: new Date().toISOString(),
      })
      .eq("institute_email", cleanedEmail);
    if (updateError) throw updateError;

    await syncUserToDatabase(authData.user);
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

  const value = { user, session, loading, signupInstitute, loginUser, logoutUser };

  return (
    <InstituteSupabaseContext.Provider value={value}>
      {children}
    </InstituteSupabaseContext.Provider>
  );
};

export const useInstituteSupabase = () => {
  const context = useContext(InstituteSupabaseContext);
  if (!context) throw new Error("useInstituteSupabase must be used inside InstituteSupabaseProvider");
  return context;
};
