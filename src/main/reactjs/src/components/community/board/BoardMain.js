import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./BoardStyle.css";
import axios from "axios";
import BoardRowItem from "./BoardRowItem";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const BoardMain = () => {
    const [list, setList] = useState([]);

    const navi = useNavigate();

    const boardList = () => {
        axios.get("/board/list").then((res) => {
            setList(res.data);
        });
    };

    useEffect(() => {
        boardList();
    }, []);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14 col_blue2'>
                <Link to='/user/community'>커뮤니티 {">"} </Link>
                <Link to='/user/community/board'>게시판</Link>
            </div>

            <div className='fs_25 fw_700'>게시판</div>

            <div className='search'>
                <input type='text' className='form-control' placeholder='검색어를 입력해 주세요.' />
                <button type='submit'>
                    <SearchIcon />
                </button>
            </div>

            <div className='btn_add' onClick={() => navi("form")}>
                <Fab
                    color='secondary'
                    sx={{
                        position: "absolute",
                        bottom: (theme) => theme.spacing(2),
                        right: (theme) => theme.spacing(2),
                    }}
                >
                    <AddIcon />
                </Fab>
            </div>

            <div className='mt_10'>
                <div className=''>{list && list.map((data, idx) => <BoardRowItem key={idx} data={data} />)}</div>
            </div>
        </div>
    );
};

export default BoardMain;
