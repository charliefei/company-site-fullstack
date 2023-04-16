<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar{
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb{
  background-color: #207f4c;
}

::-webkit-scrollbar-track{
  background-color: #ddd;
}
</style>