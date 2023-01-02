"use strict";
exports.id = "component---src-pages-index-jshead";
exports.ids = ["component---src-pages-index-jshead"];
exports.modules = {

/***/ "./node_modules/@motionone/dom/dist/gestures/resize/handle-element.es.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/resize/handle-element.es.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resizeElement": () => (/* binding */ resizeElement)
/* harmony export */ });
/* harmony import */ var _utils_resolve_elements_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/resolve-elements.es.js */ "./node_modules/@motionone/dom/dist/utils/resolve-elements.es.js");


const resizeHandlers = new WeakMap();
let observer;
function getElementSize(target, borderBoxSize) {
    if (borderBoxSize) {
        const { inlineSize, blockSize } = borderBoxSize[0];
        return { width: inlineSize, height: blockSize };
    }
    else if (target instanceof SVGElement && "getBBox" in target) {
        return target.getBBox();
    }
    else {
        return {
            width: target.offsetWidth,
            height: target.offsetHeight,
        };
    }
}
function notifyTarget({ target, contentRect, borderBoxSize, }) {
    var _a;
    (_a = resizeHandlers.get(target)) === null || _a === void 0 ? void 0 : _a.forEach((handler) => {
        handler({
            target,
            contentSize: contentRect,
            get size() {
                return getElementSize(target, borderBoxSize);
            },
        });
    });
}
function notifyAll(entries) {
    entries.forEach(notifyTarget);
}
function createResizeObserver() {
    if (typeof ResizeObserver === "undefined")
        return;
    observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
    if (!observer)
        createResizeObserver();
    const elements = (0,_utils_resolve_elements_es_js__WEBPACK_IMPORTED_MODULE_0__.resolveElements)(target);
    elements.forEach((element) => {
        let elementHandlers = resizeHandlers.get(element);
        if (!elementHandlers) {
            elementHandlers = new Set();
            resizeHandlers.set(element, elementHandlers);
        }
        elementHandlers.add(handler);
        observer === null || observer === void 0 ? void 0 : observer.observe(element);
    });
    return () => {
        elements.forEach((element) => {
            const elementHandlers = resizeHandlers.get(element);
            elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.delete(handler);
            if (!(elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.size)) {
                observer === null || observer === void 0 ? void 0 : observer.unobserve(element);
            }
        });
    };
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/gestures/resize/handle-window.es.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/resize/handle-window.es.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resizeWindow": () => (/* binding */ resizeWindow)
/* harmony export */ });
const windowCallbacks = new Set();
let windowResizeHandler;
function createWindowResizeHandler() {
    windowResizeHandler = () => {
        const size = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        const info = {
            target: window,
            size,
            contentSize: size,
        };
        windowCallbacks.forEach((callback) => callback(info));
    };
    window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
    windowCallbacks.add(callback);
    if (!windowResizeHandler)
        createWindowResizeHandler();
    return () => {
        windowCallbacks.delete(callback);
        if (!windowCallbacks.size && windowResizeHandler) {
            windowResizeHandler = undefined;
        }
    };
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/gestures/resize/index.es.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/resize/index.es.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resize": () => (/* binding */ resize)
/* harmony export */ });
/* harmony import */ var _handle_element_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handle-element.es.js */ "./node_modules/@motionone/dom/dist/gestures/resize/handle-element.es.js");
/* harmony import */ var _handle_window_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handle-window.es.js */ "./node_modules/@motionone/dom/dist/gestures/resize/handle-window.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-function.es.js");




function resize(a, b) {
    return (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_0__.isFunction)(a) ? (0,_handle_window_es_js__WEBPACK_IMPORTED_MODULE_1__.resizeWindow)(a) : (0,_handle_element_es_js__WEBPACK_IMPORTED_MODULE_2__.resizeElement)(a, b);
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/gestures/scroll/index.es.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/scroll/index.es.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scroll": () => (/* binding */ scroll)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _resize_index_es_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../resize/index.es.js */ "./node_modules/@motionone/dom/dist/gestures/resize/index.es.js");
/* harmony import */ var _info_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./info.es.js */ "./node_modules/@motionone/dom/dist/gestures/scroll/info.es.js");
/* harmony import */ var _on_scroll_handler_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./on-scroll-handler.es.js */ "./node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.es.js");





