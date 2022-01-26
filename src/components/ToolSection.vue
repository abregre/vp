<template>
    <section id="toolSection" class="tool-section">
        <div class="section-header">
            <h2 class="main-content-title">Tools</h2>
        </div>
        <div class="external-container">
            <div class="tools-info">
                Here are some tools and technologies that I use.<br>My frontend framework to go is Vue, but I also use other frameworks such as React.<br>I also prefer vanilla CSS for most applications, but I also use SASS for some projects.
            </div>
            <div class="tools-container">
                <div
                    v-for="tool in tools"
                    :key="tool.id"
                    class="tool"
                >
                    <img
                        :src="require('@/assets/svg/tool-logos/' + tool.fileName)"
                        :alt="tool.name"
                        :title="tool.name"
                        class="tool-icon"
                    >
                </div>
            </div>
        </div>
        <div class="external-container">
            <div class="books-info">
                Here are some books that I am reading through over and over again.<br>I want to suggest these books since they are a great source of deep knowledge and guides to write better code.
            </div>
            <div class="books-container">
                <div
                    v-for="book in books"
                    :key="book.id"
                    class="book"
                >
                    <img
                        :src="require('@/assets/covers/' + book.fileName)"
                        :alt="book.title"
                        class="book-cover"
                    >
                    <div class="book-info">
                        <div v-dompurify-html="book.title" class="book-title" />
                        <div v-dompurify-html="book.author" class="book-author" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    export default {
        components: {
        },
        data() {
            return {
                tools: [
                    {
                        id: 1,
                        name: 'JavaScript',
                        fileName: 'js-logo.svg'
                    },
                    {
                        id: 2,
                        name: 'Vue',
                        fileName: 'vue-logo.svg'
                    },
                    {
                        id: 3,
                        name: 'CSS',
                        fileName: 'css-logo.svg'
                    },
                    {
                        id: 4,
                        name: 'HTML',
                        fileName: 'html-logo.svg'
                    },
                    {
                        id: 5,
                        name: 'StyleLint',
                        fileName: 'stylelint-logo.svg'
                    },
                    {
                        id: 6,
                        name: 'EsLint',
                        fileName: 'eslint-logo.svg'
                    },
                    {
                        id: 7,
                        name: 'Jest',
                        fileName: 'jest-logo.svg'
                    },
                    {
                        id: 8,
                        name: 'Git',
                        fileName: 'git-logo.svg'
                    },
                    {
                        id: 9,
                        name: 'Yarn',
                        fileName: 'yarn-logo.svg'
                    },
                    {
                        id: 10,
                        name: 'Npm',
                        fileName: 'npm-logo.svg'
                    },
                    {
                        id: 11,
                        name: 'Babel',
                        fileName: 'babel-logo.svg'
                    },
                    {
                        id: 12,
                        name: 'Nuxt',
                        fileName: 'nuxt-logo.svg'
                    },
                    {
                        id: 13,
                        name: 'Ubuntu',
                        fileName: 'ubuntu-logo.svg'
                    },
                    {
                        id: 14,
                        name: 'Sass',
                        fileName: 'sass-logo.svg'
                    },
                    {
                        id: 15,
                        name: 'Stylus',
                        fileName: 'stylus-logo.svg'
                    },
                    {
                        id: 16,
                        name: 'React',
                        fileName: 'react-logo.svg'
                    },
                    {
                        id: 17,
                        name: 'JSON',
                        fileName: 'json-logo.svg'
                    },
                    {
                        id: 18,
                        name: 'Figma',
                        fileName: 'figma-logo.svg'
                    },
                    {
                        id: 19,
                        name: 'Adobe XD',
                        fileName: 'xd-logo.svg'
                    },
                    {
                        id: 20,
                        name: 'Photoshop',
                        fileName: 'photoshop-logo.svg'
                    }
                ],
                books: [
                    {
                        id: 1,
                        title: '<span class="strong-text">Clean Code</span>: A Handbook of Agile Software Craftsmanship',
                        author: '<span class="strong-text">Robert C. Martin</span>',
                        fileName: 'cleanCode-cover.png'
                    },
                    {
                        id: 2,
                        title: '<span class="strong-text">The Clean Coder</span>: A Code of Conduct for Professional Programmers',
                        author: '<span class="strong-text">Robert C. Martin</span>',
                        fileName: 'cleanCoder-cover.png'
                    },
                    {
                        id: 3,
                        title: '<span class="strong-text">Refactoring</span>: Improving the Design of Existing Code, 2nd Edition',
                        author: '<span class="strong-text">Martin Fowler</span>',
                        fileName: 'refactoring-cover.png'
                    },
                    {
                        id: 4,
                        title: '<span class="strong-text">Eloquent JavaScript</span>, 3rd Edition: A Modern Introduction to Programming',
                        author: '<span class="strong-text">Marijn Haverbeke</span>',
                        fileName: 'eloquent-cover.png'
                    },
                    {
                        id: 5,
                        title: '<span class="strong-text">Head First Design Patterns</span>, 2nd Edition',
                        author: '<span class="strong-text">Eric Freeman</span> & <span class="strong-text">Elisabeth Robson</span>',
                        fileName: 'headFirst-cover.png'
                    },
                    {
                        id: 6,
                        title: '<span class="strong-text">CSS Secrets</span>',
                        author: '<span class="strong-text">Lea Verou</span>',
                        fileName: 'cssSecrets-cover.png'
                    }
                ]
            }
        },
        mounted() {
            gsap.registerPlugin(ScrollTrigger)

            ScrollTrigger.batch('.tool', {
                onEnter: batch => {
                    gsap.from(batch, {
                        autoAlpha: 0,
                        duration: 0.2,
                        stagger: {
                            each: 0.1
                        }
                    })
                }
            })

            ScrollTrigger.batch('.book', {
                onEnter: batch => {
                    gsap.from(batch, {
                        autoAlpha: 0,
                        x: '100%',
                        duration: 0.5,
                        stagger: {
                            each: 0.5
                        }
                    })
                }
            })
        }
    }
