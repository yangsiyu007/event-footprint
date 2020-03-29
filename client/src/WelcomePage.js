import React from "react"
import { Text } from 'office-ui-fabric-react/lib/Text'
import { PrimaryButton } from 'office-ui-fabric-react'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Separator } from 'office-ui-fabric-react/lib/Separator'
import { Link } from 'office-ui-fabric-react/lib/Link'


const pageStyles = { 
  paddingLeft: 30, 
  paddingRight: 30,
  paddingTop: 30
}


class WelcomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  // This experimental public class fields syntax ensures `this` is bound within handleClick
  // enabled by default in Create React App
  handleClick = () => {
    this.props.showWorkflowPage(true)
  }
  
  render() {
    const tokens = {
      sectionStack: {
        childrenGap: 10
      },
      headingStack: {
        childrenGap: 5
      }
    }

    return (
      <div style={pageStyles}>
        <Text block variant='xxLarge'>Event Carbon Footprint Calculator</Text>
        <Text block>A pilot tool for calculating the carbon emission of an event.</Text>

        <Stack tokens={tokens.sectionStack}>

          <Stack tokens={tokens.headingStack}>
            <Text variant={'large'} block>
              Purpose
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </Stack>

          <Stack tokens={tokens.headingStack}>
            <Text variant={'large'} block>
              What information do you need to use this tool?
            </Text>
            <Text>
              Information on the flights, accomodation type, food services and venue of the event.

              Use best estimates when you do not have all the information.
            </Text>
          </Stack>

        </Stack>

        <PrimaryButton text="Get started" onClick={this.handleClick} />
      

        <Separator />

        <Stack tokens={tokens.sectionStack}>

          <Stack tokens={tokens.headingStack}>
            <Text variant={'large'} block>
              What is carbon offset?
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Stack>

          <Stack tokens={tokens.headingStack}>
            <Text variant={'large'} block>
              Does your event have swag? 
            </Text>
            <Text>
              Consider choosing items from this list to be more environmentally and socially responsible! (link to more information)
            </Text>
          </Stack>

          <Stack tokens={tokens.headingStack}>
            <Text variant={'large'} block>
              Have you taken measures to reduce the amount of waste at your event?
            </Text>
            <Text>
              Consider these tips! (link to more information)
            </Text>
          </Stack>

          <Stack tokens={tokens.headingStack}>
            <Text variant={'large'} block>
              Are you aware of measures you can take to reduce travel or make essential travel more sustainable?
            </Text>
            <Text>
            <Link href="https://app.tripism.io/trip-board/5d7a574605a8f000badbd87f">Draft site</Link>
            </Text>
          </Stack>

        </Stack>


      </div>
    )
  }
}

export default WelcomePage
