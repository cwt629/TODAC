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
import {
    FormControl,
    IconButton,
    ImageList,
    InputBase,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

const BoardMain = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [search, setSearch] = useState(""); // 검색어를 저장하는 state
    const [filteredList, setFilteredList] = useState(list); // 검색된 목록을 저장하는 state
    const [cols, setCols] = useState(2); // 초기 cols 값 설정
    const [sortBy, setSortBy] = useState("latest");
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
            handleSortList(res.data, sortBy); // 정렬 함수 호출
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

    const handleChange = (e) => {
        setSortBy(e.target.value);
    };

    useEffect(() => {
        // 정렬 기능이 변경될 때마다 호출되는 useEffect
        handleSortList(list, sortBy);
    }, [sortBy, list]);

    const handleSortList = (data, sortOption) => {
        let sortedList = [...data];

        switch (sortOption) {
            case "latest":
                sortedList.sort((a, b) => b.boardcode - a.boardcode);
                break;
            case "recommended":
                sortedList.sort((a, b) => b.likecount - a.likecount);
                break;
            case "mostViewed":
                sortedList.sort((a, b) => b.visitcount - a.visitcount);
                break;
            default:
                // 정렬 옵션이 지정되지 않았거나 올바르지 않은 경우 최신순으로 정렬
                sortedList.sort((a, b) => b.boardcode - a.boardcode);
                break;
        }

        setFilteredList(sortedList);
    };

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div style={{ position: "absolute", top: "112px", left: "230px" }}>
                <Paper
                    style={{
                        position: "relative",
                        height: "50px",
                        margin: "5px auto",
                        padding: "5px 0px",
                        border: "1px solid white",
                        borderRadius: "0.2rem",
                        outline: "0",
                    }}
                >
                    <FormControl sx={{ m: 1, minWidth: 110 }} size='small'>
                        <Select
                            sx={{
                                boxShadow: "none",
                                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                    border: 0,
                                },
                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: 0,
                                },
                                top: "-8px",
                            }}
                            labelId='demo-select-sort-label'
                            id='demo-select-sort'
                            value={sortBy}
                            label='Sort By'
                            onChange={handleChange}
                        >
                            {/* <MenuItem value=''>
                            <em>None</em>
                        </MenuItem> */}
                            <MenuItem value='latest'>최신순</MenuItem>
                            <MenuItem value='recommended'>인기순</MenuItem>
                            <MenuItem value='mostViewed'>조회순</MenuItem>
                        </Select>
                    </FormControl>
                </Paper>
            </div>
            <div
                className=''
                style={{
                    width: "100%",
                    marginTop: "20px",
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
                        borderRadius: "0.2rem",
                        outline: "0",
                        alignItems: "center",
                        width: "322px",
                    }}
                >
                    <InputBase
                        type='text'
                        placeholder='제목을 입력해 주세요.'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                    />
                    <div style={{ position: "relative", left: "24px" }}>
                        {search.length > 0 && (
                            <IconButton type='button' sx={{ p: "10px" }} aria-label='clear' onClick={handleReset}>
                                <CloseIcon />
                            </IconButton>
                        )}
                    </div>
                    <div>
                        <IconButton type='button' sx={{ p: "10px" }} aria-label='search' onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </div>
                </Paper>
            </div>
            <div className='btn_add' onClick={() => navi("form")}>
                <Fab
                    sx={{
                        position: "absolute",
                        bottom: (theme) => theme.spacing(2),
                        right: (theme) => theme.spacing(2),
                        backgroundColor: "#5279fd",
                        color: "white",
                    }}
                >
                    <CreateIcon />
                </Fab>
            </div>

            <div className='mt-1' style={{ marginBottom: "10px" }}>
                {filteredList.length === 0 ? (
                    <Typography className='no_result' variant='h6' color='textSecondary'>
                        <h1 style={{ color: "#5279FD" }}>"{search}"</h1>
                        <h1>에 대한 검색 결과가 없습니다.</h1>
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
