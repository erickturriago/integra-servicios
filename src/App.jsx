
import { useState } from 'react'
import './App.css'
import SignIn from './components/LoginRegister/SignIn';
import SignUp from './components/LoginRegister/SignUp';

function App() {

  const [isLogin,setIsLogin] = useState(true);

  return (
    <>
      {isLogin && <SignIn isLogin={isLogin} setIsLogin={setIsLogin}/>}
      {!isLogin && <SignUp isLogin={isLogin} setIsLogin={setIsLogin}/>}
    </>
  )
}

export default App
