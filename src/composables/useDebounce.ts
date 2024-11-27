import { ref, watch } from 'vue';

export function useDebounce<T>(initialValue: T, delay: number) {
  const debouncedValue = ref<T>(initialValue);
  let timeout: NodeJS.Timeout;

  const update = (value: T) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.value = value;
    }, delay);
  };

  return {
    debouncedValue,
    update
  };
}