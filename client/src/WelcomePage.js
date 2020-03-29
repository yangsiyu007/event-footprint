import React from "react"
import { Text } from 'office-ui-fabric-react/lib/Text';
import { PrimaryButton } from 'office-ui-fabric-react';


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
    return (
      <div>
        <Text block variant='xxLarge'>Welcome - title</Text>
        <Text block>Description..........</Text>
        
        <PrimaryButton text="Start calculating event carbon footprint" onClick={this.handleClick} />
      
      </div>
    )
  }
}

export default WelcomePage