const scrollListeners = new WeakMap();
const resizeListeners = new WeakMap();
const onScrollHandlers = new WeakMap();
const getEventTarget = (element) => element === document.documentElement ? window : element;
function scroll(onScroll, _a = {}) {
    var { container = document.documentElement } = _a, options = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__rest)(_a, ["container"]);
    let containerHandlers = onScrollHandlers.get(container);
    /**
     * Get the onScroll handlers for this container.
     * If one isn't found, create a new one.
     */
    if (!containerHandlers) {
        containerHandlers = new Set();
        onScrollHandlers.set(container, containerHandlers);
    }
    /**
     * Create a new onScroll handler for the provided callback.
     */
    const info = (0,_info_es_js__WEBPACK_IMPORTED_MODULE_1__.createScrollInfo)();
    const containerHandler = (0,_on_scroll_handler_es_js__WEBPACK_IMPORTED_MODULE_2__.createOnScrollHandler)(container, onScroll, info, options);
    containerHandlers.add(containerHandler);
    /**
     * Check if there's a scroll event listener for this container.
     * If not, create one.
     */
    if (!scrollListeners.has(container)) {
        const listener = () => {
            const time = performance.now();
            for (const handler of containerHandlers)
                handler.measure();
            for (const handler of containerHandlers)
                handler.update(time);
            for (const handler of containerHandlers)
                handler.notify();
        };
        scrollListeners.set(container, listener);
        const target = getEventTarget(container);
        window.addEventListener("resize", listener, { passive: true });
        if (container !== document.documentElement) {
            resizeListeners.set(container, (0,_resize_index_es_js__WEBPACK_IMPORTED_MODULE_3__.resize)(container, listener));
        }
        target.addEventListener("scroll", listener, { passive: true });
    }
    const listener = scrollListeners.get(container);
    const onLoadProcesss = requestAnimationFrame(listener);
    return () => {
        var _a;
        if (typeof onScroll !== "function")
            onScroll.stop();
        cancelAnimationFrame(onLoadProcesss);
        /**
         * Check if we even have any handlers for this container.
         */
        const containerHandlers = onScrollHandlers.get(container);
        if (!containerHandlers)
            return;
        containerHandlers.delete(containerHandler);
        if (containerHandlers.size)
            return;
        /**
         * If no more handlers, remove the scroll listener too.
         */
        const listener = scrollListeners.get(container);
        scrollListeners.delete(container);
        if (listener) {
            getEventTarget(container).removeEventListener("scroll", listener);
            (_a = resizeListeners.get(container)) === null || _a === void 0 ? void 0 : _a();
            window.removeEventListener("resize", listener);
        }
    };
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/gestures/scroll/info.es.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/scroll/info.es.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createScrollInfo": () => (/* binding */ createScrollInfo),
/* harmony export */   "updateScrollInfo": () => (/* binding */ updateScrollInfo)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/progress.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/velocity.es.js");


/**
 * A time in milliseconds, beyond which we consider the scroll velocity to be 0.
 */
const maxElapsed = 50;
const createAxisInfo = () => ({
    current: 0,
    offset: [],
    progress: 0,
    scrollLength: 0,
    targetOffset: 0,
    targetLength: 0,
    containerLength: 0,
    velocity: 0,
});
const createScrollInfo = () => ({
    time: 0,
    x: createAxisInfo(),
    y: createAxisInfo(),
});
const keys = {
    x: {
        length: "Width",
        position: "Left",
    },
    y: {
        length: "Height",
        position: "Top",
    },
};
function updateAxisInfo(element, axisName, info, time) {
    const axis = info[axisName];
    const { length, position } = keys[axisName];
    const prev = axis.current;
    const prevTime = info.time;
    axis.current = element["scroll" + position];
    axis.scrollLength = element["scroll" + length] - element["client" + length];
    axis.offset.length = 0;
    axis.offset[0] = 0;
    axis.offset[1] = axis.scrollLength;
    axis.progress = (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_0__.progress)(0, axis.scrollLength, axis.current);
    const elapsed = time - prevTime;
    axis.velocity =
        elapsed > maxElapsed ? 0 : (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_1__.velocityPerSecond)(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
    updateAxisInfo(element, "x", info, time);
    updateAxisInfo(element, "y", info, time);
    info.time = time;
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/gestures/scroll/offsets/edge.es.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/scroll/offsets/edge.es.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "namedEdges": () => (/* binding */ namedEdges),
/* harmony export */   "resolveEdge": () => (/* binding */ resolveEdge)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-string.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-number.es.js");


const namedEdges = {
    start: 0,
    center: 0.5,
    end: 1,
};
function resolveEdge(edge, length, inset = 0) {
    let delta = 0;
    /**
     * If we have this edge defined as a preset, replace the definition
     * with the numerical value.
     */
    if (namedEdges[edge] !== undefined) {
        edge = namedEdges[edge];
    }
    /**
     * Handle unit values
     */
    if ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(edge)) {
        const asNumber = parseFloat(edge);
        if (edge.endsWith("px")) {
            delta = asNumber;
        }
        else if (edge.endsWith("%")) {
            edge = asNumber / 100;
        }
        else if (edge.endsWith("vw")) {
            delta = (asNumber / 100) * document.documentElement.clientWidth;
        }
        else if (edge.endsWith("vh")) {
            delta = (asNumber / 100) * document.documentElement.clientHeight;
        }
        else {
            edge = asNumber;
        }
    }
    /**
     * If the edge is defined as a number, handle as a progress value.
     */
    if ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(edge)) {
        delta = length * edge;
    }
    return inset + delta;
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.es.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.es.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveOffsets": () => (/* binding */ resolveOffsets)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/interpolate.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/offset.es.js");
/* harmony import */ var _inset_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inset.es.js */ "./node_modules/@motionone/dom/dist/gestures/scroll/offsets/inset.es.js");
/* harmony import */ var _presets_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./presets.es.js */ "./node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.es.js");
/* harmony import */ var _offset_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./offset.es.js */ "./node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.es.js");





