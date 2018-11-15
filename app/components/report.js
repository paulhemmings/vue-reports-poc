var ReportRow = {
    props: ['item'],
    methods: {
        handleClick: function() {
            this.$emit('item-selected');
        }
    },  
    template: `
    <tr>                                
        <td v-for="property in item">
            <a v-on:click="handleClick" href="#">{{property}}</a>
        </td>
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
    template: `
    <div>
        <h1 class="table-header">{{spec.header}}</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th v-for="column in columns">{{column}}</th>
                </tr>
            </thead>
            <tbody>
                <report-row
                    v-for="item in spec.items"
                    v-bind:item="item"
                    v-bind:key="item.id">
                </report-row>
            </tbody>
        </table>
    </div>`
};

export default ReportComponent