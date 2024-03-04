import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentRowItem from "./CommentRowItem";
import { IconButton, InputBase, Paper } from "@mui/material";
import CommentListButtons from "./CommentListButtons";
import commentImg from "../../../image/comment.svg";
import Swal from "sweetalert2";
import "./BoardStyle.css";

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
        if (content === "") {
            Swal.fire({
                title: "입력 없음!",
                text: "메세지를 입력해주세요.",
                icon: "warning",
                confirmButtonColor: "#FF7170",
                confirmButtonText: "확인",
            });
            return;
        }
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

    const deleteComment = (commentCode) => {
        Swal.fire({
            title: "댓글 삭제",
            text: "해당 댓글을 삭제하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#5279FD",
            confirmButtonText: "예",
            cancelButtonText: "아니오",
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `/comment/delete?commentcode=${commentCode}`;
                axios
                    .delete(url)
                    .then(() => {
                        // 삭제 후 다시 댓글 목록을 불러옴
                        boardCommentList();
                        Swal.fire({
                            title: "삭제 완료",
                            text: "댓글이 성공적으로 삭제되었습니다.",
                            icon: "success",
                            confirmButtonColor: "#FF7170",
                        });
                    })
                    .catch((error) => {
                        console.error("삭제 중 오류 발생:", error);
                    });
            }
        });
    };

    const handlePaperClick = () => {
        // 비로그인 사용자인 경우 로그인 안내 메시지 출력
        if (!usercode) {
            showLoginPrompt("로그인 하시겠습니까?");
        }
    };

    const showLoginPrompt = (message) => {
        Swal.fire({
            title: "로그인이 필요합니다",
            text: message,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#5279FD",
            confirmButtonText: "로그인",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                // 로그인 페이지로 이동
                window.location.href = "/login";
            }
        });
    };

    return (
        <div>
            <div className='mt-5'>
                <h5>
                    댓글
                    <img alt='' src={commentImg} />
                    {commentList.length}
                </h5>
            </div>
            {commentList &&
                commentList.slice(0, showLength).map((data, idx) => {
                    return <CommentRowItem key={idx} data={data} idx={idx} deleteComment={deleteComment} />;
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
                    className='d-flex justify-content-between'
                    sx={{
                        p: "2px 4px",
                        alignItems: "center",
                        width: "100%",
                        cursor: "pointer", // 마우스 커서를 손가락 모양으로 변경
                    }}
                    onClick={handlePaperClick} // 클릭 이벤트 핸들러 추가
                >
                    <InputBase
                        type='text'
                        className=''
                        placeholder='댓글을 입력해 주세요.'
                        style={{ width: "100%" }}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                    />
                    <IconButton type='button' sx={{ p: "10px" }} aria-label='input-text' onClick={addComment}>
                        <h6>입력</h6>
                    </IconButton>
                </Paper>
            </div>
        </div>
    );
};

export default BoardComment;
