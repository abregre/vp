<template>
    <div class="footer">
        Made with <img :src="require('@/assets/svg/heart-icon.svg')" alt="heart" class="heart"> by <a href="https://github.com/abregre" target="_blank">Vasilis Paparidis</a>
    </div>
</template>

<style scoped>
.heart {
    color: hsl(0, 95%, 44%);
    width: 1rem;
    height: 1rem;
    animation: pulse 1s infinite;
    margin: 0 0.5rem;
}

.footer {
    padding: 1rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
}

.footer,
a {
    color: var(--font-color);
    text-shadow: var(--text-shadow-light);
    text-decoration: none;
    font-family: var(--font-headers);
}

a {
    margin-left: 0.25rem;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>
