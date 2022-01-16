import React, { useState } from 'react'
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import Chip from '../Chip/Chip';
import DropDown from '../DropDown/DropDown';
import './Card.css';
import CardInfo from './CardInfo/CardInfo';

function Card(props) {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && <CardInfo
                updateCard={props.updateCard}
                boardId={props.boardId}
                card={props.card}
                onClose={() => setShowModal(false)} />}

            <div className='card' draggable
                onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
                onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
            >
                <div className="card_top">
                    <div className="card_top_labels" onClick={() => setShowModal(true)}>
                        {props.card?.labels?.map((item, index) => (
                            <Chip key={index} text={item.text} color={item.color} />
                        ))}
                    </div>
                    <div className="card_top_more" onClick={() => setShowDropDown(true)}>
                        <MoreHorizontal />
                        {showDropDown && <DropDown onClose={() => setShowDropDown(false)}>
                            <div className="card_dropdown">
                                <p onClick={() => props.removeCard(props.card?.id, props.boardId)}>Delete Card</p>
                            </div>
                        </DropDown>}
                    </div>
                </div>
                <div className="card_title" onClick={() => setShowModal(true)}>
                    {props.card?.title}
                </div>
                <div className="card_footer" onClick={() => setShowModal(true)}>
                    {props.card?.date &&
                        <p><Clock />{props.card?.date}</p>
                    }
                    {props.card?.tasks?.length > 0 && (
                        <p><CheckSquare /> {props.card?.tasks?.filter(item => item.completed).length}/{props.card?.tasks?.length} </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Card
