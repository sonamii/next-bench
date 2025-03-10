import { LoginForm } from "@/components/form-login";
import './../../../app/auth/login-signup.css'
/**
 * SignUp component renders a form for users to log in to the application.
 *
 * It wraps the {@link LoginForm} component with a containerMax class to center it on the page.
 */
export default function SignUp() {
  return (
    <div className="containerMax">
      <LoginForm />
    </div>
  );
}
