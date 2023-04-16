<template>
  <div>home</div>
</template>

<script setup>
import axios from 'axios'
import { onMounted } from 'vue'

onMounted(async () => {
  const res = await axios({
    method: 'get',
    url: 'admin/user/home'
  })
  console.log(res);
})

</script>

<style scoped lang="scss">

</style>