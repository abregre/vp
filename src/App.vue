<template>
    <div id="app">
        <particles
            id="tsparticles"
            class="particles"
            :options="particleOptions"
        />
        <sound />
        <router-view />
        <move-top />
    </div>
</template>

<script>
    import Sound from '@/components/Sound'
    import MoveTop from '@/components/MoveTop'
    export default {
        components: {
            Sound, MoveTop
        },
        data() {
            return {
                particleOptions: {
                    fullScreen: {
                        zIndex: 1
                    },
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'repulse'
                            }
                        },
                        modes: {
                            bubble: {
                                distance: 500,
                                duration: 2,
                                opacity: 0.8,
                                size: 40
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: 'fff'
                        },
                        links: {
                            color: {
                                value: 'hsl(0, 0%, 30%)'
                            },
                            distance: 500,
                            opacity: 0.1,
                            width: 1
                        },
                        move: {
                            attract: {
                                rotate: {
                                    x: 600,
                                    y: 1200
                                }
                            },
                            enable: true,
                            outModes: {
                                bottom: 'out',
                                left: 'out',
                                right: 'out',
                                top: 'out'
                            },
                            speed: 1
                        },
                        number: {
                            density: {
                                enable: true
                            },
                            limit: 150,
                            value: 150
                        },
                        opacity: {
                            value: 0.3,
                            animation: {
                                speed: 1,
                                minimumValue: 0.1
                            }
                        },
                        size: {
                            random: true,
                            minValue: 1,
                            maxValue: 3,
                            animation: {
                                speed: 30,
                                minimumValue: 0.1
                            }
                        }
                    }
                }
            }
        }
    }
</script>

<style>
@import '~@/global.css';

#app {
    background: url('~@/assets/hero-image.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    box-shadow: inset 0 0 0 1500px hsla(266, 31%, 15%, 0.6);
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: var(--font-headers);
    font-weight: bold;
    text-shadow: var(--text-shadow);
}

html,
body {
    font-family: var(--font-body);
}
</style>
