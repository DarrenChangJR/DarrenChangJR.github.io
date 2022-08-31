import {useState, useEffect} from 'react';

function LightDark() {
    const [checked, setChecked] = useState(true);
    useEffect(() => {
        if (checked) {
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";
        }
        else {
            document.body.style.backgroundColor = null;
            document.body.style.color = null;
        }
    })
    return (
        <form className="form-check form-switch position-absolute top-50 end-0 translate-middle" id="darkForm">
            <input className="form-check-input" type="checkbox" id="darkModeSwitch" defaultChecked={checked} onChange={() => {setChecked(!checked); console.log(checked);}} />
            <label className="form-check-label" htmlFor="darkModeSwitch">Light/Dark Mode</label>
        </form>
    )
}

export default LightDark;
