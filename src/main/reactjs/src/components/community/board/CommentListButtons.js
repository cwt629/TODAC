import React from "react";

const CommentListButtons = ({ needToShow, displayedAll, handleExpandDisplay, handleShrinkDisplay }) => {
    return (
        <div className='mt_25' style={{ textAlign: "center", display: needToShow ? "block" : "none" }}>
            <button
                className='bor_blue1 bg_blue'
                style={{ color: "#536179" }}
                onClick={displayedAll ? handleShrinkDisplay : handleExpandDisplay}
            >
                {displayedAll ? "간략히 보기" : "댓글 더보기"}
            </button>
        </div>
    );
};

export default CommentListButtons;
