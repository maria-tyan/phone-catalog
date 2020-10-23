<template>
  <div class="brands-page">
    <router-view v-if="$route.params.brand" />
    <BrandsComponent v-else />
  </div>
</template>

<script>
import BrandsComponent from '@/components/BrandsComponent.vue';

export default {
  name: 'Brands',
  components: {
    BrandsComponent,
  },
};
</script>
