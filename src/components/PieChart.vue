<template>
    <section class="charts">
        <highcharts :options="PieData" ref="pieChart"></highcharts>
        {{getMale}} {{getFemale}}
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
                  ["Male", this.getMale],
                  ["Female", this.getFemale],
                ]
            }
        ]
        }
    };
  },
  computed: {
    getMale () {
      return this.$store.getters['getMale']
    },
    getFemale () {
      return this.$store.getters['getFemale']
    }
  },
  mounted () {
    // this.$store.commit('setGenders', {
    //   amount: 25
    // })
  },
};
</script>
