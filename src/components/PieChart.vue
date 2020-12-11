<template>
    <section class="charts">
        <highcharts :options="PieData" ref="pieChart"></highcharts>
    </section>
    
</template>
<script>

import {Chart} from 'highcharts-vue';

export default {
  components: {
    highcharts: Chart
  },
  computed: {
    getMale () {
      return this.$store.getters['getMale']
    },
    getFemale () {
      return this.$store.getters['getFemale']
    },
    PieData () {
      return {
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
                  ["Male", this.getMale],
                  ["Female", this.getFemale],
                ]
            }
        ]
      }
    }
  },
};
</script>
