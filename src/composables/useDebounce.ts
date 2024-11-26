import { ref, watch } from 'vue';

export function useDebounce<T>(value: T, delay: number) {
  const debouncedValue = ref(value);
  let timeout: NodeJS.Timeout;

  watch(
    () => value,
    (newValue) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        debouncedValue.value = newValue;
      }, delay);
    },
    { deep: true }
  );

  return debouncedValue;
}