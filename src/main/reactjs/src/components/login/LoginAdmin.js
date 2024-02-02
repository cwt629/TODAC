import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#FF7170', // 원하는 색상으로 변경
    borderColor: '#FF7170', // 원하는 색상으로 변경
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#FF5E62', // hover 시 원하는 색상으로 변경
      borderColor: '#FF5E62', // hover 시 원하는 색상으로 변경
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#FF494D', // 클릭 시 원하는 색상으로 변경
      borderColor: '#FF494D', // 클릭 시 원하는 색상으로 변경
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(255,113,112,.5)',
    },
  });

const LoginAdmin = () => {
    const [adminid,setAdminid] = useState('');
    const [pass,setPass] = useState('');
    const [token,setToken] = useState(null);

    useEffect(()=>{
        let session_token = sessionStorage.token;
        console.log(session_token);
        setToken(session_token);
    },[]);//처음 시작시 한번만 호출

    const buttonLoginEvent = () =>{
        axios.post("/login/auth",{adminid,pass})
        .then(res=>{
            if(res.data.result==='noid'){
                Swal.fire("회원아이디가 아닙니다");
            }else if(res.data.result==='nopass'){
                Swal.fire("비밀번호가 맞지 않습니다");
            }else{
                //토큰을 얻어서 세션 스토리지에 token이라는 이름으로 저장
                sessionStorage.token=res.data.token;
                setToken(res.data.token);
            }
        })
    }

    const navigate = useNavigate();

    const goBack = () => {
        // 이전 페이지로 이동
        navigate(-1);
    };

    return (
        <div style={{padding : "100px"}}>
            <ArrowBackIcon onClick={goBack} style={{ cursor: 'pointer' }} />
            <br/><br/>
            TODAC<br/><br/>
            관리자 로그인<br/>
            관리자만 로그인 가능합니다.<br/><br/>
            <input type='text' className='form-control'
             placeholder="아이디"
             value={adminid} onChange={(e)=>setAdminid(e.target.value)}/>
            <br/>
            <input type='password' className='form-control'
             placeholder="비밀번호"
             value={pass} onChange={(e)=>setPass(e.target.value)}/>
             <br/>
             <CustomButton variant="contained"
              style={{width : "100%"}}>로그인</CustomButton>
        </div>
    );
};

export default LoginAdmin;