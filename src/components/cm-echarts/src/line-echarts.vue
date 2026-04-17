<template>
  <div class="line-echart">
    <base-echarts :options="options"></base-echarts>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import BaseEcharts from '@/base-ui/echarts'

const props = withDefaults(
  defineProps<{
    xLabels: string[]
    values: any[]
    title?: string
    dataName: string
  }>(),
  {
    title: '标题'
  }
)

const options = computed(() => {
  return {
    title: {
      text: props.title
      // subtext: 'Fake Data',
      // left: 'center'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    series: [
      {
        name: props.dataName,
        data: props.values,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
