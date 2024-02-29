import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getBadgeInfo } from "./badgeInfo";

const ReactSwal = withReactContent(Swal);

export async function popupAchievement(badgename = "") {
    // 해당 뱃지의 정보 불러오기
    const badgeInfo = getBadgeInfo(badgename);

    // 해당 정보가 없는 경우
    if (badgeInfo.image.length === 0) {
        return;
    }

    // 뱃지 Swal창 띄우기
    ReactSwal.fire({
        html: <AchievementContent badgeInfo={badgeInfo} />,
        confirmButtonColor: '#5279FD',
        confirmButtonText: '확인'
    });
}

const AchievementContent = ({ badgeInfo }) => {
    return (
        <div>
            <img alt={badgeInfo.name} src={badgeInfo.image} style={{ width: '100px', height: 'auto' }} />
            <br /><br />
            <div className="fw_600 fs_24">축하드립니다!</div>
            <br />
            <div className="fw_400 fs_20">
                <div className="col_blue2">{badgeInfo.name}</div>업적을 달성하였습니다!<br />
                마이페이지에서 확인해보세요!
            </div>
        </div>
    )
}