import { ref } from 'vue';
import { updateApiKey } from '../services/api';

const isAuthenticated = ref(false);

export function useAuth() {
  const checkAuth = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      updateApiKey(user.password);
      isAuthenticated.value = true;
    } else {
      isAuthenticated.value = false;
    }
    return isAuthenticated.value;
  };

  const logout = () => {
    localStorage.removeItem('user');
    updateApiKey('');
    isAuthenticated.value = false;
  };

  const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  return {
    isAuthenticated,
    checkAuth,
    logout,
    getUser,
  };
}