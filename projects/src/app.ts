import { State } from 'store/state';
import { Store, } from 'aurelia-store';

import { PreRenderStep } from './resources/pipeline-steps/prerender';
import { PostRenderStep } from './resources/pipeline-steps/postrender';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import '../../styles/main.css';
import './styles/main.css';

import { PLATFORM } from 'aurelia-pal';
import { autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

import environment from 'environment';

import 'store/store';

@autoinject()
export class App {
    public router: Router;
    private year = new Date().getFullYear();

    constructor(private store: Store<State>) {

    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = environment.siteName;

        config.addPipelineStep('preRender', PreRenderStep);
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
}
