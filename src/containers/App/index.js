import React, { useState } from 'react';
import { defaultBoardData } from '../../utils/constants';
import '../../styles/bootstrap.min.css';
import Home from '../HomePage/index';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


function App() {

    let [board, setBoard] = useState(defaultBoardData);


    return ( 

        <Router>
            <div>
                <Switch>
                    <Route path='/' component={Home}/>
                </Switch>
            </div>

        </Router>
        
    );
}

export default App;