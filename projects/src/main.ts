import '@babel/polyfill';
import 'bootstrap/dist/js/bootstrap.bundle';

import { Aurelia } from 'aurelia-framework';
import environment from './environment';
import { PLATFORM } from 'aurelia-pal';

import { I18N, TCustomAttribute } from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';

import { initialState } from './store/state';
import { ValidationMessageProvider } from 'aurelia-validation';

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature(PLATFORM.moduleName('resources/index'));

    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }

    aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'));

    aurelia.use.plugin(PLATFORM.moduleName('aurelia-store', 'store'), {
        initialState: initialState,
        history: {
            undoable: false,
            limit: 10
        }
    });

    aurelia.use.plugin(PLATFORM.moduleName('aurelia-i18n'), instance => {
        let aliases = ['t', 'i18n'];
        TCustomAttribute.configureAliases(aliases);

        instance.i18next.use(Backend);

        return instance.setup({
            backend: {
                loadPath: './locales/{{lng}}/{{ns}}.json'
            },
            attributes: aliases,
            lng: environment.defaultLocale,
            ns: ['translation', 'buttons', 'errors'],
            defaultNS: 'translation',
            fallbackLng: 'en-US',
            debug: true
        });
    });

    ValidationMessageProvider.prototype.getMessage = function(key) {
        console.log(key);
        const i18n = aurelia.container.get(I18N);
        const translation = i18n.tr(`errors:${key}`);
        return this.parser.parse(translation);
    }

    ValidationMessageProvider.prototype.getDisplayName = function(propertyName, displayName) {
        if (displayName !== null && displayName !== undefined) {
          return displayName;
        }

        const i18n = aurelia.container.get(I18N);
        return i18n.tr(propertyName);
      };

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
