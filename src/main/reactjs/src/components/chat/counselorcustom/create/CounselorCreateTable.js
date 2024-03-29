import React, { useRef, useState } from 'react';
import defaultImage from "../../../../image/default_profile_photo_blue.jpg";
import ChatContent from '../../chattingroom/ChatContent';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import CounselorPreview from './CounselorPreview';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import cameraIcon from '../../../../image/change_photo.svg';
import { popupAchievement } from '../../../../utils/achieveAlert';

// 달성 가능한 업적 이름
const BADGE_NAME_NEWCOUNSELOR = "신생 상담사";

const CounselorCreateTable = () => {
    // 각 input의 최대 길이
    const INPUT_MAX_LENGTH = {
        'name': 5,
        'personality': 30,
        'briefintro': 10,
        'introduction': 100,
        'greeting': 50
    };

    // 파일의 최대 크기 : 3MB (413 error 방지를 위함)
    const PHOTO_MAX_SIZE = 1024 * 1024 * 3;

    const nav = useNavigate();
    const usercode = sessionStorage.getItem("usercode");

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

    // 자동 포커스 가게 하기 위한 Ref 변수들
    const inputName = useRef(null);
    const inputPersonality = useRef(null);

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
        const file = e.target.files[0];
        if (file) {
            // 이미지가 아닌 경우
            if (!file.type.startsWith('image/')) {
                ReactSwal.fire({
                    icon: 'error',
                    title: '이미지만 업로드 가능!',
                    html: '이미지 파일만 업로드 해주세요.',
                    confirmButtonColor: '#5279FD',
                    confirmButtonText: '확인'
                });
                return;
            }

            // 크기를 넘어간 경우
            if (file.size > PHOTO_MAX_SIZE) {
                ReactSwal.fire({
                    icon: 'error',
                    title: '파일 크기 초과!',
                    html: '파일의 크기는 3MB를 초과할 수 없습니다.',
                    confirmButtonColor: '#5279FD',
                    confirmButtonText: '확인'
                });
                return;
            }

            setPhotoFile(file);
            // 미리보기를 위한 이미지 URL 저장
            setData({ ...data, photo: URL.createObjectURL(file) });
        }
    }

    const ReactSwal = withReactContent(Swal);

    const handlePreview = () => {
        ReactSwal.fire({
            title: '상담사 미리보기',
            html: <CounselorPreview data={data} />,
            confirmButtonColor: '#5279FD',
            confirmButtonText: '닫기'
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (submitFlag) {
            ReactSwal.fire({
                icon: 'warning',
                html: '상담사 제출 처리중입니다.<br/>잠시만 기다려주세요...',
                confirmButtonColor: '#5279FD',
                confirmButtonText: '확인'
            })
            return;
        }

        // 이름 중복체크 진행
        let nameCheck = await axios.get(`/counselor/namecheck?usercode=${sessionStorage.getItem("usercode")}&name=${data.name}`);
        if (nameCheck.data) {
            await ReactSwal.fire({
                icon: 'error',
                title: '이름 중복!',
                html: '해당 상담사명은 사용할 수 없습니다.<br/>다른 상담사명을 입력해주세요.',
                confirmButtonColor: '#5279FD',
                confirmButtonText: '확인'
            })
            return;
        }

        // 성격 입력 확인: '~한', '~인', '~운', '~은', '~는'으로 끝나는지 확인
        const personalityRegex = new RegExp('[한인운은는]$');
        if (!personalityRegex.test(data.personality)) {
            const userConfirm = await ReactSwal.fire({
                icon: 'warning',
                title: '성격 확인!',
                html: '성격 입력이 정확하지 않으면<br/>적용이 제대로 되지 않을 수 있습니다.<br/>계속하시겠습니까?',
                confirmButtonColor: '#5279FD',
                confirmButtonText: '예',
                showCancelButton: true,
                cancelButtonText: '아니오'
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

            // 문제 없이 전송된 경우, 여기서 업적 달성 처리
            let achieveResult = await axios.post(`/badgeinsert?usercode=${usercode}&achievename=${BADGE_NAME_NEWCOUNSELOR}`);
            if (achieveResult.data) {
                await popupAchievement(BADGE_NAME_NEWCOUNSELOR);
            }

            await ReactSwal.fire({
                icon: 'success',
                title: '커스텀 성공!',
                html: '상담사 제작이 완료되었습니다!<br/>목록으로 돌아가 상담을 즐겨보세요! :)',
                confirmButtonColor: '#5279FD',
                confirmButtonText: '확인'
            });

            nav("..");

        } catch (error) {
            ReactSwal.fire({
                icon: 'error',
                title: '에러 발생!',
                html: '다음 에러가 발생하였습니다:' + error,
                confirmButtonColor: '#5279FD',
                confirmButtonText: '확인'
            }).then(() => {
                setSubmitFlag(false);
            })
        }


    }

    return (
        <form className='mt_25' onSubmit={handleFormSubmit}>
            <table className='counselor-create'>
                <tbody>
                    <tr>
                        <td width={100} className='tablehead'>이름 *</td>
                        <td width={400}>
                            <input className='input_text' style={{ width: '120px' }}
                                type="text" name="name" value={data.name}
                                ref={inputName}
                                onChange={handleInputChange} maxLength={INPUT_MAX_LENGTH['name']} required />
                            &nbsp;
                            <span className='custom-inputlen'>({data.name.length} / {INPUT_MAX_LENGTH['name']})</span>
                        </td>
                    </tr>
                    <tr>
                        <td className='tablehead'>사진</td>
                        <td style={{ position: 'relative' }}>
                            <div style={{ position: 'relative' }}>
                                <img alt='' src={data.photo ? data.photo : defaultImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <input type='file' accept='image/*' size={PHOTO_MAX_SIZE} id='counselor-create-image' style={{ display: 'none' }}
                                    onChange={handlePhotoUpload} />
                                <img style={{ width: '30px', height: "30px", position: 'absolute', bottom: "5px", right: '5px' }} className="img-fluid"
                                    alt='이미지변경' src={cameraIcon} onClick={() => document.getElementById("counselor-create-image").click()} />
                            </div>
                            <br />
                            <div className='explain'>
                                * 파일은 이미지만 가능하며, 최대 3MB의 사진만 업로드 가능합니다.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='tablehead'>성격 *</td>
                        <td>
                            <input className='input_text' style={{ width: '160px' }}
                                type="text" name="personality" value={data.personality} maxLength={INPUT_MAX_LENGTH['personality']} required
                                ref={inputPersonality} placeholder='ex) 얼음처럼 냉철한'
                                onChange={handleInputChange} />&nbsp;상담사<br />
                            <span className='custom-inputlen'>({data.personality.length} / {INPUT_MAX_LENGTH['personality']})</span><br /><br />
                            <div className='explain'>
                                * '~한', '~인'과 같은 형태로 작성하셔야 원하는 대로 동작할 거에요!
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='tablehead'>짧은 소개</td>
                        <td>
                            <input className='input_text' style={{ width: '160px' }}
                                type="text" name="briefintro" value={data.briefintro} maxLength={INPUT_MAX_LENGTH['briefintro']}
                                onChange={handleInputChange} /> <span className='custom-inputlen'>({data.briefintro.length} / {INPUT_MAX_LENGTH['briefintro']})</span><br /><br />
                            <div className='explain'>
                                * 짧은 소개는 카드의 앞면에 들어가요!
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='tablehead'>상세 소개</td>
                        <td>
                            <textarea className="input_text" style={{ width: '100%', height: '120px' }}
                                name="introduction" value={data.introduction} maxLength={INPUT_MAX_LENGTH['introduction']}
                                onChange={handleInputChange} ></textarea><br />
                            <span className='custom-inputlen'>({data.introduction.length} / {INPUT_MAX_LENGTH['introduction']})</span><br /><br />
                            <div className='explain'>
                                * 상세 소개는 카드의 뒷면에 들어가요!
                            </div>
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
                        <td className='tablehead'>첫마디 *</td>
                        <td>
                            <textarea className='input_text' style={{ width: '100%' }}
                                name="greeting" value={data.greeting} maxLength={INPUT_MAX_LENGTH['greeting']} required
                                onChange={handleInputChange}></textarea><br />
                            <span className='custom-inputlen'>({data.greeting.length} / {INPUT_MAX_LENGTH['greeting']})</span><br />
                            <div className='explain'>* 상담사의 말투가 첫마디로 결정되기도 한답니다!</div>
                        </td>
                    </tr>
                    <tr>
                        <td className='tablehead'>카드 색깔</td>
                        <td>
                            <input type='color' name='cardcolor' value={data.cardcolor}
                                onChange={handleInputChange} />
                            <div className='explain'>* 카드는 밝은 색상을 권장합니다!</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='custom-btn-outer mt_25'>
                <div className='custom-btn-div'>
                    <button type='button' className='lightblue long' onClick={handlePreview}>미리보기</button>
                    <button type='submit' className='deepblue long'>생성하기!</button>
                </div>
            </div>
        </form>
    );
};

export default CounselorCreateTable;