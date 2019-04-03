import { DialogService } from 'aurelia-dialog';
import { State } from 'store/state';
import { dispatchify, Store } from 'aurelia-store';
import uniq from 'lodash/uniq';
import fill from 'lodash/fill';
import { computedFrom } from 'aurelia-binding';
import { usdFormat } from 'common/functions';
import { loadSteemPrice, loadTokens, loadBuyBook, loadSellBook, loadTradesHistory, loadUserBalances, loadUserSellBook, loadUserBuyBook } from 'store/actions';
import { SteemEngine } from 'services/steem-engine';
import { autoinject } from 'aurelia-framework';

const Data = {
    "token": "ENG",
    "precision": 8,
    "buy_orders": [
      {
        "txId": "6399fa9890ecc19aadab9e21d6cd7eda7e95660d",
        "timestamp": 1554184758,
        "account": "navorn",
        "symbol": "ENG",
        "quantity": "0.59627900",
        "price": "0.93800",
        "tokensLocked": "0.560",
        "expiration": 1556776758,
        "$loki": 4085,
        "total": 0.559309702,
        "amountLocked": 0.559309702
      },
      {
        "txId": "1ff7ff81a9537984b60ce95dde13fbefd5da9dbf",
        "timestamp": 1554244902,
        "account": "indextrader24",
        "symbol": "ENG",
        "quantity": "5",
        "price": "0.818",
        "tokensLocked": "4.090",
        "expiration": 1556836902,
        "$loki": 4171,
        "total": 4.649309702,
        "amountLocked": 4.09
      },
      {
        "txId": "08f14bb215cadef11cf390bd74c67adef58d1085",
        "timestamp": 1554225840,
        "account": "virtualgrowth",
        "symbol": "ENG",
        "quantity": "1",
        "price": "0.81800",
        "tokensLocked": "0.818",
        "expiration": 1556817840,
        "$loki": 4131,
        "total": 5.467309702,
        "amountLocked": 0.818
      },
      {
        "txId": "ddfe075fa6751bb26d8de1fe5d96ad94b34bd277",
        "timestamp": 1554216645,
        "account": "cryptomancer",
        "symbol": "ENG",
        "quantity": "500",
        "price": "0.81700",
        "tokensLocked": "408.500",
        "expiration": 1556808645,
        "$loki": 4119,
        "total": 413.967309702,
        "amountLocked": 408.5
      },
      {
        "txId": "b6a436ba053670a72ebf8414488a0815d19cbac2",
        "timestamp": 1554176460,
        "account": "tradingideas",
        "symbol": "ENG",
        "quantity": "200",
        "price": "0.81600",
        "tokensLocked": "163.200",
        "expiration": 1556768460,
        "$loki": 4076,
        "total": 577.167309702,
        "amountLocked": 163.2
      },
      {
        "txId": "e017cbd2267f128436b194a095d930f9a9954e60",
        "timestamp": 1554152070,
        "account": "garagebill",
        "symbol": "ENG",
        "quantity": "8.00000000",
        "price": "0.815",
        "tokensLocked": "6.520",
        "expiration": 1556744070,
        "$loki": 4052,
        "total": 583.687309702,
        "amountLocked": 6.52
      },
      {
        "txId": "b25ec8e2361123eae4da55e727e63bf08ef51df2",
        "timestamp": 1554143496,
        "account": "jarvie",
        "symbol": "ENG",
        "quantity": "40",
        "price": ".812",
        "tokensLocked": "32.480",
        "expiration": 1556735496,
        "$loki": 4040,
        "total": 616.167309702,
        "amountLocked": 32.480000000000004
      },
      {
        "txId": "7b46714996d465ff0ffd742839127b2dcfdf919c",
        "timestamp": 1554108141,
        "account": "tradingideas",
        "symbol": "ENG",
        "quantity": "200",
        "price": "0.81100",
        "tokensLocked": "162.200",
        "expiration": 1556700141,
        "$loki": 3992,
        "total": 778.3673097020001,
        "amountLocked": 162.20000000000002
      },
      {
        "txId": "86709b430de70ad95e27976ba07838804b3ef267",
        "timestamp": 1554100092,
        "account": "themarkymark",
        "symbol": "ENG",
        "quantity": "4",
        "price": ".801",
        "tokensLocked": "3.204",
        "expiration": 1556692092,
        "$loki": 3985,
        "total": 781.571309702,
        "amountLocked": 3.204
      },
      {
        "txId": "ed99847abe486d1dc8fde52c2394c4c95d162d5f",
        "timestamp": 1554084459,
        "account": "garagebill",
        "symbol": "ENG",
        "quantity": "10",
        "price": "0.767",
        "tokensLocked": "7.670",
        "expiration": 1556676459,
        "$loki": 3947,
        "total": 789.241309702,
        "amountLocked": 7.67
      },
      {
        "txId": "1886940af346dfc99e105b33d99603128a82b29b",
        "timestamp": 1553034084,
        "account": "jarvie",
        "symbol": "ENG",
        "quantity": "1",
        "price": ".766",
        "tokensLocked": "0.766",
        "expiration": 1555626084,
        "$loki": 1714,
        "total": 790.0073097019999,
        "amountLocked": 0.766
      },
      {
        "txId": "8e6392a46779b2b990fb53c5f685946ec5c9a9fb",
        "timestamp": 1553029251,
        "account": "havok777",
        "symbol": "ENG",
        "quantity": "1",
        "price": "0.76400",
        "tokensLocked": "0.764",
        "expiration": 1555621251,
        "$loki": 1696,
        "total": 790.7713097019999,
        "amountLocked": 0.764
      },
      {
        "txId": "1bab9cf178e64d2bcd3d63ef69a5c9a4553d13af",
        "timestamp": 1553023152,
        "account": "themarkymark",
        "symbol": "ENG",
        "quantity": "9.20000000",
        "price": ".763",
        "tokensLocked": "7.020",
        "expiration": 1555615152,
        "$loki": 1676,
        "total": 797.7909097019999,
        "amountLocked": 7.0196
      },
      {
        "txId": "3457bd7bb7b16b4fe30302e27eb62d2ba3eb6aa1",
        "timestamp": 1552979451,
        "account": "themarkymark",
        "symbol": "ENG",
        "quantity": "21",
        "price": ".762",
        "tokensLocked": "16.002",
        "expiration": 1555571451,
        "$loki": 1590,
        "total": 813.7929097019999,
        "amountLocked": 16.002
      },
      {
        "txId": "c62f9a2c385be978034e8329e7ee68eaf4fbcfe5",
        "timestamp": 1552935939,
        "account": "moon32walker",
        "symbol": "ENG",
        "quantity": "0.5",
        "price": "0.761",
        "tokensLocked": "0.381",
        "expiration": 1555527939,
        "$loki": 1493,
        "total": 814.1734097019998,
        "amountLocked": 0.3805
      },
      {
        "txId": "3ac009b32631f90ce194601113da23f9b163ae16",
        "timestamp": 1552923501,
        "account": "jarvie",
        "symbol": "ENG",
        "quantity": "2",
        "price": "0.751",
        "tokensLocked": "1.502",
        "expiration": 1555515501,
        "$loki": 1468,
        "total": 815.6754097019998,
        "amountLocked": 1.502
      },
      {
        "txId": "c0139060852b74064872e02468dc5adb425ea487",
        "timestamp": 1552776507,
        "account": "freebornangel",
        "symbol": "ENG",
        "quantity": "10",
        "price": ".4",
        "tokensLocked": "4.000",
        "expiration": 1555368507,
        "$loki": 1268,
        "total": 819.6754097019998,
        "amountLocked": 4
      },
      {
        "txId": "08f08eb8e41bc0a287a5b5a7475a1fa5244b8c71",
        "timestamp": 1551909039,
        "account": "wayoutwest",
        "symbol": "ENG",
        "quantity": "3",
        "price": "0.371",
        "tokensLocked": "1.113",
        "expiration": 1554501039,
        "$loki": 82,
        "total": 820.7884097019999,
        "amountLocked": 1.113
      },
      {
        "txId": "bb473e2fd335836ba67d1a096ea78652151cb12f",
        "timestamp": 1553034201,
        "account": "jarvie",
        "symbol": "ENG",
        "quantity": "10",
        "price": ".2",
        "tokensLocked": "2.000",
        "expiration": 1555626201,
        "$loki": 1715,
        "total": 822.7884097019999,
        "amountLocked": 2
      },
      {
        "txId": "342224bf2244d2ef52b35566e69a82422bf2a927",
        "timestamp": 1551902310,
        "account": "sqube",
        "symbol": "ENG",
        "quantity": "10",
        "price": "0.1",
        "tokensLocked": "1.000",
        "expiration": 1554494310,
        "$loki": 58,
        "total": 823.7884097019999,
        "amountLocked": 1
      },
      {
        "txId": "0a4bf1da5551f58b56229225c8a904fd06ce6d26",
        "timestamp": 1553114085,
        "account": "louis88",
        "symbol": "ENG",
        "quantity": "100",
        "price": "0.033",
        "tokensLocked": "3.300",
        "expiration": 1555706085,
        "$loki": 1904,
        "total": 827.0884097019998,
        "amountLocked": 3.3000000000000003
      },
      {
        "txId": "96a9889ef7b1ede887e089b7dbade416d25c4bfe",
        "timestamp": 1551977661,
        "account": "inertia",
        "symbol": "ENG",
        "quantity": "100",
        "price": "0.01",
        "tokensLocked": "1.000",
        "expiration": 1554569661,
        "$loki": 209,
        "total": 828.0884097019998,
        "amountLocked": 1
      }
    ],
    "user_orders": [],
    "user_token_balance": {
      "account": "beggars",
      "symbol": "ENG",
      "balance": "123.60000000",
      "$loki": 13547
    },
    "user_steemp_balance": {
      "account": "beggars",
      "symbol": "STEEMP",
      "balance": "0.000",
      "$loki": 14239
    }
};

