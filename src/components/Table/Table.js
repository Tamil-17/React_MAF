import * as React from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.js';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Table.css';

class Table extends React.Component {

    render() {

        // function to format data in terms of 'K'
        const kFormatter = (i) => {
            if (i >= 1000 || i <= -1000) {
                const rounded = Math.round(i / 1000);
                return (`${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}K`);
            }
            return (Math.round(i));
        };

        // function to format data in terms of '%'
        const formatPercentage = (percentage) => {
            if (percentage === 'NA' || percentage === '?' || percentage === 'NaN') {
                return (`${parseFloat(0).toFixed(1).toString()}%`);
            }
            return (`${parseFloat(percentage).toFixed(1).toString()}%`);
        };

        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: '15', value: 15
            }, {
                text: 'All', value: this.props.CampaignPerfData.length
            }],
            sizePerPage: 10,  //  which size per page you want to locate as default
            pageStartIndex: 1, //  where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationPosition: 'bottom',  //  default is bottom, top and both is all available
            expandRowBgColor: 'rgb(242, 255, 163)',
            exportCSVText: 'Export to Excel'
        };

        return (
            <div className="row" style={{ marginLeft: '0%', paddingTop: '-5px', marginRight: '0px' }}>
                <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12 ">
                    <div className="mainBox">
                        <div className="coverBox">
                            <h2 className="pageModuleMainTitle">
                                Campaign Performance - Overview
                            </h2>
                            <div
                                className="coverBox"
                                style={{
                                    backgroundColor: '#fafafa',
                                    marginRight: '5px',
                                    marginLeft: '5px',
                                    marginBottom: '5px'
                                }}
                            >
                            <BootstrapTable data={ this.props.CampaignPerfData }
                            striped
                            hover
                            condensed
                            pagination
                            search
                            options={options}
                            exportCSV
                            csvFileName={"Campaign Performance Overview"}
                            tableStyle={{ background: 'white', fontSize: '14px' }}
                            >
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'left'}
                                                   dataField="campaign_id"
                                                   isKey
                                                   dataSort
                                                   row='0' rowSpan='2'
                                                   width='70'> CMP-ID</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   row='0' colSpan='3'
                                                   width='100'
                                                   dataSort headerAlign='center'>Campaign</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   row='1' dataField='campaign_name' width='150'  dataSort>Name</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   row='1' dataField='CAMPAIGN_TYPE' width = '100'  dataSort>Type</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   row='1' dataField='CAMPAIGN_DATE' width='100'  dataSort>Date</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   width = '100'
                                                   row='0' colSpan='2' dataSort csvHeader='INCR SALES' headerAlign='center'>INCR SALES</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   dataFormat={kFormatter}
                                                   row='1' dataField='INCR_SALES' width = '100'  dataSort>ABS</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   dataFormat={formatPercentage}
                                                   row='1' dataField='INCR_SALES_PER' width = '100'  dataSort>%</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'left'}
                                                   width = '100'
                                                   row='0' colSpan='2' dataSort csvHeader='INCR MARGIN' headerAlign='center'>INCR MARGIN</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   dataFormat={kFormatter}
                                                   row='1' dataField='INCR_MARGIN' width = '100'  dataSort>ABS</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   dataFormat={formatPercentage}
                                                   row='1' dataField='INCR_MARGIN_PER' width = '100'  dataSort>%</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'left'}
                                                   row='0' colSpan='2' dataSort csvHeader='INCR TRAFFIC' headerAlign='center' >INCR TRAFFIC</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   dataFormat={kFormatter}
                                                   row='1' dataField='INCR_TRAFFIC' width = '100'  dataSort>ABS</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   dataFormat={formatPercentage}
                                                   row='1' dataField='INCR_TRAFFIC_PER' width = '100'  dataSort>%</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'left'}
                                                   width = '100'
                                                   row='0' colSpan='2' dataSort csvHeader='INCR BASKET' headerAlign='center' >INCR BASKET</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   dataFormat={kFormatter}
                                                   row='1' dataField='INCR_BASKET' width = '100'  dataSort>ABS</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   dataFormat={formatPercentage}
                                                   row='1' dataField='INCR_BASKET_PER' width = '100'  dataSort>%</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   row='0' colSpan='2' dataSort csvHeader='INCR TSE' headerAlign='center' >INCR TSE</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   dataFormat={kFormatter}
                                                   row='1' dataField='INCR_TSE' width = '100'  dataSort>ABS</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   dataFormat={formatPercentage}
                                                   row='1' dataField='INCR_TSE_PER' width = '100'  dataSort>%</TableHeaderColumn>
                                <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }}
                                                   tdStyle={{ whiteSpace: 'normal' }}
                                                   dataAlign={'center'}
                                                   row='0'  dataField = 'INCR_SALES_VS_LY' rowSpan='2' width = '100' dataSort csvHeader='INCR SALES VS LY(%)' headerAlign='center'>INCR SALES VS LY(%)</TableHeaderColumn>
                            </BootstrapTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Table;