const point = { x: 0, y: 0 };
function resolveOffsets(container, info, options) {
    let { offset: offsetDefinition = _presets_es_js__WEBPACK_IMPORTED_MODULE_0__.ScrollOffset.All } = options;
    const { target = container, axis = "y" } = options;
    const lengthLabel = axis === "y" ? "height" : "width";
    const inset = target !== container ? (0,_inset_es_js__WEBPACK_IMPORTED_MODULE_1__.calcInset)(target, container) : point;
    /**
     * Measure the target and container. If they're the same thing then we
     * use the container's scrollWidth/Height as the target, from there
     * all other calculations can remain the same.
     */
    const targetSize = target === container
        ? { width: container.scrollWidth, height: container.scrollHeight }
        : { width: target.clientWidth, height: target.clientHeight };
    const containerSize = {
        width: container.clientWidth,
        height: container.clientHeight,
    };
    /**
     * Reset the length of the resolved offset array rather than creating a new one.
     * TODO: More reusable data structures for targetSize/containerSize would also be good.
     */
    info[axis].offset.length = 0;
    /**
     * Populate the offset array by resolving the user's offset definition into
     * a list of pixel scroll offets.
     */
    let hasChanged = !info[axis].interpolate;
    const numOffsets = offsetDefinition.length;
    for (let i = 0; i < numOffsets; i++) {
        const offset = (0,_offset_es_js__WEBPACK_IMPORTED_MODULE_2__.resolveOffset)(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
        if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
            hasChanged = true;
        }
        info[axis].offset[i] = offset;
    }
    /**
     * If the pixel scroll offsets have changed, create a new interpolator function
     * to map scroll value into a progress.
     */
    if (hasChanged) {
        info[axis].interpolate = (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_3__.interpolate)((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_4__.defaultOffset)(numOffsets), info[axis].offset);
        info[axis].interpolatorOffsets = [...info[axis].offset];
    }
    info[axis].progress = info[axis].interpolate(info[axis].current);
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/gestures/scroll/offsets/inset.es.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/scroll/offsets/inset.es.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calcInset": () => (/* binding */ calcInset)
/* harmony export */ });
function calcInset(element, container) {
    let inset = { x: 0, y: 0 };
    let current = element;
    while (current && current !== container) {
        if (current instanceof HTMLElement) {
            inset.x += current.offsetLeft;
            inset.y += current.offsetTop;
            current = current.offsetParent;
        }
        else if (current instanceof SVGGraphicsElement && "getBBox" in current) {
            const { top, left } = current.getBBox();
            inset.x += left;
            inset.y += top;
            /**
             * Assign the next parent element as the <svg /> tag.
             */
            while (current && current.tagName !== "svg") {
                current = current.parentNode;
            }
        }
    }
    return inset;
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.es.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.es.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveOffset": () => (/* binding */ resolveOffset)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-number.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-string.es.js");
/* harmony import */ var _edge_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edge.es.js */ "./node_modules/@motionone/dom/dist/gestures/scroll/offsets/edge.es.js");



const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
    let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
    let targetPoint = 0;
    let containerPoint = 0;
    if ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(offset)) {
        /**
         * If we're provided offset: [0, 0.5, 1] then each number x should become
         * [x, x], so we default to the behaviour of mapping 0 => 0 of both target
         * and container etc.
         */
        offsetDefinition = [offset, offset];
    }
    else if ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_1__.isString)(offset)) {
        offset = offset.trim();
        if (offset.includes(" ")) {
            offsetDefinition = offset.split(" ");
        }
        else {
            /**
             * If we're provided a definition like "100px" then we want to apply
             * that only to the top of the target point, leaving the container at 0.
             * Whereas a named offset like "end" should be applied to both.
             */
            offsetDefinition = [offset, _edge_es_js__WEBPACK_IMPORTED_MODULE_2__.namedEdges[offset] ? offset : `0`];
        }
    }
    targetPoint = (0,_edge_es_js__WEBPACK_IMPORTED_MODULE_2__.resolveEdge)(offsetDefinition[0], targetLength, targetInset);
    containerPoint = (0,_edge_es_js__WEBPACK_IMPORTED_MODULE_2__.resolveEdge)(offsetDefinition[1], containerLength);
    return targetPoint - containerPoint;
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.es.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.es.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollOffset": () => (/* binding */ ScrollOffset)
/* harmony export */ });
const ScrollOffset = {
    Enter: [
        [0, 1],
        [1, 1],
    ],
    Exit: [
        [0, 0],
        [1, 0],
    ],
    Any: [
        [1, 0],
        [0, 1],
    ],
    All: [
        [0, 0],
        [1, 1],
    ],
};




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.es.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.es.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createOnScrollHandler": () => (/* binding */ createOnScrollHandler)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-function.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/noop.es.js");
/* harmony import */ var _info_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info.es.js */ "./node_modules/@motionone/dom/dist/gestures/scroll/info.es.js");
/* harmony import */ var _offsets_index_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./offsets/index.es.js */ "./node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.es.js");




