<template>
  <div class="swipe-cards">
    <div class="card-stack box-holder">
      <div class="box bg"></div>
      <vue-swing
        @throwout="onThrowout"
        @dragstart="onDragStart"
        @throwoutend="onThrowoutEnd"
        :config="swingConfig"
        ref="vueswing"
      >
        <div
          v-if="newImageReady" class="box card" ref="card"
          :style="{ backgroundImage: `url('${currentImageUrl}')` }"
        ></div>
      </vue-swing>
    </div>
    <v-ons-fab v-on:click="like" class="carousel-control left">
      <v-ons-icon icon="md-arrow-left"></v-ons-icon>
    </v-ons-fab>
    <v-ons-fab v-on:click="dislike" class="carousel-control right">
      <v-ons-icon icon="md-arrow-right"></v-ons-icon>
    </v-ons-fab>
  </div>
</template>

<script>
const apiUrl = 'http://2ndhandstylist.com/data/v1/future-fashion/annotate/';
const baseUrl = 'http://2ndhandstylist.com';

let startTime = Date.now();
let startDragTime = Date.now();
let currentLike = null;
let currentScore = null;

export default {
  name: 'SwipeCards',
  data () {
    return {
      swingConfig: {
        allowedDirections: [
          window.VueSwing.Direction.LEFT,
          window.VueSwing.Direction.RIGHT
        ],
        minThrowOutDistance: 500,
        maxRotation: 80,
      },
      currentImageUrl: null,
      currentImageId: '',
      newImageReady: false
    };
  },
  props: {
    msg: String,
  },
  beforeMount () {
    this.getImage();
  },
  methods: {
    onThrowout ({ target, throwDirection }) {
      currentLike = 1 * (throwDirection.toString() === 'Symbol(RIGHT)');
      let x = (Date.now() - startDragTime) / 1000; // swipe duration
      let scoreAbs = 2 ** (-x * x * 10); // gauss-like curve
      let likeSign = (currentLike * 2) - 1;
      currentScore = ((likeSign * scoreAbs) / 2) + 0.5;

      console.log(currentScore);
    },
    onDragStart () {
      startDragTime = Date.now();
    },
    onThrowoutEnd () {
      this.getImage();
    },
    like () {
      currentLike = 1;
      currentScore = 0.8;
      this.getImage();
    },
    dislike () {
      currentLike = 0;
      currentScore = 0.2;
      this.getImage();
    },
    getImage () {
      this.axios.post(
        apiUrl,
        {
          id: this.currentImageId,
          like: currentLike,
          score: currentScore
        }
      ).then((response) => {
        if (response.status === 204) {
          this.$router.push('/');
          return;
        }

        console.log('received:');
        console.log(response.data);

        this.currentImageId = response.data.id;
        this.currentImageUrl = `${baseUrl}/${response.data.url}`;
        this.newImageReady = true;
        const card = this.$refs.card;
        if (card !== undefined) {
          const stack = this.$refs.vueswing.stack;
          stack.getCard(card).throwIn(0, 0);
        }
      });
    }
  }
};
</script>

<style scoped>
.swipe-cards {
  position: relative;
}
.box-holder {
  position: relative;
  width: 80vw;
  height: 60vh;
  left: 10vw;
  margin-top: 15px;
}
@media screen and (orientation: landscape) {
  .box-holder {
    width: calc(80vh - 45px);
    height: calc(80vh - 45px);
    left: calc(50vw - 40vh + 22.5px);
    top: calc(10vw + 15px);
  }
}
.box {
  border-radius: 5px;
  position: absolute;
  width: 100%;
  height: 100%;
}
.box.card {
  border: 10px solid #bbb;
  background-color: #fff;
  background-size: cover;
  background-position: 50% 50%;
  margin: 0px;
  box-shadow: -4px 4px 16px rgba(0, 0, 0, 0.1);
}
.box.bg {
  background-color: #f3f3f3;
}
.carousel-control {
  position: absolute;
  bottom: 20px;
  display: inline-block;
  background-color: lightgray;
}
.carousel-control.right {
  right: 15px;
  float: right;
}
.carousel-control.left {
  left: 15px;
}
@media screen and (orientation: landscape) {
  .image-label {
    right: -40px;
    top: 0px;
  }
}
@media screen and (orientation: portrait) {
  .image-label {
    text-align: center;
    left: 0px;
    right: 0px;
  }
}
</style>
