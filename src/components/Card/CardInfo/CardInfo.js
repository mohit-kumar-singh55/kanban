import React, { useState } from 'react';
import { Activity, Calendar, List, Tag, Trash2, Type } from 'react-feather';
import Editable from '../../Editable/Editable';
import Modal from '../../Modal/Modal';
import "./CardInfo.css";

function CardInfo(props) {
    const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959",
    ];

    const [activeColor, setActiveColor] = useState("");


    return (
        <Modal onClose={() => props.onClose()}>
            <div className="cardinfo">
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Type />
                        Title
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable text={"Hello"} placeholder="Enter Title" buttonText="Set Title" />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <List />
                        Description
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable text={"Your description"} placeholder="Enter Description" buttonText="Set Description" />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Calendar />
                        Date
                    </div>
                    <div className="cardinfo_box_body">
                        <input type="date" />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Tag />
                        Labels
                    </div>
                    <div className="cardinfo_box_colors">
                        {
                            colors.map((item, index) => (
                                <li key={index} style={{ backgroundColor: item }}
                                    className={item === activeColor ? "active" : ""}
                                    onClick={() => setActiveColor(item)} />))
                        }
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable text={"Add Labels"} placeholder="Enter Label" buttonText="Set Label" />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Activity />
                        Tasks
                    </div>
                    <div className="cardinfo_box_progress-bar">
                        <div className="cardinfo_box_progress" style={{width:"30%"}} />
                    </div>
                    <div className="cardinfo_box_list">
                        <div className="cardinfo_task">
                            <input type="checkbox" />
                            <p>Task 1</p>
                            <Trash2 />
                        </div>
                    </div>
                    <div className="cardinfo_box_list">
                        <div className="cardinfo_task">
                            <input type="checkbox" />
                            <p>Task 2</p>
                            <Trash2 />
                        </div>
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable text={"Add Task"} placeholder="Enter Task" buttonText="Set Task" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CardInfo
