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
      categoryGoodsCount,
      categoryGoodsFavor,
      categoryGoodsSale,
      addressGoodsSale
    }
  }
})
</script>

<style scoped></style>
