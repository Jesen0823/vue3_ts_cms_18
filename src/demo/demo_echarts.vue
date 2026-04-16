<template>
  <div class="demo_echarts">
    <div ref="divRef" :style="{ width: '900px', height: '800px' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'demo_echarts',
  setup() {
    const divRef = ref<HTMLElement>()

    onMounted(() => {
      const echartInstance = echarts.init((divRef as any).value)
      const option = {
        title: {
          text: '这就是标题'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          // Try 'horizontal'
          orient: 'vertical',
          right: 10,
          top: 'center'
        },
        toolbox: {
          show: true,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      }
      echartInstance.setOption(option)
    })
    return {
      divRef
    }
  }
})
</script>

<style scoped></style>
