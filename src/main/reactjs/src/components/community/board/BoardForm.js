import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageHeader from "../../PageHeader";
import exampleImg from "../../../image/todac_logo_temp.png";

const BoardForm = () => {
    const [photo, setPhoto] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [counselorcode, setCounselorCode] = useState("");
    const [loading, setLoading] = useState(false);
    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/user/community/board" },
        { name: "게시글 등록", url: "/user/community/board/form" },
    ];

    const PAGE_TITLE = "게시글 등록";

    const navi = useNavigate();

    const imageUrl = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/"; //ncloud 에서 가져옴

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

    // 라디오 버튼 선택 이벤트
    const onCounselorRadioChange = (counselor) => {
        // 라디오 버튼이 선택될 때만 상담사 코드 설정
        setCounselorCode(counselor);
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

    return (
        <div className='form-group mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div className='d-flex justify-content-between'>
                <div className='col-3'>
                    <h5>사진</h5>
                    <div
                        style={{
                            // backgroundImage: `url(${exampleImg})`,
                            // backgroundPosition: "center",
                            // backgroundSize: "cover",
                            // backgroundRepeat: "no-repeat",
                            width: "110px",
                            height: "90px",
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={30} /> // 로딩 스피너 표시
                        ) : (
                            <img alt='' src={photo ? imageUrl + photo : exampleImg} width={110} height={90} />
                        )}
                    </div>
                    <input type='file' className='form-control' onChange={onUploadEvent} />
                </div>

                <div className='col-8'>
                    <TextField
                        label='제목'
                        placeholder='제목을 입력해 주세요.'
                        className='form-control'
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className='form-group' style={{ marginTop: "10px" }}>
                <h5>내용</h5>
                <textarea
                    type='text'
                    className='form-control'
                    style={{ height: "250px" }}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
            </div>

            <div className='form-group' style={{ marginTop: "10px" }}>
                <h5>상담사</h5>
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
            <Button type='button' style={{ backgroundColor: "blue", color: "white" }} onClick={addDataEvent}>
                저장
            </Button>
        </div>
    );
};

export default BoardForm;
