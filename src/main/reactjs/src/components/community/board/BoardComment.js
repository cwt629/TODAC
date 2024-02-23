import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentRowItem from "./CommentRowItem";
import NavigationIcon from "@mui/icons-material/Navigation";
import { IconButton, InputBase, Paper } from "@mui/material";
import CommentListButtons from "./CommentListButtons";
import commentImg from "../../../image/comment.svg";

const BoardComment = () => {
    const [commentList, setCommentList] = useState([]);
    const { boardcode } = useParams();
    const [content, setContent] = useState(""); // 댓글 저장
    const [listDisplay, setListDisplay] = useState([]); // 화면에 보여줄 리스트 배열
    const usercode = sessionStorage.getItem("usercode");
    const DISPLAY_PER_UNIT = 5;
    const [showLength, setShowLength] = useState(DISPLAY_PER_UNIT); // 화면에 보여줄 요소의 개수

    const boardCommentList = () => {
        axios.get(`/commentlist?boardcode=${boardcode}`).then((res) => {
            setCommentList(res.data);
            setListDisplay(res.data);
            console.log(res.data);
        });
    };

    useEffect(() => {
        axios.get(`/board/detail?boardcode=${boardcode}`).then((res) => {});
        boardCommentList();
    }, [boardcode]);

    //댓글 더보기, 간결히
    const handleExpandDisplay = () => {
        setShowLength(showLength + DISPLAY_PER_UNIT);
    };

    const handleShrinkDisplay = () => {
        setShowLength(DISPLAY_PER_UNIT);
    };

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

    return (
        <div>
            <div className='mt_10'>
                <h5>
                    댓글
                    <img alt='' src={commentImg} />
                    {commentList.length}
                </h5>
            </div>
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
            <div className='mt_25'>
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
        </div>
    );
};

export default BoardComment;
