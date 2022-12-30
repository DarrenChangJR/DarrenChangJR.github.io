import {ExperienceBox, EducationBox, ProjectBox} from './Box'
import data from './data.json'

function Experience() {
    const boxes = [];
    for (let i = 0; i < data.experience.length; ++i) {
        boxes.push(<ExperienceBox {...data.experience[i]} key={data.experience[i].duration} />);
    };
    return (
        <div className="d-grid mx-5">
            <button className="btn btn-lg" type="button" data-bs-toggle="collapse" data-bs-target="#experience-block">Experience</button>
            <div className="collapse card-body w3-center" id="experience-block">
                {boxes}
            </div>
        </div>
    );
}

function Education() {
    const boxes = [];
    for (let i = 0; i < data.education.length; ++i) {
        boxes.push(<EducationBox {...data.education[i]} key={data.education[i].duration} />);
    };
    return (
        <div className="d-grid mx-5">
            <button className="btn btn-lg" type="button" data-bs-toggle="collapse" data-bs-target="#education-block">Education</button>
            <div className="collapse card-body w3-center" id="education-block">
                {boxes}
            </div>
        </div>
    );
}

function Project() {
    const boxes = [];
    for (let i = 0; i < data.project.length; ++i) {
        boxes.push(<ProjectBox {...data.project[i]} key={data.project[i].name} />);
    };
    return (
        <div className="d-grid mx-5">
            <button className="btn btn-lg" type="button" data-bs-toggle="collapse" data-bs-target="#project-block">Project</button>
            <div className="collapse card-body w3-center" id="project-block">
                {boxes}
            </div>
        </div>
    );
}

export {Experience, Education, Project};
