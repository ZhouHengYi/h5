import { DirectiveOptions, DirectiveFunction } from 'vue';

const ScrollEnd: DirectiveOptions = {
    inserted(el, binding, vnode) {
        const fn = binding.value;

        if (typeof fn !== 'function') {
            throw new Error('directive scroll-end must bind in a functon');
        } else {
            el.addEventListener(
                'scroll',
                function() {
                    if (el && el.scrollHeight - el.scrollTop - el.clientHeight < 1) {
                        fn();
                    }
                },
                { passive: true },
            );
        }
    },
};

export default ScrollEnd;
