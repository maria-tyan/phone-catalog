<template>
  <div class="brands">
    <h1 class="title">{{ brandList.headline }}</h1>
    <div>
      <select name="select" v-model="selectedBrand">
        <option value="all">
          All
        </option>
        <template v-for="(item, key) in optionList">
          <option :value="item" :key="key">
            {{ item }}
          </option>
        </template>
      </select>
    </div>
    <button
      class="button"
      @click="sortList"
    >
      Sort List
    </button>
    <transition-group name="cell" tag="ul" class="brands__list-wrapper">
      <li class="brands__list-item" v-for="item in filteredItems" :key="item.id">
        <button
          class="button button_remove"
          @click="removeItem(item.id)"
        >
          &times;
        </button>
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
    </transition-group>
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
      selectedBrand: 'all',
    };
  },
  async mounted() {
    this.brandList = await this.fetchData('https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/brands.json');
  },
  computed: {
    filteredItems() {
      if (this.selectedBrand === 'all') {
        return this.brandList.options;
      }
      return this.brandList.options.filter((item) => item.id === this.selectedBrand);
    },
    optionList() {
      return new Set(this.brandList.options.map((item) => item.id));
    },
  },
  methods: {
    sortList() {
      this.brandList.options = this.brandList.options.sort((a, b) => {
        if (a.displayName > b.displayName) {
          return 1;
        }
        if (a.displayName < b.displayName) {
          return -1;
        }
        return 0;
      });
    },
    removeItem(id) {
      this.brandList.options = this.brandList.options.filter((item) => item.id !== id);
    },
  },
};
</script>

<style lang="less" scoped>
.brands {
  &__list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
  }

  &__list-item {
    position: relative;
    padding: 20px;
  }
}

.cell {
  &-move {
    transition: transform 1s;
  }
}
</style>
