import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather'
import Card from '../Card/Card'
import DropDown from '../DropDown/DropDown'
import Editable from '../Editable/Editable'
import "./Board.css"

function Board(props) {
    const [showDropDown, setShowDropDown] = useState(false);

    return (
        <div className='board'>
            <div className="board_top">
                <p className="board_top_title">
                    {/* "?." is a channing operator, if the board is not present it will not go any further and return */}
                    {props.board?.title}<span>{props.board?.cards?.length}</span>
                </p>
                <div className="board_top_more" onClick={() => setShowDropDown(true)}>
                    <MoreHorizontal />
                    {showDropDown && <DropDown onClose={() => setShowDropDown(false)}>
                        <div className="board_dropdown">
                            <p onClick={() => props.removeBoard(props.board?.id)}>Delete Board</p>
                        </div>
                    </DropDown>}
                </div>
            </div>
            <div className="board_cards custom-scroll">
                {props.board?.cards?.map((item) => (
                    <Card key={item.id} card={item}
                        removeCard={(cid, bid) => props.removeCard(cid, bid)}
                        boardId={props.board?.id}
                        handleDragEnter={(cid, bid) => props.handleDragEnter(cid, bid)}
                        handleDragEnd={(cid, bid) => props.handleDragEnd(cid, bid)}
                        updateCard={props.updateCard} />
                ))}
                <Editable
                    displayClass="board_cards_add"
                    text="Add Card"
                    placeholder="Enter Card Title"
                    onSubmit={(value) => props.addCard(value, props.board?.id)} />
            </div>
        </div>
    )
}

export default Board
