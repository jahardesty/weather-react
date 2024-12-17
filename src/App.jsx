import { useState } from 'react';
import reactLogo from './assets/react.svg';
import earthSun from './assets/earth-with-sun.svg';
import Weather from './components/weather';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <weather />
      <div>
        <a href="https://react.dev" target="_blank" />
      </div>

      <Weather />
    </>
  );
}

export default App;
