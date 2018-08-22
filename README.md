# swipe-interface-onsen
frontend swipe interface to communicate evaluations to a backend process.

Make sure to set *apiUrl* and *baseUrl* in *src/components/SwipeCards.vue* on
lines 29/30 to the right values.

This module will request a new image by sending a post request to the apiUrl,
with a json payload with 'id' (string), 'like' (int, 0 or 1) and 'score'
(float, 0-1) keys. (For the first request they are set to null.)

It then expects a json response with 'id' and 'url' keys. (The url for the image
is concatenated with the baseUrl.)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
