import React, { useState } from 'react'
import Navbar from './Navbar';


function TextArea(props) {
    
    const [text, setText] = useState("Your Are Always Right");


    function handleChange(event) {

        setText(event.target.value);
    }
    function UpperCase() {
        const newText = text.toUpperCase();
        setText(newText);

    }
    function LowerCase() {
        const newText = text.toLocaleLowerCase();
        setText(newText);
    }
    function ClearAll() {
        const newText = "";
        setText(newText);
    }

    return (
        <>
            <Navbar />
            <div className='container' style={{ marginTop: "100px" }}>
                <div className="mb-3">
                    <h1>{props.heading}</h1>
                    <textarea className="form-control" value={text} onChange={handleChange} id="textArea" rows="8"></textarea>
                </div>
                <button className="btn btn-primary mx-1" onClick={UpperCase}>convert to UpperCase</button>
                <button className="btn btn-primary mx-1" onClick={LowerCase}>convert to LowerCase</button>
                <button className="btn btn-primary mx-1" onClick={ClearAll}>Clear all</button>
                <p style={{ color: 'white' }} className='my-2'> {text.split(" ").length} world & {text.length}  charecters</p>
                <p style={{ color: 'white' }} className='my-2'> {0.008 * text.split(" ").length} minit to read this paragraph charecters</p>
            </div>
        </>
    )
}

export default TextArea
