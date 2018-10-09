/* tslint:disable */
import * as wasm from './rust_meetup_wasm_talk_bg';

let cachedDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_alert_b2dbe053494e5ee9(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    alert(varg0);
}

const __wbg_log_08f6471963464870_target = console.log;

export function __wbg_log_08f6471963464870(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_log_08f6471963464870_target(varg0);
}
/**
* @returns {void}
*/
export function init() {
    return wasm.init();
}

/**
* @param {Pattern} arg0
* @returns {void}
*/
export function draw(arg0) {
    return wasm.draw(arg0.ptr);
}

/**
* @returns {void}
*/
export function popup() {
    return wasm.popup();
}

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];

let slab_next = slab.length;

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

const __widl_f_set_property_CSSStyleDeclaration_target = CSSStyleDeclaration.prototype.setProperty || function() {
    throw new Error(`wasm-bindgen: CSSStyleDeclaration.prototype.setProperty does not exist`);
};

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

const stack = [];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];

        return val.obj;

    }
}

export function __widl_f_set_property_CSSStyleDeclaration(arg0, arg1, arg2, arg3, arg4, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    let varg3 = getStringFromWasm(arg3, arg4);
    try {
        __widl_f_set_property_CSSStyleDeclaration_target.call(getObject(arg0), varg1, varg3);
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __widl_instanceof_CanvasRenderingContext2D(idx) {
    return getObject(idx) instanceof CanvasRenderingContext2D ? 1 : 0;
}

const __widl_f_stroke_CanvasRenderingContext2D_target = CanvasRenderingContext2D.prototype.stroke || function() {
    throw new Error(`wasm-bindgen: CanvasRenderingContext2D.prototype.stroke does not exist`);
};

export function __widl_f_stroke_CanvasRenderingContext2D(arg0) {
    __widl_f_stroke_CanvasRenderingContext2D_target.call(getObject(arg0));
}

function GetOwnOrInheritedPropertyDescriptor(obj, id) {
    while (obj) {
        let desc = Object.getOwnPropertyDescriptor(obj, id);
        if (desc) return desc;
        obj = Object.getPrototypeOf(obj);
    }
    throw new Error(`descriptor for id='${id}' not found`);
}

const __widl_f_set_stroke_style_CanvasRenderingContext2D_target = GetOwnOrInheritedPropertyDescriptor(CanvasRenderingContext2D.prototype, 'strokeStyle').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(CanvasRenderingContext2D.prototype, 'strokeStyle').set does not exist`);
};

export function __widl_f_set_stroke_style_CanvasRenderingContext2D(arg0, arg1) {
    __widl_f_set_stroke_style_CanvasRenderingContext2D_target.call(getObject(arg0), getObject(arg1));
}

const __widl_f_set_fill_style_CanvasRenderingContext2D_target = GetOwnOrInheritedPropertyDescriptor(CanvasRenderingContext2D.prototype, 'fillStyle').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(CanvasRenderingContext2D.prototype, 'fillStyle').set does not exist`);
};

export function __widl_f_set_fill_style_CanvasRenderingContext2D(arg0, arg1) {
    __widl_f_set_fill_style_CanvasRenderingContext2D_target.call(getObject(arg0), getObject(arg1));
}

const __widl_f_line_to_CanvasRenderingContext2D_target = CanvasRenderingContext2D.prototype.lineTo || function() {
    throw new Error(`wasm-bindgen: CanvasRenderingContext2D.prototype.lineTo does not exist`);
};

export function __widl_f_line_to_CanvasRenderingContext2D(arg0, arg1, arg2) {
    __widl_f_line_to_CanvasRenderingContext2D_target.call(getObject(arg0), arg1, arg2);
}

const __widl_f_move_to_CanvasRenderingContext2D_target = CanvasRenderingContext2D.prototype.moveTo || function() {
    throw new Error(`wasm-bindgen: CanvasRenderingContext2D.prototype.moveTo does not exist`);
};

export function __widl_f_move_to_CanvasRenderingContext2D(arg0, arg1, arg2) {
    __widl_f_move_to_CanvasRenderingContext2D_target.call(getObject(arg0), arg1, arg2);
}

const __widl_f_fill_rect_CanvasRenderingContext2D_target = CanvasRenderingContext2D.prototype.fillRect || function() {
    throw new Error(`wasm-bindgen: CanvasRenderingContext2D.prototype.fillRect does not exist`);
};

export function __widl_f_fill_rect_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4) {
    __widl_f_fill_rect_CanvasRenderingContext2D_target.call(getObject(arg0), arg1, arg2, arg3, arg4);
}

