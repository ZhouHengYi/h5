import { DirectiveOptions, DirectiveFunction } from 'vue';

const Focus: DirectiveOptions = {
    inserted(el, binding, vnode) {
        el.focus()
    },
};

export default Focus;
