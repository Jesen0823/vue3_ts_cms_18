<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <cm-card title="分类商品数量(饼图)">
          <base-echarts :options="options"></base-echarts>
        </cm-card>
      </el-col>
      <el-col :span="10">
        <cm-card title="不同城市商品销量">
          <base-echarts :options="options"></base-echarts>
        </cm-card>
      </el-col>
      <el-col :span="7">
        <cm-card title="分类商品数量(玫瑰图)">
          <base-echarts :options="options"></base-echarts>
        </cm-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <cm-card title="分类商品的销量">
          <base-echarts :options="options"></base-echarts>
        </cm-card>
      </el-col>
      <el-col :span="12">
        <cm-card title="分类商品的收藏">
          <base-echarts :options="options"></base-echarts>
        </cm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import CmCard from '@/base-ui/card'
import BaseEcharts from '@/base-ui/echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    CmCard,
    BaseEcharts
  },
  setup() {
    const options = {
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
    const store = useStore()
    store.dispatch('analysisModule/getDashbordDataAction')
    return { options }
  }
})
</script>

<style scoped></style>
