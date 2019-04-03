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
import { Router, RouterConfiguration, activationStrategy } from 'aurelia-router';

import { pluck } from 'rxjs/operators';

import environment from 'environment';

import 'store/store';
import { loadSteemPrice } from 'store/actions';
import { Subscription } from 'rxjs';

@autoinject()
@connectTo()
export class App {
    public router: Router;
    private year = new Date().getFullYear();
    private stateSubscription: Subscription;

    constructor(private store: Store<State>) {

    }

    bind() {
        this.stateSubscription = this.store.state.pipe(pluck('steemPrice')).subscribe(price => {
            if (price) {
                window.steem_price = price;
            }
        });
    }

    unbind() {
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
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
                activationStrategy: activationStrategy.invokeLifecycle,
                href: '/tokens',
                title: 'Tokens'
            },
            {
                route: 'market/:token?',
                name: 'market',
                moduleId: PLATFORM.moduleName('./routes/market'),
                nav: true,
                activationStrategy: activationStrategy.replace,
                href: '/market/ENG',
                title: 'Market'
            },
            {
                route: 'projects/:project?',
                name: 'projects',
                moduleId: PLATFORM.moduleName('./routes/projects/projects'),
                nav: true,
                activationStrategy: activationStrategy.invokeLifecycle,
                href: '/projects',
                title: 'Projects'
            },
            {
                route: 'balances/:user?',
                name: 'wallet',
                moduleId: PLATFORM.moduleName('./routes/balances'),
                nav: true,
                href: '/balances',
                title: 'Wallet'
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

    attached() {
        this.store.dispatch(loadSteemPrice);
    }
}
