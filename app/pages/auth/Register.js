import { useEffect, useState } from 'react';
import Link from 'next/link';
import { registerUser } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { client } from '../../lib/client';

const Register = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(()=>{
    if (username) {
      client
        .fetch(`*[_type == "user" && username == "${username}"]`)
        .then((data) => {
          setErrors({username:data.length > 0 ? "Username already exists!":""});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },[username])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, email, password };
    const validationErrors = validate(userData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const response = await registerUser(userData);
    if (response.success) {
      router.replace('/auth/Login')
    } else {
      setErrors(response.error);
    }
  };

  const validate = (userData) => {
    const errors = {};
    if (!userData.username) {
      errors.username = 'Username is required';
    }
    if (!userData.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(userData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!userData.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='register-form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        {errors?.username && <p className='error'>{errors.username}</p>}
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setName(event.target.value)}
        />
        
        <label htmlFor="email">Email</label>
        {errors?.email && <p className='error'>{errors.email}</p>}
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        
        <label htmlFor="password">Password</label>
        {errors?.password && <p className='error'>{errors.password}</p>}
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {typeof(errors) === typeof(String) ? <p className='error'>{errors}</p> : null}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link href="Login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
