import { useStore } from '@/store'
export function usePermissions(pageName: any, handleName: string) {
  const store = useStore()

  const permissions = store.state.login.userPermissions

  const verifyPermission = `system:${pageName}:${handleName}`

  return !!permissions.find(
    (permission: string) => permission === verifyPermission
  )
}
