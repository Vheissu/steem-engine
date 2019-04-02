import { dispatchify, rehydrateFromLocalStorage } from 'aurelia-store';
import { PostRenderStep } from './resources/pipeline-steps/postrender';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import '../../styles/main.css';
import './styles/main.css';

import { PLATFORM } from 'aurelia-pal';
import { Router, RouterConfiguration } from 'aurelia-router';
import environment from 'environment';
import { loadTokens } from 'store/actions';

export class App {
    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = environment.siteName;

        config.addPipelineStep('postRender', PostRenderStep);
        config.map([
            {
                route: ['', 'home'],
                name: 'home',
                moduleId: PLATFORM.moduleName('./routes/home'),
                nav: true,
                title: 'Home'
            },
            {
                route: 'projects/:project?',
                name: 'projects',
                moduleId: PLATFORM.moduleName('./routes/projects/projects'),
                nav: false,
                title: 'Projects'
            },
            {
                route: 'balances/:user?',
                name: 'balances',
                moduleId: PLATFORM.moduleName('./routes/balances'),
                nav: false,
                title: 'Balances'
            },
            {
                route: 'kyc',
                name: 'kyc',
                moduleId: PLATFORM.moduleName('./routes/kyc/landing'),
                nav: true,
                title: 'Kyc'
            },
            {
                route: 'pricing',
                name: 'pricing',
                moduleId: PLATFORM.moduleName('./routes/pricing'),
                nav: true,
                title: 'Pricing'
            },
            {
                route: 'pricing-enquire',
                name: 'pricingEnquire',
                moduleId: PLATFORM.moduleName('./routes/pricing-enquire'),
                nav: false,
                title: 'Pricing Enquire'
            },
            {
                route: 'kyc/questionnaire',
                name: 'questionnaire',
                moduleId: PLATFORM.moduleName('./routes/kyc/investor-questionnaire'),
                nav: false,
                title: 'Investor Questionnaire'
            }
        ]);

        this.router = router;
    }

    attached() {
        dispatchify(rehydrateFromLocalStorage)();
    }
}
