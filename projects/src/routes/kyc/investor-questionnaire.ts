import { BootstrapFormRenderer } from './../../resources/bootstrap-form-renderer';
import { Store, connectTo } from 'aurelia-store';
import { autoinject, NewInstance, newInstance } from 'aurelia-framework';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { State } from 'store/state';

import { Step1Rules } from './step-1.rules';
import { Step2Rules } from './step-2.rules';
import { Step3Rules } from './step-3.rules';

@connectTo()
@autoinject()
export class InvestorQuestionnaire {
    private state: State;
    private renderer;

    private steps = {
        step1: {},
        step2: {},
        step3: {}
    };

    constructor(
        private store: Store<State>,
        @newInstance() private step1Controller: ValidationController,
        @newInstance() private step2Controller: ValidationController,
        @newInstance() private step3Controller: ValidationController,
    ) {
        this.store.registerAction('nextStep', this.nextStep);
        this.store.registerAction('setTotalSteps', this.setTotalSteps);
    }

    bind() {
        this.renderer = new BootstrapFormRenderer();

        this.step1Controller.addRenderer(this.renderer);
        this.step2Controller.addRenderer(this.renderer);
        this.step3Controller.addRenderer(this.renderer);

        this.step1Controller.addObject(this.steps.step1, Step1Rules);
        this.step2Controller.addObject(this.steps.step2, Step2Rules);
        this.step3Controller.addObject(this.steps.step3, Step3Rules);
    }

    unbind() {
        this.step1Controller.removeRenderer(this.renderer);
        this.step2Controller.removeRenderer(this.renderer);
        this.step3Controller.removeRenderer(this.renderer);
    }

    attached() {
        this.store.dispatch('setTotalSteps', (Object.keys(this.steps).length));
    }

    async formSubmit(event: Event) {
        event.preventDefault();

        const currentStep = this.state.investorQuestionnaire.currentStep;

        if (currentStep === 1) {
            const result = await this.step1Controller.validate();
            
            if (!result.valid) {
                return;
            }
        } else if (currentStep === 2) {
            const result = await this.step2Controller.validate();

            console.log(result);

            if (!result.valid) {
                return;
            }
        } else if (currentStep === 3) {
            const result = await this.step3Controller.validate();

            console.log(result);

            if (!result.valid) {
                return;
            }
        }

        this.store.dispatch('nextStep');
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
