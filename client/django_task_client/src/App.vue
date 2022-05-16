<template>
  <div id="app">
  <div id="nav">  
  <nav>
    <router-link to="/">Tasks</router-link> |
    <router-link to="/search">Search Tasks</router-link>
  </nav>
  </div>
  <transition 
   mode="out-in" 
   enter-active-class="animate__animated animate__fadeInRight"
   leave-active-class="animate__animated animate__slideOutLeft"
   >
  <router-view/>
  </transition>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 0px;
  background-color: rgba(49, 49, 49, 0.623);
  height: 50px;
  text-decoration: none;
  color: white;
}

nav a {
  font-weight: bold;
  color: #11bcd38a;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #0cdfd4;
  text-decoration: none;
}

@media(max-width : 520px){
  nav {
    border-radius: 20px;
    height: 80px;
  }
}
</style>
