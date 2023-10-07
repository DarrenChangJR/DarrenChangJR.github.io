import { Link, Routes, Route } from "react-router-dom";
import Page from "./Page";
import data from './post.json';

function Blog() {

    const posts = [], routes = [];
    for (let i = data.posts.length - 1; i >= 0; i--) {
        posts.push(
            <div className="list-group-item mx-5 text-center font-monospace fs-5" key={i} >
                <span className="mx-2" >{i}.</span>
                <Link to={`${i}`} >
                    {data.posts[i].title}
                </Link>
            </div>);

        routes.push(
            <Route path={`${i}`} key={i} element={
                <Page {...data.posts[i]} counter={i} maxcounter={data.posts.length} />
            } />);
    };

    function Index() {
        return (
            <div className="list-group mx-auto mw-md" >
                {posts}
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

export default Blog;
