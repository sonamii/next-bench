import supabase from "./supabase";

async function updateIsLoggedIn(isLoggedIn: boolean): Promise<void> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error("Error fetching session");
  }

  if (!session) {
    throw new Error("No active session found");
  }

  const userId = session.user?.id;

  if (!userId) {
    throw new Error("User ID not found");
  }

  const { error } = await supabase
    .from("users")
    .update({ isLoggedIn })
    .eq("id", userId);

  if (error) {
    throw new Error(`Failed to update isLoggedIn: ${error.message}`);
  }

  console.log(`User ${userId} isLoggedIn updated to ${isLoggedIn}`);
}

export default updateIsLoggedIn;
