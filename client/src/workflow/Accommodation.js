import React from "react"
import { Text } from 'office-ui-fabric-react/lib/Text'
import { emissionFactors } from '../EmissionFactors'


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
      "economy_and_budget_percent": 0
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
    const initState = this.props.getInitState()
    if (initState['total_room_nights']) {
      this.setState(initState)
    }
  }

  componentWillUnmount() {
    this.props.saveSectionState(this.state)
  }

  render() {

    return (
      <div>
        <Text block styles={sectionSubtitleStyle}>Energy use associated with hotels.</Text>


         
      </div>
    ) 

  }
}

export default Accommodation
