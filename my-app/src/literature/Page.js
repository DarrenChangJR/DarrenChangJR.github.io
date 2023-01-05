import { Link } from "react-router-dom"

function Page(props) {

    function Pagination() {
        const navButtons = [];

        if (props.counter)
            navButtons.push(<Link to={`../${props.counter - 1}`} className="page-link btn m-4" key="0" >Previous</Link>);
        if (props.counter !== props.maxcounter - 1) {
            navButtons.push(<Link to={`../${props.counter + 1}`} className="page-link btn m-4" key="1" >Next</Link>);
        }

        return (
            <ul className="pagination position-absolute start-50 translate-middle-x" >
                {navButtons}
            </ul>
        )
    }

    function Poem(lines) {
        return (
            <div className="poem-text pb-1 mb-5 fst-italic" >
                {lines.poem.map((line, index) => {
                    if (line === "") return <br key={index} />
                    else return <div key={index} >{line}</div>
                })}
            </div>
        )
    }

    return (
        <div className="pb-5 mb-2">
            <div className="position-relative card px-3 mx-1 my-3" >
                <h2 className="text-center font-monospace" >{props.title}</h2>
                <Poem poem={props.lines} />
                <div className="position-absolute end-0 bottom-0 m-2" >{props.author}</div>
            </div>
            <div className="position-relative card px-3 mx-1 my-3" >
                <span className="blog-text pb-1" >{props.commentary}</span>
            </div>
            <Pagination />
        </div>
    );
}

export default Page;
