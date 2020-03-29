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
      'travelAtEvent': {}
    }

    this.travelAtEventEmi = 0
  }

  handleClickRevisitIntroduction = () => {
    this.props.showWorkflowPage(false)
  }

  recordEmissionFromSection = (sectionName, emissionAmount) => {
    this.travelAtEventEmi = emissionAmount // TODO generalize
    console.log('parent, sectionName', sectionName)
    console.log('parent, emissionAmount', emissionAmount)
  }

  saveSectionState = (sectionName, sectionState) => {
    this.setState({
      [sectionName]: sectionState
    })
  }

  render() {

    return (
      <div style={pageStyle}>
        <DefaultButton text="Revisit the introduction" onClick={this.handleClickRevisitIntroduction}/>

        <Pivot linkSize={PivotLinkSize.large}>

          <PivotItem headerText="Travel to event">
            <TravelToEvent />
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
              travelAtEventEmi={this.travelAtEventEmi}
            />
          </PivotItem>

        </Pivot>
      </div>
    )
  }
}

export default WorkflowPage