const __widl_f_stroke_text_with_max_width_CanvasRenderingContext2D_target = CanvasRenderingContext2D.prototype.strokeText || function() {
    throw new Error(`wasm-bindgen: CanvasRenderingContext2D.prototype.strokeText does not exist`);
};

export function __widl_f_stroke_text_with_max_width_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4, arg5, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        __widl_f_stroke_text_with_max_width_CanvasRenderingContext2D_target.call(getObject(arg0), varg1, arg3, arg4, arg5);
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __widl_f_set_font_CanvasRenderingContext2D_target = GetOwnOrInheritedPropertyDescriptor(CanvasRenderingContext2D.prototype, 'font').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(CanvasRenderingContext2D.prototype, 'font').set does not exist`);
};

export function __widl_f_set_font_CanvasRenderingContext2D(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    __widl_f_set_font_CanvasRenderingContext2D_target.call(getObject(arg0), varg1);
}

const __widl_f_set_text_align_CanvasRenderingContext2D_target = GetOwnOrInheritedPropertyDescriptor(CanvasRenderingContext2D.prototype, 'textAlign').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(CanvasRenderingContext2D.prototype, 'textAlign').set does not exist`);
};

export function __widl_f_set_text_align_CanvasRenderingContext2D(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    __widl_f_set_text_align_CanvasRenderingContext2D_target.call(getObject(arg0), varg1);
}

const __widl_f_create_element_Document_target = Document.prototype.createElement || function() {
    throw new Error(`wasm-bindgen: Document.prototype.createElement does not exist`);
};

export function __widl_f_create_element_Document(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        return addHeapObject(__widl_f_create_element_Document_target.call(getObject(arg0), varg1));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __widl_f_get_element_by_id_Document_target = Document.prototype.getElementById || function() {
    throw new Error(`wasm-bindgen: Document.prototype.getElementById does not exist`);
};

function isLikeNone(x) {
    return x === undefined || x === null;
}

export function __widl_f_get_element_by_id_Document(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);

    const val = __widl_f_get_element_by_id_Document_target.call(getObject(arg0), varg1);
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

const __widl_f_body_Document_target = GetOwnOrInheritedPropertyDescriptor(Document.prototype, 'body').get || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(Document.prototype, 'body').get does not exist`);
};

export function __widl_f_body_Document(arg0) {

    const val = __widl_f_body_Document_target.call(getObject(arg0));
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

const __widl_f_set_attribute_Element_target = Element.prototype.setAttribute || function() {
    throw new Error(`wasm-bindgen: Element.prototype.setAttribute does not exist`);
};

export function __widl_f_set_attribute_Element(arg0, arg1, arg2, arg3, arg4, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    let varg3 = getStringFromWasm(arg3, arg4);
    try {
        __widl_f_set_attribute_Element_target.call(getObject(arg0), varg1, varg3);
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __widl_f_remove_Element_target = Element.prototype.remove || function() {
    throw new Error(`wasm-bindgen: Element.prototype.remove does not exist`);
};

export function __widl_f_remove_Element(arg0) {
    __widl_f_remove_Element_target.call(getObject(arg0));
}

const __widl_f_add_event_listener_with_callback_EventTarget_target = EventTarget.prototype.addEventListener || function() {
    throw new Error(`wasm-bindgen: EventTarget.prototype.addEventListener does not exist`);
};

export function __widl_f_add_event_listener_with_callback_EventTarget(arg0, arg1, arg2, arg3, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        __widl_f_add_event_listener_with_callback_EventTarget_target.call(getObject(arg0), varg1, getObject(arg3));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __widl_instanceof_HTMLCanvasElement(idx) {
    return getObject(idx) instanceof HTMLCanvasElement ? 1 : 0;
}

const __widl_f_get_context_HTMLCanvasElement_target = HTMLCanvasElement.prototype.getContext || function() {
    throw new Error(`wasm-bindgen: HTMLCanvasElement.prototype.getContext does not exist`);
};

export function __widl_f_get_context_HTMLCanvasElement(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {

        const val = __widl_f_get_context_HTMLCanvasElement_target.call(getObject(arg0), varg1);
        return isLikeNone(val) ? 0 : addHeapObject(val);

    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __widl_f_set_width_HTMLCanvasElement_target = GetOwnOrInheritedPropertyDescriptor(HTMLCanvasElement.prototype, 'width').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(HTMLCanvasElement.prototype, 'width').set does not exist`);
};

export function __widl_f_set_width_HTMLCanvasElement(arg0, arg1) {
    __widl_f_set_width_HTMLCanvasElement_target.call(getObject(arg0), arg1);
}

