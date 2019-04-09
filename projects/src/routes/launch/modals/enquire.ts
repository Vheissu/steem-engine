import { DialogController } from 'aurelia-dialog';
import { autoinject, lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import environment from 'environment';

@autoinject()
export class EnquireModal {
    private http;
    private item;

    private fields = {
        name: '',
        email: '',
        packageName: '',
        steemHandle: '',
        discordHandle: '',
        telegramHandle: '',
        skypeHandle: '',
        phone: '',
        otherComments: '',
        preferredCommunication: ''
    };

    constructor(private controller: DialogController, @lazy(HttpClient) private getHttpClient: () => HttpClient) {
        this.http = getHttpClient();

        this.http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(environment.NODE_API_URL);
        });

        this.controller.settings.lock = false;
        this.controller.settings.centerHorizontalOnly = true;
    }

    async activate(item) {
        this.item = item;
    }

    async send() {
        this.fields.packageName = this.item.name;

        try {
            await this.http.fetch('launchContact', {
                method: 'POST',
                body: json(this.fields)
            });

            this.controller.close(true);
        } catch (e) {
            return;
        }
    }
}
