import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import BoxScores from './pages/BoxScores';
import YearlyScores from './pages/YearlyScores';
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
          <Route path='/boxscores' element={<BoxScores/>} />
          <Route path='/boxscores/:year' element={<YearlyScores/>} />
          <Route path='/statleaders' element={<Stats/>} />
          <Route path='/query' element={<Query/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
