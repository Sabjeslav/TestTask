<template>
    <section class="charts">
        <highcharts :options="PieData" ref="pieChart"></highcharts>
        {{this.$store.state.genders.male}} {{this.$store.state.genders.female}}
    </section>
    
</template>
<script>

import {Chart} from 'highcharts-vue';

export default {
  components: {
    highcharts: Chart
  },
  data() {
    return {    
      PieData:  {
        chart: {
            type: "pie"
        },
        title: {
            text: "Gender Users"
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [
            {
                data: 
                [
                  ["Male", this.$store.state.genders.male],
                  ["Female", this.$store.state.genders.female],
                ]
            }
        ]
        }
    };
  },
  computed: {
    
  },
  mounted () {
    this.$store.commit('setGenders', {
      amount: 25
    })
  },
};
</script>
