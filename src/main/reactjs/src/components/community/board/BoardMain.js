import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardStyle.css";
import axios from "axios";
import BoardRowItem from "./BoardRowItem";
import Fab from "@mui/material/Fab";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PageHeader from "../../PageHeader";
import { IconButton, ImageList, InputBase, Paper, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const BoardMain = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [search, setSearch] = useState(""); // 검색어를 저장하는 state
    const [filteredList, setFilteredList] = useState(list); // 검색된 목록을 저장하는 state
    const [cols, setCols] = useState(2); // 초기 cols 값 설정
    const navi = useNavigate();
    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/user/community/board" },
    ];

    const PAGE_TITLE = "게시판";

    const boardList = () => {
        axios.get("/main/list").then((res) => {
            setList(res.data);
            setFilteredList(res.data); // 초기 전체 리스트 출력용
        });
    };

    useEffect(() => {
        boardList();

        // 창의 너비에 따라 cols 값을 설정
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth >= 550) {
                setCols(3);
            } else if (windowWidth >= 300) {
                setCols(2);
            } else {
                setCols(1);
            }
        };

        handleResize(); // 초기 로딩 시 한 번 호출
        window.addEventListener("resize", handleResize);

        return () => {
            // cleanup 함수에서 이벤트 리스너 제거
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearch = () => {
        if (search === "") {
            return;
        }
        const filteredList = list.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
        setFilteredList(filteredList);
        // 페이지를 첫 페이지로 초기화
        setPage(1);
    };

    const handleReset = () => {
        // Reset the filtered list to the original list
        setFilteredList(list);
        // Clear the search input
        setSearch("");
        // Reset the page to the first page
        setPage(1);
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
                    marginTop: "10px",
                }}
            >
                <Paper
                    className='d-flex justify-content-between'
                    component='form'
                    sx={{
                        p: "2px 4px",
                        margin: "10px auto",
                        padding: "7px 10px",
                        border: "1px solid white",
                        borderRadius: "10px",
                        outline: "0",
                        alignItems: "center",
                        width: "322px",
                    }}
                >
                    <IconButton type='button' sx={{ p: "10px" }} aria-label='menu'>
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        type='text'
                        className=''
                        placeholder='검색어를 입력해 주세요.'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                    />
                    {search.length > 0 && (
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

            <div className='mt-1'>
                {filteredList.length === 0 ? (
                    <Typography className='no_result' variant='h6' color='textSecondary'>
                        <h1 style={{ color: "orange" }}>검색 결과가 없습니다.</h1>
                        <br />
                        다른 검색어를 입력하시거나
                        <br />
                        철자와 띄어쓰기를 확인해보세요.
                    </Typography>
                ) : (
                    <div>
                        <ImageList
                            sx={{
                                width: "100%",
                                maxWidth: 900,
                                bgcolor: "",
                            }}
                            cols={cols}
                        >
                            {(rowsPerPage > 0
                                ? filteredList.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                : filteredList
                            ).map((data, idx) => (
                                <BoardRowItem key={idx} data={data} />
                            ))}
                        </ImageList>
                        <Stack spacing={2} style={{ display: "flex", justifyContent: "center" }}>
                            <Pagination
                                count={Math.ceil(filteredList.length / rowsPerPage)}
                                size='small'
                                shape='rounded'
                                color='secondary'
                                page={page}
                                onChange={handleChangePage}
                            />
                        </Stack>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardMain;
