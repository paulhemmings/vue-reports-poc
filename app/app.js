import ReportComponent from './components/report.js'

var app = new Vue({
    el: '#app',
    components: {
        'app-report': ReportComponent
    },
    data: function() {
        return {
            spec: {
                header: 'loading',
                items: [{
                    'id':1, 'text':'waiting'
                }]    
            }
        }
    },
    mounted: function() {
        var self = this;
        fetch('https://min-api.cryptocompare.com/data/all/coinlist')
        .then(response => response.json())
        .then(response => Object.keys(response.Data)
                                .map(key => response.Data[key])
                                .filter(coin => coin.IsTrading))
        .then(coins => coins.map(coin => { return {
                name: coin["CoinName"],
                symbol: coin["Symbol"],
                supply: coin["TotalCoinSupply"],
                price: '',
                url: coin["Url"]
            }}))
            .then(json => {
                self.spec.header = 'coins';
                self.spec.items = json;
            });          
    },
    template: '<app-report v-bind:spec="spec"></app-report>'
});