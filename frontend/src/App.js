import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Scores from './pages/Scores';
import YearlyScores from './pages/YearlyScores';
import BoxScore from './pages/BoxScore';
import Stats from './pages/Stats';
import Query from './pages/Query';
import Footer from './components/Footer';
import { Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/scores' element={<Scores/>} />
          <Route path='/scores/:year' element={<YearlyScores/>} />
          <Route path='/scores/:year/:homeTeam_vs_awayTeam_date' element={<BoxScore/>} />
          <Route path='/statleaders' element={<Stats/>} />
          <Route path='/query' element={<Query/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
