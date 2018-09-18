<template id="swipe-page">
  <v-ons-page>
    <div id="header">
      <v-ons-fab position='middle left' modifier="mini" v-on:click="goHome" class="back-fab">
        <v-ons-icon icon="md-chevron-left"></v-ons-icon>
      </v-ons-fab>
      <div class="center app-title">
        Set Matching Test
      </div>
      <v-ons-fab position='middle right' modifier="mini" v-on:click="likeMatch" class="like-fab">
        <v-ons-icon icon="md-thumb-up"></v-ons-icon>
      </v-ons-fab>
    </div>
    <SwipeCards type="top" :top="topColor" :bottom="bottomColor" v-on:input="onSelect($event)"/>
    <SwipeCards type="bottom" :top="topColor" :bottom="bottomColor" v-on:input="onSelect($event)"/>
  </v-ons-page>
</template>

<script>
import SwipeCards from './components/swipeCards.vue';

export default {
  name: 'swipe',
  data() {
    return {
      topColor: this.$route.query.top,
      bottomColor: this.$route.query.bottom,
      clothingSet: {}
    }
  },
  methods: {
    likeMatch() {
      this.axios.post(
        'http://2ndhandstylist.com/data/v1/future-fashion/color-clothing-set/',
        {
          top_color: this.topColor,
          bottom_color: this.bottomColor,
          top_item: this.clothingSet['top'],
          bottom_item: this.clothingSet['bottom']
        }
      ).then((response) => {
        alert('Thank you for your feedback!');
      });
    },
    goHome() {
      this.$router.push('/');
    },
    onSelect(event) {
      this.clothingSet[event.type] = event.id;
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
