import { SignUpForm } from "@/components/form-signup";
import './../../../app/auth/login-signup.css'
/**
 * SignUp component renders a form for users to sign up for the application.
 *
 * It wraps the {@link SignUpForm} component with a containerMax class to center it on the page.
 */
export default function SignUp() {
  return (
    <div className="containerMax">
      <SignUpForm />
    </div>
  );
}
