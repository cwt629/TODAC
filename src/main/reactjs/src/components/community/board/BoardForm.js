import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import PageHeader from "../../PageHeader";
import noImage from "../../../image/no_image_board_form.png";
import "./BoardStyle.css";
import "../../CommonStyle.css";

const BoardForm = () => {
    const [photo, setPhoto] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [counselorcode, setCounselorCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/"; //ncloud 에서 가져옴

    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/user/community/board" },
        { name: "게시글 등록", url: "/user/community/board/form" },
    ];

    const PAGE_TITLE = "게시글 등록";

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
        const usercode = sessionStorage.getItem("id");
        if (title === "" || content === "" || counselorcode === "") {
            alert("필수 입력값을 입력하세요");
            return;
        }
        // const
        axios
            .post(`/form/insert/${usercode}`, {
                photo: photo,
                title: title,
                content: content,
                counselorcode: counselorcode,
            })
            .then((res) => {
                // 추가 성공 후 목록으로 이동
                navi("/user/community/board");
            })
            .catch((error) => {
                // 에러 핸들링
                console.error("Error adding data:", error);
            });
    };

    // 라디오 버튼 선택 이벤트
    const onCounselorRadioChange = (counselor) => {
        // 라디오 버튼이 선택될 때만 상담사 코드 설정
        setCounselorCode(counselor);
    };

    return (
        <div className='form-group mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div className='d-flex justify-content-around' style={{ marginTop: "15px" }}>
                <div className='col-4 '>
                    <div
                        style={{
                            width: "110px",
                            height: "90px",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {loading ? (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <CircularProgress size={60} />
                            </div>
                        ) : (
                            <img alt='' src={photo ? imageStorage + photo : noImage} width={110} height={90} />
                        )}
                    </div>
                    <div className='text-center mt-1'>
                        <input type='file' onChange={onUploadEvent} />
                    </div>
                </div>

                <div className='col-7 form_title'>
                    <TextField
                        label='제목'
                        size='small'
                        placeholder='제목을 입력해 주세요.'
                        className='bg_gray'
                        style={{ width: "100%" }}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div style={{ marginTop: "10px", height: "100%" }}>
                <TextField
                    multiline
                    id='outlined-multiline-static'
                    label='내용'
                    rows={6}
                    placeholder='내용을 입력하세요.'
                    className='bg_gray'
                    style={{ height: "100%", width: "100%" }}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
            </div>

            <div className='form-group' style={{ marginTop: "10px" }}>
                <h6>상담사</h6>
                <div style={{ display: "flex" }}>
                    {Array.from(Array(5).keys()).map((index) => (
                        <label key={index}>
                            <input
                                type='radio'
                                name='counselor'
                                onChange={() => onCounselorRadioChange(`${index + 1}`)}
                            />
                            상담사{index + 1}
                        </label>
                    ))}
                </div>
            </div>
            <Button
                type='button'
                style={{ backgroundColor: "blue", color: "white", display: "flex" }}
                onClick={addDataEvent}
            >
                작성완료
            </Button>
        </div>
    );
};

export default BoardForm;
