import { MaintenanceStep } from './resources/pipeline-steps/maintenance';
import { State } from 'store/state';
import { Store, connectTo, } from 'aurelia-store';

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
@connectTo()
export class App {
    public router: Router;
    private year = new Date().getFullYear();

    constructor(private store: Store<State>) {

    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = environment.siteName;

        config.addPipelineStep('authorize', MaintenanceStep);
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
                route: 'maintenance',
                name: 'maintenance',
                moduleId: PLATFORM.moduleName('./routes/maintenance'),
                nav: false,
                title: 'Maintenance'
            },
            {
                route: 'tokens/:token?',
                name: 'tokens',
                moduleId: PLATFORM.moduleName('./routes/tokens'),
                nav: true,
                href: '/tokens',
                title: 'Tokens'
            },
            {
                route: 'market/:token?',
                name: 'market',
                moduleId: PLATFORM.moduleName('./routes/market'),
                nav: true,
                href: '/market/ENG',
                title: 'Market'
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
                route: 'sign-in',
                name: 'signin',
                moduleId: PLATFORM.moduleName('./routes/sign-in'),
                nav: false,
                title: 'Signin'
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
