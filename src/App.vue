<template>
  <div id="app">
    <main class="main_content">
      <router-view class="main_screen"/>
    </main>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main_content{
  display: flex;
}
.main_screen{
  margin: 100px auto;
  width: 80vw;
}
</style>
