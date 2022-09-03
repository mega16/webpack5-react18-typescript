import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const name: string = 'Hello';

    return (
        <div>
            <h1>{name}</h1>
            <h2>Welcome to your First React App..!</h2>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"))