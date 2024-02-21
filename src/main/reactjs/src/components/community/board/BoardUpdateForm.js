import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import noImage from "../../../image/no_image_board_form.png";
import PageHeader from "../../PageHeader";
import { CircularProgress, TextField } from "@mui/material";
import { Button } from "@mui/base";
import styled from "styled-components";

const BoardUpdateForm = () => {
    const [photo, setPhoto] = useState("");
    const { boardcode } = useParams();
    const navi = useNavigate();
    const [selectData, setSelectData] = useState({});
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/";
    const [loading, setLoading] = useState(false);
    const [counselorcode, setCounselorCode] = useState("");

    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/user/community/board" },
        { name: "상세 페이지", url: "" },
    ];

    const PAGE_TITLE = "상세 페이지";

    //수정 기능 추가
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

    //처음 로딩 시 딱 한번 호출
    useEffect(() => {
        getSelectData();
    }, []);

    //수정 버튼
    const updateDataEvent = () => {
        axios
            .post("/board/update", selectData)
            .then((res) => {
                navi(`/user/community/board/detail/${selectData.boardcode}`);
            })
            .catch((error) => {
                console.error("update중 오류", error);
            });
    };

    // // 라디오 버튼 선택 이벤트
    // const onCounselorRadioChange = (counselorcode) => {
    //     // 라디오 버튼이 선택될 때만 상담사 코드 설정
    //     setCounselorCode(Number(counselorcode));
    // };

    //파일 업로드 이벤트
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
                setPhoto(res.data); //실제 스토리지에 올라간 사진파일명 반환
                // changeData 함수 호출하여 selectData 업데이트
                changeData({ target: { name: "photo", value: res.data } });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            {selectData && (
                <div className='form-group mx_30'>
                    <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
                    <div className='d-flex justify-content-around' style={{ marginTop: "15px" }}>
                        <div className='col-4'>
                            <div style={{ width: "110px", height: "90px", position: "relative", overflow: "hidden" }}>
                                {selectData.photo === null ? (
                                    <img alt='' src={noImage} style={{ width: "110px", height: "90px" }} />
                                ) : (
                                    <img
                                        alt=''
                                        src={imageStorage + selectData.photo}
                                        style={{ width: "110px", height: "90px" }}
                                    />
                                )}
                                {loading && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "50%", // 부모 요소의 50% 위치
                                            left: "50%", // 부모 요소의 50% 위치
                                            transform: "translate(-50%, -50%)", // 중앙 정렬을 위한 transform
                                        }}
                                    >
                                        <CircularProgress size={50} />
                                    </div>
                                )}
                            </div>

                            <div className='text-center mt-1'>
                                <input type='file' onChange={onUploadEvent} />
                            </div>
                        </div>

                        <div className='col-7 form_title'>
                            <TextField
                                size='small'
                                value={selectData.title}
                                className='bg_gray'
                                name='title'
                                style={{ width: "100%" }}
                                onChange={changeData}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: "10px", height: "100%" }}>
                        <TextField
                            className='bg_gray'
                            multiline
                            rows={6}
                            name='content'
                            value={selectData.content}
                            style={{ height: "100%", width: "100%" }}
                            onChange={changeData}
                        />
                    </div>
                    <div className='form-group' style={{ marginTop: "10px" }}>
                        <h6>상담사</h6>
                        <div style={{ display: "flex" }}>
                            {Array.from(Array(5).keys()).map((index) => (
                                <label key={index}>
                                    <input
                                        type='radio'
                                        name='counselorcode'
                                        value={`${index + 1}`}
                                        onChange={changeData}
                                        checked={selectData.counselorcode == index + 1}
                                    />
                                    상담사{index + 1}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button onClick={updateDataEvent} style={{ cursor: "pointer" }}>
                        수정
                    </button>
                </div>
            )}
        </div>
    );
};

export default BoardUpdateForm;
