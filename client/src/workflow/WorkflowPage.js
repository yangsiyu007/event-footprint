import React from "react"
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot'
import { DefaultButton } from 'office-ui-fabric-react'
import TravelToEvent from './TravelToEvent'
import TravelAtEvent  from './TravelAtEvent'

const pageStyle = { 
  paddingLeft: 30, 
  paddingRight: 30,
  paddingTop: 10
}



class WorkflowPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      "travel_local_total_emi": 0
    }
  }

  handleClickRevisitIntroduction = () => {
    this.props.showWorkflowPage(false)
  }

  onChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)

    const target = e.target
    const value = parseFloat(target.value) ? parseFloat(target.value) : 0
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {

    return (
      <div style={pageStyle}>
        <DefaultButton text="Revisit the introduction" onClick={this.handleClickRevisitIntroduction}/>

        <Pivot linkSize={PivotLinkSize.large}>

          <PivotItem headerText="Travel">
            <TravelAtEvent />
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

          </PivotItem>

        </Pivot>
      </div>
    )
  }
}

export default WorkflowPage
