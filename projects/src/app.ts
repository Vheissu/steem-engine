import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/main.css';

import { PLATFORM } from 'aurelia-pal';
import { Router, RouterConfiguration } from 'aurelia-router';
import environment from 'environment';

export class App {
    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = environment.siteName;

        config.map([
            {
                route: ['', 'home'],
                name: 'home',
                moduleId: PLATFORM.moduleName('./routes/home'),
                nav: true,
                title: 'Home'
            },
            {
                route: 'kyc',
                name: 'kyc',
                moduleId: PLATFORM.moduleName('./routes/kyc/landing'),
                nav: true,
                title: 'Kyc'
            },
            {
                route: 'kyc/step-1',
                name: 'kyc-step-1',
                moduleId: PLATFORM.moduleName('./routes/kyc/step-1'),
                nav: false,
                title: 'Step 1'
            }
        ]);

        this.router = router;
    }
}
