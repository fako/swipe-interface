<template id="main-page">
  <div id="home">
	Pick a color for your top<br><br>
	<chrome-picker :value="colors" @input="selectColor"></chrome-picker>
	<svg id="svg1" xmlns="http://www.w3.org/2000/svg" style="width: 3.5in; height: 3.5in">
  	<rect id="rect-top" width="300" height="300" 
            v-bind:style="{fill: hex }"/>
  	</svg>
	<br><br>
	<a v-on:click="monochromaticColor()">Give me a monochrome color for the bottom!</a>
	<br><br>
	<a v-on:click="complementaryColor()">Give me a complementary color for the bottom!</a>
	<br><br>
    <a v-on:click="showClothes()">Show clothes!</a>
  </div>
</template>

<script>

import { Chrome } from 'vue-color';

import tinycolor from 'tinycolor2';

import _ from 'lodash';

export default {
  name: 'home',
  methods: {
    showClothes() {
    	if (!this.secondColors.length) {
    		alert('Please pick a ...');
    		return;
    	}
    	let ix = _.random(1, this.secondColors.length-1);
    	let top = this.hex.slice(1);
    	let bottom = this.secondColors[ix].slice(1);
    	console.log(top, bottom);
      // this.$router.push({ path: '/swipe', query: { top , bottom } });
    },
    selectColor(event) {
    	this.hex= event.hex;
    },
    monochromaticColor() {
    	let colors = tinycolor(this.hex).monochromatic(); 
    	colors = colors.map(function(t) { return t.toHexString(); });
    	this.secondColors = colors;
    },
    complementaryColor() {
    	let colors = tinycolor(this.hex).triad(); 
    	colors = colors.map(function(t) { return t.toHexString(); });
    	this.secondColors = colors;
    }
  },
  data () {
    return {
      colors,
      hex:'',
      secondColors: []
    };
  },
  components: {
    'chrome-picker': Chrome,
  }
};

let colors = {
  hex: '#000000',
  hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
  hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
  rgba: { r: 25, g: 77, b: 51, a: 1 },
  a: 1
};

// console.log(colors);

// tinycolor.monochromatic(colors){
// 	return 

// 	colors.map(function(t) { return t.toHexString(); });
// }
// };


</script>

<style>

</style>
