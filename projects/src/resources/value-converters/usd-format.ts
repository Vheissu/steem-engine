import { usdFormat } from 'common/functions';

export class UsdFormatValueConverter {
    toView(value, steemPrice, decimalLimit) {
        if (!value) {
            return value;
        }

        return usdFormat(value, steemPrice, decimalLimit);
    }
}
