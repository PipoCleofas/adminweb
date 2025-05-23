import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './pictures/logo.gif'; 
import './App.css';
import "@fontsource/readex-pro";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); 
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='welcome'>
      <img src={logo} alt="logo"/> 
    </div>
  );
}

export default App;
