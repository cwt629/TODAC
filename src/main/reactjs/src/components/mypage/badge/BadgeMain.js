import React, {useEffect, useState} from 'react';
import "./BadgeStyle.css"
import PageHeader from "../../PageHeader";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {styled} from '@mui/material/styles';
import axios from "axios";


const BadgeMain = () => {
    const usercode = sessionStorage.getItem("usercode");
    const [board5, setBoard5] = useState(false);
    const [achievelist, setAchievelist] = useState([]);
    const [achievenames, setAchievenames] = useState([]);
    const CURRENT_ROUTES = [
        {name: '내 정보', url: '/user'},
        {name: '내 업적', url: ''}
    ];

    const getachievelist = () => {
        const url = "/getachievelist?usercode=" + usercode;
        axios.post(url)
            .then(res => {

                // achieveNames 배열에 이름들 담기
                const achieveNames = res.data.map(item => item.achievename);
                setAchievenames(achieveNames);
                setAchievelist(res.data);
            })
    }
 
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '10%',
        border: '2px solid rgba(0, 0, 0, 0.1)', // 테두리 굵기와 색상 설정
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // 흐릿한 효과 설정
    }));

    const getAchievementDate = (badgeName) => {
        const badge = achievelist.find(item => item.achievename === badgeName);
        return badge ? badge.achieveddate : ''; // badge가 존재하면 획득 날짜를 반환하고, 그렇지 않으면 빈 문자열 반환
    }


    useEffect(() => {
        getachievelist();
    }, []);

    const PAGE_TITLE = '내 업적';
    return (
        <div className="mx_30">
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE}/>
            <div className="mt_10">
                <Box sx={{width: '100%'}}>
                    <Grid container spacing={2} >
                        <Grid xs={6} >
                            <Item>
                                {
                                    achievenames.includes('뉴비') ? (
                                        <>
                                            <img alt='' src={require("../../../image/badge/newbie.png")} />
                                            <div className="fw_900">뉴비</div>
                                            <div className="fs_14">토닥 첫 로그인</div>
                                            <hr/>
                                            <div>{getAchievementDate('뉴비')}</div>
                                        </>
                                    ) : (
                                        <>
                                            <img alt='' src={require("../../../image/badge/newbie.png")} className="gray" />
                                            <div className="fw_900">뉴비</div>
                                            <div className="fs_14">토닥 첫 로그인</div>
                                            <hr/>
                                            <div style={{color: "red"}}>미획득</div>
                                        </>
                                    )
                                }

                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>
                                {
                                    achievenames.includes('떠오르는 샛별') ? (
                                        <>
                                            <img alt='' src={require("../../../image/badge/stars.png")} />
                                            <div className="fw_900">떠오르는 샛별</div>
                                            <div className="fs_14">게시글 5개 작성</div>
                                            <hr/>
                                            <div>{getAchievementDate('떠오르는 샛별')}</div>
                                        </>
                                    ) : (
                                        <>
                                            <img alt='' src={require("../../../image/badge/stars.png")} className="gray" />
                                            <div className="fw_900">떠오르는 샛별</div>
                                            <div className="fs_14">게시글 5개 작성</div>
                                            <hr/>
                                            <div style={{color: "red"}}>미획득</div>
                                        </>
                                    )
                                }

                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>
                                {
                                    achievenames.includes('고인물') ? (
                                        <>
                                            <img alt='' src={require("../../../image/badge/boardking.png")} />
                                            <div className="fw_900">고인물</div>
                                            <div className="fs_14">게시글 100개 작성</div>
                                            <hr/>
                                            <div>{getAchievementDate('고인물')}</div>
                                        </>
                                    ) : (
                                        <>
                                            <img alt='' src={require("../../../image/badge/boardking.png")} className="gray" />
                                            <div className="fw_900">고인물</div>
                                            <div className="fs_14">게시글 100개 작성</div>
                                            <hr/>
                                            <div style={{color: "red"}}>미획득</div>
                                        </>
                                    )
                                }
                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>
                                {
                                    achievenames.includes('기부자') ? (
                                        <>
                                            <img alt='' src={require("../../../image/badge/donation.png")} />
                                            <div className="fw_900">기부자</div>
                                            <div className="fs_14">후원하기</div>
                                            <hr/>
                                            <div>{getAchievementDate('기부자')}</div>
                                        </>
                                    ) : (
                                        <>
                                            <img alt='' src={require("../../../image/badge/donation.png")} className="gray" />
                                            <div className="fw_900">기부자</div>
                                            <div className="fs_14">후원하기</div>
                                            <hr/>
                                            <div style={{color: "red"}}>미획득</div>
                                        </>
                                    )
                                }
                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>
                                {
                                    achievenames.includes('프로웃음러') ? (
                                        <>
                                            <img alt='' src={require("../../../image/badge/smileking.png")} />
                                            <div className="fw_900">떠오르는 샛별</div>
                                            <div className="fs_14">오늘의 미소 800점</div>
                                            <hr/>
                                            <div>{getAchievementDate('프로웃음러')}</div>
                                        </>
                                    ) : (
                                        <>
                                            <img alt='' src={require("../../../image/badge/smileking.png")} className="gray" />
                                            <div className="fw_900">프로웃음러</div>
                                            <div className="fs_14">오늘의 미소 800점</div>
                                            <hr/>
                                            <div style={{color: "red"}}>미획득</div>
                                        </>
                                    )
                                }
                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>
                                {
                                    achievenames.includes('후원왕') ? (
                                        <>
                                            <img alt='' src={require("../../../image/badge/contributor.png")} />
                                            <div className="fw_900">후원왕</div>
                                            <div className="fs_14">후원의 전당 입성</div>
                                            <hr/>
                                            <div>{getAchievementDate('고인물')}</div>
                                        </>
                                    ) : (
                                        <>
                                            <img alt='' src={require("../../../image/badge/contributor.png")} className="gray" />
                                            <div className="fw_900">후원왕</div>
                                            <div className="fs_14">후원의 전당 입성</div>
                                            <hr/>
                                            <div style={{color: "red"}}>미획득</div>
                                        </>
                                    )
                                }
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default BadgeMain;