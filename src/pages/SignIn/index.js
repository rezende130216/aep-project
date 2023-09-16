import { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import logo01 from '../../assets/logo01.png';
import { AuthContext } from '../../contexts/auth';
import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loadingAuth } = useContext(AuthContext);	

  function handleSignIn(e) {
    e.preventDefault();

    if(email === '' || password === '') {
      toast.error('Fill in all fields');
      return;
    }
    signIn(email, password);
    
  }


  return (
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
         <img src={logo01} alt="Logo do sistema" />
        </div>
        <form onSubmit={handleSignIn}>
          <h1>Login</h1>
          <input type="text" placeholder="E-mail:" value={email} 
          onChange={(e) => setEmail(e.target.value)}/>

          <input type="password" placeholder="Password:"  value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          <Link className='forgot' to="/forgot">Forgot your password?</Link>

        <button type='submit'>{loadingAuth ? 'Loading...' : 'Login'}</button>

        </form>
        <Link to="/signup">Create an account</Link>
      </div>
    </div>
  );
}