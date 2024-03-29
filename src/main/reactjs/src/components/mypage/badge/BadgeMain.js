import React, { useEffect, useState } from "react";
import "./BadgeStyle.css";
import PageHeader from "../../PageHeader";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { getBadgeInfo, getBadgeList } from "../../../utils/badgeInfo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";


const BadgeMain = () => {
    const [badge, setBadge] = useState(getBadgeList());
    const usercode = sessionStorage.getItem("usercode");
    const storedId = sessionStorage.getItem("id");
    const [member, setmember] = useState();
    const [achievelist, setAchievelist] = useState([]);
    const [achievenames, setAchievenames] = useState([]);
    const [equipbadge, setEquipbadge] = useState();
    const ReactSwal = withReactContent(Swal);
    const nav = useNavigate();
    const CURRENT_ROUTES = [
        { name: "내 정보", url: "/user" },
        { name: "내 업적", url: "" },
    ];

    const getachievelist = () => {
        const url = "/getachievelist?usercode=" + usercode;
        axios.post(url).then((res) => {
            // achieveNames 배열에 이름들 담기
            const achieveNames = res.data.map((item) => item.achievename);
            setAchievenames(achieveNames);
            setAchievelist(res.data);
        });
    };

    const getmember = () => {
        const url = "/member/info?userid=" + storedId;
        axios.post(url).then((res) => {
            setmember(res.data);
            setEquipbadge(res.data.mybadge);
        });
    };

    const selectbadge = (item) => {
        ReactSwal.fire({
            showCancelButton: true,
            html: `<img src="${item.image}"/> <br/><b>${item.name}</b><br/>뱃지를 장착하시겠습니까?`,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            confirmButtonColor: '#5279FD'
        }).then((res) => {
            if (res.isConfirmed) {
                axios.post("/equipbadge", { mybadge: item.name, userid: storedId })
                    .then(res => {
                        setEquipbadge(item.name);
                        nav("/user");
                    })
            }
        })
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        borderRadius: "10%",
        border: "2px solid rgba(0, 0, 0, 0.1)", // 테두리 굵기와 색상 설정
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // 흐릿한 효과 설정
    }));

    const getAchievementDate = (badgeName) => {
        const badge = achievelist.find((item) => item.achievename === badgeName);
        return badge ? badge.achieveddate : ""; // badge가 존재하면 획득 날짜를 반환하고, 그렇지 않으면 빈 문자열 반환
    };

    useEffect(() => {
        getachievelist();
        getmember();
    }, []);

    const PAGE_TITLE = "내 업적";
    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div className='mt_10'>
                <Box sx={{ width: "100%" }}>
                    <Grid container spacing={2}>
                        {badge.map((item, index) => (
                            <Grid xs={6} key={index} >
                                <Item 
                                    style={{
                                        boxShadow: equipbadge === item.name ? '0px 0px 10px 5px rgba(82, 121, 253, 0.7)' : '',
                                        transition: 'border-color 0.3s, box-shadow 0.3s'
                                    }}>

                                    {achievenames.includes(item.name) ? (
                                        <>
                                            <img alt='' src={item.image}
                                                onClick={() => selectbadge(item)}
                                            />
                                            <div className='fw_900'>{item.name}</div>
                                            <div className='fs_14'>{item.description}</div>
                                            <hr />
                                            <div className='fw_600'>{getAchievementDate(item.name)}</div>
                                        </>
                                    ) : (
                                        <>
                                            <img style={{ width: "100px", height: "100px" }} alt='' src={item.image} className="gray" />
                                            <div className='fw_900'>{item.name}</div>
                                            <div className='fs_14'>{item.description}</div>
                                            <hr />
                                            <div style={{ color: "red" }}>미획득</div>
                                        </>
                                    )}
                                </Item>
                            </Grid>
                        ))
                        }
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default BadgeMain;