function measure(container, target = container, info) {
    /**
     * Find inset of target within scrollable container
     */
    info.x.targetOffset = 0;
    info.y.targetOffset = 0;
    if (target !== container) {
        let node = target;
        while (node && node != container) {
            info.x.targetOffset += node.offsetLeft;
            info.y.targetOffset += node.offsetTop;
            node = node.offsetParent;
        }
    }
    info.x.targetLength =
        target === container ? target.scrollWidth : target.clientWidth;
    info.y.targetLength =
        target === container ? target.scrollHeight : target.clientHeight;
    info.x.containerLength = container.clientWidth;
    info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
    const axis = options.axis || "y";
    return {
        measure: () => measure(element, options.target, info),
        update: (time) => {
            (0,_info_es_js__WEBPACK_IMPORTED_MODULE_0__.updateScrollInfo)(element, info, time);
            if (options.offset || options.target) {
                (0,_offsets_index_es_js__WEBPACK_IMPORTED_MODULE_1__.resolveOffsets)(element, info, options);
            }
        },
        notify: (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_2__.isFunction)(onScroll)
            ? () => onScroll(info)
            : scrubAnimation(onScroll, info[axis]),
    };
}
function scrubAnimation(controls, axisInfo) {
    controls.pause();
    controls.forEachNative((animation, { easing }) => {
        var _a, _b;
        if (animation.updateDuration) {
            if (!easing)
                animation.easing = _motionone_utils__WEBPACK_IMPORTED_MODULE_3__.noopReturn;
            animation.updateDuration(1);
        }
        else {
            const timingOptions = { duration: 1000 };
            if (!easing)
                timingOptions.easing = "linear";
            (_b = (_a = animation.effect) === null || _a === void 0 ? void 0 : _a.updateTiming) === null || _b === void 0 ? void 0 : _b.call(_a, timingOptions);
        }
    });
    return () => {
        controls.currentTime = axisInfo.progress;
    };
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/utils/resolve-elements.es.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/utils/resolve-elements.es.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveElements": () => (/* binding */ resolveElements)
/* harmony export */ });
function resolveElements(elements, selectorCache) {
    var _a;
    if (typeof elements === "string") {
        if (selectorCache) {
            (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : (selectorCache[elements] = document.querySelectorAll(elements));
            elements = selectorCache[elements];
        }
        else {
            elements = document.querySelectorAll(elements);
        }
    }
    else if (elements instanceof Element) {
        elements = [elements];
    }
    /**
     * Return an empty array
     */
    return Array.from(elements || []);
}




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/clamp.es.js":
/*!********************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/clamp.es.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clamp": () => (/* binding */ clamp)
/* harmony export */ });
const clamp = (min, max, v) => Math.min(Math.max(v, min), max);




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/easing.es.js":
/*!*********************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/easing.es.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEasingForSegment": () => (/* binding */ getEasingForSegment)
/* harmony export */ });
/* harmony import */ var _is_easing_list_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-easing-list.es.js */ "./node_modules/@motionone/utils/dist/is-easing-list.es.js");
/* harmony import */ var _wrap_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrap.es.js */ "./node_modules/@motionone/utils/dist/wrap.es.js");



function getEasingForSegment(easing, i) {
    return (0,_is_easing_list_es_js__WEBPACK_IMPORTED_MODULE_0__.isEasingList)(easing)
        ? easing[(0,_wrap_es_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(0, easing.length, i)]
        : easing;
}




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/interpolate.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/interpolate.es.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "interpolate": () => (/* binding */ interpolate)
/* harmony export */ });
/* harmony import */ var _mix_es_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mix.es.js */ "./node_modules/@motionone/utils/dist/mix.es.js");
/* harmony import */ var _noop_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./noop.es.js */ "./node_modules/@motionone/utils/dist/noop.es.js");
/* harmony import */ var _offset_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./offset.es.js */ "./node_modules/@motionone/utils/dist/offset.es.js");
/* harmony import */ var _progress_es_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./progress.es.js */ "./node_modules/@motionone/utils/dist/progress.es.js");
/* harmony import */ var _easing_es_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./easing.es.js */ "./node_modules/@motionone/utils/dist/easing.es.js");
/* harmony import */ var _clamp_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clamp.es.js */ "./node_modules/@motionone/utils/dist/clamp.es.js");







function interpolate(output, input = (0,_offset_es_js__WEBPACK_IMPORTED_MODULE_0__.defaultOffset)(output.length), easing = _noop_es_js__WEBPACK_IMPORTED_MODULE_1__.noopReturn) {
    const length = output.length;
    /**
     * If the input length is lower than the output we
     * fill the input to match. This currently assumes the input
     * is an animation progress value so is a good candidate for
     * moving outside the function.
     */
    const remainder = length - input.length;
    remainder > 0 && (0,_offset_es_js__WEBPACK_IMPORTED_MODULE_0__.fillOffset)(input, remainder);
    return (t) => {
        let i = 0;
        for (; i < length - 2; i++) {
            if (t < input[i + 1])
                break;
        }
        let progressInRange = (0,_clamp_es_js__WEBPACK_IMPORTED_MODULE_2__.clamp)(0, 1, (0,_progress_es_js__WEBPACK_IMPORTED_MODULE_3__.progress)(input[i], input[i + 1], t));
        const segmentEasing = (0,_easing_es_js__WEBPACK_IMPORTED_MODULE_4__.getEasingForSegment)(easing, i);
        progressInRange = segmentEasing(progressInRange);
        return (0,_mix_es_js__WEBPACK_IMPORTED_MODULE_5__.mix)(output[i], output[i + 1], progressInRange);
    };
}




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/is-easing-list.es.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/is-easing-list.es.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isEasingList": () => (/* binding */ isEasingList)
/* harmony export */ });
/* harmony import */ var _is_number_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-number.es.js */ "./node_modules/@motionone/utils/dist/is-number.es.js");


const isEasingList = (easing) => Array.isArray(easing) && !(0,_is_number_es_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(easing[0]);




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/is-function.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/is-function.es.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFunction": () => (/* binding */ isFunction)
/* harmony export */ });
const isFunction = (value) => typeof value === "function";




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/is-number.es.js":
/*!************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/is-number.es.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNumber": () => (/* binding */ isNumber)
/* harmony export */ });
const isNumber = (value) => typeof value === "number";




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/is-string.es.js":
/*!************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/is-string.es.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isString": () => (/* binding */ isString)
/* harmony export */ });
const isString = (value) => typeof value === "string";




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/mix.es.js":
/*!******************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/mix.es.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mix": () => (/* binding */ mix)
/* harmony export */ });
const mix = (min, max, progress) => -progress * min + progress * max + min;




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/noop.es.js":
/*!*******************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/noop.es.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "noopReturn": () => (/* binding */ noopReturn)
/* harmony export */ });
const noop = () => { };
const noopReturn = (v) => v;




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/offset.es.js":
/*!*********************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/offset.es.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultOffset": () => (/* binding */ defaultOffset),
/* harmony export */   "fillOffset": () => (/* binding */ fillOffset)
/* harmony export */ });
/* harmony import */ var _mix_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mix.es.js */ "./node_modules/@motionone/utils/dist/mix.es.js");
/* harmony import */ var _progress_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress.es.js */ "./node_modules/@motionone/utils/dist/progress.es.js");



