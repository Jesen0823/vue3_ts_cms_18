<template>
  <div class="user-info">
    <el-dropdown type="primary" @command="handleInfoCommand">
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="exit" icon="SoldOut"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item command="info" divided>用户信息</el-dropdown-item>
          <el-dropdown-item command="system">系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { localCache } from '@/utils/cache'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.loginMoudle.userInfo.name)

    const handleInfoCommand = (command: string) => {
      switch (command) {
        case 'exit':
          localCache.deleteCache('token')
          router.push('/main')
          break
        case 'info':
          console.log('handleInfoCommand', command)
          break
        case 'system':
          console.log('handleInfoCommand', command)
          break
        default:
          console.log('handleInfoCommand', command)
      }
    }

    return { name, handleInfoCommand }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
