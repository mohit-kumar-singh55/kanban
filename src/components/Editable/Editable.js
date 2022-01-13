import React, { useState } from 'react';
import { X } from 'react-feather';
import "./Editable.css";

function Editable(props) {
    const [showEdit, setShowEdit] = useState(false);

    return (
        <div className='editable'>
            {showEdit ? (
                <form className={`editable_edit ${props.editClass || ""}`}
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (props.onSubmit) props.onSubmit();
                    }}>
                    <input autoFocus type="text" defaultValue={props.text} placeholder={props.placeholder || "Enter Item"} />
                    <div className="editable_edit_footer">
                        <button type='submit'>{props.buttonText || "Add"}</button>
                        <X onClick={()=>setShowEdit(false)} />
                    </div>
                </form>)
                : (
                    <p onClick={()=>setShowEdit(true)} className={`editable_display ${props.displayClass || ""}`}>{props.text || "Add Card"}</p>
                )
            }
        </div>
    )
}

export default Editable
