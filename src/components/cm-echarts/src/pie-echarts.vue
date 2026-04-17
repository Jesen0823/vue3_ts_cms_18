<template>
  <div class="pie-echart">
    <base-echarts :options="options"></base-echarts>
  </div>
</template>

<script lang="ts" setup>
import BaseEcharts from '@/base-ui/echarts'
import { IEchartDataType } from '../types'
import { computed, defineProps } from 'vue'

const props = defineProps<{
  pieData: IEchartDataType[]
  dataName: string
}>()

const options = computed(() => {
  return {
    title: {
      // text: 'Referer of a Website',
      // subtext: 'Fake Data',
      // left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: props.dataName,
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
