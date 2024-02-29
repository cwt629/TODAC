import React, { useEffect, useState } from 'react';
import defaultImage from "../../../../image/default_profile_photo_blue.jpg";
import ChatContent from '../../chattingroom/ChatContent';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import CounselorPreview from './CounselorPreview';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getBadgeInfo, getBadgeList } from '../../../../utils/badgeInfo';

const CounselorCreateTable = () => {
    // 각 input의 최대 길이
    const INPUT_MAX_LENGTH = {
        'name': 5,
        'personality': 30,
        'briefintro': 10,
        'introduction': 100,
        'greeting': 50
    };

    const nav = useNavigate();

    // 앞서 상담사 선택에서 받는 형태의 데이터 구조를 가지게 한다.
    const [data, setData] = useState({
        name: '',
        briefintro: '',
        introduction: '',
        photo: '',
        personality: '',
        greeting: '안녕하세요!',
        cardcolor: '#EEF0F7'
    });
    // 포토 파일은 다음과 같이 따로 저장해둔다
    const [photoFile, setPhotoFile] = useState(null);

    // 중복 제출 방지를 위한 플래그
    const [submitFlag, setSubmitFlag] = useState(false);

    // 일부 input의 변경 이벤트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    // 사진 변경 이벤트
    const handlePhotoUpload = (e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setPhotoFile(file);
                // 미리보기를 위한 이미지 URL 저장
                setData({ ...data, photo: URL.createObjectURL(file) });
            }
            else {
                ReactSwal.fire({
                    icon: 'error',
                    title: '이미지만 업로드 가능!',
                    html: '이미지 파일만 업로드 해주세요.',
                    confirmButtonColor: '#ff7170',
                    confirmButtonText: '확인'
                })
            }
        }
    }

    const ReactSwal = withReactContent(Swal);

    const handlePreview = () => {
        ReactSwal.fire({
            title: '상담사 미리보기',
            html: <CounselorPreview data={data} />,
            confirmButtonColor: '#ff7170',
            confirmButtonText: '확인'
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (submitFlag) {
            ReactSwal.fire({
                icon: 'warning',
                html: '상담사 제출 처리중입니다.<br/>잠시만 기다려주세요...',
                confirmButtonColor: '#ff7170',
                confirmButtonText: '확인'
            })
            return;
        }

        // 성격 입력 확인: '~인', '~한', '~은', '~는'으로 끝나는지 확인
        const personalityRegex = new RegExp('[한인은는]$');
        if (!personalityRegex.test(data.personality)) {
            const userConfirm = await ReactSwal.fire({
                icon: 'warning',
                title: '성격 확인!',
                html: '성격 입력이 정확하지 않으면<br/>적용이 제대로 되지 않을 수 있습니다.<br/>계속하시겠습니까?',
                confirmButtonColor: '#ff7170',
                confirmButtonText: '확인',
                showCancelButton: true,
                cancelButtonText: '취소'
            });
            if (!userConfirm.isConfirmed) {
                return;
            }
        }

        // 문제 없는 경우
        setSubmitFlag(true);

        const formData = new FormData();
        // DTO로 받을 부분들
        formData.append("usercode", sessionStorage.getItem("usercode"));
        Object.keys(data).forEach(key => {
            // photo는 제외한다
            if (key === 'photo') return;
            formData.append(key, data[key]);
        });

        // 파일은 별도로 전송
        if (photoFile) {
            formData.append("upload", photoFile);
        }

        // 데이터 전송
        try {
            await axios.post('/counselor/custom', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            await ReactSwal.fire({
                icon: 'success',
                title: '커스텀 성공!',
                html: '상담사 제작이 완료되었습니다!<br/>목록으로 돌아가 상담을 즐겨보세요! :)',
                confirmButtonColor: '#ff7170',
                confirmButtonText: '확인'
            });

            nav("..");

        } catch (error) {
            ReactSwal.fire({
                icon: 'error',
                title: '에러 발생!',
                html: '다음 에러가 발생하였습니다:' + error,
                confirmButtonColor: '#ff7170',
                confirmButtonText: '확인'
            }).then(() => {
                setSubmitFlag(false);
            })
        }


    }

    return (
        <form className='mt_25' onSubmit={handleFormSubmit}>
            <table className='table table-bordered counselor-create'>
                <tbody>
                    <tr>
                        <td width={'20%'}>이름 *</td>
                        <td width={'80%'}>
                            <input className="bg_gray bor_gray2 col-9 col_black p-3  br_5"
                                type="text" name="name" value={data.name}
                                onChange={handleInputChange} maxLength={INPUT_MAX_LENGTH['name']} required />
                            ({data.name.length} / {INPUT_MAX_LENGTH['name']})
                        </td>
                    </tr>
                    <tr>
                        <td>사진</td>
                        <td style={{ position: 'relative' }}>
                            <img alt='' src={data.photo ? data.photo : defaultImage} style={{ width: '100%', height: '100%' }} />
                            <input type='file' accept='image/*' id='counselor-create-image' style={{ display: 'none' }}
                                onChange={handlePhotoUpload} />
                            <img style={{ width: '30px', height: "30px", position: 'absolute', bottom: "10px", right: '10px' }} className="img-fluid"
                                alt='이미지변경' src={require('../../../../image/ico_camera.png')} onClick={() => document.getElementById("counselor-create-image").click()} />
                        </td>
                    </tr>
                    <tr>
                        <td>성격 *</td>
                        <td>
                            <input className="bg_gray bor_gray2 col-9 col_black p-3  br_5"
                                type="text" name="personality" value={data.personality} maxLength={INPUT_MAX_LENGTH['personality']} required
                                onChange={handleInputChange} /> 상담사 ({data.personality.length} / {INPUT_MAX_LENGTH['personality']})<br />
                            <div className='explain'>
                                '~한', '~인'과 같은 형태로 작성하셔야 원하는 대로 동작할 거에요!<br />
                                ex{')'} 얼음처럼 냉철한
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>짧은 소개</td>
                        <td>
                            <input className="bg_gray bor_gray2 col-9 col_black p-3  br_5"
                                type="text" name="briefintro" value={data.briefintro} maxLength={INPUT_MAX_LENGTH['briefintro']}
                                onChange={handleInputChange} /> ({data.briefintro.length} / {INPUT_MAX_LENGTH['briefintro']})
                        </td>
                    </tr>
                    <tr>
                        <td>상세 소개</td>
                        <td>
                            <textarea className="bg_gray bor_gray2 col-9 col_black p-3  br_5"
                                name="introduction" value={data.introduction} maxLength={INPUT_MAX_LENGTH['introduction']}
                                onChange={handleInputChange}></textarea> ({data.introduction.length} / {INPUT_MAX_LENGTH['introduction']})
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <ChatContent log={[
                                {
                                    'role': 'assistant', 'content': data.greeting,
                                    'speaker': 1,
                                    'photo': data.photo ? data.photo : defaultImage
                                }
                            ]} isPreview={true} />
                        </td>
                    </tr>
                    <tr>
                        <td>첫마디 *</td>
                        <td>
                            <textarea className="bg_gray bor_gray2 col-9 col_black p-3  br_5"
                                name="greeting" value={data.greeting} maxLength={INPUT_MAX_LENGTH['greeting']} required
                                onChange={handleInputChange}></textarea> ({data.greeting.length} / {INPUT_MAX_LENGTH['greeting']})<br />
                            <div className='explain'>* 상담사의 말투가 첫마디로 결정되기도 한답니다!</div>
                        </td>
                    </tr>
                    <tr>
                        <td>카드 색깔</td>
                        <td>
                            <input type='color' name='cardcolor' value={data.cardcolor}
                                onChange={handleInputChange} /> &emsp;<span className='explain'>밝은 색상을 권장합니다!</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className='custom-btn-outer'>
                                <div className='custom-btn-div'>
                                    <button type='button' className='lightblue long' onClick={handlePreview}>미리보기</button>
                                    <button type='submit' className='deepblue long'>생성하기!</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
};

export default CounselorCreateTable;