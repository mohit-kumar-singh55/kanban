import React, { useState } from 'react'
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import Chip from '../Chip/Chip';
import DropDown from '../DropDown/DropDown';
import './Card.css';

function Card(props) {
    const [showDropDown, setShowDropDown] = useState(false);

    return (
        <div className='card'>
            <div className="card_top">
                <div className="card_top_labels">
                    {props.card?.labels?.map((item, index) => (
                        <Chip key={index} text={item.text} color={item.color} />
                    ))}
                </div>
                <div className="card_top_more" onClick={() => setShowDropDown(true)}>
                    <MoreHorizontal />
                    {showDropDown && <DropDown onClose={() => setShowDropDown(false)}>
                        <div className="card_dropdown">
                            <p>Delete Card</p>
                        </div>
                    </DropDown>}
                </div>
            </div>
            <div className="card_title">
                {props.card?.title}
            </div>
            <div className="card_footer">
                {props.card?.date &&
                    <p><Clock />{props.card?.date}</p>
                }
                <p><CheckSquare /> 1/4 </p>
            </div>
        </div>
    )
}

export default Card
