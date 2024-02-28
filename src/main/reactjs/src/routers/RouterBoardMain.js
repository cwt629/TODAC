import React from 'react';
import Header from '../Header';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer';
import BoardMain from '../components/community/board/BoardMain';
import BoardForm from '../components/community/board/BoardForm';
import BoardDetail from '../components/community/board/BoardDetail';
import BoardUpdateForm from '../components/community/board/BoardUpdateForm';

const RouterBoardMain = () => {
    return (
        <div className='app'>
            <Header />

            <div className='appcontent'>
                <Routes>
                    <Route path='' element={<BoardMain />} />
                    <Route path='form' element={<BoardForm />} />
                    <Route path='detail/:boardcode' element={<BoardDetail />} />
                    <Route path='updateform/:boardcode' element={<BoardUpdateForm />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
};

export default RouterBoardMain;