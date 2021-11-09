<template>
    <div class="navbar-container">
        <div v-scroll-to="'#aboutSection'" class="custom-btn">
            <span class="noselect">About</span>
        </div>
        <div v-scroll-to="'#workSection'" class="custom-btn">
            <span class="noselect">Works</span>
        </div>
        <div v-scroll-to="'#toolSection'" class="custom-btn">
            <span class="noselect">Tools</span>
        </div>
        <div v-scroll-to="'#contactSection'" class="custom-btn">
            <span class="noselect">Contact</span>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
.navbar-container {
    margin-top: 10vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.custom-btn {
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    width: 100%;
    max-width: 90px;
    min-height: 40px;
    display: grid;
    place-items: center;
    position: relative;
    user-select: none;
}

.custom-btn::before {
    transition: 300ms;
    height: 2px;
    content: "";
    position: absolute;
    background-color: #fff;
    width: 0%;
    bottom: 0;
}

.custom-btn:hover::before {
    width: 100%;
}

@media screen and (min-width: 768px) {
    .custom-btn {
        font-size: 1.5rem;
    }
}

@media screen and (min-width: 1024px) {
    .navbar-container {
        margin-top: 15vh;
    }

    .custom-btn {
        max-width: 170px;
        min-height: 50px;
        font-size: 2rem;
    }

    .custom-btn::before {
        height: 3px;
        bottom: -0.5rem;
    }
}

</style>
