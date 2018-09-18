<template id="swipe-page">
  <v-ons-page>
    <div id="header">
      <v-ons-fab position='middle left' modifier="mini" v-on:click="goHome" class="back-fab">
        <v-ons-icon icon="md-chevron-left"></v-ons-icon>
      </v-ons-fab>
      <div class="center app-title">
        Set Matching Test
      </div>
      <v-ons-fab position='middle right' modifier="mini" v-on:click="" class="like-fab">
        <v-ons-icon icon="md-thumb-up"></v-ons-icon>
      </v-ons-fab>
    </div>
    <SwipeCards type="top" :top="topColor" :bottom="bottomColor"/>
    <SwipeCards type="bottom" :top="topColor" :bottom="bottomColor"/>
  </v-ons-page>
</template>

<script>
import SwipeCards from './components/swipeCards.vue';

export default {
  name: 'swipe',
  data() {
    return {
      topColor: this.$route.query.top,
      bottomColor: this.$route.query.bottom
    }
  },
  methods: {
    likeMatch() {
        console.log('clicked', this.topColor, this.bottomColor);
    },
    goHome() {
      this.$router.push('/');
    },
    onSwipe(event) {
      console.log('swiped', event);
    }
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
.back-fab {
  position: absolute;
  left: 7px;
  top: 7px;
  background-color: lightgrey;
}
</style>
