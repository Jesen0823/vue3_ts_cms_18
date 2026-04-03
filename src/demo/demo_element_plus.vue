<template>
  <div class="app">
    <h2>{{ $store.state.name }}</h2>
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>
    <div class="button-example">
      <div class="button-row">
        <el-button plain>Plain</el-button>
        <el-button type="primary" plain>Primary</el-button>
        <el-button type="success" plain>Success</el-button>
        <el-button type="info" plain>Info</el-button>
        <el-button type="warning" plain>Warning</el-button>
        <el-button type="danger" plain>Danger</el-button>
      </div>
      <div class="button-row">
        <el-icon><Search /></el-icon>
        <el-button :icon="Search">搜索</el-button>
        <el-button :icon="Search" circle />
        <el-button type="primary" :icon="Edit" circle />
        <el-button type="success" :icon="Check" circle />
        <el-button type="info" :icon="Message" circle />
        <el-button type="warning" :icon="Star" circle />
        <el-button type="danger" :icon="Delete" circle />
      </div>
      <div class="mt-4">
        <el-checkbox-group v-model="checkboxGroup1" size="small">
          <el-checkbox label="Option1" value="Value1" border />
          <el-checkbox label="Option2" value="Value2" border />
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  Search,
  Edit,
  Message,
  Star,
  Delete,
  Check
} from '@element-plus/icons-vue'

export default defineComponent({
  data() {
    const checked1 = ref(true)
    const checked2 = ref(false)
    const checkboxGroup1 = ref(['Value1'])

    return {
      Search,
      Edit,
      Message,
      Star,
      Delete,
      Check,
      checked1,
      checked2,
      checkboxGroup1
    }
  },
  name: 'App'
})
</script>

<style lang="less">
.app {
  height: 100%;
}
.button-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.button-row > * {
  margin: 0;
}
</style>
