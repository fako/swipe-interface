<template id="main-page">
  <v-ons-page>
    <div class="center app-title">Swipe interface</div>
    <SwipeCards msg="test"/>
  </v-ons-page>
</template>

<style>
  /* CSS goes here */
</style>

<script>
import SwipeCards from './components/swipeCards.vue';

export default {
  name: 'app',
  components: {
    SwipeCards,
  },
};
</script>

<style>
.page__background {
  background-color: #fff;
}
.page {
  font-size: 20px;
  font-weight: bold;
  color: #aaa;
}
.center {
  text-align: center;
}
.app-title {
  margin: 30px;
}
.bg-green {
  background-color: #74dda5;
}
.bg-red {
  background-color: #f885ba;
}
</style>
