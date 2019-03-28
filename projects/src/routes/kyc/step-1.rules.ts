import { ValidationRules } from 'aurelia-validation';

export const Step1Rules = ValidationRules
    .ensure('firstName').required().withMessageKey('firstName')
    .ensure('lastName').required().withMessageKey('lastName')
    .rules;
