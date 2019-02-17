/*
 *
 * HomePage
 *
 */

import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import config from '../../config.json';
import Helmet from 'react-helmet';
import Invoice from '../../assets/images/invoice.svg';
import Checklist from '../../assets/images/checklist.svg';
import './styles.css';


const { frontendHostUrl, namespace } = config;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
       render() {
        return (
            <div>
                <Helmet
                    title="MAF | Home"
                    meta={[
                        { name: 'description', content: 'Description of HomePage' },
                    ]}
                />
                {/* Jumbotron element that defines the headers */}
                <div style={{fontSize: '18px', textDecoration: 'none' }}>
                    <Jumbotron>
                        <h1>
                            Welcome to Campaign Performance Tool
                        </h1>
                        <p>
                            Please navigate to below modules to start exploring!
                        </p>
                    </Jumbotron>
                    <div className="row moduleRow">
                        <div className="col-xs-4 moduleIconDiv">
                            <div
                                className="moduleCircle" onClick={() => {
                                window.location = `${frontendHostUrl}${namespace}/CampaignOverview`;
                            }}
                            >
                                <img
                                    src={Invoice} alt="invoice"
                                    className="moduleIcon"
                                />
                                <br />
                                <div className="moduleHeading">
                                    Campaign Overview
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-4 moduleIconDiv">
                            <div
                                className="moduleCircle" onClick={() => {
                                window.location = `${frontendHostUrl}${namespace}/CampaignDeepDive`;
                            }}
                            >
                                <img
                                    src={Checklist} alt="checklist"
                                    className="moduleIcon"
                                />
                                <br />
                                <div className="moduleHeading">
                                    Campaign Deepdive
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default HomePage;
