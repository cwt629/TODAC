import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const BoardForm = () => {
    const [photo, setPhoto] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [counselor, setCounselor] = useState("");

    const navi = useNavigate();

    const imageUrl = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/"; //ncloud 에서 가져옴

    //파일 업로드 이벤트
    const onUploadEvent = (e) => {
        const uploadFile = new FormData();
        uploadFile.append("upload", e.target.files[0]);

        //.post 안주고 axios.post() 가 아니라 내부에 있기 때문에
        axios({
            method: "post",
            url: "/form/upload",
            data: uploadFile,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
            setPhoto(res.data); //실제 스토리지에 올라간 사진파일명 반환
        });
    };

    //추가 버튼
    const addDataEvent = () => {
        axios.post("/person/add", { photo, title, content, counselor }).then((res) => {
            //추가 성공 후 목록으로 이동
            navi("/");
        });
    };

    return (
        <div className='form-group'>
            <h1 style={{ textAlign: "center", marginTop: "10px" }}>게시글 등록</h1>
            <div style={{ display: "flex" }}>
                <div style={{ width: "100px", marginLeft: "10px" }}>
                    <h5>사진</h5>
                    <input type='file' className='form-control' onChange={onUploadEvent} />
                    <img alt='' src={imageUrl + photo} width={130} />
                    <b>{photo}</b>
                </div>

                <div style={{ width: "230px", marginLeft: "30px" }}>
                    <h5>제목</h5>
                    <input type='text' className='form-control' />
                </div>
            </div>

            <div className='form-group' style={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px" }}>
                <h5>내용</h5>
                <textarea type='text' className='form-control' style={{ height: "250px" }} />
            </div>

            <div className='form-group' style={{ marginTop: "10px" }}>
                <h5>상담사</h5>
                <div style={{ display: "flex" }}>
                    <label>
                        <input type='checkbox' />
                        상담사1
                    </label>
                    &nbsp;&nbsp;
                    <label>
                        <input type='checkbox' />
                        상담사2
                    </label>
                    &nbsp;&nbsp;
                    <label>
                        <input type='checkbox' />
                        상담사3
                    </label>
                    &nbsp;&nbsp;
                    <label>
                        <input type='checkbox' />
                        상담사4
                    </label>
                    &nbsp;&nbsp;
                    <label>
                        <input type='checkbox' />
                        상담사5
                    </label>
                </div>
            </div>
            <Button type='button' style={{ backgroundColor: "blue", color: "white" }}>
                저장
            </Button>
        </div>
    );
};

export default BoardForm;
