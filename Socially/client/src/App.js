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
import Signup from './components/Authentication/Signup';
import Activate from './components/Authentication/Activate';
import CheckActivate from './components/Authentication/CheckActivate';
import ForgotPw from './components/Authentication/forgotPass';
import CheckForget from './components/Authentication/CheckForget';
import ResetPw from './components/Authentication/ResetPw';
import ChangePassword from './components/Authentication/ChangePw';
import LoadDetails from './components/Home/load';
import UserProfile from './components/Profile/UserProfile';
import PostPage from './components/Post/PostPage';

function App() {
  return (
   <div>
    <BrowserRouter>
      <LoadDetails/>
      <Routes>
        <Route exact path="" element={<Nav/>}>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/explore' element={<Explore/>}/>
          <Route exact path='/notifications' element={<Notifications/>}/>
          <Route exact path='/messages' element={<Messsages/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
          
          <Route exact path='/more' element={<More/>}/>
        </Route>
        <Route exact path='/login' element={<Auth/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/activate' element={<CheckActivate/>}/>
        <Route exact path='/activate/:token' element={<Activate/>}/>
        <Route exact path='/forgotpassword' element={<ForgotPw/>}/>
        <Route exact path='/checkforgot' element={<CheckForget/>}/>
        <Route exact path='/api/password/reset/:token' element={<ResetPw/>}/>
        <Route exact path='/changePassword' element={<ChangePassword/>}/>
        <Route exact path='/profile/user/:id' element={<UserProfile/>}/>
        <Route exact path='/post/:id' element={<PostPage/>}/>



      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
