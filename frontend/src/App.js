import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import BoxScores from './pages/BoxScores';
import Stats from './pages/Stats';
import Query from './pages/Query';
import { Routes, Route} from 'react-router-dom';


function App() {
  return (
    <>
      
      <NavBar />
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/boxscores' element={<BoxScores/>} />
          <Route path='/statleaders' element={<Stats/>} />
          <Route path='/query' element={<Query/>} />
      </Routes>
      
    </>
  );
}

export default App;
