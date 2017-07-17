<template>
    <div :class="{ open: show, dropdown: !dropup, dropup: dropup}">
        <button
            class="dropdown-button"
            :aria-expanded="show"
            @click="toggle($event)"
            :disabled="disabled">
            <span v-html="text" v-show="text"></span>
            <span class="dropdown-caret"><i class="icon-down"></i></span>
        </button>
        <ul class="dropdown-menu">
            <li @click="clicked" class="dropdown-item">User Settings</li>
            <li @click="clicked" class="dropdown-item">Logout</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false
            }
        },
        props: {
            text: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            toggle(e) {
                this.show = !this.show
                if (this.show) {
                    this.$dispatch('shown::dropdown')
                    e.stopPropagation()
                } else {
                    this.$dispatch('hidden::dropdown')
                }
            },
            clicked() {
                this.show = false
            }
        },
        events: {
            'hide::dropdown'() {
                this.show = false
            }
        }
    }
</script>

<<style lang="scss">
    @import "~styles/variables.scss";

    
    @mixin text-dropdown() {
        color: $primary-color;
        font-size:
        letter-spacing: 0.4px;
}
    .dropdown {
        position: relative;
        display: inline-block;
        margin-right: 2rem;
        &.open .dropdown-button {
            color: $primary-color;
        }
    }

    .dropdown-button {
        background: none;
        border: none;
        padding: 0;
        @include text-dropdown();
        @include transition (all 0.12s linear);
        &:hover {
            color: darken($secondary-color, 20);
        }
    }

    .open > .dropdown-menu,
    .open > .dropdown-flyout {
        display: block;
    }

    .open .dropdown-caret {
        transform: rotate(180deg);
        display: inline-block;
    }

    .dropdown-caret {
        @include transition (all 0.1s linear);
        margin-left: 2px;
        font-size: 12px;
    }

    .dropdown-circle {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 11px;
        position: relative;
        border: 2px solid $primary-color;
        top: 3px;
        margin-right: 2px;
        &.visible {
            border: 2px solid $secondary-color;
        }
        &.hidden {
            border: 2px solid $extra-color;
        }
        &.preview {
            border: 2px solid $secondary-color;
        }
        &.scheduled {
            border: 2px solid $primary-color;
        }
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        z-index: 1000;
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

    .dropdown-settings {
        font-size: 19px;
        margin-left: 0;
        line-height: 1;
        position: relative;
        top: 3px;
        color: $color-label;
        @include transition (all 0.1s linear);
        &:hover {
            cursor: pointer;
            color: $extra-color;
        }
        .icon-delete {
            font-size: 21px;
            @include transition (all 0.1s linear);
            top: 4px;
            &:hover {
                color: $extra-color;
            }
        }
    }

    .open .dropdown-settings {
        color: $extra-color;
    }

    .dropdown-flyout {
        position: absolute;
        top: 100%;
        z-index: 1000;
        display: none;
        width: 400px;
        right: -1.5rem;
        margin: 15px 0 0;
        border-radius: 5px;
        box-shadow: 0px 0px 5px 0px $color-border;
        background: #fff;
        padding: 1.5rem;
        h2 {
            @include text-menulist();
            line-height: 1;
            margin-bottom: 1rem;
        }
        .button {
            margin-top: 0.6rem;
        }
    }

    .dropdown-arrow:before {
        top: -11px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 10px solid rgba(57,70,78,.15);
        border-style: none double solid;
        display: block;
        position: absolute;
        right: 1.5rem;
        vertical-align: middle;
        content: "";
        width: 0;
        height: 0;
    }

    .dropdown-arrow:after {
        top: -10px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 10px solid #fff;
        border-style: none double solid;
        display: block;
        position: absolute;
        right: 1.5rem;
        vertical-align: middle;
        content: "";
        width: 0;
        height: 0;
    }

    .dropdown-left .dropdown-menu {
        right: -0.5rem;
    }

    .dropdown-right .dropdown-menu {
        left: -0.5rem;
    }
</style>