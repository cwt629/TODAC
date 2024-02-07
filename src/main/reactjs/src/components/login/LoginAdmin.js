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
  const [formData, setFormData] = useState({
    userid: '',
    pass: ''
  });

  const [token, setToken] = useState(sessionStorage.token);
  
  const navigate = useNavigate();

  useEffect(() => {
    let session_token = sessionStorage.token;
    setToken(session_token);
    console.log(token);
  }, []);

  //이전페이지로 이동
  const goBack = () => {
    navigate(-1);
  };

  //로그인 성공
  useEffect(() => {
    if (token) {
        navigate('/admin');
    }
  }, [token]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const buttonLoginEvent = () =>{
      axios.post("/login/auth", formData)
      .then(res=>{
          if (res.data.result === 'noid') {
            Swal.fire({
                icon: 'error',
                title: '<span style="font-size: 20px;">관리자 아이디가 아닙니다</span>',
                confirmButtonColor: '#FF7170',
                background: '#F9EAEB'
            });
          } else if (res.data.result === 'nopass') {
            Swal.fire({
                icon: 'error',
                title: '<span style="font-size: 20px;">비밀번호가 맞지 않습니다</span>',
                confirmButtonColor: '#FF7170',
                background: '#F9EAEB'
            });
          } else{
            sessionStorage.token = res.data.token;
            setToken(res.data.token);
            sessionStorage.id = formData.userid;
          }
      });
  }


  return (
    <div style={{paddingTop : "55px", paddingRight : "55px", paddingLeft : "55px"}}>
      <ArrowBackIcon onClick={goBack} style={{ cursor: 'pointer' }} />
      <br/><br/><br/><br/>
      <h1 style={{color : "#FF494D", textAlign: "center",
                  fontSize : "3em", fontWeight : "1000"
                  }}>TODAC</h1>
      <br/>
      <h5 style={{color : "#536179"}}>관리자 로그인</h5>
      <h6 style={{color : "#5279FD"}}>관리자만 로그인 가능합니다.</h6><br/>
      <input  type='text' 
              className='form-control'
              placeholder="아이디"
              name="userid"
              value={formData.userid} 
              onChange={handleInputChange}/>
      <br/>
      <input  type='password' 
              className='form-control'
              placeholder="비밀번호" 
              name="pass"
              autocomplete="current-password"
              value={formData.pass} 
              onChange={handleInputChange}/>
        <br/>
        <CustomButton   variant="contained"
                        style={{width : "100%"}}
                        onClick={buttonLoginEvent}>로그인</CustomButton>
      </div>
  );
};
  

export default LoginAdmin;