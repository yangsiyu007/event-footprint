import React from "react"
import { Text } from "office-ui-fabric-react/lib/Text"
import { TextField } from "office-ui-fabric-react/lib/TextField"
import { Stack } from "office-ui-fabric-react/lib/Stack"
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from "office-ui-fabric-react/lib/Dropdown"
import { emissionFactors } from "../EmissionFactors"


const sectionSubtitleStyle = {
  root: { marginBottom: 20 }
}


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

    this.electricityLookup = require('../electricity_master_lookup.json')
    console.log(this.electricityLookup)

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

    return (
      <div>
        <Text block styles={sectionSubtitleStyle}>Energy use associated with hotels.</Text>

        {totalNightsSection}
         
      </div>
    ) 

  }
}

export default Accommodation
