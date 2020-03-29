import React from "react"
import { IStyleSet, FontWeights } from 'office-ui-fabric-react/lib/Styling'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'


const sectionHeaderStyle = {
  root: { marginTop: 30, marginBottom: 10 }
}

const sectionStyle = {
  root: { marginTop: 30 }
}

const headerColStyle = {
  root: { width: 150, fontWeight: FontWeights.semibold }
}

const totalRowStyle = {
  root: { width: 150, fontWeight: FontWeights.bold }
}

class Results extends React.Component {

  render() {
    const totalEmi = this.props.travelToEventEmi + this.props.travelAtEventEmi + this.props.accomEmi + this.props.mealsEmi + this.props.spacesEmi + this.props.materialsServicesEmi

    return (
      <div>
       <Text block variant='large' styles={sectionHeaderStyle}>Event totals</Text>

        <Stack styles={sectionStyle} tokens={{ childrenGap: 10 }}>

          <Stack horizontal>
            <Text block styles={headerColStyle}>Source </Text>
            <Text block styles={headerColStyle}>Emissions (tCO2e)</Text>
          </Stack>

          <Stack horizontal>
            <Text block styles={headerColStyle}>Travel to the event</Text>
            <Text block>{this.props.travelToEventEmi}</Text>
          </Stack>

          <Stack horizontal>
            <Text block styles={headerColStyle}>Travel at the event</Text>
            <Text block>{this.props.travelAtEventEmi}</Text>
          </Stack>

          <Stack horizontal>
            <Text block styles={headerColStyle}>Accomodation</Text>
            <Text block>{this.props.accomEmi}</Text>
          </Stack>

          <Stack horizontal>
            <Text block styles={headerColStyle}>Meals</Text>
            <Text block>{this.props.mealsEmi}</Text>
          </Stack>

          <Stack horizontal>
            <Text block styles={headerColStyle}>Meeting spaces</Text>
            <Text block>{this.props.spacesEmi}</Text>
          </Stack>

          <Stack horizontal>
            <Text block styles={headerColStyle}>Materials and services</Text>
            <Text block>{this.props.materialsServicesEmi}</Text>
          </Stack>

          <Stack horizontal>
            <Text block styles={totalRowStyle}>Total</Text>
            <Text block styles={totalRowStyle}>{totalEmi}</Text>
          </Stack>

        </Stack>
      </div>
    )
  }
}

export default Results

