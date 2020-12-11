
<template>
  <transition>
    <div class="modal-backdrop">
      <div class="modal" role="dialog">
        <header id="modalTitle">
          <slot name="header">
            <button type="button" class="noBorder" @click="close" >
              <div class="closeBtn noBorder">
                <span>Close</span>
              </div>
            </button>
          </slot>
        </header>
        <div class="chart">
          <keep-alive>
            <Chart />
          </keep-alive>
        </div>
      </div>
    </div>

  </transition>
</template>

<script>
import Chart from './PieChart'
  export default {
    name: 'modal',
    components: {
      Chart
    },
    props:{
      stats:Object
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .chart {
    width: 50vw;
    margin-right: 50%;
  }


  .closeBtn {
    width: auto;
    padding: 10px;
    font-size: 15px;
    border-radius: 5px;
    background-color:  #4AAE9B;
    color: white;
  }

  .closeBtn:hover{
    background-color:  #86dbcc;
  }

  .noBorder {
    border: none;
    outline: none;
  }


</style>