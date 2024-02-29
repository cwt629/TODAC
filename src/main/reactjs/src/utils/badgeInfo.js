const badgeMap = new Map([
    ["뉴비", { image: '클라우드 이미지 URL 뉴비', description: '토닥 첫 로그인' }],
    ["업적명1", { image: '클라우드 이미지 URL 1', description: '업적 설명 1' }],
    ["업적명2", { image: '클라우드 이미지 URL 2', description: '업적 설명 2' }],
    ["업적명3", { image: '클라우드 이미지 URL 3', description: '업적 설명 3' }],
    ["업적명4", { image: '클라우드 이미지 URL 4', description: '업적 설명 4' }],
    ["업적명5", { image: '클라우드 이미지 URL 5', description: '업적 설명 5' }],
    ["업적명6", { image: '클라우드 이미지 URL 6', description: '업적 설명 6' }]
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