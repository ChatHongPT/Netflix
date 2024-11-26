import { ref, computed, Ref } from 'vue';

export function useInfiniteScroll<T>(items: Ref<T[]>, itemsPerPage: number) {
  const currentPage = ref(1);
  
  const visibleItems = computed(() => {
    return items.value.slice(0, currentPage.value * itemsPerPage);
  });

  const hasMore = computed(() => {
    return visibleItems.value.length < items.value.length;
  });

  const loadMore = () => {
    if (hasMore.value) {
      currentPage.value++;
    }
  };

  return {
    visibleItems,
    hasMore,
    loadMore
  };
}