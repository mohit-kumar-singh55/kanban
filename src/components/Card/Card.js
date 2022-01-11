import React from 'react'
import { MoreHorizontal } from 'react-feather';
import Chip from '../Chip/Chip';
import './Card.css';

function Card() {
    return (
        <div className='card'>
            <div className="card_top">
                <div className="card_top_labels">
                    <Chip text="Frontend" color="violet" />
                </div>
                <MoreHorizontal />
            </div>
            <div className="card_title">
                
            </div>
        </div>
    )
}

export default Card
