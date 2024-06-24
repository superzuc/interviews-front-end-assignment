import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddItem from './components/AddItem';
import RecipeDetails from './components/RecipeDetails';
import Welcome from './components/Welcome';
import Home from './components/Home';

function App() {

  return (
    <Router>
      <Routes>       
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/recipe-details" element={<RecipeDetails />} />     
      </Routes>
    </Router>
  );
}

export default App;