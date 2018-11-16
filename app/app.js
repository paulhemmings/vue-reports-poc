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
    methods: {
        addPrice: function(symbol, data) {
            const enhancedItems = [].concat(this.spec.items);
            enhancedItems.filter(item => item.symbol == symbol).forEach(coin => coin.price = data.GBP);
            this.spec.items = enhancedItems;
        },        
        itemSelected: function(item) {
            var self = this;
            fetch('https://min-api.cryptocompare.com/data/price?fsym=' + item.symbol + '&tsyms=GBP,USD,EUR')
            .then(response => response.json())
            .then(json => self.addPrice(item.symbol, json));
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
    template: `
        <app-report 
            @selected="itemSelected" 
            v-bind:spec="spec">
        </app-report>`
});