import { useContext, useState } from "react";
import { useRouter } from 'next/navigation';
import { loginUser } from "../../lib/api";
import Link from "next/link";
import { useStateContext } from "../../context/StateContext";

const Login = () => {
  const { setCurrentUser } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { email, password };
    const validationErrors = validate(userData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const response = await loginUser(userData);
    if (response.success) {
      setCurrentUser(response.user);
      router.replace('/')
      
    } else {
      setErrors(response.error);
    }
  };

  const validate = (userData) => {
    const errors = {};
    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(userData.email)) {
      errors.email = "Email is invalid";
    }
    if (!userData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors?.email && <p className='error'>{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors?.password && <p className='error'>{errors.password}</p>}
        {typeof (errors) === typeof (String) ? <p className='error'>{errors}</p> : null}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link href={`Register`}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
