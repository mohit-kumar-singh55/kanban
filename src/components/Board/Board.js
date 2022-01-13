import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather'
import Card from '../Card/Card'
import DropDown from '../DropDown/DropDown'
import Editable from '../Editable/Editable'
import "./Board.css"

function Board() {
    const [showDropDown, setShowDropDown] = useState(false);

    return (
        <div className='board'>
            <div className="board_top">
                <p className="board_top_title">
                    To Do<span>2</span>
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
                <Card />
                <Editable
                    displayClass="board_cards_add"
                    text="Add Card"
                    placeholder="Enter Card Title" />
            </div>
        </div>
    )
}

export default Board
