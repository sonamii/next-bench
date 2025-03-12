import supabase from "@/services/supabase";

/**
 * ✅ Function to get the current user's isLoggedIn status.
 */
export async function getIsLoggedInStatus() {
  // 🔹 Get current user session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session || !session.user) {
    console.error("No active session found:", sessionError);
    return { isLoggedIn: false, error: "User not logged in" };
  }

  const userId = session.user.id; // Get user ID

  // 🔹 Fetch `isLoggedIn` status from `users` table
  const { data, error } = await supabase
    .from("users")
    .select("isLoggedIn")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching isLoggedIn status:", error);
    return { isLoggedIn: false, error: error.message };
  }

  return { isLoggedIn: data.isLoggedIn, error: null };
}

/**
 * ✅ Function to update the current user's isLoggedIn status.
 * @param status - true (logged in) or false (logged out)
 */
export async function updateLoginStatus(status: boolean) {
  // 🔹 Get current user session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session || !session.user) {
    console.error("No active session found:", sessionError);
    return { success: false, error: "User not logged in" };
  }

  const userId = session.user.id; // Get user ID

  // 🔹 Update `isLoggedIn` in the `users` table
  const { error } = await supabase
    .from("users")
    .update({ isLoggedIn: status })
    .eq("id", userId);

  if (error) {
    console.error("Error updating login status:", error);
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
