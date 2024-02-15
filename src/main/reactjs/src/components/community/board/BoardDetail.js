import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../PageHeader";
import noImage from "../../../image/no_image_board_form.png";
import { TextField } from "@mui/material";

const BoardDetail = () => {
    const [data, setData] = useState("");
    const { boardcode } = useParams();
    const navi = useNavigate();
    const imageStorage = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/";
    const CURRENT_ROUTES = [
        { name: "커뮤니티", url: "/user/community" },
        { name: "게시판", url: "/user/community/board" },
        { name: "상세 페이지", url: "" },
    ];

    const PAGE_TITLE = "상세 페이지";

    useEffect(() => {
        axios.get(`/board/detail?boardcode=${boardcode}`).then((res) => {
            setData(res.data);
            console.log(res.data);
        });
    }, [boardcode]);

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
                        <div className='col-7'>
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
                </div>
            )}
        </div>
    );
};

export default BoardDetail;
