<template>
  <div class="rose-echart">
    <base-echarts :options="options"></base-echarts>
  </div>
</template>

<script setup lang="ts">
import BaseEcharts from '@/base-ui/echarts'
import { computed, defineProps } from 'vue'
import { IEchartDataType } from '../types'

const props = defineProps<{
  roseData: IEchartDataType[]
  dataName: string
}>()

const options = computed(() => {
  return {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: props.dataName,
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
