import { DialogController } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class SendModal {
    constructor(private controller: DialogController) {
        this.controller.settings.lock = false;
        this.controller.settings.centerHorizontalOnly = true;
    }
}
