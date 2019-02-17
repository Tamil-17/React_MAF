import React from 'react';
import PropTypes from 'prop-types';
import './FormHeader.css';


function FormHeader(props) {
    return (
        <div className="ui-component__form-header">
            <h1 className="ui-component__form-header--title">{props.title}</h1>
            <p className="ui-component__form-header--description">
                {props.description}
            </p>
        </div>
    );
}

FormHeader.propTypes = {
    title: PropTypes.string,
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]).isRequired,
};

export default FormHeader;
