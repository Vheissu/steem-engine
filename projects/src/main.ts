import '@babel/polyfill';
import 'bootstrap';
import {Aurelia} from 'aurelia-framework';
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
