import { Step4Model } from './../routes/kyc/step-4/step-4.model';
import { Step3Model } from './../routes/kyc/step-3/step-3.model';
import { Step2Model } from './../routes/kyc/step-2/step-2.model';
import { Step1Model } from './../routes/kyc/step-1/step-1.model';

export interface State {
  user: {
      name: string;
      balances: any[];
      totalUsdValue: number;
      loggedIn: boolean;
  };

  steemPrice: number;
  token: any;
  tokens: any[];

  investorQuestionnaire: {
      currentStep: number;
      totalSteps: number;
      step1: Step1Model;
      step2: Step2Model;
      step3: Step3Model;
      step4: Step4Model;
  }
}

export const initialState: State = {
  user: {
      name: '',
      balances: [],
      totalUsdValue: 0.00,
      loggedIn: false
  },
  steemPrice: 0,
  token: 0,
  tokens: [],
  investorQuestionnaire: {
      currentStep: 1,
      totalSteps: 1,
      step1: new Step1Model(),
      step2: new Step2Model(),
      step3: new Step3Model(),
      step4: new Step4Model()
  }
};
