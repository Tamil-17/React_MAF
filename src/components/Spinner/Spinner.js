import React from 'react';
import './Spinner.css';

function Spinner() {
    return (
        <div className="spinner-container">
            <div className="spinner-overlay" />
            <div className="spinner" />
        </div>
    );
}

export default Spinner;