const __widl_f_set_height_HTMLCanvasElement_target = GetOwnOrInheritedPropertyDescriptor(HTMLCanvasElement.prototype, 'height').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(HTMLCanvasElement.prototype, 'height').set does not exist`);
};

export function __widl_f_set_height_HTMLCanvasElement(arg0, arg1) {
    __widl_f_set_height_HTMLCanvasElement_target.call(getObject(arg0), arg1);
}

const __widl_f_style_HTMLElement_target = GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'style').get || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'style').get does not exist`);
};

export function __widl_f_style_HTMLElement(arg0) {
    return addHeapObject(__widl_f_style_HTMLElement_target.call(getObject(arg0)));
}

const __widl_f_append_child_Node_target = Node.prototype.appendChild || function() {
    throw new Error(`wasm-bindgen: Node.prototype.appendChild does not exist`);
};

export function __widl_f_append_child_Node(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__widl_f_append_child_Node_target.call(getObject(arg0), getObject(arg1)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __widl_instanceof_Window(idx) {
    return getObject(idx) instanceof Window ? 1 : 0;
}

const __widl_f_document_Window_target = function() {
    return this.document;
};

export function __widl_f_document_Window(arg0) {

    const val = __widl_f_document_Window_target.call(getObject(arg0));
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __wbg_newnoargs_b1f726fad978f5a3(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}

const __wbg_call_fa7f0da29d7b9250_target = Function.prototype.call || function() {
    throw new Error(`wasm-bindgen: Function.prototype.call does not exist`);
};

export function __wbg_call_fa7f0da29d7b9250(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_call_fa7f0da29d7b9250_target.call(getObject(arg0), getObject(arg1)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

function freePattern(ptr) {

    wasm.__wbg_pattern_free(ptr);
}
/**
*/
export class Pattern {

    static __wrap(ptr) {
        const obj = Object.create(Pattern.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freePattern(ptr);
    }
    /**
    * @param {any} arg0
    * @param {any} arg1
    * @param {any} arg2
    * @param {number} arg3
    * @param {number} arg4
    * @param {number} arg5
    * @param {number} arg6
    * @returns {Pattern}
    */
    static new(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        return Pattern.__wrap(wasm.pattern_new(addHeapObject(arg0), addHeapObject(arg1), addHeapObject(arg2), arg3, arg4, arg5, arg6));
    }
}

export function __wbindgen_object_clone_ref(idx) {
    // If this object is on the stack promote it to the heap.
    if ((idx & 1) === 1) return addHeapObject(getObject(idx));

    // Otherwise if the object is on the heap just bump the
    // refcount and move on
    const val = slab[idx >> 1];
    val.cnt += 1;
    return idx;
}

function dropRef(idx) {

    idx = idx >> 1;
    if (idx < 4) return;
    let obj = slab[idx];

    obj.cnt -= 1;
    if (obj.cnt > 0) return;

    // If we hit 0 then free up our space in the slab
    slab[idx] = slab_next;
    slab_next = idx;
}

export function __wbindgen_object_drop_ref(i) {
    dropRef(i);
}

export function __wbindgen_number_get(n, invalid) {
    let obj = getObject(n);
    if (typeof(obj) === 'number') return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
}

export function __wbindgen_is_null(idx) {
    return getObject(idx) === null ? 1 : 0;
}

export function __wbindgen_is_undefined(idx) {
    return getObject(idx) === undefined ? 1 : 0;
}

export function __wbindgen_boolean_get(i) {
    let v = getObject(i);
    if (typeof(v) === 'boolean') {
        return v ? 1 : 0;
    } else {
        return 2;
    }
}

export function __wbindgen_is_symbol(i) {
    return typeof(getObject(i)) === 'symbol' ? 1 : 0;
}

let cachedEncoder = new TextEncoder('utf-8');

function passStringToWasm(arg) {

    const buf = cachedEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

export function __wbindgen_string_get(i, len_ptr) {
    let obj = getObject(i);
    if (typeof(obj) !== 'string') return 0;
    const [ptr, len] = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = len;
    return ptr;
}

export function __wbindgen_cb_forget(i) {
    dropRef(i);
}

export function __wbindgen_closure_wrapper26(ptr, f, _ignored) {
    let cb = function(arg0) {
        let a = this.a;
        this.a = 0;
        try {
            return this.f(a, addHeapObject(arg0));

        } finally {
            this.a = a;

        }

    };
    cb.f = wasm.__wbg_function_table.get(f);
    cb.a = ptr;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

