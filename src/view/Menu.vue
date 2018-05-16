<template>
  <div class="container">
      <header>
          <a href="https://new.effor.by/home">
              <img src="../assets/header_logo.jpg" alt="Could not load an image" class="header-logo-img">
          </a>
          <button class="user-profile-container">
              <img src="../assets/avatar_default.png" alt="Could not load and image" class="avatar-logo-img">
              <p>Анна</p>
          </button>
      </header>

      <main>

      </main>

      <footer>
          <div>
              <p class="footer-text">
                  © <a href="https://new.effor.by/home">Интеллект Онлайн, </a> 2014-2017
              </p>
          </div>

          <button class="about-button">
              <div class="about-logo">
                  i
              </div>
              <p>
                  О платформе
              </p>
          </button>
      </footer>
  </div>
</template>


<script>
import {router} from '../main.js';

export default {
    methods: {
        redirect(url) {
            router.push(url);
        }
    }
}
</script>

<style scoped>

.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: Philosopher, sans-serif;
    color: #898887;
}

header, main, footer {
    width: 100%;
    display: flex;
}

header {
    flex-direction: row;
    height: 73px;
    border-bottom: 1px black solid;
    justify-content: space-between;
    align-items: center;
    background: url('../assets/header_background.jpg') center bottom;
    background-repeat: no-repeat;
}

header > a {
    margin-left: 10px;
}

header > button {
    background: none;
    border: 0;
    margin-right: 20px;
    font-size: 20px;
    color: #898887;
    font-family: Philosopher, sans-serif;
    font-weight: 700;
    width: 100px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

header > button:hover {
    cursor: pointer;
    color: #ff8d00;
}

header > button > p {
    margin: 6px;
}

.avatar-logo-img {
    width: 27px;
    height: 27px;
    border: 2px #898887 solid;
    border-radius: 17px;
    margin-right: 5px;
}

main {
    height: 690px;
    background: url('../assets/main_background.jpg');
}

footer {
    border-top: 1px black solid;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

footer > div {
    font-size: 16px;
    display: flex;
    margin-left: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.about-button {
    margin-right: 10px;
    display: flex;
    flex-direction: row;
    width: 150px;
    justify-content: space-around;
    align-items: center;
    font-family: Philosopher, sans-serif;
    color: #898887;
    font-size: 18px;
    border: 0;
}

.about-button:hover {
    cursor: pointer;
}

.about-button > p {
    margin: 0;
}

.about-logo {
    height: 22px;
    width: 22px;
    margin: -4px 4px 0 0;
    float: left;
    border-radius: 100%;
    border: 1px solid #898887;
    text-align: center;
    font-weight: normal;
    font-size: 120%;
}

.footer-text > a{
    text-decoration: none;
    color: #898887;
}

</style>
