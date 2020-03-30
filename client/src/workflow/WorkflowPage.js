import React from "react"
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot'
import { DefaultButton } from 'office-ui-fabric-react'
import TravelToEvent from './TravelToEvent'
import TravelAtEvent from './TravelAtEvent'
import Results from './Results'

const pageStyle = { 
  paddingLeft: 30, 
  paddingRight: 30,
  paddingTop: 10
}



class WorkflowPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // state of each section is saved here so they persist as user switches pivot
      'travelToEvent': {},
      'travelAtEvent': {}
    }

    this.travelToEventEmi = 0
    this.travelAtEventEmi = 0
    this.accomEmi = 0
    this.mealsEmi = 0
    this.spacesEmi = 0
    this.materialsServicesEmi = 0
  
  }

  handleClickRevisitIntroduction = () => {
    this.props.showWorkflowPage(false)
  }

  recordEmissionFromSection = (sectionName, emissionAmount) => {
    switch (sectionName) {
      case 'travelToEvent':
        this.travelToEventEmi = emissionAmount
        break
      case 'travelAtEvent':
        this.travelAtEventEmi = emissionAmount
        break
      case 'accom': 
        this.accomEmi = emissionAmount
        break
      case 'meals':
        this.mealsEmi = emissionAmount
        break
      case 'spaces':
        this.spacesEmi = emissionAmount
        break
      case 'materialsServices':
        this.materialsServicesEmi = emissionAmount
        break
      default:
        console.warn('WorkflowPage, recordEmissionFromSection, unknown section name: ', sectionName)
    }
  }

  saveSectionState = (sectionName, sectionState) => {
    this.setState({
      [sectionName]: sectionState
    })
  }

  render() {

    return (
      <div style={pageStyle}>
        <DefaultButton text="Restart" onClick={this.handleClickRevisitIntroduction}/>

        <Pivot linkSize={PivotLinkSize.large}>

          <PivotItem headerText="Travel to event">
            <TravelToEvent 
              initState={this.state.travelToEvent}
              saveSectionState={this.saveSectionState.bind(this, 'travelToEvent')}
              recordEmissionFromSection={this.recordEmissionFromSection.bind(this, 'travelToEvent')}
            />
          </PivotItem>

          <PivotItem headerText="Travel at event">
            <TravelAtEvent 
              initState={this.state.travelAtEvent}
              saveSectionState={this.saveSectionState.bind(this, 'travelAtEvent')}
              recordEmissionFromSection={this.recordEmissionFromSection.bind(this, 'travelAtEvent')}
            />
          </PivotItem>

          <PivotItem headerText="Accomodation">

          </PivotItem>

          <PivotItem headerText="Meals">

          </PivotItem>

          <PivotItem headerText="Meeting spaces">
  
          </PivotItem>

          <PivotItem headerText="Waste">

          </PivotItem>

          <PivotItem headerText="Materials and services">

          </PivotItem>

          <PivotItem headerText="Results">
            <Results 
              travelToEventEmi={this.travelToEventEmi}
              travelAtEventEmi={this.travelAtEventEmi}
              accomEmi={this.accomEmi}
              mealsEmi={this.mealsEmi}
              spacesEmi={this.spacesEmi}
              materialsServicesEmi={this.materialsServicesEmi}
            />
          </PivotItem>

        </Pivot>
      </div>
    )
  }
}

export default WorkflowPage
