<template id="swipe-page">
  <v-ons-page>

    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button v-on:click="goHome" icon="md-chevron-left" modifier="outline"></v-ons-toolbar-button>
      </div>
      <div class="center">Set Matching Test</div>
      <div class="right">
        <v-ons-toolbar-button icon="md-thumb-up" v-on:click="likeMatch" modifier="outline"></v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <SwipeCards type="top" :top="topColor" :bottom="bottomColor" v-on:input="onSelect($event)"/>
    <SwipeCards type="bottom" :top="topColor" :bottom="bottomColor" v-on:input="onSelect($event)"/>

    <v-ons-dialog :visible.sync="modalVisible" cancelable>
      <v-ons-toolbar inline><div class="center">Send feedback</div></v-ons-toolbar>
      <form action="#" method="post">

        <v-ons-list>
          <v-ons-list-item>
            <p>Thank you for helping us out. If you want we can contact you about this clothing set.</p>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="center">
              <label for="email">Email:</label>
              <v-ons-input input-id="email" type="email" name="email" required v-model="email"/>
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-checkbox input-id="privacy" type="checkbox" name="privacy" required v-modal="privacy"/>
            <label for="privacy">I agree to be contacted once through my email address</label>
          </v-ons-list-item>

          <v-ons-list-item>
            <v-ons-button>Cancel</v-ons-button>
            <v-ons-button>Send</v-ons-button>
          </v-ons-list-item>
        </v-ons-list>
      </form>
    </v-ons-dialog>

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
      clothingSet: {},
      modalVisible: false,
      email: '',
      privacy: false
    }
  },
  methods: {
    likeMatch() {
      //this.modalVisible = true;
      this.axios.post(
        'http://2ndhandstylist.com/data/v1/future-fashion/color-clothing-set/',
        {
          top_color: this.topColor,
          bottom_color: this.bottomColor,
          top_item: this.clothingSet['top'],
          bottom_item: this.clothingSet['bottom']
        }
      ).then((response) => {
          this.$ons.notification.alert("Thank you for your feedback");
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
    SwipeCards
  }
};

</script>

<style>
.ons-icon {
  width: 20px;
  text-align: center;
}
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
