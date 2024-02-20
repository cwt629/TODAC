import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentRowItem from "./CommentRowItem";

const BoardComment = () => {
    const [commentList, setCommentList] = useState([]);
    const [data, setData] = useState("");
    const { boardcode } = useParams();
    const [content, setContent] = useState(""); // Comment content state
    const usercode = sessionStorage.getItem("usercode");

    useEffect(() => {
        axios.get(`/board/detail?boardcode=${boardcode}`).then((res) => {
            console.log(res.data);
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
            <input
                type='text'
                placeholder='댓글 내용 입력'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={addComment}>댓글 추가</button>
        </div>
    );
};

export default BoardComment;
