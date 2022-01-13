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
                            <p>Delete Board</p>
                        </div>
                    </DropDown>}
                </div>
            </div>
            <div className="board_cards custom-scroll">
                {props.board?.cards?.map((item) => (
                    <Card key={item.id} card={item} />
                ))}
                <Editable
                    displayClass="board_cards_add"
                    text="Add Card"
                    placeholder="Enter Card Title" />
            </div>
        </div>
    )
}

export default Board
