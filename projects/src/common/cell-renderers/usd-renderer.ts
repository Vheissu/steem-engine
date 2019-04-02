import { usdFormat } from 'common/functions';

export class USDCellRenderer {
    private eGui: any;


    init(params) {
        this.eGui = document.createElement('div');
        this.eGui.innerHTML = `${params.value ? usdFormat(params.value) : '--'}`;
    }

    getGui() {
        return this.eGui;
    }

    refresh(params) {
        this.eGui.innerHTML = `${params.data.icon ? `<img class="token-icon" src="${params.data.icon}">` : ''} ${params.data.symbol}`;
        return true;
    }

    destroy() {
        // cleanup
    }
}
