import { Link } from "react-router-dom";

function Page(props) {

    function Pagination() {

        const navButtons = [];

        if (props.counter)
            navButtons.push(<Link to={`../${props.counter - 1}`} className="page-link" key="0" >Previous</Link>);
        if (props.counter !== props.maxcounter - 1) {
            navButtons.push(<Link to={`../${props.counter + 1}`} className="page-link" key="1" >Next</Link>);
        }

        return (
            <ul className="pagination position-absolute start-50 translate-middle-x" >
                {navButtons}
            </ul>
        )
    }

    function Image() {
        try {
            const image = require(`/public/images/${props.counter}.jpg`);
            return <img src={image} alt={props.alt} className="img-fluid rounded m-auto mb-3" />
        } catch (error) {
            return;
        }
    }

    return (
        <div className="position-relative pb-5 mb-2">
            <div className="card px-3 mx-1 my-3" >
                <h2 className="text-center font-monospace" >{props.title}</h2>
                <Image />
                <span className="blog-text pb-1" >{props.text}</span>
            </div>
            <Pagination />
        </div>
    );
}

export default Page;
