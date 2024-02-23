import {
    Avatar,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Radio,
    TextField,
} from "@mui/material";
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
    const onCounselorRadioChange = (value) => {
        // 라디오 버튼이 선택될 때만 상담사 코드 설정
        setCounselorCode(value);
    };

    return (
        <div className='form-group mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div
                className='col-4'
                style={{
                    marginTop: "15px",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "198px",
                    }}
                >
                    {loading ? (
                        <div
                            style={{
                                position: "relative",
                            }}
                        >
                            <CircularProgress
                                size={50}
                                style={{
                                    position: "absolute",
                                    top: "40%",
                                    left: "40%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        </div>
                    ) : (
                        <img
                            alt=''
                            src={photo ? imageStorage + photo : noImage}
                            width='100%'
                            height={198}
                            style={{ borderRadius: "0.8rem" }}
                        />
                    )}
                </div>
            </div>

            <div className='mt_10'>
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

            <div className='mt-3'>
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
                    <List dense sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                        {Array.from(Array(5).keys()).map((index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    role={undefined}
                                    onClick={() => onCounselorRadioChange(`${index + 1}`)}
                                    dense
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar n°${index + 1}`}
                                            src={`/static/images/avatar/${index + 1}.jpg`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary={`상담사${index + 1}`} />
                                    <Radio
                                        edge='end'
                                        checked={counselorcode === `${index + 1}`}
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
