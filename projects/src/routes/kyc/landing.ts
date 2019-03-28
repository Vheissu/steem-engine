import { AppRouter } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class Landing {
    constructor(private router: AppRouter) {

    }

    proceed() {
        this.router.navigateToRoute('kyc-step-1');
    }
}
