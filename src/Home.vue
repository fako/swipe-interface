<template id="main-page">
  <div id="home">
    <a v-on:click="showClothes()">Show clothes!</a>
  </div>
</template>

<script>

export default {
  name: 'home',
  methods: {
    showClothes() {
      this.$router.push({ path: '/swipe', query: { top: '000', bottom: 'fff' } });
    }
  }
};

</script>

<style>

</style>
