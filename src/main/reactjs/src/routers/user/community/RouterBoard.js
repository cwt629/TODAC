import React from "react";
import { Route, Routes } from "react-router-dom";
import BoardMain from "../../../components/community/board/BoardMain";
import BoardForm from "../../../components/community/board/BoardForm";
import BoardDetail from "../../../components/community/board/BoardDetail";
import BoardUpdateForm from "../../../components/community/board/BoardUpdateForm";

const RouterBoard = () => {
    return (
        <Routes>
            <Route path='' element={<BoardMain />} />
            <Route path='form' element={<BoardForm />} />
            <Route path='detail/:boardcode' element={<BoardDetail />} />
            <Route path='updateform/:boardcode' element={<BoardUpdateForm />} />
        </Routes>
    );
};

export default RouterBoard;
