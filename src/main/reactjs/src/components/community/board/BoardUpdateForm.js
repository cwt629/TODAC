import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import noImage from "../../../image/no_image_board_form.png";
import PageHeader from "../../PageHeader";
import {
    Avatar,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Radio,
    TextField,
} from "@mui/material";

const BoardUpdateForm = () => {
    const [photo, setPhoto] = useState("");
    const { boardcode } = useParams();
    const [selectData, setSelectData] = useState({});
    const [counselorcode, setCounselorCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/";

    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/user/community/board" },
        { name: "상세 페이지", url: "" },
    ];

    const PAGE_TITLE = "상세 페이지";

    // 처음 로딩 시 딱 한번 호출
    useEffect(() => {
        getSelectData();
    }, []);

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

    const handleRadioChange = (value) => {
        changeData({ target: { name: "counselorcode", value: value + 1 } });
    };

    // 수정 버튼
    const updateDataEvent = () => {
        axios
            .post("/board/update", selectData)
            .then((res) => {
                navi(`/user/community/board/detail/${selectData.boardcode}`);
            })
            .catch((error) => {
                console.error("update 중 오류", error);
            });
    };

    return (
        <div>
            {selectData && (
                <div className='form-group mx_30'>
                    <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />

                    <div className='col-4' style={{ marginTop: "15px", width: "100%", height: "100%" }}>
                        <div>
                            {selectData.photo === null ? (
                                <img
                                    alt=''
                                    src={noImage}
                                    style={{
                                        width: "100%",
                                        height: "198px",
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
                                        height: "198px",
                                        border: "2px solid white",
                                        borderRadius: "0.8rem",
                                    }}
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
                    </div>

                    <div className='mt_10'>
                        <TextField
                            size='small'
                            value={selectData.title}
                            className='bg_gray'
                            name='title'
                            style={{ width: "100%" }}
                            onChange={changeData}
                        />
                    </div>

                    <div className='mt-3'>
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
                            <List dense sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                                {Array.from(Array(5).keys()).map((index) => (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton role={undefined} onClick={() => handleRadioChange(index)} dense>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={`Avatar n°${index + 1}`}
                                                    src={`/static/images/avatar/${index + 1}.jpg`}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText primary={`상담사${index + 1}`} />
                                            <Radio
                                                edge='end'
                                                checked={selectData.counselorcode === index + 1}
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </div>
                    <div className='text-center mt-1'>
                        <input type='file' onChange={onUploadEvent} />
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
