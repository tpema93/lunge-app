import {React, useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Login from './components/Login/Login';
import Signup from './components/signup/SignupForm';
import Landing from './components/landing/landing';
import NewProfile from './components/new-profile-page/NewProfile';
import ChooseActivities from './components/activities/ChooseActivities';
import MatchesPage from './components/Matches/Matches';
import Chat from './components/chat/chat';
import Cards from './components/discovery/cards'; // Ensure this import path is correct
import NavBar from './components/nav-bar/NavBar'; // Ensure this is the correct path to your NavBar component
import EditProfile from './components/edit-profile/edit-profile';
import FilterProfiles from './components/discovery/filter-profile';

function App() {
const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter basename='/CSE442-542/2024-Spring/cse-442j/build/' >
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}></Route>
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn}/>}></Route>
        <Route path="/new-profile" element={<NewProfile />}></Route>
        <Route path="/new-activities" element={<ChooseActivities />}></Route>
        <Route path="/discovery" element={<><NavBar /><Cards /></>}></Route>
        <Route path="/matches" element={<><NavBar /><MatchesPage /></>}></Route>
        <Route path="/chat" element={<><NavBar /><Chat /></>}></Route>
        <Route path="/edit-profile" element={<><NavBar /><EditProfile /></>}></Route>
        <Route path="/filter" element={<FilterProfiles />}></Route>

       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
