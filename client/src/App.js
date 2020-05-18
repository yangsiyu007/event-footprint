import React from "react"
import { Customizer } from 'office-ui-fabric-react'
import { M365LightTheme } from  '@m365-admin/customizations'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'

import WelcomePage from './WelcomePage'
import WorkflowPage from './workflow/WorkflowPage'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showWorkflowPage: false
    }
    initializeIcons(/* optional base url */)
  }

  showWorkflowPage = (show) => {
    this.setState({showWorkflowPage: show})
  }

  render() {
    if (this.state.showWorkflowPage) {
      return (
        <Customizer settings={{ theme: M365LightTheme.settings.theme }}>
          <WorkflowPage showWorkflowPage={this.showWorkflowPage}/>
        </Customizer>
      )
    }
    return <WelcomePage showWorkflowPage={this.showWorkflowPage}/>
  }
}

export default App
