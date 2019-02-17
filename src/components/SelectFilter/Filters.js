import React from 'react';
import PropTypes from "prop-types";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Filter extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <Select
                menuContainerStyle={{ zIndex: 10 }}
                value = {this.props.selectedValue}
                onChange={this.props.onChangeHandle}
                options ={this.props.filterData}
                placeholder = {this.props.placeholder ? this.props.placeholder : ''}

            />
        );
    }

}

Filter.propTypes = {
    onChangeHandle: PropTypes.func,
    selectedValue: PropTypes.string,
    filterData: PropTypes.array
};

export default Filter;