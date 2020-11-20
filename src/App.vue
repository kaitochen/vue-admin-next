<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0 !important;
}
* {
  margin: 0;
}
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background: #f2f2f2;
  padding-right: 2px;
}
::-webkit-scrollbar-thumb {
  background: #b4bbc5;
  border-radius: 10px;
  border: 0;
}
</style>
