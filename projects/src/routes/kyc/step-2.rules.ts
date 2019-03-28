import { ValidationRules } from 'aurelia-validation';

export const Step2Rules = ValidationRules
    .ensure('contactMethod').required()
    .rules;
