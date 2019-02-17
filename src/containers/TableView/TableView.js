import React from 'react';
import Filter from "../../components/SelectFilter/Filters";
import {BackendHostUrl} from "../../config";
import Table from "../../components/Table/Table"

class TableView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectedDept:"All",
            selectedSection:"All",
            selectedFamily:"All",
            CampaignPerformanceData : null,
            FilterData:null
        };

        this.fetchCampaignPerformance=this.fetchCampaignPerformance.bind(this);
    }


    componentDidMount() {

        //Getting data required for Filter KPI
        fetch(`${BackendHostUrl}:8000/data/filter`)
            .then(response => response.json())
            .then(
                result => {
                    this.setState({
                        FilterData: result.content
                    });

                },
                error => {
                   console.log(error.message)
                }
            );
        
        let CampaignPerformanceData = this.fetchCampaignPerformance("All","All","All");
        this.setState({
            CampaignPerformanceData: CampaignPerformanceData
        })
    }

    //Fetching data for Campaign Performance table
    fetchCampaignPerformance(dept, section, family){

        let APIParams="";
        APIParams = `${APIParams}&department_category=${dept}&section_category=${section}&family_category=${family}`;

        //Getting data required for Filter KPI
        fetch(`${BackendHostUrl}:8000/data/table?${APIParams}`)

            .then(response => response.json())
            .then(
                result => {
                    this.setState({
                        CampaignPerformanceData: result
                    });

                },
                error => {
                    console.log(error.message);
                }
            );

    }

    render() {

        //Getting data for individual Filters
        let DepartmentData =[];
        let FamilyData =[];
        let SectionData =[];

        {
            if(this.state.FilterData) {
                (() => {
                        let obj = Object.keys(this.state.FilterData.dept).sort();
                        for (let i = 0; i < obj.length; i++) { // eslint-disable-line
                            DepartmentData.push({value: obj[i], label: obj[i]});
                        }

                        //Filtering section and family for selected Department
                        if (this.state.selectedDept === "All" || this.state.selectedDept === null) {
                            SectionData.push({value: "All", label: "All"});
                            FamilyData.push({value: "All", label: "All"});
                        } else {
                            //Getting the selected Department Data
                            let filteredDept = obj
                                .filter(key => key.includes(this.state.selectedDept))
                                .reduce((obj, key) => {
                                    obj[key] = this.state.FilterData.dept[key];
                                    return obj;
                                }, {});


                            //Getting the section of the selected Department
                            SectionData = [];
                            let filteredDeptSection = filteredDept[this.state.selectedDept].section;
                            SectionData.push({value: "All", label: "All"});
                            for (let i = 0; i < filteredDeptSection.length; i++) { // eslint-disable-line
                                SectionData.push({value: filteredDeptSection[i], label: filteredDeptSection[i]});
                            }

                            //Getting the family of the selected Department
                            FamilyData = [];
                            if (this.state.selectedSection === "All" || this.state.selectedSection === null) {
                                FamilyData.push({value: "All", label: "All"});
                            } else {
                                let filteredDeptFamily = this.state.FilterData.sect[this.state.selectedSection].family;
                                FamilyData.push({value: "All", label: "All"});
                                for (let i = 0; i < filteredDeptFamily.length; i++) { // eslint-disable-line
                                    FamilyData.push({value: filteredDeptFamily[i], label: filteredDeptFamily[i]});
                                }
                            }
                        }
                    }
                )()
            }
        }


        //OnChange of Department Data
        const onChangeDepartmentData =(selectedItem) => {

            let CampaignPerformanceData;
            if(selectedItem !== null){
                CampaignPerformanceData = this.fetchCampaignPerformance(selectedItem.value,"All","All")
                this.setState({selectedDept:  selectedItem.value,
                                     selectedSection: "All",
                                     selectedFamily :"All",
                                     CampaignPerformanceData:CampaignPerformanceData
                });
            }
            else{
                CampaignPerformanceData = this.fetchCampaignPerformance("All","All","All")
                this.setState({selectedDept:"All",
                                    selectedSection: "All",
                                    selectedFamily :"All",
                                    CampaignPerformanceData:CampaignPerformanceData
                });
            }
        };

        //OnChange of Section Data
        const onChangeSectionData =(selectedItem) => {
            let CampaignPerformanceData;
            if(selectedItem !== null){
                CampaignPerformanceData = this.fetchCampaignPerformance(this.state.selectedDept,selectedItem.value,"All")

                this.setState({selectedSection: selectedItem.value,
                                      selectedFamily: "All",
                                      CampaignPerformanceData:CampaignPerformanceData
                 });
            }
            else{
                CampaignPerformanceData = this.fetchCampaignPerformance(this.state.selectedDept,"All","All")
                this.setState({selectedSection:"All",
                                     selectedFamily: "All",
                                     CampaignPerformanceData:CampaignPerformanceData
                });
            }
        };


        //OnChange of Filter Data
        const onChangeFamilyData =(selectedItem) => {
            let CampaignPerformanceData;

            if(selectedItem !== null){
                CampaignPerformanceData = this.fetchCampaignPerformance(this.state.selectedDept,this.state.selectedFamily,selectedItem.value)
                this.setState({selectedFamily: selectedItem.value,
                                     CampaignPerformanceData:CampaignPerformanceData});
            }
            else{
                CampaignPerformanceData = this.fetchCampaignPerformance(this.state.selectedDept,this.state.selectedFamily,"All")
                this.setState({selectedFamily:"All",
                                    CampaignPerformanceData:CampaignPerformanceData});
            }
        };


        return (

            <div style={{ marginLeft: '5%', marginRight: '3%', marginBottom: '3%',  marginTop: '3%' }}>
            <div className="row">
            <div className="col-xs-3 col-md-3 col-lg-3">
                <h6> Select Department</h6>
                <Filter filterData={DepartmentData} selectedValue={this.state.selectedDept} onChangeHandle={onChangeDepartmentData}/>
                <br/>
                <h6> Select Section</h6>
                <Filter filterData={SectionData}  selectedValue={this.state.selectedSection} onChangeHandle={onChangeSectionData}/>
                <br/>
                <h6> Select Family</h6>
                <Filter filterData={FamilyData} selectedValue={this.state.selectedFamily} onChangeHandle={onChangeFamilyData}/>
            </div>
            </div>
            <br />
            <div className="col-xs-12 col-md-12 col-lg-12">
            {(()=>{
                if (this.state.CampaignPerformanceData) {
                    return (
                        <Table CampaignPerfData={this.state.CampaignPerformanceData.content.campaigns} />
                    );
                } else {

                    return <div>Loading...</div>
                }
            })()
            }
            </div>
            </div>
        )
    }
}

export default TableView;