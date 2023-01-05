import { Link, Routes, Route } from "react-router-dom";
import Page from "./Page";
import data from './poetry.json';

function Literature() {
    const poems = [], routes = [];
    for (let i = data.poems.length - 1; i >= 0; i--) {
        poems.push(
            <div className="list-group-item mx-5 text-center font-monospace fs-5" key={i} >
                <span className="mx-2" >{i}.</span>
                <Link to={`${i}`} >
                    {data.poems[i].title}
                </Link>
            </div>);

        routes.push(
            <Route path={`${i}`} key={i} element={
                <Page {...data.poems[i]} counter={i} maxcounter={data.poems.length} />
            } />);
    }

    function Index() {
        return (
            <div className="list-group" >
                {poems}
            </div>
        );
    }

    routes.push(<Route index key={-1} element={<Index />} ></Route>);

    return (
        <div>
            <Routes>
                {routes}
            </Routes>
        </div>
    );
}

export default Literature;
