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

    function Commentary() {
        return (
            <>
                <h3 className="font-monospace fw-semibold text-info" >Context</h3>
                <div className="blog-text pb-3" >
                    {props.context.map((line, index) => {
                        if (line === "") return <br key={index} />
                        else return <div key={index} >{line}</div>
                    })}
                </div>
                <h3 className="font-monospace fw-semibold text-info" >Explanation</h3>
                <div className="blog-text pb-1" >
                    {props.explanation.map((line, index) => {
                        if (line === "") return <br key={index} />
                        else return (
                            <>
                                <span key={index} >
                                    <b>Line {index + 1}: </b>
                                    {line}
                                </span>
                                <br/><br/>
                            </>
                        )
                    })}
                </div>
                <h3 className="font-monospace fw-semibold text-info" >Personal Comments</h3>
                <div className="blog-text pb-1" >
                    {props.personal.map((line, index) => {
                        if (line === "") return <br key={index} />
                        else return <div key={index} >{line}</div>
                    })}
                </div>
            </>
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
                <Commentary />
            </div>
            <Pagination />
        </div>
    );
}

export default Page;
