import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import noImage from "../../../image/no_image_board_form.png";
import PageHeader from "../../PageHeader";
import changePhoto from "../../../image/change_photo.svg";
import { CircularProgress, TextField } from "@mui/material";
import Swal from "sweetalert2";

const BoardUpdateForm = () => {
    const [photo, setPhoto] = useState("");
    const { boardcode } = useParams();
    const [selectData, setSelectData] = useState({});
    const [counselorcode, setCounselorCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/";

    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/board" },
        { name: "상세 페이지", url: `/board/updateform/${boardcode}` },
    ];

    const PAGE_TITLE = "상세 페이지";

    // 처음 로딩 시 딱 한번 호출
    useEffect(() => {
        const usercode = sessionStorage.getItem("usercode");
        // usercode가 있는 경우에만 로그인 상태로 간주
        setIsLoggedIn(usercode);

        // boardcode로 dto 가져오는 코드
        getSelectData();
    }, [boardcode]);

    // 파일 업로드 이벤트
    const onUploadEvent = (e) => {
        setLoading(true);

        const uploadFile = new FormData();
        uploadFile.append("upload", e.target.files[0]);

        axios({
            method: "post",
            url: "/form/upload",
            data: uploadFile,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                setPhoto(res.data); // 실제 스토리지에 올라간 사진파일명 반환
                // changeData 함수 호출하여 selectData 업데이트
                changeData({ target: { name: "photo", value: res.data } });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // boardcode로 dto 가져오는 코드
    const getSelectData = () => {
        axios
            .get(`/board/select?boardcode=${boardcode}`)
            .then((res) => {
                setSelectData(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.error("data select 중 오류", error);
            });
    };

    const changeData = (e) => {
        const { name, value } = e.target;

        // 라디오 버튼인 경우 상담사 코드 업데이트
        if (name === "counselorcode") {
            setCounselorCode(Number(value));
        }
        setSelectData({
            ...selectData,
            [name]: value,
        });
    };

    // 수정 버튼
    const updateDataEvent = () => {
        axios
            .post("/board/update", selectData)
            .then((res) => {
                navi(`/board/detail/${selectData.boardcode}`);
                Swal.fire({
                    title: "수정 성공!",
                    text: "게시글이 성공적으로 수정되었습니다.",
                    icon: "success",
                    confirmButtonColor: "#5279FD",
                    confirmButtonText: "확인",
                });
            })
            .catch((error) => {
                console.error("update 중 오류", error);
            });
    };

    return (
        <div>
            {selectData && (
                <div className='form-group mx_30'>
                    {isLoggedIn ? (
                        <>
                            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />

                            <div
                                className='col-4'
                                style={{ marginTop: "15px", width: "100%", height: "100%", position: "relative" }}
                            >
                                <div id='photo'>
                                    {selectData.photo === null ? (
                                        <img
                                            alt=''
                                            src={noImage}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                border: "2px solid white",
                                                borderRadius: "0.8rem",
                                            }}
                                        />
                                    ) : (
                                        <img
                                            alt=''
                                            src={imageStorage + selectData.photo}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                border: "2px solid white",
                                                borderRadius: "0.8rem",
                                                position: "relative",
                                            }}
                                        />
                                    )}

                                    <img
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            position: "absolute",
                                            bottom: "5px",
                                            right: "5px",
                                        }}
                                        className='img-fluid'
                                        alt='이미지변경'
                                        src={changePhoto}
                                        onClick={() => document.getElementById("fileInput").click()}
                                    />

                                    <div>
                                        <input
                                            type='file'
                                            id='fileInput'
                                            style={{ display: "none" }}
                                            onChange={onUploadEvent}
                                        />
                                    </div>
                                    {loading && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "180px", // 부모 요소의 50% 위치
                                                left: "43%", // 부모 요소의 50% 위치
                                                transform: "translate(-50%, -50%)", // 중앙 정렬을 위한 transform
                                            }}
                                        >
                                            <CircularProgress size={50} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='mt-3'>
                                <TextField
                                    size='small'
                                    value={selectData.title}
                                    className='bg_gray input_type'
                                    name='title'
                                    style={{ width: "100%" }}
                                    onChange={changeData}
                                />
                            </div>

                            <div className='mt-3'>
                                <TextField
                                    className='bg_gray input_type'
                                    multiline
                                    rows={6}
                                    name='content'
                                    value={selectData.content}
                                    style={{ height: "100%", width: "100%" }}
                                    onChange={changeData}
                                />
                            </div>

                            <div className='d-flex justify-content-center mt-3'>
                                <button className='inquiry_btn2' onClick={updateDataEvent}>
                                    수정
                                </button>
                            </div>
                        </>
                    ) : (
                        // id가 없으면 로그인 페이지로 이동
                        navi("/login")
                    )}
                </div>
            )}
        </div>
    );
};

export default BoardUpdateForm;
