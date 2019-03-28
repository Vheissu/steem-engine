import { ValidationRules } from 'aurelia-validation';

export const Step3Rules = ValidationRules
    .ensure('entityName').required().withMessageKey('entityName')
    .ensure('entityState').required().withMessageKey('entityState')
    .when((o: any) => !o.notAnEntity)
    .rules;
