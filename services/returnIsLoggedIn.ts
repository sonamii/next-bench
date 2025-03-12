import supabase from "./supabase";

async function returnIsLoggedIn(): Promise<boolean | null> {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error getting session:", sessionError);
    return null;
  }

  if (!session.session || !session.session.user) {
    console.log("No active session found");
    return false;
  }

  const userId = session.session.user.id;
  const { data, error } = await supabase
    .from("users")
    .select("isLoggedIn")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user data:", error);
    return null;
  }

  return data.isLoggedIn;
}

export default returnIsLoggedIn;
