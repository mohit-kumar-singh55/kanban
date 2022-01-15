import React, { useState } from 'react';
import { Activity, Calendar, List, Tag, Trash2, Type } from 'react-feather';
import Editable from '../../Editable/Editable';
import Modal from '../../Modal/Modal';
import Chip from "../../Chip/Chip";
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

    const { title, labels, desc, date, tasks } = props.card;

    const calculatePercent = () => {
        if (tasks?.length === 0) return 0;
        const completed = tasks?.filter(item => item.completed)?.length;

        return (completed / tasks?.length) * 100 + "";
    }

    return (
        <Modal onClose={() => props.onClose()}>
            <div className="cardinfo">
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Type />
                        Title
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable text={title} placeholder="Enter Title" buttonText="Set Title" />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <List />
                        Description
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable text={desc} placeholder="Enter Description" buttonText="Set Description" />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Calendar />
                        Date
                    </div>
                    <div className="cardinfo_box_body">
                        <input type="date" defaultValue={date ? new Date(date).toISOString().substring(0, 10) : ""} />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Tag />
                        Labels
                    </div>
                    <div className="cardinfo_box_labels">
                        {
                            labels?.map((item, index) => (
                                <Chip close
                                    onClose={() => console.log("Closing...")}
                                    key={item.text + index}
                                    color={item.color}
                                    text={item.text} />))
                        }
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
                        <div className="cardinfo_box_progress" style={{ width: calculatePercent() + "%" }} />
                    </div>
                    <div className="cardinfo_box_list">
                        {
                            tasks?.map((item) => (
                                <div key={item.id} className="cardinfo_task">
                                    <input type="checkbox" defaultValue={item.completed} />
                                    <p>{item.text}</p>
                                    <Trash2 />
                                </div>))
                        }

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
