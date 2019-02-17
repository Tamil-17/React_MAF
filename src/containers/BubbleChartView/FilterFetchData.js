import React from 'react';
import {BackendHostUrl} from '../../config';
import BubbleChartView from "./BubbleChartView";
import Spinner from "../../components/Spinner/Spinner";


class FilterFetchData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FilterData: {}
        }
    }

    componentDidMount() {


        //Getting data required for Filter KPI
        fetch(`${BackendHostUrl}:8000/data/filter`)
            .then(response => response.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        FilterData: result
                    });

                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
           const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="text-center"><Spinner/>Loading... Please wait a moment.....!</div>;
        } else {
            return (
                <div>
                    <BubbleChartView FilterData={this.state.FilterData.content}/>
                </div>
            );
        }
    }
}


export default FilterFetchData;