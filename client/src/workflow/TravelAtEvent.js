import React from "react"
import { IStyleSet, FontWeights } from 'office-ui-fabric-react/lib/Styling'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'


const emissionFactors = {
  tCO2e_per_mile: 0.00038
}


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


class TravelAtEvent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      "travel_local_attendees": 0,
      "travel_local_days": 0,
      "travel_local_trips": 0,

      "travel_local_car_percent": 0,
      "travel_local_bus_percent": 0,
      "travel_local_lightrail_percent": 0,

      "travel_local_car_distance": 0,
      "travel_local_bus_distance": 0,
      "travel_local_lightrail_distance": 0
    }
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

    // TODO what does tCO2e mean?

    // travel local
    const travel_local_total_percent = this.state.travel_local_car_percent + this.state.travel_local_bus_percent + this.state.travel_local_lightrail_percent
    const travel_local_total_distance = this.state.travel_local_car_distance + this.state.travel_local_bus_distance + this.state.travel_local_lightrail_distance
    
    const travel_local_car_distance_total = this.state.travel_local_attendees * this.state.travel_local_days * this.state.travel_local_trips * this.state.travel_local_car_percent/100 * this.state.travel_local_car_distance
    const travel_local_car_emi = travel_local_car_distance_total * emissionFactors.tCO2e_per_mile

    const travel_local_bus_distance_total = 1  // HERE


    return (
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
            <Text block styles={headerColStyle} > </Text>
            <Text block styles={headerColStyle} >Passenger miles</Text>
            <Text block styles={headerColStyle} >Emissions (tCO2e)</Text>
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
            <div style={{width: 130}}></div>
            <TextField
              readOnly disabled={true}
              value={travel_local_car_distance_total}
              styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
            />
            <TextField
              readOnly disabled={true}
              value={travel_local_car_emi}
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
              readOnly disabled={true}
              value={travel_local_total_percent}
              styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
            />
            <TextField
              readOnly disabled={true}
              value={travel_local_total_distance}
              styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
            />
          </Stack>
            
        </Stack>  
      </div>
    ) 
  }
}
  
export default TravelAtEvent
