import React from "react"
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Separator } from 'office-ui-fabric-react/lib/Separator'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'


const sectionHeaderStyle = {
  root: { marginTop: 30, marginBottom: 10 }
}

const sectionSubtitleStyle = {
  root: { marginBottom: 20 }
}

const sectionStyle = {
  root: { marginTop: 30 }
}

const headerColStyle = {
  root: { width: 130 }
}

const pageStyle = { 
  paddingLeft: 30, 
  paddingRight: 30,
  paddingTop: 10
}


class WorkflowPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      "travel_local_attendees": 0,
      "travel_local_days": 0,
      "travel_local_trips": 0,

      "travel_local_car_percent": 0,
      "travel_local_bus_percent": 0,
      "travel_local_lightrail_percent": 0,
      "travel_local_total_percent": 0,

      "travel_local_car_distance": 0,
      "travel_local_bus_distance": 0,
      "travel_local_lightrail_distance": 0,
      "travel_local_total_distance": 0
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

    this.setState((state, props) => ({
      travel_local_total_percent: state.travel_local_car_percent + state.travel_local_bus_percent + state.travel_local_lightrail_percent,
      travel_local_total_distance: state.travel_local_car_distance + state.travel_local_bus_distance + state.travel_local_lightrail_distance
    }))
  }

  render() {

  const travelSection = (
    <div>
      <Text block variant='large' styles={sectionHeaderStyle}>Local Travel at Event</Text>
      <Text block styles={sectionSubtitleStyle}>Travel associated with attending the event from their accomodation</Text>

      <Stack tokens={{ childrenGap: 15 }}>
        <TextField
          label="Number of attendees"
          name="travel_local_attendees"
          value={this.state.travel_local_attendees}
          onChange={this.onChange}
          styles={{ fieldGroup: { width: 100 } }}
        />

        <TextField
          label="Days of event"
          name="travel_local_days"
          value={this.state.travel_local_days}
          onChange={this.onChange}
          styles={{ fieldGroup: { width: 100 } }}
        />

        <TextField
          label="Average trips per attendee per day"
          name="travel_local_trips"
          value={this.state.travel_local_trips}
          onChange={this.onChange}
          styles={{ fieldGroup: { width: 100 } }}
        />
      </Stack>

      <Stack styles={sectionStyle} tokens={{ childrenGap: 10 }}>
        <Stack horizontal >
          <Text block styles={headerColStyle} >Transport mode</Text>
          <Text block styles={headerColStyle} >% trips</Text>
          <Text block styles={headerColStyle} >Average 1-way distance (miles)</Text>
        </Stack>

        <Stack horizontal >
         <Text block styles={headerColStyle} >Car</Text>
         <TextField
            name="travel_local_car_percent"
            value={this.state.travel_local_car_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name="travel_local_car_distance"
            value={this.state.travel_local_car_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>

        <Stack horizontal >
          <Text block styles={headerColStyle} >Bus</Text>
          <TextField
            name="travel_local_bus_percent"
            value={this.state.travel_local_bus_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name="travel_local_bus_distance"
            value={this.state.travel_local_bus_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>

        <Stack horizontal>
          <Text block styles={headerColStyle} >Light rail</Text>
          <TextField
            name="travel_local_lightrail_percent"
            value={this.state.travel_local_lightrail_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name="travel_local_lightrail_distance"
            value={this.state.travel_local_lightrail_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>
        
          
        <Stack horizontal>
          <Text block styles={headerColStyle} >Total</Text>
          <TextField
            name="travel_local_total_percent" readOnly
            value={this.state.travel_local_total_percent}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name="travel_local_total_distance" readOnly
            value={this.state.travel_local_total_distance}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>
          
          
      </Stack>





      <Separator />



    </div>
  )




    return <div style={pageStyle}>
      <DefaultButton text="Revisit the introduction" onClick={this.handleClickRevisitIntroduction}/>

      <Pivot linkSize={PivotLinkSize.large}>

        <PivotItem headerText="Travel">
          {travelSection}
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
  }
}

export default WorkflowPage
