import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentRowItem from "./CommentRowItem";
import NavigationIcon from "@mui/icons-material/Navigation";
import { IconButton, InputBase, Paper } from "@mui/material";
import ChatListButtons from "../../chat/chattinglog/list/ChatListButtons";
import CommentListButtons from "./CommentListButtons";

const BoardComment = () => {
    const [commentList, setCommentList] = useState([]);
    const { boardcode } = useParams();
    const DISPLAY_PER_UNIT = 5;
    const [content, setContent] = useState(""); // Comment content state
    const [showLength, setShowLength] = useState(DISPLAY_PER_UNIT); // 화면에 보여줄 요소의 개수
    const [listDisplay, setListDisplay] = useState([]); // 화면에 보여줄 리스트 배열
    const usercode = sessionStorage.getItem("usercode");

    useEffect(() => {
        axios.get(`/board/detail?boardcode=${boardcode}`).then((res) => {});
    }, [boardcode]);

    const boardCommentList = () => {
        axios.get(`/commentlist?boardcode=${boardcode}`).then((res) => {
            setCommentList(res.data);
            setListDisplay(res.data);
            console.log(res.data);
            console.log("길이" + res.data.length);
        });
    };

    useEffect(() => {
        boardCommentList();
    }, []);

    // 추가 버튼
    const addComment = async () => {
        axios
            .post(`/addcomment?content=${content}&usercode=${usercode}&boardcode=${boardcode}`)
            .then((res) => {
                // setCommentList(res.data);
                setContent("");
                boardCommentList();
            })
            .catch((error) => {
                // 에러 핸들링
                console.error("Error adding data:", error);
            });
    };

    const handleExpandDisplay = () => {
        setShowLength(showLength + DISPLAY_PER_UNIT);
    };

    const handleShrinkDisplay = () => {
        setShowLength(DISPLAY_PER_UNIT);
    };

    return (
        <div>
            {commentList.length <= DISPLAY_PER_UNIT ? (
                // 댓글이 DISPLAY_PER_UNIT보다 작을 때
                <div>댓글 {commentList.length}개</div>
            ) : (
                // 댓글이 DISPLAY_PER_UNIT보다 클 때
                <div>
                    총 {commentList.length}개 댓글 중 최신 {DISPLAY_PER_UNIT}개
                </div>
            )}
            {commentList &&
                commentList.slice(0, showLength).map((data, idx) => {
                    return <CommentRowItem key={idx} data={data} idx={idx} />;
                })}
            <CommentListButtons
                needToShow={listDisplay.length > DISPLAY_PER_UNIT}
                displayedAll={listDisplay.length <= showLength}
                handleExpandDisplay={handleExpandDisplay}
                handleShrinkDisplay={handleShrinkDisplay}
            />
            <Paper
                component='form'
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <InputBase
                    type='text'
                    className='form-control'
                    placeholder='댓글을 입력해 주세요.'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                />
                <IconButton
                    type='button'
                    sx={{ p: "10px" }}
                    aria-label='input-text'
                    style={{ transform: "rotate(90deg)" }}
                    onClick={addComment}
                >
                    <NavigationIcon />
                </IconButton>
            </Paper>
        </div>
    );
};

export default BoardComment;
