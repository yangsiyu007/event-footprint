import React from "react"
import { Text } from 'office-ui-fabric-react/lib/Text'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Link } from 'office-ui-fabric-react/lib/Link'


const pageStyles = { 
  paddingLeft: 30, 
  paddingRight: 30,
  paddingTop: 30
}

const centerElement = {
  textAlign: 'center',
  marginTop: 30
}

class WelcomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  // This experimental public class fields syntax ensures `this` is bound within handleClick
  // enabled by default in Create React App
  handleNewEvent = () => {
    this.props.showWorkflowPage(true)
  }

  handlePastEvent = () => {
    console.log('Open saved event')
  }
  
  render() {
    const tokens = {
      stackTokens: {
        childrenGap: 40
      },
      sectionStack: {
        childrenGap: 45,
        maxWidth: 700
      },
      headingStack: {
        childrenGap: 15
      }
    }

    return (
      <div style={pageStyles}>
        <Text block variant='xxLarge' style={centerElement}>Event Carbon Footprint Calculator</Text>
        <Text block style={centerElement}>A pilot tool for calculating the carbon emission of an event.</Text>

        <Stack horizontal tokens={tokens.stackTokens} horizontalAlign="center" 
               style={{marginTop: 100, marginBottom: 100}}>
          <PrimaryButton alignItems="center" text="Calculate new event" onClick={this.handleNewEvent} />
          <DefaultButton alignItems="center" text="Open saved event" onClick={this.handlePastEvent} />
        </Stack>

        <Stack horizontal tokens={tokens.stackTokens} horizontalAlign="space-evenly" 
               style={{marginBottom: 200, marginLeft: 100, marginRight: 100}}>
          
          <Stack tokens={tokens.sectionStack}>

            <Stack tokens={tokens.headingStack}>
              <Text variant={'xLarge'} block>
                What you'll need to use this tool
              </Text>
              <Text>
                Information on the flights, accommodation type, food services and venue of the event. 
              </Text>
              <Text>
                Use best estimates when you do not have all the information.
              </Text>
            </Stack>

            <Stack tokens={tokens.headingStack}>
              <Text variant={'xLarge'} block>
                Why it matters
              </Text>
              <Text>
                What gets measured gets managed! Every employee event draws energy. To be truly
                sustainable, we must rack and offset our energy use.
              </Text>
            </Stack>

            <Stack tokens={tokens.headingStack}>
              <Text variant={'xLarge'} block>
                What are carbon offsets?
              </Text>
              <Text>
                A carbon offset is a reduction in emissions of carbon dioxide or another greenhouse gas
                made in order to compensate for emissions made elsewhere, by funding actions like
                planting trees.
              </Text>
              <Text>
                For example, an individual might purchase carbon offsets to compensate for the greenhouse
                gas emissions caused by personal air travel.
              </Text>
            </Stack>

          </Stack>


          <Stack tokens={tokens.sectionStack}>

            <Stack tokens={tokens.headingStack}>
              <Text variant={'xLarge'} block>
                Does your event have swag?
              </Text>
              <Text>
                Consider choosing items from this list to be more environmentally and socially 
                responsible! (link to more information)
              </Text>
            </Stack>

            <Stack tokens={tokens.headingStack}>
              <Text variant={'xLarge'} block>
              Have you taken measures to reduce the amount of waste at your event?
              </Text>
              <Text>
                Consider these tips (link)
              </Text>
            </Stack>

            <Stack tokens={tokens.headingStack}>
              <Text variant={'xLarge'} block>
                Are you aware of measures you can take to reduce travel or make essential travel more sustainable?
              </Text>
              <Text>
              <Link href="https://app.tripism.io/trip-board/5d7a574605a8f000badbd87f">Here's a helpful list
              </Link> of ways to stay connected.
              </Text>
            </Stack>

          </Stack>

        </Stack>

      </div>
    )
  }
}

export default WelcomePage
