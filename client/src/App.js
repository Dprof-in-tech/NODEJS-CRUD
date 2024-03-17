import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './components/create';
import UserDetail from './components/display';
import NotFound from './components/404';
import Home from './components/home';
import Users from './components/users';
import EditUser from './components/edit';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/createUser" element={<CreateUser />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/users/:userId" element={<UserDetail />} />
          <Route exact path="/users/:userId/edit" element={<EditUser />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
