function ExperienceBox(props) {
    return (
        <div className="container w3-padding-16 w3-card w3-margin-top w3-margin-bottom">
            <strong className='title'>{props.title}</strong>
            <small className='at-sign'>@</small>
            <span className='location'>{props.location}</span>
            <hr/>
            <p className='duration mid-grey'>{props.duration}</p>
            <p className='description'>{props.description}</p>
            <ul></ul>
        </div>
    )
}

function EducationBox(props) {
    return (
        <div className="container w3-padding-16 w3-card w3-margin-top w3-margin-bottom">
            <strong className="program">{props.program}</strong>
            <small className="at-sign">@</small>
            <span className="location">{props.location}</span>
            <hr/>
            <p className="duration mid-grey">{props.duration}</p>
            <p className="description">{props.description}</p>
        </div>
    )
}

function ProjectBox(props) {
    const stack = [];
    for (let i = 0; i < props.stack.length; ++i) {
        stack.push(<li key={props.stack[i]}>{props.stack[i]}</li>)
    };
    return (
        <div className="container w3-padding-16 w3-card w3-margin-top w3-margin-bottom">
            <a href={props.link} target="_blank" rel="noopener noreferrer">{props.name}<img className="open-new-tab" alt="Opens in new tab"/></a>
            <p className="description mid-grey">{props.description}</p>
            <ul>
                {stack}
            </ul>
        </div>
    )
}

export {ExperienceBox, EducationBox, ProjectBox};
