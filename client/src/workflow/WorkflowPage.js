import React from "react"
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton } from 'office-ui-fabric-react';

const labelStyles = {
  root: { marginTop: 10 }
}

class WorkflowPage extends React.Component {

  handleClickRevisitIntroduction = () => {
    this.props.showWorkflowPage(false)
  }

  render() {
    return <div>
      <DefaultButton text="Revisit the introduction" onClick={this.handleClickRevisitIntroduction}/>

      <Pivot aria-label="Basic Pivot Example">
        <PivotItem
          headerText="My Files"
          headerButtonProps={{
            'data-order': 1,
            'data-title': 'My Files Title'
          }}
        >
          <Label styles={labelStyles}>Pivot #1</Label>
        </PivotItem>
        <PivotItem headerText="Recent">
          <Label styles={labelStyles}>Pivot #2</Label>
        </PivotItem>
        <PivotItem headerText="Shared with me">
          <Label styles={labelStyles}>Pivot #3</Label>
        </PivotItem>
      </Pivot>
    </div>
  }
}

export default WorkflowPage
