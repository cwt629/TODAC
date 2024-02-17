import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BoardStyle.css";
import axios from "axios";
import BoardRowItem from "./BoardRowItem";
import Fab from "@mui/material/Fab";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import {
    IconButton,
    InputBase,
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
import PageHeader from "../../PageHeader";

const BoardMain = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState(""); // 검색어를 저장하는 state
    const [filteredList, setFilteredList] = useState(list); // 검색된 목록을 저장하는 state
    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/user/community/board" },
    ];

    const PAGE_TITLE = "게시판";

    const navi = useNavigate();

    const boardList = () => {
        axios.get("/board/list").then((res) => {
            setList(res.data);
            setFilteredList(res.data); //초기 전체 리스트 출력용
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

    const handleSearch = () => {
        if (search === "") {
            return;
        }
        const filteredList = list.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
        setFilteredList(filteredList);
        // 페이지를 첫 페이지로 초기화
        setPage(0);
    };

    const handleReset = () => {
        // Reset the filtered list to the original list
        setFilteredList(list);
        // Clear the search input
        setSearch("");
        // Reset the page to the first page
        setPage(0);
    };

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div
                className=''
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "15px",
                }}
            >
                <Paper
                    component='form'
                    sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <IconButton type='button' sx={{ p: "10px" }} aria-label='menu'>
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        type='text'
                        className='form-control'
                        placeholder='검색어를 입력해 주세요.'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                    />
                    {search.length > 0 && ( // 리셋 버튼 ! 검색어 입력시 생성
                        <IconButton type='button' sx={{ p: "10px" }} aria-label='clear' onClick={handleReset}>
                            <CloseIcon />
                        </IconButton>
                    )}
                    <IconButton type='button' sx={{ p: "10px" }} aria-label='search' onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
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
                        <Table sx={{ width: "100%" }}>
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