@autoinject()
export class Market {
    private chartData;
    private state: State;
    private urlTokenParam = '';
    private loading = false;
    private token = {};

    constructor(private store: Store<State>, private SE: SteemEngine, private dialogService: DialogService) {

    }

    bind() {
        this.store.state.subscribe((state: State) => {
            this.state = state;

            this.token = this.state.tokens.find(t => t.symbol === this.urlTokenParam);
        });
    }

    async canActivate({ token }) {
        this.loading = true;

        await dispatchify(loadSteemPrice)();
        await dispatchify(loadBuyBook)(token);
        await dispatchify(loadSellBook)(token);
        await dispatchify(loadTradesHistory)(token);
        await dispatchify(loadUserBalances)(token);

        this.urlTokenParam = token;
    }

    @computedFrom('state.tokens.length')
    get tokens() {
        return this.state.tokens.filter(t => t.metadata && !t.metadata.hide_in_market);
    }

    attached() {
        if (this.state && this.state.user.loggedIn) {
            dispatchify(loadUserBuyBook)(this.urlTokenParam);
            dispatchify(loadUserSellBook)(this.urlTokenParam);
        }

        const buyOrderLabels = uniq(this.state.buyBook.map(o => o.price));
        const buyOrderDataset = [];

        let buyOrderCurrentVolume = 0;

        buyOrderLabels.forEach(label => {
            let matchingBuyOrders = this.state.buyBook.filter(o => o.price === label);
            if (matchingBuyOrders.length === 0) {
                buyOrderDataset.push(null);
            } else {
                buyOrderCurrentVolume = buyOrderCurrentVolume + matchingBuyOrders.reduce((acc, val: any) => { return val.price * val.quantity }, 0);
                buyOrderDataset.push(buyOrderCurrentVolume);
            }
        });
        buyOrderLabels.reverse();
        buyOrderDataset.reverse();

        const sellOrderLabels = uniq(this.state.sellBook.map(o => o.price));
        const sellOrderDataset = fill(Array(buyOrderDataset.length), null);
        let sellOrderCurrentVolume = 0;

        sellOrderLabels.forEach(label => {
            let matchingSellOrders = this.state.sellBook.filter(o => o.price === label);

            if (matchingSellOrders.length === 0) {
                sellOrderDataset.push(null);
            } else {
                sellOrderCurrentVolume = sellOrderCurrentVolume + matchingSellOrders.reduce((acc, val: any) => { return val.price * val.quantity }, 0);
                sellOrderDataset.push(sellOrderCurrentVolume);
            }
        });

        this.chartData = {
			labels: buyOrderLabels.concat(sellOrderLabels),
			datasets: [
				{
					label: 'Buy',
					steppedLine: 'after',
					borderColor: '#88e86b',
					backgroundColor: '#a9ea96',
					data: buyOrderDataset
				},
				{
					label: 'Sell',
					steppedLine: 'before',
					borderColor: '#e45858',
					backgroundColor: '#e87f7f',
					data: sellOrderDataset
				}
			]
        };
    }

    marketChartRendered() {
        console.log('rendered');
        this.loading = false;
    }

    @computedFrom('state.tradesHistory.length', 'state.steemPrice')
    get lastPrice() {
        if (this.state && this.state.tradesHistory && this.state.tradesHistory.length > 0) {
            const item = this.state.tradesHistory[0].price;

            return `${item} STEEM / ${usdFormat(item , null, this.state.steemPrice)}`;
        }

        return '--';
    }

    @computedFrom('urlTokenParam', 'state.tokens.length')
    get twentyFourHourVolume() {
        if (this.state) {
            const token = this.state.tokens.find(t => t.symbol === this.urlTokenParam);

            if (token) {
                return `${token.volume} STEEM / ${usdFormat(token.volume, 2, this.state.steemPrice)}`;
            }
        }

        return '--';
    }

    @computedFrom('state.buyBook.length')
    get bid() {
        if (this.state) {
            return (this.state.buyBook.length > 0) ? `${this.state.buyBook[0].price} STEEM` : '--';
        }

        return '--';
    }

    @computedFrom('state.sellBook.length')
    get ask() {
        if (this.state) {
            return (this.state.sellBook.length > 0) ? `${this.state.sellBook[0].price} STEEM` : '--';
        }

        return '--';
    }
}
