import { DirectiveOptions, DirectiveFunction } from 'vue';

function isnumber(el: any) {
    const remove = () => {
        el.value = el.value.replace(/\D/g, '')
        if (el.value.length >= 1) {
            el.value = el.value.replace(/[^0-9]/g, '')
            el.value = Number(el.value)
        } else {
            el.value = el.value.replace(/\D/g, '')
            // el.value = Number(el.value)
        }


    }
    el.onkeydown = remove
    el.onkeyup = remove
    el.onafterpaste = remove
    el.onchange = remove
    el.onpropertychange = remove
    el.onblur = remove
}

function isText(el: any) {
    const remove = () => {
        // el.value = el.value.replace(/(^[\u4E00-\u9FA5a-zA-Z0-9,，]{1,250}$)/g, '')
        if (el.value.length >= 1) {
            el.value = el.value.replace(/([^\u4E00-\u9FA5a-zA-Z0-9,，]{1,250}$)/g, '')
        } else {
            el.value = el.value.replace(/([^\u4E00-\u9FA5a-zA-Z0-9,，]{1,250}$)/g, '')
        }


    }
    el.onkeydown = remove
    el.onkeyup = remove
    el.onafterpaste = remove
    el.onchange = remove
    el.onpropertychange = remove
    el.onblur = remove
}
const inputType: DirectiveOptions = {
    inserted(el: any, binding, vnode) {
        if (binding.value == 'number') {
            isnumber(el)
        }
        else if (binding.value == 'text') {
            isText(el)
        }

    },
    update(el: any, binding, vnode) {
        if (binding.value == 'number') {
            isnumber(el)
        }
        else if (binding.value == 'text') {
            isText(el)
        }

    },
};

export default inputType;
