<template id="main-page">
  <v-ons-page>
	<v-ons-toolbar>
	  <div class="center">Set Matching Test</div>
	</v-ons-toolbar>
	<v-ons-list>
      <v-ons-list-item>
        <div class="title-text"><span class="title-number">1.)</span>Pick a color for your top</div>
	  </v-ons-list-item>
	  <v-ons-list-item>
		<chrome-picker :value="colors" @input="selectColor"></chrome-picker>
		  <!--<svg id="svg1" xmlns="http://www.w3.org/2000/svg" style="width: 100px; height: 100px">-->
			  <!--<g class="g0">-->
				  <!--<g class="g01">-->
					  <!--<rect id="rect-top" width="100" height="100" v-bind:style="{fill: hex }"/>-->
				  <!--</g>-->
				  <!--<g class="g02">-->
					  <!--<foreignObject width="100" height="100">-->
						  <!--<img src="assets/topmask.png">-->
					  <!--</foreignObject>-->
				  <!--</g>-->
			  <!--</g>-->
		  <!--</svg>-->
      </v-ons-list-item>
	  <v-ons-list-item>
		<div class="title-text"><span class="title-number">2.)</span>Pick a color for your bottom</div>
	  </v-ons-list-item>
	  <v-ons-list-item>
		<v-ons-row class="color-button-row">
		  <v-ons-col width="33%">
		    <v-ons-radio class="color-button" v-bind:style="{background: monoColors[1]}" v-model="bottomColor" :value="monoColors[1]"></v-ons-radio>
		  </v-ons-col>
		  <v-ons-col width="33%">
			<v-ons-radio class="color-button" v-bind:style="{background: monoColors[5]}" v-model="bottomColor" :value="monoColors[5]"></v-ons-radio>
		  </v-ons-col>
		  <v-ons-col width="33%">
		    <v-ons-radio class="color-button" v-bind:style="{background: monoColors[3]}" v-model="bottomColor" :value="monoColors[3]"></v-ons-radio>
		  </v-ons-col>
		</v-ons-row>
	    <v-ons-row class="color-button-row">
		  <v-ons-col width="33%">
			<v-ons-radio class="color-button" v-bind:style="{background: complimentaryColors[1]}" v-model="bottomColor" :value="complimentaryColors[1]"></v-ons-radio>
		  </v-ons-col>
		  <v-ons-col width="33%">
			<v-ons-radio class="color-button" v-bind:style="{background: complimentaryColors[2]}" v-model="bottomColor" :value="complimentaryColors[2]"></v-ons-radio>
		  </v-ons-col>
	    </v-ons-row>
			<!--<a v-on:click="monochromaticColor()">-->
				<!--<section style="margin: 16px">-->
					<!--<v-ons-button modifier="large" style="margin: 6px 0">Give me a monochrome color for the bottom!</v-ons-button> &lt;!&ndash; Ik kon niet vinden hoe ik deze button dezelfde kleur kon geven als de kleur die er random wordt gegenereerd. Ik zag niks staan in de documentatie van Ons hierover, heb geprobeerd te zoeken naar "normale" javascript buttons waarmee dit kan maar is niet gelukt. &ndash;&gt;-->
				<!--</section>-->
			<!--</a>-->
	  </v-ons-list-item>
	  <v-ons-list-item>
		<div class="title-text"><span class="title-number">3.)</span>Search for clothing sets and like them</div>
	  </v-ons-list-item>
	  <v-ons-list-item>
		<v-ons-button class="start-button" @click="showClothes()">Start !</v-ons-button>
	  </v-ons-list-item>
	</v-ons-list>
  </v-ons-page>
</template>

<script>

import { Chrome } from 'vue-color';

import tinycolor from 'tinycolor2';

export default {
  name: 'home',
  methods: {
    showClothes() {
	  let top = this.topColor.slice(1);
	  let bottom = this.bottomColor.slice(1);
	  this.$router.push({ path: '/swipe', query: { top , bottom } });
    },
    selectColor(event) {
	  this.topColor = event.hex;
	  this.setMonochromaticColor();
	  this.setComplementaryColor();
    },
    setMonochromaticColor() {
	  let colors = tinycolor(this.topColor).monochromatic();
	  colors = colors.map(function(t) { return t.toHexString(); });
	  this.monoColors = colors;
    },
    setComplementaryColor() {
	  let colors = tinycolor(this.topColor).tetrad();
	  colors = colors.map(function(t) { return t.toHexString(); });
	  this.complimentaryColors = colors;
    }
  },
  mounted() {
    this.selectColor(this.colors);
    this.bottomColor = this.monoColors[1];
  },
  data () {
    return {
      colors: {
	    hex: '#19D376'
      },
      topColor: '',  // set during mount
	  bottomColor: '',  // set during mount
      monoColors: [],
      complimentaryColors: [],
    };
  },
  components: {
    'chrome-picker': Chrome,
  }
};



</script>

<style>

.vc-chrome {
  margin: 0 auto;
}
.vc-chrome .vc-chrome-fields-wrap {
  display: none;
}
.title-number {
  padding-right: 20px;
}
.color-button {
  width: 60px;
  height: 40px;
  text-align: center;
}
.color-button-row {
  margin-bottom: 10px;
}
.start-button {
  margin: 0 auto;
}
:checked + .radio-button__checkmark {
  background: white;
  margin-top: 7px;
  border: 1px solid #0076ff;
}
.title-text {
  font-size: 17px;
}

</style>
