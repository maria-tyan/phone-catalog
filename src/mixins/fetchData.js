export default {
  methods: {
    async fetchData(url) {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  },
};
