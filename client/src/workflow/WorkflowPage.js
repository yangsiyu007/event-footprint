import React from "react"
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Separator } from 'office-ui-fabric-react/lib/Separator'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'


const sectionHeaderStyles = {
  root: { marginTop: 30, marginBottom: 10 }
}

const sectionSubtitleSytles = {
  root: { marginBottom: 20 }
}

const sectionStyles = {
  root: { marginTop: 30 }
}

const pageStyles = { 
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
      <Text block variant='large' styles={sectionHeaderStyles}>Local Travel at Event</Text>
      <Text block styles={sectionSubtitleSytles}>Travel associated with attending the event from their accomodation</Text>

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

      <Stack horizontal styles={sectionStyles} tokens={{ childrenGap: 20 }}>
        <Stack tokens={{ childrenGap: 10 }}>
          <Text block>Transport mode</Text>
          <Text block>Car</Text>
          <Text block>Bus</Text>
          <Text block>Light rail</Text>
          <Text block>Total</Text>
        </Stack>

        <Stack tokens={{ childrenGap: 10 }}>
          <Text block>% trips</Text>
          <TextField
            name="travel_local_car_percent"
            value={this.state.travel_local_car_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 } }}
          />
          <TextField
            name="travel_local_bus_percent"
            value={this.state.travel_local_bus_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 } }}
          />
          <TextField
            name="travel_local_lightrail_percent"
            value={this.state.travel_local_lightrail_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 } }}
          />
          <TextField
            name="travel_local_total_percent"
            value={this.state.travel_local_total_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 } }}
          />
        </Stack>

        <Stack tokens={{ childrenGap: 10 }}>
          <Text block>Average 1-way distance (miles)</Text>
          <TextField
            name="travel_local_car_distance"
            value={this.state.travel_local_car_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 } }}
          />
          <TextField
            name="travel_local_bus_distance"
            value={this.state.travel_local_bus_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 } }}
          />

          <TextField
            name="travel_local_lightrail_distance"
            value={this.state.travel_local_lightrail_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 } }}
          />
        </Stack>
      </Stack>




      <Separator />



    </div>
  )




    return <div style={pageStyles}>
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
