const badgeMap = new Map([
    ["기부자", { image: 'https://kr.object.ncloudstorage.com/guest-hch/TODAC/badge/donation.png', description: '기부하기' }],
    ["떠오르는 샛별", { image: 'https://kr.object.ncloudstorage.com/guest-hch/TODAC/badge/stars.png', description: '게시글 5개 작성' }],
    ["고인물", { image: 'https://kr.object.ncloudstorage.com/guest-hch/TODAC/badge/rotten%20water.png', description: '게시글 50개 작성' }],
    ["프로웃음러", { image: 'https://kr.object.ncloudstorage.com/guest-hch/TODAC/badge/smileking.png', description: '오늘의 미소 800점' }],
    ["후원왕", { image: 'https://kr.object.ncloudstorage.com/guest-hch/TODAC/badge/contributor.png', description: '후원의 전당 입성' }],
    ["모두가 나의 파트너", { image: 'https://kr.object.ncloudstorage.com/guest-hch/TODAC/badge/we_are_paertner.png', description: '공식 상담사 모두와 상담' }],
    ["다섯 번의 토닥", { image: 'https://kr.object.ncloudstorage.com/guest-hch/TODAC/badge/five_todac.png', description: '상담 5번 완료' }]
]);

/**
 * 뱃지 이름을 통해 해당 뱃지의 이미지와 설명을 받아오는 함수
 * @param {String} badgename 뱃지 이름
 * @returns name, image, description 정보
 */
export function getBadgeInfo(badgename = "") {
    // 위에 있는 업적 이름에 해당하는 정보 제공
    return getBadgeInfoFormat(badgename);
}


/**
 * 모든 뱃지의 이름, 이미지, 설명을 받아오는 함수
 * @returns 각 뱃지의 name, image, description 정보를 담은 배열
 */
export function getBadgeList() {
    let list = [];
    badgeMap.forEach((val, key) => {
        list.push(getBadgeInfoFormat(key))
    })

    return list;
}

function getBadgeInfoFormat(badgename = "") {
    if (badgeMap.has(badgename))
        return {
            ...badgeMap.get(badgename),
            name: badgename
        };

    return {
        name: badgename,
        image: "",
        description: "정보 없음"
    };
}