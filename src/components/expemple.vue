<template>
    <select id="select-tools" class="select" placeholder="Pick a tool..."></select>
</template>

<script>
import $ from "jquery";

export default {
    data() {
        return {
            selectData: [
                { id: 1, title: 'Spectrometer' },
                { id: 2, title: 'Star Chart' },
                { id: 3, title: 'Electrical Tape' }
            ],

            mSelect: null,
        };
    },

    mounted() {
        let mSel = $('#select-tools').selectize({
            maxItems: null,
            valueField: 'id',
            labelField: 'title',
            searchField: 'title',
            options: this.selectData,
            create: false,
            //
            onChange: ()=> {
                this.showValue();
            },
        });

        this.mSelect = mSel[0].selectize;
    },
    methods: {
        showValue() {
            let values = this.mSelect.getValue();
            let trueValues = [];
            let i = 0;
            values.forEach((val) => {
                this.selectData.forEach(function (data) {
                    if (val == data.id) {
                        trueValues[i] = data.title;
                        i++;
                    }
                });
            });
            console.log(trueValues);
        }
    }

}

</script>

<style scoped>
    .select{
        width: 50px!important;
    }
</style>