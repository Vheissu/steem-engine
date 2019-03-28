import { ValidationRules } from 'aurelia-validation';

export const Step2Rules = ValidationRules
    .ensure('contactMethod').required()
    .ensure('contactMethodAlternative').required()
    .when((o: any) => o.contactMethod === 'other')
    .rules;
