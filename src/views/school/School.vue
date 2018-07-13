<template>
    <div class="main-content-container">
        <div class="content-nav-container">
            <router-link :to="{ name: 'classes' }"><p>Классы</p></router-link>
            <router-link :to="{ name: 'teachers' }"><p>Учителя</p></router-link>
            <router-link :to="{ name: 'pupils' }"><p>Ученики</p></router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {

}
</script>


<style scoped>

.main-content-container {
    width: 830px;
    height: fit-content;
    border: 1px #89888752 solid;
    border-radius: 4px;
    background-color: white;
    margin: 0px auto;
    margin-top: 27px;
    margin-bottom: 30px;
}

.content-nav-container {
    display: flex;
    flex-direction: row;
    width: 800px;
    margin: 0px auto;
    margin-top: 15px;
}

.content-nav-container > a {
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    cursor: pointer;
    color: white;
    display: block;
    background-color: #898887;
    width: 33.33%;
    height: 33px;
    border: 1px solid white;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}

a.router-link-exact-active {
    background-color:#ff8d00 !important;
}

@media screen and (max-width: 850px) {
    .main-content-container {
        width: 602px;
        padding: 15px;
    }

    .content-nav-container {
        width: 600px;
        margin-top: 0;
    }

}

@media screen and (max-width: 650px) {
    .main-content-container {
        width: 85%;
        max-width: 402px;
    }

    .content-nav-container {
        max-width: 400px;
        width: 100%;
    }
}

</style>
