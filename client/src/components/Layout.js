import React, { useContext } from 'react';
import Header from './Header';
import Sidebar from './sidebar';
import MainContent from './MainContent';
import { UserContext } from '../UserContext'

function Layout({ children }) {
    const { user } = useContext(UserContext);

    return (
        <div className="container">
            <Header />
            <div className="content-area">
                <aside><Sidebar renderType={user.accountType}/></aside>
                <MainContent>{children}</MainContent>
            </div>
        </div>
    );
}

export default Layout;
