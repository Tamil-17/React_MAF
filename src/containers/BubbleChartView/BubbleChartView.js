import React from 'react';
import PropTypes from "prop-types";
import Filter from "../../components/SelectFilter/Filters";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BackendHostUrl} from "../../config";
import BubbleChart from "../../components/BubbleChart/BubbleChart";
import Spinner from "../../components/Spinner/Spinner";


class BubbleChartView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectedDept:"",
            selectedSection:"",
            selectedFamily:"",
            selectedCampaign:"",
            selectedKPIType:"absolute",
            selectedKPIx:"incremental_sales",
            selectedKPIy:"incremental_basket",
            KpiType :[
                {value: "absolute", label: "Absolute"},
                {value: "percentage", label: "Percentage"}
            ],
            KPI :[
            {value: "incremental_sales" ,label: "INCR SALES"},
            {value: "incremental_margin" ,label: "INCR MARGIN"},
            {value: "incremental_traffic",label: "INCR TRAFFIC"},
            {value: "incremental_basket",label: "INCR BASKET"},
            {value: "incremental_tse",label: "INCR TSE"},
             ],
            Department_Data :[],
            Family_Data :[],
            Section_Data :[],
            Campaign_Data :[],
            KPIx:[],
            KPIy:[],
            BubbleChartData: null,
        };

        this.fetchBubbleChartData = this.fetchBubbleChartData.bind(this);
    }


    componentDidMount() {
        if(this.props.FilterData.dept) {
            {
                //Getting data for individual Filters
                let DepartmentData =[];
                let FamilyData =[];
                let SectionData =[];
                let CampaignData =[];
                let KPIx=[];
                let KPIy=[];
                let defaultSelectedKPIx="incremental_sales";
                let defaultSelectedKPIy="incremental_basket";


                (() => {
                        let obj = Object.keys(this.props.FilterData.dept).filter(i => i !== "All").sort();
                        for (let i = 0; i < obj.length; i++) { // eslint-disable-line
                            DepartmentData.push({value: obj[i], label   : obj[i]});
                        }


                        //Filtering section and family for the Topmost Department
                        if (this.state.selectedDept === null || this.state.selectedDept === '' || this.state.selectedDept === 'All') {

                            let filteredDept = this.props.FilterData.dept[obj[0]];

                            //Getting the section of the selected Department
                            SectionData = [];
                            let filteredDeptSection = filteredDept.section.sort();
                            for (let i = 0; i < filteredDeptSection.length; i++) { // eslint-disable-line
                                SectionData.push({value: filteredDeptSection[i], label: filteredDeptSection[i]});
                            }

                            //Getting the family of the selected Section
                            FamilyData = [];
                            let filteredDeptFamily = this.props.FilterData.sect[filteredDeptSection[0]].family.sort();
                            for (let i = 0; i < filteredDeptFamily.length; i++) { // eslint-disable-line
                                FamilyData.push({value: filteredDeptFamily[i], label: filteredDeptFamily[i]});
                            }

                            //Getting the campaign of the selected Family
                            CampaignData = [];
                            let filteredDeptCampaign = this.props.FilterData.family[filteredDeptFamily[0]].campaign.sort();
                            for (let i = 0; i < filteredDeptCampaign.length; i++) { // eslint-disable-line
                                CampaignData.push({value: filteredDeptCampaign[i], label: filteredDeptCampaign[i]});
                            }


                            //KPI Axis data filter
                            KPIx = this.state.KPI.filter(i => i.value !== (this.state.selectedKPIy ? this.state.selectedKPIy : defaultSelectedKPIy));
                            KPIy = this.state.KPI.filter(i => i.value !== (this.state.selectedKPIx ? this.state.selectedKPIx : defaultSelectedKPIx));

                            //Updating Bubble Chart
                           this.fetchBubbleChartData(DepartmentData[0].value, SectionData[0].value,
                                    FamilyData[0].value, CampaignData[0].value, "absolute", "incremental_sales", "incremental_basket");


                            this.setState({
                                    selectedSection: SectionData[0].value,
                                    selectedDept: DepartmentData[0].value,
                                    selectedCampaign: CampaignData[0].value,
                                    selectedFamily: FamilyData[0].value,
                                    selectedKPIx: "incremental_sales",
                                    selectedKPIy: "incremental_basket",
                                    selectedKPIType: "absolute",
                                    Department_Data: DepartmentData,
                                    Family_Data: FamilyData,
                                    Section_Data: SectionData,
                                    Campaign_Data: CampaignData,
                                    KPIx: KPIx,
                                    KPIy: KPIy
                                }
                            )
                        }
                    }
                )()
            }
        }

    }

    fetchBubbleChartData (dept, section, family, campaign, KpiType, Kpifirst, KpiSec){

        let APIParams="";
        APIParams = `${APIParams}&department_category=${dept}&section_category=${section}&family_category=${family}&campaign_name=${campaign}&kpi_type=${KpiType}&xaxis=${Kpifirst}&yaxis=${KpiSec}`;

        //Getting data required for Filter KPI
        fetch(`${BackendHostUrl}:8000/data/chart?${APIParams}`)
            .then(response => response.json())
            .then(
                result =>  {
                    this.setState({
                        BubbleChartData :result})
                },
                error => {
                    this.setState({
                        error})
                }
            );
    }


    render() {

        //OnChange of Department Data
        const onChangeDepartmentData =(selectedItem) => {

            if(selectedItem !== null){

                let FamilyData =[];
                let SectionData =[];
                let CampaignData =[];
                let BubbleChartData;

                //Getting the selected Department Data
                let obj = Object.keys(this.props.FilterData.dept).filter(i => i !== "All").sort();
                let filteredDept = obj
                    .filter(key => key.includes(selectedItem.value))
                    .reduce((obj, key) => {
                        obj[key] = this.props.FilterData.dept[key];
                        return obj;
                    }, {});

                //Getting the section of the selected Department
                let filteredDeptSection = filteredDept[selectedItem.value].section;
                for (let i = 0; i < filteredDeptSection.length; i++) { // eslint-disable-line
                    SectionData.push({value: filteredDeptSection[i], label: filteredDeptSection[i]});
                }


                //Getting the family of the selected Department
                let filteredDeptFamily = this.props.FilterData.sect[SectionData[0].value].family;
                for (let i = 0; i < filteredDeptFamily.length; i++) { // eslint-disable-line
                    FamilyData.push({value: filteredDeptFamily[i], label: filteredDeptFamily[i]});
                }


                //Getting the campaign of the selected Department
                let filteredDeptCampaign = this.props.FilterData.family[FamilyData[0].value].campaign;
                for (let i = 0; i < filteredDeptCampaign.length; i++) { // eslint-disable-line
                    CampaignData.push({value: filteredDeptCampaign[i], label: filteredDeptCampaign[i]});
                }

                //Updating Bubble Chart

                    BubbleChartData = this.fetchBubbleChartData(selectedItem.value, SectionData[0].value,
                        FamilyData[0].value, CampaignData[0].value, this.state.selectedKPIType, this.state.selectedKPIx, this.state.selectedKPIy);


                this.setState({selectedDept:  selectedItem.value,
                                     selectedSection : SectionData[0].value,
                                     selectedCampaign : CampaignData[0].value,
                                     selectedFamily: FamilyData[0].value,
                                     Section_Data: SectionData,
                                     Family_Data: FamilyData,
                                     Campaign_Data: CampaignData,
                                     BubbleChartData:BubbleChartData
                });
            }
            else{
                //Getting data for individual Filters
                let DepartmentData =[];
                let FamilyData;
                let SectionData;
                let CampaignData;
                let BubbleChartData;

                    let obj = Object.keys(this.props.FilterData.dept).filter(i => i !== "All").sort();
                    for (let i = 0; i < obj.length; i++) { // eslint-disable-line
                        DepartmentData.push({value: obj[i], label   : obj[i]});
                    }

                    //Filtering section and family for the Topmost Department
                    let filteredDept = this.props.FilterData.dept[obj[0]];

                    //Getting the section of the selected Department
                    SectionData = [];
                    let filteredDeptSection = filteredDept.section;
                    for (let i = 0; i < filteredDeptSection.length; i++) { // eslint-disable-line
                        SectionData.push({value: filteredDeptSection[i], label: filteredDeptSection[i]});
                    }

                    //Getting the family of the selected Section
                    FamilyData = [];
                    let filteredDeptFamily = this.props.FilterData.sect[filteredDeptSection[0]].family;
                    for (let i = 0; i < filteredDeptFamily.length; i++) { // eslint-disable-line
                        FamilyData.push({value: filteredDeptFamily[i], label: filteredDeptFamily[i]});
                    }

                    //Getting the campaign of the selected Family
                    CampaignData = [];
                    let filteredDeptCampaign = this.props.FilterData.family[filteredDeptFamily[0]].campaign;
                    for (let i = 0; i < filteredDeptCampaign.length; i++) { // eslint-disable-line
                        CampaignData.push({value: filteredDeptCampaign[i], label: filteredDeptCampaign[i]});
                    }

                    //Updating Bubble Chart

                    BubbleChartData = this.fetchBubbleChartData(DepartmentData[0].value, SectionData[0].value,
                        FamilyData[0].value, CampaignData[0].value, this.state.selectedKPIType, this.state.selectedKPIx, this.state.selectedKPIy);


                this.setState({
                            selectedSection: SectionData[0].value,
                            selectedDept: DepartmentData[0].value,
                            selectedCampaign: CampaignData[0].value,
                            selectedFamily: FamilyData[0].value,
                            Section_Data: SectionData,
                            Family_Data: FamilyData,
                            Campaign_Data: CampaignData,
                            BubbleChartData:BubbleChartData
                        }
                    )

                }

        };

        //OnChange of Section Data
        const onChangeSectionData =(selectedItem) => {

            let BubbleChartData;
            if(selectedItem !== null){
                let FamilyData =[];
                let CampaignData =[];

                //Getting the family of the selected Section
                let filteredSectFamily = this.props.FilterData.sect[selectedItem.value].family;
                for (let i = 0; i < filteredSectFamily.length; i++) { // eslint-disable-line
                    FamilyData.push({value: filteredSectFamily[i], label: filteredSectFamily[i]});
                }


                //Getting the campaign of the selected Section
                let filteredSectCampaign = this.props.FilterData.family[FamilyData[0].value].campaign;
                for (let i = 0; i < filteredSectCampaign.length; i++) { // eslint-disable-line
                    CampaignData.push({value: filteredSectCampaign[i], label: filteredSectCampaign[i]});
                }


                //Updating Bubble Chart

                BubbleChartData= this.fetchBubbleChartData(this.state.selectedDept, selectedItem.value,
                        FamilyData[0].value, CampaignData[0].value, this.state.selectedKPIType, this.state.selectedKPIx, this.state.selectedKPIy);


                this.setState({
                    selectedSection : selectedItem.value,
                    selectedCampaign : CampaignData[0].value,
                    selectedFamily: FamilyData[0].value,
                    Family_Data: FamilyData,
                    Campaign_Data: CampaignData,
                    BubbleChartData:BubbleChartData
                });
            }
            else{
                //Getting data for individual Filters
                let FamilyData;
                let SectionData;
                let CampaignData;

                //Getting all section data
                SectionData = [];
                let filteredDeptSection = this.props.FilterData.dept[this.state.selectedDept].section;
                for (let i = 0; i < filteredDeptSection.length; i++) { // eslint-disable-line
                    SectionData.push({value: filteredDeptSection[i], label: filteredDeptSection[i]});
                }

                //Getting the family of the selected Section
                FamilyData = [];
                let filteredDeptFamily = this.props.FilterData.sect[filteredDeptSection[0]].family;
                for (let i = 0; i < filteredDeptFamily.length; i++) { // eslint-disable-line
                    FamilyData.push({value: filteredDeptFamily[i], label: filteredDeptFamily[i]});
                }

                //Getting the campaign of the selected Family
                CampaignData = [];
                let filteredDeptCampaign = this.props.FilterData.family[filteredDeptFamily[0]].campaign;
                for (let i = 0; i < filteredDeptCampaign.length; i++) { // eslint-disable-line
                    CampaignData.push({value: filteredDeptCampaign[i], label: filteredDeptCampaign[i]});
                }


                //Updating Bubble Chart

                BubbleChartData= this.fetchBubbleChartData(this.state.selectedDept, SectionData[0].value,
                        FamilyData[0].value, CampaignData[0].value, this.state.selectedKPIType, this.state.selectedKPIx, this.state.selectedKPIy);



                this.setState({
                        selectedSection: SectionData[0].value,
                        selectedCampaign: CampaignData[0].value,
                        selectedFamily: FamilyData[0].value,
                        Section_Data: SectionData,
                        Family_Data: FamilyData,
                        Campaign_Data: CampaignData,
                        BubbleChartData:BubbleChartData
                    }
                )

            }
        };


        //OnChange of Filter Data
        const onChangeFamilyData =(selectedItem) => {
            let BubbleChartData;
            if(selectedItem !== null){
                let CampaignData =[];

                //Getting the campaign of the selected Family
                let filteredFamilyCampaign = this.props.FilterData.family[selectedItem.value].campaign;
                for (let i = 0; i < filteredFamilyCampaign.length; i++) { // eslint-disable-line
                    CampaignData.push({value: filteredFamilyCampaign[i], label: filteredFamilyCampaign[i]});
                }

                //Updating Bubble Chart

                    BubbleChartData = this.fetchBubbleChartData(this.state.selectedDept, this.state.selectedSection,
                        selectedItem.value, CampaignData[0].value, this.state.selectedKPIType, this.state.selectedKPIx, this.state.selectedKPIy);


                this.setState({
                    selectedCampaign : CampaignData[0].value,
                    selectedFamily: selectedItem.value,
                    Campaign_Data: CampaignData,
                    BubbleChartData:BubbleChartData
                })
            }
            else{
                //Getting data for individual Filters
                let FamilyData;
                let CampaignData;

                //Getting the family of the selected Section
                FamilyData = [];
                let filteredSectFamily = this.props.FilterData.sect[this.state.selectedSection].family;
                for (let i = 0; i < filteredSectFamily.length; i++) { // eslint-disable-line
                    FamilyData.push({value: filteredSectFamily[i], label: filteredSectFamily[i]});
                }

                //Getting the campaign of the selected Family
                CampaignData = [];
                let filteredDeptCampaign = this.props.FilterData.family[filteredSectFamily[0]].campaign;
                for (let i = 0; i < filteredDeptCampaign.length; i++) { // eslint-disable-line
                    CampaignData.push({value: filteredDeptCampaign[i], label: filteredDeptCampaign[i]});
                }

                //Updating Bubble Chart

                    BubbleChartData = this.fetchBubbleChartData(this.state.selectedDept, this.state.selectedSection,
                        FamilyData[0].value, CampaignData[0].value, this.state.selectedKPIType, this.state.selectedKPIx, this.state.selectedKPIy);


                this.setState({
                        selectedCampaign: CampaignData[0].value,
                        selectedFamily: FamilyData[0].value,
                        Family_Data: FamilyData,
                        Campaign_Data: CampaignData,
                        BubbleChartData:BubbleChartData
                    }
                )

            }
        };


        //OnChange of Campaign Data
        const onChangeCampaignData =(selectedItem) => {

            let BubbleChartData;
            if(selectedItem !== null){

                //Updating Bubble Chart

                    BubbleChartData = this.fetchBubbleChartData(this.state.selectedDept, this.state.selectedSection,
                        this.state.selectedFamily,selectedItem.value, this.state.selectedKPIType, this.state.selectedKPIx, this.state.selectedKPIy);


                this.setState({selectedCampaign: selectedItem.value,
                               BubbleChartData: BubbleChartData
                });


            }
            else{
                let CampaignData;

                //Getting the campaign of the selected Family
                CampaignData = [];
                let filteredDeptCampaign = this.props.FilterData.family[this.state.selectedFamily].campaign;
                for (let i = 0; i < filteredDeptCampaign.length; i++) { // eslint-disable-line
                    CampaignData.push({value: filteredDeptCampaign[i], label: filteredDeptCampaign[i]});
                }

                //Updating Bubble Chart

                    BubbleChartData = this.fetchBubbleChartData(this.state.selectedDept, this.state.selectedSection,
                        this.state.selectedFamily,CampaignData[0].value, this.state.selectedKPIType, this.state.selectedKPIx, this.state.selectedKPIy);


                this.setState({
                        selectedCampaign: CampaignData[0].value,
                        Campaign_Data: CampaignData,
                        BubbleChartData:BubbleChartData
                    }
                )
            }
        };

        //OnChange of KPI Type Data
        const onChangeKPIType =(selectedItem) => {
            let BubbleChartData;
            if(selectedItem !== null){
                //Updating Bubble Chart

                BubbleChartData = this.fetchBubbleChartData(this.state.selectedDept, this.state.selectedSection,
                    this.state.selectedFamily,this.state.selectedCampaign, selectedItem.value, this.state.selectedKPIx, this.state.selectedKPIy);

                this.setState({selectedKPIType: selectedItem.value,
                                     BubbleChartData:BubbleChartData});
            }
            else{
                //Updating Bubble Chart

                BubbleChartData = this.fetchBubbleChartData(this.state.selectedDept, this.state.selectedSection,
                    this.state.selectedFamily,this.state.selectedCampaign, "absolute", this.state.selectedKPIx, this.state.selectedKPIy);

                this.setState({selectedKPIType: "absolute",
                BubbleChartData:BubbleChartData});
            }
        };

        //OnChange of KPI Type X-Axis
        const onChangeKPIx =(selectedItem) => {
            let BubbleChartData;

            if(selectedItem !== null){
                //Updating Bubble Chart

                BubbleChartData = this.fetchBubbleChartData(this.state.selectedDept, this.state.selectedSection,
                    this.state.selectedFamily,this.state.selectedCampaign, this.state.selectedKPIType, selectedItem.value, this.state.selectedKPIy);


                let KPIy = this.state.KPI.filter(i => i.value !== selectedItem.value);
                this.setState({selectedKPIx: selectedItem.value,
                                     KPIy : KPIy,
                                     BubbleChartData:BubbleChartData});
            }
            else{
                //Updating Bubble Chart

                BubbleChartData = this.fetchBubbleChartData(this.state.selectedDept, this.state.selectedSection,
                    this.state.selectedFamily,this.state.selectedCampaign, this.state.selectedKPIType,"incremental_sales", this.state.selectedKPIy);

                this.setState({selectedKPIx: "incremental_sales",
                                     selectedKPIy: "incremental_basket",
                                     BubbleChartData:BubbleChartData
                });
            }
        };


        //OnChange of KPI Type Y-Axis
        const onChangeKPIy =(selectedItem) => {
            let BubbleChartData;
            if(selectedItem !== null){
                //Updating Bubble Chart
                BubbleChartData = this.fetchBubbleChartData(this.state.selectedDept, this.state.selectedSection,
                    this.state.selectedFamily,this.state.selectedCampaign, this.state.selectedKPIType, this.state.selectedKPIx, selectedItem.value);


                let KPIx = this.state.KPI.filter(i => i.value !== selectedItem.value);
                this.setState({selectedKPIy: selectedItem.value,
                                     KPIx:KPIx,
                                    BubbleChartData:BubbleChartData});
            }
            else{
                //Updating Bubble Chart
                BubbleChartData = this.fetchBubbleChartData(this.state.selectedDept, this.state.selectedSection,
                    this.state.selectedFamily,this.state.selectedCampaign, this.state.selectedKPIType, this.state.selectedKPIx, "incremental_basket");

                this.setState({selectedKPIy: "incremental_basket",
                                    selectedKPIx: "incremental_sales",
                                    BubbleChartData:BubbleChartData
                });
            }
        };


        const {error, isLoaded} = this.state;

        return (

            <div style={{ marginLeft: '5%', marginRight: '3%', marginBottom: '3%' }}>

                <div>
                                <div className="row">
                                    <div className="col-xs-3 col-md-4 col-lg-4">
                                        <br/>
                                        <h6> Select Department</h6>
                                        <Filter filterData={this.state.Department_Data} selectedValue={this.state.selectedDept } onChangeHandle={onChangeDepartmentData}/>
                                        <br/>
                                        <h6> Select Section</h6>
                                        <Filter filterData={this.state.Section_Data} selectedValue={this.state.selectedSection} onChangeHandle={onChangeSectionData}/>
                                        <br/>
                                        <h6> Select Family</h6>
                                        <Filter filterData={this.state.Family_Data} selectedValue={this.state.selectedFamily} onChangeHandle={onChangeFamilyData}/>
                                        <br/>
                                        <h6> Select Campaign</h6>
                                        <Filter filterData={this.state.Campaign_Data} selectedValue={this.state.selectedCampaign} onChangeHandle={onChangeCampaignData}/>
                                        <br/>
                                    </div>
                                    <div className="col-xs-3 col-md-4 col-lg-4">
                                        <br/>
                                        <h6> Select KPI Type</h6>
                                        <Filter filterData={this.state.KpiType} selectedValue={this.state.selectedKPIType} onChangeHandle={onChangeKPIType}/>
                                        <br/>
                                        <h6> Select First KPI </h6>
                                        <Filter filterData={this.state.KPIx} selectedValue={this.state.selectedKPIx} onChangeHandle={onChangeKPIx}/>
                                        <br/>
                                        <h6> Select Second KPI</h6>
                                        <Filter filterData={this.state.KPIy} selectedValue={this.state.selectedKPIy} onChangeHandle={onChangeKPIy}/>
                                        <br/>
                                    </div>
                                </div>
                </div>
                <div className="col-xs-3 col-md-12 col-lg-12">
                    {(()=>{
                        if (this.state.BubbleChartData) {
                            return (
                                <BubbleChart data={this.state.BubbleChartData.content} xAxisTitle={this.state.selectedKPIx} yAxisTitle={this.state.selectedKPIy} xAxisLabel={this.state.KPI.filter( kpi => kpi.value === this.state.selectedKPIx)[0].label}  yAxisLabel={this.state.KPI.filter( kpi => kpi.value === this.state.selectedKPIy)[0].label} kpi={this.state.selectedKPIType}/>
                            );
                        }
                        return (
                            <div className="text-center"><Spinner /><h4>Please Wait a
                                Moment....!!</h4>
                            </div>
                        );
                    })()
                    }
                </div>
            </div>

        )
    }
}

export default BubbleChartView;