function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for (let i = 1; i <= remaining; i++) {
        const offsetProgress = (0,_progress_es_js__WEBPACK_IMPORTED_MODULE_0__.progress)(0, remaining, i);
        offset.push((0,_mix_es_js__WEBPACK_IMPORTED_MODULE_1__.mix)(min, 1, offsetProgress));
    }
}
function defaultOffset(length) {
    const offset = [0];
    fillOffset(offset, length - 1);
    return offset;
}




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/progress.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/progress.es.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "progress": () => (/* binding */ progress)
/* harmony export */ });
const progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/velocity.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/velocity.es.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "velocityPerSecond": () => (/* binding */ velocityPerSecond)
/* harmony export */ });
/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/
function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/wrap.es.js":
/*!*******************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/wrap.es.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wrap": () => (/* binding */ wrap)
/* harmony export */ });
const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};




/***/ }),

/***/ "./src/components/ScrollArea.jsx":
/*!***************************************!*\
  !*** ./src/components/ScrollArea.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/value/use-scroll.mjs");


const ScrollArea = () => {
  const {
    scrollYProgress
  } = framer_motion__WEBPACK_IMPORTED_MODULE_1__.useScroll;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: " bg-gray-200"
  }, "scroll area", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "box h-20  bg-red-800",
    style: {
      scaleX: scrollYProgress
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "h-screen py-48"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "h-screen py-48"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "h-screen py-48"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScrollArea);

/***/ }),

/***/ "./src/components/header.js":
/*!**********************************!*\
  !*** ./src/components/header.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");


const Header = ({
  siteTitle
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("header", {
  style: {
    margin: `0 auto`,
    padding: `var(--space-4) var(--size-gutter)`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/",
  style: {
    fontSize: `var(--font-sm)`,
    textDecoration: `none`
  }
}, siteTitle));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./src/components/layout.js":
/*!**********************************!*\
  !*** ./src/components/layout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_3649515864_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/3649515864.json */ "./public/page-data/sq/d/3649515864.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header */ "./src/components/header.js");



const Layout = ({
  children
}) => {
  var _data$site$siteMetada;
  const data = _public_page_data_sq_d_3649515864_json__WEBPACK_IMPORTED_MODULE_0__.data;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_header__WEBPACK_IMPORTED_MODULE_2__["default"], {
    siteTitle: ((_data$site$siteMetada = data.site.siteMetadata) === null || _data$site$siteMetada === void 0 ? void 0 : _data$site$siteMetada.title) || `Title`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("main", null, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("footer", null, "\xA9 ", new Date().getFullYear())));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/components/seo.js":
/*!*******************************!*\
  !*** ./src/components/seo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_63159454_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/63159454.json */ "./public/page-data/sq/d/63159454.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */


function Seo({
  description,
  title,
  children
}) {
  var _site$siteMetadata, _site$siteMetadata2;
  const {
    site
  } = _public_page_data_sq_d_63159454_json__WEBPACK_IMPORTED_MODULE_0__.data;
  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = (_site$siteMetadata = site.siteMetadata) === null || _site$siteMetadata === void 0 ? void 0 : _site$siteMetadata.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("title", null, defaultTitle ? `${title} | ${defaultTitle}` : title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    name: "description",
    content: metaDescription
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    property: "og:title",
    content: title
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    property: "og:description",
    content: metaDescription
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    property: "og:type",
    content: "website"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    name: "twitter:card",
    content: "summary"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    name: "twitter:creator",
    content: ((_site$siteMetadata2 = site.siteMetadata) === null || _site$siteMetadata2 === void 0 ? void 0 : _site$siteMetadata2.author) || ``
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    name: "twitter:title",
    content: title
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    name: "twitter:description",
    content: metaDescription
  }), children);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Seo);

/***/ }),

/***/ "./src/pages/index.js?export=head":
/*!****************************************!*\
  !*** ./src/pages/index.js?export=head ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Head": () => (/* binding */ Head),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.js");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.js");
/* harmony import */ var _components_ScrollArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ScrollArea */ "./src/components/ScrollArea.jsx");




const IndexPage = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
  className: "container"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "fostan.xyz"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_ScrollArea__WEBPACK_IMPORTED_MODULE_3__["default"], null)));

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
const Head = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
  title: "Home"
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IndexPage);

/***/ }),

/***/ "./node_modules/hey-listen/dist/hey-listen.es.js":
/*!*******************************************************!*\
  !*** ./node_modules/hey-listen/dist/hey-listen.es.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "invariant": () => (/* binding */ invariant),
/* harmony export */   "warning": () => (/* binding */ warning)
/* harmony export */ });
var warning = function () { };
var invariant = function () { };
if (true) {
    warning = function (check, message) {
        if (!check && typeof console !== 'undefined') {
            console.warn(message);
        }
    };
    invariant = function (check, message) {
        if (!check) {
            throw new Error(message);
        }
    };
}




/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldIn": () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}


/***/ }),

