import type { Directive } from 'vue';

export const intersectionObserver: Directive = {
  mounted(el, binding) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          binding.value();
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(el);
    
    // Store the observer instance for cleanup
    el._observer = observer;
  },
  unmounted(el) {
    if (el._observer) {
      el._observer.disconnect();
      delete el._observer;
    }
  }
};