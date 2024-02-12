import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BoardStyle.css";
import axios from "axios";
import BoardRowItem from "./BoardRowItem";
import Fab from "@mui/material/Fab";
import CreateIcon from "@mui/icons-material/Create";
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const BoardMain = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState(""); // 검색어를 저장하는 state
    const navi = useNavigate();

    const boardList = () => {
        axios.get("/board/list").then((res) => {
            setList(res.data);
        });
    };

    useEffect(() => {
        boardList();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredList = list.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14 col_blue2'>
                <Link to='/user/community'>커뮤니티 {">"} </Link>
                <Link to='/user/community/board'>게시판</Link>
            </div>

            <div className='fs_25 fw_700'>게시판</div>

            <div className='search'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='검색어를 입력해 주세요.'
                    value={searchTerm}
                    onChange={handleSearch}
                />
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
                    <CreateIcon />
                </Fab>
            </div>

            <div className='mt_10'>
                {filteredList.length === 0 ? (
                    <Typography className='no_result' variant='h6' color='textSecondary'>
                        <h1 style={{ color: "orange" }}>검색 결과가 없습니다.</h1>
                        <br />
                        다른 검색어를 입력하시거나
                        <br />
                        철자와 띄어쓰기를 확인해보세요.
                    </Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table sx={{ width: "500" }} aria-label='custom pagination table'>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredList
                                ).map((data, idx) => (
                                    <BoardRowItem key={idx} data={data} />
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow className='tool_bar' style={{ display: "flex" }}>
                                    <TablePagination
                                        labelRowsPerPage={""}
                                        rowsPerPageOptions={[5, 10]}
                                        colSpan={3}
                                        count={filteredList.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
    );
};

export default BoardMain;
