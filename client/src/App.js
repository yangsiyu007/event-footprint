import React from "react"

import WelcomePage from './WelcomePage'
import WorkflowPage from './workflow/WorkflowPage'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showWorkflowPage: false
    }
  }

  showWorkflowPage = (show) => {
    this.setState({showWorkflowPage: show})
  }

  render() {
    if (this.state.showWorkflowPage) {
      return <WorkflowPage showWorkflowPage={this.showWorkflowPage}/>
    }
    return <WelcomePage showWorkflowPage={this.showWorkflowPage}/>
  }
}

export default App
