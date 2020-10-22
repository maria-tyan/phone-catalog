<template>
  <div class="brands">
    <h1 class="title">{{ brandList.headline }}</h1>
    <div>
      <select name="select" @change="filterList($event)">
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
    <button @click="sortList">Sort List</button>
    <transition-group name="cell" tag="ul" class="brands__list-wrapper">
      <li class="brands__list-item" v-for="item in userList" :key="item.id">
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
      optionList: [],
      userList: [],
    };
  },
  async mounted() {
    this.brandList = await this.fetchData('https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/brands.json');
    this.optionList = new Set(this.brandList.options.map((item) => item.id));
    this.userList = this.brandList.options;
  },
  methods: {
    sortList() {
      this.userList = this.brandList.options.sort((a, b) => {
        if (a.displayName > b.displayName) {
          return 1;
        }
        if (a.displayName < b.displayName) {
          return -1;
        }
        return 0;
      });
    },
    filterList(event) {
      if (event.target.value === 'all') {
        this.userList = this.brandList.options;
      } else {
        this.userList = this.brandList.options.filter((item) => item.id === event.target.value);
      }
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
    padding: 20px;
  }
}

.cell {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid white;
  margin-right: -1px;
  margin-bottom: -1px;
  font-size: 16px;
  font-weight: 700;

  &-move {
    transition: transform 1s;
  }
}
</style>