/***/ "./node_modules/framer-motion/dist/es/frameloop/create-render-step.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/frameloop/create-render-step.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createRenderStep": () => (/* binding */ createRenderStep)
/* harmony export */ });
function createRenderStep(runNextFrame) {
    /**
     * We create and reuse two arrays, one to queue jobs for the current frame
     * and one for the next. We reuse to avoid triggering GC after x frames.
     */
    let toRun = [];
    let toRunNextFrame = [];
    /**
     *
     */
    let numToRun = 0;
    /**
     * Track whether we're currently processing jobs in this step. This way
     * we can decide whether to schedule new jobs for this frame or next.
     */
    let isProcessing = false;
    let flushNextFrame = false;
    /**
     * A set of processes which were marked keepAlive when scheduled.
     */
    const toKeepAlive = new WeakSet();
    const step = {
        /**
         * Schedule a process to run on the next frame.
         */
        schedule: (callback, keepAlive = false, immediate = false) => {
            const addToCurrentFrame = immediate && isProcessing;
            const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
            if (keepAlive)
                toKeepAlive.add(callback);
            // If the buffer doesn't already contain this callback, add it
            if (buffer.indexOf(callback) === -1) {
                buffer.push(callback);
                // If we're adding it to the currently running buffer, update its measured size
                if (addToCurrentFrame && isProcessing)
                    numToRun = toRun.length;
            }
            return callback;
        },
        /**
         * Cancel the provided callback from running on the next frame.
         */
        cancel: (callback) => {
            const index = toRunNextFrame.indexOf(callback);
            if (index !== -1)
                toRunNextFrame.splice(index, 1);
            toKeepAlive.delete(callback);
        },
        /**
         * Execute all schedule callbacks.
         */
        process: (frameData) => {
            /**
             * If we're already processing we've probably been triggered by a flushSync
             * inside an existing process. Instead of executing, mark flushNextFrame
             * as true and ensure we flush the following frame at the end of this one.
             */
            if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
            // Clear the next frame list
            toRunNextFrame.length = 0;
            // Execute this frame
            numToRun = toRun.length;
            if (numToRun) {
                for (let i = 0; i < numToRun; i++) {
                    const callback = toRun[i];
                    callback(frameData);
                    if (toKeepAlive.has(callback)) {
                        step.schedule(callback);
                        runNextFrame();
                    }
                }
            }
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        },
    };
    return step;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/frameloop/data.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/frameloop/data.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "frameData": () => (/* binding */ frameData)
/* harmony export */ });
const frameData = {
    delta: 0,
    timestamp: 0,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/frameloop/index.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/frameloop/index.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cancelSync": () => (/* binding */ cancelSync),
/* harmony export */   "flushSync": () => (/* binding */ flushSync),
/* harmony export */   "sync": () => (/* binding */ sync)
/* harmony export */ });
/* harmony import */ var _on_next_frame_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./on-next-frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/on-next-frame.mjs");
/* harmony import */ var _create_render_step_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-render-step.mjs */ "./node_modules/framer-motion/dist/es/frameloop/create-render-step.mjs");
/* harmony import */ var _data_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.mjs */ "./node_modules/framer-motion/dist/es/frameloop/data.mjs");




const maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;
const stepsOrder = [
    "read",
    "update",
    "preRender",
    "render",
    "postRender",
];
const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = (0,_create_render_step_mjs__WEBPACK_IMPORTED_MODULE_0__.createRenderStep)(() => (runNextFrame = true));
    return acc;
}, {});
const sync = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process, keepAlive = false, immediate = false) => {
        if (!runNextFrame)
            startLoop();
        return step.schedule(process, keepAlive, immediate);
    };
    return acc;
}, {});
const cancelSync = stepsOrder.reduce((acc, key) => {
    acc[key] = steps[key].cancel;
    return acc;
}, {});
const flushSync = stepsOrder.reduce((acc, key) => {
    acc[key] = () => steps[key].process(_data_mjs__WEBPACK_IMPORTED_MODULE_1__.frameData);
    return acc;
}, {});
const processStep = (stepId) => steps[stepId].process(_data_mjs__WEBPACK_IMPORTED_MODULE_1__.frameData);
const processFrame = (timestamp) => {
    runNextFrame = false;
    _data_mjs__WEBPACK_IMPORTED_MODULE_1__.frameData.delta = useDefaultElapsed
        ? _on_next_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.defaultTimestep
        : Math.max(Math.min(timestamp - _data_mjs__WEBPACK_IMPORTED_MODULE_1__.frameData.timestamp, maxElapsed), 1);
    _data_mjs__WEBPACK_IMPORTED_MODULE_1__.frameData.timestamp = timestamp;
    isProcessing = true;
    stepsOrder.forEach(processStep);
    isProcessing = false;
    if (runNextFrame) {
        useDefaultElapsed = false;
        (0,_on_next_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.onNextFrame)(processFrame);
    }
};
const startLoop = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!isProcessing)
        (0,_on_next_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.onNextFrame)(processFrame);
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/frameloop/on-next-frame.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/frameloop/on-next-frame.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultTimestep": () => (/* binding */ defaultTimestep),
/* harmony export */   "onNextFrame": () => (/* binding */ onNextFrame)
/* harmony export */ });
/*
  Detect and load appropriate clock setting for the execution environment
 */
const defaultTimestep = (1 / 60) * 1000;
const getCurrentTime = typeof performance !== "undefined"
    ? () => performance.now()
    : () => Date.now();
const onNextFrame = typeof window !== "undefined"
    ? (callback) => window.requestAnimationFrame(callback)
    : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/array.mjs":
