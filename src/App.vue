<template>
  <div id="app">
    <header class="header">
      <div class="header__container">
        <h3 class="header__title">
          Catalog
        </h3>

        <div id="nav">
          <router-link class="nav__item" to="/">Home</router-link>
          <router-link class="nav__item" to="/brands">Brand</router-link>
        </div>
      </div>
    </header>

    <section class="section">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </section>

    <footer class="footer">
      <div class="footer__copyright">
        <p class="footer__copyright-item">
          &copy;
          {{ new Date().getFullYear() }}
          Maria Efremova
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="less">
  @import "./styles/global.less";
  @import "./styles/header.less";
  @import "./styles/button.less";
  @import "./styles/footer.less";
</style>
