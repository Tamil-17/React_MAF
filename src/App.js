import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import FilterFetchData from "./containers/BubbleChartView/FilterFetchData";
import TableView from "./containers/TableView/TableView";
import HomePage from "./containers/HomePageView/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
               <div>
                   <Header/>
                   <Switch>
                       <Route exact path="/" component={LoginPage} />
                       <Route exact path="/Home" component={HomePage} />
                       <Route exact path="/CampaignOverview" component={TableView} />
                       <Route exact path="/CampaignDeepDive" component={FilterFetchData} />
                       <Route exact path="*" component={NotFoundPage} />
                   </Switch>
               </div>
       );
    }

}

export default App;
