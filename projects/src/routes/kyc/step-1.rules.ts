import { ValidationRules } from 'aurelia-validation';

export const Step1Rules = ValidationRules
    .ensure('firstName').required()
    .ensure('lastName').required()
    .rules;
