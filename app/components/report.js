var ReportRow = {
    props: ['item', 'handler'], 
    methods: {
        handleClick: function() {
            this.handler(this.item);
        }
    },
    template: `
    <tr>               
        <td><button v-on:click="handleClick">select</button></td>                 
        <td v-for="property in item">{{property}}</td>
    </tr>
    `
};

var ReportComponent = {
    props: ['spec'],
    data: function(){
        return {}
    },
    components: {
        'report-row': ReportRow
    },
    computed: {
        columns: function() {
            if ((this.spec.items || []).length < 1) {
                return [];
            }
            return Object.keys(this.spec.items[0]);
        }
    },    
    methods: {
        rowSelected: function(item) {
            this.$emit('selected', item);
        }
    },            
    template: `
    <div>
        <h1 class="table-header">{{spec.header}}</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th v-for="column in columns">{{column}}</th>
                </tr>
            </thead>
            <tbody>                
                <report-row
                    v-for="item in spec.items"
                    v-bind:item="item"
                    v-bind:handler="rowSelected"
                    v-bind:key="item.id">
                </report-row>
            </tbody>
        </table>
    </div>`
};

export default ReportComponent