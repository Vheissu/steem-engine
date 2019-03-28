import { Step2Rules } from './step-2.rules';
import { Store, connectTo } from 'aurelia-store';
import { autoinject, NewInstance, newInstance } from 'aurelia-framework';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { State } from 'store/state';

import { Step1Rules } from './step-1.rules';

@connectTo()
@autoinject()
export class InvestorQuestionnaire {
    private state: State;

    private steps = {
        step1: {},
        step2: {}
    };

    constructor(
        private store: Store<State>,
        @newInstance() private step1Controller: ValidationController,
        @newInstance() private step2Controller: ValidationController
    ) {
        this.store.registerAction('nextStep', this.nextStep);
        this.store.registerAction('setTotalSteps', this.setTotalSteps);

        this.step1Controller.addObject(this.steps.step1, Step1Rules);
        this.step2Controller.addObject(this.steps.step2, Step2Rules);
    }

    attached() {
        this.store.dispatch('setTotalSteps', (Object.keys(this.steps).length));
    }

    async formSubmit(event: Event) {
        event.preventDefault();

        const currentStep = this.state.investorQuestionnaire.currentStep;

        if (currentStep === 1) {
            const result = await this.step1Controller.validate();
            console.log(result);
        }

        //this.store.dispatch('nextStep');
    }

    setTotalSteps(state: State, total: number) {
        const newState = { ...state };

        newState.investorQuestionnaire.totalSteps = total;

        return newState; 
    }

    nextStep(state: State) {
        const newState = { ...state };
        
        const currentStep = newState.investorQuestionnaire.currentStep;
        const totalSteps = newState.investorQuestionnaire.totalSteps;

        if ( (currentStep + 1) <= totalSteps ) {
            newState.investorQuestionnaire.currentStep++;
        }

        return newState;
    }
}
