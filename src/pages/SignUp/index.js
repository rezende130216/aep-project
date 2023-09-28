import logo from "../../assets/logo.jpg";
import { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";

export default function SignUp() {
  const [name, setName] = useState('');	
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if(name === '' || email === '' || password === '') {
      toast.error('Fill in all fields');
      return;
    }
    await signUp(email,password,name);
  }

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
         <img src={logo} alt="Logo do sistema" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input type="text" placeholder="Name:" value={name} 
          onChange={(e) => setName(e.target.value)}/>

          <input type="text" placeholder="E-mail:" value={email} 
          onChange={(e) => setEmail(e.target.value)}/>

          <input type="password" placeholder="Password:"  value={password}
          onChange={(e) => setPassword(e.target.value)}/>

        <button type='submit'>{loadingAuth ? 'Loading...' : 'Register'}</button>
        
        </form>
        <Link to="/">Already have an account?</Link>
        
      </div>
    </div>
  );
}
