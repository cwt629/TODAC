import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../PageHeader";
import noImage from "../../../image/no_image_board_form.png";
import { TextField, Button } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Swal from "sweetalert2";

const BoardDetail = () => {
    const [data, setData] = useState(null);
    const { boardcode } = useParams();
    const navi = useNavigate();
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/";
    const [isLiked, setIsLiked] = useState(false); // 좋아요 여부 상태 추가

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
    }, [boardcode]);

    const handleLike = async () => {
        try {
            await axios.post(`/board/like?boardcode=${boardcode}`);
            setIsLiked(true); // 좋아요를 눌렀으니 상태 업데이트
        } catch (error) {
            console.error("Error liking board:", error);
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
                    <div className='d-flex justify-content-between' style={{ marginTop: "15px" }}>
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
                    {!isLiked && (
                        <div style={{ marginTop: "10px" }}>
                            <Button variant='contained' color='primary' onClick={handleLike}>
                                좋아요
                            </Button>
                        </div>
                    )}
                    <button onClick={() => deletePost(boardcode)} style={{ cursor: "pointer" }}>
                        삭제
                    </button>
                    <button onClick={() => navi(`/user/community/board/updateform/${boardcode}`)}>수정</button>
                    <div className='visitcount'>
                        <VisibilityOutlinedIcon />
                        {data.visitCount}
                    </div>
                    {data.registerDate}
                </div>
            )}
        </div>
    );
};

export default BoardDetail;
