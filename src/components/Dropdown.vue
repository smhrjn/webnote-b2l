<template>
    <div class="dropdown" :class="{open: show}">
        <button
            class="dropdown-button"
            :aria-expanded="show"
            @click.stop="toggle($event)"
            :disabled="disabled">
            <span v-html="text" v-show="text"></span>
            <i class="arrow-down"></i>
        </button>
        <ul class="dropdown-menu">
            <li @click="userSettings" class="dropdown-item" >User Settings</li>
            <li @click="logout" class="dropdown-item" >Logout</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,

            }
        },
        props: {
            text: {
                type: String,
                default: 'Login'
            },
            disabled: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            toggle(e) {
                if(!this.token) {
                   this.$router.push('/login')
                }
                else {
                this.show = !this.show
                }
            },
            logout() {
                this.$store.dispatch('clearUserData')
                this.show = false
                this.$router.push('/')
            },
            userSettings() {
                this.$router.push('/usersettings')
                this.show = false
            },
        },
        computed: {
			token() {
				return this.$store.state.token;
			},
        }
    }
</script>

<<style lang="scss">
    @import "~styles/variables.scss";


    @mixin text-dropdown() {
        color: $primary-color;
        font-size: 1rem;
        text-align: center;
        letter-spacing: 0.4px;
    }
    .dropdown {
        position: relative;
        display: block;
        margin: auto;
        &.open .dropdown-button {
            color: $primary-color;
        }
    }

    .dropdown-button {
        background: none;
        display: block;
        border: none;
        margin: auto;
        @include text-dropdown();

    }

    .open > .dropdown-menu {
        display: block;
    }


    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: -90%;
        z-index: 2;
        display: none;
        min-width: 160px;
        margin: 5px 0 0;
        list-style: none;
        border-radius: 5px;
        padding: 0.5rem 0;
        box-shadow: 0px 0px 5px 0px $primary-color;
        line-height: 2.5;
        background: #fff;
        li {
            display: block;
            padding: 0rem 1.25rem;
            cursor: pointer;
            &:hover {
                background: lighten($secondary-color, 17);
            }
            span {
                margin-right: 0.5rem;
            }
        }
    }

    i {
      border: solid $primary-color;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
    }

    .arrow-down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }




</style>
