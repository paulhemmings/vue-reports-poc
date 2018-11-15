var ReportRow = Vue.component('report-row', {
    props: ['item'],
    template: `
    <tr>                                
        <td v-for="header in item">
            <a href="#">{{header}}</a>
        </td>
    </tr>
    `
});

var ReportComponent = Vue.component('report', {
    props: ['spec'],
    data: function(){
        return {}
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
                    <th v-for="column in spec.columns">{{column}}</th>
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
});

export default ReportComponent