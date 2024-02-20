import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentRowItem from "./CommentRowItem";
import NavigationIcon from "@mui/icons-material/Navigation";
import { IconButton, InputBase, Paper } from "@mui/material";

const BoardComment = () => {
    const [commentList, setCommentList] = useState([]);
    const { boardcode } = useParams();
    const [content, setContent] = useState(""); // Comment content state
    const usercode = sessionStorage.getItem("usercode");

    useEffect(() => {
        axios.get(`/board/detail?boardcode=${boardcode}`).then((res) => {
            console.log("무슨값이?" + res.data);
        });
    }, [boardcode]);

    const boardCommentList = () => {
        axios.get("/commentlist").then((res) => {
            setCommentList(res.data);
        });
    };

    useEffect(() => {
        boardCommentList();
    }, []);

    // 추가 버튼
    const addComment = async () => {
        console.log("유저코드는?" + usercode);
        console.log(content);
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
            {commentList &&
                commentList.map((data, idx) => {
                    return <CommentRowItem key={idx} data={data} idx={idx} />;
                })}
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
