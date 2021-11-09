<template>
    <div class="home">
        <particles
            id="tsparticles"
            class="particles"
            :particles-init="particlesInit"
            :particles-loaded="particlesLoaded"
            :options="particleOptions"
        />
        <hero-section />
    </div>
</template>

<script>
    import HeroSection from '@/components/HeroSection'

    export default {
        components: {
            HeroSection
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
                            },
                            onDiv: {
                                selectors: '#repulse-div',
                                mode: 'repulse'
                            }
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40
                            },
                            grab: {
                                distance: 400
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
                            distance: 150,
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
                            speed: 2
                        },
                        number: {
                            density: {
                                enable: true
                            },
                            limit: 500,
                            value: 200
                        },
                        opacity: {
                            value: 1,
                            animation: {
                                speed: 1,
                                minimumValue: 0.1
                            }
                        },
                        size: {
                            value: 1,
                            animation: {
                                speed: 30,
                                minimumValue: 0.1
                            }
                        }
                    }
                }
            }
        },
        methods: {
            particlesInit() {
                console.log('particlesInit')
            },
            particlesLoaded() {
                console.log('particlesLoaded')
            }
        }
    }
</script>

<style scoped>
.home {
    background: url('~@/assets/hero-image.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    min-height: 100vh;
}

.particles {
    color: hsl(0, 0%, 30%);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    z-index: 0;
}
</style>
