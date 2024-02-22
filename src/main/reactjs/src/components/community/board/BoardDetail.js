import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../PageHeader";
import noImage from "../../../image/no_image_board_form.png";
import { TextField } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Swal from "sweetalert2";
import BoardComment from "./BoardComment";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeIcon from "@mui/icons-material/Grade";

const BoardDetail = () => {
    const [data, setData] = useState(null);
    const { boardcode } = useParams();
    const [likeCount, setLikeCount] = useState(0); // 좋아요 수 상태 추가
    const [isLiked, setIsLiked] = useState(false); // 좋아요 여부 상태 추가
    const userRole = sessionStorage.getItem("id");
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/";
    const navi = useNavigate();

    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/user/community/board" },
        { name: "상세 페이지", url: "" },
    ];

    const PAGE_TITLE = "상세 페이지";

    useEffect(() => {
        axios.get(`/board/detail?boardcode=${boardcode}`).then((res) => {
            setData(res.data);
            setIsLiked(res.data.liked); // 서버에서 받아온 데이터에서 좋아요 여부를 설정
            console.log(res.data);
        });
        // 좋아요 수 가져오기
        axios.get(`/post/like/count?boardcode=${boardcode}`).then((res) => {
            setLikeCount(res.data);
        });
        // 좋아요 상태 확인
        axios
            .get(`/post/checkLikeStatus?boardcode=${boardcode}&usercode=${sessionStorage.getItem("usercode")}`)
            .then((res) => {
                setIsLiked(res.data);
            });
    }, [boardcode]);

    //Like
    const handleLike = async () => {
        try {
            await axios.post(`/post/like?boardcode=${boardcode}&usercode=${sessionStorage.getItem("usercode")}`);
            setIsLiked(true);
            setLikeCount((prev) => prev + 1); // 좋아요 수 증가
        } catch (error) {
            console.error("Error liking board:", error);
        }
    };
    //unLike
    const handleUnlike = async () => {
        try {
            await axios.post(`/post/like?boardcode=${boardcode}&usercode=${sessionStorage.getItem("usercode")}`);
            setIsLiked(false);
            setLikeCount((prev) => prev - 1); // 좋아요 수 감소
        } catch (error) {
            console.error("Error unliking board:", error);
        }
    };

    // 게시글 삭제
    const deletePost = (boardcode) => {
        Swal.fire({
            title: "게시글 삭제",
            text: "해당 게시글을 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF7170",
            confirmButtonText: "예",
            cancelButtonText: "아니오",
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `/post/delete?boardcode=${boardcode}`;
                axios
                    .delete(url)
                    .then(() => {
                        // 추가 성공 후 목록으로 이동
                        navi("/user/community/board");
                        Swal.fire({
                            title: "삭제 완료",
                            text: "게시글이 성공적으로 삭제되었습니다.",
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

    return (
        <div>
            {data && (
                <div className='form-group mx_30'>
                    <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
                    <div className='d-flex justify-content-around' style={{ marginTop: "15px" }}>
                        <div className='col-4'>
                            {data.photo == null ? (
                                <img alt='' src={noImage} style={{ width: "110px", height: "90px" }} />
                            ) : (
                                <img
                                    alt=''
                                    src={imageStorage + data.photo}
                                    style={{ width: "110px", height: "90px" }}
                                />
                            )}
                        </div>
                        <div className='boardLikes'>
                            {likeCount} {/* 좋아요 수 표시 */}
                        </div>
                        <div className='col-7 form_title'>
                            <TextField
                                className='bg_gray'
                                id='outlined-read-only-input'
                                defaultValue={data.title}
                                size='small'
                                style={{ width: "100%" }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: "10px", height: "100%" }}>
                        <TextField
                            className='bg_gray'
                            multiline
                            id='outlined-multiline-static'
                            rows={6}
                            defaultValue={data.content}
                            style={{ height: "100%", width: "100%" }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <TextField
                            className='bg_blue'
                            id='outlined-read-only-input'
                            defaultValue={`${data.counselorCode}번 상담사`}
                            size='small'
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div className='boardLikes'>
                        <span
                            style={{ marginRight: "16px", cursor: "pointer" }}
                            onClick={isLiked ? handleUnlike : handleLike}
                        >
                            {isLiked ? <GradeIcon /> : <GradeOutlinedIcon />}
                            <span className='comment-action' style={{ marginLeft: "8px" }}>
                                {likeCount}
                            </span>
                        </span>
                    </div>
                    {userRole === "todac" ? (
                        // 관리자인 경우에는 삭제 기능만 표시
                        <div>
                            <button onClick={() => deletePost(boardcode)} style={{ cursor: "pointer" }}>
                                삭제
                            </button>
                        </div>
                    ) : // 일반 사용자인 경우 글 작성자인지 확인 후 삭제 및 수정 버튼 표시
                    data.userCode == sessionStorage.getItem("usercode") ? (
                        <div>
                            <button onClick={() => deletePost(boardcode)} style={{ cursor: "pointer" }}>
                                삭제
                            </button>
                            <button onClick={() => navi(`/user/community/board/updateform/${boardcode}`)}>수정</button>
                        </div>
                    ) : null}
                    <div className='visitcount'>
                        <VisibilityOutlinedIcon />
                        {data.visitCount}
                    </div>
                    {data.registerDate}
                    <BoardComment />
                </div>
            )}
        </div>
    );
};

export default BoardDetail;
