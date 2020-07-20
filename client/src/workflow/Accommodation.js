import React from "react"
import { FontWeights } from 'office-ui-fabric-react/lib/Styling'
import { Text } from "office-ui-fabric-react/lib/Text"
import { TextField } from "office-ui-fabric-react/lib/TextField"
import { Stack } from "office-ui-fabric-react/lib/Stack"
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown"
import { emissionFactors } from "../EmissionFactors"


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


class Accommodation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      "total_room_nights": 0,
      "days": "United States - NWPP",

      "upper_upscale_percent": 0,
      "upscale_percent": 0,
      "midscale_w_food_beverage_percent": 0,
      "midscale_wo_food_beverage_percent": 0,
      "economy_and_budget_percent": 0,

      "electricity_region_selected": "United States - NWPP"
    }

    // Electricity Master Lookup, Column G, region electricity tCO2e / kWh
    this.electricityLookup = require('../electricity_master_lookup.json')
    this.electricityRegionOptions = Object.entries(this.electricityLookup).map(([key, val]) => {
      return {
        key: key, 
        text: key
      }
    })
  }

  onChange = (e) => {
    const target = e.target
    const value = parseFloat(target.value) ? parseFloat(target.value) : 0
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  onElectricityRegionChange = (e, option, index) => {
    const regionSelected = option.key
    const emissionFactor = this.electricityLookup[regionSelected]
    this.setState({
      "electricity_region_selected": regionSelected
    })
    console.log(`Region selected: ${regionSelected}, emission factor: ${emissionFactor}`)
  }

  componentDidMount() {
    const initState = this.props.getInitState()
    if (initState["total_room_nights"]) {
      this.setState(initState)
    }
  }

  componentWillUnmount() {
    this.props.saveSectionState(this.state)
  }

  render() {

    // room nights = hotel type percent * total room nights
    const total_room_nights = this.state.total_room_nights / 100
    const upper_upscale_nights = this.state.upper_upscale_percent * total_room_nights
    const upscale_nights = this.state.upscale_percent * total_room_nights
    const midscale_w_food_beverage_nights = this.state.midscale_wo_food_beverage_percent * total_room_nights
    const midscale_wo_food_beverage_nights = this.state.midscale_wo_food_beverage_percent * total_room_nights
    const economy_and_budget_nights = this.state.economy_and_budget_percent * total_room_nights

    // Scopes 1 and 2 emissions (tCO2e) - electricity
    // electricity consumption MWh per room per night * 1000 * region electricity tCO2e / kWh
    // =$G2*1000*INDEX('Electricity MasterLookup'!$G$15:$G$208,MATCH(Hotel!$I2,'Electricity MasterLookup'!$B$15:$B$208,0))
    const eleEmissionFactor = this.electricityLookup[this.state.electricity_region_selected] * 1000  // kWh

    const upper_upscale_emi_ele = emissionFactors.electricity_uppper_upscale * eleEmissionFactor
    const upscale_emi_ele = emissionFactors.electricity_upscale * eleEmissionFactor
    const midscale_w_food_beverage_emi_ele = emissionFactors.electricity_midscale_w_food_beverage * eleEmissionFactor
    const midscale_wo_food_beverage_emi_ele = emissionFactors.electricity_midscale_wo_food_beverage  * eleEmissionFactor
    const economy_and_budget_emi_ele =  emissionFactors.electricity_economy_and_budget * eleEmissionFactor

    // Scopes 1 and 2 emissions (tCO2e) - electricity above + natural gas
    const upper_upscale_emi12 = upper_upscale_nights * (upper_upscale_emi_ele + emissionFactors.ng_uppper_upscale)
    const upscale_emi12 = upscale_nights * (upscale_emi_ele + emissionFactors.ng_upscale)
    const midscale_w_food_beverage_emi12 = midscale_w_food_beverage_nights * (midscale_w_food_beverage_emi_ele + emissionFactors.ng_midscale_w_food_beverage)
    const midscale_wo_food_beverage_emi12 = midscale_wo_food_beverage_nights * (midscale_wo_food_beverage_emi_ele + emissionFactors.ng_midscale_wo_food_beverage)
    const economy_and_budget_emi12 = economy_and_budget_nights * (economy_and_budget_emi_ele + emissionFactors.ng_economy_and_budget)

    // Scope 3 energy and fuel emissions (tCO2e)
    const upper_upscale_emi3 = upper_upscale_nights * emissionFactors.emi3_uppper_upscale
    const upscale_emi3 = upscale_nights * emissionFactors.emi3_upscale
    const midscale_w_food_beverage_emi3 = midscale_w_food_beverage_nights * emissionFactors.emi3_midscale_w_food_beverage
    const midscale_wo_food_beverage_emi3 = midscale_wo_food_beverage_nights * emissionFactors.emi3_midscale_wo_food_beverage
    const economy_and_budget_emi3 = economy_and_budget_nights * emissionFactors.emi3_economy_and_budget

    // Total of scopes 1, 2, and 3 (energy and fuel) emissions
    const upper_upscale_emi = upper_upscale_emi12 + upper_upscale_emi3
    const upscale_emi = upscale_emi12 + upscale_emi3
    const midscale_w_food_beverage_emi = midscale_w_food_beverage_emi12 + midscale_w_food_beverage_emi3
    const midscale_wo_food_beverage_emi = midscale_wo_food_beverage_emi12 + midscale_wo_food_beverage_emi3
    const economy_and_budget_emi = economy_and_budget_emi12 + economy_and_budget_emi3

    // form the hotel electricity market region selection dropdown
    const totalNightsSection = (
      <Stack tokens={{ childrenGap: 15 }}>
        <TextField
          label="Total room nights"
          name="total_room_nights"
          value={this.state.total_room_nights}
          onChange={this.onChange}
          styles={{ fieldGroup: { width: 100 } }}
        />

        <Dropdown
          label="Hotel electricity market region"
          selectedKey={this.state.electricity_region_selected}
          onChange={this.onElectricityRegionChange}
          options={this.electricityRegionOptions}
          styles={{ dropdown: { width: 300 } }}
        />
      </Stack>
    )

    const hotelPercentSection = (
      <Stack styles={sectionStyle} tokens={{ childrenGap: 10 }}>
        <Stack horizontal >
          <Text block styles={headerColStyle} >Hotel type</Text>
          <Text block styles={headerColStyle} >% room nights</Text>
          <Text block styles={headerColStyle} > </Text>
          <Text block styles={headerColStyle} >Room nights</Text>
          <Text block styles={headerColStyle} >Scope 1 and 2 (tCO2e)</Text>
          <Text block styles={headerColStyle} >Scope 3 energy (tCO2e)</Text>
          <Text block styles={headerColStyle} >Total emissions (tCO2e)</Text>
        </Stack>

        <Stack horizontal >
          <Text block styles={headerColStyle} >Upper upscale</Text>
          <TextField
            name="upper_upscale_percent"
            value={this.state.upper_upscale_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={upper_upscale_nights}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={upper_upscale_emi12}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={upper_upscale_emi3}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={upper_upscale_emi}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>

        <Stack horizontal >
          <Text block styles={headerColStyle} >Upscale</Text>
          <TextField
            name="upper_upscale_percent"
            value={this.state.upscale_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={upscale_nights}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={upscale_emi12}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={upscale_emi3}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={upscale_emi}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>

        <Stack horizontal >
          <Text block styles={headerColStyle} >Midscale with food and beverage</Text>
          <TextField
            name="upper_upscale_percent"
            value={this.state.midscale_w_food_beverage_percent}
            onChange={this.onChange}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          {emptyCol}
          <TextField
            readOnly disabled={true}
            value={midscale_wo_food_beverage_nights}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={midscale_wo_food_beverage_emi12}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={midscale_wo_food_beverage_emi3}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
          <TextField
            readOnly disabled={true}
            value={midscale_wo_food_beverage_emi}
            styles={{ fieldGroup: { width: 100 }, root: { marginRight: 30} }}
          />
        </Stack>

      </Stack> 
    )

    return (
      <div>
        <Text block styles={sectionSubtitleStyle}>Energy use associated with hotels.</Text>

        {totalNightsSection}

        {hotelPercentSection}
         
      </div>
    ) 

  }
}

export default Accommodation