/*!************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/array.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addUniqueItem": () => (/* binding */ addUniqueItem),
/* harmony export */   "moveItem": () => (/* binding */ moveItem),
/* harmony export */   "removeItem": () => (/* binding */ removeItem)
/* harmony export */ });
function addUniqueItem(arr, item) {
    if (arr.indexOf(item) === -1)
        arr.push(item);
}
function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1)
        arr.splice(index, 1);
}
// Adapted from array-move
function moveItem([...arr], fromIndex, toIndex) {
    const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
    if (startIndex >= 0 && startIndex < arr.length) {
        const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
        const [item] = arr.splice(fromIndex, 1);
        arr.splice(endIndex, 0, item);
    }
    return arr;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/is-browser.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/is-browser.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isBrowser": () => (/* binding */ isBrowser)
/* harmony export */ });
const isBrowser = typeof document !== "undefined";




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/subscription-manager.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/subscription-manager.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubscriptionManager": () => (/* binding */ SubscriptionManager)
/* harmony export */ });
/* harmony import */ var _array_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array.mjs */ "./node_modules/framer-motion/dist/es/utils/array.mjs");


class SubscriptionManager {
    constructor() {
        this.subscriptions = [];
    }
    add(handler) {
        (0,_array_mjs__WEBPACK_IMPORTED_MODULE_0__.addUniqueItem)(this.subscriptions, handler);
        return () => (0,_array_mjs__WEBPACK_IMPORTED_MODULE_0__.removeItem)(this.subscriptions, handler);
    }
    notify(a, b, c) {
        const numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions)
            return;
        if (numSubscriptions === 1) {
            /**
             * If there's only a single handler we can just call it without invoking a loop.
             */
            this.subscriptions[0](a, b, c);
        }
        else {
            for (let i = 0; i < numSubscriptions; i++) {
                /**
                 * Check whether the handler exists before firing as it's possible
                 * the subscriptions were modified during this loop running.
                 */
                const handler = this.subscriptions[i];
                handler && handler(a, b, c);
            }
        }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/use-constant.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/use-constant.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useConstant": () => (/* binding */ useConstant)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */
function useConstant(init) {
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useIsomorphicLayoutEffect": () => (/* binding */ useIsomorphicLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _is_browser_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-browser.mjs */ "./node_modules/framer-motion/dist/es/utils/is-browser.mjs");



const useIsomorphicLayoutEffect = _is_browser_mjs__WEBPACK_IMPORTED_MODULE_1__.isBrowser ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "velocityPerSecond": () => (/* binding */ velocityPerSecond)
/* harmony export */ });
/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/
function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/index.mjs":
/*!************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/index.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MotionValue": () => (/* binding */ MotionValue),
/* harmony export */   "motionValue": () => (/* binding */ motionValue)
/* harmony export */ });
/* harmony import */ var _frameloop_data_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../frameloop/data.mjs */ "./node_modules/framer-motion/dist/es/frameloop/data.mjs");
/* harmony import */ var _frameloop_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../frameloop/index.mjs */ "./node_modules/framer-motion/dist/es/frameloop/index.mjs");
/* harmony import */ var _utils_subscription_manager_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/subscription-manager.mjs */ "./node_modules/framer-motion/dist/es/utils/subscription-manager.mjs");
/* harmony import */ var _utils_velocity_per_second_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/velocity-per-second.mjs */ "./node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs");





