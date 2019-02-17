import React from 'react';
import PropTypes from 'prop-types';

function RoundedIconButton(props) {
    const { icon, label, ...rest } = props;

    return (
        <button className="ui-component__rounded-icon-button" {...rest}>
            <span className={`ui-component__icon--${icon}`} />
            { label ? <span className="visually-hidden">{label}</span> : '' }
        </button>
    );
}

RoundedIconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string,
};

export default RoundedIconButton;
