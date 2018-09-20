<template id="main-page">
  <div id="home">
  	<center>
  	<br>
	<font face="verdana">Pick a color for your top</font><br><br>
	<chrome-picker :value="colors" @input="selectColor"></chrome-picker><br>
	<svg id="svg1" xmlns="http://www.w3.org/2000/svg" style="width: 100px; height: 100px">
		<g class="g0">
			<g class="g01">
  				<rect id="rect-top" width="100" height="100" v-bind:style="{fill: hex }"/>
  			</g>
  			<g class="g02">
            <foreignObject width="100" height="100">
                <img src="src/assets/topmask.png"> <!-- op de een of andere manier laadt hij dit plaatje niet. Het lukte wel met een ander random plaatje van het web dus de manier van de code opzetten werkt wel. Zou ook moeten werken voor de bottom.
                Het zou ook mooi zijn als het t-shirt naast de color pickers verscheen ipv eronder. -->
            </foreignObject>
        	</g>
        </g>
  	</svg>
	<br><br>
	<a v-on:click="monochromaticColor()">
		<section style="margin: 16px">
      		<v-ons-button modifier="large" style="margin: 6px 0">Give me a monochrome color for the bottom!</v-ons-button> <!-- Ik kon niet vinden hoe ik deze button dezelfde kleur kon geven als de kleur die er random wordt gegenereerd. Ik zag niks staan in de documentatie van Ons hierover, heb geprobeerd te zoeken naar "normale" javascript buttons waarmee dit kan maar is niet gelukt. -->
    	</section>
	</a>
	<br><br>
	<a v-on:click="complementaryColor()">Give me a complementary color for the bottom!</a>
	<br><br>
    <a v-on:click="showClothes()">Show clothes!</a>
	</center>
  </div>

</template>

<script>

// document.getElementById("home").style.overflow = "scroll"; <!-- de pagina scrollt nog steeds niet. Volgens mij zag ik dat je het wel in jouw document had opgelost. Dit was hoeveer ik was gekomen met mijn poging. Ik denk dat ik vaak de opbouw van de documenenten nog niet helemaal snap en daarom niet snap waar ik in de code iets moet veranderen of waar ik naar moet verwijzen. -->

import { Chrome } from 'vue-color';

import tinycolor from 'tinycolor2';

import _ from 'lodash';

export default {
  name: 'home',
  methods: {
    showClothes() {
    	if (!this.secondColors.length) {
    		alert('Please pick a color and choose for a complementary or monochromatic ("ton sur ton") second color.');
    		return;
    	}
    	let ix = _.random(1, this.secondColors.length-1);
    	let top = this.hex.slice(1);
    	let bottom = this.secondColors[ix].slice(1);
    	console.log(top, bottom);
        this.$router.push({ path: '/swipe', query: { top , bottom } });
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

</script>

<style>

</style>
