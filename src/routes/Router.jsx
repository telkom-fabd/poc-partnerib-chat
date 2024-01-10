import {Route, Routes} from 'react-router-dom';
import ChatListPage from "../pages/Chat/ChatListPage.jsx";
import LoginPage from "../pages/Auth/LoginPage.jsx";
import RegisterPage from "../pages/Auth/RegisterPage.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/chat" element={<ChatListPage/>}/>
        </Routes>
    );
};

export default AppRouter;
