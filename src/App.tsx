import React from "react";
import CommentList from "./ui/components/CommentList";
import PageList from "./ui/components/PageList";
import Form from "./ui/components/Form";

const App = () => {
    return (
        <div>
            <CommentList/>
            <PageList/>
            <Form/>
        </div>
    );
}

export default App;
