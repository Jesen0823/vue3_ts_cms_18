import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.loginMoudle.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  return Boolean(permissions.find((item: any) => item === verifyPermission))
}
