import uniq from 'lodash/uniq';
import fill from 'lodash/fill';

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
    "sell_orders": [
      {
        "txId": "3f8cff607fda3af17833cae65e4bb286bc3ec315",
        "timestamp": 1554143451,
        "account": "jarvie",
        "symbol": "ENG",
        "quantity": "20",
        "price": ".939",
        "expiration": 1556735451,
        "$loki": 3127,
        "total": 18.779999999999998,
        "amountLocked": 18.779999999999998
      },
      {
        "txId": "714f893e84d60b63815ae9c02db068eb77900b9a",
        "timestamp": 1554146241,
        "account": "theb0red1",
        "symbol": "ENG",
        "quantity": "7.9208",
        "price": "0.945",
        "expiration": 1556738241,
        "$loki": 3139,
        "total": 26.265155999999998,
        "amountLocked": 7.485155999999999
      },
      {
        "txId": "53ba40f136dc291acb4daa24747a1ce00412c344",
        "timestamp": 1554127518,
        "account": "voxmortis",
        "symbol": "ENG",
        "quantity": "10",
        "price": "0.945",
        "expiration": 1556719518,
        "$loki": 3101,
        "total": 35.71515599999999,
        "amountLocked": 9.45
      },
      {
        "txId": "a5dc98845b5bb196124c303cd5c62e8058d74dc0",
        "timestamp": 1554216519,
        "account": "cryptomancer",
        "symbol": "ENG",
        "quantity": "100",
        "price": "0.94900",
        "expiration": 1556808519,
        "$loki": 3175,
        "total": 130.61515599999998,
        "amountLocked": 94.89999999999999
      },
      {
        "txId": "30efb69c6dad91bb32df5f3984a903869d68ff45",
        "timestamp": 1554208143,
        "account": "holger80",
        "symbol": "ENG",
        "quantity": "1000",
        "price": "0.95",
        "expiration": 1556800143,
        "$loki": 3171,
        "total": 1080.615156,
        "amountLocked": 950
      },
      {
        "txId": "5eb64b525493a7c304619f6d490e56afa6499255",
        "timestamp": 1553894256,
        "account": "someguy123",
        "symbol": "ENG",
        "quantity": "676.68700000",
        "price": "0.95",
        "expiration": 1556486256,
        "$loki": 2792,
        "total": 1723.467806,
        "amountLocked": 642.8526499999999
      },
      {
        "txId": "6d215edc9278d5e2ad67bf498970bcb5533b4584",
        "timestamp": 1553583960,
        "account": "cryptomancer",
        "symbol": "ENG",
        "quantity": "180.00000000",
        "price": "0.975",
        "expiration": 1556175960,
        "$loki": 2335,
        "total": 1898.967806,
        "amountLocked": 175.5
      },
      {
        "txId": "edf7776918fce039702c6f612c545d56d9468925",
        "timestamp": 1551893334,
        "account": "jarunik",
        "symbol": "ENG",
        "quantity": "18.00000000",
        "price": "1",
        "expiration": 1554485334,
        "$loki": 3,
        "total": 1916.967806,
        "amountLocked": 18
      },
      {
        "txId": "9eab870ab638f6ecb6f293501d57a6ad5f60e29f",
        "timestamp": 1553894316,
        "account": "someguy123",
        "symbol": "ENG",
        "quantity": "1000",
        "price": "1.3",
        "expiration": 1556486316,
        "$loki": 2793,
        "total": 3216.967806,
        "amountLocked": 1300
      },
      {
        "txId": "99d52c091718d73f7eed18e0acc29444d1960282",
        "timestamp": 1553065908,
        "account": "dillagr",
        "symbol": "ENG",
        "quantity": "17",
        "price": "1.50000",
        "expiration": 1555657908,
        "$loki": 1613,
        "total": 3242.467806,
        "amountLocked": 25.5
      },
      {
        "txId": "b00ff58b9aecbaebd720e0751786e30c645e56e0",
        "timestamp": 1553058447,
        "account": "bcarolan639",
        "symbol": "ENG",
        "quantity": "3",
        "price": "1.5",
        "expiration": 1555650447,
        "$loki": 1611,
        "total": 3246.967806,
        "amountLocked": 4.5
      },
      {
        "txId": "3dab518ff50bff48a09efead1ecbc4be990940c6",
        "timestamp": 1551927480,
        "account": "acromott",
        "symbol": "ENG",
        "quantity": "2",
        "price": "2",
        "expiration": 1554519480,
        "$loki": 121,
        "total": 3250.967806,
        "amountLocked": 4
      },
      {
        "txId": "c3441627931e7d39c700b506f85b31f47400c0c8",
        "timestamp": 1554143334,
        "account": "jarvie",
        "symbol": "ENG",
        "quantity": ".91",
        "price": "8",
        "expiration": 1556735334,
        "$loki": 3125,
        "total": 3258.2478060000003,
        "amountLocked": 7.28
      }
    ],
    "trade_history": [
      {
        "type": "sell",
        "symbol": "ENG",
        "quantity": "1.8",
        "price": "0.93800",
        "timestamp": 1554191265,
        "$loki": 3930,
        "total": 1.6884,
        "timestamp_string": "2019-4-02 17:47:45"
      },
      {
        "type": "buy",
        "symbol": "ENG",
        "quantity": "1.07920000",
        "price": "0.93800",
        "timestamp": 1554184758,
        "$loki": 3927,
        "total": 1.0122896,
        "timestamp_string": "2019-4-02 15:59:18"
      },
      {
        "type": "buy",
        "symbol": "ENG",
        "quantity": "5",
        "price": "0.937",
        "timestamp": 1554160365,
        "$loki": 3903,
        "total": 4.6850000000000005,
        "timestamp_string": "2019-4-02 09:12:45"
      },
      {
        "type": "sell",
        "symbol": "ENG",
        "quantity": "2",
        "price": "0.815",
        "timestamp": 1554156789,
        "$loki": 3893,
        "total": 1.63,
        "timestamp_string": "2019-4-02 08:13:09"
      },
      {
        "type": "sell",
        "symbol": "ENG",
        "quantity": "0.02080000",
        "price": "0.91",
        "timestamp": 1554144789,
        "$loki": 3887,
        "total": 0.018928,
        "timestamp_string": "2019-4-02 04:53:09"
      },
      {
        "type": "sell",
        "symbol": "ENG",
        "quantity": "7.90000000",
        "price": "0.91",
        "timestamp": 1554143400,
        "$loki": 3884,
        "total": 7.189000000000001,
        "timestamp_string": "2019-4-02 04:30:00"
      },
      {
        "type": "sell",
        "symbol": "ENG",
        "quantity": "0.1",
        "price": "0.911000",
        "timestamp": 1554143400,
        "$loki": 3883,
        "total": 0.09110000000000001,
        "timestamp_string": "2019-4-02 04:30:00"
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

export class Market {
    private chartData = {};

    attached() {
        const buyOrderLabels = uniq(Data.buy_orders.map(o => o.price));
        const buyOrderDataset = [];

        let buyOrderCurrentVolume = 0;

        buyOrderLabels.forEach(label => {
            let matchingBuyOrders = Data.buy_orders.filter(o => o.price === label);
            if (matchingBuyOrders.length === 0) {
                buyOrderDataset.push(null);
            } else {
                buyOrderCurrentVolume = buyOrderCurrentVolume + matchingBuyOrders.reduce((acc, val: any) => { return val.price * val.quantity }, 0);
                buyOrderDataset.push(buyOrderCurrentVolume);
            }
        });
        buyOrderLabels.reverse();
        buyOrderDataset.reverse();

        const sellOrderLabels = uniq(Data.sell_orders.map(o => o.price));
        const sellOrderDataset = fill(Array(buyOrderDataset.length), null);
        let sellOrderCurrentVolume = 0;

        sellOrderLabels.forEach(label => {
            let matchingSellOrders = Data.sell_orders.filter(o => o.price === label);

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
}
