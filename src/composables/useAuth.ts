import { ref } from 'vue'

const isAuthenticated = ref(false)

export function useAuth() {
  const checkAuth = () => {
    isAuthenticated.value = !!localStorage.getItem('user')
    return isAuthenticated.value
  }

  const logout = () => {
    localStorage.removeItem('user')
    isAuthenticated.value = false
  }

  const getUser = () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }

  return {
    isAuthenticated,
    checkAuth,
    logout,
    getUser
  }
}