const isFloat = (value) => {
    return !isNaN(parseFloat(value));
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */
class MotionValue {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     *
     * @internal
     */
    constructor(init, options = {}) {
        /**
         * This will be replaced by the build step with the latest version number.
         * When MotionValues are provided to motion components, warn if versions are mixed.
         */
        this.version = "8.0.2";
        /**
         * Duration, in milliseconds, since last updating frame.
         *
         * @internal
         */
        this.timeDelta = 0;
        /**
         * Timestamp of the last time this `MotionValue` was updated.
         *
         * @internal
         */
        this.lastUpdated = 0;
        /**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */
        this.canTrackVelocity = false;
        /**
         * An object containing a SubscriptionManager for each active event.
         */
        this.events = {};
        this.updateAndNotify = (v, render = true) => {
            this.prev = this.current;
            this.current = v;
            // Update timestamp
            const { delta, timestamp } = _frameloop_data_mjs__WEBPACK_IMPORTED_MODULE_0__.frameData;
            if (this.lastUpdated !== timestamp) {
                this.timeDelta = delta;
                this.lastUpdated = timestamp;
                _frameloop_index_mjs__WEBPACK_IMPORTED_MODULE_1__.sync.postRender(this.scheduleVelocityCheck);
            }
            // Update update subscribers
            if (this.prev !== this.current && this.events.change) {
                this.events.change.notify(this.current);
            }
            // Update velocity subscribers
            if (this.events.velocityChange) {
                this.events.velocityChange.notify(this.getVelocity());
            }
            // Update render subscribers
            if (render && this.events.renderRequest) {
                this.events.renderRequest.notify(this.current);
            }
        };
        /**
         * Schedule a velocity check for the next frame.
         *
         * This is an instanced and bound function to prevent generating a new
         * function once per frame.
         *
         * @internal
         */
        this.scheduleVelocityCheck = () => _frameloop_index_mjs__WEBPACK_IMPORTED_MODULE_1__.sync.postRender(this.velocityCheck);
        /**
         * Updates `prev` with `current` if the value hasn't been updated this frame.
         * This ensures velocity calculations return `0`.
         *
         * This is an instanced and bound function to prevent generating a new
         * function once per frame.
         *
         * @internal
         */
        this.velocityCheck = ({ timestamp }) => {
            if (timestamp !== this.lastUpdated) {
                this.prev = this.current;
                if (this.events.velocityChange) {
                    this.events.velocityChange.notify(this.getVelocity());
                }
            }
        };
        this.hasAnimated = false;
        this.prev = this.current = init;
        this.canTrackVelocity = isFloat(this.current);
        this.owner = options.owner;
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @privateRemarks
     *
     * We could look into a `useOnChange` hook if the above lifecycle management proves confusing.
     *
     * ```jsx
     * useOnChange(x, () => {})
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */
    onChange(subscription) {
        return this.on("change", subscription);
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new _utils_subscription_manager_mjs__WEBPACK_IMPORTED_MODULE_2__.SubscriptionManager();
        }
        return this.events[eventName].add(callback);
    }
    clearListeners() {
        for (const eventManagers in this.events) {
            this.events[eventManagers].clear();
        }
    }
    /**
     * Attaches a passive effect to the `MotionValue`.
     *
     * @internal
     */
    attach(passiveEffect) {
        this.passiveEffect = passiveEffect;
    }
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    set(v, render = true) {
        if (!render || !this.passiveEffect) {
            this.updateAndNotify(v, render);
        }
        else {
            this.passiveEffect(v, this.updateAndNotify);
        }
    }
    setWithVelocity(prev, current, delta) {
        this.set(current);
        this.prev = prev;
        this.timeDelta = delta;
    }
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    get() {
        return this.current;
    }
    /**
     * @public
     */
    getPrevious() {
        return this.prev;
    }
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    getVelocity() {
        // This could be isFloat(this.prev) && isFloat(this.current), but that would be wasteful
        return this.canTrackVelocity
            ? // These casts could be avoided if parseFloat would be typed better
                (0,_utils_velocity_per_second_mjs__WEBPACK_IMPORTED_MODULE_3__.velocityPerSecond)(parseFloat(this.current) -
                    parseFloat(this.prev), this.timeDelta)
            : 0;
    }
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     *
     * @internal
     */
    start(animation) {
        this.stop();
        return new Promise((resolve) => {
            this.hasAnimated = true;
            this.stopAnimation = animation(resolve);
            if (this.events.animationStart) {
                this.events.animationStart.notify();
            }
        }).then(() => {
            if (this.events.animationComplete) {
                this.events.animationComplete.notify();
            }
            this.clearAnimation();
        });
    }
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    stop() {
        if (this.stopAnimation) {
            this.stopAnimation();
            if (this.events.animationCancel) {
                this.events.animationCancel.notify();
            }
        }
        this.clearAnimation();
    }
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    isAnimating() {
        return !!this.stopAnimation;
    }
    clearAnimation() {
        this.stopAnimation = null;
    }
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    destroy() {
        this.clearListeners();
        this.stop();
    }
}
function motionValue(init, options) {
    return new MotionValue(init, options);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/use-scroll.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/use-scroll.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useScroll": () => (/* binding */ useScroll)
/* harmony export */ });
/* harmony import */ var _motionone_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @motionone/dom */ "./node_modules/@motionone/dom/dist/gestures/scroll/index.es.js");
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.mjs */ "./node_modules/framer-motion/dist/es/value/index.mjs");
/* harmony import */ var _utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/use-constant.mjs */ "./node_modules/framer-motion/dist/es/utils/use-constant.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var hey_listen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hey-listen */ "./node_modules/hey-listen/dist/hey-listen.es.js");
/* harmony import */ var _utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/use-isomorphic-effect.mjs */ "./node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs");







function refWarning(name, ref) {
    (0,hey_listen__WEBPACK_IMPORTED_MODULE_1__.warning)(Boolean(!ref || ref.current), `You have defined a ${name} options but the provided ref is not yet hydrated, probably because it's defined higher up the tree. Try calling useScroll() in the same component as the ref, or setting its \`layoutEffect: false\` option.`);
}
const createScrollMotionValues = () => ({
    scrollX: (0,_index_mjs__WEBPACK_IMPORTED_MODULE_2__.motionValue)(0),
    scrollY: (0,_index_mjs__WEBPACK_IMPORTED_MODULE_2__.motionValue)(0),
    scrollXProgress: (0,_index_mjs__WEBPACK_IMPORTED_MODULE_2__.motionValue)(0),
    scrollYProgress: (0,_index_mjs__WEBPACK_IMPORTED_MODULE_2__.motionValue)(0),
});
function useScroll({ container, target, layoutEffect = true, ...options } = {}) {
    const values = (0,_utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_3__.useConstant)(createScrollMotionValues);
    const useLifecycleEffect = layoutEffect
        ? _utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_4__.useIsomorphicLayoutEffect
        : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
    useLifecycleEffect(() => {
        refWarning("target", target);
        refWarning("container", container);
        return (0,_motionone_dom__WEBPACK_IMPORTED_MODULE_5__.scroll)(({ x, y }) => {
            values.scrollX.set(x.current);
            values.scrollXProgress.set(x.progress);
            values.scrollY.set(y.current);
            values.scrollYProgress.set(y.progress);
        }, {
            ...options,
            container: (container === null || container === void 0 ? void 0 : container.current) || undefined,
            target: (target === null || target === void 0 ? void 0 : target.current) || undefined,
        });
    }, []);
    return values;
}




/***/ }),

/***/ "./public/page-data/sq/d/3649515864.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/3649515864.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"site":{"siteMetadata":{"title":"fostan.xyz"}}}}');

/***/ }),

/***/ "./public/page-data/sq/d/63159454.json":
/*!*********************************************!*\
  !*** ./public/page-data/sq/d/63159454.json ***!
  \*********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"site":{"siteMetadata":{"title":"fostan.xyz","description":"portfolio & blog","author":"fostan"}}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-jshead.js.map