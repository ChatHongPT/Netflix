import { ref, computed, Ref } from 'vue';

export function useInfiniteScroll<T>(items: Ref<T[]>, itemsPerPage: number) {
  const page = ref(1);
  const loading = ref(false);

  const visibleItems = computed(() => {
    return items.value.slice(0, page.value * itemsPerPage);
  });

  const hasMore = computed(() => {
    return visibleItems.value.length < items.value.length;
  });

  const loadMore = async () => {
    if (loading.value || !hasMore.value) return;

    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
    page.value++;
    loading.value = false;
  };

  return {
    visibleItems,
    loadMore,
    hasMore,
    loading
  };
}