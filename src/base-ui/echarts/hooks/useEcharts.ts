import * as echarts from 'echarts'

// 适配地图
import chinaMapData from '../data/china.json'
echarts.registerMap('china', chinaMapData)

export default function useEcharts(el: HTMLElement) {
  const echartsInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) =>
    echartsInstance.setOption(options)

  const updateResize = () => {
    echartsInstance.resize()
  }

  // 自动适配大小缩放
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })

  return { echartsInstance, setOptions, updateResize }
}