</script>

<style scoped>
.tool-section {
    color: var(--font-color);
    position: relative;
    width: 90%;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    margin: 3rem auto;
    overflow: hidden;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main-content-title {
    font-size: var(--mobile-font-title);
    font-family: var(--font-headers);
    font-weight: 700;
    text-shadow: var(--text-shadow-light);
}

.tools-info,
.books-info {
    font-size: var(--mobile-font-body);
    font-family: var(--font-body);
    text-shadow: var(--text-shadow-light);
    margin: 2rem auto;
    text-align: center;
    max-width: 60ch;
}

.tools-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5vh;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    background: hsla(0, 0%, 100%, 0.7);
    box-shadow: var(--text-shadow-light);
    border-radius: 10px;
}

.tool {
    max-width: 60px;
    cursor: pointer;
    display: grid;
    place-items: center;
}

.tool-icon {
    width: 100%;
    height: auto;
    transition: transform 0.4s ease-in-out;
}

.tool:hover .tool-icon {
    transform-style: preserve-3d;
    transform: rotateY(360deg);
}

.books-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.book {
    background: hsla(0, 0%, 100%, 0.7);
    box-shadow: var(--text-shadow-light);
    border-radius: 10px;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.book-cover {
    width: auto;
    max-height: 150px;
    height: auto;
}

.book-info {
    margin: 0 1rem;
    color: var(--base-color);
    font-weight: lighter;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.book-author {
    margin-top: 1rem;
}

@media screen and (min-width: 768px) {
    .main-content-title {
        font-size: var(--tablet-font-title);
    }

    .tools-info,
    .books-info {
        font-size: var(--tablet-font-body);
        margin: 3rem auto;
    }

    .tools-container {
        grid-template-columns: repeat(5, 1fr);
        max-width: 650px;
    }

    .tool {
        max-width: 90px;
    }

    .books-container {
        padding: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}

@media screen and (min-width: 1024px) {
    .external-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 3rem auto;
    }

    .tools-container {
        max-width: 750px;
        width: 60%;
    }

    .tools-info,
    .books-info {
        text-align: left;
        font-size: calc(var(--desktop-font-body) * 1.3);
        max-width: 500px;
        margin: 3rem 2rem;
    }

    .tool {
        max-width: 100px;
    }

    .books-container {
        padding: 2rem;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        max-width: 1000px;
        width: 60%;
        margin: 0 auto;
    }
}

</style>
