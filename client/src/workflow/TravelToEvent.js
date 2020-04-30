import React from "react"
import { FontWeights } from 'office-ui-fabric-react/lib/Styling'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { emissionFactors } from '../EmissionFactors'
import { Separator } from 'office-ui-fabric-react/lib/Separator'

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
const colStyle = {
  root: { width: 130 }
}

const emptyCol = <div style={{width: 130}}></div>


class TravelToEvent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      "attendees": 0,

      "car_percent": 0,
      "car_distance": 0,

      "rail_percent": 0,
      "rail_distance": 0,

      "flight_percent": 0,
      
      // flights < 300 miles
      "flight_short_ave_percent": 0,
      "flight_short_ave_distance": 0,

      // flights 300 to 2300 miles
      "flight_mid_ave_percent": 0,  // average - if not sure economy or business class
      "flight_mid_ave_distance": 0,

      "flight_mid_econ_percent": 0,
      "flight_mid_econ_distance": 0,

      "flight_mid_bus_percent": 0,
      "flight_mid_bus_distance": 0,

      // flights > 2300 miles
      "flight_long_ave_percent": 0,
      "flight_long_ave_distance": 0,

      "flight_long_econ_percent": 0,
      "flight_long_econ_distance": 0,

      "flight_long_prem_percent": 0,  // premium economy class
      "flight_long_prem_distance": 0,

      "flight_long_bus_percent": 0,
      "flight_long_bus_distance": 0,

      "flight_long_first_percent": 0,
      "flight_long_first_distance": 0,

      // travel to/from airport
      "airport_car_percent": 0,
      "airport_car_distance": 0,

      "airport_bus_percent": 0,
      "airport_bus_distance": 0,

      "airport_lightrail_percent": 0,      
      "airport_lightrail_distance": 0
    }
  }

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
    // using _ to name the following variables; read more easily

    const total_transport_mode_percent = this.state.car_percent + this.state.rail_percent + this.state.flight_percent

    const total_flight_percent = this.state.flight_short_ave_percent + this.state.flight_mid_ave_percent + this.state.flight_mid_econ_percent + this.state.flight_mid_bus_percent + this.state.flight_long_ave_percent + this.state.flight_long_econ_percent + this.state.flight_long_prem_percent + this.state.flight_long_bus_percent + this.state.flight_long_first_percent

    const attendees = this.state.attendees

    const car_distance_total = attendees * this.state.car_percent/100 * this.state.car_distance * 2  // the distance entered is 1-way
    const car_emi = car_distance_total * emissionFactors.motor_gasoline_passenger

    const rail_distance_total = attendees * this.state.rail_percent/100 * this.state.rail_distance * 2
    const rail_emi = rail_distance_total * emissionFactors.rail_national

    // flight breakdown
    const flight_attendees = attendees * this.state.flight_percent/100
    const flight_trips = 2 * flight_attendees  // total number of 1-way trips

    const flight_short_ave_distance_total =  flight_trips * this.state.flight_short_ave_percent/100 * this.state.flight_short_ave_distance
    const flight_short_ave_emi = flight_short_ave_distance_total * emissionFactors.air_short_haul

    const flight_mid_ave_distance_total = flight_trips * this.state.flight_mid_ave_percent/100 * this.state.flight_mid_ave_distance
    const flight_mid_ave_emi = flight_mid_ave_distance_total * emissionFactors.air_mid_haul_average

    const flight_mid_econ_distance_total = flight_trips * this.state.flight_mid_econ_percent/100 * this.state.flight_mid_econ_distance
    const flight_mid_econ_emi = flight_mid_econ_distance_total * emissionFactors.air_mid_haul_economy

    const flight_mid_bus_distance_total = flight_trips * this.state.flight_mid_bus_percent/100 * this.state.flight_mid_bus_distance
    const flight_mid_bus_emi = flight_mid_bus_distance_total * emissionFactors.air_mid_haul_business

    const flight_long_ave_distance_total = flight_trips * this.state.flight_long_ave_percent/100 * this.state.flight_long_ave_distance
    const flight_long_ave_emi = flight_long_ave_distance_total * emissionFactors.air_long_haul_average

    const flight_long_econ_distance_total = flight_trips * this.state.flight_long_econ_percent/100 * this.state.flight_long_econ_distance
    const flight_long_econ_emi = flight_long_econ_distance_total * emissionFactors.air_long_haul_economy

    const flight_long_prem_distance_total = flight_trips * this.state.flight_long_prem_percent/100 * this.state.flight_long_prem_distance
    const flight_long_prem_emi = flight_long_prem_distance_total * emissionFactors.air_long_haul_premium_econ

    const flight_long_bus_distance_total = flight_trips * this.state.flight_long_bus_percent/100 * this.state.flight_long_bus_distance
    const flight_long_bus_emi = flight_long_bus_distance_total * emissionFactors.air_long_haul_business

    const flight_long_first_distance_total = flight_trips * this.state.flight_long_first_percent/100 * this.state.flight_long_first_distance
    const flight_long_first_emi = flight_long_first_distance_total * emissionFactors.air_long_haul_first

    const total_flight_distance = flight_short_ave_distance_total + flight_mid_ave_distance_total + flight_mid_econ_distance_total + flight_mid_bus_distance_total + flight_long_ave_distance_total + flight_long_econ_distance_total + flight_long_prem_distance_total + flight_long_bus_distance_total + flight_long_first_distance_total
    const total_flight_emi = flight_short_ave_emi + flight_mid_ave_emi + flight_mid_econ_emi + flight_mid_bus_emi + flight_long_ave_emi + flight_long_econ_emi + flight_long_prem_emi + flight_long_bus_emi + flight_long_first_emi


    // airport to and from - distance is *round trip*
    const airport_car_distance_total = flight_attendees * this.state.airport_car_percent/100 * this.state.airport_car_distance
    const airport_car_emi = airport_car_distance_total * emissionFactors.motor_gasoline_passenger

    const airport_bus_distance_total = flight_attendees * this.state.airport_bus_percent/100 * this.state.airport_car_distance
    const airport_bus_emi = airport_bus_distance_total * emissionFactors.diesel_fuel_medium_heavy_duty

    const airport_lightrail_distance_total = flight_attendees * this.state.airport_lightrail_percent/100 * this.state.airport_lightrail_distance
    const airport_lightrail_emi = airport_lightrail_distance_total * emissionFactors.rail_light_rail_and_tram

    const total_airport_distance =  airport_car_distance_total + airport_bus_distance_total + airport_lightrail_distance_total
    const total_airport_emi = airport_car_emi + airport_bus_emi + airport_lightrail_emi

    // total emission from this section
    const emi = car_emi +  rail_emi + total_flight_emi + total_airport_emi

    this.props.recordEmissionFromSection(emi)

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
          <Text block styles={headerColStyle} >Rail</Text>
          <TextField
            name="rail_percent"
            value={this.state.rail_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name="rail_distance"
            value={this.state.rail_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={rail_distance_total}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={rail_emi}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>

        <Stack horizontal>
          <Text block styles={headerColStyle} >Flight</Text>
          <TextField
            name="flight_percent"
            value={this.state.flight_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <Text block styles={{ root: { width: 130} }} >Details to fill below</Text>
          {emptyCol}
          {emptyCol}
          {emptyCol}
        </Stack>
        
        <Stack horizontal>
          <Text block styles={headerColStyle} >Total</Text>
          <TextField
            readOnly disabled={true}
            value={total_transport_mode_percent}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          {emptyCol}
          {emptyCol}
          {emptyCol}
        </Stack>
          
      </Stack> 
    )

    const flightRowsInfo = [
      {
        flightLength: "< 300 mi",
        cabinClass: "Average",
        percentValue: this.state.flight_short_ave_percent,
        percentName: "flight_short_ave_percent",
        distanceValue: this.state.flight_short_ave_distance,
        distanceName: "flight_short_ave_distance",
        totalDistance: flight_short_ave_distance_total,
        emission: flight_short_ave_emi
      },

      {
        flightLength: "300 to 2300 mi",
        cabinClass: "Average",
        percentValue: this.state.flight_mid_ave_percent,
        percentName: "flight_mid_ave_percent",
        distanceValue: this.state.flight_mid_ave_distance,
        distanceName: "flight_mid_ave_distance",
        totalDistance: flight_mid_ave_distance_total,
        emission: flight_mid_ave_emi
      },
      {
        flightLength: "",
        cabinClass: "Economy",
        percentValue: this.state.flight_mid_econ_percent,
        percentName: "flight_mid_econ_percent",
        distanceValue: this.state.flight_mid_econ_distance,
        distanceName: "flight_mid_econ_distance",
        totalDistance: flight_mid_econ_distance_total,
        emission: flight_mid_econ_emi
      },
      {
        flightLength: "",
        cabinClass: "Business",
        percentValue: this.state.flight_mid_bus_percent,
        percentName: "flight_mid_bus_percent",
        distanceValue: this.state.flight_mid_bus_distance,
        distanceName: "flight_mid_bus_distance",
        totalDistance: flight_mid_bus_distance_total,
        emission: flight_mid_bus_emi
      },

      {
        flightLength: "> 2300 mi",
        cabinClass: "Average",
        percentValue: this.state.flight_long_ave_percent,
        percentName: "flight_long_ave_percent",
        distanceValue: this.state.flight_long_ave_distance,
        distanceName: "flight_long_ave_distance",
        totalDistance: flight_long_ave_distance_total,
        emission: flight_long_ave_emi
      },
      {
        flightLength: "",
        cabinClass: "Economy",
        percentValue: this.state.flight_long_econ_percent,
        percentName: "flight_long_econ_percent",
        distanceValue: this.state.flight_long_econ_distance,
        distanceName: "flight_long_econ_distance",
        totalDistance: flight_long_econ_distance_total,
        emission: flight_long_econ_emi
      },
      {
        flightLength: "",
        cabinClass: "Premium Economy",
        percentValue: this.state.flight_long_prem_percent,
        percentName: "flight_long_prem_percent",
        distanceValue: this.state.flight_long_prem_distance,
        distanceName: "flight_long_prem_distance",
        totalDistance: flight_long_prem_distance_total,
        emission: flight_long_prem_emi
      },
      {
        flightLength: "",
        cabinClass: "Business",
        percentValue: this.state.flight_long_bus_percent,
        percentName: "flight_long_bus_percent",
        distanceValue: this.state.flight_long_bus_distance,
        distanceName: "flight_long_bus_distance",
        totalDistance: flight_long_bus_distance_total,
        emission: flight_long_bus_emi
      },
      {
        flightLength: "",
        cabinClass: "First",
        percentValue: this.state.flight_long_first_percent,
        percentName: "flight_long_first_percent",
        distanceValue: this.state.flight_long_first_distance,
        distanceName: "flight_long_first_distance",
        totalDistance: flight_long_first_distance_total,
        emission: flight_long_first_emi
      }
    ]

    // use percentName as the key field for each item required by React
    const flightRows = flightRowsInfo.map(row => {

      const cabinClassStyle = (row.cabinClass == "Average") ? headerColStyle : colStyle

      return (
        <Stack horizontal key={row.percentName}>
          <Text block styles={headerColStyle} >{row.flightLength}</Text>
          <Text block styles={cabinClassStyle} >{row.cabinClass}</Text>
          <TextField
            name={row.percentName}
            value={row.percentValue}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name={row.distanceName}
            value={row.distanceValue}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={row.totalDistance}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={row.emission}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>
      )
    })
    flightRows.push(
      <Stack horizontal key="total">
        <Text block styles={headerColStyle} >Total</Text>
        {emptyCol}
        <TextField
          readOnly disabled={true}
          value={total_flight_percent} 
          styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
        />
        {emptyCol}
        {emptyCol}
        <TextField
          readOnly disabled={true}
          value={total_flight_distance} 
          styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
        />
        <TextField
          readOnly disabled={true}
          value={total_flight_emi} 
          styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
        />
      </Stack>
    )

    const flightsBreakdownSection = (
      <Stack styles={sectionStyle} tokens={{ childrenGap: 10 }}>
        <Stack horizontal >
          <Text block styles={headerColStyle} >Flight length</Text>
          <Text block styles={headerColStyle} >Cabin class</Text>
          <Text block styles={headerColStyle} >% of flying attendees</Text>
          <Text block styles={headerColStyle} >Average 1-way flight distance (miles)</Text>
          <Text block styles={headerColStyle} > </Text>
          <Text block styles={headerColStyle} >Passenger miles</Text>
          <Text block styles={headerColStyle} >Emissions (tCO2e)</Text>
        </Stack>

        {flightRows}

      </Stack>
    )

    const airportTravelSection = (
      <Stack styles={sectionStyle} tokens={{ childrenGap: 10 }}>
        <Stack horizontal >
          <Text block styles={headerColStyle} >Transport mode to/from the airport</Text>
          <Text block styles={headerColStyle} >% trips</Text>
          <Text block styles={headerColStyle} >Average <em>round-trip</em> distance (miles)</Text>
          <Text block styles={headerColStyle} > </Text>
          <Text block styles={headerColStyle} >Passenger miles</Text>
          <Text block styles={headerColStyle} >Emissions (tCO2e)</Text>
        </Stack>

        <Stack horizontal >
          <Text block styles={headerColStyle} >Car</Text>
          <TextField
            name="airport_car_percent"
            value={this.state.airport_car_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name="airport_car_distance"
            value={this.state.airport_car_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={airport_car_distance_total}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={airport_car_emi}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>

        <Stack horizontal >
          <Text block styles={headerColStyle} >Bus</Text>
          <TextField
            name="airport_bus_percent"
            value={this.state.airport_bus_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name="airport_bus_distance"
            value={this.state.airport_bus_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={airport_bus_distance_total}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={airport_bus_emi}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>

        <Stack horizontal>
          <Text block styles={headerColStyle} >Light rail</Text>
          <TextField
            name="airport_lightrail_percent"
            value={this.state.airport_lightrail_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            name="airport_lightrail_distance"
            value={this.state.airport_lightrail_distance}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={airport_lightrail_distance_total}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={airport_lightrail_emi}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>
        
        <Stack horizontal>
          <Text block styles={headerColStyle} >Total</Text>
          <TextField
            readOnly disabled={true}
            value={total_transport_mode_percent}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={total_airport_distance} 
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={total_airport_emi} 
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>
          
      </Stack> 
    )

    return (
      <div>
        <Text block variant='large' styles={sectionHeaderStyle}>Travel to the Event</Text>
        <Text block styles={sectionSubtitleStyle}>Travel to the town of the event. Note that Microsoft employees' flights have already been offset if they booked their flights using the internal tool. In in the Number of attendees field below, exclude Microsoft employees traveling by flight and attendees local to the area.</Text>

        <TextField
          label="Number of attendees (traveling from afar)"
          name="attendees"
          value={this.state.attendees}
          onChange={this.onChange}
          styles={{ fieldGroup: { width: 100 } }}
        />

        <div style={{height: 20}}></div>
        <Separator>Transport modes</Separator>

        {transportModeSection}

        <div style={{height: 20}}></div>
        <Separator>Breakdown of flights</Separator>

        {flightsBreakdownSection}

        <div style={{height: 30}}></div>
        <Separator>To and from the airport</Separator>
      
        {airportTravelSection}

        <div style={{height: 30}}></div>
        <Separator></Separator>

        <TextField
          readOnly disabled={true}
          label="Total from traveling to the event city"
          value={emi} 
          styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
        />

        <div style={{height: 30}}></div>
      </div>
    )
  }
}

export default TravelToEvent