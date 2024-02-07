import React from "react";
import { Route, Routes } from "react-router-dom";
import BoardMain from "../../../components/community/board/BoardMain";
import BoardForm from "../../../components/community/board/BoardForm";
import BoardDetail from "../../../components/community/board/BoardDetail";

const RouterBoard = () => {
    return (
        <Routes>
            <Route path='' element={<BoardMain />} />
            <Route path='form' element={<BoardForm />} />
            <Route path='detail' element={<BoardDetail />} />
        </Routes>
    );
};

export default RouterBoard;
