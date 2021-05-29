import React from 'react'
function ContestCard({contestname,contestid}) {
    return (
        <div id={contestid} className="contestcard">
            <div className="contestname">
                <h5>{contestname}</h5>
            </div>
        </div>
    )
}

export default ContestCard
