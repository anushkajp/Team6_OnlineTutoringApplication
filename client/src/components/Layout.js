import React, { useContext } from 'react';
import Header from './Header';
import Sidebar from './sidebar';
import "../styles/layout.css";
import { UserContext } from '../UserContext'

function Layout({ children }) {
    const { user } = useContext(UserContext);

    return (
        <div className="container">
            <div className="header">
                <Header />
            </div>
            <div className="content-area">
                {user && <aside><Sidebar renderType={user.accountType}/></aside>}
                <div className="MainContent">{children}</div>
            </div>
        </div>
    );
}

export default Layout;
