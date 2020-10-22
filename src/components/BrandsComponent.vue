<template>
  <div class="brands">
    <h1 class="title">{{ brandList.headline }}</h1>
    <div class="brands__list-wrapper">
      <ul class="brands__list" v-for="(item, index) in brandList.options" :key="index">
        <li>
          <router-link :to="`/brands/${item.displayName}`" :title="item.id">
            <img :src="item.displayImageUrl" :alt="item.id" />
            <p>
              {{ item.displayName }}
            </p>
          </router-link>
          <form @submit.prevent>
            <input v-model="item.displayName"/>
            <button type="submit" @click="item.displayName = item.id">Reset name</button>
          </form>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import fetchData from '../mixins/fetchData';

export default {
  name: 'MainComponent',
  mixins: [
    fetchData,
  ],
  props: {
    data: Object,
  },
  data() {
    return {
      brandList: [],
    };
  },
  async mounted() {
    this.brandList = await this.fetchData('https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/brands.json');
  },
};
</script>

<style lang="less" scoped>
.brands {
  &__list-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
