<template id="swipe-page">
  <v-ons-page>
    <div id="header">
      <div class="center app-title">
        Set Matching Test
      </div>
      <v-ons-fab position='middle right' modifier="mini" v-on:click="" class="like-fab">
        <v-ons-icon icon="md-thumb-up"></v-ons-icon>
      </v-ons-fab>
    </div>
    <SwipeCards msg="test"/>
    <SwipeCards msg="test"/>
  </v-ons-page>
</template>

<script>
import SwipeCards from './components/swipeCards.vue';

export default {
  name: 'swipe',
  mounted: function mounted() {
    console.log(this.$route.query);
  },
  components: {
    SwipeCards,
  }
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
  margin-top: 55px;
}
.center {
  text-align: center;
}
#header {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid lightgray;
}
.cards-container {
  position: relative;
}
.like-fab {
  position: absolute;
  right: 7px;
  top: 7px;
}
</style>
