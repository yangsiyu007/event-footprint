import React from "react"
import { IStyleSet, FontWeights } from 'office-ui-fabric-react/lib/Styling'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { emissionFactors } from '../EmissionFactors'


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
  root: { width: 130, fontWeight: FontWeights.semibold }
}

const emptyCol = <div style={{width: 130}}></div>


class TravelAtEvent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      "attendees": 0,
      "days": 0,
      "trips": 0,

      "car_percent": 0,
      "bus_percent": 0,
      "lightrail_percent": 0,

      "car_distance": 0,
      "bus_distance": 0,
      "lightrail_distance": 0
    }
  }

  // TODO make an abstract class for WorkflowSection to include the following three methods
  onChange = (e) => {
    const target = e.target
    const value = parseFloat(target.value) ? parseFloat(target.value) : 0
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  componentDidMount() {
    const initState = this.props.initState
    if (initState['attendees']) {
      this.setState(initState)
    }
  }

  componentWillUnmount() {
    this.props.saveSectionState(this.state)
  }


  render() {

    // TODO what does tCO2e mean?

    // travel local
    const total_percent = this.state.car_percent + this.state.bus_percent + this.state.lightrail_percent
    
    const total_trips = this.state.attendees * this.state.days * this.state.trips

    const car_distance_total = total_trips * this.state.car_percent/100 * this.state.car_distance
    const car_emi = car_distance_total * emissionFactors.motor_gasoline_passenger

    const bus_distance_total = total_trips * this.state.bus_percent/100 * this.state.bus_distance
    const bus_emi = bus_distance_total * emissionFactors.diesel_fuel_medium_heavy_duty

    const lightrail_distance_total = total_trips * this.state.lightrail_percent/100 * this.state.lightrail_distance
    const lightrail_emi = lightrail_distance_total * emissionFactors.rail_light_rail_and_tram

    const emi = car_emi + bus_emi + lightrail_emi

    this.props.recordEmissionFromSection(emi)

    const numTripsSection = (
      <Stack tokens={{ childrenGap: 15 }}>
        <TextField
          label="Number of attendees"
          name="attendees"
          value={this.state.attendees}
          onChange={this.onChange}
          styles={{ fieldGroup: { width: 100 } }}
        />

        <TextField
          label="Days of event"
          name="days"
          value={this.state.days}
          onChange={this.onChange}
          styles={{ fieldGroup: { width: 100 } }}
        />

        <TextField
          label="Average trips per attendee per day"
          name="trips"
          value={this.state.trips}
          onChange={this.onChange}
          styles={{ fieldGroup: { width: 100 } }}
        />
      </Stack>
    )

    const transportModeSection = (
      <Stack styles={sectionStyle} tokens={{ childrenGap: 10 }}>
        <Stack horizontal >
          <Text block styles={headerColStyle} >Transport mode</Text>
          <Text block styles={headerColStyle} >% trips</Text>
          <Text block styles={headerColStyle} >Average 1-way distance (miles)</Text>
          <Text block styles={headerColStyle} > </Text>
          <Text block styles={headerColStyle} >Passenger miles</Text>
          <Text block styles={headerColStyle} >Emissions (tCO2e)</Text>
        </Stack>

        <Stack horizontal >
          <Text block styles={headerColStyle} >Car</Text>
          <TextField
            name="car_percent"
            value={this.state.car_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name="car_distance"
            value={this.state.car_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={car_distance_total}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={car_emi}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>

        <Stack horizontal >
          <Text block styles={headerColStyle} >Bus</Text>
          <TextField
            name="bus_percent"
            value={this.state.bus_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name="bus_distance"
            value={this.state.bus_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={bus_distance_total}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={bus_emi}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>

        <Stack horizontal>
          <Text block styles={headerColStyle} >Light rail</Text>
          <TextField
            name="lightrail_percent"
            value={this.state.lightrail_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name="lightrail_distance"
            value={this.state.lightrail_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={lightrail_distance_total}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={lightrail_emi}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>
        
          
        <Stack horizontal>
          <Text block styles={headerColStyle} >Total</Text>
          <TextField
            readOnly disabled={true}
            value={total_percent}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          {emptyCol}
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={emi}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>
          
      </Stack> 
    )

    return (
      <div>
        <Text block variant='large' styles={sectionHeaderStyle}>Local Travel at Event</Text>
        <Text block styles={sectionSubtitleStyle}>Travel associated with attending the event from their accomodation</Text>

        {numTripsSection}

        {transportModeSection}
         
      </div>
    ) 
  }
}
  
export default TravelAtEvent

