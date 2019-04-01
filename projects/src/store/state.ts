export interface State {
  loggedIn: boolean;
  
  user: {
      name: string;
      balances: any[];
  };

  token: any;

  investorQuestionnaire: {
      currentStep: number;
      totalSteps: number;
  }
}

export const initialState: State = {
  loggedIn: false,
  user: {
      name: '',
      balances: []
  },
  token: 0,
  investorQuestionnaire: {
      currentStep: 1,
      totalSteps: 1
  }
};
