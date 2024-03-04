import { CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageHeader from "../../PageHeader";
import noImage from "../../../image/no_image_board_form.png";
import "./BoardStyle.css";
import "../../CommonStyle.css";
import changePhoto from "../../../image/change_photo.svg";
import Swal from "sweetalert2";
import { popupAchievement } from "../../../utils/achieveAlert";

const BoardForm = () => {
    const [photo, setPhoto] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [counselorcode, setCounselorCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const userid = sessionStorage.getItem("id");
    const usercode = sessionStorage.getItem("usercode");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/"; //ncloud 에서 가져옴

    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/board" },
        { name: "게시글 등록", url: "/board/form" },
    ];

    const PAGE_TITLE = "게시글 등록";

    const BADGE_NAME_DAYSTAR = "떠오르는 샛별";
    const BADGE_NAME_PRO = "고인물";

    useEffect(() => {
        const id = sessionStorage.getItem("id");
        setIsLoggedIn(id); // id가 있으면 true, 없으면 false
    }, []);

    //파일 업로드 이벤트
    const onUploadEvent = (e) => {
        setLoading(true);

        const uploadFile = new FormData();
        uploadFile.append("upload", e.target.files[0]);

        //.post 안주고 axios.post() 가 아니라 내부에 있기 때문에
        axios({
            method: "post",
            url: "/form/upload",
            data: uploadFile,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                setPhoto(res.data); //실제 스토리지에 올라간 사진파일명 반환
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 추가 버튼
    const addDataEvent = async () => {
        if (title === "" || content === "") {
            Swal.fire({
                title: "입력 없음!",
                text: "필수 입력값을 입력해주세요.",
                icon: "warning",
                confirmButtonColor: "#5279FD",
                confirmButtonText: "확인",
            });
            return;
        }
        try {
            axios.post(`/form/insert/${userid}`, {
                photo: photo,
                title: title,
                content: content,
                counselorcode: counselorcode,
            });
            //1. 떠오르는 샛별 : 게시글 5개 작성 시
            let badgeResponseDaystar = await axios.get("/achieve/daystar?usercode=" + usercode);
            if (badgeResponseDaystar.data) {
                // 업적 달성 처리 시도
                let achieveResult = await axios.post(
                    `/badgeinsert?usercode=${usercode}&achievename=${BADGE_NAME_DAYSTAR}`
                );

                if (achieveResult.data) {
                    await popupAchievement(BADGE_NAME_DAYSTAR);
                }
            }
            //2. 고인물 : 게시글 50개 작성 시
            let badgeResponsePro = await axios.get("/achieve/pro?usercode=" + usercode);
            if (badgeResponsePro.data) {
                // 업적 달성 처리 시도
                let achieveResult = await axios.post(`/badgeinsert?usercode=${usercode}&achievename=${BADGE_NAME_PRO}`);

                if (achieveResult.data) {
                    await popupAchievement(BADGE_NAME_PRO);
                }
            }

            Swal.fire({
                title: "게시글 작성 완료",
                text: "게시글이 성공적으로 작성되었습니다.",
                icon: "success",
                confirmButtonColor: "#5279FD",
            }).then((res) => {
                // 추가 성공 후 목록으로 이동
                navi("/board");
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "뭔가 문제 발생!",
                text: `Error: ${err}`,
                confirmButtonColor: "#5279FD",
                confirmButtonText: "확인",
            });
        }
    };

    return (
        <div className='form-group mx_30'>
            {isLoggedIn ? (
                <>
                    <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
                    <div
                        className='col-4'
                        style={{
                            marginTop: "15px",
                            width: "100%",
                            height: "100%",
                            position: "relative",
                        }}
                    >
                        <div
                            className='profile'
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <div>
                                <input
                                    type='file'
                                    id='fileInput'
                                    style={{ display: "none" }}
                                    onChange={onUploadEvent}
                                />
                            </div>
                            {loading ? (
                                <div>
                                    <CircularProgress
                                        size={50}
                                        style={{
                                            position: "absolute",
                                            top: "250px",
                                            left: "43%",
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    />
                                </div>
                            ) : (
                                <img
                                    alt=''
                                    src={photo ? imageStorage + photo : noImage}
                                    style={{ borderRadius: "0.8rem", width: "100%", height: "100%" }}
                                />
                            )}
                            <img
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    position: "absolute",
                                    top: "289px",
                                    right: "0px",
                                }}
                                className='img-fluid'
                                alt='이미지변경'
                                src={changePhoto}
                                onClick={() => document.getElementById("fileInput").click()}
                            />
                        </div>
                    </div>

                    <div className='mt-3'>
                        <TextField
                            label='제목'
                            size='small'
                            placeholder='제목을 입력해 주세요.'
                            className='bg_gray input_type'
                            style={{ width: "100%" }}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </div>

                    <div className='mt-3'>
                        <TextField
                            multiline
                            id='outlined-multiline-static'
                            label='내용'
                            rows={6}
                            placeholder='내용을 입력하세요.'
                            className='bg_gray input_type'
                            style={{ height: "100%", width: "100%" }}
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        />
                    </div>
                    <div className='d-flex justify-content-center mt-3'>
                        <button className='inquiry_btn2' type='button' onClick={addDataEvent}>
                            작성완료
                        </button>
                    </div>
                </>
            ) : (
                // id가 없으면 로그인 페이지로 이동
                navi("/login")
            )}
        </div>
    );
};

export default BoardForm;
