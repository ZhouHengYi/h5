import { DirectiveOptions } from 'vue';
import Hammer from 'hammerjs';

const hammer: DirectiveOptions = {
    bind: (el, binding,vnode) => {
        const hammertime = new Hammer(el);

        let finalEvent = 'tap';
        const events = ['swipeleft', 'swiperight', 'press'];

        for (let item of events) {
            if (Object.keys(binding.modifiers).indexOf(item) >= 0) {
                finalEvent = item;
                break;
            }
        }
        hammertime.on(finalEvent, binding.value);
    }
};

export default hammer;
