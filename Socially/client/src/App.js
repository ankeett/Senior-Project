import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Explore from './components/Explore/Explore';
import Notifications from './components/Notifications/Notifications';
import Messsages from './components/Messages/Messsages';
import Profile from './components/Profile/Profile';
import More from './components/More/More';
import Auth from './components/Authentication/Auth';

function App() {
  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route exact path="" element={<Nav/>}>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/explore' element={<Explore/>}/>
          <Route exact path='/notifications' element={<Notifications/>}/>
          <Route exact path='/messages' element={<Messsages/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
          <Route exact path='/more' element={<More/>}/>
        </Route>
        <Route exact path='/signin' element={<Auth/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
