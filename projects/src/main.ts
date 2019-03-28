import '@babel/polyfill';
import 'bootstrap';
import {Aurelia} from 'aurelia-framework';
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';

import { I18N, TCustomAttribute } from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));

    aurelia.use.plugin(PLATFORM.moduleName('aurelia-i18n'), instance => {
        let aliases = ['t', 'i18n'];
        TCustomAttribute.configureAliases(aliases);

        // register backend plugin
        instance.i18next.use(Backend);

        return instance.setup({
            backend: {
                loadPath: './locales/{{lng}}/{{ns}}.json'
            },
            attributes: aliases,
            lng: environment.defaultLocale,
            ns: ['translation', 'headings', 'buttons'],
            defaultNS: 'translation',
            fallbackLng: 'en',
            debug: false
        });
    });

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
