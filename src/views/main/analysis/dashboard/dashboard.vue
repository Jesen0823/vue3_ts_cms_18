<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <cm-card title="分类商品数量(饼图)">
          <pie-echarts
            :pie-data="categoryGoodsCount"
            dataName="商品分类"
          ></pie-echarts>
        </cm-card>
      </el-col>
      <el-col :span="10">
        <cm-card title="不同城市商品销量">
          <map-echarts :map-data="addressGoodsSale"></map-echarts>
        </cm-card>
      </el-col>
      <el-col :span="7">
        <cm-card title="分类商品数量(玫瑰图)">
          <rose-echarts
            :rose-data="categoryGoodsCount"
            dataName="分类数量"
          ></rose-echarts>
        </cm-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <cm-card title="分类商品的销量">
          <bar-echarts v-bind="categoryGoodsFavor"></bar-echarts>
        </cm-card>
      </el-col>
      <el-col :span="12">
        <cm-card title="分类商品的收藏">
          <line-echarts
            :x-labels="categoryGoodsSale.xLabels"
            :values="categoryGoodsSale.values"
            title="销量对比"
            data-name="各城市销量"
          ></line-echarts>
        </cm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import CmCard from '@/base-ui/card'
import {
  PieEcharts,
  RoseEcharts,
  LineEcharts,
  BarEcharts,
  MapEcharts
} from '@/components/cm-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    CmCard,
    PieEcharts,
    RoseEcharts,
    LineEcharts,
    BarEcharts,
    MapEcharts
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

    const categoryGoodsCount = computed(() => {
      return store.state.analysisModule.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.analysisModule.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.saleCount)
      }
      return { xLabels, values }
    })

    const categoryGoodsFavor = computed(() => {
      const dataArr: any[] = []
      const dataAxis: string[] = []
      const goodsFavor = store.state.analysisModule.categoryGoodsFavor
      for (const item of goodsFavor) {
        dataAxis.push(item.name)
        dataArr.push(item.favorCount ?? 0)
      }
      return { dataAxis, dataArr }
    })

    const addressGoodsSale = computed(() => {
      return store.state.analysisModule.addresGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      options,
      categoryGoodsCount,
      categoryGoodsFavor,
      categoryGoodsSale,
      addressGoodsSale
    }
  }
})
</script>

<style scoped></style>
