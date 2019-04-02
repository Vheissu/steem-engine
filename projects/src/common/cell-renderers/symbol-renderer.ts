export class SymbolCellRenderer {
    private eGui: any;

    init(params) {
        this.eGui = document.createElement('div');
        this.eGui.innerHTML = `${params.data.icon ? `<img class="token-icon" src="${params.data.icon}">` : ''} ${params.data.symbol}`;
        
        console.log(params);
    }

    getGui() {
        return this.eGui;
    }

    refresh(params) {
        // this.eValue.innerHTML = '';
        return true;
    }

    destroy() {
        // cleanup
    }
}
