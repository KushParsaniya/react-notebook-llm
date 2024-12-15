import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';

function App() {
    // This is a simple check for authentication. In a real app, you'd use a more robust method.
    const isAuthenticated = () => {
        return localStorage.getItem('jwtToken') !== null;
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route
                    path="/dashboard"
                    element={isAuthenticated() ? <DashboardPage/> : <Navigate to="/login"/>}
                />
                <Route
                    path="/chat"
                    element={isAuthenticated() ? <ChatPage/> : <Navigate to="/login"/>}
                />
                <Route
                    path="/chat/:id"
                    element={isAuthenticated() ? <ChatPage/> : <Navigate to="/login"/>}
                />
                <Route path="/" element={<Navigate to="/dashboard"/>}/>
            </Routes>
        </Router>
    );
}

export default App;

