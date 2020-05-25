import { DirectiveOptions } from 'vue';

const onblur: DirectiveOptions = {
    bind(el: Element, binding: any, vnode: any) {
        el.addEventListener('blur', () => {
            document.body.scrollTop = 1
            document.documentElement.scrollTop = 1
        })
    },
    unbind(vnode: any) {

    },
    update(el: any, binding: any, vnode: any) {
        binding.def.unbind(vnode)
        binding.def.bind(el, binding, vnode)
    }
};

export default onblur;
