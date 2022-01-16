import React, { useState, useEffect } from 'react';
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

    const [values, setValues] = useState({ ...props.card });

    const calculatePercent = () => {
        if (values.tasks?.length === 0) return 0;
        const completed = values.tasks?.filter(item => item.completed)?.length;

        return (completed / values.tasks?.length) * 100 + "";
    }

    const addLabel = (value, color) => {
        const index = values.labels?.findIndex(item => item.text === value);
        if (index > -1) return;

        const label = {
            text: value,
            color
        }
        setValues({ ...values, labels: [...values.labels, label] });
        setActiveColor("");
    }

    const removeLabel = (text) => {
        const index = values.labels?.findIndex(item => item.text === text);
        if (index < 0) return;

        setValues({ ...values, labels: values.labels?.filter((item) => item.text !== text) });
    }

    const addTask = (value) => {
        const task = {
            id: Date.now() + Math.random() * 2,
            text: value,
            completed: false
        }

        setValues({ ...values, tasks: [...values.tasks, task] });
    }

    const removeTask = (id) => {
        const index = values.tasks?.findIndex(item => item.id === id);
        if (index < 0) return;

        setValues({ ...values, tasks: values.tasks?.filter(item => item.id !== id) });
    }

    const updateTask = (id, completed) => {
        const index = values.tasks?.findIndex(item => item.id === id);
        if (index < 0) return;

        const tempTasks = [...values.tasks];
        tempTasks[index].completed = completed;
        setValues({ ...values, tasks: tempTasks });
    }

    useEffect(() => {
        props.updateCard(props.card.id, props.boardId, values);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values])

    return (
        <Modal onClose={() => props.onClose()}>
            <div className="cardinfo">
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Type />
                        Title
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable onSubmit={(value) => setValues({ ...values, title: value })} text={values.title} placeholder="Enter Title" buttonText="Set Title" />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <List />
                        Description
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable onSubmit={(value) => setValues({ ...values, desc: value })} text={values.desc || "Add Description"} placeholder="Enter Description" buttonText="Set Description" />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Calendar />
                        Date
                    </div>
                    <div className="cardinfo_box_body">
                        <input type="date" onChange={(e) => setValues({ ...values, date: e.target.value })} defaultValue={values.date ? new Date(values.date).toISOString().substring(0, 10) : ""} />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Tag />
                        Labels
                    </div>
                    <div className="cardinfo_box_labels">
                        {
                            values.labels?.map((item, index) => (
                                <Chip close
                                    key={item.text + index}
                                    color={item.color}
                                    text={item.text}
                                    onClose={() => removeLabel(item.text)} />))
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
                        <Editable onSubmit={(value) => addLabel(value, activeColor)} text={"Add Labels"} placeholder="Enter Label" buttonText="Set Label" />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Activity />
                        Tasks
                    </div>
                    <div className="cardinfo_box_progress-bar">
                        <div className={`cardinfo_box_progress ${calculatePercent() < "50" ? "cardinfo_box_progress-less" : ""} ${calculatePercent() === "100" ? "cardinfo_box_progress-active" : ""}`}
                            style={{ width: calculatePercent() + "%" }} />
                    </div>
                    <div className="cardinfo_box_list">
                        {
                            values.tasks?.map((item) => (
                                <div key={item.id} className="cardinfo_task">
                                    <input type="checkbox" defaultValue={item.completed}
                                        onChange={(e) => updateTask(item.id, e.target.checked)} />
                                    <p>{item.text}</p>
                                    <Trash2 onClick={() => removeTask(item.id)} />
                                </div>))
                        }

                    </div>
                    <div className="cardinfo_box_body">
                        <Editable onSubmit={(value) => addTask(value)} text={"Add Task"} placeholder="Enter Task" buttonText="Set Task" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CardInfo
