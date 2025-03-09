import {  Routes,Route } from 'react-router-dom';
import './App.css';
import { Homepage } from './Pages/Homepage.jsx';
import { Reportpage } from './Pages/Reportpage.jsx';
function App() {
  return (
   
   <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/report" element={<Reportpage/>}></Route>
    </Routes>

  );
}

export default App;
