import React from "react"
import { DefaultButton, classNamesFunction, IStyle, TextField } from 'office-ui-fabric-react'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'
import {  
  SubwayNavNodeState, 
  FullPageWizard, 
  WizardActionBar,
  canGoToNextStep,
  goToNextStep,
  goToPreviousStep,
  canGoToPreviousStep,
  goToStepById,
  areWizardStepPropsValid
} from '@m365-admin/admin-controls'
import { default as ROPoly } from 'resize-observer-polyfill'

import TravelToEvent from './TravelToEvent'
import TravelAtEvent from './TravelAtEvent'
import Results from './Results'


const pageStyle = { 
  paddingLeft: 30, 
  paddingRight: 30,
  paddingTop: 10
}

const sectionHeaderStyle = {
  root: { marginBottom: 10 }
}

const stackItemStyles = {
  root: {
    alignItems: 'left',
    display: 'flex'
  }
}

const wizardStyles = {
  width: '100%',
  height: 1000
}

class WorkflowPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // state of each section is saved here so they persist as user switches pivot
      'travelToEvent': {},
      'travelAtEvent': {},

      // Wizard navigation
      wizardProps: {
        steps: this.getSteps(),
        wizardComplete: false,
        wizardCompleteStep: this.getCompletedStep()
      }
    }

    this.travelToEventEmi = 0
    this.travelAtEventEmi = 0
    this.accomEmi = 0
    this.mealsEmi = 0
    this.spacesEmi = 0
    this.materialsServicesEmi = 0
  
  }

  goToSaveCloseStepAction = () => {
    return {
      title: 'Save and close',
      onClick: () => {
        console.log('Save and close clicked');
      }
    }
  }
  goToCancelStepAction = () => {
    return {
      title: 'Cancel',
      onClick: () => {
        console.log('Cancel clicked');
      }
    }
  }
  goToPrevStepAction = () => {
    return {
      title: 'Back',
      onClick: () => {
        // if we are at the begining, previous steps is undefined and no action is taken
        if (canGoToPreviousStep(this.state.wizardProps.steps)) {
          // Most consumers would perform some logic here to decide which state is correct.
          const { steps, newCurrentStep: previousOrNextStep } = goToPreviousStep(
            this.state.wizardProps.steps,
            SubwayNavNodeState.ViewedNotCompleted
          )

          if (steps) {
            this.setState({ wizardProps: { steps } })

            console.log('Now at step : ' + previousOrNextStep.label)
          } else {
            console.log('Oops, something happened when trying to go to the previous steps')
          }
        }
      }
    }
  }
  goToNextStepAction = () => {
    return {
      title: 'Next',
      onClick: () => {
        // if we are at the end nextStep is undefined and no action is taken
        if (canGoToNextStep(this.state.wizardProps.steps)) {
          // Most consumers would perform some logic here to decide which state is correct.
          const { steps, newCurrentStep } = goToNextStep(
            this.state.wizardProps.steps,
            SubwayNavNodeState.ViewedNotCompleted
          );

          if (steps) {
            this.setState({ wizardProps: { steps } })

            console.log('Now at step : ' + newCurrentStep.label)
          } else {
            console.log('Oops, something happened when trying to go to the next steps')
          }
        }
      }
    }
  }

  handleClickStep = (step) => {
    const computedSteps = goToStepById(this.state.wizardProps.steps, step.id, SubwayNavNodeState.Unsaved).steps

    this.setState({ wizardProps: { steps: computedSteps } })

    console.log('Clicked step : ' + step.label)
  }

  getContentTitleElement = (stepStr) => {
    return (
      <Text block variant='large' styles={sectionHeaderStyle}>{stepStr}</Text>
    )
  }

  getSteps = () => {
    const firstFooter = (
      <>
        <WizardActionBar
          mainAction={this.goToNextStepAction()}
          savecloseAction={this.goToSaveCloseStepAction()}
          cancelAction={this.goToCancelStepAction()}
          currentStep={{}}
          // If you need to support browsers that don't have Resize Observer like IE11 or Safari,
          // please use a ponyfill like this.
          {...(typeof ResizeObserver === 'undefined' && { resizeObserverRef: ROPoly })}
        />
      </>
    )
    const inBetweenFooter = (
      <>
        <WizardActionBar
          backAction={this.goToPrevStepAction()}
          mainAction={this.goToNextStepAction()}
          savecloseAction={this.goToSaveCloseStepAction()}
          cancelAction={this.goToCancelStepAction()}
          currentStep={{}}
          {...(typeof ResizeObserver === 'undefined' && { resizeObserverRef: ROPoly })}
        />
      </>
    )
    const lastFooter = (
      <>
        <WizardActionBar
          mainAction={this.goToPrevStepAction()}
          savecloseAction={this.goToSaveCloseStepAction()}
          cancelAction={this.goToCancelStepAction()}
          currentStep={{}}
          {...(typeof ResizeObserver === 'undefined' && { resizeObserverRef: ROPoly })}
        />
      </>
    )

    /****
     * 
     * <TravelToEvent 
            initState={curState.travelToEvent}
            saveSectionState={this.saveSectionState.bind(this, 'travelToEvent')}
            recordEmissionFromSection={this.recordEmissionFromSection.bind(this, 'travelToEvent')}
          />

<TravelAtEvent 
            initState={curState.travelAtEvent}
            saveSectionState={this.saveSectionState.bind(this, 'travelAtEvent')}
            recordEmissionFromSection={this.recordEmissionFromSection.bind(this, 'travelAtEvent')}
          />
     */
    
    return [
      {
        id: '0',
        label: 'Travel to event',
        onClickStep: this.handleClickStep,
        state: SubwayNavNodeState.Current,
        footerElement: firstFooter,
        wizardContent: {
          contentTitleElement: this.getContentTitleElement('Travel to event'),
          content: <TravelToEvent 
            getInitState={this.getInitState.bind(this, 'travelToEvent')}
            saveSectionState={this.saveSectionState.bind(this, 'travelToEvent')}
            recordEmissionFromSection={this.recordEmissionFromSection.bind(this, 'travelToEvent')}
          />
        }
      },
      {
        id: '1',
        label: 'Travel at event',
        onClickStep: this.handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: inBetweenFooter,
        wizardContent: {
          contentTitleElement: this.getContentTitleElement('Travel at event'),
          content: <div>Not yet implemented</div>
        }
      },
      {
        id: '2',
        label: 'Accomodation',
        onClickStep: this.handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: inBetweenFooter,
        wizardContent: {
          contentTitleElement: this.getContentTitleElement('Accomodation'),
          content: <div>Not yet implemented</div>
        }
      },
      {
        id: '3',
        label: 'Meals',
        onClickStep: this.handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: inBetweenFooter,
        wizardContent: {
          contentTitleElement: this.getContentTitleElement('Meals'),
          content: <div>Not yet implemented</div>
        }
      },
      {
        id: '4',
        label: 'Meeting spaces',
        onClickStep: this.handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: inBetweenFooter,
        wizardContent: {
          contentTitleElement: this.getContentTitleElement('Meeting spaces'),
          content: <div>Not yet implemented</div>
        }
      },
      {
        id: '5',
        label: 'Waste',
        onClickStep: this.handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: inBetweenFooter,
        wizardContent: {
          contentTitleElement: this.getContentTitleElement('Waste'),
          content: <div>Not yet implemented</div>
        }
      },
      {
        id: '6',
        label: 'Materials and services',
        onClickStep: this.handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: lastFooter,
        wizardContent: {
          contentTitleElement: this.getContentTitleElement('Materials and services'),
          content: <div>Not yet implemented</div>
        }
      }
    ]
  }

  getCompletedStep = () => {
    console.log('getCompletedStep called')
  }

  handleClickRevisitIntroduction = () => {
    this.props.showWorkflowPage(false)
  }

  getPageState = (sectionName) => {
    switch (sectionName) {
      case 'travelToEvent':
        return this.state.travelToEvent
      default:
        console.warn('getPageState default case hit')
    }
  }

  getInitState = (sectionName) => {
    switch (sectionName) {
      case 'travelToEvent':
        return this.state.travelToEvent
      default:
        console.warn('getInitState default case hit')
    }
  }

  recordEmissionFromSection = (sectionName, emissionAmount) => {
    switch (sectionName) {
      case 'travelToEvent':
        this.travelToEventEmi = emissionAmount
        break
      case 'travelAtEvent':
        this.travelAtEventEmi = emissionAmount
        break
      case 'accom': 
        this.accomEmi = emissionAmount
        break
      case 'meals':
        this.mealsEmi = emissionAmount
        break
      case 'spaces':
        this.spacesEmi = emissionAmount
        break
      case 'materialsServices':
        this.materialsServicesEmi = emissionAmount
        break
      default:
        console.warn('WorkflowPage, recordEmissionFromSection, unknown section name: ', sectionName)
    }
  }

  saveSectionState = (sectionName, sectionState) => {
    this.setState({
      [sectionName]: sectionState
    })
  }

  render() {

    const tokens = {
      stackTokens: {
        childrenGap: 20
      }
    }

    return (
      <div style={pageStyle}>
        <DefaultButton text="Restart" onClick={this.handleClickRevisitIntroduction}/>

        <Stack horizontal tokens={tokens.stackTokens}>
          <Stack.Item grow={4} styles={stackItemStyles}>
            <div style={wizardStyles}>
              <FullPageWizard
                // If you need to support browsers that don't have Resize Observer like IE11 or Safari,
                // please use a ponyfill like this.
                wizardProps={{
                  ...this.state.wizardProps,
                  ...(typeof ResizeObserver === 'undefined' && { resizeObserverRef: ROPoly })
                }}
                title="Event"
              />
            </div>
          </Stack.Item>

          <Stack.Item grow styles={stackItemStyles}>
            <Results 
              travelToEventEmi={this.travelToEventEmi}
              travelAtEventEmi={this.travelAtEventEmi}
              accomEmi={this.accomEmi}
              mealsEmi={this.mealsEmi}
              spacesEmi={this.spacesEmi}
              materialsServicesEmi={this.materialsServicesEmi}
            />
          </Stack.Item>
          


        </Stack>
      </div>
    )
  }
}

export default WorkflowPage
