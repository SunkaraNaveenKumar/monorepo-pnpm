'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*!
 Stencil Mock Doc v4.17.1 | MIT Licensed | https://stenciljs.com
 */

// src/runtime/runtime-constants.ts
var CONTENT_REF_ID = "r";
var ORG_LOCATION_ID = "o";
var SLOT_NODE_ID = "s";
var TEXT_NODE_ID = "t";
var XLINK_NS = "http://www.w3.org/1999/xlink";

// src/mock-doc/attribute.ts
var attrHandler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }
    if (typeof prop !== "symbol" && !isNaN(prop)) {
      return obj.__items[prop];
    }
    return void 0;
  }
};
var createAttributeProxy = (caseInsensitive) => new Proxy(new MockAttributeMap(caseInsensitive), attrHandler);
var MockAttributeMap = class {
  constructor(caseInsensitive = false) {
    this.caseInsensitive = caseInsensitive;
    this.__items = [];
  }
  get length() {
    return this.__items.length;
  }
  item(index) {
    return this.__items[index] || null;
  }
  setNamedItem(attr) {
    attr.namespaceURI = null;
    this.setNamedItemNS(attr);
  }
  setNamedItemNS(attr) {
    if (attr != null && attr.value != null) {
      attr.value = String(attr.value);
    }
    const existingAttr = this.__items.find((a) => a.name === attr.name && a.namespaceURI === attr.namespaceURI);
    if (existingAttr != null) {
      existingAttr.value = attr.value;
    } else {
      this.__items.push(attr);
    }
  }
  getNamedItem(attrName) {
    if (this.caseInsensitive) {
      attrName = attrName.toLowerCase();
    }
    return this.getNamedItemNS(null, attrName);
  }
  getNamedItemNS(namespaceURI, attrName) {
    namespaceURI = getNamespaceURI(namespaceURI);
    return this.__items.find((attr) => attr.name === attrName && getNamespaceURI(attr.namespaceURI) === namespaceURI) || null;
  }
  removeNamedItem(attr) {
    this.removeNamedItemNS(attr);
  }
  removeNamedItemNS(attr) {
    for (let i = 0, ii = this.__items.length; i < ii; i++) {
      if (this.__items[i].name === attr.name && this.__items[i].namespaceURI === attr.namespaceURI) {
        this.__items.splice(i, 1);
        break;
      }
    }
  }
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => ({
        done: i === this.length,
        value: this.item(i++)
      })
    };
  }
  get [Symbol.toStringTag]() {
    return "MockAttributeMap";
  }
};
function getNamespaceURI(namespaceURI) {
  return namespaceURI === XLINK_NS ? null : namespaceURI;
}
function cloneAttributes(srcAttrs, sortByName = false) {
  const dstAttrs = new MockAttributeMap(srcAttrs.caseInsensitive);
  if (srcAttrs != null) {
    const attrLen = srcAttrs.length;
    if (sortByName && attrLen > 1) {
      const sortedAttrs = [];
      for (let i = 0; i < attrLen; i++) {
        const srcAttr = srcAttrs.item(i);
        const dstAttr = new MockAttr(srcAttr.name, srcAttr.value, srcAttr.namespaceURI);
        sortedAttrs.push(dstAttr);
      }
      sortedAttrs.sort(sortAttributes).forEach((attr) => {
        dstAttrs.setNamedItemNS(attr);
      });
    } else {
      for (let i = 0; i < attrLen; i++) {
        const srcAttr = srcAttrs.item(i);
        const dstAttr = new MockAttr(srcAttr.name, srcAttr.value, srcAttr.namespaceURI);
        dstAttrs.setNamedItemNS(dstAttr);
      }
    }
  }
  return dstAttrs;
}
function sortAttributes(a, b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}
var MockAttr = class {
  constructor(attrName, attrValue, namespaceURI = null) {
    this._name = attrName;
    this._value = String(attrValue);
    this._namespaceURI = namespaceURI;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = String(value);
  }
  get nodeName() {
    return this._name;
  }
  set nodeName(value) {
    this._name = value;
  }
  get nodeValue() {
    return this._value;
  }
  set nodeValue(value) {
    this._value = String(value);
  }
  get namespaceURI() {
    return this._namespaceURI;
  }
  set namespaceURI(namespaceURI) {
    this._namespaceURI = namespaceURI;
  }
};

// src/mock-doc/constants.ts
var NODE_TYPES = /* @__PURE__ */ ((NODE_TYPES2) => {
  NODE_TYPES2[NODE_TYPES2["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
  NODE_TYPES2[NODE_TYPES2["ATTRIBUTE_NODE"] = 2] = "ATTRIBUTE_NODE";
  NODE_TYPES2[NODE_TYPES2["TEXT_NODE"] = 3] = "TEXT_NODE";
  NODE_TYPES2[NODE_TYPES2["CDATA_SECTION_NODE"] = 4] = "CDATA_SECTION_NODE";
  NODE_TYPES2[NODE_TYPES2["ENTITY_REFERENCE_NODE"] = 5] = "ENTITY_REFERENCE_NODE";
  NODE_TYPES2[NODE_TYPES2["ENTITY_NODE"] = 6] = "ENTITY_NODE";
  NODE_TYPES2[NODE_TYPES2["PROCESSING_INSTRUCTION_NODE"] = 7] = "PROCESSING_INSTRUCTION_NODE";
  NODE_TYPES2[NODE_TYPES2["COMMENT_NODE"] = 8] = "COMMENT_NODE";
  NODE_TYPES2[NODE_TYPES2["DOCUMENT_NODE"] = 9] = "DOCUMENT_NODE";
  NODE_TYPES2[NODE_TYPES2["DOCUMENT_TYPE_NODE"] = 10] = "DOCUMENT_TYPE_NODE";
  NODE_TYPES2[NODE_TYPES2["DOCUMENT_FRAGMENT_NODE"] = 11] = "DOCUMENT_FRAGMENT_NODE";
  NODE_TYPES2[NODE_TYPES2["NOTATION_NODE"] = 12] = "NOTATION_NODE";
  return NODE_TYPES2;
})(NODE_TYPES || {});

// src/mock-doc/class-list.ts
var MockClassList = class {
  constructor(elm) {
    this.elm = elm;
  }
  add(...classNames) {
    const clsNames = getItems(this.elm);
    let updated = false;
    classNames.forEach((className) => {
      className = String(className);
      validateClass(className);
      if (clsNames.includes(className) === false) {
        clsNames.push(className);
        updated = true;
      }
    });
    if (updated) {
      this.elm.setAttributeNS(null, "class", clsNames.join(" "));
    }
  }
  remove(...classNames) {
    const clsNames = getItems(this.elm);
    let updated = false;
    classNames.forEach((className) => {
      className = String(className);
      validateClass(className);
      const index = clsNames.indexOf(className);
      if (index > -1) {
        clsNames.splice(index, 1);
        updated = true;
      }
    });
    if (updated) {
      this.elm.setAttributeNS(null, "class", clsNames.filter((c) => c.length > 0).join(" "));
    }
  }
  contains(className) {
    className = String(className);
    return getItems(this.elm).includes(className);
  }
  toggle(className) {
    className = String(className);
    if (this.contains(className) === true) {
      this.remove(className);
    } else {
      this.add(className);
    }
  }
  get length() {
    return getItems(this.elm).length;
  }
  item(index) {
    return getItems(this.elm)[index];
  }
  toString() {
    return getItems(this.elm).join(" ");
  }
};
function validateClass(className) {
  if (className === "") {
    throw new Error("The token provided must not be empty.");
  }
  if (/\s/.test(className)) {
    throw new Error(
      `The token provided ('${className}') contains HTML space characters, which are not valid in tokens.`
    );
  }
}
function getItems(elm) {
  const className = elm.getAttribute("class");
  if (typeof className === "string" && className.length > 0) {
    return className.trim().split(" ").filter((c) => c.length > 0);
  }
  return [];
}

// src/mock-doc/css-style-declaration.ts
var MockCSSStyleDeclaration = class {
  constructor() {
    this._styles = /* @__PURE__ */ new Map();
  }
  setProperty(prop, value) {
    prop = jsCaseToCssCase(prop);
    if (value == null || value === "") {
      this._styles.delete(prop);
    } else {
      this._styles.set(prop, String(value));
    }
  }
  getPropertyValue(prop) {
    prop = jsCaseToCssCase(prop);
    return String(this._styles.get(prop) || "");
  }
  removeProperty(prop) {
    prop = jsCaseToCssCase(prop);
    this._styles.delete(prop);
  }
  get length() {
    return this._styles.size;
  }
  get cssText() {
    const cssText = [];
    this._styles.forEach((value, prop) => {
      cssText.push(`${prop}: ${value};`);
    });
    return cssText.join(" ").trim();
  }
  set cssText(cssText) {
    if (cssText == null || cssText === "") {
      this._styles.clear();
      return;
    }
    cssText.split(";").forEach((rule) => {
      rule = rule.trim();
      if (rule.length > 0) {
        const splt = rule.split(":");
        if (splt.length > 1) {
          const prop = splt[0].trim();
          const value = splt.slice(1).join(":").trim();
          if (prop !== "" && value !== "") {
            this._styles.set(jsCaseToCssCase(prop), value);
          }
        }
      }
    });
  }
};
function createCSSStyleDeclaration() {
  return new Proxy(new MockCSSStyleDeclaration(), cssProxyHandler);
}
var cssProxyHandler = {
  get(cssStyle, prop) {
    if (prop in cssStyle) {
      return cssStyle[prop];
    }
    prop = cssCaseToJsCase(prop);
    return cssStyle.getPropertyValue(prop);
  },
  set(cssStyle, prop, value) {
    if (prop in cssStyle) {
      cssStyle[prop] = value;
    } else {
      cssStyle.setProperty(prop, value);
    }
    return true;
  }
};
function cssCaseToJsCase(str) {
  if (str.length > 1 && str.includes("-") === true) {
    str = str.toLowerCase().split("-").map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join("");
    str = str.slice(0, 1).toLowerCase() + str.slice(1);
  }
  return str;
}
function jsCaseToCssCase(str) {
  if (str.length > 1 && str.includes("-") === false && /[A-Z]/.test(str) === true) {
    str = str.replace(/([A-Z])/g, (g) => " " + g[0]).trim().replace(/ /g, "-").toLowerCase();
  }
  return str;
}

// src/mock-doc/custom-element-registry.ts
var MockCustomElementRegistry = class {
  constructor(win) {
    this.win = win;
  }
  define(tagName, cstr, options) {
    if (tagName.toLowerCase() !== tagName) {
      throw new Error(
        `Failed to execute 'define' on 'CustomElementRegistry': "${tagName}" is not a valid custom element name`
      );
    }
    if (this.__registry == null) {
      this.__registry = /* @__PURE__ */ new Map();
    }
    this.__registry.set(tagName, { cstr, options });
    if (this.__whenDefined != null) {
      const whenDefinedResolveFns = this.__whenDefined.get(tagName);
      if (whenDefinedResolveFns != null) {
        whenDefinedResolveFns.forEach((whenDefinedResolveFn) => {
          whenDefinedResolveFn();
        });
        whenDefinedResolveFns.length = 0;
        this.__whenDefined.delete(tagName);
      }
    }
    const doc = this.win.document;
    if (doc != null) {
      const hosts = doc.querySelectorAll(tagName);
      hosts.forEach((host) => {
        if (upgradedElements.has(host) === false) {
          tempDisableCallbacks.add(doc);
          const upgradedCmp = createCustomElement(this, doc, tagName);
          for (let i = 0; i < host.childNodes.length; i++) {
            const childNode = host.childNodes[i];
            childNode.remove();
            upgradedCmp.appendChild(childNode);
          }
          tempDisableCallbacks.delete(doc);
          if (proxyElements.has(host)) {
            proxyElements.set(host, upgradedCmp);
          }
        }
        fireConnectedCallback(host);
      });
    }
  }
  get(tagName) {
    if (this.__registry != null) {
      const def = this.__registry.get(tagName.toLowerCase());
      if (def != null) {
        return def.cstr;
      }
    }
    return void 0;
  }
  getName(cstr) {
    for (const [tagName, def] of this.__registry.entries()) {
      if (def.cstr === cstr) {
        return tagName;
      }
    }
    return void 0;
  }
  upgrade(_rootNode) {
  }
  clear() {
    if (this.__registry != null) {
      this.__registry.clear();
    }
    if (this.__whenDefined != null) {
      this.__whenDefined.clear();
    }
  }
  whenDefined(tagName) {
    tagName = tagName.toLowerCase();
    if (this.__registry != null && this.__registry.has(tagName) === true) {
      return Promise.resolve(this.__registry.get(tagName).cstr);
    }
    return new Promise((resolve) => {
      if (this.__whenDefined == null) {
        this.__whenDefined = /* @__PURE__ */ new Map();
      }
      let whenDefinedResolveFns = this.__whenDefined.get(tagName);
      if (whenDefinedResolveFns == null) {
        whenDefinedResolveFns = [];
        this.__whenDefined.set(tagName, whenDefinedResolveFns);
      }
      whenDefinedResolveFns.push(resolve);
    });
  }
};
function createCustomElement(customElements, ownerDocument, tagName) {
  const Cstr = customElements.get(tagName);
  if (Cstr != null) {
    const cmp = new Cstr(ownerDocument);
    cmp.nodeName = tagName.toUpperCase();
    upgradedElements.add(cmp);
    return cmp;
  }
  const host = new Proxy(
    {},
    {
      get(obj, prop) {
        const elm2 = proxyElements.get(host);
        if (elm2 != null) {
          return elm2[prop];
        }
        return obj[prop];
      },
      set(obj, prop, val) {
        const elm2 = proxyElements.get(host);
        if (elm2 != null) {
          elm2[prop] = val;
        } else {
          obj[prop] = val;
        }
        return true;
      },
      has(obj, prop) {
        const elm2 = proxyElements.get(host);
        if (prop in elm2) {
          return true;
        }
        if (prop in obj) {
          return true;
        }
        return false;
      }
    }
  );
  const elm = new MockHTMLElement(ownerDocument, tagName);
  proxyElements.set(host, elm);
  return host;
}
var proxyElements = /* @__PURE__ */ new WeakMap();
var upgradedElements = /* @__PURE__ */ new WeakSet();
function connectNode(ownerDocument, node) {
  node.ownerDocument = ownerDocument;
  if (node.nodeType === 1 /* ELEMENT_NODE */) {
    if (ownerDocument != null && node.nodeName.includes("-")) {
      const win = ownerDocument.defaultView;
      if (win != null && typeof node.connectedCallback === "function" && node.isConnected) {
        fireConnectedCallback(node);
      }
      const shadowRoot = node.shadowRoot;
      if (shadowRoot != null) {
        shadowRoot.childNodes.forEach((childNode) => {
          connectNode(ownerDocument, childNode);
        });
      }
    }
    node.childNodes.forEach((childNode) => {
      connectNode(ownerDocument, childNode);
    });
  } else {
    node.childNodes.forEach((childNode) => {
      childNode.ownerDocument = ownerDocument;
    });
  }
}
function fireConnectedCallback(node) {
  if (typeof node.connectedCallback === "function") {
    if (tempDisableCallbacks.has(node.ownerDocument) === false) {
      try {
        node.connectedCallback();
      } catch (e2) {
        console.error(e2);
      }
    }
  }
}
function disconnectNode(node) {
  if (node.nodeType === 1 /* ELEMENT_NODE */) {
    if (node.nodeName.includes("-") === true && typeof node.disconnectedCallback === "function") {
      if (tempDisableCallbacks.has(node.ownerDocument) === false) {
        try {
          node.disconnectedCallback();
        } catch (e2) {
          console.error(e2);
        }
      }
    }
    node.childNodes.forEach(disconnectNode);
  }
}
function attributeChanged(node, attrName, oldValue, newValue) {
  attrName = attrName.toLowerCase();
  const observedAttributes = node.constructor.observedAttributes;
  if (Array.isArray(observedAttributes) === true && observedAttributes.some((obs) => obs.toLowerCase() === attrName) === true) {
    try {
      node.attributeChangedCallback(attrName, oldValue, newValue);
    } catch (e2) {
      console.error(e2);
    }
  }
}
function checkAttributeChanged(node) {
  return node.nodeName.includes("-") === true && typeof node.attributeChangedCallback === "function";
}
var tempDisableCallbacks = /* @__PURE__ */ new Set();

// src/mock-doc/dataset.ts
function dataset(elm) {
  const ds = {};
  const attributes = elm.attributes;
  const attrLen = attributes.length;
  for (let i = 0; i < attrLen; i++) {
    const attr = attributes.item(i);
    const nodeName = attr.nodeName;
    if (nodeName.startsWith("data-")) {
      ds[dashToPascalCase(nodeName)] = attr.nodeValue;
    }
  }
  return new Proxy(ds, {
    get(_obj, camelCaseProp) {
      return ds[camelCaseProp];
    },
    set(_obj, camelCaseProp, value) {
      const dataAttr = toDataAttribute(camelCaseProp);
      elm.setAttribute(dataAttr, value);
      return true;
    }
  });
}
function toDataAttribute(str) {
  return "data-" + String(str).replace(/([A-Z0-9])/g, (g) => " " + g[0]).trim().replace(/ /g, "-").toLowerCase();
}
function dashToPascalCase(str) {
  str = String(str).slice(5);
  return str.split("-").map((segment, index) => {
    if (index === 0) {
      return segment.charAt(0).toLowerCase() + segment.slice(1);
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }).join("");
}

// src/mock-doc/event.ts
var MockEvent = class {
  constructor(type, eventInitDict) {
    this.bubbles = false;
    this.cancelBubble = false;
    this.cancelable = false;
    this.composed = false;
    this.currentTarget = null;
    this.defaultPrevented = false;
    this.srcElement = null;
    this.target = null;
    if (typeof type !== "string") {
      throw new Error(`Event type required`);
    }
    this.type = type;
    this.timeStamp = Date.now();
    if (eventInitDict != null) {
      Object.assign(this, eventInitDict);
    }
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
  stopPropagation() {
    this.cancelBubble = true;
  }
  stopImmediatePropagation() {
    this.cancelBubble = true;
  }
  /**
   * @ref https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
   * @returns a composed path of the event
   */
  composedPath() {
    const composedPath = [];
    let currentElement = this.target;
    while (currentElement) {
      composedPath.push(currentElement);
      if (!currentElement.parentElement && currentElement.nodeName === "#document" /* DOCUMENT_NODE */) {
        composedPath.push(currentElement.defaultView);
        break;
      }
      if (currentElement.parentElement == null && currentElement.tagName === "HTML") {
        currentElement = currentElement.ownerDocument;
      } else {
        currentElement = currentElement.parentElement;
      }
    }
    return composedPath;
  }
};
var MockCustomEvent = class extends MockEvent {
  constructor(type, customEventInitDic) {
    super(type);
    this.detail = null;
    if (customEventInitDic != null) {
      Object.assign(this, customEventInitDic);
    }
  }
};
var MockKeyboardEvent = class extends MockEvent {
  constructor(type, keyboardEventInitDic) {
    super(type);
    this.code = "";
    this.key = "";
    this.altKey = false;
    this.ctrlKey = false;
    this.metaKey = false;
    this.shiftKey = false;
    this.location = 0;
    this.repeat = false;
    if (keyboardEventInitDic != null) {
      Object.assign(this, keyboardEventInitDic);
    }
  }
};
var MockMouseEvent = class extends MockEvent {
  constructor(type, mouseEventInitDic) {
    super(type);
    this.screenX = 0;
    this.screenY = 0;
    this.clientX = 0;
    this.clientY = 0;
    this.ctrlKey = false;
    this.shiftKey = false;
    this.altKey = false;
    this.metaKey = false;
    this.button = 0;
    this.buttons = 0;
    this.relatedTarget = null;
    if (mouseEventInitDic != null) {
      Object.assign(this, mouseEventInitDic);
    }
  }
};
var MockUIEvent = class extends MockEvent {
  constructor(type, uiEventInitDic) {
    super(type);
    this.detail = null;
    this.view = null;
    if (uiEventInitDic != null) {
      Object.assign(this, uiEventInitDic);
    }
  }
};
var MockFocusEvent = class extends MockUIEvent {
  constructor(type, focusEventInitDic) {
    super(type);
    this.relatedTarget = null;
    if (focusEventInitDic != null) {
      Object.assign(this, focusEventInitDic);
    }
  }
};
var MockEventListener = class {
  constructor(type, handler) {
    this.type = type;
    this.handler = handler;
  }
};
function addEventListener(elm, type, handler) {
  const target = elm;
  if (target.__listeners == null) {
    target.__listeners = [];
  }
  target.__listeners.push(new MockEventListener(type, handler));
}
function removeEventListener(elm, type, handler) {
  const target = elm;
  if (target != null && Array.isArray(target.__listeners) === true) {
    const elmListener = target.__listeners.find((e2) => e2.type === type && e2.handler === handler);
    if (elmListener != null) {
      const index = target.__listeners.indexOf(elmListener);
      target.__listeners.splice(index, 1);
    }
  }
}
function resetEventListeners(target) {
  if (target != null && target.__listeners != null) {
    target.__listeners = null;
  }
}
function triggerEventListener(elm, ev) {
  if (elm == null || ev.cancelBubble === true) {
    return;
  }
  const target = elm;
  ev.currentTarget = elm;
  if (Array.isArray(target.__listeners) === true) {
    const listeners = target.__listeners.filter((e2) => e2.type === ev.type);
    listeners.forEach((listener) => {
      try {
        listener.handler.call(target, ev);
      } catch (err) {
        console.error(err);
      }
    });
  }
  if (ev.bubbles === false) {
    return;
  }
  if (elm.nodeName === "#document" /* DOCUMENT_NODE */) {
    triggerEventListener(elm.defaultView, ev);
  } else if (elm.parentElement == null && elm.tagName === "HTML") {
    triggerEventListener(elm.ownerDocument, ev);
  } else {
    triggerEventListener(elm.parentElement, ev);
  }
}
function dispatchEvent(currentTarget, ev) {
  ev.target = currentTarget;
  triggerEventListener(currentTarget, ev);
  return true;
}

// scripts/build/parse5-7_1_2-bundle-cache.min.js
var e = function(e2) {
  const t = /* @__PURE__ */ new Set([65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111]), s = "\uFFFD";
  var a;
  !function(e3) {
    e3[e3.EOF = -1] = "EOF", e3[e3.NULL = 0] = "NULL", e3[e3.TABULATION = 9] = "TABULATION", e3[e3.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e3[e3.LINE_FEED = 10] = "LINE_FEED", e3[e3.FORM_FEED = 12] = "FORM_FEED", e3[e3.SPACE = 32] = "SPACE", e3[e3.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e3[e3.QUOTATION_MARK = 34] = "QUOTATION_MARK", e3[e3.NUMBER_SIGN = 35] = "NUMBER_SIGN", e3[e3.AMPERSAND = 38] = "AMPERSAND", e3[e3.APOSTROPHE = 39] = "APOSTROPHE", e3[e3.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e3[e3.SOLIDUS = 47] = "SOLIDUS", e3[e3.DIGIT_0 = 48] = "DIGIT_0", e3[e3.DIGIT_9 = 57] = "DIGIT_9", e3[e3.SEMICOLON = 59] = "SEMICOLON", e3[e3.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e3[e3.EQUALS_SIGN = 61] = "EQUALS_SIGN", e3[e3.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e3[e3.QUESTION_MARK = 63] = "QUESTION_MARK", e3[e3.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e3[e3.LATIN_CAPITAL_F = 70] = "LATIN_CAPITAL_F", e3[e3.LATIN_CAPITAL_X = 88] = "LATIN_CAPITAL_X", e3[e3.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e3[e3.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e3[e3.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e3[e3.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e3[e3.LATIN_SMALL_F = 102] = "LATIN_SMALL_F", e3[e3.LATIN_SMALL_X = 120] = "LATIN_SMALL_X", e3[e3.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z", e3[e3.REPLACEMENT_CHARACTER = 65533] = "REPLACEMENT_CHARACTER";
  }(a = a || (a = {}));
  const r = "[CDATA[", n = "doctype", i = "script";
  function o(e3) {
    return e3 >= 55296 && e3 <= 57343;
  }
  function c(e3) {
    return 32 !== e3 && 10 !== e3 && 13 !== e3 && 9 !== e3 && 12 !== e3 && e3 >= 1 && e3 <= 31 || e3 >= 127 && e3 <= 159;
  }
  function E(e3) {
    return e3 >= 64976 && e3 <= 65007 || t.has(e3);
  }
  var T, h;
  !function(e3) {
    e3.controlCharacterInInputStream = "control-character-in-input-stream", e3.noncharacterInInputStream = "noncharacter-in-input-stream", e3.surrogateInInputStream = "surrogate-in-input-stream", e3.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e3.endTagWithAttributes = "end-tag-with-attributes", e3.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e3.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e3.unexpectedNullCharacter = "unexpected-null-character", e3.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e3.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e3.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e3.missingEndTagName = "missing-end-tag-name", e3.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e3.unknownNamedCharacterReference = "unknown-named-character-reference", e3.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e3.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e3.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e3.eofBeforeTagName = "eof-before-tag-name", e3.eofInTag = "eof-in-tag", e3.missingAttributeValue = "missing-attribute-value", e3.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e3.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e3.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e3.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e3.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e3.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e3.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e3.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e3.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e3.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e3.cdataInHtmlContent = "cdata-in-html-content", e3.incorrectlyOpenedComment = "incorrectly-opened-comment", e3.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e3.eofInDoctype = "eof-in-doctype", e3.nestedComment = "nested-comment", e3.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e3.eofInComment = "eof-in-comment", e3.incorrectlyClosedComment = "incorrectly-closed-comment", e3.eofInCdata = "eof-in-cdata", e3.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e3.nullCharacterReference = "null-character-reference", e3.surrogateCharacterReference = "surrogate-character-reference", e3.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e3.controlCharacterReference = "control-character-reference", e3.noncharacterCharacterReference = "noncharacter-character-reference", e3.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e3.missingDoctypeName = "missing-doctype-name", e3.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e3.duplicateAttribute = "duplicate-attribute", e3.nonConformingDoctype = "non-conforming-doctype", e3.missingDoctype = "missing-doctype", e3.misplacedDoctype = "misplaced-doctype", e3.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e3.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e3.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e3.openElementsLeftAfterEof = "open-elements-left-after-eof", e3.abandonedHeadElementChild = "abandoned-head-element-child", e3.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e3.nestedNoscriptInHead = "nested-noscript-in-head", e3.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
  }(T = T || (T = {}));
  class _ {
    constructor(e3) {
      this.handler = e3, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = false, this.lastChunkWritten = false, this.endOfChunkHit = false, this.bufferWaterline = 65536, this.isEol = false, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
    }
    get col() {
      return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
    }
    get offset() {
      return this.droppedBufferSize + this.pos;
    }
    getError(e3) {
      const { line: t2, col: s2, offset: a2 } = this;
      return { code: e3, startLine: t2, endLine: t2, startCol: s2, endCol: s2, startOffset: a2, endOffset: a2 };
    }
    _err(e3) {
      this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(e3)));
    }
    _addGap() {
      this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
    }
    _processSurrogate(e3) {
      if (this.pos !== this.html.length - 1) {
        const t2 = this.html.charCodeAt(this.pos + 1);
        if (function(e4) {
          return e4 >= 56320 && e4 <= 57343;
        }(t2))
          return this.pos++, this._addGap(), 1024 * (e3 - 55296) + 9216 + t2;
      } else if (!this.lastChunkWritten)
        return this.endOfChunkHit = true, a.EOF;
      return this._err(T.surrogateInInputStream), e3;
    }
    willDropParsedChunk() {
      return this.pos > this.bufferWaterline;
    }
    dropParsedChunk() {
      this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
    }
    write(e3, t2) {
      this.html.length > 0 ? this.html += e3 : this.html = e3, this.endOfChunkHit = false, this.lastChunkWritten = t2;
    }
    insertHtmlAtCurrentPos(e3) {
      this.html = this.html.substring(0, this.pos + 1) + e3 + this.html.substring(this.pos + 1), this.endOfChunkHit = false;
    }
    startsWith(e3, t2) {
      if (this.pos + e3.length > this.html.length)
        return this.endOfChunkHit = !this.lastChunkWritten, false;
      if (t2)
        return this.html.startsWith(e3, this.pos);
      for (let t3 = 0; t3 < e3.length; t3++)
        if ((32 | this.html.charCodeAt(this.pos + t3)) !== e3.charCodeAt(t3))
          return false;
      return true;
    }
    peek(e3) {
      const t2 = this.pos + e3;
      if (t2 >= this.html.length)
        return this.endOfChunkHit = !this.lastChunkWritten, a.EOF;
      const s2 = this.html.charCodeAt(t2);
      return s2 === a.CARRIAGE_RETURN ? a.LINE_FEED : s2;
    }
    advance() {
      if (this.pos++, this.isEol && (this.isEol = false, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
        return this.endOfChunkHit = !this.lastChunkWritten, a.EOF;
      let e3 = this.html.charCodeAt(this.pos);
      return e3 === a.CARRIAGE_RETURN ? (this.isEol = true, this.skipNextNewLine = true, a.LINE_FEED) : e3 === a.LINE_FEED && (this.isEol = true, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = false, this._addGap(), this.advance()) : (this.skipNextNewLine = false, o(e3) && (e3 = this._processSurrogate(e3)), null === this.handler.onParseError || e3 > 31 && e3 < 127 || e3 === a.LINE_FEED || e3 === a.CARRIAGE_RETURN || e3 > 159 && e3 < 64976 || this._checkForProblematicCharacters(e3), e3);
    }
    _checkForProblematicCharacters(e3) {
      c(e3) ? this._err(T.controlCharacterInInputStream) : E(e3) && this._err(T.noncharacterInInputStream);
    }
    retreat(e3) {
      for (this.pos -= e3; this.pos < this.lastGapPos; )
        this.lastGapPos = this.gapStack.pop(), this.pos--;
      this.isEol = false;
    }
  }
  function A(e3, t2) {
    for (let s2 = e3.attrs.length - 1; s2 >= 0; s2--)
      if (e3.attrs[s2].name === t2)
        return e3.attrs[s2].value;
    return null;
  }
  !function(e3) {
    e3[e3.CHARACTER = 0] = "CHARACTER", e3[e3.NULL_CHARACTER = 1] = "NULL_CHARACTER", e3[e3.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e3[e3.START_TAG = 3] = "START_TAG", e3[e3.END_TAG = 4] = "END_TAG", e3[e3.COMMENT = 5] = "COMMENT", e3[e3.DOCTYPE = 6] = "DOCTYPE", e3[e3.EOF = 7] = "EOF", e3[e3.HIBERNATION = 8] = "HIBERNATION";
  }(h = h || (h = {}));
  var l = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, m = {}, d = {};
  Object.defineProperty(d, "__esModule", { value: true }), d.default = new Uint16Array('\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map(function(e3) {
    return e3.charCodeAt(0);
  }));
  var p = {};
  Object.defineProperty(p, "__esModule", { value: true }), p.default = new Uint16Array("\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map(function(e3) {
    return e3.charCodeAt(0);
  }));
  var u, N, I, C, S, D = {};
  !function(e3) {
    var t2;
    Object.defineProperty(e3, "__esModule", { value: true }), e3.replaceCodePoint = e3.fromCodePoint = void 0;
    var s2 = /* @__PURE__ */ new Map([[0, 65533], [128, 8364], [130, 8218], [131, 402], [132, 8222], [133, 8230], [134, 8224], [135, 8225], [136, 710], [137, 8240], [138, 352], [139, 8249], [140, 338], [142, 381], [145, 8216], [146, 8217], [147, 8220], [148, 8221], [149, 8226], [150, 8211], [151, 8212], [152, 732], [153, 8482], [154, 353], [155, 8250], [156, 339], [158, 382], [159, 376]]);
    function a2(e4) {
      var t3;
      return e4 >= 55296 && e4 <= 57343 || e4 > 1114111 ? 65533 : null !== (t3 = s2.get(e4)) && void 0 !== t3 ? t3 : e4;
    }
    e3.fromCodePoint = null !== (t2 = String.fromCodePoint) && void 0 !== t2 ? t2 : function(e4) {
      var t3 = "";
      return e4 > 65535 && (e4 -= 65536, t3 += String.fromCharCode(e4 >>> 10 & 1023 | 55296), e4 = 56320 | 1023 & e4), t3 + String.fromCharCode(e4);
    }, e3.replaceCodePoint = a2, e3.default = function(t3) {
      return (0, e3.fromCodePoint)(a2(t3));
    };
  }(D), function(e3) {
    var t2 = l && l.__createBinding || (Object.create ? function(e4, t3, s3, a3) {
      void 0 === a3 && (a3 = s3);
      var r3 = Object.getOwnPropertyDescriptor(t3, s3);
      r3 && !("get" in r3 ? !t3.__esModule : r3.writable || r3.configurable) || (r3 = { enumerable: true, get: function() {
        return t3[s3];
      } }), Object.defineProperty(e4, a3, r3);
    } : function(e4, t3, s3, a3) {
      void 0 === a3 && (a3 = s3), e4[a3] = t3[s3];
    }), s2 = l && l.__setModuleDefault || (Object.create ? function(e4, t3) {
      Object.defineProperty(e4, "default", { enumerable: true, value: t3 });
    } : function(e4, t3) {
      e4.default = t3;
    }), a2 = l && l.__importStar || function(e4) {
      if (e4 && e4.__esModule)
        return e4;
      var a3 = {};
      if (null != e4)
        for (var r3 in e4)
          "default" !== r3 && Object.prototype.hasOwnProperty.call(e4, r3) && t2(a3, e4, r3);
      return s2(a3, e4), a3;
    }, r2 = l && l.__importDefault || function(e4) {
      return e4 && e4.__esModule ? e4 : { default: e4 };
    };
    Object.defineProperty(e3, "__esModule", { value: true }), e3.decodeXML = e3.decodeHTMLStrict = e3.decodeHTMLAttribute = e3.decodeHTML = e3.determineBranch = e3.EntityDecoder = e3.DecodingMode = e3.BinTrieFlags = e3.fromCodePoint = e3.replaceCodePoint = e3.decodeCodePoint = e3.xmlDecodeTree = e3.htmlDecodeTree = void 0;
    var n2 = r2(d);
    e3.htmlDecodeTree = n2.default;
    var i2 = r2(p);
    e3.xmlDecodeTree = i2.default;
    var o2 = a2(D);
    e3.decodeCodePoint = o2.default;
    var c2, E2, T2, h2, _2 = D;
    function A2(e4) {
      return e4 >= c2.ZERO && e4 <= c2.NINE;
    }
    Object.defineProperty(e3, "replaceCodePoint", { enumerable: true, get: function() {
      return _2.replaceCodePoint;
    } }), Object.defineProperty(e3, "fromCodePoint", { enumerable: true, get: function() {
      return _2.fromCodePoint;
    } }), function(e4) {
      e4[e4.NUM = 35] = "NUM", e4[e4.SEMI = 59] = "SEMI", e4[e4.EQUALS = 61] = "EQUALS", e4[e4.ZERO = 48] = "ZERO", e4[e4.NINE = 57] = "NINE", e4[e4.LOWER_A = 97] = "LOWER_A", e4[e4.LOWER_F = 102] = "LOWER_F", e4[e4.LOWER_X = 120] = "LOWER_X", e4[e4.LOWER_Z = 122] = "LOWER_Z", e4[e4.UPPER_A = 65] = "UPPER_A", e4[e4.UPPER_F = 70] = "UPPER_F", e4[e4.UPPER_Z = 90] = "UPPER_Z";
    }(c2 || (c2 = {})), function(e4) {
      e4[e4.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e4[e4.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e4[e4.JUMP_TABLE = 127] = "JUMP_TABLE";
    }(E2 = e3.BinTrieFlags || (e3.BinTrieFlags = {})), function(e4) {
      e4[e4.EntityStart = 0] = "EntityStart", e4[e4.NumericStart = 1] = "NumericStart", e4[e4.NumericDecimal = 2] = "NumericDecimal", e4[e4.NumericHex = 3] = "NumericHex", e4[e4.NamedEntity = 4] = "NamedEntity";
    }(T2 || (T2 = {})), function(e4) {
      e4[e4.Legacy = 0] = "Legacy", e4[e4.Strict = 1] = "Strict", e4[e4.Attribute = 2] = "Attribute";
    }(h2 = e3.DecodingMode || (e3.DecodingMode = {}));
    var m2 = function() {
      function e4(e5, t3, s3) {
        this.decodeTree = e5, this.emitCodePoint = t3, this.errors = s3, this.state = T2.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = h2.Strict;
      }
      return e4.prototype.startEntity = function(e5) {
        this.decodeMode = e5, this.state = T2.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
      }, e4.prototype.write = function(e5, t3) {
        switch (this.state) {
          case T2.EntityStart:
            return e5.charCodeAt(t3) === c2.NUM ? (this.state = T2.NumericStart, this.consumed += 1, this.stateNumericStart(e5, t3 + 1)) : (this.state = T2.NamedEntity, this.stateNamedEntity(e5, t3));
          case T2.NumericStart:
            return this.stateNumericStart(e5, t3);
          case T2.NumericDecimal:
            return this.stateNumericDecimal(e5, t3);
          case T2.NumericHex:
            return this.stateNumericHex(e5, t3);
          case T2.NamedEntity:
            return this.stateNamedEntity(e5, t3);
        }
      }, e4.prototype.stateNumericStart = function(e5, t3) {
        return t3 >= e5.length ? -1 : (32 | e5.charCodeAt(t3)) === c2.LOWER_X ? (this.state = T2.NumericHex, this.consumed += 1, this.stateNumericHex(e5, t3 + 1)) : (this.state = T2.NumericDecimal, this.stateNumericDecimal(e5, t3));
      }, e4.prototype.addToNumericResult = function(e5, t3, s3, a3) {
        if (t3 !== s3) {
          var r3 = s3 - t3;
          this.result = this.result * Math.pow(a3, r3) + parseInt(e5.substr(t3, r3), a3), this.consumed += r3;
        }
      }, e4.prototype.stateNumericHex = function(e5, t3) {
        for (var s3, a3 = t3; t3 < e5.length; ) {
          var r3 = e5.charCodeAt(t3);
          if (!(A2(r3) || (s3 = r3, s3 >= c2.UPPER_A && s3 <= c2.UPPER_F || s3 >= c2.LOWER_A && s3 <= c2.LOWER_F)))
            return this.addToNumericResult(e5, a3, t3, 16), this.emitNumericEntity(r3, 3);
          t3 += 1;
        }
        return this.addToNumericResult(e5, a3, t3, 16), -1;
      }, e4.prototype.stateNumericDecimal = function(e5, t3) {
        for (var s3 = t3; t3 < e5.length; ) {
          var a3 = e5.charCodeAt(t3);
          if (!A2(a3))
            return this.addToNumericResult(e5, s3, t3, 10), this.emitNumericEntity(a3, 2);
          t3 += 1;
        }
        return this.addToNumericResult(e5, s3, t3, 10), -1;
      }, e4.prototype.emitNumericEntity = function(e5, t3) {
        var s3;
        if (this.consumed <= t3)
          return null === (s3 = this.errors) || void 0 === s3 || s3.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        if (e5 === c2.SEMI)
          this.consumed += 1;
        else if (this.decodeMode === h2.Strict)
          return 0;
        return this.emitCodePoint((0, o2.replaceCodePoint)(this.result), this.consumed), this.errors && (e5 !== c2.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
      }, e4.prototype.stateNamedEntity = function(e5, t3) {
        for (var s3 = this.decodeTree, a3 = s3[this.treeIndex], r3 = (a3 & E2.VALUE_LENGTH) >> 14; t3 < e5.length; t3++, this.excess++) {
          var n3 = e5.charCodeAt(t3);
          if (this.treeIndex = N2(s3, a3, this.treeIndex + Math.max(1, r3), n3), this.treeIndex < 0)
            return 0 === this.result || this.decodeMode === h2.Attribute && (0 === r3 || ((i3 = n3) === c2.EQUALS || function(e6) {
              return e6 >= c2.UPPER_A && e6 <= c2.UPPER_Z || e6 >= c2.LOWER_A && e6 <= c2.LOWER_Z || A2(e6);
            }(i3))) ? 0 : this.emitNotTerminatedNamedEntity();
          if (0 != (r3 = ((a3 = s3[this.treeIndex]) & E2.VALUE_LENGTH) >> 14)) {
            if (n3 === c2.SEMI)
              return this.emitNamedEntityData(this.treeIndex, r3, this.consumed + this.excess);
            this.decodeMode !== h2.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
          }
        }
        var i3;
        return -1;
      }, e4.prototype.emitNotTerminatedNamedEntity = function() {
        var e5, t3 = this.result, s3 = (this.decodeTree[t3] & E2.VALUE_LENGTH) >> 14;
        return this.emitNamedEntityData(t3, s3, this.consumed), null === (e5 = this.errors) || void 0 === e5 || e5.missingSemicolonAfterCharacterReference(), this.consumed;
      }, e4.prototype.emitNamedEntityData = function(e5, t3, s3) {
        var a3 = this.decodeTree;
        return this.emitCodePoint(1 === t3 ? a3[e5] & ~E2.VALUE_LENGTH : a3[e5 + 1], s3), 3 === t3 && this.emitCodePoint(a3[e5 + 2], s3), s3;
      }, e4.prototype.end = function() {
        var e5;
        switch (this.state) {
          case T2.NamedEntity:
            return 0 === this.result || this.decodeMode === h2.Attribute && this.result !== this.treeIndex ? 0 : this.emitNotTerminatedNamedEntity();
          case T2.NumericDecimal:
            return this.emitNumericEntity(0, 2);
          case T2.NumericHex:
            return this.emitNumericEntity(0, 3);
          case T2.NumericStart:
            return null === (e5 = this.errors) || void 0 === e5 || e5.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
          case T2.EntityStart:
            return 0;
        }
      }, e4;
    }();
    function u2(e4) {
      var t3 = "", s3 = new m2(e4, function(e5) {
        return t3 += (0, o2.fromCodePoint)(e5);
      });
      return function(e5, a3) {
        for (var r3 = 0, n3 = 0; (n3 = e5.indexOf("&", n3)) >= 0; ) {
          t3 += e5.slice(r3, n3), s3.startEntity(a3);
          var i3 = s3.write(e5, n3 + 1);
          if (i3 < 0) {
            r3 = n3 + s3.end();
            break;
          }
          r3 = n3 + i3, n3 = 0 === i3 ? r3 + 1 : r3;
        }
        var o3 = t3 + e5.slice(r3);
        return t3 = "", o3;
      };
    }
    function N2(e4, t3, s3, a3) {
      var r3 = (t3 & E2.BRANCH_LENGTH) >> 7, n3 = t3 & E2.JUMP_TABLE;
      if (0 === r3)
        return 0 !== n3 && a3 === n3 ? s3 : -1;
      if (n3) {
        var i3 = a3 - n3;
        return i3 < 0 || i3 >= r3 ? -1 : e4[s3 + i3] - 1;
      }
      for (var o3 = s3, c3 = o3 + r3 - 1; o3 <= c3; ) {
        var T3 = o3 + c3 >>> 1, h3 = e4[T3];
        if (h3 < a3)
          o3 = T3 + 1;
        else {
          if (!(h3 > a3))
            return e4[T3 + r3];
          c3 = T3 - 1;
        }
      }
      return -1;
    }
    e3.EntityDecoder = m2, e3.determineBranch = N2;
    var I2 = u2(n2.default), C2 = u2(i2.default);
    e3.decodeHTML = function(e4, t3) {
      return void 0 === t3 && (t3 = h2.Legacy), I2(e4, t3);
    }, e3.decodeHTMLAttribute = function(e4) {
      return I2(e4, h2.Attribute);
    }, e3.decodeHTMLStrict = function(e4) {
      return I2(e4, h2.Strict);
    }, e3.decodeXML = function(e4) {
      return C2(e4, h2.Strict);
    };
  }(m), function(e3) {
    e3.HTML = "http://www.w3.org/1999/xhtml", e3.MATHML = "http://www.w3.org/1998/Math/MathML", e3.SVG = "http://www.w3.org/2000/svg", e3.XLINK = "http://www.w3.org/1999/xlink", e3.XML = "http://www.w3.org/XML/1998/namespace", e3.XMLNS = "http://www.w3.org/2000/xmlns/";
  }(u = u || (u = {})), function(e3) {
    e3.TYPE = "type", e3.ACTION = "action", e3.ENCODING = "encoding", e3.PROMPT = "prompt", e3.NAME = "name", e3.COLOR = "color", e3.FACE = "face", e3.SIZE = "size";
  }(N = N || (N = {})), function(e3) {
    e3.NO_QUIRKS = "no-quirks", e3.QUIRKS = "quirks", e3.LIMITED_QUIRKS = "limited-quirks";
  }(I = I || (I = {})), function(e3) {
    e3.A = "a", e3.ADDRESS = "address", e3.ANNOTATION_XML = "annotation-xml", e3.APPLET = "applet", e3.AREA = "area", e3.ARTICLE = "article", e3.ASIDE = "aside", e3.B = "b", e3.BASE = "base", e3.BASEFONT = "basefont", e3.BGSOUND = "bgsound", e3.BIG = "big", e3.BLOCKQUOTE = "blockquote", e3.BODY = "body", e3.BR = "br", e3.BUTTON = "button", e3.CAPTION = "caption", e3.CENTER = "center", e3.CODE = "code", e3.COL = "col", e3.COLGROUP = "colgroup", e3.DD = "dd", e3.DESC = "desc", e3.DETAILS = "details", e3.DIALOG = "dialog", e3.DIR = "dir", e3.DIV = "div", e3.DL = "dl", e3.DT = "dt", e3.EM = "em", e3.EMBED = "embed", e3.FIELDSET = "fieldset", e3.FIGCAPTION = "figcaption", e3.FIGURE = "figure", e3.FONT = "font", e3.FOOTER = "footer", e3.FOREIGN_OBJECT = "foreignObject", e3.FORM = "form", e3.FRAME = "frame", e3.FRAMESET = "frameset", e3.H1 = "h1", e3.H2 = "h2", e3.H3 = "h3", e3.H4 = "h4", e3.H5 = "h5", e3.H6 = "h6", e3.HEAD = "head", e3.HEADER = "header", e3.HGROUP = "hgroup", e3.HR = "hr", e3.HTML = "html", e3.I = "i", e3.IMG = "img", e3.IMAGE = "image", e3.INPUT = "input", e3.IFRAME = "iframe", e3.KEYGEN = "keygen", e3.LABEL = "label", e3.LI = "li", e3.LINK = "link", e3.LISTING = "listing", e3.MAIN = "main", e3.MALIGNMARK = "malignmark", e3.MARQUEE = "marquee", e3.MATH = "math", e3.MENU = "menu", e3.META = "meta", e3.MGLYPH = "mglyph", e3.MI = "mi", e3.MO = "mo", e3.MN = "mn", e3.MS = "ms", e3.MTEXT = "mtext", e3.NAV = "nav", e3.NOBR = "nobr", e3.NOFRAMES = "noframes", e3.NOEMBED = "noembed", e3.NOSCRIPT = "noscript", e3.OBJECT = "object", e3.OL = "ol", e3.OPTGROUP = "optgroup", e3.OPTION = "option", e3.P = "p", e3.PARAM = "param", e3.PLAINTEXT = "plaintext", e3.PRE = "pre", e3.RB = "rb", e3.RP = "rp", e3.RT = "rt", e3.RTC = "rtc", e3.RUBY = "ruby", e3.S = "s", e3.SCRIPT = "script", e3.SECTION = "section", e3.SELECT = "select", e3.SOURCE = "source", e3.SMALL = "small", e3.SPAN = "span", e3.STRIKE = "strike", e3.STRONG = "strong", e3.STYLE = "style", e3.SUB = "sub", e3.SUMMARY = "summary", e3.SUP = "sup", e3.TABLE = "table", e3.TBODY = "tbody", e3.TEMPLATE = "template", e3.TEXTAREA = "textarea", e3.TFOOT = "tfoot", e3.TD = "td", e3.TH = "th", e3.THEAD = "thead", e3.TITLE = "title", e3.TR = "tr", e3.TRACK = "track", e3.TT = "tt", e3.U = "u", e3.UL = "ul", e3.SVG = "svg", e3.VAR = "var", e3.WBR = "wbr", e3.XMP = "xmp";
  }(C = C || (C = {})), function(e3) {
    e3[e3.UNKNOWN = 0] = "UNKNOWN", e3[e3.A = 1] = "A", e3[e3.ADDRESS = 2] = "ADDRESS", e3[e3.ANNOTATION_XML = 3] = "ANNOTATION_XML", e3[e3.APPLET = 4] = "APPLET", e3[e3.AREA = 5] = "AREA", e3[e3.ARTICLE = 6] = "ARTICLE", e3[e3.ASIDE = 7] = "ASIDE", e3[e3.B = 8] = "B", e3[e3.BASE = 9] = "BASE", e3[e3.BASEFONT = 10] = "BASEFONT", e3[e3.BGSOUND = 11] = "BGSOUND", e3[e3.BIG = 12] = "BIG", e3[e3.BLOCKQUOTE = 13] = "BLOCKQUOTE", e3[e3.BODY = 14] = "BODY", e3[e3.BR = 15] = "BR", e3[e3.BUTTON = 16] = "BUTTON", e3[e3.CAPTION = 17] = "CAPTION", e3[e3.CENTER = 18] = "CENTER", e3[e3.CODE = 19] = "CODE", e3[e3.COL = 20] = "COL", e3[e3.COLGROUP = 21] = "COLGROUP", e3[e3.DD = 22] = "DD", e3[e3.DESC = 23] = "DESC", e3[e3.DETAILS = 24] = "DETAILS", e3[e3.DIALOG = 25] = "DIALOG", e3[e3.DIR = 26] = "DIR", e3[e3.DIV = 27] = "DIV", e3[e3.DL = 28] = "DL", e3[e3.DT = 29] = "DT", e3[e3.EM = 30] = "EM", e3[e3.EMBED = 31] = "EMBED", e3[e3.FIELDSET = 32] = "FIELDSET", e3[e3.FIGCAPTION = 33] = "FIGCAPTION", e3[e3.FIGURE = 34] = "FIGURE", e3[e3.FONT = 35] = "FONT", e3[e3.FOOTER = 36] = "FOOTER", e3[e3.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e3[e3.FORM = 38] = "FORM", e3[e3.FRAME = 39] = "FRAME", e3[e3.FRAMESET = 40] = "FRAMESET", e3[e3.H1 = 41] = "H1", e3[e3.H2 = 42] = "H2", e3[e3.H3 = 43] = "H3", e3[e3.H4 = 44] = "H4", e3[e3.H5 = 45] = "H5", e3[e3.H6 = 46] = "H6", e3[e3.HEAD = 47] = "HEAD", e3[e3.HEADER = 48] = "HEADER", e3[e3.HGROUP = 49] = "HGROUP", e3[e3.HR = 50] = "HR", e3[e3.HTML = 51] = "HTML", e3[e3.I = 52] = "I", e3[e3.IMG = 53] = "IMG", e3[e3.IMAGE = 54] = "IMAGE", e3[e3.INPUT = 55] = "INPUT", e3[e3.IFRAME = 56] = "IFRAME", e3[e3.KEYGEN = 57] = "KEYGEN", e3[e3.LABEL = 58] = "LABEL", e3[e3.LI = 59] = "LI", e3[e3.LINK = 60] = "LINK", e3[e3.LISTING = 61] = "LISTING", e3[e3.MAIN = 62] = "MAIN", e3[e3.MALIGNMARK = 63] = "MALIGNMARK", e3[e3.MARQUEE = 64] = "MARQUEE", e3[e3.MATH = 65] = "MATH", e3[e3.MENU = 66] = "MENU", e3[e3.META = 67] = "META", e3[e3.MGLYPH = 68] = "MGLYPH", e3[e3.MI = 69] = "MI", e3[e3.MO = 70] = "MO", e3[e3.MN = 71] = "MN", e3[e3.MS = 72] = "MS", e3[e3.MTEXT = 73] = "MTEXT", e3[e3.NAV = 74] = "NAV", e3[e3.NOBR = 75] = "NOBR", e3[e3.NOFRAMES = 76] = "NOFRAMES", e3[e3.NOEMBED = 77] = "NOEMBED", e3[e3.NOSCRIPT = 78] = "NOSCRIPT", e3[e3.OBJECT = 79] = "OBJECT", e3[e3.OL = 80] = "OL", e3[e3.OPTGROUP = 81] = "OPTGROUP", e3[e3.OPTION = 82] = "OPTION", e3[e3.P = 83] = "P", e3[e3.PARAM = 84] = "PARAM", e3[e3.PLAINTEXT = 85] = "PLAINTEXT", e3[e3.PRE = 86] = "PRE", e3[e3.RB = 87] = "RB", e3[e3.RP = 88] = "RP", e3[e3.RT = 89] = "RT", e3[e3.RTC = 90] = "RTC", e3[e3.RUBY = 91] = "RUBY", e3[e3.S = 92] = "S", e3[e3.SCRIPT = 93] = "SCRIPT", e3[e3.SECTION = 94] = "SECTION", e3[e3.SELECT = 95] = "SELECT", e3[e3.SOURCE = 96] = "SOURCE", e3[e3.SMALL = 97] = "SMALL", e3[e3.SPAN = 98] = "SPAN", e3[e3.STRIKE = 99] = "STRIKE", e3[e3.STRONG = 100] = "STRONG", e3[e3.STYLE = 101] = "STYLE", e3[e3.SUB = 102] = "SUB", e3[e3.SUMMARY = 103] = "SUMMARY", e3[e3.SUP = 104] = "SUP", e3[e3.TABLE = 105] = "TABLE", e3[e3.TBODY = 106] = "TBODY", e3[e3.TEMPLATE = 107] = "TEMPLATE", e3[e3.TEXTAREA = 108] = "TEXTAREA", e3[e3.TFOOT = 109] = "TFOOT", e3[e3.TD = 110] = "TD", e3[e3.TH = 111] = "TH", e3[e3.THEAD = 112] = "THEAD", e3[e3.TITLE = 113] = "TITLE", e3[e3.TR = 114] = "TR", e3[e3.TRACK = 115] = "TRACK", e3[e3.TT = 116] = "TT", e3[e3.U = 117] = "U", e3[e3.UL = 118] = "UL", e3[e3.SVG = 119] = "SVG", e3[e3.VAR = 120] = "VAR", e3[e3.WBR = 121] = "WBR", e3[e3.XMP = 122] = "XMP";
  }(S = S || (S = {}));
  const R = /* @__PURE__ */ new Map([[C.A, S.A], [C.ADDRESS, S.ADDRESS], [C.ANNOTATION_XML, S.ANNOTATION_XML], [C.APPLET, S.APPLET], [C.AREA, S.AREA], [C.ARTICLE, S.ARTICLE], [C.ASIDE, S.ASIDE], [C.B, S.B], [C.BASE, S.BASE], [C.BASEFONT, S.BASEFONT], [C.BGSOUND, S.BGSOUND], [C.BIG, S.BIG], [C.BLOCKQUOTE, S.BLOCKQUOTE], [C.BODY, S.BODY], [C.BR, S.BR], [C.BUTTON, S.BUTTON], [C.CAPTION, S.CAPTION], [C.CENTER, S.CENTER], [C.CODE, S.CODE], [C.COL, S.COL], [C.COLGROUP, S.COLGROUP], [C.DD, S.DD], [C.DESC, S.DESC], [C.DETAILS, S.DETAILS], [C.DIALOG, S.DIALOG], [C.DIR, S.DIR], [C.DIV, S.DIV], [C.DL, S.DL], [C.DT, S.DT], [C.EM, S.EM], [C.EMBED, S.EMBED], [C.FIELDSET, S.FIELDSET], [C.FIGCAPTION, S.FIGCAPTION], [C.FIGURE, S.FIGURE], [C.FONT, S.FONT], [C.FOOTER, S.FOOTER], [C.FOREIGN_OBJECT, S.FOREIGN_OBJECT], [C.FORM, S.FORM], [C.FRAME, S.FRAME], [C.FRAMESET, S.FRAMESET], [C.H1, S.H1], [C.H2, S.H2], [C.H3, S.H3], [C.H4, S.H4], [C.H5, S.H5], [C.H6, S.H6], [C.HEAD, S.HEAD], [C.HEADER, S.HEADER], [C.HGROUP, S.HGROUP], [C.HR, S.HR], [C.HTML, S.HTML], [C.I, S.I], [C.IMG, S.IMG], [C.IMAGE, S.IMAGE], [C.INPUT, S.INPUT], [C.IFRAME, S.IFRAME], [C.KEYGEN, S.KEYGEN], [C.LABEL, S.LABEL], [C.LI, S.LI], [C.LINK, S.LINK], [C.LISTING, S.LISTING], [C.MAIN, S.MAIN], [C.MALIGNMARK, S.MALIGNMARK], [C.MARQUEE, S.MARQUEE], [C.MATH, S.MATH], [C.MENU, S.MENU], [C.META, S.META], [C.MGLYPH, S.MGLYPH], [C.MI, S.MI], [C.MO, S.MO], [C.MN, S.MN], [C.MS, S.MS], [C.MTEXT, S.MTEXT], [C.NAV, S.NAV], [C.NOBR, S.NOBR], [C.NOFRAMES, S.NOFRAMES], [C.NOEMBED, S.NOEMBED], [C.NOSCRIPT, S.NOSCRIPT], [C.OBJECT, S.OBJECT], [C.OL, S.OL], [C.OPTGROUP, S.OPTGROUP], [C.OPTION, S.OPTION], [C.P, S.P], [C.PARAM, S.PARAM], [C.PLAINTEXT, S.PLAINTEXT], [C.PRE, S.PRE], [C.RB, S.RB], [C.RP, S.RP], [C.RT, S.RT], [C.RTC, S.RTC], [C.RUBY, S.RUBY], [C.S, S.S], [C.SCRIPT, S.SCRIPT], [C.SECTION, S.SECTION], [C.SELECT, S.SELECT], [C.SOURCE, S.SOURCE], [C.SMALL, S.SMALL], [C.SPAN, S.SPAN], [C.STRIKE, S.STRIKE], [C.STRONG, S.STRONG], [C.STYLE, S.STYLE], [C.SUB, S.SUB], [C.SUMMARY, S.SUMMARY], [C.SUP, S.SUP], [C.TABLE, S.TABLE], [C.TBODY, S.TBODY], [C.TEMPLATE, S.TEMPLATE], [C.TEXTAREA, S.TEXTAREA], [C.TFOOT, S.TFOOT], [C.TD, S.TD], [C.TH, S.TH], [C.THEAD, S.THEAD], [C.TITLE, S.TITLE], [C.TR, S.TR], [C.TRACK, S.TRACK], [C.TT, S.TT], [C.U, S.U], [C.UL, S.UL], [C.SVG, S.SVG], [C.VAR, S.VAR], [C.WBR, S.WBR], [C.XMP, S.XMP]]);
  function O(e3) {
    var t2;
    return null !== (t2 = R.get(e3)) && void 0 !== t2 ? t2 : S.UNKNOWN;
  }
  const f = S, L = { [u.HTML]: /* @__PURE__ */ new Set([f.ADDRESS, f.APPLET, f.AREA, f.ARTICLE, f.ASIDE, f.BASE, f.BASEFONT, f.BGSOUND, f.BLOCKQUOTE, f.BODY, f.BR, f.BUTTON, f.CAPTION, f.CENTER, f.COL, f.COLGROUP, f.DD, f.DETAILS, f.DIR, f.DIV, f.DL, f.DT, f.EMBED, f.FIELDSET, f.FIGCAPTION, f.FIGURE, f.FOOTER, f.FORM, f.FRAME, f.FRAMESET, f.H1, f.H2, f.H3, f.H4, f.H5, f.H6, f.HEAD, f.HEADER, f.HGROUP, f.HR, f.HTML, f.IFRAME, f.IMG, f.INPUT, f.LI, f.LINK, f.LISTING, f.MAIN, f.MARQUEE, f.MENU, f.META, f.NAV, f.NOEMBED, f.NOFRAMES, f.NOSCRIPT, f.OBJECT, f.OL, f.P, f.PARAM, f.PLAINTEXT, f.PRE, f.SCRIPT, f.SECTION, f.SELECT, f.SOURCE, f.STYLE, f.SUMMARY, f.TABLE, f.TBODY, f.TD, f.TEMPLATE, f.TEXTAREA, f.TFOOT, f.TH, f.THEAD, f.TITLE, f.TR, f.TRACK, f.UL, f.WBR, f.XMP]), [u.MATHML]: /* @__PURE__ */ new Set([f.MI, f.MO, f.MN, f.MS, f.MTEXT, f.ANNOTATION_XML]), [u.SVG]: /* @__PURE__ */ new Set([f.TITLE, f.FOREIGN_OBJECT, f.DESC]), [u.XLINK]: /* @__PURE__ */ new Set(), [u.XML]: /* @__PURE__ */ new Set(), [u.XMLNS]: /* @__PURE__ */ new Set() };
  function M(e3) {
    return e3 === f.H1 || e3 === f.H2 || e3 === f.H3 || e3 === f.H4 || e3 === f.H5 || e3 === f.H6;
  }
  /* @__PURE__ */ new Set([C.STYLE, C.SCRIPT, C.XMP, C.IFRAME, C.NOEMBED, C.NOFRAMES, C.PLAINTEXT]);
  const g = /* @__PURE__ */ new Map([[128, 8364], [130, 8218], [131, 402], [132, 8222], [133, 8230], [134, 8224], [135, 8225], [136, 710], [137, 8240], [138, 352], [139, 8249], [140, 338], [142, 381], [145, 8216], [146, 8217], [147, 8220], [148, 8221], [149, 8226], [150, 8211], [151, 8212], [152, 732], [153, 8482], [154, 353], [155, 8250], [156, 339], [158, 382], [159, 376]]);
  var P;
  !function(e3) {
    e3[e3.DATA = 0] = "DATA", e3[e3.RCDATA = 1] = "RCDATA", e3[e3.RAWTEXT = 2] = "RAWTEXT", e3[e3.SCRIPT_DATA = 3] = "SCRIPT_DATA", e3[e3.PLAINTEXT = 4] = "PLAINTEXT", e3[e3.TAG_OPEN = 5] = "TAG_OPEN", e3[e3.END_TAG_OPEN = 6] = "END_TAG_OPEN", e3[e3.TAG_NAME = 7] = "TAG_NAME", e3[e3.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e3[e3.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e3[e3.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e3[e3.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e3[e3.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e3[e3.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e3[e3.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e3[e3.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e3[e3.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e3[e3.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e3[e3.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e3[e3.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e3[e3.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e3[e3.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e3[e3.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e3[e3.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e3[e3.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e3[e3.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e3[e3.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e3[e3.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e3[e3.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e3[e3.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e3[e3.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e3[e3.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e3[e3.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e3[e3.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e3[e3.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e3[e3.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e3[e3.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e3[e3.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e3[e3.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e3[e3.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e3[e3.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e3[e3.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e3[e3.COMMENT_START = 42] = "COMMENT_START", e3[e3.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e3[e3.COMMENT = 44] = "COMMENT", e3[e3.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e3[e3.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e3[e3.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e3[e3.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e3[e3.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e3[e3.COMMENT_END = 50] = "COMMENT_END", e3[e3.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e3[e3.DOCTYPE = 52] = "DOCTYPE", e3[e3.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e3[e3.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e3[e3.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e3[e3.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e3[e3.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e3[e3.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e3[e3.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e3[e3.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e3[e3.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e3[e3.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e3[e3.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e3[e3.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e3[e3.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e3[e3.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e3[e3.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e3[e3.CDATA_SECTION = 68] = "CDATA_SECTION", e3[e3.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e3[e3.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e3[e3.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e3[e3.NAMED_CHARACTER_REFERENCE = 72] = "NAMED_CHARACTER_REFERENCE", e3[e3.AMBIGUOUS_AMPERSAND = 73] = "AMBIGUOUS_AMPERSAND", e3[e3.NUMERIC_CHARACTER_REFERENCE = 74] = "NUMERIC_CHARACTER_REFERENCE", e3[e3.HEXADEMICAL_CHARACTER_REFERENCE_START = 75] = "HEXADEMICAL_CHARACTER_REFERENCE_START", e3[e3.HEXADEMICAL_CHARACTER_REFERENCE = 76] = "HEXADEMICAL_CHARACTER_REFERENCE", e3[e3.DECIMAL_CHARACTER_REFERENCE = 77] = "DECIMAL_CHARACTER_REFERENCE", e3[e3.NUMERIC_CHARACTER_REFERENCE_END = 78] = "NUMERIC_CHARACTER_REFERENCE_END";
  }(P || (P = {}));
  const k = { DATA: P.DATA, RCDATA: P.RCDATA, RAWTEXT: P.RAWTEXT, SCRIPT_DATA: P.SCRIPT_DATA, PLAINTEXT: P.PLAINTEXT, CDATA_SECTION: P.CDATA_SECTION };
  function b(e3) {
    return e3 >= a.DIGIT_0 && e3 <= a.DIGIT_9;
  }
  function B(e3) {
    return e3 >= a.LATIN_CAPITAL_A && e3 <= a.LATIN_CAPITAL_Z;
  }
  function H(e3) {
    return function(e4) {
      return e4 >= a.LATIN_SMALL_A && e4 <= a.LATIN_SMALL_Z;
    }(e3) || B(e3);
  }
  function F(e3) {
    return H(e3) || b(e3);
  }
  function U(e3) {
    return e3 >= a.LATIN_CAPITAL_A && e3 <= a.LATIN_CAPITAL_F;
  }
  function y(e3) {
    return e3 >= a.LATIN_SMALL_A && e3 <= a.LATIN_SMALL_F;
  }
  function G(e3) {
    return e3 + 32;
  }
  function w(e3) {
    return e3 === a.SPACE || e3 === a.LINE_FEED || e3 === a.TABULATION || e3 === a.FORM_FEED;
  }
  function x(e3) {
    return w(e3) || e3 === a.SOLIDUS || e3 === a.GREATER_THAN_SIGN;
  }
  class Y {
    constructor(e3, t2) {
      this.options = e3, this.handler = t2, this.paused = false, this.inLoop = false, this.inForeignNode = false, this.lastStartTagName = "", this.active = false, this.state = P.DATA, this.returnState = P.DATA, this.charRefCode = -1, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new _(t2), this.currentLocation = this.getCurrentLocation(-1);
    }
    _err(e3) {
      var t2, s2;
      null === (s2 = (t2 = this.handler).onParseError) || void 0 === s2 || s2.call(t2, this.preprocessor.getError(e3));
    }
    getCurrentLocation(e3) {
      return this.options.sourceCodeLocationInfo ? { startLine: this.preprocessor.line, startCol: this.preprocessor.col - e3, startOffset: this.preprocessor.offset - e3, endLine: -1, endCol: -1, endOffset: -1 } : null;
    }
    _runParsingLoop() {
      if (!this.inLoop) {
        for (this.inLoop = true; this.active && !this.paused; ) {
          this.consumedAfterSnapshot = 0;
          const e3 = this._consume();
          this._ensureHibernation() || this._callState(e3);
        }
        this.inLoop = false;
      }
    }
    pause() {
      this.paused = true;
    }
    resume(e3) {
      if (!this.paused)
        throw new Error("Parser was already resumed");
      this.paused = false, this.inLoop || (this._runParsingLoop(), this.paused || null == e3 || e3());
    }
    write(e3, t2, s2) {
      this.active = true, this.preprocessor.write(e3, t2), this._runParsingLoop(), this.paused || null == s2 || s2();
    }
    insertHtmlAtCurrentPos(e3) {
      this.active = true, this.preprocessor.insertHtmlAtCurrentPos(e3), this._runParsingLoop();
    }
    _ensureHibernation() {
      return !!this.preprocessor.endOfChunkHit && (this._unconsume(this.consumedAfterSnapshot), this.active = false, true);
    }
    _consume() {
      return this.consumedAfterSnapshot++, this.preprocessor.advance();
    }
    _unconsume(e3) {
      this.consumedAfterSnapshot -= e3, this.preprocessor.retreat(e3);
    }
    _reconsumeInState(e3, t2) {
      this.state = e3, this._callState(t2);
    }
    _advanceBy(e3) {
      this.consumedAfterSnapshot += e3;
      for (let t2 = 0; t2 < e3; t2++)
        this.preprocessor.advance();
    }
    _consumeSequenceIfMatch(e3, t2) {
      return !!this.preprocessor.startsWith(e3, t2) && (this._advanceBy(e3.length - 1), true);
    }
    _createStartTagToken() {
      this.currentToken = { type: h.START_TAG, tagName: "", tagID: S.UNKNOWN, selfClosing: false, ackSelfClosing: false, attrs: [], location: this.getCurrentLocation(1) };
    }
    _createEndTagToken() {
      this.currentToken = { type: h.END_TAG, tagName: "", tagID: S.UNKNOWN, selfClosing: false, ackSelfClosing: false, attrs: [], location: this.getCurrentLocation(2) };
    }
    _createCommentToken(e3) {
      this.currentToken = { type: h.COMMENT, data: "", location: this.getCurrentLocation(e3) };
    }
    _createDoctypeToken(e3) {
      this.currentToken = { type: h.DOCTYPE, name: e3, forceQuirks: false, publicId: null, systemId: null, location: this.currentLocation };
    }
    _createCharacterToken(e3, t2) {
      this.currentCharacterToken = { type: e3, chars: t2, location: this.currentLocation };
    }
    _createAttr(e3) {
      this.currentAttr = { name: e3, value: "" }, this.currentLocation = this.getCurrentLocation(0);
    }
    _leaveAttrName() {
      var e3, t2;
      const s2 = this.currentToken;
      null === A(s2, this.currentAttr.name) ? (s2.attrs.push(this.currentAttr), s2.location && this.currentLocation && ((null !== (e3 = (t2 = s2.location).attrs) && void 0 !== e3 ? e3 : t2.attrs = /* @__PURE__ */ Object.create(null))[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue())) : this._err(T.duplicateAttribute);
    }
    _leaveAttrValue() {
      this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset);
    }
    prepareToken(e3) {
      this._emitCurrentCharacterToken(e3.location), this.currentToken = null, e3.location && (e3.location.endLine = this.preprocessor.line, e3.location.endCol = this.preprocessor.col + 1, e3.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
    }
    emitCurrentTagToken() {
      const e3 = this.currentToken;
      this.prepareToken(e3), e3.tagID = O(e3.tagName), e3.type === h.START_TAG ? (this.lastStartTagName = e3.tagName, this.handler.onStartTag(e3)) : (e3.attrs.length > 0 && this._err(T.endTagWithAttributes), e3.selfClosing && this._err(T.endTagWithTrailingSolidus), this.handler.onEndTag(e3)), this.preprocessor.dropParsedChunk();
    }
    emitCurrentComment(e3) {
      this.prepareToken(e3), this.handler.onComment(e3), this.preprocessor.dropParsedChunk();
    }
    emitCurrentDoctype(e3) {
      this.prepareToken(e3), this.handler.onDoctype(e3), this.preprocessor.dropParsedChunk();
    }
    _emitCurrentCharacterToken(e3) {
      if (this.currentCharacterToken) {
        switch (e3 && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = e3.startLine, this.currentCharacterToken.location.endCol = e3.startCol, this.currentCharacterToken.location.endOffset = e3.startOffset), this.currentCharacterToken.type) {
          case h.CHARACTER:
            this.handler.onCharacter(this.currentCharacterToken);
            break;
          case h.NULL_CHARACTER:
            this.handler.onNullCharacter(this.currentCharacterToken);
            break;
          case h.WHITESPACE_CHARACTER:
            this.handler.onWhitespaceCharacter(this.currentCharacterToken);
        }
        this.currentCharacterToken = null;
      }
    }
    _emitEOFToken() {
      const e3 = this.getCurrentLocation(0);
      e3 && (e3.endLine = e3.startLine, e3.endCol = e3.startCol, e3.endOffset = e3.startOffset), this._emitCurrentCharacterToken(e3), this.handler.onEof({ type: h.EOF, location: e3 }), this.active = false;
    }
    _appendCharToCurrentCharacterToken(e3, t2) {
      if (this.currentCharacterToken) {
        if (this.currentCharacterToken.type === e3)
          return void (this.currentCharacterToken.chars += t2);
        this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
      }
      this._createCharacterToken(e3, t2);
    }
    _emitCodePoint(e3) {
      const t2 = w(e3) ? h.WHITESPACE_CHARACTER : e3 === a.NULL ? h.NULL_CHARACTER : h.CHARACTER;
      this._appendCharToCurrentCharacterToken(t2, String.fromCodePoint(e3));
    }
    _emitChars(e3) {
      this._appendCharToCurrentCharacterToken(h.CHARACTER, e3);
    }
    _matchNamedCharacterReference(e3) {
      let t2 = null, s2 = 0, r2 = false;
      for (let i2 = 0, o2 = m.htmlDecodeTree[0]; i2 >= 0 && (i2 = m.determineBranch(m.htmlDecodeTree, o2, i2 + 1, e3), !(i2 < 0)); e3 = this._consume()) {
        s2 += 1, o2 = m.htmlDecodeTree[i2];
        const c2 = o2 & m.BinTrieFlags.VALUE_LENGTH;
        if (c2) {
          const o3 = (c2 >> 14) - 1;
          if (e3 !== a.SEMICOLON && this._isCharacterReferenceInAttribute() && ((n2 = this.preprocessor.peek(1)) === a.EQUALS_SIGN || F(n2)) ? (t2 = [a.AMPERSAND], i2 += o3) : (t2 = 0 === o3 ? [m.htmlDecodeTree[i2] & ~m.BinTrieFlags.VALUE_LENGTH] : 1 === o3 ? [m.htmlDecodeTree[++i2]] : [m.htmlDecodeTree[++i2], m.htmlDecodeTree[++i2]], s2 = 0, r2 = e3 !== a.SEMICOLON), 0 === o3) {
            this._consume();
            break;
          }
        }
      }
      var n2;
      return this._unconsume(s2), r2 && !this.preprocessor.endOfChunkHit && this._err(T.missingSemicolonAfterCharacterReference), this._unconsume(1), t2;
    }
    _isCharacterReferenceInAttribute() {
      return this.returnState === P.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === P.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === P.ATTRIBUTE_VALUE_UNQUOTED;
    }
    _flushCodePointConsumedAsCharacterReference(e3) {
      this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(e3) : this._emitCodePoint(e3);
    }
    _callState(e3) {
      switch (this.state) {
        case P.DATA:
          this._stateData(e3);
          break;
        case P.RCDATA:
          this._stateRcdata(e3);
          break;
        case P.RAWTEXT:
          this._stateRawtext(e3);
          break;
        case P.SCRIPT_DATA:
          this._stateScriptData(e3);
          break;
        case P.PLAINTEXT:
          this._statePlaintext(e3);
          break;
        case P.TAG_OPEN:
          this._stateTagOpen(e3);
          break;
        case P.END_TAG_OPEN:
          this._stateEndTagOpen(e3);
          break;
        case P.TAG_NAME:
          this._stateTagName(e3);
          break;
        case P.RCDATA_LESS_THAN_SIGN:
          this._stateRcdataLessThanSign(e3);
          break;
        case P.RCDATA_END_TAG_OPEN:
          this._stateRcdataEndTagOpen(e3);
          break;
        case P.RCDATA_END_TAG_NAME:
          this._stateRcdataEndTagName(e3);
          break;
        case P.RAWTEXT_LESS_THAN_SIGN:
          this._stateRawtextLessThanSign(e3);
          break;
        case P.RAWTEXT_END_TAG_OPEN:
          this._stateRawtextEndTagOpen(e3);
          break;
        case P.RAWTEXT_END_TAG_NAME:
          this._stateRawtextEndTagName(e3);
          break;
        case P.SCRIPT_DATA_LESS_THAN_SIGN:
          this._stateScriptDataLessThanSign(e3);
          break;
        case P.SCRIPT_DATA_END_TAG_OPEN:
          this._stateScriptDataEndTagOpen(e3);
          break;
        case P.SCRIPT_DATA_END_TAG_NAME:
          this._stateScriptDataEndTagName(e3);
          break;
        case P.SCRIPT_DATA_ESCAPE_START:
          this._stateScriptDataEscapeStart(e3);
          break;
        case P.SCRIPT_DATA_ESCAPE_START_DASH:
          this._stateScriptDataEscapeStartDash(e3);
          break;
        case P.SCRIPT_DATA_ESCAPED:
          this._stateScriptDataEscaped(e3);
          break;
        case P.SCRIPT_DATA_ESCAPED_DASH:
          this._stateScriptDataEscapedDash(e3);
          break;
        case P.SCRIPT_DATA_ESCAPED_DASH_DASH:
          this._stateScriptDataEscapedDashDash(e3);
          break;
        case P.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
          this._stateScriptDataEscapedLessThanSign(e3);
          break;
        case P.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
          this._stateScriptDataEscapedEndTagOpen(e3);
          break;
        case P.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
          this._stateScriptDataEscapedEndTagName(e3);
          break;
        case P.SCRIPT_DATA_DOUBLE_ESCAPE_START:
          this._stateScriptDataDoubleEscapeStart(e3);
          break;
        case P.SCRIPT_DATA_DOUBLE_ESCAPED:
          this._stateScriptDataDoubleEscaped(e3);
          break;
        case P.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:
          this._stateScriptDataDoubleEscapedDash(e3);
          break;
        case P.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:
          this._stateScriptDataDoubleEscapedDashDash(e3);
          break;
        case P.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:
          this._stateScriptDataDoubleEscapedLessThanSign(e3);
          break;
        case P.SCRIPT_DATA_DOUBLE_ESCAPE_END:
          this._stateScriptDataDoubleEscapeEnd(e3);
          break;
        case P.BEFORE_ATTRIBUTE_NAME:
          this._stateBeforeAttributeName(e3);
          break;
        case P.ATTRIBUTE_NAME:
          this._stateAttributeName(e3);
          break;
        case P.AFTER_ATTRIBUTE_NAME:
          this._stateAfterAttributeName(e3);
          break;
        case P.BEFORE_ATTRIBUTE_VALUE:
          this._stateBeforeAttributeValue(e3);
          break;
        case P.ATTRIBUTE_VALUE_DOUBLE_QUOTED:
          this._stateAttributeValueDoubleQuoted(e3);
          break;
        case P.ATTRIBUTE_VALUE_SINGLE_QUOTED:
          this._stateAttributeValueSingleQuoted(e3);
          break;
        case P.ATTRIBUTE_VALUE_UNQUOTED:
          this._stateAttributeValueUnquoted(e3);
          break;
        case P.AFTER_ATTRIBUTE_VALUE_QUOTED:
          this._stateAfterAttributeValueQuoted(e3);
          break;
        case P.SELF_CLOSING_START_TAG:
          this._stateSelfClosingStartTag(e3);
          break;
        case P.BOGUS_COMMENT:
          this._stateBogusComment(e3);
          break;
        case P.MARKUP_DECLARATION_OPEN:
          this._stateMarkupDeclarationOpen(e3);
          break;
        case P.COMMENT_START:
          this._stateCommentStart(e3);
          break;
        case P.COMMENT_START_DASH:
          this._stateCommentStartDash(e3);
          break;
        case P.COMMENT:
          this._stateComment(e3);
          break;
        case P.COMMENT_LESS_THAN_SIGN:
          this._stateCommentLessThanSign(e3);
          break;
        case P.COMMENT_LESS_THAN_SIGN_BANG:
          this._stateCommentLessThanSignBang(e3);
          break;
        case P.COMMENT_LESS_THAN_SIGN_BANG_DASH:
          this._stateCommentLessThanSignBangDash(e3);
          break;
        case P.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:
          this._stateCommentLessThanSignBangDashDash(e3);
          break;
        case P.COMMENT_END_DASH:
          this._stateCommentEndDash(e3);
          break;
        case P.COMMENT_END:
          this._stateCommentEnd(e3);
          break;
        case P.COMMENT_END_BANG:
          this._stateCommentEndBang(e3);
          break;
        case P.DOCTYPE:
          this._stateDoctype(e3);
          break;
        case P.BEFORE_DOCTYPE_NAME:
          this._stateBeforeDoctypeName(e3);
          break;
        case P.DOCTYPE_NAME:
          this._stateDoctypeName(e3);
          break;
        case P.AFTER_DOCTYPE_NAME:
          this._stateAfterDoctypeName(e3);
          break;
        case P.AFTER_DOCTYPE_PUBLIC_KEYWORD:
          this._stateAfterDoctypePublicKeyword(e3);
          break;
        case P.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:
          this._stateBeforeDoctypePublicIdentifier(e3);
          break;
        case P.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:
          this._stateDoctypePublicIdentifierDoubleQuoted(e3);
          break;
        case P.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:
          this._stateDoctypePublicIdentifierSingleQuoted(e3);
          break;
        case P.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:
          this._stateAfterDoctypePublicIdentifier(e3);
          break;
        case P.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:
          this._stateBetweenDoctypePublicAndSystemIdentifiers(e3);
          break;
        case P.AFTER_DOCTYPE_SYSTEM_KEYWORD:
          this._stateAfterDoctypeSystemKeyword(e3);
          break;
        case P.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:
          this._stateBeforeDoctypeSystemIdentifier(e3);
          break;
        case P.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:
          this._stateDoctypeSystemIdentifierDoubleQuoted(e3);
          break;
        case P.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:
          this._stateDoctypeSystemIdentifierSingleQuoted(e3);
          break;
        case P.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:
          this._stateAfterDoctypeSystemIdentifier(e3);
          break;
        case P.BOGUS_DOCTYPE:
          this._stateBogusDoctype(e3);
          break;
        case P.CDATA_SECTION:
          this._stateCdataSection(e3);
          break;
        case P.CDATA_SECTION_BRACKET:
          this._stateCdataSectionBracket(e3);
          break;
        case P.CDATA_SECTION_END:
          this._stateCdataSectionEnd(e3);
          break;
        case P.CHARACTER_REFERENCE:
          this._stateCharacterReference(e3);
          break;
        case P.NAMED_CHARACTER_REFERENCE:
          this._stateNamedCharacterReference(e3);
          break;
        case P.AMBIGUOUS_AMPERSAND:
          this._stateAmbiguousAmpersand(e3);
          break;
        case P.NUMERIC_CHARACTER_REFERENCE:
          this._stateNumericCharacterReference(e3);
          break;
        case P.HEXADEMICAL_CHARACTER_REFERENCE_START:
          this._stateHexademicalCharacterReferenceStart(e3);
          break;
        case P.HEXADEMICAL_CHARACTER_REFERENCE:
          this._stateHexademicalCharacterReference(e3);
          break;
        case P.DECIMAL_CHARACTER_REFERENCE:
          this._stateDecimalCharacterReference(e3);
          break;
        case P.NUMERIC_CHARACTER_REFERENCE_END:
          this._stateNumericCharacterReferenceEnd(e3);
          break;
        default:
          throw new Error("Unknown state");
      }
    }
    _stateData(e3) {
      switch (e3) {
        case a.LESS_THAN_SIGN:
          this.state = P.TAG_OPEN;
          break;
        case a.AMPERSAND:
          this.returnState = P.DATA, this.state = P.CHARACTER_REFERENCE;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this._emitCodePoint(e3);
          break;
        case a.EOF:
          this._emitEOFToken();
          break;
        default:
          this._emitCodePoint(e3);
      }
    }
    _stateRcdata(e3) {
      switch (e3) {
        case a.AMPERSAND:
          this.returnState = P.RCDATA, this.state = P.CHARACTER_REFERENCE;
          break;
        case a.LESS_THAN_SIGN:
          this.state = P.RCDATA_LESS_THAN_SIGN;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this._emitChars(s);
          break;
        case a.EOF:
          this._emitEOFToken();
          break;
        default:
          this._emitCodePoint(e3);
      }
    }
    _stateRawtext(e3) {
      switch (e3) {
        case a.LESS_THAN_SIGN:
          this.state = P.RAWTEXT_LESS_THAN_SIGN;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this._emitChars(s);
          break;
        case a.EOF:
          this._emitEOFToken();
          break;
        default:
          this._emitCodePoint(e3);
      }
    }
    _stateScriptData(e3) {
      switch (e3) {
        case a.LESS_THAN_SIGN:
          this.state = P.SCRIPT_DATA_LESS_THAN_SIGN;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this._emitChars(s);
          break;
        case a.EOF:
          this._emitEOFToken();
          break;
        default:
          this._emitCodePoint(e3);
      }
    }
    _statePlaintext(e3) {
      switch (e3) {
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this._emitChars(s);
          break;
        case a.EOF:
          this._emitEOFToken();
          break;
        default:
          this._emitCodePoint(e3);
      }
    }
    _stateTagOpen(e3) {
      if (H(e3))
        this._createStartTagToken(), this.state = P.TAG_NAME, this._stateTagName(e3);
      else
        switch (e3) {
          case a.EXCLAMATION_MARK:
            this.state = P.MARKUP_DECLARATION_OPEN;
            break;
          case a.SOLIDUS:
            this.state = P.END_TAG_OPEN;
            break;
          case a.QUESTION_MARK:
            this._err(T.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = P.BOGUS_COMMENT, this._stateBogusComment(e3);
            break;
          case a.EOF:
            this._err(T.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
            break;
          default:
            this._err(T.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = P.DATA, this._stateData(e3);
        }
    }
    _stateEndTagOpen(e3) {
      if (H(e3))
        this._createEndTagToken(), this.state = P.TAG_NAME, this._stateTagName(e3);
      else
        switch (e3) {
          case a.GREATER_THAN_SIGN:
            this._err(T.missingEndTagName), this.state = P.DATA;
            break;
          case a.EOF:
            this._err(T.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
            break;
          default:
            this._err(T.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = P.BOGUS_COMMENT, this._stateBogusComment(e3);
        }
    }
    _stateTagName(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          this.state = P.BEFORE_ATTRIBUTE_NAME;
          break;
        case a.SOLIDUS:
          this.state = P.SELF_CLOSING_START_TAG;
          break;
        case a.GREATER_THAN_SIGN:
          this.state = P.DATA, this.emitCurrentTagToken();
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), t2.tagName += s;
          break;
        case a.EOF:
          this._err(T.eofInTag), this._emitEOFToken();
          break;
        default:
          t2.tagName += String.fromCodePoint(B(e3) ? G(e3) : e3);
      }
    }
    _stateRcdataLessThanSign(e3) {
      e3 === a.SOLIDUS ? this.state = P.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = P.RCDATA, this._stateRcdata(e3));
    }
    _stateRcdataEndTagOpen(e3) {
      H(e3) ? (this.state = P.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(e3)) : (this._emitChars("</"), this.state = P.RCDATA, this._stateRcdata(e3));
    }
    handleSpecialEndTag(e3) {
      if (!this.preprocessor.startsWith(this.lastStartTagName, false))
        return !this._ensureHibernation();
      switch (this._createEndTagToken(), this.currentToken.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          return this._advanceBy(this.lastStartTagName.length), this.state = P.BEFORE_ATTRIBUTE_NAME, false;
        case a.SOLIDUS:
          return this._advanceBy(this.lastStartTagName.length), this.state = P.SELF_CLOSING_START_TAG, false;
        case a.GREATER_THAN_SIGN:
          return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = P.DATA, false;
        default:
          return !this._ensureHibernation();
      }
    }
    _stateRcdataEndTagName(e3) {
      this.handleSpecialEndTag(e3) && (this._emitChars("</"), this.state = P.RCDATA, this._stateRcdata(e3));
    }
    _stateRawtextLessThanSign(e3) {
      e3 === a.SOLIDUS ? this.state = P.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = P.RAWTEXT, this._stateRawtext(e3));
    }
    _stateRawtextEndTagOpen(e3) {
      H(e3) ? (this.state = P.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(e3)) : (this._emitChars("</"), this.state = P.RAWTEXT, this._stateRawtext(e3));
    }
    _stateRawtextEndTagName(e3) {
      this.handleSpecialEndTag(e3) && (this._emitChars("</"), this.state = P.RAWTEXT, this._stateRawtext(e3));
    }
    _stateScriptDataLessThanSign(e3) {
      switch (e3) {
        case a.SOLIDUS:
          this.state = P.SCRIPT_DATA_END_TAG_OPEN;
          break;
        case a.EXCLAMATION_MARK:
          this.state = P.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
          break;
        default:
          this._emitChars("<"), this.state = P.SCRIPT_DATA, this._stateScriptData(e3);
      }
    }
    _stateScriptDataEndTagOpen(e3) {
      H(e3) ? (this.state = P.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(e3)) : (this._emitChars("</"), this.state = P.SCRIPT_DATA, this._stateScriptData(e3));
    }
    _stateScriptDataEndTagName(e3) {
      this.handleSpecialEndTag(e3) && (this._emitChars("</"), this.state = P.SCRIPT_DATA, this._stateScriptData(e3));
    }
    _stateScriptDataEscapeStart(e3) {
      e3 === a.HYPHEN_MINUS ? (this.state = P.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = P.SCRIPT_DATA, this._stateScriptData(e3));
    }
    _stateScriptDataEscapeStartDash(e3) {
      e3 === a.HYPHEN_MINUS ? (this.state = P.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = P.SCRIPT_DATA, this._stateScriptData(e3));
    }
    _stateScriptDataEscaped(e3) {
      switch (e3) {
        case a.HYPHEN_MINUS:
          this.state = P.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
          break;
        case a.LESS_THAN_SIGN:
          this.state = P.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this._emitChars(s);
          break;
        case a.EOF:
          this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        default:
          this._emitCodePoint(e3);
      }
    }
    _stateScriptDataEscapedDash(e3) {
      switch (e3) {
        case a.HYPHEN_MINUS:
          this.state = P.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
          break;
        case a.LESS_THAN_SIGN:
          this.state = P.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this.state = P.SCRIPT_DATA_ESCAPED, this._emitChars(s);
          break;
        case a.EOF:
          this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        default:
          this.state = P.SCRIPT_DATA_ESCAPED, this._emitCodePoint(e3);
      }
    }
    _stateScriptDataEscapedDashDash(e3) {
      switch (e3) {
        case a.HYPHEN_MINUS:
          this._emitChars("-");
          break;
        case a.LESS_THAN_SIGN:
          this.state = P.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        case a.GREATER_THAN_SIGN:
          this.state = P.SCRIPT_DATA, this._emitChars(">");
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this.state = P.SCRIPT_DATA_ESCAPED, this._emitChars(s);
          break;
        case a.EOF:
          this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        default:
          this.state = P.SCRIPT_DATA_ESCAPED, this._emitCodePoint(e3);
      }
    }
    _stateScriptDataEscapedLessThanSign(e3) {
      e3 === a.SOLIDUS ? this.state = P.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : H(e3) ? (this._emitChars("<"), this.state = P.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(e3)) : (this._emitChars("<"), this.state = P.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e3));
    }
    _stateScriptDataEscapedEndTagOpen(e3) {
      H(e3) ? (this.state = P.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(e3)) : (this._emitChars("</"), this.state = P.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e3));
    }
    _stateScriptDataEscapedEndTagName(e3) {
      this.handleSpecialEndTag(e3) && (this._emitChars("</"), this.state = P.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e3));
    }
    _stateScriptDataDoubleEscapeStart(e3) {
      if (this.preprocessor.startsWith(i, false) && x(this.preprocessor.peek(6))) {
        this._emitCodePoint(e3);
        for (let e4 = 0; e4 < 6; e4++)
          this._emitCodePoint(this._consume());
        this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED;
      } else
        this._ensureHibernation() || (this.state = P.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e3));
    }
    _stateScriptDataDoubleEscaped(e3) {
      switch (e3) {
        case a.HYPHEN_MINUS:
          this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
          break;
        case a.LESS_THAN_SIGN:
          this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this._emitChars(s);
          break;
        case a.EOF:
          this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        default:
          this._emitCodePoint(e3);
      }
    }
    _stateScriptDataDoubleEscapedDash(e3) {
      switch (e3) {
        case a.HYPHEN_MINUS:
          this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
          break;
        case a.LESS_THAN_SIGN:
          this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(s);
          break;
        case a.EOF:
          this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        default:
          this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(e3);
      }
    }
    _stateScriptDataDoubleEscapedDashDash(e3) {
      switch (e3) {
        case a.HYPHEN_MINUS:
          this._emitChars("-");
          break;
        case a.LESS_THAN_SIGN:
          this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
          break;
        case a.GREATER_THAN_SIGN:
          this.state = P.SCRIPT_DATA, this._emitChars(">");
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(s);
          break;
        case a.EOF:
          this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        default:
          this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(e3);
      }
    }
    _stateScriptDataDoubleEscapedLessThanSign(e3) {
      e3 === a.SOLIDUS ? (this.state = P.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(e3));
    }
    _stateScriptDataDoubleEscapeEnd(e3) {
      if (this.preprocessor.startsWith(i, false) && x(this.preprocessor.peek(6))) {
        this._emitCodePoint(e3);
        for (let e4 = 0; e4 < 6; e4++)
          this._emitCodePoint(this._consume());
        this.state = P.SCRIPT_DATA_ESCAPED;
      } else
        this._ensureHibernation() || (this.state = P.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(e3));
    }
    _stateBeforeAttributeName(e3) {
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          break;
        case a.SOLIDUS:
        case a.GREATER_THAN_SIGN:
        case a.EOF:
          this.state = P.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(e3);
          break;
        case a.EQUALS_SIGN:
          this._err(T.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = P.ATTRIBUTE_NAME;
          break;
        default:
          this._createAttr(""), this.state = P.ATTRIBUTE_NAME, this._stateAttributeName(e3);
      }
    }
    _stateAttributeName(e3) {
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
        case a.SOLIDUS:
        case a.GREATER_THAN_SIGN:
        case a.EOF:
          this._leaveAttrName(), this.state = P.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(e3);
          break;
        case a.EQUALS_SIGN:
          this._leaveAttrName(), this.state = P.BEFORE_ATTRIBUTE_VALUE;
          break;
        case a.QUOTATION_MARK:
        case a.APOSTROPHE:
        case a.LESS_THAN_SIGN:
          this._err(T.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(e3);
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this.currentAttr.name += s;
          break;
        default:
          this.currentAttr.name += String.fromCodePoint(B(e3) ? G(e3) : e3);
      }
    }
    _stateAfterAttributeName(e3) {
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          break;
        case a.SOLIDUS:
          this.state = P.SELF_CLOSING_START_TAG;
          break;
        case a.EQUALS_SIGN:
          this.state = P.BEFORE_ATTRIBUTE_VALUE;
          break;
        case a.GREATER_THAN_SIGN:
          this.state = P.DATA, this.emitCurrentTagToken();
          break;
        case a.EOF:
          this._err(T.eofInTag), this._emitEOFToken();
          break;
        default:
          this._createAttr(""), this.state = P.ATTRIBUTE_NAME, this._stateAttributeName(e3);
      }
    }
    _stateBeforeAttributeValue(e3) {
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          break;
        case a.QUOTATION_MARK:
          this.state = P.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
          break;
        case a.APOSTROPHE:
          this.state = P.ATTRIBUTE_VALUE_SINGLE_QUOTED;
          break;
        case a.GREATER_THAN_SIGN:
          this._err(T.missingAttributeValue), this.state = P.DATA, this.emitCurrentTagToken();
          break;
        default:
          this.state = P.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(e3);
      }
    }
    _stateAttributeValueDoubleQuoted(e3) {
      switch (e3) {
        case a.QUOTATION_MARK:
          this.state = P.AFTER_ATTRIBUTE_VALUE_QUOTED;
          break;
        case a.AMPERSAND:
          this.returnState = P.ATTRIBUTE_VALUE_DOUBLE_QUOTED, this.state = P.CHARACTER_REFERENCE;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this.currentAttr.value += s;
          break;
        case a.EOF:
          this._err(T.eofInTag), this._emitEOFToken();
          break;
        default:
          this.currentAttr.value += String.fromCodePoint(e3);
      }
    }
    _stateAttributeValueSingleQuoted(e3) {
      switch (e3) {
        case a.APOSTROPHE:
          this.state = P.AFTER_ATTRIBUTE_VALUE_QUOTED;
          break;
        case a.AMPERSAND:
          this.returnState = P.ATTRIBUTE_VALUE_SINGLE_QUOTED, this.state = P.CHARACTER_REFERENCE;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this.currentAttr.value += s;
          break;
        case a.EOF:
          this._err(T.eofInTag), this._emitEOFToken();
          break;
        default:
          this.currentAttr.value += String.fromCodePoint(e3);
      }
    }
    _stateAttributeValueUnquoted(e3) {
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          this._leaveAttrValue(), this.state = P.BEFORE_ATTRIBUTE_NAME;
          break;
        case a.AMPERSAND:
          this.returnState = P.ATTRIBUTE_VALUE_UNQUOTED, this.state = P.CHARACTER_REFERENCE;
          break;
        case a.GREATER_THAN_SIGN:
          this._leaveAttrValue(), this.state = P.DATA, this.emitCurrentTagToken();
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), this.currentAttr.value += s;
          break;
        case a.QUOTATION_MARK:
        case a.APOSTROPHE:
        case a.LESS_THAN_SIGN:
        case a.EQUALS_SIGN:
        case a.GRAVE_ACCENT:
          this._err(T.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(e3);
          break;
        case a.EOF:
          this._err(T.eofInTag), this._emitEOFToken();
          break;
        default:
          this.currentAttr.value += String.fromCodePoint(e3);
      }
    }
    _stateAfterAttributeValueQuoted(e3) {
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          this._leaveAttrValue(), this.state = P.BEFORE_ATTRIBUTE_NAME;
          break;
        case a.SOLIDUS:
          this._leaveAttrValue(), this.state = P.SELF_CLOSING_START_TAG;
          break;
        case a.GREATER_THAN_SIGN:
          this._leaveAttrValue(), this.state = P.DATA, this.emitCurrentTagToken();
          break;
        case a.EOF:
          this._err(T.eofInTag), this._emitEOFToken();
          break;
        default:
          this._err(T.missingWhitespaceBetweenAttributes), this.state = P.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(e3);
      }
    }
    _stateSelfClosingStartTag(e3) {
      switch (e3) {
        case a.GREATER_THAN_SIGN:
          this.currentToken.selfClosing = true, this.state = P.DATA, this.emitCurrentTagToken();
          break;
        case a.EOF:
          this._err(T.eofInTag), this._emitEOFToken();
          break;
        default:
          this._err(T.unexpectedSolidusInTag), this.state = P.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(e3);
      }
    }
    _stateBogusComment(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.GREATER_THAN_SIGN:
          this.state = P.DATA, this.emitCurrentComment(t2);
          break;
        case a.EOF:
          this.emitCurrentComment(t2), this._emitEOFToken();
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), t2.data += s;
          break;
        default:
          t2.data += String.fromCodePoint(e3);
      }
    }
    _stateMarkupDeclarationOpen(e3) {
      this._consumeSequenceIfMatch("--", true) ? (this._createCommentToken(3), this.state = P.COMMENT_START) : this._consumeSequenceIfMatch(n, false) ? (this.currentLocation = this.getCurrentLocation(8), this.state = P.DOCTYPE) : this._consumeSequenceIfMatch(r, true) ? this.inForeignNode ? this.state = P.CDATA_SECTION : (this._err(T.cdataInHtmlContent), this._createCommentToken(8), this.currentToken.data = "[CDATA[", this.state = P.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(T.incorrectlyOpenedComment), this._createCommentToken(2), this.state = P.BOGUS_COMMENT, this._stateBogusComment(e3));
    }
    _stateCommentStart(e3) {
      switch (e3) {
        case a.HYPHEN_MINUS:
          this.state = P.COMMENT_START_DASH;
          break;
        case a.GREATER_THAN_SIGN: {
          this._err(T.abruptClosingOfEmptyComment), this.state = P.DATA;
          const e4 = this.currentToken;
          this.emitCurrentComment(e4);
          break;
        }
        default:
          this.state = P.COMMENT, this._stateComment(e3);
      }
    }
    _stateCommentStartDash(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.HYPHEN_MINUS:
          this.state = P.COMMENT_END;
          break;
        case a.GREATER_THAN_SIGN:
          this._err(T.abruptClosingOfEmptyComment), this.state = P.DATA, this.emitCurrentComment(t2);
          break;
        case a.EOF:
          this._err(T.eofInComment), this.emitCurrentComment(t2), this._emitEOFToken();
          break;
        default:
          t2.data += "-", this.state = P.COMMENT, this._stateComment(e3);
      }
    }
    _stateComment(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.HYPHEN_MINUS:
          this.state = P.COMMENT_END_DASH;
          break;
        case a.LESS_THAN_SIGN:
          t2.data += "<", this.state = P.COMMENT_LESS_THAN_SIGN;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), t2.data += s;
          break;
        case a.EOF:
          this._err(T.eofInComment), this.emitCurrentComment(t2), this._emitEOFToken();
          break;
        default:
          t2.data += String.fromCodePoint(e3);
      }
    }
    _stateCommentLessThanSign(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.EXCLAMATION_MARK:
          t2.data += "!", this.state = P.COMMENT_LESS_THAN_SIGN_BANG;
          break;
        case a.LESS_THAN_SIGN:
          t2.data += "<";
          break;
        default:
          this.state = P.COMMENT, this._stateComment(e3);
      }
    }
    _stateCommentLessThanSignBang(e3) {
      e3 === a.HYPHEN_MINUS ? this.state = P.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = P.COMMENT, this._stateComment(e3));
    }
    _stateCommentLessThanSignBangDash(e3) {
      e3 === a.HYPHEN_MINUS ? this.state = P.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = P.COMMENT_END_DASH, this._stateCommentEndDash(e3));
    }
    _stateCommentLessThanSignBangDashDash(e3) {
      e3 !== a.GREATER_THAN_SIGN && e3 !== a.EOF && this._err(T.nestedComment), this.state = P.COMMENT_END, this._stateCommentEnd(e3);
    }
    _stateCommentEndDash(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.HYPHEN_MINUS:
          this.state = P.COMMENT_END;
          break;
        case a.EOF:
          this._err(T.eofInComment), this.emitCurrentComment(t2), this._emitEOFToken();
          break;
        default:
          t2.data += "-", this.state = P.COMMENT, this._stateComment(e3);
      }
    }
    _stateCommentEnd(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.GREATER_THAN_SIGN:
          this.state = P.DATA, this.emitCurrentComment(t2);
          break;
        case a.EXCLAMATION_MARK:
          this.state = P.COMMENT_END_BANG;
          break;
        case a.HYPHEN_MINUS:
          t2.data += "-";
          break;
        case a.EOF:
          this._err(T.eofInComment), this.emitCurrentComment(t2), this._emitEOFToken();
          break;
        default:
          t2.data += "--", this.state = P.COMMENT, this._stateComment(e3);
      }
    }
    _stateCommentEndBang(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.HYPHEN_MINUS:
          t2.data += "--!", this.state = P.COMMENT_END_DASH;
          break;
        case a.GREATER_THAN_SIGN:
          this._err(T.incorrectlyClosedComment), this.state = P.DATA, this.emitCurrentComment(t2);
          break;
        case a.EOF:
          this._err(T.eofInComment), this.emitCurrentComment(t2), this._emitEOFToken();
          break;
        default:
          t2.data += "--!", this.state = P.COMMENT, this._stateComment(e3);
      }
    }
    _stateDoctype(e3) {
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          this.state = P.BEFORE_DOCTYPE_NAME;
          break;
        case a.GREATER_THAN_SIGN:
          this.state = P.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(e3);
          break;
        case a.EOF: {
          this._err(T.eofInDoctype), this._createDoctypeToken(null);
          const e4 = this.currentToken;
          e4.forceQuirks = true, this.emitCurrentDoctype(e4), this._emitEOFToken();
          break;
        }
        default:
          this._err(T.missingWhitespaceBeforeDoctypeName), this.state = P.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(e3);
      }
    }
    _stateBeforeDoctypeName(e3) {
      if (B(e3))
        this._createDoctypeToken(String.fromCharCode(G(e3))), this.state = P.DOCTYPE_NAME;
      else
        switch (e3) {
          case a.SPACE:
          case a.LINE_FEED:
          case a.TABULATION:
          case a.FORM_FEED:
            break;
          case a.NULL:
            this._err(T.unexpectedNullCharacter), this._createDoctypeToken(s), this.state = P.DOCTYPE_NAME;
            break;
          case a.GREATER_THAN_SIGN: {
            this._err(T.missingDoctypeName), this._createDoctypeToken(null);
            const e4 = this.currentToken;
            e4.forceQuirks = true, this.emitCurrentDoctype(e4), this.state = P.DATA;
            break;
          }
          case a.EOF: {
            this._err(T.eofInDoctype), this._createDoctypeToken(null);
            const e4 = this.currentToken;
            e4.forceQuirks = true, this.emitCurrentDoctype(e4), this._emitEOFToken();
            break;
          }
          default:
            this._createDoctypeToken(String.fromCodePoint(e3)), this.state = P.DOCTYPE_NAME;
        }
    }
    _stateDoctypeName(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          this.state = P.AFTER_DOCTYPE_NAME;
          break;
        case a.GREATER_THAN_SIGN:
          this.state = P.DATA, this.emitCurrentDoctype(t2);
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), t2.name += s;
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          t2.name += String.fromCodePoint(B(e3) ? G(e3) : e3);
      }
    }
    _stateAfterDoctypeName(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          break;
        case a.GREATER_THAN_SIGN:
          this.state = P.DATA, this.emitCurrentDoctype(t2);
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          this._consumeSequenceIfMatch("public", false) ? this.state = P.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch("system", false) ? this.state = P.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(T.invalidCharacterSequenceAfterDoctypeName), t2.forceQuirks = true, this.state = P.BOGUS_DOCTYPE, this._stateBogusDoctype(e3));
      }
    }
    _stateAfterDoctypePublicKeyword(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          this.state = P.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        case a.QUOTATION_MARK:
          this._err(T.missingWhitespaceAfterDoctypePublicKeyword), t2.publicId = "", this.state = P.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
          break;
        case a.APOSTROPHE:
          this._err(T.missingWhitespaceAfterDoctypePublicKeyword), t2.publicId = "", this.state = P.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
          break;
        case a.GREATER_THAN_SIGN:
          this._err(T.missingDoctypePublicIdentifier), t2.forceQuirks = true, this.state = P.DATA, this.emitCurrentDoctype(t2);
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          this._err(T.missingQuoteBeforeDoctypePublicIdentifier), t2.forceQuirks = true, this.state = P.BOGUS_DOCTYPE, this._stateBogusDoctype(e3);
      }
    }
    _stateBeforeDoctypePublicIdentifier(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          break;
        case a.QUOTATION_MARK:
          t2.publicId = "", this.state = P.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
          break;
        case a.APOSTROPHE:
          t2.publicId = "", this.state = P.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
          break;
        case a.GREATER_THAN_SIGN:
          this._err(T.missingDoctypePublicIdentifier), t2.forceQuirks = true, this.state = P.DATA, this.emitCurrentDoctype(t2);
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          this._err(T.missingQuoteBeforeDoctypePublicIdentifier), t2.forceQuirks = true, this.state = P.BOGUS_DOCTYPE, this._stateBogusDoctype(e3);
      }
    }
    _stateDoctypePublicIdentifierDoubleQuoted(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.QUOTATION_MARK:
          this.state = P.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), t2.publicId += s;
          break;
        case a.GREATER_THAN_SIGN:
          this._err(T.abruptDoctypePublicIdentifier), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this.state = P.DATA;
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          t2.publicId += String.fromCodePoint(e3);
      }
    }
    _stateDoctypePublicIdentifierSingleQuoted(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.APOSTROPHE:
          this.state = P.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), t2.publicId += s;
          break;
        case a.GREATER_THAN_SIGN:
          this._err(T.abruptDoctypePublicIdentifier), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this.state = P.DATA;
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          t2.publicId += String.fromCodePoint(e3);
      }
    }
    _stateAfterDoctypePublicIdentifier(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          this.state = P.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
          break;
        case a.GREATER_THAN_SIGN:
          this.state = P.DATA, this.emitCurrentDoctype(t2);
          break;
        case a.QUOTATION_MARK:
          this._err(T.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), t2.systemId = "", this.state = P.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        case a.APOSTROPHE:
          this._err(T.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), t2.systemId = "", this.state = P.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), t2.forceQuirks = true, this.state = P.BOGUS_DOCTYPE, this._stateBogusDoctype(e3);
      }
    }
    _stateBetweenDoctypePublicAndSystemIdentifiers(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          break;
        case a.GREATER_THAN_SIGN:
          this.emitCurrentDoctype(t2), this.state = P.DATA;
          break;
        case a.QUOTATION_MARK:
          t2.systemId = "", this.state = P.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        case a.APOSTROPHE:
          t2.systemId = "", this.state = P.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), t2.forceQuirks = true, this.state = P.BOGUS_DOCTYPE, this._stateBogusDoctype(e3);
      }
    }
    _stateAfterDoctypeSystemKeyword(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          this.state = P.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        case a.QUOTATION_MARK:
          this._err(T.missingWhitespaceAfterDoctypeSystemKeyword), t2.systemId = "", this.state = P.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        case a.APOSTROPHE:
          this._err(T.missingWhitespaceAfterDoctypeSystemKeyword), t2.systemId = "", this.state = P.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        case a.GREATER_THAN_SIGN:
          this._err(T.missingDoctypeSystemIdentifier), t2.forceQuirks = true, this.state = P.DATA, this.emitCurrentDoctype(t2);
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), t2.forceQuirks = true, this.state = P.BOGUS_DOCTYPE, this._stateBogusDoctype(e3);
      }
    }
    _stateBeforeDoctypeSystemIdentifier(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          break;
        case a.QUOTATION_MARK:
          t2.systemId = "", this.state = P.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        case a.APOSTROPHE:
          t2.systemId = "", this.state = P.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        case a.GREATER_THAN_SIGN:
          this._err(T.missingDoctypeSystemIdentifier), t2.forceQuirks = true, this.state = P.DATA, this.emitCurrentDoctype(t2);
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), t2.forceQuirks = true, this.state = P.BOGUS_DOCTYPE, this._stateBogusDoctype(e3);
      }
    }
    _stateDoctypeSystemIdentifierDoubleQuoted(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.QUOTATION_MARK:
          this.state = P.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), t2.systemId += s;
          break;
        case a.GREATER_THAN_SIGN:
          this._err(T.abruptDoctypeSystemIdentifier), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this.state = P.DATA;
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          t2.systemId += String.fromCodePoint(e3);
      }
    }
    _stateDoctypeSystemIdentifierSingleQuoted(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.APOSTROPHE:
          this.state = P.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter), t2.systemId += s;
          break;
        case a.GREATER_THAN_SIGN:
          this._err(T.abruptDoctypeSystemIdentifier), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this.state = P.DATA;
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          t2.systemId += String.fromCodePoint(e3);
      }
    }
    _stateAfterDoctypeSystemIdentifier(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.SPACE:
        case a.LINE_FEED:
        case a.TABULATION:
        case a.FORM_FEED:
          break;
        case a.GREATER_THAN_SIGN:
          this.emitCurrentDoctype(t2), this.state = P.DATA;
          break;
        case a.EOF:
          this._err(T.eofInDoctype), t2.forceQuirks = true, this.emitCurrentDoctype(t2), this._emitEOFToken();
          break;
        default:
          this._err(T.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = P.BOGUS_DOCTYPE, this._stateBogusDoctype(e3);
      }
    }
    _stateBogusDoctype(e3) {
      const t2 = this.currentToken;
      switch (e3) {
        case a.GREATER_THAN_SIGN:
          this.emitCurrentDoctype(t2), this.state = P.DATA;
          break;
        case a.NULL:
          this._err(T.unexpectedNullCharacter);
          break;
        case a.EOF:
          this.emitCurrentDoctype(t2), this._emitEOFToken();
      }
    }
    _stateCdataSection(e3) {
      switch (e3) {
        case a.RIGHT_SQUARE_BRACKET:
          this.state = P.CDATA_SECTION_BRACKET;
          break;
        case a.EOF:
          this._err(T.eofInCdata), this._emitEOFToken();
          break;
        default:
          this._emitCodePoint(e3);
      }
    }
    _stateCdataSectionBracket(e3) {
      e3 === a.RIGHT_SQUARE_BRACKET ? this.state = P.CDATA_SECTION_END : (this._emitChars("]"), this.state = P.CDATA_SECTION, this._stateCdataSection(e3));
    }
    _stateCdataSectionEnd(e3) {
      switch (e3) {
        case a.GREATER_THAN_SIGN:
          this.state = P.DATA;
          break;
        case a.RIGHT_SQUARE_BRACKET:
          this._emitChars("]");
          break;
        default:
          this._emitChars("]]"), this.state = P.CDATA_SECTION, this._stateCdataSection(e3);
      }
    }
    _stateCharacterReference(e3) {
      e3 === a.NUMBER_SIGN ? this.state = P.NUMERIC_CHARACTER_REFERENCE : F(e3) ? (this.state = P.NAMED_CHARACTER_REFERENCE, this._stateNamedCharacterReference(e3)) : (this._flushCodePointConsumedAsCharacterReference(a.AMPERSAND), this._reconsumeInState(this.returnState, e3));
    }
    _stateNamedCharacterReference(e3) {
      const t2 = this._matchNamedCharacterReference(e3);
      if (this._ensureHibernation())
        ;
      else if (t2) {
        for (let e4 = 0; e4 < t2.length; e4++)
          this._flushCodePointConsumedAsCharacterReference(t2[e4]);
        this.state = this.returnState;
      } else
        this._flushCodePointConsumedAsCharacterReference(a.AMPERSAND), this.state = P.AMBIGUOUS_AMPERSAND;
    }
    _stateAmbiguousAmpersand(e3) {
      F(e3) ? this._flushCodePointConsumedAsCharacterReference(e3) : (e3 === a.SEMICOLON && this._err(T.unknownNamedCharacterReference), this._reconsumeInState(this.returnState, e3));
    }
    _stateNumericCharacterReference(e3) {
      this.charRefCode = 0, e3 === a.LATIN_SMALL_X || e3 === a.LATIN_CAPITAL_X ? this.state = P.HEXADEMICAL_CHARACTER_REFERENCE_START : b(e3) ? (this.state = P.DECIMAL_CHARACTER_REFERENCE, this._stateDecimalCharacterReference(e3)) : (this._err(T.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(a.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(a.NUMBER_SIGN), this._reconsumeInState(this.returnState, e3));
    }
    _stateHexademicalCharacterReferenceStart(e3) {
      !function(e4) {
        return b(e4) || U(e4) || y(e4);
      }(e3) ? (this._err(T.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(a.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(a.NUMBER_SIGN), this._unconsume(2), this.state = this.returnState) : (this.state = P.HEXADEMICAL_CHARACTER_REFERENCE, this._stateHexademicalCharacterReference(e3));
    }
    _stateHexademicalCharacterReference(e3) {
      U(e3) ? this.charRefCode = 16 * this.charRefCode + e3 - 55 : y(e3) ? this.charRefCode = 16 * this.charRefCode + e3 - 87 : b(e3) ? this.charRefCode = 16 * this.charRefCode + e3 - 48 : e3 === a.SEMICOLON ? this.state = P.NUMERIC_CHARACTER_REFERENCE_END : (this._err(T.missingSemicolonAfterCharacterReference), this.state = P.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(e3));
    }
    _stateDecimalCharacterReference(e3) {
      b(e3) ? this.charRefCode = 10 * this.charRefCode + e3 - 48 : e3 === a.SEMICOLON ? this.state = P.NUMERIC_CHARACTER_REFERENCE_END : (this._err(T.missingSemicolonAfterCharacterReference), this.state = P.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(e3));
    }
    _stateNumericCharacterReferenceEnd(e3) {
      if (this.charRefCode === a.NULL)
        this._err(T.nullCharacterReference), this.charRefCode = a.REPLACEMENT_CHARACTER;
      else if (this.charRefCode > 1114111)
        this._err(T.characterReferenceOutsideUnicodeRange), this.charRefCode = a.REPLACEMENT_CHARACTER;
      else if (o(this.charRefCode))
        this._err(T.surrogateCharacterReference), this.charRefCode = a.REPLACEMENT_CHARACTER;
      else if (E(this.charRefCode))
        this._err(T.noncharacterCharacterReference);
      else if (c(this.charRefCode) || this.charRefCode === a.CARRIAGE_RETURN) {
        this._err(T.controlCharacterReference);
        const e4 = g.get(this.charRefCode);
        void 0 !== e4 && (this.charRefCode = e4);
      }
      this._flushCodePointConsumedAsCharacterReference(this.charRefCode), this._reconsumeInState(this.returnState, e3);
    }
  }
  const v = /* @__PURE__ */ new Set([S.DD, S.DT, S.LI, S.OPTGROUP, S.OPTION, S.P, S.RB, S.RP, S.RT, S.RTC]), Q = /* @__PURE__ */ new Set([...v, S.CAPTION, S.COLGROUP, S.TBODY, S.TD, S.TFOOT, S.TH, S.THEAD, S.TR]), q = /* @__PURE__ */ new Map([[S.APPLET, u.HTML], [S.CAPTION, u.HTML], [S.HTML, u.HTML], [S.MARQUEE, u.HTML], [S.OBJECT, u.HTML], [S.TABLE, u.HTML], [S.TD, u.HTML], [S.TEMPLATE, u.HTML], [S.TH, u.HTML], [S.ANNOTATION_XML, u.MATHML], [S.MI, u.MATHML], [S.MN, u.MATHML], [S.MO, u.MATHML], [S.MS, u.MATHML], [S.MTEXT, u.MATHML], [S.DESC, u.SVG], [S.FOREIGN_OBJECT, u.SVG], [S.TITLE, u.SVG]]), W = [S.H1, S.H2, S.H3, S.H4, S.H5, S.H6], X = [S.TR, S.TEMPLATE, S.HTML], K = [S.TBODY, S.TFOOT, S.THEAD, S.TEMPLATE, S.HTML], V = [S.TABLE, S.TEMPLATE, S.HTML], z = [S.TD, S.TH];
  class j {
    get currentTmplContentOrNode() {
      return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
    }
    constructor(e3, t2, s2) {
      this.treeAdapter = t2, this.handler = s2, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = S.UNKNOWN, this.current = e3;
    }
    _indexOf(e3) {
      return this.items.lastIndexOf(e3, this.stackTop);
    }
    _isInTemplate() {
      return this.currentTagId === S.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === u.HTML;
    }
    _updateCurrentElement() {
      this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
    }
    push(e3, t2) {
      this.stackTop++, this.items[this.stackTop] = e3, this.current = e3, this.tagIDs[this.stackTop] = t2, this.currentTagId = t2, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(e3, t2, true);
    }
    pop() {
      const e3 = this.current;
      this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(e3, true);
    }
    replace(e3, t2) {
      const s2 = this._indexOf(e3);
      this.items[s2] = t2, s2 === this.stackTop && (this.current = t2);
    }
    insertAfter(e3, t2, s2) {
      const a2 = this._indexOf(e3) + 1;
      this.items.splice(a2, 0, t2), this.tagIDs.splice(a2, 0, s2), this.stackTop++, a2 === this.stackTop && this._updateCurrentElement(), this.handler.onItemPush(this.current, this.currentTagId, a2 === this.stackTop);
    }
    popUntilTagNamePopped(e3) {
      let t2 = this.stackTop + 1;
      do {
        t2 = this.tagIDs.lastIndexOf(e3, t2 - 1);
      } while (t2 > 0 && this.treeAdapter.getNamespaceURI(this.items[t2]) !== u.HTML);
      this.shortenToLength(t2 < 0 ? 0 : t2);
    }
    shortenToLength(e3) {
      for (; this.stackTop >= e3; ) {
        const t2 = this.current;
        this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t2, this.stackTop < e3);
      }
    }
    popUntilElementPopped(e3) {
      const t2 = this._indexOf(e3);
      this.shortenToLength(t2 < 0 ? 0 : t2);
    }
    popUntilPopped(e3, t2) {
      const s2 = this._indexOfTagNames(e3, t2);
      this.shortenToLength(s2 < 0 ? 0 : s2);
    }
    popUntilNumberedHeaderPopped() {
      this.popUntilPopped(W, u.HTML);
    }
    popUntilTableCellPopped() {
      this.popUntilPopped(z, u.HTML);
    }
    popAllUpToHtmlElement() {
      this.tmplCount = 0, this.shortenToLength(1);
    }
    _indexOfTagNames(e3, t2) {
      for (let s2 = this.stackTop; s2 >= 0; s2--)
        if (e3.includes(this.tagIDs[s2]) && this.treeAdapter.getNamespaceURI(this.items[s2]) === t2)
          return s2;
      return -1;
    }
    clearBackTo(e3, t2) {
      const s2 = this._indexOfTagNames(e3, t2);
      this.shortenToLength(s2 + 1);
    }
    clearBackToTableContext() {
      this.clearBackTo(V, u.HTML);
    }
    clearBackToTableBodyContext() {
      this.clearBackTo(K, u.HTML);
    }
    clearBackToTableRowContext() {
      this.clearBackTo(X, u.HTML);
    }
    remove(e3) {
      const t2 = this._indexOf(e3);
      t2 >= 0 && (t2 === this.stackTop ? this.pop() : (this.items.splice(t2, 1), this.tagIDs.splice(t2, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(e3, false)));
    }
    tryPeekProperlyNestedBodyElement() {
      return this.stackTop >= 1 && this.tagIDs[1] === S.BODY ? this.items[1] : null;
    }
    contains(e3) {
      return this._indexOf(e3) > -1;
    }
    getCommonAncestor(e3) {
      const t2 = this._indexOf(e3) - 1;
      return t2 >= 0 ? this.items[t2] : null;
    }
    isRootHtmlElementCurrent() {
      return 0 === this.stackTop && this.tagIDs[0] === S.HTML;
    }
    hasInScope(e3) {
      for (let t2 = this.stackTop; t2 >= 0; t2--) {
        const s2 = this.tagIDs[t2], a2 = this.treeAdapter.getNamespaceURI(this.items[t2]);
        if (s2 === e3 && a2 === u.HTML)
          return true;
        if (q.get(s2) === a2)
          return false;
      }
      return true;
    }
    hasNumberedHeaderInScope() {
      for (let e3 = this.stackTop; e3 >= 0; e3--) {
        const t2 = this.tagIDs[e3], s2 = this.treeAdapter.getNamespaceURI(this.items[e3]);
        if (M(t2) && s2 === u.HTML)
          return true;
        if (q.get(t2) === s2)
          return false;
      }
      return true;
    }
    hasInListItemScope(e3) {
      for (let t2 = this.stackTop; t2 >= 0; t2--) {
        const s2 = this.tagIDs[t2], a2 = this.treeAdapter.getNamespaceURI(this.items[t2]);
        if (s2 === e3 && a2 === u.HTML)
          return true;
        if ((s2 === S.UL || s2 === S.OL) && a2 === u.HTML || q.get(s2) === a2)
          return false;
      }
      return true;
    }
    hasInButtonScope(e3) {
      for (let t2 = this.stackTop; t2 >= 0; t2--) {
        const s2 = this.tagIDs[t2], a2 = this.treeAdapter.getNamespaceURI(this.items[t2]);
        if (s2 === e3 && a2 === u.HTML)
          return true;
        if (s2 === S.BUTTON && a2 === u.HTML || q.get(s2) === a2)
          return false;
      }
      return true;
    }
    hasInTableScope(e3) {
      for (let t2 = this.stackTop; t2 >= 0; t2--) {
        const s2 = this.tagIDs[t2];
        if (this.treeAdapter.getNamespaceURI(this.items[t2]) === u.HTML) {
          if (s2 === e3)
            return true;
          if (s2 === S.TABLE || s2 === S.TEMPLATE || s2 === S.HTML)
            return false;
        }
      }
      return true;
    }
    hasTableBodyContextInTableScope() {
      for (let e3 = this.stackTop; e3 >= 0; e3--) {
        const t2 = this.tagIDs[e3];
        if (this.treeAdapter.getNamespaceURI(this.items[e3]) === u.HTML) {
          if (t2 === S.TBODY || t2 === S.THEAD || t2 === S.TFOOT)
            return true;
          if (t2 === S.TABLE || t2 === S.HTML)
            return false;
        }
      }
      return true;
    }
    hasInSelectScope(e3) {
      for (let t2 = this.stackTop; t2 >= 0; t2--) {
        const s2 = this.tagIDs[t2];
        if (this.treeAdapter.getNamespaceURI(this.items[t2]) === u.HTML) {
          if (s2 === e3)
            return true;
          if (s2 !== S.OPTION && s2 !== S.OPTGROUP)
            return false;
        }
      }
      return true;
    }
    generateImpliedEndTags() {
      for (; v.has(this.currentTagId); )
        this.pop();
    }
    generateImpliedEndTagsThoroughly() {
      for (; Q.has(this.currentTagId); )
        this.pop();
    }
    generateImpliedEndTagsWithExclusion(e3) {
      for (; this.currentTagId !== e3 && Q.has(this.currentTagId); )
        this.pop();
    }
  }
  var J;
  !function(e3) {
    e3[e3.Marker = 0] = "Marker", e3[e3.Element = 1] = "Element";
  }(J = J || (J = {}));
  const Z = { type: J.Marker };
  class $ {
    constructor(e3) {
      this.treeAdapter = e3, this.entries = [], this.bookmark = null;
    }
    _getNoahArkConditionCandidates(e3, t2) {
      const s2 = [], a2 = t2.length, r2 = this.treeAdapter.getTagName(e3), n2 = this.treeAdapter.getNamespaceURI(e3);
      for (let e4 = 0; e4 < this.entries.length; e4++) {
        const t3 = this.entries[e4];
        if (t3.type === J.Marker)
          break;
        const { element: i2 } = t3;
        if (this.treeAdapter.getTagName(i2) === r2 && this.treeAdapter.getNamespaceURI(i2) === n2) {
          const t4 = this.treeAdapter.getAttrList(i2);
          t4.length === a2 && s2.push({ idx: e4, attrs: t4 });
        }
      }
      return s2;
    }
    _ensureNoahArkCondition(e3) {
      if (this.entries.length < 3)
        return;
      const t2 = this.treeAdapter.getAttrList(e3), s2 = this._getNoahArkConditionCandidates(e3, t2);
      if (s2.length < 3)
        return;
      const a2 = new Map(t2.map((e4) => [e4.name, e4.value]));
      let r2 = 0;
      for (let e4 = 0; e4 < s2.length; e4++) {
        const t3 = s2[e4];
        t3.attrs.every((e5) => a2.get(e5.name) === e5.value) && (r2 += 1, r2 >= 3 && this.entries.splice(t3.idx, 1));
      }
    }
    insertMarker() {
      this.entries.unshift(Z);
    }
    pushElement(e3, t2) {
      this._ensureNoahArkCondition(e3), this.entries.unshift({ type: J.Element, element: e3, token: t2 });
    }
    insertElementAfterBookmark(e3, t2) {
      const s2 = this.entries.indexOf(this.bookmark);
      this.entries.splice(s2, 0, { type: J.Element, element: e3, token: t2 });
    }
    removeEntry(e3) {
      const t2 = this.entries.indexOf(e3);
      t2 >= 0 && this.entries.splice(t2, 1);
    }
    clearToLastMarker() {
      const e3 = this.entries.indexOf(Z);
      e3 >= 0 ? this.entries.splice(0, e3 + 1) : this.entries.length = 0;
    }
    getElementEntryInScopeWithTagName(e3) {
      const t2 = this.entries.find((t3) => t3.type === J.Marker || this.treeAdapter.getTagName(t3.element) === e3);
      return t2 && t2.type === J.Element ? t2 : null;
    }
    getElementEntry(e3) {
      return this.entries.find((t2) => t2.type === J.Element && t2.element === e3);
    }
  }
  function ee(e3) {
    return { nodeName: "#text", value: e3, parentNode: null };
  }
  const te = { createDocument: () => ({ nodeName: "#document", mode: I.NO_QUIRKS, childNodes: [] }), createDocumentFragment: () => ({ nodeName: "#document-fragment", childNodes: [] }), createElement: (e3, t2, s2) => ({ nodeName: e3, tagName: e3, attrs: s2, namespaceURI: t2, childNodes: [], parentNode: null }), createCommentNode: (e3) => ({ nodeName: "#comment", data: e3, parentNode: null }), appendChild(e3, t2) {
    e3.childNodes.push(t2), t2.parentNode = e3;
  }, insertBefore(e3, t2, s2) {
    const a2 = e3.childNodes.indexOf(s2);
    e3.childNodes.splice(a2, 0, t2), t2.parentNode = e3;
  }, setTemplateContent(e3, t2) {
    e3.content = t2;
  }, getTemplateContent: (e3) => e3.content, setDocumentType(e3, t2, s2, a2) {
    const r2 = e3.childNodes.find((e4) => "#documentType" === e4.nodeName);
    if (r2)
      r2.name = t2, r2.publicId = s2, r2.systemId = a2;
    else {
      const r3 = { nodeName: "#documentType", name: t2, publicId: s2, systemId: a2, parentNode: null };
      te.appendChild(e3, r3);
    }
  }, setDocumentMode(e3, t2) {
    e3.mode = t2;
  }, getDocumentMode: (e3) => e3.mode, detachNode(e3) {
    if (e3.parentNode) {
      const t2 = e3.parentNode.childNodes.indexOf(e3);
      e3.parentNode.childNodes.splice(t2, 1), e3.parentNode = null;
    }
  }, insertText(e3, t2) {
    if (e3.childNodes.length > 0) {
      const s2 = e3.childNodes[e3.childNodes.length - 1];
      if (te.isTextNode(s2))
        return void (s2.value += t2);
    }
    te.appendChild(e3, ee(t2));
  }, insertTextBefore(e3, t2, s2) {
    const a2 = e3.childNodes[e3.childNodes.indexOf(s2) - 1];
    a2 && te.isTextNode(a2) ? a2.value += t2 : te.insertBefore(e3, ee(t2), s2);
  }, adoptAttributes(e3, t2) {
    const s2 = new Set(e3.attrs.map((e4) => e4.name));
    for (let a2 = 0; a2 < t2.length; a2++)
      s2.has(t2[a2].name) || e3.attrs.push(t2[a2]);
  }, getFirstChild: (e3) => e3.childNodes[0], getChildNodes: (e3) => e3.childNodes, getParentNode: (e3) => e3.parentNode, getAttrList: (e3) => e3.attrs, getTagName: (e3) => e3.tagName, getNamespaceURI: (e3) => e3.namespaceURI, getTextNodeContent: (e3) => e3.value, getCommentNodeContent: (e3) => e3.data, getDocumentTypeNodeName: (e3) => e3.name, getDocumentTypeNodePublicId: (e3) => e3.publicId, getDocumentTypeNodeSystemId: (e3) => e3.systemId, isTextNode: (e3) => "#text" === e3.nodeName, isCommentNode: (e3) => "#comment" === e3.nodeName, isDocumentTypeNode: (e3) => "#documentType" === e3.nodeName, isElementNode: (e3) => Object.prototype.hasOwnProperty.call(e3, "tagName"), setNodeSourceCodeLocation(e3, t2) {
    e3.sourceCodeLocation = t2;
  }, getNodeSourceCodeLocation: (e3) => e3.sourceCodeLocation, updateNodeSourceCodeLocation(e3, t2) {
    e3.sourceCodeLocation = { ...e3.sourceCodeLocation, ...t2 };
  } }, se = "html", ae = ["+//silmaril//dtd html pro v0r11 19970101//", "-//as//dtd html 3.0 aswedit + extensions//", "-//advasoft ltd//dtd html 3.0 aswedit + extensions//", "-//ietf//dtd html 2.0 level 1//", "-//ietf//dtd html 2.0 level 2//", "-//ietf//dtd html 2.0 strict level 1//", "-//ietf//dtd html 2.0 strict level 2//", "-//ietf//dtd html 2.0 strict//", "-//ietf//dtd html 2.0//", "-//ietf//dtd html 2.1e//", "-//ietf//dtd html 3.0//", "-//ietf//dtd html 3.2 final//", "-//ietf//dtd html 3.2//", "-//ietf//dtd html 3//", "-//ietf//dtd html level 0//", "-//ietf//dtd html level 1//", "-//ietf//dtd html level 2//", "-//ietf//dtd html level 3//", "-//ietf//dtd html strict level 0//", "-//ietf//dtd html strict level 1//", "-//ietf//dtd html strict level 2//", "-//ietf//dtd html strict level 3//", "-//ietf//dtd html strict//", "-//ietf//dtd html//", "-//metrius//dtd metrius presentational//", "-//microsoft//dtd internet explorer 2.0 html strict//", "-//microsoft//dtd internet explorer 2.0 html//", "-//microsoft//dtd internet explorer 2.0 tables//", "-//microsoft//dtd internet explorer 3.0 html strict//", "-//microsoft//dtd internet explorer 3.0 html//", "-//microsoft//dtd internet explorer 3.0 tables//", "-//netscape comm. corp.//dtd html//", "-//netscape comm. corp.//dtd strict html//", "-//o'reilly and associates//dtd html 2.0//", "-//o'reilly and associates//dtd html extended 1.0//", "-//o'reilly and associates//dtd html extended relaxed 1.0//", "-//sq//dtd html 2.0 hotmetal + extensions//", "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//", "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//", "-//spyglass//dtd html 2.0 extended//", "-//sun microsystems corp.//dtd hotjava html//", "-//sun microsystems corp.//dtd hotjava strict html//", "-//w3c//dtd html 3 1995-03-24//", "-//w3c//dtd html 3.2 draft//", "-//w3c//dtd html 3.2 final//", "-//w3c//dtd html 3.2//", "-//w3c//dtd html 3.2s draft//", "-//w3c//dtd html 4.0 frameset//", "-//w3c//dtd html 4.0 transitional//", "-//w3c//dtd html experimental 19960712//", "-//w3c//dtd html experimental 970421//", "-//w3c//dtd w3 html//", "-//w3o//dtd w3 html 3.0//", "-//webtechs//dtd mozilla html 2.0//", "-//webtechs//dtd mozilla html//"], re = [...ae, "-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"], ne = /* @__PURE__ */ new Set(["-//w3o//dtd w3 html strict 3.0//en//", "-/w3c/dtd html 4.0 transitional/en", "html"]), ie = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], oe = [...ie, "-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"];
  function ce(e3, t2) {
    return t2.some((t3) => e3.startsWith(t3));
  }
  const Ee = "text/html", Te = "application/xhtml+xml", he = "definitionurl", _e = "definitionURL", Ae = new Map(["attributeName", "attributeType", "baseFrequency", "baseProfile", "calcMode", "clipPathUnits", "diffuseConstant", "edgeMode", "filterUnits", "glyphRef", "gradientTransform", "gradientUnits", "kernelMatrix", "kernelUnitLength", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "limitingConeAngle", "markerHeight", "markerUnits", "markerWidth", "maskContentUnits", "maskUnits", "numOctaves", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "refX", "refY", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "specularConstant", "specularExponent", "spreadMethod", "startOffset", "stdDeviation", "stitchTiles", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textLength", "viewBox", "viewTarget", "xChannelSelector", "yChannelSelector", "zoomAndPan"].map((e3) => [e3.toLowerCase(), e3])), le = /* @__PURE__ */ new Map([["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: u.XLINK }], ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: u.XLINK }], ["xlink:href", { prefix: "xlink", name: "href", namespace: u.XLINK }], ["xlink:role", { prefix: "xlink", name: "role", namespace: u.XLINK }], ["xlink:show", { prefix: "xlink", name: "show", namespace: u.XLINK }], ["xlink:title", { prefix: "xlink", name: "title", namespace: u.XLINK }], ["xlink:type", { prefix: "xlink", name: "type", namespace: u.XLINK }], ["xml:base", { prefix: "xml", name: "base", namespace: u.XML }], ["xml:lang", { prefix: "xml", name: "lang", namespace: u.XML }], ["xml:space", { prefix: "xml", name: "space", namespace: u.XML }], ["xmlns", { prefix: "", name: "xmlns", namespace: u.XMLNS }], ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: u.XMLNS }]]), me = new Map(["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "glyphRef", "linearGradient", "radialGradient", "textPath"].map((e3) => [e3.toLowerCase(), e3])), de = /* @__PURE__ */ new Set([S.B, S.BIG, S.BLOCKQUOTE, S.BODY, S.BR, S.CENTER, S.CODE, S.DD, S.DIV, S.DL, S.DT, S.EM, S.EMBED, S.H1, S.H2, S.H3, S.H4, S.H5, S.H6, S.HEAD, S.HR, S.I, S.IMG, S.LI, S.LISTING, S.MENU, S.META, S.NOBR, S.OL, S.P, S.PRE, S.RUBY, S.S, S.SMALL, S.SPAN, S.STRONG, S.STRIKE, S.SUB, S.SUP, S.TABLE, S.TT, S.U, S.UL, S.VAR]);
  function pe(e3) {
    for (let t2 = 0; t2 < e3.attrs.length; t2++)
      if (e3.attrs[t2].name === he) {
        e3.attrs[t2].name = _e;
        break;
      }
  }
  function ue(e3) {
    for (let t2 = 0; t2 < e3.attrs.length; t2++) {
      const s2 = Ae.get(e3.attrs[t2].name);
      null != s2 && (e3.attrs[t2].name = s2);
    }
  }
  function Ne(e3) {
    for (let t2 = 0; t2 < e3.attrs.length; t2++) {
      const s2 = le.get(e3.attrs[t2].name);
      s2 && (e3.attrs[t2].prefix = s2.prefix, e3.attrs[t2].name = s2.name, e3.attrs[t2].namespace = s2.namespace);
    }
  }
  const Ie = "hidden", Ce = 8, Se = 3;
  var De;
  !function(e3) {
    e3[e3.INITIAL = 0] = "INITIAL", e3[e3.BEFORE_HTML = 1] = "BEFORE_HTML", e3[e3.BEFORE_HEAD = 2] = "BEFORE_HEAD", e3[e3.IN_HEAD = 3] = "IN_HEAD", e3[e3.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e3[e3.AFTER_HEAD = 5] = "AFTER_HEAD", e3[e3.IN_BODY = 6] = "IN_BODY", e3[e3.TEXT = 7] = "TEXT", e3[e3.IN_TABLE = 8] = "IN_TABLE", e3[e3.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e3[e3.IN_CAPTION = 10] = "IN_CAPTION", e3[e3.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e3[e3.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e3[e3.IN_ROW = 13] = "IN_ROW", e3[e3.IN_CELL = 14] = "IN_CELL", e3[e3.IN_SELECT = 15] = "IN_SELECT", e3[e3.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e3[e3.IN_TEMPLATE = 17] = "IN_TEMPLATE", e3[e3.AFTER_BODY = 18] = "AFTER_BODY", e3[e3.IN_FRAMESET = 19] = "IN_FRAMESET", e3[e3.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e3[e3.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e3[e3.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
  }(De || (De = {}));
  const Re = { startLine: -1, startCol: -1, startOffset: -1, endLine: -1, endCol: -1, endOffset: -1 }, Oe = /* @__PURE__ */ new Set([S.TABLE, S.TBODY, S.TFOOT, S.THEAD, S.TR]), fe = { scriptingEnabled: true, sourceCodeLocationInfo: false, treeAdapter: te, onParseError: null };
  class Le {
    constructor(e3, t2, s2 = null, a2 = null) {
      this.fragmentContext = s2, this.scriptHandler = a2, this.currentToken = null, this.stopped = false, this.insertionMode = De.INITIAL, this.originalInsertionMode = De.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = false, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = false, this.framesetOk = true, this.skipNextNewLine = false, this.fosterParentingEnabled = false, this.options = { ...fe, ...e3 }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = true), this.document = null != t2 ? t2 : this.treeAdapter.createDocument(), this.tokenizer = new Y(this.options, this), this.activeFormattingElements = new $(this.treeAdapter), this.fragmentContextID = s2 ? O(this.treeAdapter.getTagName(s2)) : S.UNKNOWN, this._setContextModes(null != s2 ? s2 : this.document, this.fragmentContextID), this.openElements = new j(this.document, this.treeAdapter, this);
    }
    static parse(e3, t2) {
      const s2 = new this(t2);
      return s2.tokenizer.write(e3, true), s2.document;
    }
    static getFragmentParser(e3, t2) {
      const s2 = { ...fe, ...t2 };
      null != e3 || (e3 = s2.treeAdapter.createElement(C.TEMPLATE, u.HTML, []));
      const a2 = s2.treeAdapter.createElement("documentmock", u.HTML, []), r2 = new this(s2, a2, e3);
      return r2.fragmentContextID === S.TEMPLATE && r2.tmplInsertionModeStack.unshift(De.IN_TEMPLATE), r2._initTokenizerForFragmentParsing(), r2._insertFakeRootElement(), r2._resetInsertionMode(), r2._findFormInFragmentContext(), r2;
    }
    getFragment() {
      const e3 = this.treeAdapter.getFirstChild(this.document), t2 = this.treeAdapter.createDocumentFragment();
      return this._adoptNodes(e3, t2), t2;
    }
    _err(e3, t2, s2) {
      var a2;
      if (!this.onParseError)
        return;
      const r2 = null !== (a2 = e3.location) && void 0 !== a2 ? a2 : Re, n2 = { code: t2, startLine: r2.startLine, startCol: r2.startCol, startOffset: r2.startOffset, endLine: s2 ? r2.startLine : r2.endLine, endCol: s2 ? r2.startCol : r2.endCol, endOffset: s2 ? r2.startOffset : r2.endOffset };
      this.onParseError(n2);
    }
    onItemPush(e3, t2, s2) {
      var a2, r2;
      null === (r2 = (a2 = this.treeAdapter).onItemPush) || void 0 === r2 || r2.call(a2, e3), s2 && this.openElements.stackTop > 0 && this._setContextModes(e3, t2);
    }
    onItemPop(e3, t2) {
      var s2, a2;
      if (this.options.sourceCodeLocationInfo && this._setEndLocation(e3, this.currentToken), null === (a2 = (s2 = this.treeAdapter).onItemPop) || void 0 === a2 || a2.call(s2, e3, this.openElements.current), t2) {
        let e4, t3;
        0 === this.openElements.stackTop && this.fragmentContext ? (e4 = this.fragmentContext, t3 = this.fragmentContextID) : { current: e4, currentTagId: t3 } = this.openElements, this._setContextModes(e4, t3);
      }
    }
    _setContextModes(e3, t2) {
      const s2 = e3 === this.document || this.treeAdapter.getNamespaceURI(e3) === u.HTML;
      this.currentNotInHTML = !s2, this.tokenizer.inForeignNode = !s2 && !this._isIntegrationPoint(t2, e3);
    }
    _switchToTextParsing(e3, t2) {
      this._insertElement(e3, u.HTML), this.tokenizer.state = t2, this.originalInsertionMode = this.insertionMode, this.insertionMode = De.TEXT;
    }
    switchToPlaintextParsing() {
      this.insertionMode = De.TEXT, this.originalInsertionMode = De.IN_BODY, this.tokenizer.state = k.PLAINTEXT;
    }
    _getAdjustedCurrentElement() {
      return 0 === this.openElements.stackTop && this.fragmentContext ? this.fragmentContext : this.openElements.current;
    }
    _findFormInFragmentContext() {
      let e3 = this.fragmentContext;
      for (; e3; ) {
        if (this.treeAdapter.getTagName(e3) === C.FORM) {
          this.formElement = e3;
          break;
        }
        e3 = this.treeAdapter.getParentNode(e3);
      }
    }
    _initTokenizerForFragmentParsing() {
      if (this.fragmentContext && this.treeAdapter.getNamespaceURI(this.fragmentContext) === u.HTML)
        switch (this.fragmentContextID) {
          case S.TITLE:
          case S.TEXTAREA:
            this.tokenizer.state = k.RCDATA;
            break;
          case S.STYLE:
          case S.XMP:
          case S.IFRAME:
          case S.NOEMBED:
          case S.NOFRAMES:
          case S.NOSCRIPT:
            this.tokenizer.state = k.RAWTEXT;
            break;
          case S.SCRIPT:
            this.tokenizer.state = k.SCRIPT_DATA;
            break;
          case S.PLAINTEXT:
            this.tokenizer.state = k.PLAINTEXT;
        }
    }
    _setDocumentType(e3) {
      const t2 = e3.name || "", s2 = e3.publicId || "", a2 = e3.systemId || "";
      if (this.treeAdapter.setDocumentType(this.document, t2, s2, a2), e3.location) {
        const t3 = this.treeAdapter.getChildNodes(this.document).find((e4) => this.treeAdapter.isDocumentTypeNode(e4));
        t3 && this.treeAdapter.setNodeSourceCodeLocation(t3, e3.location);
      }
    }
    _attachElementToTree(e3, t2) {
      if (this.options.sourceCodeLocationInfo) {
        const s2 = t2 && { ...t2, startTag: t2 };
        this.treeAdapter.setNodeSourceCodeLocation(e3, s2);
      }
      if (this._shouldFosterParentOnInsertion())
        this._fosterParentElement(e3);
      else {
        const t3 = this.openElements.currentTmplContentOrNode;
        this.treeAdapter.appendChild(t3, e3);
      }
    }
    _appendElement(e3, t2) {
      const s2 = this.treeAdapter.createElement(e3.tagName, t2, e3.attrs);
      this._attachElementToTree(s2, e3.location);
    }
    _insertElement(e3, t2) {
      const s2 = this.treeAdapter.createElement(e3.tagName, t2, e3.attrs);
      this._attachElementToTree(s2, e3.location), this.openElements.push(s2, e3.tagID);
    }
    _insertFakeElement(e3, t2) {
      const s2 = this.treeAdapter.createElement(e3, u.HTML, []);
      this._attachElementToTree(s2, null), this.openElements.push(s2, t2);
    }
    _insertTemplate(e3) {
      const t2 = this.treeAdapter.createElement(e3.tagName, u.HTML, e3.attrs), s2 = this.treeAdapter.createDocumentFragment();
      this.treeAdapter.setTemplateContent(t2, s2), this._attachElementToTree(t2, e3.location), this.openElements.push(t2, e3.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(s2, null);
    }
    _insertFakeRootElement() {
      const e3 = this.treeAdapter.createElement(C.HTML, u.HTML, []);
      this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(e3, null), this.treeAdapter.appendChild(this.openElements.current, e3), this.openElements.push(e3, S.HTML);
    }
    _appendCommentNode(e3, t2) {
      const s2 = this.treeAdapter.createCommentNode(e3.data);
      this.treeAdapter.appendChild(t2, s2), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(s2, e3.location);
    }
    _insertCharacters(e3) {
      let t2, s2;
      if (this._shouldFosterParentOnInsertion() ? ({ parent: t2, beforeElement: s2 } = this._findFosterParentingLocation(), s2 ? this.treeAdapter.insertTextBefore(t2, e3.chars, s2) : this.treeAdapter.insertText(t2, e3.chars)) : (t2 = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(t2, e3.chars)), !e3.location)
        return;
      const a2 = this.treeAdapter.getChildNodes(t2), r2 = s2 ? a2.lastIndexOf(s2) : a2.length, n2 = a2[r2 - 1];
      if (this.treeAdapter.getNodeSourceCodeLocation(n2)) {
        const { endLine: t3, endCol: s3, endOffset: a3 } = e3.location;
        this.treeAdapter.updateNodeSourceCodeLocation(n2, { endLine: t3, endCol: s3, endOffset: a3 });
      } else
        this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n2, e3.location);
    }
    _adoptNodes(e3, t2) {
      for (let s2 = this.treeAdapter.getFirstChild(e3); s2; s2 = this.treeAdapter.getFirstChild(e3))
        this.treeAdapter.detachNode(s2), this.treeAdapter.appendChild(t2, s2);
    }
    _setEndLocation(e3, t2) {
      if (this.treeAdapter.getNodeSourceCodeLocation(e3) && t2.location) {
        const s2 = t2.location, a2 = this.treeAdapter.getTagName(e3), r2 = t2.type === h.END_TAG && a2 === t2.tagName ? { endTag: { ...s2 }, endLine: s2.endLine, endCol: s2.endCol, endOffset: s2.endOffset } : { endLine: s2.startLine, endCol: s2.startCol, endOffset: s2.startOffset };
        this.treeAdapter.updateNodeSourceCodeLocation(e3, r2);
      }
    }
    shouldProcessStartTagTokenInForeignContent(e3) {
      if (!this.currentNotInHTML)
        return false;
      let t2, s2;
      return 0 === this.openElements.stackTop && this.fragmentContext ? (t2 = this.fragmentContext, s2 = this.fragmentContextID) : { current: t2, currentTagId: s2 } = this.openElements, (e3.tagID !== S.SVG || this.treeAdapter.getTagName(t2) !== C.ANNOTATION_XML || this.treeAdapter.getNamespaceURI(t2) !== u.MATHML) && (this.tokenizer.inForeignNode || (e3.tagID === S.MGLYPH || e3.tagID === S.MALIGNMARK) && !this._isIntegrationPoint(s2, t2, u.HTML));
    }
    _processToken(e3) {
      switch (e3.type) {
        case h.CHARACTER:
          this.onCharacter(e3);
          break;
        case h.NULL_CHARACTER:
          this.onNullCharacter(e3);
          break;
        case h.COMMENT:
          this.onComment(e3);
          break;
        case h.DOCTYPE:
          this.onDoctype(e3);
          break;
        case h.START_TAG:
          this._processStartTag(e3);
          break;
        case h.END_TAG:
          this.onEndTag(e3);
          break;
        case h.EOF:
          this.onEof(e3);
          break;
        case h.WHITESPACE_CHARACTER:
          this.onWhitespaceCharacter(e3);
      }
    }
    _isIntegrationPoint(e3, t2, s2) {
      return function(e4, t3, s3, a2) {
        return (!a2 || a2 === u.HTML) && function(e5, t4, s4) {
          if (t4 === u.MATHML && e5 === S.ANNOTATION_XML) {
            for (let e6 = 0; e6 < s4.length; e6++)
              if (s4[e6].name === N.ENCODING) {
                const t5 = s4[e6].value.toLowerCase();
                return t5 === Ee || t5 === Te;
              }
          }
          return t4 === u.SVG && (e5 === S.FOREIGN_OBJECT || e5 === S.DESC || e5 === S.TITLE);
        }(e4, t3, s3) || (!a2 || a2 === u.MATHML) && function(e5, t4) {
          return t4 === u.MATHML && (e5 === S.MI || e5 === S.MO || e5 === S.MN || e5 === S.MS || e5 === S.MTEXT);
        }(e4, t3);
      }(e3, this.treeAdapter.getNamespaceURI(t2), this.treeAdapter.getAttrList(t2), s2);
    }
    _reconstructActiveFormattingElements() {
      const e3 = this.activeFormattingElements.entries.length;
      if (e3) {
        const t2 = this.activeFormattingElements.entries.findIndex((e4) => e4.type === J.Marker || this.openElements.contains(e4.element));
        for (let s2 = t2 < 0 ? e3 - 1 : t2 - 1; s2 >= 0; s2--) {
          const e4 = this.activeFormattingElements.entries[s2];
          this._insertElement(e4.token, this.treeAdapter.getNamespaceURI(e4.element)), e4.element = this.openElements.current;
        }
      }
    }
    _closeTableCell() {
      this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = De.IN_ROW;
    }
    _closePElement() {
      this.openElements.generateImpliedEndTagsWithExclusion(S.P), this.openElements.popUntilTagNamePopped(S.P);
    }
    _resetInsertionMode() {
      for (let e3 = this.openElements.stackTop; e3 >= 0; e3--)
        switch (0 === e3 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[e3]) {
          case S.TR:
            return void (this.insertionMode = De.IN_ROW);
          case S.TBODY:
          case S.THEAD:
          case S.TFOOT:
            return void (this.insertionMode = De.IN_TABLE_BODY);
          case S.CAPTION:
            return void (this.insertionMode = De.IN_CAPTION);
          case S.COLGROUP:
            return void (this.insertionMode = De.IN_COLUMN_GROUP);
          case S.TABLE:
            return void (this.insertionMode = De.IN_TABLE);
          case S.BODY:
            return void (this.insertionMode = De.IN_BODY);
          case S.FRAMESET:
            return void (this.insertionMode = De.IN_FRAMESET);
          case S.SELECT:
            return void this._resetInsertionModeForSelect(e3);
          case S.TEMPLATE:
            return void (this.insertionMode = this.tmplInsertionModeStack[0]);
          case S.HTML:
            return void (this.insertionMode = this.headElement ? De.AFTER_HEAD : De.BEFORE_HEAD);
          case S.TD:
          case S.TH:
            if (e3 > 0)
              return void (this.insertionMode = De.IN_CELL);
            break;
          case S.HEAD:
            if (e3 > 0)
              return void (this.insertionMode = De.IN_HEAD);
        }
      this.insertionMode = De.IN_BODY;
    }
    _resetInsertionModeForSelect(e3) {
      if (e3 > 0)
        for (let t2 = e3 - 1; t2 > 0; t2--) {
          const e4 = this.openElements.tagIDs[t2];
          if (e4 === S.TEMPLATE)
            break;
          if (e4 === S.TABLE)
            return void (this.insertionMode = De.IN_SELECT_IN_TABLE);
        }
      this.insertionMode = De.IN_SELECT;
    }
    _isElementCausesFosterParenting(e3) {
      return Oe.has(e3);
    }
    _shouldFosterParentOnInsertion() {
      return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId);
    }
    _findFosterParentingLocation() {
      for (let e3 = this.openElements.stackTop; e3 >= 0; e3--) {
        const t2 = this.openElements.items[e3];
        switch (this.openElements.tagIDs[e3]) {
          case S.TEMPLATE:
            if (this.treeAdapter.getNamespaceURI(t2) === u.HTML)
              return { parent: this.treeAdapter.getTemplateContent(t2), beforeElement: null };
            break;
          case S.TABLE: {
            const s2 = this.treeAdapter.getParentNode(t2);
            return s2 ? { parent: s2, beforeElement: t2 } : { parent: this.openElements.items[e3 - 1], beforeElement: null };
          }
        }
      }
      return { parent: this.openElements.items[0], beforeElement: null };
    }
    _fosterParentElement(e3) {
      const t2 = this._findFosterParentingLocation();
      t2.beforeElement ? this.treeAdapter.insertBefore(t2.parent, e3, t2.beforeElement) : this.treeAdapter.appendChild(t2.parent, e3);
    }
    _isSpecialElement(e3, t2) {
      const s2 = this.treeAdapter.getNamespaceURI(e3);
      return L[s2].has(t2);
    }
    onCharacter(e3) {
      if (this.skipNextNewLine = false, this.tokenizer.inForeignNode)
        !function(e4, t2) {
          e4._insertCharacters(t2), e4.framesetOk = false;
        }(this, e3);
      else
        switch (this.insertionMode) {
          case De.INITIAL:
            ye(this, e3);
            break;
          case De.BEFORE_HTML:
            Ge(this, e3);
            break;
          case De.BEFORE_HEAD:
            we(this, e3);
            break;
          case De.IN_HEAD:
            ve(this, e3);
            break;
          case De.IN_HEAD_NO_SCRIPT:
            Qe(this, e3);
            break;
          case De.AFTER_HEAD:
            qe(this, e3);
            break;
          case De.IN_BODY:
          case De.IN_CAPTION:
          case De.IN_CELL:
          case De.IN_TEMPLATE:
            Ke(this, e3);
            break;
          case De.TEXT:
          case De.IN_SELECT:
          case De.IN_SELECT_IN_TABLE:
            this._insertCharacters(e3);
            break;
          case De.IN_TABLE:
          case De.IN_TABLE_BODY:
          case De.IN_ROW:
            st(this, e3);
            break;
          case De.IN_TABLE_TEXT:
            ot(this, e3);
            break;
          case De.IN_COLUMN_GROUP:
            ht(this, e3);
            break;
          case De.AFTER_BODY:
            It(this, e3);
            break;
          case De.AFTER_AFTER_BODY:
            Ct(this, e3);
        }
    }
    onNullCharacter(e3) {
      if (this.skipNextNewLine = false, this.tokenizer.inForeignNode)
        !function(e4, t2) {
          t2.chars = s, e4._insertCharacters(t2);
        }(this, e3);
      else
        switch (this.insertionMode) {
          case De.INITIAL:
            ye(this, e3);
            break;
          case De.BEFORE_HTML:
            Ge(this, e3);
            break;
          case De.BEFORE_HEAD:
            we(this, e3);
            break;
          case De.IN_HEAD:
            ve(this, e3);
            break;
          case De.IN_HEAD_NO_SCRIPT:
            Qe(this, e3);
            break;
          case De.AFTER_HEAD:
            qe(this, e3);
            break;
          case De.TEXT:
            this._insertCharacters(e3);
            break;
          case De.IN_TABLE:
          case De.IN_TABLE_BODY:
          case De.IN_ROW:
            st(this, e3);
            break;
          case De.IN_COLUMN_GROUP:
            ht(this, e3);
            break;
          case De.AFTER_BODY:
            It(this, e3);
            break;
          case De.AFTER_AFTER_BODY:
            Ct(this, e3);
        }
    }
    onComment(e3) {
      if (this.skipNextNewLine = false, this.currentNotInHTML)
        Fe(this, e3);
      else
        switch (this.insertionMode) {
          case De.INITIAL:
          case De.BEFORE_HTML:
          case De.BEFORE_HEAD:
          case De.IN_HEAD:
          case De.IN_HEAD_NO_SCRIPT:
          case De.AFTER_HEAD:
          case De.IN_BODY:
          case De.IN_TABLE:
          case De.IN_CAPTION:
          case De.IN_COLUMN_GROUP:
          case De.IN_TABLE_BODY:
          case De.IN_ROW:
          case De.IN_CELL:
          case De.IN_SELECT:
          case De.IN_SELECT_IN_TABLE:
          case De.IN_TEMPLATE:
          case De.IN_FRAMESET:
          case De.AFTER_FRAMESET:
            Fe(this, e3);
            break;
          case De.IN_TABLE_TEXT:
            ct(this, e3);
            break;
          case De.AFTER_BODY:
            !function(e4, t2) {
              e4._appendCommentNode(t2, e4.openElements.items[0]);
            }(this, e3);
            break;
          case De.AFTER_AFTER_BODY:
          case De.AFTER_AFTER_FRAMESET:
            !function(e4, t2) {
              e4._appendCommentNode(t2, e4.document);
            }(this, e3);
        }
    }
    onDoctype(e3) {
      switch (this.skipNextNewLine = false, this.insertionMode) {
        case De.INITIAL:
          !function(e4, t2) {
            e4._setDocumentType(t2);
            const s2 = t2.forceQuirks ? I.QUIRKS : function(e5) {
              if (e5.name !== se)
                return I.QUIRKS;
              const { systemId: t3 } = e5;
              if (t3 && "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd" === t3.toLowerCase())
                return I.QUIRKS;
              let { publicId: s3 } = e5;
              if (null !== s3) {
                if (s3 = s3.toLowerCase(), ne.has(s3))
                  return I.QUIRKS;
                let e6 = null === t3 ? re : ae;
                if (ce(s3, e6))
                  return I.QUIRKS;
                if (e6 = null === t3 ? ie : oe, ce(s3, e6))
                  return I.LIMITED_QUIRKS;
              }
              return I.NO_QUIRKS;
            }(t2);
            ((function(e5) {
              return e5.name === se && null === e5.publicId && (null === e5.systemId || "about:legacy-compat" === e5.systemId);
            }))(t2) || e4._err(t2, T.nonConformingDoctype), e4.treeAdapter.setDocumentMode(e4.document, s2), e4.insertionMode = De.BEFORE_HTML;
          }(this, e3);
          break;
        case De.BEFORE_HEAD:
        case De.IN_HEAD:
        case De.IN_HEAD_NO_SCRIPT:
        case De.AFTER_HEAD:
          this._err(e3, T.misplacedDoctype);
          break;
        case De.IN_TABLE_TEXT:
          ct(this, e3);
      }
    }
    onStartTag(e3) {
      this.skipNextNewLine = false, this.currentToken = e3, this._processStartTag(e3), e3.selfClosing && !e3.ackSelfClosing && this._err(e3, T.nonVoidHtmlElementStartTagWithTrailingSolidus);
    }
    _processStartTag(e3) {
      this.shouldProcessStartTagTokenInForeignContent(e3) ? function(e4, t2) {
        if (function(e5) {
          const t3 = e5.tagID;
          return t3 === S.FONT && e5.attrs.some(({ name: e6 }) => e6 === N.COLOR || e6 === N.SIZE || e6 === N.FACE) || de.has(t3);
        }(t2))
          St(e4), e4._startTagOutsideForeignContent(t2);
        else {
          const s2 = e4._getAdjustedCurrentElement(), a2 = e4.treeAdapter.getNamespaceURI(s2);
          a2 === u.MATHML ? pe(t2) : a2 === u.SVG && (function(e5) {
            const t3 = me.get(e5.tagName);
            null != t3 && (e5.tagName = t3, e5.tagID = O(e5.tagName));
          }(t2), ue(t2)), Ne(t2), t2.selfClosing ? e4._appendElement(t2, a2) : e4._insertElement(t2, a2), t2.ackSelfClosing = true;
        }
      }(this, e3) : this._startTagOutsideForeignContent(e3);
    }
    _startTagOutsideForeignContent(e3) {
      switch (this.insertionMode) {
        case De.INITIAL:
          ye(this, e3);
          break;
        case De.BEFORE_HTML:
          !function(e4, t2) {
            t2.tagID === S.HTML ? (e4._insertElement(t2, u.HTML), e4.insertionMode = De.BEFORE_HEAD) : Ge(e4, t2);
          }(this, e3);
          break;
        case De.BEFORE_HEAD:
          !function(e4, t2) {
            switch (t2.tagID) {
              case S.HTML:
                Ze(e4, t2);
                break;
              case S.HEAD:
                e4._insertElement(t2, u.HTML), e4.headElement = e4.openElements.current, e4.insertionMode = De.IN_HEAD;
                break;
              default:
                we(e4, t2);
            }
          }(this, e3);
          break;
        case De.IN_HEAD:
          xe(this, e3);
          break;
        case De.IN_HEAD_NO_SCRIPT:
          !function(e4, t2) {
            switch (t2.tagID) {
              case S.HTML:
                Ze(e4, t2);
                break;
              case S.BASEFONT:
              case S.BGSOUND:
              case S.HEAD:
              case S.LINK:
              case S.META:
              case S.NOFRAMES:
              case S.STYLE:
                xe(e4, t2);
                break;
              case S.NOSCRIPT:
                e4._err(t2, T.nestedNoscriptInHead);
                break;
              default:
                Qe(e4, t2);
            }
          }(this, e3);
          break;
        case De.AFTER_HEAD:
          !function(e4, t2) {
            switch (t2.tagID) {
              case S.HTML:
                Ze(e4, t2);
                break;
              case S.BODY:
                e4._insertElement(t2, u.HTML), e4.framesetOk = false, e4.insertionMode = De.IN_BODY;
                break;
              case S.FRAMESET:
                e4._insertElement(t2, u.HTML), e4.insertionMode = De.IN_FRAMESET;
                break;
              case S.BASE:
              case S.BASEFONT:
              case S.BGSOUND:
              case S.LINK:
              case S.META:
              case S.NOFRAMES:
              case S.SCRIPT:
              case S.STYLE:
              case S.TEMPLATE:
              case S.TITLE:
                e4._err(t2, T.abandonedHeadElementChild), e4.openElements.push(e4.headElement, S.HEAD), xe(e4, t2), e4.openElements.remove(e4.headElement);
                break;
              case S.HEAD:
                e4._err(t2, T.misplacedStartTagForHeadElement);
                break;
              default:
                qe(e4, t2);
            }
          }(this, e3);
          break;
        case De.IN_BODY:
          Ze(this, e3);
          break;
        case De.IN_TABLE:
          at(this, e3);
          break;
        case De.IN_TABLE_TEXT:
          ct(this, e3);
          break;
        case De.IN_CAPTION:
          !function(e4, t2) {
            const s2 = t2.tagID;
            Et.has(s2) ? e4.openElements.hasInTableScope(S.CAPTION) && (e4.openElements.generateImpliedEndTags(), e4.openElements.popUntilTagNamePopped(S.CAPTION), e4.activeFormattingElements.clearToLastMarker(), e4.insertionMode = De.IN_TABLE, at(e4, t2)) : Ze(e4, t2);
          }(this, e3);
          break;
        case De.IN_COLUMN_GROUP:
          Tt(this, e3);
          break;
        case De.IN_TABLE_BODY:
          _t(this, e3);
          break;
        case De.IN_ROW:
          lt(this, e3);
          break;
        case De.IN_CELL:
          !function(e4, t2) {
            const s2 = t2.tagID;
            Et.has(s2) ? (e4.openElements.hasInTableScope(S.TD) || e4.openElements.hasInTableScope(S.TH)) && (e4._closeTableCell(), lt(e4, t2)) : Ze(e4, t2);
          }(this, e3);
          break;
        case De.IN_SELECT:
          dt(this, e3);
          break;
        case De.IN_SELECT_IN_TABLE:
          !function(e4, t2) {
            const s2 = t2.tagID;
            s2 === S.CAPTION || s2 === S.TABLE || s2 === S.TBODY || s2 === S.TFOOT || s2 === S.THEAD || s2 === S.TR || s2 === S.TD || s2 === S.TH ? (e4.openElements.popUntilTagNamePopped(S.SELECT), e4._resetInsertionMode(), e4._processStartTag(t2)) : dt(e4, t2);
          }(this, e3);
          break;
        case De.IN_TEMPLATE:
          !function(e4, t2) {
            switch (t2.tagID) {
              case S.BASE:
              case S.BASEFONT:
              case S.BGSOUND:
              case S.LINK:
              case S.META:
              case S.NOFRAMES:
              case S.SCRIPT:
              case S.STYLE:
              case S.TEMPLATE:
              case S.TITLE:
                xe(e4, t2);
                break;
              case S.CAPTION:
              case S.COLGROUP:
              case S.TBODY:
              case S.TFOOT:
              case S.THEAD:
                e4.tmplInsertionModeStack[0] = De.IN_TABLE, e4.insertionMode = De.IN_TABLE, at(e4, t2);
                break;
              case S.COL:
                e4.tmplInsertionModeStack[0] = De.IN_COLUMN_GROUP, e4.insertionMode = De.IN_COLUMN_GROUP, Tt(e4, t2);
                break;
              case S.TR:
                e4.tmplInsertionModeStack[0] = De.IN_TABLE_BODY, e4.insertionMode = De.IN_TABLE_BODY, _t(e4, t2);
                break;
              case S.TD:
              case S.TH:
                e4.tmplInsertionModeStack[0] = De.IN_ROW, e4.insertionMode = De.IN_ROW, lt(e4, t2);
                break;
              default:
                e4.tmplInsertionModeStack[0] = De.IN_BODY, e4.insertionMode = De.IN_BODY, Ze(e4, t2);
            }
          }(this, e3);
          break;
        case De.AFTER_BODY:
          !function(e4, t2) {
            t2.tagID === S.HTML ? Ze(e4, t2) : It(e4, t2);
          }(this, e3);
          break;
        case De.IN_FRAMESET:
          !function(e4, t2) {
            switch (t2.tagID) {
              case S.HTML:
                Ze(e4, t2);
                break;
              case S.FRAMESET:
                e4._insertElement(t2, u.HTML);
                break;
              case S.FRAME:
                e4._appendElement(t2, u.HTML), t2.ackSelfClosing = true;
                break;
              case S.NOFRAMES:
                xe(e4, t2);
            }
          }(this, e3);
          break;
        case De.AFTER_FRAMESET:
          !function(e4, t2) {
            switch (t2.tagID) {
              case S.HTML:
                Ze(e4, t2);
                break;
              case S.NOFRAMES:
                xe(e4, t2);
            }
          }(this, e3);
          break;
        case De.AFTER_AFTER_BODY:
          !function(e4, t2) {
            t2.tagID === S.HTML ? Ze(e4, t2) : Ct(e4, t2);
          }(this, e3);
          break;
        case De.AFTER_AFTER_FRAMESET:
          !function(e4, t2) {
            switch (t2.tagID) {
              case S.HTML:
                Ze(e4, t2);
                break;
              case S.NOFRAMES:
                xe(e4, t2);
            }
          }(this, e3);
      }
    }
    onEndTag(e3) {
      this.skipNextNewLine = false, this.currentToken = e3, this.currentNotInHTML ? function(e4, t2) {
        if (t2.tagID === S.P || t2.tagID === S.BR)
          return St(e4), void e4._endTagOutsideForeignContent(t2);
        for (let s2 = e4.openElements.stackTop; s2 > 0; s2--) {
          const a2 = e4.openElements.items[s2];
          if (e4.treeAdapter.getNamespaceURI(a2) === u.HTML) {
            e4._endTagOutsideForeignContent(t2);
            break;
          }
          const r2 = e4.treeAdapter.getTagName(a2);
          if (r2.toLowerCase() === t2.tagName) {
            t2.tagName = r2, e4.openElements.shortenToLength(s2);
            break;
          }
        }
      }(this, e3) : this._endTagOutsideForeignContent(e3);
    }
    _endTagOutsideForeignContent(e3) {
      switch (this.insertionMode) {
        case De.INITIAL:
          ye(this, e3);
          break;
        case De.BEFORE_HTML:
          !function(e4, t2) {
            const s2 = t2.tagID;
            s2 !== S.HTML && s2 !== S.HEAD && s2 !== S.BODY && s2 !== S.BR || Ge(e4, t2);
          }(this, e3);
          break;
        case De.BEFORE_HEAD:
          !function(e4, t2) {
            const s2 = t2.tagID;
            s2 === S.HEAD || s2 === S.BODY || s2 === S.HTML || s2 === S.BR ? we(e4, t2) : e4._err(t2, T.endTagWithoutMatchingOpenElement);
          }(this, e3);
          break;
        case De.IN_HEAD:
          !function(e4, t2) {
            switch (t2.tagID) {
              case S.HEAD:
                e4.openElements.pop(), e4.insertionMode = De.AFTER_HEAD;
                break;
              case S.BODY:
              case S.BR:
              case S.HTML:
                ve(e4, t2);
                break;
              case S.TEMPLATE:
                Ye(e4, t2);
                break;
              default:
                e4._err(t2, T.endTagWithoutMatchingOpenElement);
            }
          }(this, e3);
          break;
        case De.IN_HEAD_NO_SCRIPT:
          !function(e4, t2) {
            switch (t2.tagID) {
              case S.NOSCRIPT:
                e4.openElements.pop(), e4.insertionMode = De.IN_HEAD;
                break;
              case S.BR:
                Qe(e4, t2);
                break;
              default:
                e4._err(t2, T.endTagWithoutMatchingOpenElement);
            }
          }(this, e3);
          break;
        case De.AFTER_HEAD:
          !function(e4, t2) {
            switch (t2.tagID) {
              case S.BODY:
              case S.HTML:
              case S.BR:
                qe(e4, t2);
                break;
              case S.TEMPLATE:
                Ye(e4, t2);
                break;
              default:
                e4._err(t2, T.endTagWithoutMatchingOpenElement);
            }
          }(this, e3);
          break;
        case De.IN_BODY:
          et(this, e3);
          break;
        case De.TEXT:
          !function(e4, t2) {
            var s2;
            t2.tagID === S.SCRIPT && (null === (s2 = e4.scriptHandler) || void 0 === s2 || s2.call(e4, e4.openElements.current)), e4.openElements.pop(), e4.insertionMode = e4.originalInsertionMode;
          }(this, e3);
          break;
        case De.IN_TABLE:
          rt(this, e3);
          break;
        case De.IN_TABLE_TEXT:
          ct(this, e3);
          break;
        case De.IN_CAPTION:
          !function(e4, t2) {
            const s2 = t2.tagID;
            switch (s2) {
              case S.CAPTION:
              case S.TABLE:
                e4.openElements.hasInTableScope(S.CAPTION) && (e4.openElements.generateImpliedEndTags(), e4.openElements.popUntilTagNamePopped(S.CAPTION), e4.activeFormattingElements.clearToLastMarker(), e4.insertionMode = De.IN_TABLE, s2 === S.TABLE && rt(e4, t2));
                break;
              case S.BODY:
              case S.COL:
              case S.COLGROUP:
              case S.HTML:
              case S.TBODY:
              case S.TD:
              case S.TFOOT:
              case S.TH:
              case S.THEAD:
              case S.TR:
                break;
              default:
                et(e4, t2);
            }
          }(this, e3);
          break;
        case De.IN_COLUMN_GROUP:
          !function(e4, t2) {
            switch (t2.tagID) {
              case S.COLGROUP:
                e4.openElements.currentTagId === S.COLGROUP && (e4.openElements.pop(), e4.insertionMode = De.IN_TABLE);
                break;
              case S.TEMPLATE:
                Ye(e4, t2);
                break;
              case S.COL:
                break;
              default:
                ht(e4, t2);
            }
          }(this, e3);
          break;
        case De.IN_TABLE_BODY:
          At(this, e3);
          break;
        case De.IN_ROW:
          mt(this, e3);
          break;
        case De.IN_CELL:
          !function(e4, t2) {
            const s2 = t2.tagID;
            switch (s2) {
              case S.TD:
              case S.TH:
                e4.openElements.hasInTableScope(s2) && (e4.openElements.generateImpliedEndTags(), e4.openElements.popUntilTagNamePopped(s2), e4.activeFormattingElements.clearToLastMarker(), e4.insertionMode = De.IN_ROW);
                break;
              case S.TABLE:
              case S.TBODY:
              case S.TFOOT:
              case S.THEAD:
              case S.TR:
                e4.openElements.hasInTableScope(s2) && (e4._closeTableCell(), mt(e4, t2));
                break;
              case S.BODY:
              case S.CAPTION:
              case S.COL:
              case S.COLGROUP:
              case S.HTML:
                break;
              default:
                et(e4, t2);
            }
          }(this, e3);
          break;
        case De.IN_SELECT:
          pt(this, e3);
          break;
        case De.IN_SELECT_IN_TABLE:
          !function(e4, t2) {
            const s2 = t2.tagID;
            s2 === S.CAPTION || s2 === S.TABLE || s2 === S.TBODY || s2 === S.TFOOT || s2 === S.THEAD || s2 === S.TR || s2 === S.TD || s2 === S.TH ? e4.openElements.hasInTableScope(s2) && (e4.openElements.popUntilTagNamePopped(S.SELECT), e4._resetInsertionMode(), e4.onEndTag(t2)) : pt(e4, t2);
          }(this, e3);
          break;
        case De.IN_TEMPLATE:
          !function(e4, t2) {
            t2.tagID === S.TEMPLATE && Ye(e4, t2);
          }(this, e3);
          break;
        case De.AFTER_BODY:
          Nt(this, e3);
          break;
        case De.IN_FRAMESET:
          !function(e4, t2) {
            t2.tagID !== S.FRAMESET || e4.openElements.isRootHtmlElementCurrent() || (e4.openElements.pop(), e4.fragmentContext || e4.openElements.currentTagId === S.FRAMESET || (e4.insertionMode = De.AFTER_FRAMESET));
          }(this, e3);
          break;
        case De.AFTER_FRAMESET:
          !function(e4, t2) {
            t2.tagID === S.HTML && (e4.insertionMode = De.AFTER_AFTER_FRAMESET);
          }(this, e3);
          break;
        case De.AFTER_AFTER_BODY:
          Ct(this, e3);
      }
    }
    onEof(e3) {
      switch (this.insertionMode) {
        case De.INITIAL:
          ye(this, e3);
          break;
        case De.BEFORE_HTML:
          Ge(this, e3);
          break;
        case De.BEFORE_HEAD:
          we(this, e3);
          break;
        case De.IN_HEAD:
          ve(this, e3);
          break;
        case De.IN_HEAD_NO_SCRIPT:
          Qe(this, e3);
          break;
        case De.AFTER_HEAD:
          qe(this, e3);
          break;
        case De.IN_BODY:
        case De.IN_TABLE:
        case De.IN_CAPTION:
        case De.IN_COLUMN_GROUP:
        case De.IN_TABLE_BODY:
        case De.IN_ROW:
        case De.IN_CELL:
        case De.IN_SELECT:
        case De.IN_SELECT_IN_TABLE:
          tt(this, e3);
          break;
        case De.TEXT:
          !function(e4, t2) {
            e4._err(t2, T.eofInElementThatCanContainOnlyText), e4.openElements.pop(), e4.insertionMode = e4.originalInsertionMode, e4.onEof(t2);
          }(this, e3);
          break;
        case De.IN_TABLE_TEXT:
          ct(this, e3);
          break;
        case De.IN_TEMPLATE:
          ut(this, e3);
          break;
        case De.AFTER_BODY:
        case De.IN_FRAMESET:
        case De.AFTER_FRAMESET:
        case De.AFTER_AFTER_BODY:
        case De.AFTER_AFTER_FRAMESET:
          Ue(this, e3);
      }
    }
    onWhitespaceCharacter(e3) {
      if (this.skipNextNewLine && (this.skipNextNewLine = false, e3.chars.charCodeAt(0) === a.LINE_FEED)) {
        if (1 === e3.chars.length)
          return;
        e3.chars = e3.chars.substr(1);
      }
      if (this.tokenizer.inForeignNode)
        this._insertCharacters(e3);
      else
        switch (this.insertionMode) {
          case De.IN_HEAD:
          case De.IN_HEAD_NO_SCRIPT:
          case De.AFTER_HEAD:
          case De.TEXT:
          case De.IN_COLUMN_GROUP:
          case De.IN_SELECT:
          case De.IN_SELECT_IN_TABLE:
          case De.IN_FRAMESET:
          case De.AFTER_FRAMESET:
            this._insertCharacters(e3);
            break;
          case De.IN_BODY:
          case De.IN_CAPTION:
          case De.IN_CELL:
          case De.IN_TEMPLATE:
          case De.AFTER_BODY:
          case De.AFTER_AFTER_BODY:
          case De.AFTER_AFTER_FRAMESET:
            Xe(this, e3);
            break;
          case De.IN_TABLE:
          case De.IN_TABLE_BODY:
          case De.IN_ROW:
            st(this, e3);
            break;
          case De.IN_TABLE_TEXT:
            it(this, e3);
        }
    }
  }
  function Me(e3, t2) {
    let s2 = e3.activeFormattingElements.getElementEntryInScopeWithTagName(t2.tagName);
    return s2 ? e3.openElements.contains(s2.element) ? e3.openElements.hasInScope(t2.tagID) || (s2 = null) : (e3.activeFormattingElements.removeEntry(s2), s2 = null) : $e(e3, t2), s2;
  }
  function ge(e3, t2) {
    let s2 = null, a2 = e3.openElements.stackTop;
    for (; a2 >= 0; a2--) {
      const r2 = e3.openElements.items[a2];
      if (r2 === t2.element)
        break;
      e3._isSpecialElement(r2, e3.openElements.tagIDs[a2]) && (s2 = r2);
    }
    return s2 || (e3.openElements.shortenToLength(a2 < 0 ? 0 : a2), e3.activeFormattingElements.removeEntry(t2)), s2;
  }
  function Pe(e3, t2, s2) {
    let a2 = t2, r2 = e3.openElements.getCommonAncestor(t2);
    for (let n2 = 0, i2 = r2; i2 !== s2; n2++, i2 = r2) {
      r2 = e3.openElements.getCommonAncestor(i2);
      const s3 = e3.activeFormattingElements.getElementEntry(i2), o2 = s3 && n2 >= Se;
      !s3 || o2 ? (o2 && e3.activeFormattingElements.removeEntry(s3), e3.openElements.remove(i2)) : (i2 = ke(e3, s3), a2 === t2 && (e3.activeFormattingElements.bookmark = s3), e3.treeAdapter.detachNode(a2), e3.treeAdapter.appendChild(i2, a2), a2 = i2);
    }
    return a2;
  }
  function ke(e3, t2) {
    const s2 = e3.treeAdapter.getNamespaceURI(t2.element), a2 = e3.treeAdapter.createElement(t2.token.tagName, s2, t2.token.attrs);
    return e3.openElements.replace(t2.element, a2), t2.element = a2, a2;
  }
  function be(e3, t2, s2) {
    const a2 = O(e3.treeAdapter.getTagName(t2));
    if (e3._isElementCausesFosterParenting(a2))
      e3._fosterParentElement(s2);
    else {
      const r2 = e3.treeAdapter.getNamespaceURI(t2);
      a2 === S.TEMPLATE && r2 === u.HTML && (t2 = e3.treeAdapter.getTemplateContent(t2)), e3.treeAdapter.appendChild(t2, s2);
    }
  }
  function Be(e3, t2, s2) {
    const a2 = e3.treeAdapter.getNamespaceURI(s2.element), { token: r2 } = s2, n2 = e3.treeAdapter.createElement(r2.tagName, a2, r2.attrs);
    e3._adoptNodes(t2, n2), e3.treeAdapter.appendChild(t2, n2), e3.activeFormattingElements.insertElementAfterBookmark(n2, r2), e3.activeFormattingElements.removeEntry(s2), e3.openElements.remove(s2.element), e3.openElements.insertAfter(t2, n2, r2.tagID);
  }
  function He(e3, t2) {
    for (let s2 = 0; s2 < Ce; s2++) {
      const s3 = Me(e3, t2);
      if (!s3)
        break;
      const a2 = ge(e3, s3);
      if (!a2)
        break;
      e3.activeFormattingElements.bookmark = s3;
      const r2 = Pe(e3, a2, s3.element), n2 = e3.openElements.getCommonAncestor(s3.element);
      e3.treeAdapter.detachNode(r2), n2 && be(e3, n2, r2), Be(e3, a2, s3);
    }
  }
  function Fe(e3, t2) {
    e3._appendCommentNode(t2, e3.openElements.currentTmplContentOrNode);
  }
  function Ue(e3, t2) {
    if (e3.stopped = true, t2.location) {
      const s2 = e3.fragmentContext ? 0 : 2;
      for (let a2 = e3.openElements.stackTop; a2 >= s2; a2--)
        e3._setEndLocation(e3.openElements.items[a2], t2);
      if (!e3.fragmentContext && e3.openElements.stackTop >= 0) {
        const s3 = e3.openElements.items[0], a2 = e3.treeAdapter.getNodeSourceCodeLocation(s3);
        if (a2 && !a2.endTag && (e3._setEndLocation(s3, t2), e3.openElements.stackTop >= 1)) {
          const s4 = e3.openElements.items[1], a3 = e3.treeAdapter.getNodeSourceCodeLocation(s4);
          a3 && !a3.endTag && e3._setEndLocation(s4, t2);
        }
      }
    }
  }
  function ye(e3, t2) {
    e3._err(t2, T.missingDoctype, true), e3.treeAdapter.setDocumentMode(e3.document, I.QUIRKS), e3.insertionMode = De.BEFORE_HTML, e3._processToken(t2);
  }
  function Ge(e3, t2) {
    e3._insertFakeRootElement(), e3.insertionMode = De.BEFORE_HEAD, e3._processToken(t2);
  }
  function we(e3, t2) {
    e3._insertFakeElement(C.HEAD, S.HEAD), e3.headElement = e3.openElements.current, e3.insertionMode = De.IN_HEAD, e3._processToken(t2);
  }
  function xe(e3, t2) {
    switch (t2.tagID) {
      case S.HTML:
        Ze(e3, t2);
        break;
      case S.BASE:
      case S.BASEFONT:
      case S.BGSOUND:
      case S.LINK:
      case S.META:
        e3._appendElement(t2, u.HTML), t2.ackSelfClosing = true;
        break;
      case S.TITLE:
        e3._switchToTextParsing(t2, k.RCDATA);
        break;
      case S.NOSCRIPT:
        e3.options.scriptingEnabled ? e3._switchToTextParsing(t2, k.RAWTEXT) : (e3._insertElement(t2, u.HTML), e3.insertionMode = De.IN_HEAD_NO_SCRIPT);
        break;
      case S.NOFRAMES:
      case S.STYLE:
        e3._switchToTextParsing(t2, k.RAWTEXT);
        break;
      case S.SCRIPT:
        e3._switchToTextParsing(t2, k.SCRIPT_DATA);
        break;
      case S.TEMPLATE:
        e3._insertTemplate(t2), e3.activeFormattingElements.insertMarker(), e3.framesetOk = false, e3.insertionMode = De.IN_TEMPLATE, e3.tmplInsertionModeStack.unshift(De.IN_TEMPLATE);
        break;
      case S.HEAD:
        e3._err(t2, T.misplacedStartTagForHeadElement);
        break;
      default:
        ve(e3, t2);
    }
  }
  function Ye(e3, t2) {
    e3.openElements.tmplCount > 0 ? (e3.openElements.generateImpliedEndTagsThoroughly(), e3.openElements.currentTagId !== S.TEMPLATE && e3._err(t2, T.closingOfElementWithOpenChildElements), e3.openElements.popUntilTagNamePopped(S.TEMPLATE), e3.activeFormattingElements.clearToLastMarker(), e3.tmplInsertionModeStack.shift(), e3._resetInsertionMode()) : e3._err(t2, T.endTagWithoutMatchingOpenElement);
  }
  function ve(e3, t2) {
    e3.openElements.pop(), e3.insertionMode = De.AFTER_HEAD, e3._processToken(t2);
  }
  function Qe(e3, t2) {
    const s2 = t2.type === h.EOF ? T.openElementsLeftAfterEof : T.disallowedContentInNoscriptInHead;
    e3._err(t2, s2), e3.openElements.pop(), e3.insertionMode = De.IN_HEAD, e3._processToken(t2);
  }
  function qe(e3, t2) {
    e3._insertFakeElement(C.BODY, S.BODY), e3.insertionMode = De.IN_BODY, We(e3, t2);
  }
  function We(e3, t2) {
    switch (t2.type) {
      case h.CHARACTER:
        Ke(e3, t2);
        break;
      case h.WHITESPACE_CHARACTER:
        Xe(e3, t2);
        break;
      case h.COMMENT:
        Fe(e3, t2);
        break;
      case h.START_TAG:
        Ze(e3, t2);
        break;
      case h.END_TAG:
        et(e3, t2);
        break;
      case h.EOF:
        tt(e3, t2);
    }
  }
  function Xe(e3, t2) {
    e3._reconstructActiveFormattingElements(), e3._insertCharacters(t2);
  }
  function Ke(e3, t2) {
    e3._reconstructActiveFormattingElements(), e3._insertCharacters(t2), e3.framesetOk = false;
  }
  function Ve(e3, t2) {
    e3._reconstructActiveFormattingElements(), e3._appendElement(t2, u.HTML), e3.framesetOk = false, t2.ackSelfClosing = true;
  }
  function ze(e3) {
    const t2 = A(e3, N.TYPE);
    return null != t2 && t2.toLowerCase() === Ie;
  }
  function je(e3, t2) {
    e3._switchToTextParsing(t2, k.RAWTEXT);
  }
  function Je(e3, t2) {
    e3._reconstructActiveFormattingElements(), e3._insertElement(t2, u.HTML);
  }
  function Ze(e3, t2) {
    switch (t2.tagID) {
      case S.I:
      case S.S:
      case S.B:
      case S.U:
      case S.EM:
      case S.TT:
      case S.BIG:
      case S.CODE:
      case S.FONT:
      case S.SMALL:
      case S.STRIKE:
      case S.STRONG:
        !function(e4, t3) {
          e4._reconstructActiveFormattingElements(), e4._insertElement(t3, u.HTML), e4.activeFormattingElements.pushElement(e4.openElements.current, t3);
        }(e3, t2);
        break;
      case S.A:
        !function(e4, t3) {
          const s2 = e4.activeFormattingElements.getElementEntryInScopeWithTagName(C.A);
          s2 && (He(e4, t3), e4.openElements.remove(s2.element), e4.activeFormattingElements.removeEntry(s2)), e4._reconstructActiveFormattingElements(), e4._insertElement(t3, u.HTML), e4.activeFormattingElements.pushElement(e4.openElements.current, t3);
        }(e3, t2);
        break;
      case S.H1:
      case S.H2:
      case S.H3:
      case S.H4:
      case S.H5:
      case S.H6:
        !function(e4, t3) {
          e4.openElements.hasInButtonScope(S.P) && e4._closePElement(), M(e4.openElements.currentTagId) && e4.openElements.pop(), e4._insertElement(t3, u.HTML);
        }(e3, t2);
        break;
      case S.P:
      case S.DL:
      case S.OL:
      case S.UL:
      case S.DIV:
      case S.DIR:
      case S.NAV:
      case S.MAIN:
      case S.MENU:
      case S.ASIDE:
      case S.CENTER:
      case S.FIGURE:
      case S.FOOTER:
      case S.HEADER:
      case S.HGROUP:
      case S.DIALOG:
      case S.DETAILS:
      case S.ADDRESS:
      case S.ARTICLE:
      case S.SECTION:
      case S.SUMMARY:
      case S.FIELDSET:
      case S.BLOCKQUOTE:
      case S.FIGCAPTION:
        !function(e4, t3) {
          e4.openElements.hasInButtonScope(S.P) && e4._closePElement(), e4._insertElement(t3, u.HTML);
        }(e3, t2);
        break;
      case S.LI:
      case S.DD:
      case S.DT:
        !function(e4, t3) {
          e4.framesetOk = false;
          const s2 = t3.tagID;
          for (let t4 = e4.openElements.stackTop; t4 >= 0; t4--) {
            const a2 = e4.openElements.tagIDs[t4];
            if (s2 === S.LI && a2 === S.LI || (s2 === S.DD || s2 === S.DT) && (a2 === S.DD || a2 === S.DT)) {
              e4.openElements.generateImpliedEndTagsWithExclusion(a2), e4.openElements.popUntilTagNamePopped(a2);
              break;
            }
            if (a2 !== S.ADDRESS && a2 !== S.DIV && a2 !== S.P && e4._isSpecialElement(e4.openElements.items[t4], a2))
              break;
          }
          e4.openElements.hasInButtonScope(S.P) && e4._closePElement(), e4._insertElement(t3, u.HTML);
        }(e3, t2);
        break;
      case S.BR:
      case S.IMG:
      case S.WBR:
      case S.AREA:
      case S.EMBED:
      case S.KEYGEN:
        Ve(e3, t2);
        break;
      case S.HR:
        !function(e4, t3) {
          e4.openElements.hasInButtonScope(S.P) && e4._closePElement(), e4._appendElement(t3, u.HTML), e4.framesetOk = false, t3.ackSelfClosing = true;
        }(e3, t2);
        break;
      case S.RB:
      case S.RTC:
        !function(e4, t3) {
          e4.openElements.hasInScope(S.RUBY) && e4.openElements.generateImpliedEndTags(), e4._insertElement(t3, u.HTML);
        }(e3, t2);
        break;
      case S.RT:
      case S.RP:
        !function(e4, t3) {
          e4.openElements.hasInScope(S.RUBY) && e4.openElements.generateImpliedEndTagsWithExclusion(S.RTC), e4._insertElement(t3, u.HTML);
        }(e3, t2);
        break;
      case S.PRE:
      case S.LISTING:
        !function(e4, t3) {
          e4.openElements.hasInButtonScope(S.P) && e4._closePElement(), e4._insertElement(t3, u.HTML), e4.skipNextNewLine = true, e4.framesetOk = false;
        }(e3, t2);
        break;
      case S.XMP:
        !function(e4, t3) {
          e4.openElements.hasInButtonScope(S.P) && e4._closePElement(), e4._reconstructActiveFormattingElements(), e4.framesetOk = false, e4._switchToTextParsing(t3, k.RAWTEXT);
        }(e3, t2);
        break;
      case S.SVG:
        !function(e4, t3) {
          e4._reconstructActiveFormattingElements(), ue(t3), Ne(t3), t3.selfClosing ? e4._appendElement(t3, u.SVG) : e4._insertElement(t3, u.SVG), t3.ackSelfClosing = true;
        }(e3, t2);
        break;
      case S.HTML:
        !function(e4, t3) {
          0 === e4.openElements.tmplCount && e4.treeAdapter.adoptAttributes(e4.openElements.items[0], t3.attrs);
        }(e3, t2);
        break;
      case S.BASE:
      case S.LINK:
      case S.META:
      case S.STYLE:
      case S.TITLE:
      case S.SCRIPT:
      case S.BGSOUND:
      case S.BASEFONT:
      case S.TEMPLATE:
        xe(e3, t2);
        break;
      case S.BODY:
        !function(e4, t3) {
          const s2 = e4.openElements.tryPeekProperlyNestedBodyElement();
          s2 && 0 === e4.openElements.tmplCount && (e4.framesetOk = false, e4.treeAdapter.adoptAttributes(s2, t3.attrs));
        }(e3, t2);
        break;
      case S.FORM:
        !function(e4, t3) {
          const s2 = e4.openElements.tmplCount > 0;
          e4.formElement && !s2 || (e4.openElements.hasInButtonScope(S.P) && e4._closePElement(), e4._insertElement(t3, u.HTML), s2 || (e4.formElement = e4.openElements.current));
        }(e3, t2);
        break;
      case S.NOBR:
        !function(e4, t3) {
          e4._reconstructActiveFormattingElements(), e4.openElements.hasInScope(S.NOBR) && (He(e4, t3), e4._reconstructActiveFormattingElements()), e4._insertElement(t3, u.HTML), e4.activeFormattingElements.pushElement(e4.openElements.current, t3);
        }(e3, t2);
        break;
      case S.MATH:
        !function(e4, t3) {
          e4._reconstructActiveFormattingElements(), pe(t3), Ne(t3), t3.selfClosing ? e4._appendElement(t3, u.MATHML) : e4._insertElement(t3, u.MATHML), t3.ackSelfClosing = true;
        }(e3, t2);
        break;
      case S.TABLE:
        !function(e4, t3) {
          e4.treeAdapter.getDocumentMode(e4.document) !== I.QUIRKS && e4.openElements.hasInButtonScope(S.P) && e4._closePElement(), e4._insertElement(t3, u.HTML), e4.framesetOk = false, e4.insertionMode = De.IN_TABLE;
        }(e3, t2);
        break;
      case S.INPUT:
        !function(e4, t3) {
          e4._reconstructActiveFormattingElements(), e4._appendElement(t3, u.HTML), ze(t3) || (e4.framesetOk = false), t3.ackSelfClosing = true;
        }(e3, t2);
        break;
      case S.PARAM:
      case S.TRACK:
      case S.SOURCE:
        !function(e4, t3) {
          e4._appendElement(t3, u.HTML), t3.ackSelfClosing = true;
        }(e3, t2);
        break;
      case S.IMAGE:
        !function(e4, t3) {
          t3.tagName = C.IMG, t3.tagID = S.IMG, Ve(e4, t3);
        }(e3, t2);
        break;
      case S.BUTTON:
        !function(e4, t3) {
          e4.openElements.hasInScope(S.BUTTON) && (e4.openElements.generateImpliedEndTags(), e4.openElements.popUntilTagNamePopped(S.BUTTON)), e4._reconstructActiveFormattingElements(), e4._insertElement(t3, u.HTML), e4.framesetOk = false;
        }(e3, t2);
        break;
      case S.APPLET:
      case S.OBJECT:
      case S.MARQUEE:
        !function(e4, t3) {
          e4._reconstructActiveFormattingElements(), e4._insertElement(t3, u.HTML), e4.activeFormattingElements.insertMarker(), e4.framesetOk = false;
        }(e3, t2);
        break;
      case S.IFRAME:
        !function(e4, t3) {
          e4.framesetOk = false, e4._switchToTextParsing(t3, k.RAWTEXT);
        }(e3, t2);
        break;
      case S.SELECT:
        !function(e4, t3) {
          e4._reconstructActiveFormattingElements(), e4._insertElement(t3, u.HTML), e4.framesetOk = false, e4.insertionMode = e4.insertionMode === De.IN_TABLE || e4.insertionMode === De.IN_CAPTION || e4.insertionMode === De.IN_TABLE_BODY || e4.insertionMode === De.IN_ROW || e4.insertionMode === De.IN_CELL ? De.IN_SELECT_IN_TABLE : De.IN_SELECT;
        }(e3, t2);
        break;
      case S.OPTION:
      case S.OPTGROUP:
        !function(e4, t3) {
          e4.openElements.currentTagId === S.OPTION && e4.openElements.pop(), e4._reconstructActiveFormattingElements(), e4._insertElement(t3, u.HTML);
        }(e3, t2);
        break;
      case S.NOEMBED:
        je(e3, t2);
        break;
      case S.FRAMESET:
        !function(e4, t3) {
          const s2 = e4.openElements.tryPeekProperlyNestedBodyElement();
          e4.framesetOk && s2 && (e4.treeAdapter.detachNode(s2), e4.openElements.popAllUpToHtmlElement(), e4._insertElement(t3, u.HTML), e4.insertionMode = De.IN_FRAMESET);
        }(e3, t2);
        break;
      case S.TEXTAREA:
        !function(e4, t3) {
          e4._insertElement(t3, u.HTML), e4.skipNextNewLine = true, e4.tokenizer.state = k.RCDATA, e4.originalInsertionMode = e4.insertionMode, e4.framesetOk = false, e4.insertionMode = De.TEXT;
        }(e3, t2);
        break;
      case S.NOSCRIPT:
        e3.options.scriptingEnabled ? je(e3, t2) : Je(e3, t2);
        break;
      case S.PLAINTEXT:
        !function(e4, t3) {
          e4.openElements.hasInButtonScope(S.P) && e4._closePElement(), e4._insertElement(t3, u.HTML), e4.tokenizer.state = k.PLAINTEXT;
        }(e3, t2);
        break;
      case S.COL:
      case S.TH:
      case S.TD:
      case S.TR:
      case S.HEAD:
      case S.FRAME:
      case S.TBODY:
      case S.TFOOT:
      case S.THEAD:
      case S.CAPTION:
      case S.COLGROUP:
        break;
      default:
        Je(e3, t2);
    }
  }
  function $e(e3, t2) {
    const s2 = t2.tagName, a2 = t2.tagID;
    for (let t3 = e3.openElements.stackTop; t3 > 0; t3--) {
      const r2 = e3.openElements.items[t3], n2 = e3.openElements.tagIDs[t3];
      if (a2 === n2 && (a2 !== S.UNKNOWN || e3.treeAdapter.getTagName(r2) === s2)) {
        e3.openElements.generateImpliedEndTagsWithExclusion(a2), e3.openElements.stackTop >= t3 && e3.openElements.shortenToLength(t3);
        break;
      }
      if (e3._isSpecialElement(r2, n2))
        break;
    }
  }
  function et(e3, t2) {
    switch (t2.tagID) {
      case S.A:
      case S.B:
      case S.I:
      case S.S:
      case S.U:
      case S.EM:
      case S.TT:
      case S.BIG:
      case S.CODE:
      case S.FONT:
      case S.NOBR:
      case S.SMALL:
      case S.STRIKE:
      case S.STRONG:
        He(e3, t2);
        break;
      case S.P:
        !function(e4) {
          e4.openElements.hasInButtonScope(S.P) || e4._insertFakeElement(C.P, S.P), e4._closePElement();
        }(e3);
        break;
      case S.DL:
      case S.UL:
      case S.OL:
      case S.DIR:
      case S.DIV:
      case S.NAV:
      case S.PRE:
      case S.MAIN:
      case S.MENU:
      case S.ASIDE:
      case S.BUTTON:
      case S.CENTER:
      case S.FIGURE:
      case S.FOOTER:
      case S.HEADER:
      case S.HGROUP:
      case S.DIALOG:
      case S.ADDRESS:
      case S.ARTICLE:
      case S.DETAILS:
      case S.SECTION:
      case S.SUMMARY:
      case S.LISTING:
      case S.FIELDSET:
      case S.BLOCKQUOTE:
      case S.FIGCAPTION:
        !function(e4, t3) {
          const s2 = t3.tagID;
          e4.openElements.hasInScope(s2) && (e4.openElements.generateImpliedEndTags(), e4.openElements.popUntilTagNamePopped(s2));
        }(e3, t2);
        break;
      case S.LI:
        !function(e4) {
          e4.openElements.hasInListItemScope(S.LI) && (e4.openElements.generateImpliedEndTagsWithExclusion(S.LI), e4.openElements.popUntilTagNamePopped(S.LI));
        }(e3);
        break;
      case S.DD:
      case S.DT:
        !function(e4, t3) {
          const s2 = t3.tagID;
          e4.openElements.hasInScope(s2) && (e4.openElements.generateImpliedEndTagsWithExclusion(s2), e4.openElements.popUntilTagNamePopped(s2));
        }(e3, t2);
        break;
      case S.H1:
      case S.H2:
      case S.H3:
      case S.H4:
      case S.H5:
      case S.H6:
        !function(e4) {
          e4.openElements.hasNumberedHeaderInScope() && (e4.openElements.generateImpliedEndTags(), e4.openElements.popUntilNumberedHeaderPopped());
        }(e3);
        break;
      case S.BR:
        !function(e4) {
          e4._reconstructActiveFormattingElements(), e4._insertFakeElement(C.BR, S.BR), e4.openElements.pop(), e4.framesetOk = false;
        }(e3);
        break;
      case S.BODY:
        !function(e4, t3) {
          if (e4.openElements.hasInScope(S.BODY) && (e4.insertionMode = De.AFTER_BODY, e4.options.sourceCodeLocationInfo)) {
            const s2 = e4.openElements.tryPeekProperlyNestedBodyElement();
            s2 && e4._setEndLocation(s2, t3);
          }
        }(e3, t2);
        break;
      case S.HTML:
        !function(e4, t3) {
          e4.openElements.hasInScope(S.BODY) && (e4.insertionMode = De.AFTER_BODY, Nt(e4, t3));
        }(e3, t2);
        break;
      case S.FORM:
        !function(e4) {
          const t3 = e4.openElements.tmplCount > 0, { formElement: s2 } = e4;
          t3 || (e4.formElement = null), (s2 || t3) && e4.openElements.hasInScope(S.FORM) && (e4.openElements.generateImpliedEndTags(), t3 ? e4.openElements.popUntilTagNamePopped(S.FORM) : s2 && e4.openElements.remove(s2));
        }(e3);
        break;
      case S.APPLET:
      case S.OBJECT:
      case S.MARQUEE:
        !function(e4, t3) {
          const s2 = t3.tagID;
          e4.openElements.hasInScope(s2) && (e4.openElements.generateImpliedEndTags(), e4.openElements.popUntilTagNamePopped(s2), e4.activeFormattingElements.clearToLastMarker());
        }(e3, t2);
        break;
      case S.TEMPLATE:
        Ye(e3, t2);
        break;
      default:
        $e(e3, t2);
    }
  }
  function tt(e3, t2) {
    e3.tmplInsertionModeStack.length > 0 ? ut(e3, t2) : Ue(e3, t2);
  }
  function st(e3, t2) {
    if (Oe.has(e3.openElements.currentTagId))
      switch (e3.pendingCharacterTokens.length = 0, e3.hasNonWhitespacePendingCharacterToken = false, e3.originalInsertionMode = e3.insertionMode, e3.insertionMode = De.IN_TABLE_TEXT, t2.type) {
        case h.CHARACTER:
          ot(e3, t2);
          break;
        case h.WHITESPACE_CHARACTER:
          it(e3, t2);
      }
    else
      nt(e3, t2);
  }
  function at(e3, t2) {
    switch (t2.tagID) {
      case S.TD:
      case S.TH:
      case S.TR:
        !function(e4, t3) {
          e4.openElements.clearBackToTableContext(), e4._insertFakeElement(C.TBODY, S.TBODY), e4.insertionMode = De.IN_TABLE_BODY, _t(e4, t3);
        }(e3, t2);
        break;
      case S.STYLE:
      case S.SCRIPT:
      case S.TEMPLATE:
        xe(e3, t2);
        break;
      case S.COL:
        !function(e4, t3) {
          e4.openElements.clearBackToTableContext(), e4._insertFakeElement(C.COLGROUP, S.COLGROUP), e4.insertionMode = De.IN_COLUMN_GROUP, Tt(e4, t3);
        }(e3, t2);
        break;
      case S.FORM:
        !function(e4, t3) {
          e4.formElement || 0 !== e4.openElements.tmplCount || (e4._insertElement(t3, u.HTML), e4.formElement = e4.openElements.current, e4.openElements.pop());
        }(e3, t2);
        break;
      case S.TABLE:
        !function(e4, t3) {
          e4.openElements.hasInTableScope(S.TABLE) && (e4.openElements.popUntilTagNamePopped(S.TABLE), e4._resetInsertionMode(), e4._processStartTag(t3));
        }(e3, t2);
        break;
      case S.TBODY:
      case S.TFOOT:
      case S.THEAD:
        !function(e4, t3) {
          e4.openElements.clearBackToTableContext(), e4._insertElement(t3, u.HTML), e4.insertionMode = De.IN_TABLE_BODY;
        }(e3, t2);
        break;
      case S.INPUT:
        !function(e4, t3) {
          ze(t3) ? e4._appendElement(t3, u.HTML) : nt(e4, t3), t3.ackSelfClosing = true;
        }(e3, t2);
        break;
      case S.CAPTION:
        !function(e4, t3) {
          e4.openElements.clearBackToTableContext(), e4.activeFormattingElements.insertMarker(), e4._insertElement(t3, u.HTML), e4.insertionMode = De.IN_CAPTION;
        }(e3, t2);
        break;
      case S.COLGROUP:
        !function(e4, t3) {
          e4.openElements.clearBackToTableContext(), e4._insertElement(t3, u.HTML), e4.insertionMode = De.IN_COLUMN_GROUP;
        }(e3, t2);
        break;
      default:
        nt(e3, t2);
    }
  }
  function rt(e3, t2) {
    switch (t2.tagID) {
      case S.TABLE:
        e3.openElements.hasInTableScope(S.TABLE) && (e3.openElements.popUntilTagNamePopped(S.TABLE), e3._resetInsertionMode());
        break;
      case S.TEMPLATE:
        Ye(e3, t2);
        break;
      case S.BODY:
      case S.CAPTION:
      case S.COL:
      case S.COLGROUP:
      case S.HTML:
      case S.TBODY:
      case S.TD:
      case S.TFOOT:
      case S.TH:
      case S.THEAD:
      case S.TR:
        break;
      default:
        nt(e3, t2);
    }
  }
  function nt(e3, t2) {
    const s2 = e3.fosterParentingEnabled;
    e3.fosterParentingEnabled = true, We(e3, t2), e3.fosterParentingEnabled = s2;
  }
  function it(e3, t2) {
    e3.pendingCharacterTokens.push(t2);
  }
  function ot(e3, t2) {
    e3.pendingCharacterTokens.push(t2), e3.hasNonWhitespacePendingCharacterToken = true;
  }
  function ct(e3, t2) {
    let s2 = 0;
    if (e3.hasNonWhitespacePendingCharacterToken)
      for (; s2 < e3.pendingCharacterTokens.length; s2++)
        nt(e3, e3.pendingCharacterTokens[s2]);
    else
      for (; s2 < e3.pendingCharacterTokens.length; s2++)
        e3._insertCharacters(e3.pendingCharacterTokens[s2]);
    e3.insertionMode = e3.originalInsertionMode, e3._processToken(t2);
  }
  const Et = /* @__PURE__ */ new Set([S.CAPTION, S.COL, S.COLGROUP, S.TBODY, S.TD, S.TFOOT, S.TH, S.THEAD, S.TR]);
  function Tt(e3, t2) {
    switch (t2.tagID) {
      case S.HTML:
        Ze(e3, t2);
        break;
      case S.COL:
        e3._appendElement(t2, u.HTML), t2.ackSelfClosing = true;
        break;
      case S.TEMPLATE:
        xe(e3, t2);
        break;
      default:
        ht(e3, t2);
    }
  }
  function ht(e3, t2) {
    e3.openElements.currentTagId === S.COLGROUP && (e3.openElements.pop(), e3.insertionMode = De.IN_TABLE, e3._processToken(t2));
  }
  function _t(e3, t2) {
    switch (t2.tagID) {
      case S.TR:
        e3.openElements.clearBackToTableBodyContext(), e3._insertElement(t2, u.HTML), e3.insertionMode = De.IN_ROW;
        break;
      case S.TH:
      case S.TD:
        e3.openElements.clearBackToTableBodyContext(), e3._insertFakeElement(C.TR, S.TR), e3.insertionMode = De.IN_ROW, lt(e3, t2);
        break;
      case S.CAPTION:
      case S.COL:
      case S.COLGROUP:
      case S.TBODY:
      case S.TFOOT:
      case S.THEAD:
        e3.openElements.hasTableBodyContextInTableScope() && (e3.openElements.clearBackToTableBodyContext(), e3.openElements.pop(), e3.insertionMode = De.IN_TABLE, at(e3, t2));
        break;
      default:
        at(e3, t2);
    }
  }
  function At(e3, t2) {
    const s2 = t2.tagID;
    switch (t2.tagID) {
      case S.TBODY:
      case S.TFOOT:
      case S.THEAD:
        e3.openElements.hasInTableScope(s2) && (e3.openElements.clearBackToTableBodyContext(), e3.openElements.pop(), e3.insertionMode = De.IN_TABLE);
        break;
      case S.TABLE:
        e3.openElements.hasTableBodyContextInTableScope() && (e3.openElements.clearBackToTableBodyContext(), e3.openElements.pop(), e3.insertionMode = De.IN_TABLE, rt(e3, t2));
        break;
      case S.BODY:
      case S.CAPTION:
      case S.COL:
      case S.COLGROUP:
      case S.HTML:
      case S.TD:
      case S.TH:
      case S.TR:
        break;
      default:
        rt(e3, t2);
    }
  }
  function lt(e3, t2) {
    switch (t2.tagID) {
      case S.TH:
      case S.TD:
        e3.openElements.clearBackToTableRowContext(), e3._insertElement(t2, u.HTML), e3.insertionMode = De.IN_CELL, e3.activeFormattingElements.insertMarker();
        break;
      case S.CAPTION:
      case S.COL:
      case S.COLGROUP:
      case S.TBODY:
      case S.TFOOT:
      case S.THEAD:
      case S.TR:
        e3.openElements.hasInTableScope(S.TR) && (e3.openElements.clearBackToTableRowContext(), e3.openElements.pop(), e3.insertionMode = De.IN_TABLE_BODY, _t(e3, t2));
        break;
      default:
        at(e3, t2);
    }
  }
  function mt(e3, t2) {
    switch (t2.tagID) {
      case S.TR:
        e3.openElements.hasInTableScope(S.TR) && (e3.openElements.clearBackToTableRowContext(), e3.openElements.pop(), e3.insertionMode = De.IN_TABLE_BODY);
        break;
      case S.TABLE:
        e3.openElements.hasInTableScope(S.TR) && (e3.openElements.clearBackToTableRowContext(), e3.openElements.pop(), e3.insertionMode = De.IN_TABLE_BODY, At(e3, t2));
        break;
      case S.TBODY:
      case S.TFOOT:
      case S.THEAD:
        (e3.openElements.hasInTableScope(t2.tagID) || e3.openElements.hasInTableScope(S.TR)) && (e3.openElements.clearBackToTableRowContext(), e3.openElements.pop(), e3.insertionMode = De.IN_TABLE_BODY, At(e3, t2));
        break;
      case S.BODY:
      case S.CAPTION:
      case S.COL:
      case S.COLGROUP:
      case S.HTML:
      case S.TD:
      case S.TH:
        break;
      default:
        rt(e3, t2);
    }
  }
  function dt(e3, t2) {
    switch (t2.tagID) {
      case S.HTML:
        Ze(e3, t2);
        break;
      case S.OPTION:
        e3.openElements.currentTagId === S.OPTION && e3.openElements.pop(), e3._insertElement(t2, u.HTML);
        break;
      case S.OPTGROUP:
        e3.openElements.currentTagId === S.OPTION && e3.openElements.pop(), e3.openElements.currentTagId === S.OPTGROUP && e3.openElements.pop(), e3._insertElement(t2, u.HTML);
        break;
      case S.INPUT:
      case S.KEYGEN:
      case S.TEXTAREA:
      case S.SELECT:
        e3.openElements.hasInSelectScope(S.SELECT) && (e3.openElements.popUntilTagNamePopped(S.SELECT), e3._resetInsertionMode(), t2.tagID !== S.SELECT && e3._processStartTag(t2));
        break;
      case S.SCRIPT:
      case S.TEMPLATE:
        xe(e3, t2);
    }
  }
  function pt(e3, t2) {
    switch (t2.tagID) {
      case S.OPTGROUP:
        e3.openElements.stackTop > 0 && e3.openElements.currentTagId === S.OPTION && e3.openElements.tagIDs[e3.openElements.stackTop - 1] === S.OPTGROUP && e3.openElements.pop(), e3.openElements.currentTagId === S.OPTGROUP && e3.openElements.pop();
        break;
      case S.OPTION:
        e3.openElements.currentTagId === S.OPTION && e3.openElements.pop();
        break;
      case S.SELECT:
        e3.openElements.hasInSelectScope(S.SELECT) && (e3.openElements.popUntilTagNamePopped(S.SELECT), e3._resetInsertionMode());
        break;
      case S.TEMPLATE:
        Ye(e3, t2);
    }
  }
  function ut(e3, t2) {
    e3.openElements.tmplCount > 0 ? (e3.openElements.popUntilTagNamePopped(S.TEMPLATE), e3.activeFormattingElements.clearToLastMarker(), e3.tmplInsertionModeStack.shift(), e3._resetInsertionMode(), e3.onEof(t2)) : Ue(e3, t2);
  }
  function Nt(e3, t2) {
    var s2;
    if (t2.tagID === S.HTML) {
      if (e3.fragmentContext || (e3.insertionMode = De.AFTER_AFTER_BODY), e3.options.sourceCodeLocationInfo && e3.openElements.tagIDs[0] === S.HTML) {
        e3._setEndLocation(e3.openElements.items[0], t2);
        const a2 = e3.openElements.items[1];
        a2 && !(null === (s2 = e3.treeAdapter.getNodeSourceCodeLocation(a2)) || void 0 === s2 ? void 0 : s2.endTag) && e3._setEndLocation(a2, t2);
      }
    } else
      It(e3, t2);
  }
  function It(e3, t2) {
    e3.insertionMode = De.IN_BODY, We(e3, t2);
  }
  function Ct(e3, t2) {
    e3.insertionMode = De.IN_BODY, We(e3, t2);
  }
  function St(e3) {
    for (; e3.treeAdapter.getNamespaceURI(e3.openElements.current) !== u.HTML && !e3._isIntegrationPoint(e3.openElements.currentTagId, e3.openElements.current); )
      e3.openElements.pop();
  }
  return /* @__PURE__ */ new Set([C.AREA, C.BASE, C.BASEFONT, C.BGSOUND, C.BR, C.COL, C.EMBED, C.FRAME, C.HR, C.IMG, C.INPUT, C.KEYGEN, C.LINK, C.META, C.PARAM, C.SOURCE, C.TRACK, C.WBR]), e2.parse = function(e3, t2) {
    return Le.parse(e3, t2);
  }, e2.parseFragment = function(e3, t2, s2) {
    "string" == typeof e3 && (s2 = t2, t2 = e3, e3 = null);
    const a2 = Le.getFragmentParser(e3, s2);
    return a2.tokenizer.write(t2, true), a2.getFragment();
  }, Object.defineProperty(e2, "__esModule", { value: true }), e2;
}({});
var parse = e.parse;
var parseFragment = e.parseFragment;

// src/mock-doc/parse-util.ts
var docParser = /* @__PURE__ */ new WeakMap();
function parseDocumentUtil(ownerDocument, html) {
  const doc = parse(html.trim(), getParser(ownerDocument));
  doc.documentElement = doc.firstElementChild;
  doc.head = doc.documentElement.firstElementChild;
  doc.body = doc.head.nextElementSibling;
  return doc;
}
function parseFragmentUtil(ownerDocument, html) {
  if (typeof html === "string") {
    html = html.trim();
  } else {
    html = "";
  }
  const frag = parseFragment(html, getParser(ownerDocument));
  return frag;
}
function getParser(ownerDocument) {
  let parseOptions = docParser.get(ownerDocument);
  if (parseOptions != null) {
    return parseOptions;
  }
  const treeAdapter = {
    createDocument() {
      const doc = ownerDocument.createElement("#document" /* DOCUMENT_NODE */);
      doc["x-mode"] = "no-quirks";
      return doc;
    },
    setNodeSourceCodeLocation(node, location2) {
      node.sourceCodeLocation = location2;
    },
    getNodeSourceCodeLocation(node) {
      return node.sourceCodeLocation;
    },
    createDocumentFragment() {
      return ownerDocument.createDocumentFragment();
    },
    createElement(tagName, namespaceURI, attrs) {
      const elm = ownerDocument.createElementNS(namespaceURI, tagName);
      for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if (attr.namespace == null || attr.namespace === "http://www.w3.org/1999/xhtml") {
          elm.setAttribute(attr.name, attr.value);
        } else {
          elm.setAttributeNS(attr.namespace, attr.name, attr.value);
        }
      }
      return elm;
    },
    createCommentNode(data) {
      return ownerDocument.createComment(data);
    },
    appendChild(parentNode, newNode) {
      parentNode.appendChild(newNode);
    },
    insertBefore(parentNode, newNode, referenceNode) {
      parentNode.insertBefore(newNode, referenceNode);
    },
    setTemplateContent(templateElement, contentElement) {
      templateElement.content = contentElement;
    },
    getTemplateContent(templateElement) {
      return templateElement.content;
    },
    setDocumentType(doc, name, publicId, systemId) {
      let doctypeNode = doc.childNodes.find((n) => n.nodeType === 10 /* DOCUMENT_TYPE_NODE */);
      if (doctypeNode == null) {
        doctypeNode = ownerDocument.createDocumentTypeNode();
        doc.insertBefore(doctypeNode, doc.firstChild);
      }
      doctypeNode.nodeValue = "!DOCTYPE";
      doctypeNode["x-name"] = name;
      doctypeNode["x-publicId"] = publicId;
      doctypeNode["x-systemId"] = systemId;
    },
    setDocumentMode(doc, mode) {
      doc["x-mode"] = mode;
    },
    getDocumentMode(doc) {
      return doc["x-mode"];
    },
    detachNode(node) {
      node.remove();
    },
    insertText(parentNode, text) {
      const lastChild = parentNode.lastChild;
      if (lastChild != null && lastChild.nodeType === 3 /* TEXT_NODE */) {
        lastChild.nodeValue += text;
      } else {
        parentNode.appendChild(ownerDocument.createTextNode(text));
      }
    },
    insertTextBefore(parentNode, text, referenceNode) {
      const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
      if (prevNode != null && prevNode.nodeType === 3 /* TEXT_NODE */) {
        prevNode.nodeValue += text;
      } else {
        parentNode.insertBefore(ownerDocument.createTextNode(text), referenceNode);
      }
    },
    adoptAttributes(recipient, attrs) {
      for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if (recipient.hasAttributeNS(attr.namespace, attr.name) === false) {
          recipient.setAttributeNS(attr.namespace, attr.name, attr.value);
        }
      }
    },
    getFirstChild(node) {
      return node.childNodes[0];
    },
    getChildNodes(node) {
      return node.childNodes;
    },
    getParentNode(node) {
      return node.parentNode;
    },
    getAttrList(element) {
      const attrs = element.attributes.__items.map((attr) => {
        return {
          name: attr.name,
          value: attr.value,
          namespace: attr.namespaceURI,
          prefix: null
        };
      });
      return attrs;
    },
    getTagName(element) {
      if (element.namespaceURI === "http://www.w3.org/1999/xhtml") {
        return element.nodeName.toLowerCase();
      } else {
        return element.nodeName;
      }
    },
    getNamespaceURI(element) {
      return element.namespaceURI;
    },
    getTextNodeContent(textNode) {
      return textNode.nodeValue;
    },
    getCommentNodeContent(commentNode) {
      return commentNode.nodeValue;
    },
    getDocumentTypeNodeName(doctypeNode) {
      return doctypeNode["x-name"];
    },
    getDocumentTypeNodePublicId(doctypeNode) {
      return doctypeNode["x-publicId"];
    },
    getDocumentTypeNodeSystemId(doctypeNode) {
      return doctypeNode["x-systemId"];
    },
    // @ts-ignore - a `MockNode` will never be assignable to a `TreeAdapterTypeMap['text']`. As a result, we cannot
    // complete this function signature
    isTextNode(node) {
      return node.nodeType === 3 /* TEXT_NODE */;
    },
    // @ts-ignore - a `MockNode` will never be assignable to a `TreeAdapterTypeMap['comment']`. As a result, we cannot
    // complete this function signature (which requires its return type to be a type predicate)
    isCommentNode(node) {
      return node.nodeType === 8 /* COMMENT_NODE */;
    },
    // @ts-ignore - a `MockNode` will never be assignable to a `TreeAdapterTypeMap['document']`. As a result, we cannot
    // complete this function signature (which requires its return type to be a type predicate)
    isDocumentTypeNode(node) {
      return node.nodeType === 10 /* DOCUMENT_TYPE_NODE */;
    },
    // @ts-ignore - a `MockNode` will never be assignable to a `TreeAdapterTypeMap['element']`. As a result, we cannot
    // complete this function signature (which requires its return type to be a type predicate)
    isElementNode(node) {
      return node.nodeType === 1 /* ELEMENT_NODE */;
    }
  };
  parseOptions = {
    treeAdapter
  };
  docParser.set(ownerDocument, parseOptions);
  return parseOptions;
}

// src/mock-doc/third-party/jquery.ts
var jquery_default = (
  /*!
  * jQuery JavaScript Library v4.0.0-pre+9352011a7.dirty +selector
  * https://jquery.com/
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license
  * https://jquery.org/license
  *
  * Date: 2023-12-11T17:55Z
  */
  function(global2, factory) {
    "use strict";
    if (true) {
      return factory(global2, true);
    } else {
      factory(global2);
    }
  }({
    document: {
      createElement() {
        return {};
      },
      nodeType: 9,
      documentElement: {
        nodeType: 1,
        nodeName: "HTML"
      }
    }
  }, function(window2, noGlobal) {
    "use strict";
    if (!window2.document) {
      throw new Error("jQuery requires a window with a document");
    }
    var arr = [];
    var getProto = Object.getPrototypeOf;
    var slice = arr.slice;
    var flat = arr.flat ? function(array) {
      return arr.flat.call(array);
    } : function(array) {
      return arr.concat.apply([], array);
    };
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);
    var support = {};
    function toType(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" ? class2type[toString.call(obj)] || "object" : typeof obj;
    }
    function isWindow(obj) {
      return obj != null && obj === obj.window;
    }
    function isArrayLike(obj) {
      var length = !!obj && obj.length, type = toType(obj);
      if (typeof obj === "function" || isWindow(obj)) {
        return false;
      }
      return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }
    var document = window2.document;
    var preservedScriptAttributes = {
      type: true,
      src: true,
      nonce: true,
      noModule: true
    };
    function DOMEval(code, node, doc) {
      doc = doc || document;
      var i2, script = doc.createElement("script");
      script.text = code;
      if (node) {
        for (i2 in preservedScriptAttributes) {
          if (node[i2]) {
            script[i2] = node[i2];
          }
        }
      }
      doc.head.appendChild(script).parentNode.removeChild(script);
    }
    const jQuery = {};
    var version = "4.0.0-pre+9352011a7.dirty +selector", rhtmlSuffix = /HTML$/i, jQueryOrig = function(selector, context) {
      return new jQuery.fn.init(selector, context);
    };
    jQuery.fn = jQuery.prototype = {
      // The current version of jQuery being used
      jquery: version,
      constructor: jQuery,
      // The default length of a jQuery object is 0
      length: 0,
      toArray: function() {
        return slice.call(this);
      },
      // Get the Nth element in the matched element set OR
      // Get the whole matched element set as a clean array
      get: function(num) {
        if (num == null) {
          return slice.call(this);
        }
        return num < 0 ? this[num + this.length] : this[num];
      },
      // Take an array of elements and push it onto the stack
      // (returning the new matched element set)
      pushStack: function(elems) {
        var ret = jQuery.merge(this.constructor(), elems);
        ret.prevObject = this;
        return ret;
      },
      // Execute a callback for every element in the matched set.
      each: function(callback) {
        return jQuery.each(this, callback);
      },
      map: function(callback) {
        return this.pushStack(jQuery.map(this, function(elem, i2) {
          return callback.call(elem, i2, elem);
        }));
      },
      slice: function() {
        return this.pushStack(slice.apply(this, arguments));
      },
      first: function() {
        return this.eq(0);
      },
      last: function() {
        return this.eq(-1);
      },
      even: function() {
        return this.pushStack(jQuery.grep(this, function(_elem, i2) {
          return (i2 + 1) % 2;
        }));
      },
      odd: function() {
        return this.pushStack(jQuery.grep(this, function(_elem, i2) {
          return i2 % 2;
        }));
      },
      eq: function(i2) {
        var len = this.length, j = +i2 + (i2 < 0 ? len : 0);
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
      },
      end: function() {
        return this.prevObject || this.constructor();
      }
    };
    jQuery.extend = jQuery.fn.extend = function() {
      var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i2 = 1, length = arguments.length, deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[i2] || {};
        i2++;
      }
      if (typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      if (i2 === length) {
        target = this;
        i2--;
      }
      for (; i2 < length; i2++) {
        if ((options = arguments[i2]) != null) {
          for (name in options) {
            copy = options[name];
            if (name === "__proto__" || target === copy) {
              continue;
            }
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
              src = target[name];
              if (copyIsArray && !Array.isArray(src)) {
                clone = [];
              } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                clone = {};
              } else {
                clone = src;
              }
              copyIsArray = false;
              target[name] = jQuery.extend(deep, clone, copy);
            } else if (copy !== void 0) {
              target[name] = copy;
            }
          }
        }
      }
      return target;
    };
    jQuery.extend({
      // Unique for each copy of jQuery on the page
      expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
      // Assume jQuery is ready without the ready module
      isReady: true,
      error: function(msg) {
        throw new Error(msg);
      },
      noop: function() {
      },
      isPlainObject: function(obj) {
        var proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") {
          return false;
        }
        proto = getProto(obj);
        if (!proto) {
          return true;
        }
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
      },
      isEmptyObject: function(obj) {
        var name;
        for (name in obj) {
          return false;
        }
        return true;
      },
      // Evaluates a script in a provided context; falls back to the global one
      // if not specified.
      globalEval: function(code, options, doc) {
        DOMEval(code, { nonce: options && options.nonce }, doc);
      },
      each: function(obj, callback) {
        var length, i2 = 0;
        if (isArrayLike(obj)) {
          length = obj.length;
          for (; i2 < length; i2++) {
            if (callback.call(obj[i2], i2, obj[i2]) === false) {
              break;
            }
          }
        } else {
          for (i2 in obj) {
            if (callback.call(obj[i2], i2, obj[i2]) === false) {
              break;
            }
          }
        }
        return obj;
      },
      // Retrieve the text value of an array of DOM nodes
      text: function(elem) {
        var node, ret = "", i2 = 0, nodeType = elem.nodeType;
        if (!nodeType) {
          while (node = elem[i2++]) {
            ret += jQuery.text(node);
          }
        }
        if (nodeType === 1 || nodeType === 11) {
          return elem.textContent;
        }
        if (nodeType === 9) {
          return elem.documentElement.textContent;
        }
        if (nodeType === 3 || nodeType === 4) {
          return elem.nodeValue;
        }
        return ret;
      },
      // results is for internal usage only
      makeArray: function(arr2, results) {
        var ret = results || [];
        if (arr2 != null) {
          if (isArrayLike(Object(arr2))) {
            jQuery.merge(
              ret,
              typeof arr2 === "string" ? [arr2] : arr2
            );
          } else {
            push.call(ret, arr2);
          }
        }
        return ret;
      },
      inArray: function(elem, arr2, i2) {
        return arr2 == null ? -1 : indexOf.call(arr2, elem, i2);
      },
      isXMLDoc: function(elem) {
        var namespace = elem && elem.namespaceURI, docElem = elem && (elem.ownerDocument || elem).documentElement;
        return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
      },
      // Note: an element does not contain itself
      contains: function(a, b) {
        var bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && // Support: IE 9 - 11+
        // IE doesn't have `contains` on SVG.
        (a.contains ? a.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      },
      merge: function(first, second) {
        var len = +second.length, j = 0, i2 = first.length;
        for (; j < len; j++) {
          first[i2++] = second[j];
        }
        first.length = i2;
        return first;
      },
      grep: function(elems, callback, invert) {
        var callbackInverse, matches3 = [], i2 = 0, length = elems.length, callbackExpect = !invert;
        for (; i2 < length; i2++) {
          callbackInverse = !callback(elems[i2], i2);
          if (callbackInverse !== callbackExpect) {
            matches3.push(elems[i2]);
          }
        }
        return matches3;
      },
      // arg is for internal usage only
      map: function(elems, callback, arg) {
        var length, value, i2 = 0, ret = [];
        if (isArrayLike(elems)) {
          length = elems.length;
          for (; i2 < length; i2++) {
            value = callback(elems[i2], i2, arg);
            if (value != null) {
              ret.push(value);
            }
          }
        } else {
          for (i2 in elems) {
            value = callback(elems[i2], i2, arg);
            if (value != null) {
              ret.push(value);
            }
          }
        }
        return flat(ret);
      },
      // A global GUID counter for objects
      guid: 1,
      // jQuery.support is not used in Core but other projects attach their
      // properties to it so it needs to exist.
      support
    });
    if (typeof Symbol === "function") {
      jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }
    jQuery.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
      function(_i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
      }
    );
    function nodeName(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    }
    var pop = arr.pop;
    var whitespace = "[\\x20\\t\\r\\n\\f]";
    var isIE = document.documentMode;
    try {
      document.querySelector(":has(*,:jqfake)");
      support.cssHas = false;
    } catch (e2) {
      support.cssHas = true;
    }
    var rbuggyQSA = [];
    if (isIE) {
      rbuggyQSA.push(
        // Support: IE 9 - 11+
        // IE's :disabled selector does not pick up the children of disabled fieldsets
        ":enabled",
        ":disabled",
        // Support: IE 11+
        // IE 11 doesn't find elements on a `[name='']` query in some cases.
        // Adding a temporary attribute to the document before the selection works
        // around the issue.
        "\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`
      );
    }
    if (!support.cssHas) {
      rbuggyQSA.push(":has");
    }
    rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
    var rtrimCSS = new RegExp(
      "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
      "g"
    );
    var identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+";
    var booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped";
    var rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*");
    var rdescend = new RegExp(whitespace + "|>");
    var rsibling = /[+~]/;
    var documentElement = document.documentElement;
    var matches2 = documentElement.matches || documentElement.msMatchesSelector;
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > jQuery.expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return cache[key + " "] = value;
      }
      return cache;
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    var attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
    "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
    `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]";
    var pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)";
    var filterMatchExpr = {
      ID: new RegExp("^#(" + identifier + ")"),
      CLASS: new RegExp("^\\.(" + identifier + ")"),
      TAG: new RegExp("^(" + identifier + "|[*])"),
      ATTR: new RegExp("^" + attributes),
      PSEUDO: new RegExp("^" + pseudos),
      CHILD: new RegExp(
        "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)",
        "i"
      )
    };
    var rpseudo = new RegExp(pseudos);
    var runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape, nonHex) {
      var high = "0x" + escape.slice(1) - 65536;
      if (nonHex) {
        return nonHex;
      }
      return high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
    };
    function unescapeSelector(sel) {
      return sel.replace(runescape, funescape);
    }
    function selectorError(msg) {
      jQuery.error("Syntax error, unrecognized expression: " + msg);
    }
    var rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*");
    var tokenCache = createCache();
    function tokenize(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = jQuery.expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        if (match = rleadingCombinator.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrimCSS, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in filterMatchExpr) {
          if ((match = jQuery.expr.match[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      if (parseOnly) {
        return soFar.length;
      }
      return soFar ? selectorError(selector) : (
        // Cache the tokens
        tokenCache(selector, groups).slice(0)
      );
    }
    var preFilter = {
      ATTR: function(match) {
        match[1] = unescapeSelector(match[1]);
        match[3] = unescapeSelector(match[3] || match[4] || match[5] || "");
        if (match[2] === "~=") {
          match[3] = " " + match[3] + " ";
        }
        return match.slice(0, 4);
      },
      CHILD: function(match) {
        match[1] = match[1].toLowerCase();
        if (match[1].slice(0, 3) === "nth") {
          if (!match[3]) {
            selectorError(match[0]);
          }
          match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
          match[5] = +(match[7] + match[8] || match[3] === "odd");
        } else if (match[3]) {
          selectorError(match[0]);
        }
        return match;
      },
      PSEUDO: function(match) {
        var excess, unquoted = !match[6] && match[2];
        if (filterMatchExpr.CHILD.test(match[0])) {
          return null;
        }
        if (match[3]) {
          match[2] = match[4] || match[5] || "";
        } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
        (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
        (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
          match[0] = match[0].slice(0, excess);
          match[2] = unquoted.slice(0, excess);
        }
        return match.slice(0, 3);
      }
    };
    function toSelector(tokens) {
      var i2 = 0, len = tokens.length, selector = "";
      for (; i2 < len; i2++) {
        selector += tokens[i2].value;
      }
      return selector;
    }
    var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    function fcssescape(ch, asCodePoint) {
      if (asCodePoint) {
        if (ch === "\0") {
          return "\uFFFD";
        }
        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
      }
      return "\\" + ch;
    }
    jQuery.escapeSelector = function(sel) {
      return (sel + "").replace(rcssescape, fcssescape);
    };
    var sort = arr.sort;
    var splice = arr.splice;
    var hasDuplicate;
    function sortOrder(a, b) {
      if (a === b) {
        hasDuplicate = true;
        return 0;
      }
      var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
      if (compare) {
        return compare;
      }
      compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : (
        // Otherwise we know they are disconnected
        1
      );
      if (compare & 1) {
        if (a == document || a.ownerDocument == document && jQuery.contains(document, a)) {
          return -1;
        }
        if (b == document || b.ownerDocument == document && jQuery.contains(document, b)) {
          return 1;
        }
        return 0;
      }
      return compare & 4 ? -1 : 1;
    }
    jQuery.uniqueSort = function(results) {
      var elem, duplicates = [], j = 0, i2 = 0;
      hasDuplicate = false;
      sort.call(results, sortOrder);
      if (hasDuplicate) {
        while (elem = results[i2++]) {
          if (elem === results[i2]) {
            j = duplicates.push(i2);
          }
        }
        while (j--) {
          splice.call(results, duplicates[j], 1);
        }
      }
      return results;
    };
    jQuery.fn.uniqueSort = function() {
      return this.pushStack(jQuery.uniqueSort(slice.apply(this)));
    };
    var i, outermostContext, document$1, documentElement$1, documentIsHTML, dirruns = 0, done = 0, classCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), rwhitespace = new RegExp(whitespace + "+", "g"), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = jQuery.extend({
      bool: new RegExp("^(?:" + booleans + ")$", "i"),
      // For use in libraries implementing .is()
      // We use this for POS matching in `select`
      needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
    }, filterMatchExpr), rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, unloadHandler = function() {
      setDocument();
    }, inDisabledFieldset = addCombinator(
      function(elem) {
        return elem.disabled === true && nodeName(elem, "fieldset");
      },
      { dir: "parentNode", next: "legend" }
    );
    function find(selector, context, results, seed) {
      var m, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (false) {
        setDocument(context);
        context = context || document$1;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            if (m = match[1]) {
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  push.call(results, elem);
                }
                return results;
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && jQuery.contains(context, elem)) {
                  push.call(results, elem);
                  return results;
                }
              }
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;
            } else if ((m = match[3]) && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            newSelector = selector;
            newContext = context;
            if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
              if (newContext != context || isIE) {
                if (nid = context.getAttribute("id")) {
                  nid = jQuery.escapeSelector(nid);
                } else {
                  context.setAttribute("id", nid = jQuery.expando);
                }
              }
              groups = tokenize(selector);
              i2 = groups.length;
              while (i2--) {
                groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
              }
              newSelector = groups.join(",");
            }
            try {
              push.apply(
                results,
                newContext.querySelectorAll(newSelector)
              );
              return results;
            } catch (qsaError) {
              nonnativeSelectorCache(selector, true);
            } finally {
              if (nid === jQuery.expando) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }
      return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
    }
    function markFunction(fn) {
      fn[jQuery.expando] = true;
      return fn;
    }
    function createInputPseudo(type) {
      return function(elem) {
        return nodeName(elem, "input") && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type;
      };
    }
    function createDisabledPseudo(disabled) {
      return function(elem) {
        if ("form" in elem) {
          if (elem.parentNode && elem.disabled === false) {
            if ("label" in elem) {
              if ("label" in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              } else {
                return elem.disabled === disabled;
              }
            }
            return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
            elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
          }
          return elem.disabled === disabled;
        } else if ("label" in elem) {
          return elem.disabled === disabled;
        }
        return false;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches3) {
          var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
          while (i2--) {
            if (seed[j = matchIndexes[i2]]) {
              seed[j] = !(matches3[j] = seed[j]);
            }
          }
        });
      });
    }
    function setDocument(node) {
      var subWindow, doc = node ? node.ownerDocument || node : document;
      if (doc == document$1 || doc.nodeType !== 9) {
        return;
      }
      document$1 = doc;
      documentElement$1 = document$1.documentElement;
      documentIsHTML = !jQuery.isXMLDoc(document$1);
      if (isIE && document != document$1 && (subWindow = document$1.defaultView) && subWindow.top !== subWindow) {
        subWindow.addEventListener("unload", unloadHandler);
      }
    }
    find.matches = function(expr, elements) {
      return find(expr, null, null, elements);
    };
    find.matchesSelector = function(elem, expr) {
      setDocument(elem);
      if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          return matches2.call(elem, expr);
        } catch (e2) {
          nonnativeSelectorCache(expr, true);
        }
      }
      return find(expr, document$1, null, [elem]).length > 0;
    };
    jQuery.expr = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      find: {
        ID: function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        },
        TAG: function(tag, context) {
          if (typeof context.getElementsByTagName !== "undefined") {
            return context.getElementsByTagName(tag);
          } else {
            return context.querySelectorAll(tag);
          }
        },
        CLASS: function(className, context) {
          if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
            return context.getElementsByClassName(className);
          }
        }
      },
      relative: {
        ">": { dir: "parentNode", first: true },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: true },
        "~": { dir: "previousSibling" }
      },
      preFilter,
      filter: {
        ID: function(id) {
          var attrId = unescapeSelector(id);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        },
        TAG: function(nodeNameSelector) {
          var expectedNodeName = unescapeSelector(nodeNameSelector).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return nodeName(elem, expectedNodeName);
          };
        },
        CLASS: function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(
              typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
            );
          });
        },
        ATTR: function(name, operator, check) {
          return function(elem) {
            var result = elem.getAttribute(name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            if (operator === "=") {
              return result === check;
            }
            if (operator === "!=") {
              return result !== check;
            }
            if (operator === "^=") {
              return check && result.indexOf(check) === 0;
            }
            if (operator === "*=") {
              return check && result.indexOf(check) > -1;
            }
            if (operator === "$=") {
              return check && result.slice(-check.length) === check;
            }
            if (operator === "~=") {
              return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
            }
            if (operator === "|=") {
              return result === check || result.slice(0, check.length + 1) === check + "-";
            }
            return false;
          };
        },
        CHILD: function(type, what, _argument, first, last) {
          var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
          return first === 1 && last === 0 ? (
            // Shortcut for :nth-*(n)
            function(elem) {
              return !!elem.parentNode;
            }
          ) : function(elem, _context, xml) {
            var cache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while (node = node[dir]) {
                    if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                outerCache = parent[jQuery.expando] || (parent[jQuery.expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir] || // Fallback to seeking `elem` from the start
                (diff = nodeIndex = 0) || start.pop()) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache) {
                  outerCache = elem[jQuery.expando] || (elem[jQuery.expando] = {});
                  cache = outerCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                if (diff === false) {
                  while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[jQuery.expando] || (node[jQuery.expando] = {});
                        outerCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        PSEUDO: function(pseudo, argument) {
          var fn = jQuery.expr.pseudos[pseudo] || jQuery.expr.setFilters[pseudo.toLowerCase()] || selectorError("unsupported pseudo: " + pseudo);
          if (fn[jQuery.expando]) {
            return fn(argument);
          }
          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        not: markFunction(function(selector) {
          var input = [], results = [], matcher = compile(selector.replace(rtrimCSS, "$1"));
          return matcher[jQuery.expando] ? markFunction(function(seed, matches3, _context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
            while (i2--) {
              if (elem = unmatched[i2]) {
                seed[i2] = !(matches3[i2] = elem);
              }
            }
          }) : function(elem, _context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        has: markFunction(function(selector) {
          return function(elem) {
            return find(selector, elem).length > 0;
          };
        }),
        contains: markFunction(function(text) {
          text = unescapeSelector(text);
          return function(elem) {
            return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // https://www.w3.org/TR/selectors/#lang-pseudo
        lang: markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            selectorError("unsupported lang: " + lang);
          }
          lang = unescapeSelector(lang).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        // Miscellaneous
        target: function(elem) {
          var hash = window2.location && window2.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        root: function(elem) {
          return elem === documentElement$1;
        },
        focus: function(elem) {
          return elem === document$1.activeElement && document$1.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        enabled: createDisabledPseudo(false),
        disabled: createDisabledPseudo(true),
        checked: function(elem) {
          return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
        },
        selected: function(elem) {
          if (isIE && elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        // Contents
        empty: function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        parent: function(elem) {
          return !jQuery.expr.pseudos.empty(elem);
        },
        // Element/input types
        header: function(elem) {
          return rheader.test(elem.nodeName);
        },
        input: function(elem) {
          return rinputs.test(elem.nodeName);
        },
        button: function(elem) {
          return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
        },
        text: function(elem) {
          return nodeName(elem, "input") && elem.type === "text";
        },
        // Position-in-collection
        first: createPositionalPseudo(function() {
          return [0];
        }),
        last: createPositionalPseudo(function(_matchIndexes, length) {
          return [length - 1];
        }),
        eq: createPositionalPseudo(function(_matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        even: createPositionalPseudo(function(matchIndexes, length) {
          var i2 = 0;
          for (; i2 < length; i2 += 2) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        }),
        odd: createPositionalPseudo(function(matchIndexes, length) {
          var i2 = 1;
          for (; i2 < length; i2 += 2) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        }),
        lt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i2;
          if (argument < 0) {
            i2 = argument + length;
          } else if (argument > length) {
            i2 = length;
          } else {
            i2 = argument;
          }
          for (; --i2 >= 0; ) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        }),
        gt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i2 = argument < 0 ? argument + length : argument;
          for (; ++i2 < length; ) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        })
      }
    };
    jQuery.expr.pseudos.nth = jQuery.expr.pseudos.eq;
    for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
      jQuery.expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in { submit: true, reset: true }) {
      jQuery.expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {
    }
    setFilters.prototype = jQuery.expr.filters = jQuery.expr.pseudos;
    jQuery.expr.setFilters = new setFilters();
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir, skip = combinator.next, key = skip || dir, checkNonElements = base && key === "parentNode", doneName = done++;
      return combinator.first ? (
        // Check against closest ancestor/preceding element
        function(elem, context, xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              return matcher(elem, context, xml);
            }
          }
          return false;
        }
      ) : (
        // Check against all ancestor/preceding elements
        function(elem, context, xml) {
          var oldCache, outerCache, newCache = [dirruns, doneName];
          if (xml) {
            while (elem = elem[dir]) {
              if (elem.nodeType === 1 || checkNonElements) {
                if (matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          } else {
            while (elem = elem[dir]) {
              if (elem.nodeType === 1 || checkNonElements) {
                outerCache = elem[jQuery.expando] || (elem[jQuery.expando] = {});
                if (skip && nodeName(elem, skip)) {
                  elem = elem[dir] || elem;
                } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                  return newCache[2] = oldCache[2];
                } else {
                  outerCache[key] = newCache;
                  if (newCache[2] = matcher(elem, context, xml)) {
                    return true;
                  }
                }
              }
            }
          }
          return false;
        }
      );
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i2 = matchers.length;
        while (i2--) {
          if (!matchers[i2](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i2 = 0, len = contexts.length;
      for (; i2 < len; i2++) {
        find(selector, contexts[i2], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
      for (; i2 < len; i2++) {
        if (elem = unmatched[i2]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i2);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter2, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[jQuery.expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[jQuery.expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp, i2, elem, matcherOut, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
          selector || "*",
          context.nodeType ? [context] : context,
          []
        ), matcherIn = preFilter2 && (seed || !selector) ? condense(elems, preMap, preFilter2, context, xml) : elems;
        if (matcher) {
          matcherOut = postFinder || (seed ? preFilter2 : preexisting || postFilter) ? (
            // ...intermediate processing is necessary
            []
          ) : (
            // ...otherwise use results directly
            results
          );
          matcher(matcherIn, matcherOut, context, xml);
        } else {
          matcherOut = matcherIn;
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i2 = temp.length;
          while (i2--) {
            if (elem = temp[i2]) {
              matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter2) {
            if (postFinder) {
              temp = [];
              i2 = matcherOut.length;
              while (i2--) {
                if (elem = matcherOut[i2]) {
                  temp.push(matcherIn[i2] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            i2 = matcherOut.length;
            while (i2--) {
              if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i2]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(
            matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
          );
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = jQuery.expr.relative[tokens[0].type], implicitRelative = leadingRelative || jQuery.expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
        return elem === checkContext;
      }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
        return indexOf.call(checkContext, elem) > -1;
      }, implicitRelative, true), matchers = [function(elem, context, xml) {
        var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
        checkContext = null;
        return ret;
      }];
      for (; i2 < len; i2++) {
        if (matcher = jQuery.expr.relative[tokens[i2].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = jQuery.expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
          if (matcher[jQuery.expando]) {
            j = ++i2;
            for (; j < len; j++) {
              if (jQuery.expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(
              i2 > 1 && elementMatcher(matchers),
              i2 > 1 && toSelector(
                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })
              ).replace(rtrimCSS, "$1"),
              matcher,
              i2 < j && matcherFromTokens(tokens.slice(i2, j)),
              j < len && matcherFromTokens(tokens = tokens.slice(j)),
              j < len && toSelector(tokens)
            );
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
        var elem, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && jQuery.expr.find.TAG("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1;
        if (outermost) {
          outermostContext = context == document$1 || context || outermost;
        }
        for (; (elem = elems[i2]) != null; i2++) {
          if (byElement && elem) {
            j = 0;
            if (!context && elem.ownerDocument != document$1) {
              setDocument(elem);
              xml = !documentIsHTML;
            }
            while (matcher = elementMatchers[j++]) {
              if (matcher(elem, context || document$1, xml)) {
                push.call(results, elem);
                break;
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
            }
          }
          if (bySet) {
            if (elem = !matcher && elem) {
              matchedCount--;
            }
            if (seed) {
              unmatched.push(elem);
            }
          }
        }
        matchedCount += i2;
        if (bySet && i2 !== matchedCount) {
          j = 0;
          while (matcher = setMatchers[j++]) {
            matcher(unmatched, setMatched, context, xml);
          }
          if (seed) {
            if (matchedCount > 0) {
              while (i2--) {
                if (!(unmatched[i2] || setMatched[i2])) {
                  setMatched[i2] = pop.call(results);
                }
              }
            }
            setMatched = condense(setMatched);
          }
          push.apply(results, setMatched);
          if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
            jQuery.uniqueSort(results);
          }
        }
        if (outermost) {
          dirruns = dirrunsUnique;
          outermostContext = contextBackup;
        }
        return unmatched;
      };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    function compile(selector, match) {
      var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i2 = match.length;
        while (i2--) {
          cached = matcherFromTokens(match[i2]);
          if (cached[jQuery.expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(
          selector,
          matcherFromGroupMatchers(elementMatchers, setMatchers)
        );
        cached.selector = selector;
      }
      return cached;
    }
    function select(selector, context, results, seed) {
      var i2, tokens, token, type, find2, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && jQuery.expr.relative[tokens[1].type]) {
          context = (jQuery.expr.find.ID(
            unescapeSelector(token.matches[0]),
            context
          ) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i2 = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
        while (i2--) {
          token = tokens[i2];
          if (jQuery.expr.relative[type = token.type]) {
            break;
          }
          if (find2 = jQuery.expr.find[type]) {
            if (seed = find2(
              unescapeSelector(token.matches[0]),
              rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
            )) {
              tokens.splice(i2, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(
        seed,
        context,
        !documentIsHTML,
        results,
        !context || rsibling.test(selector) && testContext(context.parentNode) || context
      );
      return results;
    }
    setDocument();
    jQuery.find = find;
    find.compile = compile;
    find.select = select;
    find.setDocument = setDocument;
    find.tokenize = tokenize;
    return jQuery;
  })
);

// src/mock-doc/selector.ts
function matches(selector, elm) {
  try {
    const r = jquery_default.find(selector, void 0, void 0, [elm]);
    return r.length > 0;
  } catch (e2) {
    updateSelectorError(selector, e2);
    throw e2;
  }
}
function selectOne(selector, elm) {
  try {
    const r = jquery_default.find(selector, elm, void 0, void 0);
    return r[0] || null;
  } catch (e2) {
    updateSelectorError(selector, e2);
    throw e2;
  }
}
function selectAll(selector, elm) {
  try {
    return jquery_default.find(selector, elm, void 0, void 0);
  } catch (e2) {
    updateSelectorError(selector, e2);
    throw e2;
  }
}
var PROBLEMATIC_SELECTORS = [":scope", ":where", ":is"];
function updateSelectorError(selector, e2) {
  const selectorsPresent = PROBLEMATIC_SELECTORS.filter((s) => selector.includes(s));
  if (selectorsPresent.length > 0 && e2.message) {
    e2.message = `At present jQuery does not support the ${humanReadableList(selectorsPresent)} ${selectorsPresent.length === 1 ? "selector" : "selectors"}.
If you need this in your test, consider writing an end-to-end test instead.
` + e2.message;
  }
}
function humanReadableList(items) {
  if (items.length <= 1) {
    return items.join("");
  }
  return `${items.slice(0, items.length - 1).join(", ")} and ${items[items.length - 1]}`;
}

// src/mock-doc/serialize-node.ts
function serializeNodeToHtml(elm, opts = {}) {
  const output = {
    currentLineWidth: 0,
    indent: 0,
    isWithinBody: false,
    text: []
  };
  if (opts.prettyHtml) {
    if (typeof opts.indentSpaces !== "number") {
      opts.indentSpaces = 2;
    }
    if (typeof opts.newLines !== "boolean") {
      opts.newLines = true;
    }
    opts.approximateLineWidth = -1;
  } else {
    opts.prettyHtml = false;
    if (typeof opts.newLines !== "boolean") {
      opts.newLines = false;
    }
    if (typeof opts.indentSpaces !== "number") {
      opts.indentSpaces = 0;
    }
  }
  if (typeof opts.approximateLineWidth !== "number") {
    opts.approximateLineWidth = -1;
  }
  if (typeof opts.removeEmptyAttributes !== "boolean") {
    opts.removeEmptyAttributes = true;
  }
  if (typeof opts.removeAttributeQuotes !== "boolean") {
    opts.removeAttributeQuotes = false;
  }
  if (typeof opts.removeBooleanAttributeQuotes !== "boolean") {
    opts.removeBooleanAttributeQuotes = false;
  }
  if (typeof opts.removeHtmlComments !== "boolean") {
    opts.removeHtmlComments = false;
  }
  if (typeof opts.serializeShadowRoot !== "boolean") {
    opts.serializeShadowRoot = false;
  }
  if (opts.outerHtml) {
    serializeToHtml(elm, opts, output, false);
  } else {
    for (let i = 0, ii = elm.childNodes.length; i < ii; i++) {
      serializeToHtml(elm.childNodes[i], opts, output, false);
    }
  }
  if (output.text[0] === "\n") {
    output.text.shift();
  }
  if (output.text[output.text.length - 1] === "\n") {
    output.text.pop();
  }
  return output.text.join("");
}
function serializeToHtml(node, opts, output, isShadowRoot) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  if (node.nodeType === 1 /* ELEMENT_NODE */ || isShadowRoot) {
    const tagName = isShadowRoot ? "mock:shadow-root" : getTagName(node);
    if (tagName === "body") {
      output.isWithinBody = true;
    }
    const ignoreTag = opts.excludeTags != null && opts.excludeTags.includes(tagName);
    if (ignoreTag === false) {
      const isWithinWhitespaceSensitiveNode = opts.newLines || ((_a = opts.indentSpaces) != null ? _a : 0) > 0 ? isWithinWhitespaceSensitive(node) : false;
      if (opts.newLines && !isWithinWhitespaceSensitiveNode) {
        output.text.push("\n");
        output.currentLineWidth = 0;
      }
      if (((_b = opts.indentSpaces) != null ? _b : 0) > 0 && !isWithinWhitespaceSensitiveNode) {
        for (let i = 0; i < output.indent; i++) {
          output.text.push(" ");
        }
        output.currentLineWidth += output.indent;
      }
      output.text.push("<" + tagName);
      output.currentLineWidth += tagName.length + 1;
      const attrsLength = node.attributes.length;
      const attributes = opts.prettyHtml && attrsLength > 1 ? cloneAttributes(node.attributes, true) : node.attributes;
      for (let i = 0; i < attrsLength; i++) {
        const attr = attributes.item(i);
        const attrName = attr.name;
        if (attrName === "style") {
          continue;
        }
        let attrValue = attr.value;
        if (opts.removeEmptyAttributes && attrValue === "" && REMOVE_EMPTY_ATTR.has(attrName)) {
          continue;
        }
        const attrNamespaceURI = attr.namespaceURI;
        if (attrNamespaceURI == null) {
          output.currentLineWidth += attrName.length + 1;
          if (opts.approximateLineWidth && opts.approximateLineWidth > 0 && output.currentLineWidth > opts.approximateLineWidth) {
            output.text.push("\n" + attrName);
            output.currentLineWidth = 0;
          } else {
            output.text.push(" " + attrName);
          }
        } else if (attrNamespaceURI === "http://www.w3.org/XML/1998/namespace") {
          output.text.push(" xml:" + attrName);
          output.currentLineWidth += attrName.length + 5;
        } else if (attrNamespaceURI === "http://www.w3.org/2000/xmlns/") {
          if (attrName !== "xmlns") {
            output.text.push(" xmlns:" + attrName);
            output.currentLineWidth += attrName.length + 7;
          } else {
            output.text.push(" " + attrName);
            output.currentLineWidth += attrName.length + 1;
          }
        } else if (attrNamespaceURI === XLINK_NS) {
          output.text.push(" xlink:" + attrName);
          output.currentLineWidth += attrName.length + 7;
        } else {
          output.text.push(" " + attrNamespaceURI + ":" + attrName);
          output.currentLineWidth += attrNamespaceURI.length + attrName.length + 2;
        }
        if (opts.prettyHtml && attrName === "class") {
          attrValue = attr.value = attrValue.split(" ").filter((t) => t !== "").sort().join(" ").trim();
        }
        if (attrValue === "") {
          if (opts.removeBooleanAttributeQuotes && BOOLEAN_ATTR.has(attrName)) {
            continue;
          }
          if (opts.removeEmptyAttributes && attrName.startsWith("data-")) {
            continue;
          }
        }
        if (opts.removeAttributeQuotes && CAN_REMOVE_ATTR_QUOTES.test(attrValue)) {
          output.text.push("=" + escapeString(attrValue, true));
          output.currentLineWidth += attrValue.length + 1;
        } else {
          output.text.push('="' + escapeString(attrValue, true) + '"');
          output.currentLineWidth += attrValue.length + 3;
        }
      }
      if (node.hasAttribute("style")) {
        const cssText = node.style.cssText;
        if (opts.approximateLineWidth && opts.approximateLineWidth > 0 && output.currentLineWidth + cssText.length + 10 > opts.approximateLineWidth) {
          output.text.push(`
style="${cssText}">`);
          output.currentLineWidth = 0;
        } else {
          output.text.push(` style="${cssText}">`);
          output.currentLineWidth += cssText.length + 10;
        }
      } else {
        output.text.push(">");
        output.currentLineWidth += 1;
      }
    }
    if (EMPTY_ELEMENTS.has(tagName) === false) {
      if (opts.serializeShadowRoot && node.shadowRoot != null) {
        output.indent = output.indent + ((_c = opts.indentSpaces) != null ? _c : 0);
        serializeToHtml(node.shadowRoot, opts, output, true);
        output.indent = output.indent - ((_d = opts.indentSpaces) != null ? _d : 0);
        if (opts.newLines && (node.childNodes.length === 0 || node.childNodes.length === 1 && node.childNodes[0].nodeType === 3 /* TEXT_NODE */ && ((_e = node.childNodes[0].nodeValue) == null ? void 0 : _e.trim()) === "")) {
          output.text.push("\n");
          output.currentLineWidth = 0;
          for (let i = 0; i < output.indent; i++) {
            output.text.push(" ");
          }
          output.currentLineWidth += output.indent;
        }
      }
      if (opts.excludeTagContent == null || opts.excludeTagContent.includes(tagName) === false) {
        const childNodes = tagName === "template" ? node.content.childNodes : node.childNodes;
        const childNodeLength = childNodes.length;
        if (childNodeLength > 0) {
          if (childNodeLength === 1 && childNodes[0].nodeType === 3 /* TEXT_NODE */ && (typeof childNodes[0].nodeValue !== "string" || childNodes[0].nodeValue.trim() === "")) {
          } else {
            const isWithinWhitespaceSensitiveNode = opts.newLines || ((_f = opts.indentSpaces) != null ? _f : 0) > 0 ? isWithinWhitespaceSensitive(node) : false;
            if (!isWithinWhitespaceSensitiveNode && ((_g = opts.indentSpaces) != null ? _g : 0) > 0 && ignoreTag === false) {
              output.indent = output.indent + ((_h = opts.indentSpaces) != null ? _h : 0);
            }
            for (let i = 0; i < childNodeLength; i++) {
              serializeToHtml(childNodes[i], opts, output, false);
            }
            if (ignoreTag === false) {
              if (opts.newLines && !isWithinWhitespaceSensitiveNode) {
                output.text.push("\n");
                output.currentLineWidth = 0;
              }
              if (((_i = opts.indentSpaces) != null ? _i : 0) > 0 && !isWithinWhitespaceSensitiveNode) {
                output.indent = output.indent - ((_j = opts.indentSpaces) != null ? _j : 0);
                for (let i = 0; i < output.indent; i++) {
                  output.text.push(" ");
                }
                output.currentLineWidth += output.indent;
              }
            }
          }
        }
        if (ignoreTag === false) {
          output.text.push("</" + tagName + ">");
          output.currentLineWidth += tagName.length + 3;
        }
      }
    }
    if (((_k = opts.approximateLineWidth) != null ? _k : 0) > 0 && STRUCTURE_ELEMENTS.has(tagName)) {
      output.text.push("\n");
      output.currentLineWidth = 0;
    }
    if (tagName === "body") {
      output.isWithinBody = false;
    }
  } else if (node.nodeType === 3 /* TEXT_NODE */) {
    let textContent = node.nodeValue;
    if (typeof textContent === "string") {
      const trimmedTextContent = textContent.trim();
      if (trimmedTextContent === "") {
        if (isWithinWhitespaceSensitive(node)) {
          output.text.push(textContent);
          output.currentLineWidth += textContent.length;
        } else if (((_l = opts.approximateLineWidth) != null ? _l : 0) > 0 && !output.isWithinBody) {
        } else if (!opts.prettyHtml) {
          output.currentLineWidth += 1;
          if (opts.approximateLineWidth && opts.approximateLineWidth > 0 && output.currentLineWidth > opts.approximateLineWidth) {
            output.text.push("\n");
            output.currentLineWidth = 0;
          } else {
            output.text.push(" ");
          }
        }
      } else {
        const isWithinWhitespaceSensitiveNode = opts.newLines || ((_m = opts.indentSpaces) != null ? _m : 0) > 0 || opts.prettyHtml ? isWithinWhitespaceSensitive(node) : false;
        if (opts.newLines && !isWithinWhitespaceSensitiveNode) {
          output.text.push("\n");
          output.currentLineWidth = 0;
        }
        if (((_n = opts.indentSpaces) != null ? _n : 0) > 0 && !isWithinWhitespaceSensitiveNode) {
          for (let i = 0; i < output.indent; i++) {
            output.text.push(" ");
          }
          output.currentLineWidth += output.indent;
        }
        let textContentLength = textContent.length;
        if (textContentLength > 0) {
          const parentTagName = node.parentNode != null && node.parentNode.nodeType === 1 /* ELEMENT_NODE */ ? node.parentNode.nodeName : null;
          if (typeof parentTagName === "string" && NON_ESCAPABLE_CONTENT.has(parentTagName)) {
            if (isWithinWhitespaceSensitive(node)) {
              output.text.push(textContent);
            } else {
              output.text.push(trimmedTextContent);
              textContentLength = trimmedTextContent.length;
            }
            output.currentLineWidth += textContentLength;
          } else {
            if (opts.prettyHtml && !isWithinWhitespaceSensitiveNode) {
              output.text.push(escapeString(textContent.replace(/\s\s+/g, " ").trim(), false));
              output.currentLineWidth += textContentLength;
            } else {
              if (isWithinWhitespaceSensitive(node)) {
                output.currentLineWidth += textContentLength;
              } else {
                if (/\s/.test(textContent.charAt(0))) {
                  textContent = " " + textContent.trimLeft();
                }
                textContentLength = textContent.length;
                if (textContentLength > 1) {
                  if (/\s/.test(textContent.charAt(textContentLength - 1))) {
                    if (opts.approximateLineWidth && opts.approximateLineWidth > 0 && output.currentLineWidth + textContentLength > opts.approximateLineWidth) {
                      textContent = textContent.trimRight() + "\n";
                      output.currentLineWidth = 0;
                    } else {
                      textContent = textContent.trimRight() + " ";
                    }
                  }
                }
                output.currentLineWidth += textContentLength;
              }
              output.text.push(escapeString(textContent, false));
            }
          }
        }
      }
    }
  } else if (node.nodeType === 8 /* COMMENT_NODE */) {
    const nodeValue = node.nodeValue;
    if (opts.removeHtmlComments) {
      const isHydrateAnnotation = (nodeValue == null ? void 0 : nodeValue.startsWith(CONTENT_REF_ID + ".")) || (nodeValue == null ? void 0 : nodeValue.startsWith(ORG_LOCATION_ID + ".")) || (nodeValue == null ? void 0 : nodeValue.startsWith(SLOT_NODE_ID + ".")) || (nodeValue == null ? void 0 : nodeValue.startsWith(TEXT_NODE_ID + "."));
      if (!isHydrateAnnotation) {
        return;
      }
    }
    const isWithinWhitespaceSensitiveNode = opts.newLines || ((_o = opts.indentSpaces) != null ? _o : 0) > 0 ? isWithinWhitespaceSensitive(node) : false;
    if (opts.newLines && !isWithinWhitespaceSensitiveNode) {
      output.text.push("\n");
      output.currentLineWidth = 0;
    }
    if (((_p = opts.indentSpaces) != null ? _p : 0) > 0 && !isWithinWhitespaceSensitiveNode) {
      for (let i = 0; i < output.indent; i++) {
        output.text.push(" ");
      }
      output.currentLineWidth += output.indent;
    }
    output.text.push("<!--" + nodeValue + "-->");
    output.currentLineWidth += nodeValue.length + 7;
  } else if (node.nodeType === 10 /* DOCUMENT_TYPE_NODE */) {
    output.text.push("<!doctype html>");
  }
}
var AMP_REGEX = /&/g;
var NBSP_REGEX = /\u00a0/g;
var DOUBLE_QUOTE_REGEX = /"/g;
var LT_REGEX = /</g;
var GT_REGEX = />/g;
var CAN_REMOVE_ATTR_QUOTES = /^[^ \t\n\f\r"'`=<>\/\\-]+$/;
function getTagName(element) {
  if (element.namespaceURI === "http://www.w3.org/1999/xhtml") {
    return element.nodeName.toLowerCase();
  } else {
    return element.nodeName;
  }
}
function escapeString(str, attrMode) {
  str = str.replace(AMP_REGEX, "&amp;").replace(NBSP_REGEX, "&nbsp;");
  if (attrMode) {
    return str.replace(DOUBLE_QUOTE_REGEX, "&quot;");
  }
  return str.replace(LT_REGEX, "&lt;").replace(GT_REGEX, "&gt;");
}
function isWithinWhitespaceSensitive(node) {
  let _node = node;
  while (_node != null) {
    if (WHITESPACE_SENSITIVE.has(_node.nodeName)) {
      return true;
    }
    _node = _node.parentNode;
  }
  return false;
}
var NON_ESCAPABLE_CONTENT = /* @__PURE__ */ new Set([
  "STYLE",
  "SCRIPT",
  "IFRAME",
  "NOSCRIPT",
  "XMP",
  "NOEMBED",
  "NOFRAMES",
  "PLAINTEXT"
]);
var WHITESPACE_SENSITIVE = /* @__PURE__ */ new Set([
  "CODE",
  "OUTPUT",
  "PLAINTEXT",
  "PRE",
  "SCRIPT",
  "TEMPLATE",
  "TEXTAREA"
]);
var EMPTY_ELEMENTS = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "trace",
  "wbr"
]);
var REMOVE_EMPTY_ATTR = /* @__PURE__ */ new Set(["class", "dir", "id", "lang", "name", "title"]);
var BOOLEAN_ATTR = /* @__PURE__ */ new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "compact",
  "controls",
  "declare",
  "default",
  "defaultchecked",
  "defaultmuted",
  "defaultselected",
  "defer",
  "disabled",
  "enabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nohref",
  "nomodule",
  "noresize",
  "noshade",
  "novalidate",
  "nowrap",
  "open",
  "pauseonexit",
  "readonly",
  "required",
  "reversed",
  "scoped",
  "seamless",
  "selected",
  "sortable",
  "truespeed",
  "typemustmatch",
  "visible"
]);
var STRUCTURE_ELEMENTS = /* @__PURE__ */ new Set([
  "html",
  "body",
  "head",
  "iframe",
  "meta",
  "link",
  "base",
  "title",
  "script",
  "style"
]);

// src/mock-doc/node.ts
var MockNode2 = class {
  constructor(ownerDocument, nodeType, nodeName, nodeValue) {
    this.ownerDocument = ownerDocument;
    this.nodeType = nodeType;
    this.nodeName = nodeName;
    this._nodeValue = nodeValue;
    this.parentNode = null;
    this.childNodes = [];
  }
  appendChild(newNode) {
    if (newNode.nodeType === 11 /* DOCUMENT_FRAGMENT_NODE */) {
      const nodes = newNode.childNodes.slice();
      for (const child of nodes) {
        this.appendChild(child);
      }
    } else {
      newNode.remove();
      newNode.parentNode = this;
      this.childNodes.push(newNode);
      connectNode(this.ownerDocument, newNode);
    }
    return newNode;
  }
  append(...items) {
    items.forEach((item) => {
      const isNode = typeof item === "object" && item !== null && "nodeType" in item;
      this.appendChild(isNode ? item : this.ownerDocument.createTextNode(String(item)));
    });
  }
  prepend(...items) {
    const firstChild = this.firstChild;
    items.forEach((item) => {
      const isNode = typeof item === "object" && item !== null && "nodeType" in item;
      if (firstChild) {
        this.insertBefore(isNode ? item : this.ownerDocument.createTextNode(String(item)), firstChild);
      }
    });
  }
  cloneNode(deep) {
    throw new Error(`invalid node type to clone: ${this.nodeType}, deep: ${deep}`);
  }
  compareDocumentPosition(_other) {
    return -1;
  }
  get firstChild() {
    return this.childNodes[0] || null;
  }
  insertBefore(newNode, referenceNode) {
    if (newNode.nodeType === 11 /* DOCUMENT_FRAGMENT_NODE */) {
      for (let i = 0, ii = newNode.childNodes.length; i < ii; i++) {
        insertBefore(this, newNode.childNodes[i], referenceNode);
      }
    } else {
      insertBefore(this, newNode, referenceNode);
    }
    return newNode;
  }
  get isConnected() {
    let node = this;
    while (node != null) {
      if (node.nodeType === 9 /* DOCUMENT_NODE */) {
        return true;
      }
      node = node.parentNode;
      if (node != null && node.nodeType === 11 /* DOCUMENT_FRAGMENT_NODE */) {
        node = node.host;
      }
    }
    return false;
  }
  isSameNode(node) {
    return this === node;
  }
  get lastChild() {
    return this.childNodes[this.childNodes.length - 1] || null;
  }
  get nextSibling() {
    if (this.parentNode != null) {
      const index = this.parentNode.childNodes.indexOf(this) + 1;
      return this.parentNode.childNodes[index] || null;
    }
    return null;
  }
  get nodeValue() {
    var _a;
    return (_a = this._nodeValue) != null ? _a : "";
  }
  set nodeValue(value) {
    this._nodeValue = value;
  }
  get parentElement() {
    return this.parentNode || null;
  }
  set parentElement(value) {
    this.parentNode = value;
  }
  get previousSibling() {
    if (this.parentNode != null) {
      const index = this.parentNode.childNodes.indexOf(this) - 1;
      return this.parentNode.childNodes[index] || null;
    }
    return null;
  }
  contains(otherNode) {
    if (otherNode === this) {
      return true;
    }
    const childNodes = Array.from(this.childNodes);
    if (childNodes.includes(otherNode)) {
      return true;
    }
    return childNodes.some((node) => this.contains.bind(node)(otherNode));
  }
  removeChild(childNode) {
    const index = this.childNodes.indexOf(childNode);
    if (index > -1) {
      this.childNodes.splice(index, 1);
      if (this.nodeType === 1 /* ELEMENT_NODE */) {
        const wasConnected = this.isConnected;
        childNode.parentNode = null;
        if (wasConnected === true) {
          disconnectNode(childNode);
        }
      } else {
        childNode.parentNode = null;
      }
    } else {
      throw new Error(`node not found within childNodes during removeChild`);
    }
    return childNode;
  }
  remove() {
    if (this.parentNode != null) {
      this.parentNode.removeChild(this);
    }
  }
  replaceChild(newChild, oldChild) {
    if (oldChild.parentNode === this) {
      this.insertBefore(newChild, oldChild);
      oldChild.remove();
      return newChild;
    }
    return null;
  }
  get textContent() {
    var _a;
    return (_a = this._nodeValue) != null ? _a : "";
  }
  set textContent(value) {
    this._nodeValue = String(value);
  }
};
MockNode2.ELEMENT_NODE = 1;
MockNode2.TEXT_NODE = 3;
MockNode2.PROCESSING_INSTRUCTION_NODE = 7;
MockNode2.COMMENT_NODE = 8;
MockNode2.DOCUMENT_NODE = 9;
MockNode2.DOCUMENT_TYPE_NODE = 10;
MockNode2.DOCUMENT_FRAGMENT_NODE = 11;
var MockNodeList = class {
  constructor(ownerDocument, childNodes, length) {
    this.ownerDocument = ownerDocument;
    this.childNodes = childNodes;
    this.length = length;
  }
};
var MockElement = class extends MockNode2 {
  attachInternals() {
    return new Proxy({}, {
      get: function(_target, prop, _receiver) {
        console.error(
          `NOTE: Property ${String(prop)} was accessed on ElementInternals, but this property is not implemented.
Testing components with ElementInternals is fully supported in e2e tests.`
        );
      }
    });
  }
  constructor(ownerDocument, nodeName, namespaceURI = null) {
    super(ownerDocument, 1 /* ELEMENT_NODE */, typeof nodeName === "string" ? nodeName : null, null);
    this.__namespaceURI = namespaceURI;
    this.__shadowRoot = null;
    this.__attributeMap = null;
  }
  addEventListener(type, handler) {
    addEventListener(this, type, handler);
  }
  attachShadow(_opts) {
    const shadowRoot = this.ownerDocument.createDocumentFragment();
    this.shadowRoot = shadowRoot;
    return shadowRoot;
  }
  blur() {
    dispatchEvent(
      this,
      new MockFocusEvent("blur", { relatedTarget: null, bubbles: true, cancelable: true, composed: true })
    );
  }
  get localName() {
    if (!this.nodeName) {
      throw new Error(`Can't compute elements localName without nodeName`);
    }
    return this.nodeName.toLocaleLowerCase();
  }
  get namespaceURI() {
    return this.__namespaceURI;
  }
  get shadowRoot() {
    return this.__shadowRoot || null;
  }
  set shadowRoot(shadowRoot) {
    if (shadowRoot != null) {
      shadowRoot.host = this;
      this.__shadowRoot = shadowRoot;
    } else {
      delete this.__shadowRoot;
    }
  }
  get attributes() {
    if (this.__attributeMap == null) {
      const attrMap = createAttributeProxy(false);
      this.__attributeMap = attrMap;
      return attrMap;
    }
    return this.__attributeMap;
  }
  set attributes(attrs) {
    this.__attributeMap = attrs;
  }
  get children() {
    return this.childNodes.filter((n) => n.nodeType === 1 /* ELEMENT_NODE */);
  }
  get childElementCount() {
    return this.childNodes.filter((n) => n.nodeType === 1 /* ELEMENT_NODE */).length;
  }
  get className() {
    return this.getAttributeNS(null, "class") || "";
  }
  set className(value) {
    this.setAttributeNS(null, "class", value);
  }
  get classList() {
    return new MockClassList(this);
  }
  click() {
    dispatchEvent(this, new MockEvent("click", { bubbles: true, cancelable: true, composed: true }));
  }
  cloneNode(_deep) {
    return null;
  }
  closest(selector) {
    let elm = this;
    while (elm != null) {
      if (elm.matches(selector)) {
        return elm;
      }
      elm = elm.parentNode;
    }
    return null;
  }
  get dataset() {
    return dataset(this);
  }
  get dir() {
    return this.getAttributeNS(null, "dir") || "";
  }
  set dir(value) {
    this.setAttributeNS(null, "dir", value);
  }
  dispatchEvent(ev) {
    return dispatchEvent(this, ev);
  }
  get firstElementChild() {
    return this.children[0] || null;
  }
  focus(_options) {
    dispatchEvent(
      this,
      new MockFocusEvent("focus", { relatedTarget: null, bubbles: true, cancelable: true, composed: true })
    );
  }
  getAttribute(attrName) {
    if (attrName === "style") {
      if (this.__style != null && this.__style.length > 0) {
        return this.style.cssText;
      }
      return null;
    }
    const attr = this.attributes.getNamedItem(attrName);
    if (attr != null) {
      return attr.value;
    }
    return null;
  }
  getAttributeNS(namespaceURI, attrName) {
    const attr = this.attributes.getNamedItemNS(namespaceURI, attrName);
    if (attr != null) {
      return attr.value;
    }
    return null;
  }
  getAttributeNode(attrName) {
    if (!this.hasAttribute(attrName)) {
      return null;
    }
    return new MockAttr(attrName, this.getAttribute(attrName));
  }
  getBoundingClientRect() {
    return { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0 };
  }
  getRootNode(opts) {
    const isComposed = opts != null && opts.composed === true;
    let node = this;
    while (node.parentNode != null) {
      node = node.parentNode;
      if (isComposed === true && node.parentNode == null && node.host != null) {
        node = node.host;
      }
    }
    return node;
  }
  get draggable() {
    return this.getAttributeNS(null, "draggable") === "true";
  }
  set draggable(value) {
    this.setAttributeNS(null, "draggable", value);
  }
  hasChildNodes() {
    return this.childNodes.length > 0;
  }
  get id() {
    return this.getAttributeNS(null, "id") || "";
  }
  set id(value) {
    this.setAttributeNS(null, "id", value);
  }
  get innerHTML() {
    if (this.childNodes.length === 0) {
      return "";
    }
    return serializeNodeToHtml(this, {
      newLines: false,
      indentSpaces: 0
    });
  }
  set innerHTML(html) {
    var _a;
    if (NON_ESCAPABLE_CONTENT.has((_a = this.nodeName) != null ? _a : "") === true) {
      setTextContent(this, html);
    } else {
      for (let i = this.childNodes.length - 1; i >= 0; i--) {
        this.removeChild(this.childNodes[i]);
      }
      if (typeof html === "string") {
        const frag = parseFragmentUtil(this.ownerDocument, html);
        while (frag.childNodes.length > 0) {
          this.appendChild(frag.childNodes[0]);
        }
      }
    }
  }
  get innerText() {
    const text = [];
    getTextContent(this.childNodes, text);
    return text.join("");
  }
  set innerText(value) {
    setTextContent(this, value);
  }
  insertAdjacentElement(position, elm) {
    if (position === "beforebegin") {
      insertBefore(this.parentNode, elm, this);
    } else if (position === "afterbegin") {
      this.prepend(elm);
    } else if (position === "beforeend") {
      this.appendChild(elm);
    } else if (position === "afterend") {
      insertBefore(this.parentNode, elm, this.nextSibling);
    }
    return elm;
  }
  insertAdjacentHTML(position, html) {
    const frag = parseFragmentUtil(this.ownerDocument, html);
    if (position === "beforebegin") {
      while (frag.childNodes.length > 0) {
        insertBefore(this.parentNode, frag.childNodes[0], this);
      }
    } else if (position === "afterbegin") {
      while (frag.childNodes.length > 0) {
        this.prepend(frag.childNodes[frag.childNodes.length - 1]);
      }
    } else if (position === "beforeend") {
      while (frag.childNodes.length > 0) {
        this.appendChild(frag.childNodes[0]);
      }
    } else if (position === "afterend") {
      while (frag.childNodes.length > 0) {
        insertBefore(this.parentNode, frag.childNodes[frag.childNodes.length - 1], this.nextSibling);
      }
    }
  }
  insertAdjacentText(position, text) {
    const elm = this.ownerDocument.createTextNode(text);
    if (position === "beforebegin") {
      insertBefore(this.parentNode, elm, this);
    } else if (position === "afterbegin") {
      this.prepend(elm);
    } else if (position === "beforeend") {
      this.appendChild(elm);
    } else if (position === "afterend") {
      insertBefore(this.parentNode, elm, this.nextSibling);
    }
  }
  hasAttribute(attrName) {
    if (attrName === "style") {
      return this.__style != null && this.__style.length > 0;
    }
    return this.getAttribute(attrName) !== null;
  }
  hasAttributeNS(namespaceURI, name) {
    return this.getAttributeNS(namespaceURI, name) !== null;
  }
  get hidden() {
    return this.hasAttributeNS(null, "hidden");
  }
  set hidden(isHidden) {
    if (isHidden === true) {
      this.setAttributeNS(null, "hidden", "");
    } else {
      this.removeAttributeNS(null, "hidden");
    }
  }
  get lang() {
    return this.getAttributeNS(null, "lang") || "";
  }
  set lang(value) {
    this.setAttributeNS(null, "lang", value);
  }
  get lastElementChild() {
    const children = this.children;
    return children[children.length - 1] || null;
  }
  matches(selector) {
    return matches(selector, this);
  }
  get nextElementSibling() {
    const parentElement = this.parentElement;
    if (parentElement != null && (parentElement.nodeType === 1 /* ELEMENT_NODE */ || parentElement.nodeType === 11 /* DOCUMENT_FRAGMENT_NODE */ || parentElement.nodeType === 9 /* DOCUMENT_NODE */)) {
      const children = parentElement.children;
      const index = children.indexOf(this) + 1;
      return parentElement.children[index] || null;
    }
    return null;
  }
  get outerHTML() {
    return serializeNodeToHtml(this, {
      newLines: false,
      outerHtml: true,
      indentSpaces: 0
    });
  }
  get previousElementSibling() {
    const parentElement = this.parentElement;
    if (parentElement != null && (parentElement.nodeType === 1 /* ELEMENT_NODE */ || parentElement.nodeType === 11 /* DOCUMENT_FRAGMENT_NODE */ || parentElement.nodeType === 9 /* DOCUMENT_NODE */)) {
      const children = parentElement.children;
      const index = children.indexOf(this) - 1;
      return parentElement.children[index] || null;
    }
    return null;
  }
  getElementsByClassName(classNames) {
    const classes = classNames.trim().split(" ").filter((c) => c.length > 0);
    const results = [];
    getElementsByClassName(this, classes, results);
    return results;
  }
  getElementsByTagName(tagName) {
    const results = [];
    getElementsByTagName(this, tagName.toLowerCase(), results);
    return results;
  }
  querySelector(selector) {
    return selectOne(selector, this);
  }
  querySelectorAll(selector) {
    return selectAll(selector, this);
  }
  removeAttribute(attrName) {
    if (attrName === "style") {
      delete this.__style;
    } else {
      const attr = this.attributes.getNamedItem(attrName);
      if (attr != null) {
        this.attributes.removeNamedItemNS(attr);
        if (checkAttributeChanged(this) === true) {
          attributeChanged(this, attrName, attr.value, null);
        }
      }
    }
  }
  removeAttributeNS(namespaceURI, attrName) {
    const attr = this.attributes.getNamedItemNS(namespaceURI, attrName);
    if (attr != null) {
      this.attributes.removeNamedItemNS(attr);
      if (checkAttributeChanged(this) === true) {
        attributeChanged(this, attrName, attr.value, null);
      }
    }
  }
  removeEventListener(type, handler) {
    removeEventListener(this, type, handler);
  }
  setAttribute(attrName, value) {
    if (attrName === "style") {
      this.style = value;
    } else {
      const attributes = this.attributes;
      let attr = attributes.getNamedItem(attrName);
      const checkAttrChanged = checkAttributeChanged(this);
      if (attr != null) {
        if (checkAttrChanged === true) {
          const oldValue = attr.value;
          attr.value = value;
          if (oldValue !== attr.value) {
            attributeChanged(this, attr.name, oldValue, attr.value);
          }
        } else {
          attr.value = value;
        }
      } else {
        if (attributes.caseInsensitive) {
          attrName = attrName.toLowerCase();
        }
        attr = new MockAttr(attrName, value);
        attributes.__items.push(attr);
        if (checkAttrChanged === true) {
          attributeChanged(this, attrName, null, attr.value);
        }
      }
    }
  }
  setAttributeNS(namespaceURI, attrName, value) {
    const attributes = this.attributes;
    let attr = attributes.getNamedItemNS(namespaceURI, attrName);
    const checkAttrChanged = checkAttributeChanged(this);
    if (attr != null) {
      if (checkAttrChanged === true) {
        const oldValue = attr.value;
        attr.value = value;
        if (oldValue !== attr.value) {
          attributeChanged(this, attr.name, oldValue, attr.value);
        }
      } else {
        attr.value = value;
      }
    } else {
      attr = new MockAttr(attrName, value, namespaceURI);
      attributes.__items.push(attr);
      if (checkAttrChanged === true) {
        attributeChanged(this, attrName, null, attr.value);
      }
    }
  }
  get style() {
    if (this.__style == null) {
      this.__style = createCSSStyleDeclaration();
    }
    return this.__style;
  }
  set style(val) {
    if (typeof val === "string") {
      if (this.__style == null) {
        this.__style = createCSSStyleDeclaration();
      }
      this.__style.cssText = val;
    } else {
      this.__style = val;
    }
  }
  get tabIndex() {
    return parseInt(this.getAttributeNS(null, "tabindex") || "-1", 10);
  }
  set tabIndex(value) {
    this.setAttributeNS(null, "tabindex", value);
  }
  get tagName() {
    var _a;
    return (_a = this.nodeName) != null ? _a : "";
  }
  set tagName(value) {
    this.nodeName = value;
  }
  get textContent() {
    const text = [];
    getTextContent(this.childNodes, text);
    return text.join("");
  }
  set textContent(value) {
    setTextContent(this, value);
  }
  get title() {
    return this.getAttributeNS(null, "title") || "";
  }
  set title(value) {
    this.setAttributeNS(null, "title", value);
  }
  animate() {
  }
  onanimationstart() {
  }
  onanimationend() {
  }
  onanimationiteration() {
  }
  onabort() {
  }
  onauxclick() {
  }
  onbeforecopy() {
  }
  onbeforecut() {
  }
  onbeforepaste() {
  }
  onblur() {
  }
  oncancel() {
  }
  oncanplay() {
  }
  oncanplaythrough() {
  }
  onchange() {
  }
  onclick() {
  }
  onclose() {
  }
  oncontextmenu() {
  }
  oncopy() {
  }
  oncuechange() {
  }
  oncut() {
  }
  ondblclick() {
  }
  ondrag() {
  }
  ondragend() {
  }
  ondragenter() {
  }
  ondragleave() {
  }
  ondragover() {
  }
  ondragstart() {
  }
  ondrop() {
  }
  ondurationchange() {
  }
  onemptied() {
  }
  onended() {
  }
  onerror() {
  }
  onfocus() {
  }
  onfocusin() {
  }
  onfocusout() {
  }
  onformdata() {
  }
  onfullscreenchange() {
  }
  onfullscreenerror() {
  }
  ongotpointercapture() {
  }
  oninput() {
  }
  oninvalid() {
  }
  onkeydown() {
  }
  onkeypress() {
  }
  onkeyup() {
  }
  onload() {
  }
  onloadeddata() {
  }
  onloadedmetadata() {
  }
  onloadstart() {
  }
  onlostpointercapture() {
  }
  onmousedown() {
  }
  onmouseenter() {
  }
  onmouseleave() {
  }
  onmousemove() {
  }
  onmouseout() {
  }
  onmouseover() {
  }
  onmouseup() {
  }
  onmousewheel() {
  }
  onpaste() {
  }
  onpause() {
  }
  onplay() {
  }
  onplaying() {
  }
  onpointercancel() {
  }
  onpointerdown() {
  }
  onpointerenter() {
  }
  onpointerleave() {
  }
  onpointermove() {
  }
  onpointerout() {
  }
  onpointerover() {
  }
  onpointerup() {
  }
  onprogress() {
  }
  onratechange() {
  }
  onreset() {
  }
  onresize() {
  }
  onscroll() {
  }
  onsearch() {
  }
  onseeked() {
  }
  onseeking() {
  }
  onselect() {
  }
  onselectstart() {
  }
  onstalled() {
  }
  onsubmit() {
  }
  onsuspend() {
  }
  ontimeupdate() {
  }
  ontoggle() {
  }
  onvolumechange() {
  }
  onwaiting() {
  }
  onwebkitfullscreenchange() {
  }
  onwebkitfullscreenerror() {
  }
  onwheel() {
  }
  requestFullscreen() {
  }
  scrollBy() {
  }
  scrollTo() {
  }
  scrollIntoView() {
  }
  toString(opts) {
    return serializeNodeToHtml(this, opts);
  }
};
function getElementsByClassName(elm, classNames, foundElms) {
  const children = elm.children;
  for (let i = 0, ii = children.length; i < ii; i++) {
    const childElm = children[i];
    for (let j = 0, jj = classNames.length; j < jj; j++) {
      if (childElm.classList.contains(classNames[j])) {
        foundElms.push(childElm);
      }
    }
    getElementsByClassName(childElm, classNames, foundElms);
  }
}
function getElementsByTagName(elm, tagName, foundElms) {
  var _a;
  const children = elm.children;
  for (let i = 0, ii = children.length; i < ii; i++) {
    const childElm = children[i];
    if (tagName === "*" || ((_a = childElm.nodeName) != null ? _a : "").toLowerCase() === tagName) {
      foundElms.push(childElm);
    }
    getElementsByTagName(childElm, tagName, foundElms);
  }
}
function resetElement(elm) {
  resetEventListeners(elm);
  delete elm.__attributeMap;
  delete elm.__shadowRoot;
  delete elm.__style;
}
function insertBefore(parentNode, newNode, referenceNode) {
  if (newNode !== referenceNode) {
    newNode.remove();
    newNode.parentNode = parentNode;
    newNode.ownerDocument = parentNode.ownerDocument;
    if (referenceNode != null) {
      const index = parentNode.childNodes.indexOf(referenceNode);
      if (index > -1) {
        parentNode.childNodes.splice(index, 0, newNode);
      } else {
        throw new Error(`referenceNode not found in parentNode.childNodes`);
      }
    } else {
      parentNode.childNodes.push(newNode);
    }
    connectNode(parentNode.ownerDocument, newNode);
  }
  return newNode;
}
var MockHTMLElement = class extends MockElement {
  constructor(ownerDocument, nodeName) {
    super(ownerDocument, typeof nodeName === "string" ? nodeName.toUpperCase() : null);
    this.__namespaceURI = "http://www.w3.org/1999/xhtml";
  }
  get tagName() {
    var _a;
    return (_a = this.nodeName) != null ? _a : "";
  }
  set tagName(value) {
    this.nodeName = value;
  }
  /**
   * A node’s parent of type Element is known as its parent element.
   * If the node has a parent of a different type, its parent element
   * is null.
   * @returns MockElement
   */
  get parentElement() {
    if (this.nodeName === "HTML") {
      return null;
    }
    return super.parentElement;
  }
  get attributes() {
    if (this.__attributeMap == null) {
      const attrMap = createAttributeProxy(true);
      this.__attributeMap = attrMap;
      return attrMap;
    }
    return this.__attributeMap;
  }
  set attributes(attrs) {
    this.__attributeMap = attrs;
  }
};
var MockTextNode = class _MockTextNode extends MockNode2 {
  constructor(ownerDocument, text) {
    super(ownerDocument, 3 /* TEXT_NODE */, "#text" /* TEXT_NODE */, text);
  }
  cloneNode(_deep) {
    return new _MockTextNode(null, this.nodeValue);
  }
  get textContent() {
    return this.nodeValue;
  }
  set textContent(text) {
    this.nodeValue = text;
  }
  get data() {
    return this.nodeValue;
  }
  set data(text) {
    this.nodeValue = text;
  }
  get wholeText() {
    if (this.parentNode != null) {
      const text = [];
      for (let i = 0, ii = this.parentNode.childNodes.length; i < ii; i++) {
        const childNode = this.parentNode.childNodes[i];
        if (childNode.nodeType === 3 /* TEXT_NODE */) {
          text.push(childNode.nodeValue);
        }
      }
      return text.join("");
    }
    return this.nodeValue;
  }
};
function getTextContent(childNodes, text) {
  for (let i = 0, ii = childNodes.length; i < ii; i++) {
    const childNode = childNodes[i];
    if (childNode.nodeType === 3 /* TEXT_NODE */) {
      text.push(childNode.nodeValue);
    } else if (childNode.nodeType === 1 /* ELEMENT_NODE */) {
      getTextContent(childNode.childNodes, text);
    }
  }
}
function setTextContent(elm, text) {
  for (let i = elm.childNodes.length - 1; i >= 0; i--) {
    elm.removeChild(elm.childNodes[i]);
  }
  const textNode = new MockTextNode(elm.ownerDocument, text);
  elm.appendChild(textNode);
}

// src/mock-doc/comment-node.ts
var MockComment = class _MockComment extends MockNode2 {
  constructor(ownerDocument, data) {
    super(ownerDocument, 8 /* COMMENT_NODE */, "#comment" /* COMMENT_NODE */, data);
  }
  cloneNode(_deep) {
    return new _MockComment(null, this.nodeValue);
  }
  get textContent() {
    return this.nodeValue;
  }
  set textContent(text) {
    this.nodeValue = text;
  }
};

// src/mock-doc/document-fragment.ts
var MockDocumentFragment = class _MockDocumentFragment extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, null);
    this.nodeName = "#document-fragment" /* DOCUMENT_FRAGMENT_NODE */;
    this.nodeType = 11 /* DOCUMENT_FRAGMENT_NODE */;
  }
  getElementById(id) {
    return getElementById(this, id);
  }
  cloneNode(deep) {
    const cloned = new _MockDocumentFragment(null);
    if (deep) {
      for (let i = 0, ii = this.childNodes.length; i < ii; i++) {
        const childNode = this.childNodes[i];
        if (childNode.nodeType === 1 /* ELEMENT_NODE */ || childNode.nodeType === 3 /* TEXT_NODE */ || childNode.nodeType === 8 /* COMMENT_NODE */) {
          const clonedChildNode = this.childNodes[i].cloneNode(true);
          cloned.appendChild(clonedChildNode);
        }
      }
    }
    return cloned;
  }
};

// src/mock-doc/document-type-node.ts
var MockDocumentTypeNode = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "!DOCTYPE");
    this.nodeType = 10 /* DOCUMENT_TYPE_NODE */;
    this.setAttribute("html", "");
  }
};

// src/mock-doc/css-style-sheet.ts
var MockCSSRule = class {
  constructor(parentStyleSheet) {
    this.parentStyleSheet = parentStyleSheet;
    this.cssText = "";
    this.type = 0;
  }
};
var MockCSSStyleSheet = class {
  constructor(ownerNode) {
    this.type = "text/css";
    this.parentStyleSheet = null;
    this.cssRules = [];
    this.ownerNode = ownerNode;
  }
  get rules() {
    return this.cssRules;
  }
  set rules(rules) {
    this.cssRules = rules;
  }
  deleteRule(index) {
    if (index >= 0 && index < this.cssRules.length) {
      this.cssRules.splice(index, 1);
      updateStyleTextNode(this.ownerNode);
    }
  }
  insertRule(rule, index = 0) {
    if (typeof index !== "number") {
      index = 0;
    }
    if (index < 0) {
      index = 0;
    }
    if (index > this.cssRules.length) {
      index = this.cssRules.length;
    }
    const cssRule = new MockCSSRule(this);
    cssRule.cssText = rule;
    this.cssRules.splice(index, 0, cssRule);
    updateStyleTextNode(this.ownerNode);
    return index;
  }
};
function getStyleElementText(styleElm) {
  const output = [];
  for (let i = 0; i < styleElm.childNodes.length; i++) {
    output.push(styleElm.childNodes[i].nodeValue);
  }
  return output.join("");
}
function setStyleElementText(styleElm, text) {
  const sheet = styleElm.sheet;
  sheet.cssRules.length = 0;
  sheet.insertRule(text);
  updateStyleTextNode(styleElm);
}
function updateStyleTextNode(styleElm) {
  const childNodeLen = styleElm.childNodes.length;
  if (childNodeLen > 1) {
    for (let i = childNodeLen - 1; i >= 1; i--) {
      styleElm.removeChild(styleElm.childNodes[i]);
    }
  } else if (childNodeLen < 1) {
    styleElm.appendChild(styleElm.ownerDocument.createTextNode(""));
  }
  const textNode = styleElm.childNodes[0];
  textNode.nodeValue = styleElm.sheet.cssRules.map((r) => r.cssText).join("\n");
}

// src/mock-doc/element.ts
function createElement(ownerDocument, tagName) {
  if (typeof tagName !== "string" || tagName === "" || !/^[a-z0-9-_:]+$/i.test(tagName)) {
    throw new Error(`The tag name provided (${tagName}) is not a valid name.`);
  }
  tagName = tagName.toLowerCase();
  switch (tagName) {
    case "a":
      return new MockAnchorElement(ownerDocument);
    case "base":
      return new MockBaseElement(ownerDocument);
    case "button":
      return new MockButtonElement(ownerDocument);
    case "canvas":
      return new MockCanvasElement(ownerDocument);
    case "form":
      return new MockFormElement(ownerDocument);
    case "img":
      return new MockImageElement(ownerDocument);
    case "input":
      return new MockInputElement(ownerDocument);
    case "link":
      return new MockLinkElement(ownerDocument);
    case "meta":
      return new MockMetaElement(ownerDocument);
    case "script":
      return new MockScriptElement(ownerDocument);
    case "style":
      return new MockStyleElement(ownerDocument);
    case "template":
      return new MockTemplateElement(ownerDocument);
    case "title":
      return new MockTitleElement(ownerDocument);
    case "ul":
      return new MockUListElement(ownerDocument);
  }
  if (ownerDocument != null && tagName.includes("-")) {
    const win = ownerDocument.defaultView;
    if (win != null && win.customElements != null) {
      return createCustomElement(win.customElements, ownerDocument, tagName);
    }
  }
  return new MockHTMLElement(ownerDocument, tagName);
}
function createElementNS(ownerDocument, namespaceURI, tagName) {
  if (namespaceURI === "http://www.w3.org/1999/xhtml") {
    return createElement(ownerDocument, tagName);
  } else if (namespaceURI === "http://www.w3.org/2000/svg") {
    switch (tagName.toLowerCase()) {
      case "text":
      case "tspan":
      case "tref":
      case "altglyph":
      case "textpath":
        return new MockSVGTextContentElement(ownerDocument, tagName);
      case "circle":
      case "ellipse":
      case "image":
      case "line":
      case "path":
      case "polygon":
      case "polyline":
      case "rect":
      case "use":
        return new MockSVGGraphicsElement(ownerDocument, tagName);
      case "svg":
        return new MockSVGSVGElement(ownerDocument, tagName);
      default:
        return new MockSVGElement(ownerDocument, tagName);
    }
  } else {
    return new MockElement(ownerDocument, tagName, namespaceURI);
  }
}
var MockAnchorElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "a");
  }
  get href() {
    return fullUrl(this, "href");
  }
  set href(value) {
    this.setAttribute("href", value);
  }
  get pathname() {
    return new URL(this.href).pathname;
  }
};
var MockButtonElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "button");
  }
};
patchPropAttributes(
  MockButtonElement.prototype,
  {
    type: String
  },
  {
    type: "submit"
  }
);
var MockImageElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "img");
  }
  get draggable() {
    return this.getAttributeNS(null, "draggable") !== "false";
  }
  set draggable(value) {
    this.setAttributeNS(null, "draggable", value);
  }
  get src() {
    return fullUrl(this, "src");
  }
  set src(value) {
    this.setAttribute("src", value);
  }
};
patchPropAttributes(MockImageElement.prototype, {
  height: Number,
  width: Number
});
var MockInputElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "input");
  }
  get list() {
    const listId = this.getAttribute("list");
    if (listId) {
      return this.ownerDocument.getElementById(listId);
    }
    return null;
  }
};
patchPropAttributes(
  MockInputElement.prototype,
  {
    accept: String,
    autocomplete: String,
    autofocus: Boolean,
    capture: String,
    checked: Boolean,
    disabled: Boolean,
    form: String,
    formaction: String,
    formenctype: String,
    formmethod: String,
    formnovalidate: String,
    formtarget: String,
    height: Number,
    inputmode: String,
    max: String,
    maxLength: Number,
    min: String,
    minLength: Number,
    multiple: Boolean,
    name: String,
    pattern: String,
    placeholder: String,
    required: Boolean,
    readOnly: Boolean,
    size: Number,
    spellCheck: Boolean,
    src: String,
    step: String,
    type: String,
    value: String,
    width: Number
  },
  {
    type: "text"
  }
);
var MockFormElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "form");
  }
};
patchPropAttributes(MockFormElement.prototype, {
  name: String
});
var MockLinkElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "link");
  }
  get href() {
    return fullUrl(this, "href");
  }
  set href(value) {
    this.setAttribute("href", value);
  }
};
patchPropAttributes(MockLinkElement.prototype, {
  crossorigin: String,
  media: String,
  rel: String,
  type: String
});
var MockMetaElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "meta");
  }
};
patchPropAttributes(MockMetaElement.prototype, {
  charset: String,
  content: String,
  name: String
});
var MockScriptElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "script");
  }
  get src() {
    return fullUrl(this, "src");
  }
  set src(value) {
    this.setAttribute("src", value);
  }
};
patchPropAttributes(MockScriptElement.prototype, {
  type: String
});
var MockDOMMatrix = class _MockDOMMatrix {
  constructor() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
    this.m11 = 1;
    this.m12 = 0;
    this.m13 = 0;
    this.m14 = 0;
    this.m21 = 0;
    this.m22 = 1;
    this.m23 = 0;
    this.m24 = 0;
    this.m31 = 0;
    this.m32 = 0;
    this.m33 = 1;
    this.m34 = 0;
    this.m41 = 0;
    this.m42 = 0;
    this.m43 = 0;
    this.m44 = 1;
    this.is2D = true;
    this.isIdentity = true;
  }
  static fromMatrix() {
    return new _MockDOMMatrix();
  }
  inverse() {
    return new _MockDOMMatrix();
  }
  flipX() {
    return new _MockDOMMatrix();
  }
  flipY() {
    return new _MockDOMMatrix();
  }
  multiply() {
    return new _MockDOMMatrix();
  }
  rotate() {
    return new _MockDOMMatrix();
  }
  rotateAxisAngle() {
    return new _MockDOMMatrix();
  }
  rotateFromVector() {
    return new _MockDOMMatrix();
  }
  scale() {
    return new _MockDOMMatrix();
  }
  scaleNonUniform() {
    return new _MockDOMMatrix();
  }
  skewX() {
    return new _MockDOMMatrix();
  }
  skewY() {
    return new _MockDOMMatrix();
  }
  toJSON() {
  }
  toString() {
  }
  transformPoint() {
    return new MockDOMPoint();
  }
  translate() {
    return new _MockDOMMatrix();
  }
};
var MockDOMPoint = class {
  constructor() {
    this.w = 1;
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
  toJSON() {
  }
  matrixTransform() {
    return new MockDOMMatrix();
  }
};
var MockSVGRect = class {
  constructor() {
    this.height = 10;
    this.width = 10;
    this.x = 0;
    this.y = 0;
  }
};
var MockStyleElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "style");
    this.sheet = new MockCSSStyleSheet(this);
  }
  get innerHTML() {
    return getStyleElementText(this);
  }
  set innerHTML(value) {
    setStyleElementText(this, value);
  }
  get innerText() {
    return getStyleElementText(this);
  }
  set innerText(value) {
    setStyleElementText(this, value);
  }
  get textContent() {
    return getStyleElementText(this);
  }
  set textContent(value) {
    setStyleElementText(this, value);
  }
};
var MockSVGElement = class extends MockElement {
  constructor() {
    super(...arguments);
    this.__namespaceURI = "http://www.w3.org/2000/svg";
  }
  // SVGElement properties and methods
  get ownerSVGElement() {
    return null;
  }
  get viewportElement() {
    return null;
  }
  onunload() {
  }
  // SVGGeometryElement properties and methods
  get pathLength() {
    return 0;
  }
  isPointInFill(_pt) {
    return false;
  }
  isPointInStroke(_pt) {
    return false;
  }
  getTotalLength() {
    return 0;
  }
};
var MockSVGGraphicsElement = class extends MockSVGElement {
  getBBox(_options) {
    return new MockSVGRect();
  }
  getCTM() {
    return new MockDOMMatrix();
  }
  getScreenCTM() {
    return new MockDOMMatrix();
  }
};
var MockSVGSVGElement = class extends MockSVGGraphicsElement {
  createSVGPoint() {
    return new MockDOMPoint();
  }
};
var MockSVGTextContentElement = class extends MockSVGGraphicsElement {
  getComputedTextLength() {
    return 0;
  }
};
var MockBaseElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "base");
  }
  get href() {
    return fullUrl(this, "href");
  }
  set href(value) {
    this.setAttribute("href", value);
  }
};
var MockTemplateElement = class _MockTemplateElement extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "template");
    this.content = new MockDocumentFragment(ownerDocument);
  }
  get innerHTML() {
    return this.content.innerHTML;
  }
  set innerHTML(html) {
    this.content.innerHTML = html;
  }
  cloneNode(deep) {
    const cloned = new _MockTemplateElement(null);
    cloned.attributes = cloneAttributes(this.attributes);
    const styleCssText = this.getAttribute("style");
    if (styleCssText != null && styleCssText.length > 0) {
      cloned.setAttribute("style", styleCssText);
    }
    cloned.content = this.content.cloneNode(deep);
    if (deep) {
      for (let i = 0, ii = this.childNodes.length; i < ii; i++) {
        const clonedChildNode = this.childNodes[i].cloneNode(true);
        cloned.appendChild(clonedChildNode);
      }
    }
    return cloned;
  }
};
var MockTitleElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "title");
  }
  get text() {
    return this.textContent;
  }
  set text(value) {
    this.textContent = value;
  }
};
var MockUListElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "ul");
  }
};
var MockCanvasElement = class extends MockHTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, "canvas");
  }
  getContext() {
    return {
      fillRect() {
        return;
      },
      clearRect() {
      },
      getImageData: function(_, __, w, h) {
        return {
          data: new Array(w * h * 4)
        };
      },
      putImageData() {
      },
      createImageData: function() {
        return [];
      },
      setTransform() {
      },
      drawImage() {
      },
      save() {
      },
      fillText() {
      },
      restore() {
      },
      beginPath() {
      },
      moveTo() {
      },
      lineTo() {
      },
      closePath() {
      },
      stroke() {
      },
      translate() {
      },
      scale() {
      },
      rotate() {
      },
      arc() {
      },
      fill() {
      },
      measureText() {
        return { width: 0 };
      },
      transform() {
      },
      rect() {
      },
      clip() {
      }
    };
  }
};
function fullUrl(elm, attrName) {
  const val = elm.getAttribute(attrName) || "";
  if (elm.ownerDocument != null) {
    const win = elm.ownerDocument.defaultView;
    if (win != null) {
      const loc = win.location;
      if (loc != null) {
        try {
          const url = new URL(val, loc.href);
          return url.href;
        } catch (e2) {
        }
      }
    }
  }
  return val.replace(/\'|\"/g, "").trim();
}
function patchPropAttributes(prototype, attrs, defaults = {}) {
  Object.keys(attrs).forEach((propName) => {
    const attr = attrs[propName];
    const defaultValue = defaults[propName];
    if (attr === Boolean) {
      Object.defineProperty(prototype, propName, {
        get() {
          return this.hasAttribute(propName);
        },
        set(value) {
          if (value) {
            this.setAttribute(propName, "");
          } else {
            this.removeAttribute(propName);
          }
        }
      });
    } else if (attr === Number) {
      Object.defineProperty(prototype, propName, {
        get() {
          const value = this.getAttribute(propName);
          return value ? parseInt(value, 10) : defaultValue === void 0 ? 0 : defaultValue;
        },
        set(value) {
          this.setAttribute(propName, value);
        }
      });
    } else {
      Object.defineProperty(prototype, propName, {
        get() {
          return this.hasAttribute(propName) ? this.getAttribute(propName) : defaultValue || "";
        },
        set(value) {
          this.setAttribute(propName, value);
        }
      });
    }
  });
}
MockElement.prototype.cloneNode = function(deep) {
  const cloned = createElement(this.ownerDocument, this.nodeName);
  cloned.attributes = cloneAttributes(this.attributes);
  const styleCssText = this.getAttribute("style");
  if (styleCssText != null && styleCssText.length > 0) {
    cloned.setAttribute("style", styleCssText);
  }
  if (deep) {
    for (let i = 0, ii = this.childNodes.length; i < ii; i++) {
      const clonedChildNode = this.childNodes[i].cloneNode(true);
      cloned.appendChild(clonedChildNode);
    }
  }
  return cloned;
};

// src/mock-doc/parse-html.ts
var sharedDocument;
function parseHtmlToDocument(html, ownerDocument = null) {
  if (ownerDocument == null) {
    if (sharedDocument == null) {
      sharedDocument = new MockDocument();
    }
    ownerDocument = sharedDocument;
  }
  return parseDocumentUtil(ownerDocument, html);
}
function parseHtmlToFragment(html, ownerDocument = null) {
  if (ownerDocument == null) {
    if (sharedDocument == null) {
      sharedDocument = new MockDocument();
    }
    ownerDocument = sharedDocument;
  }
  return parseFragmentUtil(ownerDocument, html);
}

// src/mock-doc/console.ts
var consoleNoop = () => {
};
function createConsole() {
  return {
    debug: consoleNoop,
    error: consoleNoop,
    info: consoleNoop,
    log: consoleNoop,
    warn: consoleNoop,
    dir: consoleNoop,
    dirxml: consoleNoop,
    table: consoleNoop,
    trace: consoleNoop,
    group: consoleNoop,
    groupCollapsed: consoleNoop,
    groupEnd: consoleNoop,
    clear: consoleNoop,
    count: consoleNoop,
    countReset: consoleNoop,
    assert: consoleNoop,
    profile: consoleNoop,
    profileEnd: consoleNoop,
    time: consoleNoop,
    timeLog: consoleNoop,
    timeEnd: consoleNoop,
    timeStamp: consoleNoop,
    context: consoleNoop,
    memory: consoleNoop
  };
}

// src/mock-doc/headers.ts
var MockHeaders = class {
  constructor(init) {
    this._values = [];
    if (typeof init === "object") {
      if (typeof init[Symbol.iterator] === "function") {
        const kvs = [];
        for (const kv of init) {
          if (typeof kv[Symbol.iterator] === "function") {
            kvs.push([...kv]);
          }
        }
        for (const kv of kvs) {
          this.append(kv[0], kv[1]);
        }
      } else {
        for (const key in init) {
          this.append(key, init[key]);
        }
      }
    }
  }
  append(key, value) {
    this._values.push([key, value + ""]);
  }
  delete(key) {
    key = key.toLowerCase();
    for (let i = this._values.length - 1; i >= 0; i--) {
      if (this._values[i][0].toLowerCase() === key) {
        this._values.splice(i, 1);
      }
    }
  }
  entries() {
    const entries = [];
    for (const kv of this.keys()) {
      entries.push([kv, this.get(kv)]);
    }
    let index = -1;
    return {
      next() {
        index++;
        return {
          value: entries[index],
          done: !entries[index]
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }
  forEach(cb) {
    for (const kv of this.entries()) {
      cb(kv[1], kv[0]);
    }
  }
  get(key) {
    const rtn = [];
    key = key.toLowerCase();
    for (const kv of this._values) {
      if (kv[0].toLowerCase() === key) {
        rtn.push(kv[1]);
      }
    }
    return rtn.length > 0 ? rtn.join(", ") : null;
  }
  has(key) {
    key = key.toLowerCase();
    for (const kv of this._values) {
      if (kv[0].toLowerCase() === key) {
        return true;
      }
    }
    return false;
  }
  keys() {
    const keys = [];
    for (const kv of this._values) {
      const key = kv[0].toLowerCase();
      if (!keys.includes(key)) {
        keys.push(key);
      }
    }
    let index = -1;
    return {
      next() {
        index++;
        return {
          value: keys[index],
          done: !keys[index]
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }
  set(key, value) {
    for (const kv of this._values) {
      if (kv[0].toLowerCase() === key.toLowerCase()) {
        kv[1] = value + "";
        return;
      }
    }
    this.append(key, value);
  }
  values() {
    const values = this._values;
    let index = -1;
    return {
      next() {
        index++;
        const done = !values[index];
        return {
          value: done ? void 0 : values[index][1],
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }
  [Symbol.iterator]() {
    return this.entries();
  }
};

// src/mock-doc/parser.ts
var MockDOMParser = class {
  parseFromString(htmlToParse, mimeType) {
    if (mimeType !== "text/html") {
      console.error("XML parsing not implemented yet, continuing as html");
    }
    return parseHtmlToDocument(htmlToParse);
  }
};

// src/mock-doc/request-response.ts
var MockRequest = class _MockRequest {
  constructor(input, init = {}) {
    this._method = "GET";
    this._url = "/";
    this.bodyUsed = false;
    this.cache = "default";
    this.credentials = "same-origin";
    this.integrity = "";
    this.keepalive = false;
    this.mode = "cors";
    this.redirect = "follow";
    this.referrer = "about:client";
    this.referrerPolicy = "";
    if (typeof input === "string") {
      this.url = input;
    } else if (input) {
      Object.assign(this, input);
      this.headers = new MockHeaders(input.headers);
    }
    Object.assign(this, init);
    if (init.headers) {
      this.headers = new MockHeaders(init.headers);
    }
    if (!this.headers) {
      this.headers = new MockHeaders();
    }
  }
  get url() {
    if (typeof this._url === "string") {
      return new URL(this._url, location.href).href;
    }
    return new URL("/", location.href).href;
  }
  set url(value) {
    this._url = value;
  }
  get method() {
    if (typeof this._method === "string") {
      return this._method.toUpperCase();
    }
    return "GET";
  }
  set method(value) {
    this._method = value;
  }
  clone() {
    const clone = { ...this };
    clone.headers = new MockHeaders(this.headers);
    return new _MockRequest(clone);
  }
};
var MockResponse = class _MockResponse {
  constructor(body, init = {}) {
    this.ok = true;
    this.status = 200;
    this.statusText = "";
    this.type = "default";
    this.url = "";
    this._body = body;
    if (init) {
      Object.assign(this, init);
    }
    this.headers = new MockHeaders(init.headers);
  }
  async json() {
    return JSON.parse(this._body);
  }
  async text() {
    return this._body;
  }
  clone() {
    const initClone = { ...this };
    initClone.headers = new MockHeaders(this.headers);
    return new _MockResponse(this._body, initClone);
  }
};

// src/mock-doc/global.ts
function setupGlobal(gbl) {
  if (gbl.window == null) {
    const win = gbl.window = new MockWindow();
    WINDOW_FUNCTIONS.forEach((fnName) => {
      if (!(fnName in gbl)) {
        gbl[fnName] = win[fnName].bind(win);
      }
    });
    WINDOW_PROPS.forEach((propName) => {
      if (!(propName in gbl)) {
        Object.defineProperty(gbl, propName, {
          get() {
            return win[propName];
          },
          set(val) {
            win[propName] = val;
          },
          configurable: true,
          enumerable: true
        });
      }
    });
    GLOBAL_CONSTRUCTORS.forEach(([cstrName]) => {
      gbl[cstrName] = win[cstrName];
    });
  }
  return gbl.window;
}
function teardownGlobal(gbl) {
  const win = gbl.window;
  if (win && typeof win.close === "function") {
    win.close();
  }
}
function patchWindow(winToBePatched) {
  const mockWin = new MockWindow(false);
  WINDOW_FUNCTIONS.forEach((fnName) => {
    if (typeof winToBePatched[fnName] !== "function") {
      winToBePatched[fnName] = mockWin[fnName].bind(mockWin);
    }
  });
  WINDOW_PROPS.forEach((propName) => {
    if (winToBePatched === void 0) {
      Object.defineProperty(winToBePatched, propName, {
        get() {
          return mockWin[propName];
        },
        set(val) {
          mockWin[propName] = val;
        },
        configurable: true,
        enumerable: true
      });
    }
  });
}
function addGlobalsToWindowPrototype(mockWinPrototype) {
  GLOBAL_CONSTRUCTORS.forEach(([cstrName, Cstr]) => {
    Object.defineProperty(mockWinPrototype, cstrName, {
      get() {
        return this["__" + cstrName] || Cstr;
      },
      set(cstr) {
        this["__" + cstrName] = cstr;
      },
      configurable: true,
      enumerable: true
    });
  });
}
var WINDOW_FUNCTIONS = [
  "addEventListener",
  "alert",
  "blur",
  "cancelAnimationFrame",
  "cancelIdleCallback",
  "clearInterval",
  "clearTimeout",
  "close",
  "confirm",
  "dispatchEvent",
  "focus",
  "getComputedStyle",
  "matchMedia",
  "open",
  "prompt",
  "removeEventListener",
  "requestAnimationFrame",
  "requestIdleCallback",
  "URL"
];
var WINDOW_PROPS = [
  "customElements",
  "devicePixelRatio",
  "document",
  "history",
  "innerHeight",
  "innerWidth",
  "localStorage",
  "location",
  "navigator",
  "pageXOffset",
  "pageYOffset",
  "performance",
  "screenLeft",
  "screenTop",
  "screenX",
  "screenY",
  "scrollX",
  "scrollY",
  "sessionStorage",
  "CSS",
  "CustomEvent",
  "Event",
  "Element",
  "HTMLElement",
  "Node",
  "NodeList",
  "FocusEvent",
  "KeyboardEvent",
  "MouseEvent"
];
var GLOBAL_CONSTRUCTORS = [
  ["CustomEvent", MockCustomEvent],
  ["Event", MockEvent],
  ["Headers", MockHeaders],
  ["FocusEvent", MockFocusEvent],
  ["KeyboardEvent", MockKeyboardEvent],
  ["MouseEvent", MockMouseEvent],
  ["Request", MockRequest],
  ["Response", MockResponse],
  ["DOMParser", MockDOMParser],
  ["HTMLAnchorElement", MockAnchorElement],
  ["HTMLBaseElement", MockBaseElement],
  ["HTMLButtonElement", MockButtonElement],
  ["HTMLCanvasElement", MockCanvasElement],
  ["HTMLFormElement", MockFormElement],
  ["HTMLImageElement", MockImageElement],
  ["HTMLInputElement", MockInputElement],
  ["HTMLLinkElement", MockLinkElement],
  ["HTMLMetaElement", MockMetaElement],
  ["HTMLScriptElement", MockScriptElement],
  ["HTMLStyleElement", MockStyleElement],
  ["HTMLTemplateElement", MockTemplateElement],
  ["HTMLTitleElement", MockTitleElement],
  ["HTMLUListElement", MockUListElement]
];

// src/mock-doc/history.ts
var MockHistory = class {
  constructor() {
    this.items = [];
  }
  get length() {
    return this.items.length;
  }
  back() {
    this.go(-1);
  }
  forward() {
    this.go(1);
  }
  go(_value) {
  }
  pushState(_state, _title, _url) {
  }
  replaceState(_state, _title, _url) {
  }
};

// src/mock-doc/intersection-observer.ts
var MockIntersectionObserver = class {
  constructor() {
  }
  disconnect() {
  }
  observe() {
  }
  takeRecords() {
    return [];
  }
  unobserve() {
  }
};

// src/mock-doc/location.ts
var MockLocation = class {
  constructor() {
    this.ancestorOrigins = null;
    this.protocol = "";
    this.host = "";
    this.hostname = "";
    this.port = "";
    this.pathname = "";
    this.search = "";
    this.hash = "";
    this.username = "";
    this.password = "";
    this.origin = "";
    this._href = "";
  }
  get href() {
    return this._href;
  }
  set href(value) {
    const url = new URL(value, "http://mockdoc.stenciljs.com");
    this._href = url.href;
    this.protocol = url.protocol;
    this.host = url.host;
    this.hostname = url.hostname;
    this.port = url.port;
    this.pathname = url.pathname;
    this.search = url.search;
    this.hash = url.hash;
    this.username = url.username;
    this.password = url.password;
    this.origin = url.origin;
  }
  assign(_url) {
  }
  reload(_forcedReload) {
  }
  replace(_url) {
  }
  toString() {
    return this.href;
  }
};

// src/mock-doc/navigator.ts
var MockNavigator = class {
  constructor() {
    this.appCodeName = "MockNavigator";
    this.appName = "MockNavigator";
    this.appVersion = "MockNavigator";
    this.platform = "MockNavigator";
    this.userAgent = "MockNavigator";
  }
};

// src/mock-doc/performance.ts
var MockPerformance = class {
  constructor() {
    this.timeOrigin = Date.now();
    this.eventCounts = /* @__PURE__ */ new Map();
  }
  addEventListener() {
  }
  clearMarks() {
  }
  clearMeasures() {
  }
  clearResourceTimings() {
  }
  dispatchEvent() {
    return true;
  }
  getEntries() {
    return [];
  }
  getEntriesByName() {
    return [];
  }
  getEntriesByType() {
    return [];
  }
  // Stencil's implementation of `mark` is non-compliant with the `Performance` interface. Because Stencil will
  // instantiate an instance of this class and may attempt to assign it to a variable of type `Performance`, the return
  // type must match the `Performance` interface (rather than typing this function as returning `void` and ignoring the
  // associated errors returned by the type checker)
  // @ts-ignore
  mark() {
  }
  // Stencil's implementation of `measure` is non-compliant with the `Performance` interface. Because Stencil will
  // instantiate an instance of this class and may attempt to assign it to a variable of type `Performance`, the return
  // type must match the `Performance` interface (rather than typing this function as returning `void` and ignoring the
  // associated errors returned by the type checker)
  // @ts-ignore
  measure() {
  }
  get navigation() {
    return {};
  }
  now() {
    return Date.now() - this.timeOrigin;
  }
  get onresourcetimingbufferfull() {
    return null;
  }
  removeEventListener() {
  }
  setResourceTimingBufferSize() {
  }
  get timing() {
    return {};
  }
  toJSON() {
  }
};
function resetPerformance(perf) {
  if (perf != null) {
    try {
      perf.timeOrigin = Date.now();
    } catch (e2) {
    }
  }
}

// src/mock-doc/storage.ts
var MockStorage = class {
  constructor() {
    this.items = /* @__PURE__ */ new Map();
  }
  key(_value) {
  }
  getItem(key) {
    key = String(key);
    if (this.items.has(key)) {
      return this.items.get(key);
    }
    return null;
  }
  setItem(key, value) {
    if (value == null) {
      value = "null";
    }
    this.items.set(String(key), String(value));
  }
  removeItem(key) {
    this.items.delete(String(key));
  }
  clear() {
    this.items.clear();
  }
};

// src/mock-doc/window.ts
var nativeClearInterval = clearInterval;
var nativeClearTimeout = clearTimeout;
var nativeSetInterval = setInterval;
var nativeSetTimeout = setTimeout;
var nativeURL = URL;
var MockWindow = class {
  constructor(html = null) {
    if (html !== false) {
      this.document = new MockDocument(html, this);
    } else {
      this.document = null;
    }
    this.performance = new MockPerformance();
    this.customElements = new MockCustomElementRegistry(this);
    this.console = createConsole();
    resetWindowDefaults(this);
    resetWindowDimensions(this);
  }
  addEventListener(type, handler) {
    addEventListener(this, type, handler);
  }
  alert(msg) {
    if (this.console) {
      this.console.debug(msg);
    } else {
      console.debug(msg);
    }
  }
  blur() {
  }
  cancelAnimationFrame(id) {
    this.__clearTimeout(id);
  }
  cancelIdleCallback(id) {
    this.__clearTimeout(id);
  }
  get CharacterData() {
    if (this.__charDataCstr == null) {
      const ownerDocument = this.document;
      this.__charDataCstr = class extends MockNode2 {
        constructor() {
          super(ownerDocument, 0, "test", "");
          throw new Error("Illegal constructor: cannot construct CharacterData");
        }
      };
    }
    return this.__charDataCstr;
  }
  set CharacterData(charDataCstr) {
    this.__charDataCstr = charDataCstr;
  }
  clearInterval(id) {
    this.__clearInterval(id);
  }
  clearTimeout(id) {
    this.__clearTimeout(id);
  }
  close() {
    resetWindow(this);
  }
  confirm() {
    return false;
  }
  get CSS() {
    return {
      supports: () => true
    };
  }
  get Document() {
    if (this.__docCstr == null) {
      const win = this;
      this.__docCstr = class extends MockDocument {
        constructor() {
          super(false, win);
          throw new Error("Illegal constructor: cannot construct Document");
        }
      };
    }
    return this.__docCstr;
  }
  set Document(docCstr) {
    this.__docCstr = docCstr;
  }
  get DocumentFragment() {
    if (this.__docFragCstr == null) {
      const ownerDocument = this.document;
      this.__docFragCstr = class extends MockDocumentFragment {
        constructor() {
          super(ownerDocument);
          throw new Error("Illegal constructor: cannot construct DocumentFragment");
        }
      };
    }
    return this.__docFragCstr;
  }
  set DocumentFragment(docFragCstr) {
    this.__docFragCstr = docFragCstr;
  }
  get DocumentType() {
    if (this.__docTypeCstr == null) {
      const ownerDocument = this.document;
      this.__docTypeCstr = class extends MockNode2 {
        constructor() {
          super(ownerDocument, 0, "test", "");
          throw new Error("Illegal constructor: cannot construct DocumentType");
        }
      };
    }
    return this.__docTypeCstr;
  }
  set DocumentType(docTypeCstr) {
    this.__docTypeCstr = docTypeCstr;
  }
  get DOMTokenList() {
    if (this.__domTokenListCstr == null) {
      this.__domTokenListCstr = class MockDOMTokenList {
      };
    }
    return this.__domTokenListCstr;
  }
  set DOMTokenList(domTokenListCstr) {
    this.__domTokenListCstr = domTokenListCstr;
  }
  dispatchEvent(ev) {
    return dispatchEvent(this, ev);
  }
  get Element() {
    if (this.__elementCstr == null) {
      const ownerDocument = this.document;
      this.__elementCstr = class extends MockElement {
        constructor() {
          super(ownerDocument, "");
          throw new Error("Illegal constructor: cannot construct Element");
        }
      };
    }
    return this.__elementCstr;
  }
  fetch(input, init) {
    if (typeof fetch === "function") {
      return fetch(input, init);
    }
    throw new Error(`fetch() not implemented`);
  }
  focus() {
  }
  getComputedStyle(_) {
    return {
      cssText: "",
      length: 0,
      parentRule: null,
      getPropertyPriority() {
        return null;
      },
      getPropertyValue() {
        return "";
      },
      item() {
        return null;
      },
      removeProperty() {
        return null;
      },
      setProperty() {
        return null;
      }
    };
  }
  get globalThis() {
    return this;
  }
  get history() {
    if (this.__history == null) {
      this.__history = new MockHistory();
    }
    return this.__history;
  }
  set history(hsty) {
    this.__history = hsty;
  }
  get JSON() {
    return JSON;
  }
  get HTMLElement() {
    if (this.__htmlElementCstr == null) {
      const ownerDocument = this.document;
      this.__htmlElementCstr = class extends MockHTMLElement {
        constructor() {
          super(ownerDocument, "");
          const observedAttributes = this.constructor.observedAttributes;
          if (Array.isArray(observedAttributes) && typeof this.attributeChangedCallback === "function") {
            observedAttributes.forEach((attrName) => {
              const attrValue = this.getAttribute(attrName);
              if (attrValue != null) {
                this.attributeChangedCallback(attrName, null, attrValue);
              }
            });
          }
        }
      };
    }
    return this.__htmlElementCstr;
  }
  set HTMLElement(htmlElementCstr) {
    this.__htmlElementCstr = htmlElementCstr;
  }
  get IntersectionObserver() {
    return MockIntersectionObserver;
  }
  get localStorage() {
    if (this.__localStorage == null) {
      this.__localStorage = new MockStorage();
    }
    return this.__localStorage;
  }
  set localStorage(locStorage) {
    this.__localStorage = locStorage;
  }
  get location() {
    if (this.__location == null) {
      this.__location = new MockLocation();
    }
    return this.__location;
  }
  set location(val) {
    if (typeof val === "string") {
      if (this.__location == null) {
        this.__location = new MockLocation();
      }
      this.__location.href = val;
    } else {
      this.__location = val;
    }
  }
  matchMedia(media) {
    return {
      media,
      matches: false,
      addListener: (_handler) => {
      },
      removeListener: (_handler) => {
      },
      addEventListener: (_type, _handler) => {
      },
      removeEventListener: (_type, _handler) => {
      },
      dispatchEvent: (_ev) => {
      },
      onchange: null
    };
  }
  get Node() {
    if (this.__nodeCstr == null) {
      const ownerDocument = this.document;
      this.__nodeCstr = class extends MockNode2 {
        constructor() {
          super(ownerDocument, 0, "test", "");
          throw new Error("Illegal constructor: cannot construct Node");
        }
      };
    }
    return this.__nodeCstr;
  }
  get NodeList() {
    if (this.__nodeListCstr == null) {
      const ownerDocument = this.document;
      this.__nodeListCstr = class extends MockNodeList {
        constructor() {
          super(ownerDocument, [], 0);
          throw new Error("Illegal constructor: cannot construct NodeList");
        }
      };
    }
    return this.__nodeListCstr;
  }
  get navigator() {
    if (this.__navigator == null) {
      this.__navigator = new MockNavigator();
    }
    return this.__navigator;
  }
  set navigator(nav) {
    this.__navigator = nav;
  }
  get parent() {
    return null;
  }
  prompt() {
    return "";
  }
  open() {
    return null;
  }
  get origin() {
    return this.location.origin;
  }
  removeEventListener(type, handler) {
    removeEventListener(this, type, handler);
  }
  requestAnimationFrame(callback) {
    return this.setTimeout(() => {
      callback(Date.now());
    }, 0);
  }
  requestIdleCallback(callback) {
    return this.setTimeout(() => {
      callback({
        didTimeout: false,
        timeRemaining: () => 0
      });
    }, 0);
  }
  scroll(_x, _y) {
  }
  scrollBy(_x, _y) {
  }
  scrollTo(_x, _y) {
  }
  get self() {
    return this;
  }
  get sessionStorage() {
    if (this.__sessionStorage == null) {
      this.__sessionStorage = new MockStorage();
    }
    return this.__sessionStorage;
  }
  set sessionStorage(locStorage) {
    this.__sessionStorage = locStorage;
  }
  setInterval(callback, ms, ...args) {
    if (this.__timeouts == null) {
      this.__timeouts = /* @__PURE__ */ new Set();
    }
    ms = Math.min(ms, this.__maxTimeout);
    if (this.__allowInterval) {
      const intervalId = this.__setInterval(() => {
        if (this.__timeouts) {
          this.__timeouts.delete(intervalId);
          try {
            callback(...args);
          } catch (e2) {
            if (this.console) {
              this.console.error(e2);
            } else {
              console.error(e2);
            }
          }
        }
      }, ms);
      if (this.__timeouts) {
        this.__timeouts.add(intervalId);
      }
      return intervalId;
    }
    const timeoutId = this.__setTimeout(() => {
      if (this.__timeouts) {
        this.__timeouts.delete(timeoutId);
        try {
          callback(...args);
        } catch (e2) {
          if (this.console) {
            this.console.error(e2);
          } else {
            console.error(e2);
          }
        }
      }
    }, ms);
    if (this.__timeouts) {
      this.__timeouts.add(timeoutId);
    }
    return timeoutId;
  }
  setTimeout(callback, ms, ...args) {
    if (this.__timeouts == null) {
      this.__timeouts = /* @__PURE__ */ new Set();
    }
    ms = Math.min(ms, this.__maxTimeout);
    const timeoutId = this.__setTimeout(() => {
      if (this.__timeouts) {
        this.__timeouts.delete(timeoutId);
        try {
          callback(...args);
        } catch (e2) {
          if (this.console) {
            this.console.error(e2);
          } else {
            console.error(e2);
          }
        }
      }
    }, ms);
    if (this.__timeouts) {
      this.__timeouts.add(timeoutId);
    }
    return timeoutId;
  }
  get top() {
    return this;
  }
  get window() {
    return this;
  }
  onanimationstart() {
  }
  onanimationend() {
  }
  onanimationiteration() {
  }
  onabort() {
  }
  onauxclick() {
  }
  onbeforecopy() {
  }
  onbeforecut() {
  }
  onbeforepaste() {
  }
  onblur() {
  }
  oncancel() {
  }
  oncanplay() {
  }
  oncanplaythrough() {
  }
  onchange() {
  }
  onclick() {
  }
  onclose() {
  }
  oncontextmenu() {
  }
  oncopy() {
  }
  oncuechange() {
  }
  oncut() {
  }
  ondblclick() {
  }
  ondrag() {
  }
  ondragend() {
  }
  ondragenter() {
  }
  ondragleave() {
  }
  ondragover() {
  }
  ondragstart() {
  }
  ondrop() {
  }
  ondurationchange() {
  }
  onemptied() {
  }
  onended() {
  }
  onerror() {
  }
  onfocus() {
  }
  onfocusin() {
  }
  onfocusout() {
  }
  onformdata() {
  }
  onfullscreenchange() {
  }
  onfullscreenerror() {
  }
  ongotpointercapture() {
  }
  oninput() {
  }
  oninvalid() {
  }
  onkeydown() {
  }
  onkeypress() {
  }
  onkeyup() {
  }
  onload() {
  }
  onloadeddata() {
  }
  onloadedmetadata() {
  }
  onloadstart() {
  }
  onlostpointercapture() {
  }
  onmousedown() {
  }
  onmouseenter() {
  }
  onmouseleave() {
  }
  onmousemove() {
  }
  onmouseout() {
  }
  onmouseover() {
  }
  onmouseup() {
  }
  onmousewheel() {
  }
  onpaste() {
  }
  onpause() {
  }
  onplay() {
  }
  onplaying() {
  }
  onpointercancel() {
  }
  onpointerdown() {
  }
  onpointerenter() {
  }
  onpointerleave() {
  }
  onpointermove() {
  }
  onpointerout() {
  }
  onpointerover() {
  }
  onpointerup() {
  }
  onprogress() {
  }
  onratechange() {
  }
  onreset() {
  }
  onresize() {
  }
  onscroll() {
  }
  onsearch() {
  }
  onseeked() {
  }
  onseeking() {
  }
  onselect() {
  }
  onselectstart() {
  }
  onstalled() {
  }
  onsubmit() {
  }
  onsuspend() {
  }
  ontimeupdate() {
  }
  ontoggle() {
  }
  onvolumechange() {
  }
  onwaiting() {
  }
  onwebkitfullscreenchange() {
  }
  onwebkitfullscreenerror() {
  }
  onwheel() {
  }
};
addGlobalsToWindowPrototype(MockWindow.prototype);
function resetWindowDefaults(win) {
  win.__clearInterval = nativeClearInterval;
  win.__clearTimeout = nativeClearTimeout;
  win.__setInterval = nativeSetInterval;
  win.__setTimeout = nativeSetTimeout;
  win.__maxTimeout = 3e4;
  win.__allowInterval = true;
  win.URL = nativeURL;
}
function cloneWindow(srcWin, opts = {}) {
  if (srcWin == null) {
    return null;
  }
  const clonedWin = new MockWindow(false);
  if (!opts.customElementProxy) {
    srcWin.customElements = null;
  }
  if (srcWin.document != null) {
    const clonedDoc = new MockDocument(false, clonedWin);
    clonedWin.document = clonedDoc;
    clonedDoc.documentElement = srcWin.document.documentElement.cloneNode(true);
  } else {
    clonedWin.document = new MockDocument(null, clonedWin);
  }
  return clonedWin;
}
function cloneDocument(srcDoc) {
  if (srcDoc == null) {
    return null;
  }
  const dstWin = cloneWindow(srcDoc.defaultView);
  return dstWin.document;
}
function constrainTimeouts(win) {
  win.__allowInterval = false;
  win.__maxTimeout = 0;
}
function resetWindow(win) {
  if (win != null) {
    if (win.__timeouts) {
      win.__timeouts.forEach((timeoutId) => {
        nativeClearInterval(timeoutId);
        nativeClearTimeout(timeoutId);
      });
      win.__timeouts.clear();
    }
    if (win.customElements && win.customElements.clear) {
      win.customElements.clear();
    }
    resetDocument(win.document);
    resetPerformance(win.performance);
    for (const key in win) {
      if (win.hasOwnProperty(key) && key !== "document" && key !== "performance" && key !== "customElements") {
        delete win[key];
      }
    }
    resetWindowDefaults(win);
    resetWindowDimensions(win);
    resetEventListeners(win);
    if (win.document != null) {
      try {
        win.document.defaultView = win;
      } catch (e2) {
      }
    }
    win.fetch = null;
    win.Headers = null;
    win.Request = null;
    win.Response = null;
    win.FetchError = null;
  }
}
function resetWindowDimensions(win) {
  try {
    win.devicePixelRatio = 1;
    win.innerHeight = 768;
    win.innerWidth = 1366;
    win.pageXOffset = 0;
    win.pageYOffset = 0;
    win.screenLeft = 0;
    win.screenTop = 0;
    win.screenX = 0;
    win.screenY = 0;
    win.scrollX = 0;
    win.scrollY = 0;
    win.screen = {
      availHeight: win.innerHeight,
      availLeft: 0,
      availTop: 0,
      availWidth: win.innerWidth,
      colorDepth: 24,
      height: win.innerHeight,
      keepAwake: false,
      orientation: {
        angle: 0,
        type: "portrait-primary"
      },
      pixelDepth: 24,
      width: win.innerWidth
    };
  } catch (e2) {
  }
}

// src/mock-doc/document.ts
var MockDocument = class _MockDocument extends MockHTMLElement {
  constructor(html = null, win = null) {
    super(null, null);
    this.nodeName = "#document" /* DOCUMENT_NODE */;
    this.nodeType = 9 /* DOCUMENT_NODE */;
    this.defaultView = win;
    this.cookie = "";
    this.referrer = "";
    this.appendChild(this.createDocumentTypeNode());
    if (typeof html === "string") {
      const parsedDoc = parseDocumentUtil(this, html);
      const documentElement = parsedDoc.children.find((elm) => elm.nodeName === "HTML");
      if (documentElement != null) {
        this.appendChild(documentElement);
        setOwnerDocument(documentElement, this);
      }
    } else if (html !== false) {
      const documentElement = new MockHTMLElement(this, "html");
      this.appendChild(documentElement);
      documentElement.appendChild(new MockHTMLElement(this, "head"));
      documentElement.appendChild(new MockHTMLElement(this, "body"));
    }
  }
  get dir() {
    return this.documentElement.dir;
  }
  set dir(value) {
    this.documentElement.dir = value;
  }
  get localName() {
    throw new Error("Unimplemented");
  }
  get location() {
    if (this.defaultView != null) {
      return this.defaultView.location;
    }
    return null;
  }
  set location(val) {
    if (this.defaultView != null) {
      this.defaultView.location = val;
    }
  }
  get baseURI() {
    const baseNode = this.head.childNodes.find((node) => node.nodeName === "BASE");
    if (baseNode) {
      return baseNode.href;
    }
    return this.URL;
  }
  get URL() {
    return this.location.href;
  }
  get styleSheets() {
    return this.querySelectorAll("style");
  }
  get scripts() {
    return this.querySelectorAll("script");
  }
  get forms() {
    return this.querySelectorAll("form");
  }
  get images() {
    return this.querySelectorAll("img");
  }
  get scrollingElement() {
    return this.documentElement;
  }
  get documentElement() {
    for (let i = this.childNodes.length - 1; i >= 0; i--) {
      if (this.childNodes[i].nodeName === "HTML") {
        return this.childNodes[i];
      }
    }
    const documentElement = new MockHTMLElement(this, "html");
    this.appendChild(documentElement);
    return documentElement;
  }
  set documentElement(documentElement) {
    for (let i = this.childNodes.length - 1; i >= 0; i--) {
      if (this.childNodes[i].nodeType !== 10 /* DOCUMENT_TYPE_NODE */) {
        this.childNodes[i].remove();
      }
    }
    if (documentElement != null) {
      this.appendChild(documentElement);
      setOwnerDocument(documentElement, this);
    }
  }
  get head() {
    const documentElement = this.documentElement;
    for (let i = 0; i < documentElement.childNodes.length; i++) {
      if (documentElement.childNodes[i].nodeName === "HEAD") {
        return documentElement.childNodes[i];
      }
    }
    const head = new MockHTMLElement(this, "head");
    documentElement.insertBefore(head, documentElement.firstChild);
    return head;
  }
  set head(head) {
    const documentElement = this.documentElement;
    for (let i = documentElement.childNodes.length - 1; i >= 0; i--) {
      if (documentElement.childNodes[i].nodeName === "HEAD") {
        documentElement.childNodes[i].remove();
      }
    }
    if (head != null) {
      documentElement.insertBefore(head, documentElement.firstChild);
      setOwnerDocument(head, this);
    }
  }
  get body() {
    const documentElement = this.documentElement;
    for (let i = documentElement.childNodes.length - 1; i >= 0; i--) {
      if (documentElement.childNodes[i].nodeName === "BODY") {
        return documentElement.childNodes[i];
      }
    }
    const body = new MockHTMLElement(this, "body");
    documentElement.appendChild(body);
    return body;
  }
  set body(body) {
    const documentElement = this.documentElement;
    for (let i = documentElement.childNodes.length - 1; i >= 0; i--) {
      if (documentElement.childNodes[i].nodeName === "BODY") {
        documentElement.childNodes[i].remove();
      }
    }
    if (body != null) {
      documentElement.appendChild(body);
      setOwnerDocument(body, this);
    }
  }
  appendChild(newNode) {
    newNode.remove();
    newNode.parentNode = this;
    this.childNodes.push(newNode);
    return newNode;
  }
  createComment(data) {
    return new MockComment(this, data);
  }
  createAttribute(attrName) {
    return new MockAttr(attrName.toLowerCase(), "");
  }
  createAttributeNS(namespaceURI, attrName) {
    return new MockAttr(attrName, "", namespaceURI);
  }
  createElement(tagName) {
    if (tagName === "#document" /* DOCUMENT_NODE */) {
      const doc = new _MockDocument(false);
      doc.nodeName = tagName;
      doc.parentNode = null;
      return doc;
    }
    return createElement(this, tagName);
  }
  createElementNS(namespaceURI, tagName) {
    const elmNs = createElementNS(this, namespaceURI, tagName);
    return elmNs;
  }
  createTextNode(text) {
    return new MockTextNode(this, text);
  }
  createDocumentFragment() {
    return new MockDocumentFragment(this);
  }
  createDocumentTypeNode() {
    return new MockDocumentTypeNode(this);
  }
  getElementById(id) {
    return getElementById(this, id);
  }
  getElementsByName(elmName) {
    return getElementsByName(this, elmName.toLowerCase());
  }
  get title() {
    const title = this.head.childNodes.find((elm) => elm.nodeName === "TITLE");
    if (title != null && typeof title.textContent === "string") {
      return title.textContent.trim();
    }
    return "";
  }
  set title(value) {
    const head = this.head;
    let title = head.childNodes.find((elm) => elm.nodeName === "TITLE");
    if (title == null) {
      title = this.createElement("title");
      head.appendChild(title);
    }
    title.textContent = value;
  }
};
function createDocument(html = null) {
  return new MockWindow(html).document;
}
function createFragment(html) {
  return parseHtmlToFragment(html, null);
}
function resetDocument(doc) {
  if (doc != null) {
    resetEventListeners(doc);
    const documentElement = doc.documentElement;
    if (documentElement != null) {
      resetElement(documentElement);
      for (let i = 0, ii = documentElement.childNodes.length; i < ii; i++) {
        const childNode = documentElement.childNodes[i];
        resetElement(childNode);
        childNode.childNodes.length = 0;
      }
    }
    for (const key in doc) {
      if (doc.hasOwnProperty(key) && !DOC_KEY_KEEPERS.has(key)) {
        delete doc[key];
      }
    }
    try {
      doc.nodeName = "#document" /* DOCUMENT_NODE */;
    } catch (e2) {
    }
    try {
      doc.nodeType = 9 /* DOCUMENT_NODE */;
    } catch (e2) {
    }
    try {
      doc.cookie = "";
    } catch (e2) {
    }
    try {
      doc.referrer = "";
    } catch (e2) {
    }
  }
}
var DOC_KEY_KEEPERS = /* @__PURE__ */ new Set([
  "nodeName",
  "nodeType",
  "nodeValue",
  "ownerDocument",
  "parentNode",
  "childNodes",
  "_shadowRoot"
]);
function getElementById(elm, id) {
  const children = elm.children;
  for (let i = 0, ii = children.length; i < ii; i++) {
    const childElm = children[i];
    if (childElm.id === id) {
      return childElm;
    }
    const childElmFound = getElementById(childElm, id);
    if (childElmFound != null) {
      return childElmFound;
    }
  }
  return null;
}
function getElementsByName(elm, elmName, foundElms = []) {
  const children = elm.children;
  for (let i = 0, ii = children.length; i < ii; i++) {
    const childElm = children[i];
    if (childElm.name && childElm.name.toLowerCase() === elmName) {
      foundElms.push(childElm);
    }
    getElementsByName(childElm, elmName, foundElms);
  }
  return foundElms;
}
function setOwnerDocument(elm, ownerDocument) {
  for (let i = 0, ii = elm.childNodes.length; i < ii; i++) {
    elm.childNodes[i].ownerDocument = ownerDocument;
    if (elm.childNodes[i].nodeType === 1 /* ELEMENT_NODE */) {
      setOwnerDocument(elm.childNodes[i], ownerDocument);
    }
  }
}

function hydrateFactory($stencilWindow, $stencilHydrateOpts, $stencilHydrateResults, $stencilAfterHydrate, $stencilHydrateResolve) {
  var globalThis = $stencilWindow;
  var self = $stencilWindow;
  var top = $stencilWindow;
  var parent = $stencilWindow;

  var addEventListener = $stencilWindow.addEventListener.bind($stencilWindow);
  var alert = $stencilWindow.alert.bind($stencilWindow);
  var blur = $stencilWindow.blur.bind($stencilWindow);
  var cancelAnimationFrame = $stencilWindow.cancelAnimationFrame.bind($stencilWindow);
  var cancelIdleCallback = $stencilWindow.cancelIdleCallback.bind($stencilWindow);
  var clearInterval = $stencilWindow.clearInterval.bind($stencilWindow);
  var clearTimeout = $stencilWindow.clearTimeout.bind($stencilWindow);
  var close = () => {};
  var confirm = $stencilWindow.confirm.bind($stencilWindow);
  var dispatchEvent = $stencilWindow.dispatchEvent.bind($stencilWindow);
  var focus = $stencilWindow.focus.bind($stencilWindow);
  var getComputedStyle = $stencilWindow.getComputedStyle.bind($stencilWindow);
  var matchMedia = $stencilWindow.matchMedia.bind($stencilWindow);
  var open = $stencilWindow.open.bind($stencilWindow);
  var prompt = $stencilWindow.prompt.bind($stencilWindow);
  var removeEventListener = $stencilWindow.removeEventListener.bind($stencilWindow);
  var requestAnimationFrame = $stencilWindow.requestAnimationFrame.bind($stencilWindow);
  var requestIdleCallback = $stencilWindow.requestIdleCallback.bind($stencilWindow);
  var setInterval = $stencilWindow.setInterval.bind($stencilWindow);
  var setTimeout = $stencilWindow.setTimeout.bind($stencilWindow);

  var CharacterData = $stencilWindow.CharacterData;
  var CSS = $stencilWindow.CSS;
  var CustomEvent = $stencilWindow.CustomEvent;
  var Document = $stencilWindow.Document;
  var DocumentFragment = $stencilWindow.DocumentFragment;
  var DocumentType = $stencilWindow.DocumentType;
  var DOMTokenList = $stencilWindow.DOMTokenList;
  var Element = $stencilWindow.Element;
  var Event = $stencilWindow.Event;
  var HTMLAnchorElement = $stencilWindow.HTMLAnchorElement;
  var HTMLBaseElement = $stencilWindow.HTMLBaseElement;
  var HTMLButtonElement = $stencilWindow.HTMLButtonElement;
  var HTMLCanvasElement = $stencilWindow.HTMLCanvasElement;
  var HTMLElement = $stencilWindow.HTMLElement;
  var HTMLFormElement = $stencilWindow.HTMLFormElement;
  var HTMLImageElement = $stencilWindow.HTMLImageElement;
  var HTMLInputElement = $stencilWindow.HTMLInputElement;
  var HTMLLinkElement = $stencilWindow.HTMLLinkElement;
  var HTMLMetaElement = $stencilWindow.HTMLMetaElement;
  var HTMLScriptElement = $stencilWindow.HTMLScriptElement;
  var HTMLStyleElement = $stencilWindow.HTMLStyleElement;
  var HTMLTemplateElement = $stencilWindow.HTMLTemplateElement;
  var HTMLTitleElement = $stencilWindow.HTMLTitleElement;
  var IntersectionObserver = $stencilWindow.IntersectionObserver;
  var KeyboardEvent = $stencilWindow.KeyboardEvent;
  var MouseEvent = $stencilWindow.MouseEvent;
  var Node = $stencilWindow.Node;
  var NodeList = $stencilWindow.NodeList;
  var URL = $stencilWindow.URL;

  var console = $stencilWindow.console;
  var customElements = $stencilWindow.customElements;
  var history = $stencilWindow.history;
  var localStorage = $stencilWindow.localStorage;
  var location = $stencilWindow.location;
  var navigator = $stencilWindow.navigator;
  var performance = $stencilWindow.performance;
  var sessionStorage = $stencilWindow.sessionStorage;

  var devicePixelRatio = $stencilWindow.devicePixelRatio;
  var innerHeight = $stencilWindow.innerHeight;
  var innerWidth = $stencilWindow.innerWidth;
  var origin = $stencilWindow.origin;
  var pageXOffset = $stencilWindow.pageXOffset;
  var pageYOffset = $stencilWindow.pageYOffset;
  var screen = $stencilWindow.screen;
  var screenLeft = $stencilWindow.screenLeft;
  var screenTop = $stencilWindow.screenTop;
  var screenX = $stencilWindow.screenX;
  var screenY = $stencilWindow.screenY;
  var scrollX = $stencilWindow.scrollX;
  var scrollY = $stencilWindow.scrollY;
  var exports = {};

  var fetch, FetchError, Headers, Request, Response;

  if (typeof $stencilWindow.fetch === 'function') {
    fetch = $stencilWindow.fetch;
  } else {
    fetch = $stencilWindow.fetch = function() { throw new Error('fetch() is not implemented'); };
  }

  if (typeof $stencilWindow.FetchError === 'function') {
    FetchError = $stencilWindow.FetchError;
  } else {
    FetchError = $stencilWindow.FetchError = class FetchError { constructor() { throw new Error('FetchError is not implemented'); } };
  }

  if (typeof $stencilWindow.Headers === 'function') {
    Headers = $stencilWindow.Headers;
  } else {
    Headers = $stencilWindow.Headers = class Headers { constructor() { throw new Error('Headers is not implemented'); } };
  }

  if (typeof $stencilWindow.Request === 'function') {
    Request = $stencilWindow.Request;
  } else {
    Request = $stencilWindow.Request = class Request { constructor() { throw new Error('Request is not implemented'); } };
  }

  if (typeof $stencilWindow.Response === 'function') {
    Response = $stencilWindow.Response;
  } else {
    Response = $stencilWindow.Response = class Response { constructor() { throw new Error('Response is not implemented'); } };
  }

  function hydrateAppClosure($stencilWindow) {
    const window = $stencilWindow;
    const document = $stencilWindow.document;
    /*hydrateAppClosure start*/


const NAMESPACE = 'stencil-comp';
const BUILD = /* stencil-comp */ { allRenderFn: true, appendChildSlotFix: false, asyncLoading: true, attachStyles: true, cloneNodeFix: false, cmpDidLoad: false, cmpDidRender: false, cmpDidUnload: false, cmpDidUpdate: false, cmpShouldUpdate: false, cmpWillLoad: true, cmpWillRender: false, cmpWillUpdate: false, connectedCallback: false, constructableCSS: false, cssAnnotations: true, devTools: false, disconnectedCallback: false, element: false, event: true, experimentalScopedSlotChanges: false, experimentalSlotFixes: false, formAssociated: false, hasRenderFn: true, hostListener: false, hostListenerTarget: false, hostListenerTargetBody: false, hostListenerTargetDocument: false, hostListenerTargetParent: false, hostListenerTargetWindow: false, hotModuleReplacement: false, hydrateClientSide: true, hydrateServerSide: true, hydratedAttribute: false, hydratedClass: true, isDebug: false, isDev: false, isTesting: false, lazyLoad: true, lifecycle: true, lifecycleDOMEvents: false, member: true, method: false, mode: false, observeAttribute: true, profile: false, prop: true, propBoolean: false, propMutable: true, propNumber: true, propString: true, reflect: false, scoped: false, scriptDataOpts: false, shadowDelegatesFocus: false, shadowDom: true, shadowDomShim: true, slot: true, slotChildNodesFix: false, slotRelocation: true, state: true, style: true, svg: false, taskQueue: true, updatable: true, vdomAttribute: true, vdomClass: true, vdomFunctional: true, vdomKey: true, vdomListener: true, vdomPropOrAttr: true, vdomRef: false, vdomRender: true, vdomStyle: false, vdomText: true, vdomXlink: false, watchCallback: true };

/*
 Stencil Hydrate Platform v4.17.1 | MIT Licensed | https://stenciljs.com
 */
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/utils/constants.ts
var EMPTY_OBJ = {};

// src/utils/helpers.ts
var isDef = (v) => v != null;
var isComplexType = (o) => {
  o = typeof o;
  return o === "object" || o === "function";
};
var isPromise = (v) => !!v && (typeof v === "object" || typeof v === "function") && typeof v.then === "function";

// src/utils/query-nonce-meta-tag-content.ts
function queryNonceMetaTagContent(doc2) {
  var _a, _b, _c;
  return (_c = (_b = (_a = doc2.head) == null ? void 0 : _a.querySelector('meta[name="csp-nonce"]')) == null ? void 0 : _b.getAttribute("content")) != null ? _c : void 0;
}

// src/utils/result.ts
var result_exports = {};
__export(result_exports, {
  err: () => err,
  map: () => map,
  ok: () => ok,
  unwrap: () => unwrap,
  unwrapErr: () => unwrapErr
});
var ok = (value) => ({
  isOk: true,
  isErr: false,
  value
});
var err = (value) => ({
  isOk: false,
  isErr: true,
  value
});
function map(result, fn) {
  if (result.isOk) {
    const val = fn(result.value);
    if (val instanceof Promise) {
      return val.then((newVal) => ok(newVal));
    } else {
      return ok(val);
    }
  }
  if (result.isErr) {
    const value = result.value;
    return err(value);
  }
  throw "should never get here";
}
var unwrap = (result) => {
  if (result.isOk) {
    return result.value;
  } else {
    throw result.value;
  }
};
var unwrapErr = (result) => {
  if (result.isErr) {
    return result.value;
  } else {
    throw result.value;
  }
};
var createTime = (fnName, tagName = "") => {
  {
    return () => {
      return;
    };
  }
};
var uniqueTime = (key, measureText) => {
  {
    return () => {
      return;
    };
  }
};

// src/runtime/runtime-constants.ts
var CONTENT_REF_ID = "r";
var ORG_LOCATION_ID = "o";
var SLOT_NODE_ID = "s";
var TEXT_NODE_ID = "t";
var HYDRATE_ID = "s-id";
var HYDRATED_STYLE_ID = "sty-id";
var HYDRATE_CHILD_ID = "c-id";
var SLOT_FB_CSS = "slot-fb{display:contents}slot-fb[hidden]{display:none}";
var h = (nodeName, vnodeData, ...children) => {
  let child = null;
  let key = null;
  let slotName = null;
  let simple = false;
  let lastSimple = false;
  const vNodeChildren = [];
  const walk = (c) => {
    for (let i2 = 0; i2 < c.length; i2++) {
      child = c[i2];
      if (Array.isArray(child)) {
        walk(child);
      } else if (child != null && typeof child !== "boolean") {
        if (simple = typeof nodeName !== "function" && !isComplexType(child)) {
          child = String(child);
        }
        if (simple && lastSimple) {
          vNodeChildren[vNodeChildren.length - 1].$text$ += child;
        } else {
          vNodeChildren.push(simple ? newVNode(null, child) : child);
        }
        lastSimple = simple;
      }
    }
  };
  walk(children);
  if (vnodeData) {
    if (vnodeData.key) {
      key = vnodeData.key;
    }
    if (vnodeData.name) {
      slotName = vnodeData.name;
    }
    {
      const classData = vnodeData.className || vnodeData.class;
      if (classData) {
        vnodeData.class = typeof classData !== "object" ? classData : Object.keys(classData).filter((k) => classData[k]).join(" ");
      }
    }
  }
  if (typeof nodeName === "function") {
    return nodeName(
      vnodeData === null ? {} : vnodeData,
      vNodeChildren,
      vdomFnUtils
    );
  }
  const vnode = newVNode(nodeName, null);
  vnode.$attrs$ = vnodeData;
  if (vNodeChildren.length > 0) {
    vnode.$children$ = vNodeChildren;
  }
  {
    vnode.$key$ = key;
  }
  {
    vnode.$name$ = slotName;
  }
  return vnode;
};
var newVNode = (tag, text) => {
  const vnode = {
    $flags$: 0,
    $tag$: tag,
    $text$: text,
    $elm$: null,
    $children$: null
  };
  {
    vnode.$attrs$ = null;
  }
  {
    vnode.$key$ = null;
  }
  {
    vnode.$name$ = null;
  }
  return vnode;
};
var Host = {};
var isHost = (node) => node && node.$tag$ === Host;
var vdomFnUtils = {
  forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
  map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate)
};
var convertToPublic = (node) => ({
  vattrs: node.$attrs$,
  vchildren: node.$children$,
  vkey: node.$key$,
  vname: node.$name$,
  vtag: node.$tag$,
  vtext: node.$text$
});
var convertToPrivate = (node) => {
  if (typeof node.vtag === "function") {
    const vnodeData = { ...node.vattrs };
    if (node.vkey) {
      vnodeData.key = node.vkey;
    }
    if (node.vname) {
      vnodeData.name = node.vname;
    }
    return h(node.vtag, vnodeData, ...node.vchildren || []);
  }
  const vnode = newVNode(node.vtag, node.vtext);
  vnode.$attrs$ = node.vattrs;
  vnode.$children$ = node.vchildren;
  vnode.$key$ = node.vkey;
  vnode.$name$ = node.vname;
  return vnode;
};

// src/runtime/client-hydrate.ts
var initializeClientHydrate = (hostElm, tagName, hostId, hostRef) => {
  const endHydrate = createTime("hydrateClient", tagName);
  const shadowRoot = hostElm.shadowRoot;
  const childRenderNodes = [];
  const slotNodes = [];
  const shadowRootNodes = shadowRoot ? [] : null;
  const vnode = hostRef.$vnode$ = newVNode(tagName, null);
  if (!plt.$orgLocNodes$) {
    initializeDocumentHydrate(doc.body, plt.$orgLocNodes$ = /* @__PURE__ */ new Map());
  }
  hostElm[HYDRATE_ID] = hostId;
  hostElm.removeAttribute(HYDRATE_ID);
  clientHydrate(vnode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, hostElm, hostId);
  childRenderNodes.map((c) => {
    const orgLocationId = c.$hostId$ + "." + c.$nodeId$;
    const orgLocationNode = plt.$orgLocNodes$.get(orgLocationId);
    const node = c.$elm$;
    if (orgLocationNode && supportsShadow && orgLocationNode["s-en"] === "") {
      orgLocationNode.parentNode.insertBefore(node, orgLocationNode.nextSibling);
    }
    if (!shadowRoot) {
      node["s-hn"] = tagName;
      if (orgLocationNode) {
        node["s-ol"] = orgLocationNode;
        node["s-ol"]["s-nr"] = node;
      }
    }
    plt.$orgLocNodes$.delete(orgLocationId);
  });
  if (shadowRoot) {
    shadowRootNodes.map((shadowRootNode) => {
      if (shadowRootNode) {
        shadowRoot.appendChild(shadowRootNode);
      }
    });
  }
  endHydrate();
};
var clientHydrate = (parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node, hostId) => {
  let childNodeType;
  let childIdSplt;
  let childVNode;
  let i2;
  if (node.nodeType === 1 /* ElementNode */) {
    childNodeType = node.getAttribute(HYDRATE_CHILD_ID);
    if (childNodeType) {
      childIdSplt = childNodeType.split(".");
      if (childIdSplt[0] === hostId || childIdSplt[0] === "0") {
        childVNode = {
          $flags$: 0,
          $hostId$: childIdSplt[0],
          $nodeId$: childIdSplt[1],
          $depth$: childIdSplt[2],
          $index$: childIdSplt[3],
          $tag$: node.tagName.toLowerCase(),
          $elm$: node,
          $attrs$: null,
          $children$: null,
          $key$: null,
          $name$: null,
          $text$: null
        };
        childRenderNodes.push(childVNode);
        node.removeAttribute(HYDRATE_CHILD_ID);
        if (!parentVNode.$children$) {
          parentVNode.$children$ = [];
        }
        parentVNode.$children$[childVNode.$index$] = childVNode;
        parentVNode = childVNode;
        if (shadowRootNodes && childVNode.$depth$ === "0") {
          shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
        }
      }
    }
    for (i2 = node.childNodes.length - 1; i2 >= 0; i2--) {
      clientHydrate(
        parentVNode,
        childRenderNodes,
        slotNodes,
        shadowRootNodes,
        hostElm,
        node.childNodes[i2],
        hostId
      );
    }
    if (node.shadowRoot) {
      for (i2 = node.shadowRoot.childNodes.length - 1; i2 >= 0; i2--) {
        clientHydrate(
          parentVNode,
          childRenderNodes,
          slotNodes,
          shadowRootNodes,
          hostElm,
          node.shadowRoot.childNodes[i2],
          hostId
        );
      }
    }
  } else if (node.nodeType === 8 /* CommentNode */) {
    childIdSplt = node.nodeValue.split(".");
    if (childIdSplt[1] === hostId || childIdSplt[1] === "0") {
      childNodeType = childIdSplt[0];
      childVNode = {
        $flags$: 0,
        $hostId$: childIdSplt[1],
        $nodeId$: childIdSplt[2],
        $depth$: childIdSplt[3],
        $index$: childIdSplt[4],
        $elm$: node,
        $attrs$: null,
        $children$: null,
        $key$: null,
        $name$: null,
        $tag$: null,
        $text$: null
      };
      if (childNodeType === TEXT_NODE_ID) {
        childVNode.$elm$ = node.nextSibling;
        if (childVNode.$elm$ && childVNode.$elm$.nodeType === 3 /* TextNode */) {
          childVNode.$text$ = childVNode.$elm$.textContent;
          childRenderNodes.push(childVNode);
          node.remove();
          if (!parentVNode.$children$) {
            parentVNode.$children$ = [];
          }
          parentVNode.$children$[childVNode.$index$] = childVNode;
          if (shadowRootNodes && childVNode.$depth$ === "0") {
            shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
          }
        }
      } else if (childVNode.$hostId$ === hostId) {
        if (childNodeType === SLOT_NODE_ID) {
          childVNode.$tag$ = "slot";
          if (childIdSplt[5]) {
            node["s-sn"] = childVNode.$name$ = childIdSplt[5];
          } else {
            node["s-sn"] = "";
          }
          node["s-sr"] = true;
          if (shadowRootNodes) {
            childVNode.$elm$ = doc.createElement(childVNode.$tag$);
            if (childVNode.$name$) {
              childVNode.$elm$.setAttribute("name", childVNode.$name$);
            }
            node.parentNode.insertBefore(childVNode.$elm$, node);
            node.remove();
            if (childVNode.$depth$ === "0") {
              shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
            }
          }
          slotNodes.push(childVNode);
          if (!parentVNode.$children$) {
            parentVNode.$children$ = [];
          }
          parentVNode.$children$[childVNode.$index$] = childVNode;
        } else if (childNodeType === CONTENT_REF_ID) {
          if (shadowRootNodes) {
            node.remove();
          } else {
            hostElm["s-cr"] = node;
            node["s-cn"] = true;
          }
        }
      }
    }
  } else if (parentVNode && parentVNode.$tag$ === "style") {
    const vnode = newVNode(null, node.textContent);
    vnode.$elm$ = node;
    vnode.$index$ = "0";
    parentVNode.$children$ = [vnode];
  }
};
var initializeDocumentHydrate = (node, orgLocNodes) => {
  if (node.nodeType === 1 /* ElementNode */) {
    let i2 = 0;
    for (; i2 < node.childNodes.length; i2++) {
      initializeDocumentHydrate(node.childNodes[i2], orgLocNodes);
    }
    if (node.shadowRoot) {
      for (i2 = 0; i2 < node.shadowRoot.childNodes.length; i2++) {
        initializeDocumentHydrate(node.shadowRoot.childNodes[i2], orgLocNodes);
      }
    }
  } else if (node.nodeType === 8 /* CommentNode */) {
    const childIdSplt = node.nodeValue.split(".");
    if (childIdSplt[0] === ORG_LOCATION_ID) {
      orgLocNodes.set(childIdSplt[1] + "." + childIdSplt[2], node);
      node.nodeValue = "";
      node["s-en"] = childIdSplt[3];
    }
  }
};
var parsePropertyValue = (propValue, propType) => {
  if (propValue != null && !isComplexType(propValue)) {
    if (propType & 2 /* Number */) {
      return parseFloat(propValue);
    }
    if (propType & 1 /* String */) {
      return String(propValue);
    }
    return propValue;
  }
  return propValue;
};
var getElement = (ref) => getHostRef(ref).$hostElement$ ;

// src/runtime/event-emitter.ts
var createEvent = (ref, name, flags) => {
  const elm = getElement(ref);
  return {
    emit: (detail) => {
      return emitEvent(elm, name, {
        bubbles: !!(flags & 4 /* Bubbles */),
        composed: !!(flags & 2 /* Composed */),
        cancelable: !!(flags & 1 /* Cancellable */),
        detail
      });
    }
  };
};
var emitEvent = (elm, name, opts) => {
  const ev = plt.ce(name, opts);
  elm.dispatchEvent(ev);
  return ev;
};
var rootAppliedStyles = /* @__PURE__ */ new WeakMap();
var registerStyle = (scopeId2, cssText, allowCS) => {
  let style = styles.get(scopeId2);
  {
    style = cssText;
  }
  styles.set(scopeId2, style);
};
var addStyle = (styleContainerNode, cmpMeta, mode) => {
  var _a;
  const scopeId2 = getScopeId(cmpMeta);
  const style = styles.get(scopeId2);
  styleContainerNode = styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : doc;
  if (style) {
    if (typeof style === "string") {
      styleContainerNode = styleContainerNode.head || styleContainerNode;
      let appliedStyles = rootAppliedStyles.get(styleContainerNode);
      let styleElm;
      if (!appliedStyles) {
        rootAppliedStyles.set(styleContainerNode, appliedStyles = /* @__PURE__ */ new Set());
      }
      if (!appliedStyles.has(scopeId2)) {
        if (styleContainerNode.host && (styleElm = styleContainerNode.querySelector(`[${HYDRATED_STYLE_ID}="${scopeId2}"]`))) {
          styleElm.innerHTML = style;
        } else {
          styleElm = doc.createElement("style");
          styleElm.innerHTML = style;
          const nonce = (_a = plt.$nonce$) != null ? _a : queryNonceMetaTagContent(doc);
          if (nonce != null) {
            styleElm.setAttribute("nonce", nonce);
          }
          {
            styleElm.setAttribute(HYDRATED_STYLE_ID, scopeId2);
          }
          styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector("link"));
        }
        if (cmpMeta.$flags$ & 4 /* hasSlotRelocation */) {
          styleElm.innerHTML += SLOT_FB_CSS;
        }
        if (appliedStyles) {
          appliedStyles.add(scopeId2);
        }
      }
    }
  }
  return scopeId2;
};
var attachStyles = (hostRef) => {
  const cmpMeta = hostRef.$cmpMeta$;
  const elm = hostRef.$hostElement$;
  const flags = cmpMeta.$flags$;
  const endAttachStyles = createTime("attachStyles", cmpMeta.$tagName$);
  const scopeId2 = addStyle(
    elm.getRootNode(),
    cmpMeta);
  if (flags & 10 /* needsScopedEncapsulation */) {
    elm["s-sc"] = scopeId2;
    elm.classList.add(scopeId2 + "-h");
  }
  endAttachStyles();
};
var getScopeId = (cmp, mode) => "sc-" + (cmp.$tagName$);
var setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
  if (oldValue !== newValue) {
    let isProp = isMemberInElement(elm, memberName);
    let ln = memberName.toLowerCase();
    if (memberName === "class") {
      const classList = elm.classList;
      const oldClasses = parseClassList(oldValue);
      const newClasses = parseClassList(newValue);
      classList.remove(...oldClasses.filter((c) => c && !newClasses.includes(c)));
      classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)));
    } else if (memberName === "key") ; else if ((!isProp ) && memberName[0] === "o" && memberName[1] === "n") {
      if (memberName[2] === "-") {
        memberName = memberName.slice(3);
      } else if (isMemberInElement(win, ln)) {
        memberName = ln.slice(2);
      } else {
        memberName = ln[2] + memberName.slice(3);
      }
      if (oldValue || newValue) {
        const capture = memberName.endsWith(CAPTURE_EVENT_SUFFIX);
        memberName = memberName.replace(CAPTURE_EVENT_REGEX, "");
        if (oldValue) {
          plt.rel(elm, memberName, oldValue, capture);
        }
        if (newValue) {
          plt.ael(elm, memberName, newValue, capture);
        }
      }
    } else {
      const isComplex = isComplexType(newValue);
      if ((isProp || isComplex && newValue !== null) && !isSvg) {
        try {
          if (!elm.tagName.includes("-")) {
            const n = newValue == null ? "" : newValue;
            if (memberName === "list") {
              isProp = false;
            } else if (oldValue == null || elm[memberName] != n) {
              elm[memberName] = n;
            }
          } else {
            elm[memberName] = newValue;
          }
        } catch (e) {
        }
      }
      if (newValue == null || newValue === false) {
        if (newValue !== false || elm.getAttribute(memberName) === "") {
          {
            elm.removeAttribute(memberName);
          }
        }
      } else if ((!isProp || flags & 4 /* isHost */ || isSvg) && !isComplex) {
        newValue = newValue === true ? "" : newValue;
        {
          elm.setAttribute(memberName, newValue);
        }
      }
    }
  }
};
var parseClassListRegex = /\s/;
var parseClassList = (value) => !value ? [] : value.split(parseClassListRegex);
var CAPTURE_EVENT_SUFFIX = "Capture";
var CAPTURE_EVENT_REGEX = new RegExp(CAPTURE_EVENT_SUFFIX + "$");

// src/runtime/vdom/update-element.ts
var updateElement = (oldVnode, newVnode, isSvgMode2, memberName) => {
  const elm = newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
  const oldVnodeAttrs = oldVnode && oldVnode.$attrs$ || EMPTY_OBJ;
  const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
  {
    for (memberName of sortedAttrNames(Object.keys(oldVnodeAttrs))) {
      if (!(memberName in newVnodeAttrs)) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], void 0, isSvgMode2, newVnode.$flags$);
      }
    }
  }
  for (memberName of sortedAttrNames(Object.keys(newVnodeAttrs))) {
    setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode2, newVnode.$flags$);
  }
};
function sortedAttrNames(attrNames) {
  return attrNames.includes("ref") ? (
    // we need to sort these to ensure that `'ref'` is the last attr
    [...attrNames.filter((attr) => attr !== "ref"), "ref"]
  ) : (
    // no need to sort, return the original array
    attrNames
  );
}

// src/runtime/vdom/vdom-render.ts
var scopeId;
var contentRef;
var hostTagName;
var useNativeShadowDom = false;
var checkSlotFallbackVisibility = false;
var checkSlotRelocate = false;
var isSvgMode = false;
var createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
  var _a;
  const newVNode2 = newParentVNode.$children$[childIndex];
  let i2 = 0;
  let elm;
  let childNode;
  let oldVNode;
  if (!useNativeShadowDom) {
    checkSlotRelocate = true;
    if (newVNode2.$tag$ === "slot") {
      if (scopeId) {
        parentElm.classList.add(scopeId + "-s");
      }
      newVNode2.$flags$ |= newVNode2.$children$ ? (
        // slot element has fallback content
        // still create an element that "mocks" the slot element
        2 /* isSlotFallback */
      ) : (
        // slot element does not have fallback content
        // create an html comment we'll use to always reference
        // where actual slot content should sit next to
        1 /* isSlotReference */
      );
    }
  }
  if (newVNode2.$text$ !== null) {
    elm = newVNode2.$elm$ = doc.createTextNode(newVNode2.$text$);
  } else if (newVNode2.$flags$ & 1 /* isSlotReference */) {
    elm = newVNode2.$elm$ = slotReferenceDebugNode(newVNode2) ;
  } else {
    elm = newVNode2.$elm$ = doc.createElement(
      newVNode2.$flags$ & 2 /* isSlotFallback */ ? "slot-fb" : newVNode2.$tag$
    );
    {
      updateElement(null, newVNode2, isSvgMode);
    }
    if (isDef(scopeId) && elm["s-si"] !== scopeId) {
      elm.classList.add(elm["s-si"] = scopeId);
    }
    if (newVNode2.$children$) {
      for (i2 = 0; i2 < newVNode2.$children$.length; ++i2) {
        childNode = createElm(oldParentVNode, newVNode2, i2, elm);
        if (childNode) {
          elm.appendChild(childNode);
        }
      }
    }
  }
  elm["s-hn"] = hostTagName;
  {
    if (newVNode2.$flags$ & (2 /* isSlotFallback */ | 1 /* isSlotReference */)) {
      elm["s-sr"] = true;
      elm["s-cr"] = contentRef;
      elm["s-sn"] = newVNode2.$name$ || "";
      elm["s-rf"] = (_a = newVNode2.$attrs$) == null ? void 0 : _a.ref;
      oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
      if (oldVNode && oldVNode.$tag$ === newVNode2.$tag$ && oldParentVNode.$elm$) {
        {
          putBackInOriginalLocation(oldParentVNode.$elm$, false);
        }
      }
    }
  }
  return elm;
};
var putBackInOriginalLocation = (parentElm, recursive) => {
  plt.$flags$ |= 1 /* isTmpDisconnected */;
  const oldSlotChildNodes = Array.from(parentElm.childNodes);
  if (parentElm["s-sr"] && BUILD.experimentalSlotFixes) {
    let node = parentElm;
    while (node = node.nextSibling) {
      if (node && node["s-sn"] === parentElm["s-sn"] && node["s-sh"] === hostTagName) {
        oldSlotChildNodes.push(node);
      }
    }
  }
  for (let i2 = oldSlotChildNodes.length - 1; i2 >= 0; i2--) {
    const childNode = oldSlotChildNodes[i2];
    if (childNode["s-hn"] !== hostTagName && childNode["s-ol"]) {
      parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode));
      childNode["s-ol"].remove();
      childNode["s-ol"] = void 0;
      childNode["s-sh"] = void 0;
      checkSlotRelocate = true;
    }
    if (recursive) {
      putBackInOriginalLocation(childNode, recursive);
    }
  }
  plt.$flags$ &= ~1 /* isTmpDisconnected */;
};
var addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
  let containerElm = parentElm["s-cr"] && parentElm["s-cr"].parentNode || parentElm;
  let childNode;
  if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
    containerElm = containerElm.shadowRoot;
  }
  for (; startIdx <= endIdx; ++startIdx) {
    if (vnodes[startIdx]) {
      childNode = createElm(null, parentVNode, startIdx, parentElm);
      if (childNode) {
        vnodes[startIdx].$elm$ = childNode;
        containerElm.insertBefore(childNode, referenceNode(before) );
      }
    }
  }
};
var removeVnodes = (vnodes, startIdx, endIdx) => {
  for (let index = startIdx; index <= endIdx; ++index) {
    const vnode = vnodes[index];
    if (vnode) {
      const elm = vnode.$elm$;
      if (elm) {
        {
          checkSlotFallbackVisibility = true;
          if (elm["s-ol"]) {
            elm["s-ol"].remove();
          } else {
            putBackInOriginalLocation(elm, true);
          }
        }
        elm.remove();
      }
    }
  }
};
var updateChildren = (parentElm, oldCh, newVNode2, newCh, isInitialRender = false) => {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let idxInOld = 0;
  let i2 = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let node;
  let elmToMove;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newStartVnode, isInitialRender)) {
      patch(oldStartVnode, newStartVnode, isInitialRender);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (isSameVnode(oldEndVnode, newEndVnode, isInitialRender)) {
      patch(oldEndVnode, newEndVnode, isInitialRender);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newEndVnode, isInitialRender)) {
      if ((oldStartVnode.$tag$ === "slot" || newEndVnode.$tag$ === "slot")) {
        putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
      }
      patch(oldStartVnode, newEndVnode, isInitialRender);
      parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldEndVnode, newStartVnode, isInitialRender)) {
      if ((oldStartVnode.$tag$ === "slot" || newEndVnode.$tag$ === "slot")) {
        putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
      }
      patch(oldEndVnode, newStartVnode, isInitialRender);
      parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      idxInOld = -1;
      {
        for (i2 = oldStartIdx; i2 <= oldEndIdx; ++i2) {
          if (oldCh[i2] && oldCh[i2].$key$ !== null && oldCh[i2].$key$ === newStartVnode.$key$) {
            idxInOld = i2;
            break;
          }
        }
      }
      if (idxInOld >= 0) {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.$tag$ !== newStartVnode.$tag$) {
          node = createElm(oldCh && oldCh[newStartIdx], newVNode2, idxInOld, parentElm);
        } else {
          patch(elmToMove, newStartVnode, isInitialRender);
          oldCh[idxInOld] = void 0;
          node = elmToMove.$elm$;
        }
        newStartVnode = newCh[++newStartIdx];
      } else {
        node = createElm(oldCh && oldCh[newStartIdx], newVNode2, newStartIdx, parentElm);
        newStartVnode = newCh[++newStartIdx];
      }
      if (node) {
        {
          parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$));
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    addVnodes(
      parentElm,
      newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$,
      newVNode2,
      newCh,
      newStartIdx,
      newEndIdx
    );
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
};
var isSameVnode = (leftVNode, rightVNode, isInitialRender = false) => {
  if (leftVNode.$tag$ === rightVNode.$tag$) {
    if (leftVNode.$tag$ === "slot") {
      return leftVNode.$name$ === rightVNode.$name$;
    }
    if (!isInitialRender) {
      return leftVNode.$key$ === rightVNode.$key$;
    }
    return true;
  }
  return false;
};
var referenceNode = (node) => {
  return node && node["s-ol"] || node;
};
var parentReferenceNode = (node) => (node["s-ol"] ? node["s-ol"] : node).parentNode;
var patch = (oldVNode, newVNode2, isInitialRender = false) => {
  const elm = newVNode2.$elm$ = oldVNode.$elm$;
  const oldChildren = oldVNode.$children$;
  const newChildren = newVNode2.$children$;
  const tag = newVNode2.$tag$;
  const text = newVNode2.$text$;
  let defaultHolder;
  if (text === null) {
    {
      if (tag === "slot" && !useNativeShadowDom) ; else {
        updateElement(oldVNode, newVNode2, isSvgMode);
      }
    }
    if (oldChildren !== null && newChildren !== null) {
      updateChildren(elm, oldChildren, newVNode2, newChildren, isInitialRender);
    } else if (newChildren !== null) {
      if (oldVNode.$text$ !== null) {
        elm.textContent = "";
      }
      addVnodes(elm, null, newVNode2, newChildren, 0, newChildren.length - 1);
    } else if (oldChildren !== null) {
      removeVnodes(oldChildren, 0, oldChildren.length - 1);
    }
  } else if ((defaultHolder = elm["s-cr"])) {
    defaultHolder.parentNode.textContent = text;
  } else if (oldVNode.$text$ !== text) {
    elm.data = text;
  }
};
var updateFallbackSlotVisibility = (elm) => {
  const childNodes = elm.childNodes;
  for (const childNode of childNodes) {
    if (childNode.nodeType === 1 /* ElementNode */) {
      if (childNode["s-sr"]) {
        const slotName = childNode["s-sn"];
        childNode.hidden = false;
        for (const siblingNode of childNodes) {
          if (siblingNode !== childNode) {
            if (siblingNode["s-hn"] !== childNode["s-hn"] || slotName !== "") {
              if (siblingNode.nodeType === 1 /* ElementNode */ && (slotName === siblingNode.getAttribute("slot") || slotName === siblingNode["s-sn"]) || siblingNode.nodeType === 3 /* TextNode */ && slotName === siblingNode["s-sn"]) {
                childNode.hidden = true;
                break;
              }
            } else {
              if (siblingNode.nodeType === 1 /* ElementNode */ || siblingNode.nodeType === 3 /* TextNode */ && siblingNode.textContent.trim() !== "") {
                childNode.hidden = true;
                break;
              }
            }
          }
        }
      }
      updateFallbackSlotVisibility(childNode);
    }
  }
};
var relocateNodes = [];
var markSlotContentForRelocation = (elm) => {
  let node;
  let hostContentNodes;
  let j;
  for (const childNode of elm.childNodes) {
    if (childNode["s-sr"] && (node = childNode["s-cr"]) && node.parentNode) {
      hostContentNodes = node.parentNode.childNodes;
      const slotName = childNode["s-sn"];
      for (j = hostContentNodes.length - 1; j >= 0; j--) {
        node = hostContentNodes[j];
        if (!node["s-cn"] && !node["s-nr"] && node["s-hn"] !== childNode["s-hn"] && (!BUILD.experimentalSlotFixes  )) {
          if (isNodeLocatedInSlot(node, slotName)) {
            let relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
            checkSlotFallbackVisibility = true;
            node["s-sn"] = node["s-sn"] || slotName;
            if (relocateNodeData) {
              relocateNodeData.$nodeToRelocate$["s-sh"] = childNode["s-hn"];
              relocateNodeData.$slotRefNode$ = childNode;
            } else {
              node["s-sh"] = childNode["s-hn"];
              relocateNodes.push({
                $slotRefNode$: childNode,
                $nodeToRelocate$: node
              });
            }
            if (node["s-sr"]) {
              relocateNodes.map((relocateNode) => {
                if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node["s-sn"])) {
                  relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
                  if (relocateNodeData && !relocateNode.$slotRefNode$) {
                    relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                  }
                }
              });
            }
          } else if (!relocateNodes.some((r) => r.$nodeToRelocate$ === node)) {
            relocateNodes.push({
              $nodeToRelocate$: node
            });
          }
        }
      }
    }
    if (childNode.nodeType === 1 /* ElementNode */) {
      markSlotContentForRelocation(childNode);
    }
  }
};
var isNodeLocatedInSlot = (nodeToRelocate, slotName) => {
  if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
    if (nodeToRelocate.getAttribute("slot") === null && slotName === "") {
      return true;
    }
    if (nodeToRelocate.getAttribute("slot") === slotName) {
      return true;
    }
    return false;
  }
  if (nodeToRelocate["s-sn"] === slotName) {
    return true;
  }
  return slotName === "";
};
var renderVdom = (hostRef, renderFnResults, isInitialLoad = false) => {
  var _a, _b, _c, _d;
  const hostElm = hostRef.$hostElement$;
  const oldVNode = hostRef.$vnode$ || newVNode(null, null);
  const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
  hostTagName = hostElm.tagName;
  if (isInitialLoad && rootVnode.$attrs$) {
    for (const key of Object.keys(rootVnode.$attrs$)) {
      if (hostElm.hasAttribute(key) && !["key", "ref", "style", "class"].includes(key)) {
        rootVnode.$attrs$[key] = hostElm[key];
      }
    }
  }
  rootVnode.$tag$ = null;
  rootVnode.$flags$ |= 4 /* isHost */;
  hostRef.$vnode$ = rootVnode;
  rootVnode.$elm$ = oldVNode.$elm$ = hostElm.shadowRoot || hostElm ;
  {
    scopeId = hostElm["s-sc"];
  }
  useNativeShadowDom = supportsShadow ;
  {
    contentRef = hostElm["s-cr"];
    checkSlotFallbackVisibility = false;
  }
  patch(oldVNode, rootVnode, isInitialLoad);
  {
    plt.$flags$ |= 1 /* isTmpDisconnected */;
    if (checkSlotRelocate) {
      markSlotContentForRelocation(rootVnode.$elm$);
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        if (!nodeToRelocate["s-ol"]) {
          const orgLocationNode = originalLocationDebugNode(nodeToRelocate) ;
          orgLocationNode["s-nr"] = nodeToRelocate;
          nodeToRelocate.parentNode.insertBefore(nodeToRelocate["s-ol"] = orgLocationNode, nodeToRelocate);
        }
      }
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        const slotRefNode = relocateData.$slotRefNode$;
        if (slotRefNode) {
          const parentNodeRef = slotRefNode.parentNode;
          let insertBeforeNode = slotRefNode.nextSibling;
          {
            let orgLocationNode = (_a = nodeToRelocate["s-ol"]) == null ? void 0 : _a.previousSibling;
            while (orgLocationNode) {
              let refNode = (_b = orgLocationNode["s-nr"]) != null ? _b : null;
              if (refNode && refNode["s-sn"] === nodeToRelocate["s-sn"] && parentNodeRef === refNode.parentNode) {
                refNode = refNode.nextSibling;
                while (refNode === nodeToRelocate || (refNode == null ? void 0 : refNode["s-sr"])) {
                  refNode = refNode == null ? void 0 : refNode.nextSibling;
                }
                if (!refNode || !refNode["s-nr"]) {
                  insertBeforeNode = refNode;
                  break;
                }
              }
              orgLocationNode = orgLocationNode.previousSibling;
            }
          }
          if (!insertBeforeNode && parentNodeRef !== nodeToRelocate.parentNode || nodeToRelocate.nextSibling !== insertBeforeNode) {
            if (nodeToRelocate !== insertBeforeNode) {
              if (!nodeToRelocate["s-hn"] && nodeToRelocate["s-ol"]) {
                nodeToRelocate["s-hn"] = nodeToRelocate["s-ol"].parentNode.nodeName;
              }
              parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode);
              if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
                nodeToRelocate.hidden = (_c = nodeToRelocate["s-ih"]) != null ? _c : false;
              }
            }
          }
          nodeToRelocate && typeof slotRefNode["s-rf"] === "function" && slotRefNode["s-rf"](nodeToRelocate);
        } else {
          if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
            if (isInitialLoad) {
              nodeToRelocate["s-ih"] = (_d = nodeToRelocate.hidden) != null ? _d : false;
            }
            nodeToRelocate.hidden = true;
          }
        }
      }
    }
    if (checkSlotFallbackVisibility) {
      updateFallbackSlotVisibility(rootVnode.$elm$);
    }
    plt.$flags$ &= ~1 /* isTmpDisconnected */;
    relocateNodes.length = 0;
  }
  contentRef = void 0;
};
var slotReferenceDebugNode = (slotVNode) => doc.createComment(
  `<slot${slotVNode.$name$ ? ' name="' + slotVNode.$name$ + '"' : ""}> (host=${hostTagName.toLowerCase()})`
);
var originalLocationDebugNode = (nodeToRelocate) => doc.createComment(
  `org-location for ` + (nodeToRelocate.localName ? `<${nodeToRelocate.localName}> (host=${nodeToRelocate["s-hn"]})` : `[${nodeToRelocate.textContent}]`)
);

// src/runtime/update-component.ts
var attachToAncestor = (hostRef, ancestorComponent) => {
  if (ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent["s-p"]) {
    ancestorComponent["s-p"].push(new Promise((r) => hostRef.$onRenderResolve$ = r));
  }
};
var scheduleUpdate = (hostRef, isInitialLoad) => {
  {
    hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
  }
  if (hostRef.$flags$ & 4 /* isWaitingForChildren */) {
    hostRef.$flags$ |= 512 /* needsRerender */;
    return;
  }
  attachToAncestor(hostRef, hostRef.$ancestorComponent$);
  const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
  return writeTask(dispatch) ;
};
var dispatchHooks = (hostRef, isInitialLoad) => {
  const endSchedule = createTime("scheduleUpdate", hostRef.$cmpMeta$.$tagName$);
  const instance = hostRef.$lazyInstance$ ;
  let maybePromise;
  if (isInitialLoad) {
    {
      maybePromise = safeCall(instance, "componentWillLoad");
    }
  }
  endSchedule();
  return enqueue(maybePromise, () => updateComponent(hostRef, instance, isInitialLoad));
};
var enqueue = (maybePromise, fn) => isPromisey(maybePromise) ? maybePromise.then(fn) : fn();
var isPromisey = (maybePromise) => maybePromise instanceof Promise || maybePromise && maybePromise.then && typeof maybePromise.then === "function";
var updateComponent = async (hostRef, instance, isInitialLoad) => {
  var _a;
  const elm = hostRef.$hostElement$;
  const endUpdate = createTime("update", hostRef.$cmpMeta$.$tagName$);
  const rc = elm["s-rc"];
  if (isInitialLoad) {
    attachStyles(hostRef);
  }
  const endRender = createTime("render", hostRef.$cmpMeta$.$tagName$);
  {
    await callRender(hostRef, instance, elm, isInitialLoad);
  }
  {
    try {
      serverSideConnected(elm);
      if (isInitialLoad) {
        if (hostRef.$cmpMeta$.$flags$ & 1 /* shadowDomEncapsulation */) {
          elm["s-en"] = "";
        } else if (hostRef.$cmpMeta$.$flags$ & 2 /* scopedCssEncapsulation */) {
          elm["s-en"] = "c";
        }
      }
    } catch (e) {
      consoleError(e, elm);
    }
  }
  if (rc) {
    rc.map((cb) => cb());
    elm["s-rc"] = void 0;
  }
  endRender();
  endUpdate();
  {
    const childrenPromises = (_a = elm["s-p"]) != null ? _a : [];
    const postUpdate = () => postUpdateComponent(hostRef);
    if (childrenPromises.length === 0) {
      postUpdate();
    } else {
      Promise.all(childrenPromises).then(postUpdate);
      hostRef.$flags$ |= 4 /* isWaitingForChildren */;
      childrenPromises.length = 0;
    }
  }
};
var callRender = (hostRef, instance, elm, isInitialLoad) => {
  try {
    instance = instance.render() ;
    {
      hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
    }
    {
      hostRef.$flags$ |= 2 /* hasRendered */;
    }
    {
      {
        {
          return Promise.resolve(instance).then((value) => renderVdom(hostRef, value, isInitialLoad));
        }
      }
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$);
  }
  return null;
};
var postUpdateComponent = (hostRef) => {
  const tagName = hostRef.$cmpMeta$.$tagName$;
  const elm = hostRef.$hostElement$;
  const endPostUpdate = createTime("postUpdate", tagName);
  const ancestorComponent = hostRef.$ancestorComponent$;
  if (!(hostRef.$flags$ & 64 /* hasLoadedComponent */)) {
    hostRef.$flags$ |= 64 /* hasLoadedComponent */;
    {
      addHydratedFlag(elm);
    }
    endPostUpdate();
    {
      hostRef.$onReadyResolve$(elm);
      if (!ancestorComponent) {
        appDidLoad();
      }
    }
  } else {
    endPostUpdate();
  }
  {
    if (hostRef.$onRenderResolve$) {
      hostRef.$onRenderResolve$();
      hostRef.$onRenderResolve$ = void 0;
    }
    if (hostRef.$flags$ & 512 /* needsRerender */) {
      nextTick(() => scheduleUpdate(hostRef, false));
    }
    hostRef.$flags$ &= ~(4 /* isWaitingForChildren */ | 512 /* needsRerender */);
  }
};
var appDidLoad = (who) => {
  {
    addHydratedFlag(doc.documentElement);
  }
  nextTick(() => emitEvent(win, "appload", { detail: { namespace: NAMESPACE } }));
};
var safeCall = (instance, method, arg) => {
  if (instance && instance[method]) {
    try {
      return instance[method](arg);
    } catch (e) {
      consoleError(e);
    }
  }
  return void 0;
};
var addHydratedFlag = (elm) => elm.classList.add("hydrated") ;
var serverSideConnected = (elm) => {
  const children = elm.children;
  if (children != null) {
    for (let i2 = 0, ii = children.length; i2 < ii; i2++) {
      const childElm = children[i2];
      if (typeof childElm.connectedCallback === "function") {
        childElm.connectedCallback();
      }
      serverSideConnected(childElm);
    }
  }
};

// src/runtime/set-value.ts
var getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
var setValue = (ref, propName, newVal, cmpMeta) => {
  const hostRef = getHostRef(ref);
  const elm = hostRef.$hostElement$ ;
  const oldVal = hostRef.$instanceValues$.get(propName);
  const flags = hostRef.$flags$;
  const instance = hostRef.$lazyInstance$ ;
  newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
  const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
  const didValueChange = newVal !== oldVal && !areBothNaN;
  if ((!(flags & 8 /* isConstructingInstance */) || oldVal === void 0) && didValueChange) {
    hostRef.$instanceValues$.set(propName, newVal);
    if (instance) {
      if (cmpMeta.$watchers$ && flags & 128 /* isWatchReady */) {
        const watchMethods = cmpMeta.$watchers$[propName];
        if (watchMethods) {
          watchMethods.map((watchMethodName) => {
            try {
              instance[watchMethodName](newVal, oldVal, propName);
            } catch (e) {
              consoleError(e, elm);
            }
          });
        }
      }
      if ((flags & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
        scheduleUpdate(hostRef, false);
      }
    }
  }
};

// src/runtime/proxy-component.ts
var proxyComponent = (Cstr, cmpMeta, flags) => {
  var _a;
  const prototype = Cstr.prototype;
  if (cmpMeta.$members$) {
    if (Cstr.watchers) {
      cmpMeta.$watchers$ = Cstr.watchers;
    }
    const members = Object.entries(cmpMeta.$members$);
    members.map(([memberName, [memberFlags]]) => {
      if ((memberFlags & 31 /* Prop */ || (flags & 2 /* proxyState */) && memberFlags & 32 /* State */)) {
        Object.defineProperty(prototype, memberName, {
          get() {
            return getValue(this, memberName);
          },
          set(newValue) {
            setValue(this, memberName, newValue, cmpMeta);
          },
          configurable: true,
          enumerable: true
        });
      }
    });
    if ((flags & 1 /* isElementConstructor */)) {
      const attrNameToPropName = /* @__PURE__ */ new Map();
      prototype.attributeChangedCallback = function(attrName, oldValue, newValue) {
        plt.jmp(() => {
          var _a2;
          const propName = attrNameToPropName.get(attrName);
          if (this.hasOwnProperty(propName)) {
            newValue = this[propName];
            delete this[propName];
          } else if (prototype.hasOwnProperty(propName) && typeof this[propName] === "number" && this[propName] == newValue) {
            return;
          } else if (propName == null) {
            const hostRef = getHostRef(this);
            const flags2 = hostRef == null ? void 0 : hostRef.$flags$;
            if (flags2 && !(flags2 & 8 /* isConstructingInstance */) && flags2 & 128 /* isWatchReady */ && newValue !== oldValue) {
              const instance = hostRef.$lazyInstance$ ;
              const entry = (_a2 = cmpMeta.$watchers$) == null ? void 0 : _a2[attrName];
              entry == null ? void 0 : entry.forEach((callbackName) => {
                if (instance[callbackName] != null) {
                  instance[callbackName].call(instance, newValue, oldValue, attrName);
                }
              });
            }
            return;
          }
          this[propName] = newValue === null && typeof this[propName] === "boolean" ? false : newValue;
        });
      };
      Cstr.observedAttributes = Array.from(
        /* @__PURE__ */ new Set([
          ...Object.keys((_a = cmpMeta.$watchers$) != null ? _a : {}),
          ...members.filter(([_, m]) => m[0] & 15 /* HasAttribute */).map(([propName, m]) => {
            const attrName = m[1] || propName;
            attrNameToPropName.set(attrName, propName);
            return attrName;
          })
        ])
      );
    }
  }
  return Cstr;
};

// src/runtime/initialize-component.ts
var initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId) => {
  let Cstr;
  if ((hostRef.$flags$ & 32 /* hasInitializedComponent */) === 0) {
    hostRef.$flags$ |= 32 /* hasInitializedComponent */;
    const bundleId = cmpMeta.$lazyBundleId$;
    if (bundleId) {
      Cstr = loadModule(cmpMeta);
      if (Cstr.then) {
        const endLoad = uniqueTime();
        Cstr = await Cstr;
        endLoad();
      }
      if (!Cstr.isProxied) {
        {
          cmpMeta.$watchers$ = Cstr.watchers;
        }
        proxyComponent(Cstr, cmpMeta, 2 /* proxyState */);
        Cstr.isProxied = true;
      }
      const endNewInstance = createTime("createInstance", cmpMeta.$tagName$);
      {
        hostRef.$flags$ |= 8 /* isConstructingInstance */;
      }
      try {
        new Cstr(hostRef);
      } catch (e) {
        consoleError(e);
      }
      {
        hostRef.$flags$ &= ~8 /* isConstructingInstance */;
      }
      {
        hostRef.$flags$ |= 128 /* isWatchReady */;
      }
      endNewInstance();
    } else {
      Cstr = elm.constructor;
      customElements.whenDefined(cmpMeta.$tagName$).then(() => hostRef.$flags$ |= 128 /* isWatchReady */);
    }
    if (Cstr.style) {
      let style = Cstr.style;
      const scopeId2 = getScopeId(cmpMeta);
      if (!styles.has(scopeId2)) {
        const endRegisterStyles = createTime("registerStyles", cmpMeta.$tagName$);
        registerStyle(scopeId2, style);
        endRegisterStyles();
      }
    }
  }
  const ancestorComponent = hostRef.$ancestorComponent$;
  const schedule = () => scheduleUpdate(hostRef, true);
  if (ancestorComponent && ancestorComponent["s-rc"]) {
    ancestorComponent["s-rc"].push(schedule);
  } else {
    schedule();
  }
};
var fireConnectedCallback = (instance) => {
};

// src/runtime/connected-callback.ts
var connectedCallback = (elm) => {
  if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
    const hostRef = getHostRef(elm);
    const cmpMeta = hostRef.$cmpMeta$;
    const endConnected = createTime("connectedCallback", cmpMeta.$tagName$);
    if (!(hostRef.$flags$ & 1 /* hasConnected */)) {
      hostRef.$flags$ |= 1 /* hasConnected */;
      let hostId;
      {
        hostId = elm.getAttribute(HYDRATE_ID);
        if (hostId) {
          initializeClientHydrate(elm, cmpMeta.$tagName$, hostId, hostRef);
        }
      }
      if (!hostId) {
        {
          setContentReference(elm);
        }
      }
      {
        let ancestorComponent = elm;
        while (ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host) {
          if (ancestorComponent.nodeType === 1 /* ElementNode */ && ancestorComponent.hasAttribute("s-id") && ancestorComponent["s-p"] || ancestorComponent["s-p"]) {
            attachToAncestor(hostRef, hostRef.$ancestorComponent$ = ancestorComponent);
            break;
          }
        }
      }
      {
        initializeComponent(elm, hostRef, cmpMeta);
      }
    } else {
      if (hostRef == null ? void 0 : hostRef.$lazyInstance$) ; else if (hostRef == null ? void 0 : hostRef.$onReadyPromise$) {
        hostRef.$onReadyPromise$.then(() => fireConnectedCallback());
      }
    }
    endConnected();
  }
};
var setContentReference = (elm) => {
  const contentRefElm = elm["s-cr"] = doc.createComment(
    ""
  );
  contentRefElm["s-cn"] = true;
  elm.insertBefore(contentRefElm, elm.firstChild);
};

// src/runtime/fragment.ts
var Fragment = (_, children) => children;

// src/runtime/vdom/vdom-annotations.ts
var insertVdomAnnotations = (doc2, staticComponents) => {
  if (doc2 != null) {
    const docData = {
      hostIds: 0,
      rootLevelIds: 0,
      staticComponents: new Set(staticComponents)
    };
    const orgLocationNodes = [];
    parseVNodeAnnotations(doc2, doc2.body, docData, orgLocationNodes);
    orgLocationNodes.forEach((orgLocationNode) => {
      var _a, _b;
      if (orgLocationNode != null && orgLocationNode["s-nr"]) {
        const nodeRef = orgLocationNode["s-nr"];
        let hostId = nodeRef["s-host-id"];
        let nodeId = nodeRef["s-node-id"];
        let childId = `${hostId}.${nodeId}`;
        if (hostId == null) {
          hostId = 0;
          docData.rootLevelIds++;
          nodeId = docData.rootLevelIds;
          childId = `${hostId}.${nodeId}`;
          if (nodeRef.nodeType === 1 /* ElementNode */) {
            nodeRef.setAttribute(HYDRATE_CHILD_ID, childId);
          } else if (nodeRef.nodeType === 3 /* TextNode */) {
            if (hostId === 0) {
              const textContent = (_a = nodeRef.nodeValue) == null ? void 0 : _a.trim();
              if (textContent === "") {
                orgLocationNode.remove();
                return;
              }
            }
            const commentBeforeTextNode = doc2.createComment(childId);
            commentBeforeTextNode.nodeValue = `${TEXT_NODE_ID}.${childId}`;
            (_b = nodeRef.parentNode) == null ? void 0 : _b.insertBefore(commentBeforeTextNode, nodeRef);
          }
        }
        let orgLocationNodeId = `${ORG_LOCATION_ID}.${childId}`;
        const orgLocationParentNode = orgLocationNode.parentElement;
        if (orgLocationParentNode) {
          if (orgLocationParentNode["s-en"] === "") {
            orgLocationNodeId += `.`;
          } else if (orgLocationParentNode["s-en"] === "c") {
            orgLocationNodeId += `.c`;
          }
        }
        orgLocationNode.nodeValue = orgLocationNodeId;
      }
    });
  }
};
var parseVNodeAnnotations = (doc2, node, docData, orgLocationNodes) => {
  if (node == null) {
    return;
  }
  if (node["s-nr"] != null) {
    orgLocationNodes.push(node);
  }
  if (node.nodeType === 1 /* ElementNode */) {
    node.childNodes.forEach((childNode) => {
      const hostRef = getHostRef(childNode);
      if (hostRef != null && !docData.staticComponents.has(childNode.nodeName.toLowerCase())) {
        const cmpData = {
          nodeIds: 0
        };
        insertVNodeAnnotations(doc2, childNode, hostRef.$vnode$, docData, cmpData);
      }
      parseVNodeAnnotations(doc2, childNode, docData, orgLocationNodes);
    });
  }
};
var insertVNodeAnnotations = (doc2, hostElm, vnode, docData, cmpData) => {
  if (vnode != null) {
    const hostId = ++docData.hostIds;
    hostElm.setAttribute(HYDRATE_ID, hostId);
    if (hostElm["s-cr"] != null) {
      hostElm["s-cr"].nodeValue = `${CONTENT_REF_ID}.${hostId}`;
    }
    if (vnode.$children$ != null) {
      const depth = 0;
      vnode.$children$.forEach((vnodeChild, index) => {
        insertChildVNodeAnnotations(doc2, vnodeChild, cmpData, hostId, depth, index);
      });
    }
    if (hostElm && vnode && vnode.$elm$ && !hostElm.hasAttribute(HYDRATE_CHILD_ID)) {
      const parent = hostElm.parentElement;
      if (parent && parent.childNodes) {
        const parentChildNodes = Array.from(parent.childNodes);
        const comment = parentChildNodes.find(
          (node) => node.nodeType === 8 /* CommentNode */ && node["s-sr"]
        );
        if (comment) {
          const index = parentChildNodes.indexOf(hostElm) - 1;
          vnode.$elm$.setAttribute(
            HYDRATE_CHILD_ID,
            `${comment["s-host-id"]}.${comment["s-node-id"]}.0.${index}`
          );
        }
      }
    }
  }
};
var insertChildVNodeAnnotations = (doc2, vnodeChild, cmpData, hostId, depth, index) => {
  const childElm = vnodeChild.$elm$;
  if (childElm == null) {
    return;
  }
  const nodeId = cmpData.nodeIds++;
  const childId = `${hostId}.${nodeId}.${depth}.${index}`;
  childElm["s-host-id"] = hostId;
  childElm["s-node-id"] = nodeId;
  if (childElm.nodeType === 1 /* ElementNode */) {
    childElm.setAttribute(HYDRATE_CHILD_ID, childId);
  } else if (childElm.nodeType === 3 /* TextNode */) {
    const parentNode = childElm.parentNode;
    const nodeName = parentNode == null ? void 0 : parentNode.nodeName;
    if (nodeName !== "STYLE" && nodeName !== "SCRIPT") {
      const textNodeId = `${TEXT_NODE_ID}.${childId}`;
      const commentBeforeTextNode = doc2.createComment(textNodeId);
      parentNode == null ? void 0 : parentNode.insertBefore(commentBeforeTextNode, childElm);
    }
  } else if (childElm.nodeType === 8 /* CommentNode */) {
    if (childElm["s-sr"]) {
      const slotName = childElm["s-sn"] || "";
      const slotNodeId = `${SLOT_NODE_ID}.${childId}.${slotName}`;
      childElm.nodeValue = slotNodeId;
    }
  }
  if (vnodeChild.$children$ != null) {
    const childDepth = depth + 1;
    vnodeChild.$children$.forEach((vnode, index2) => {
      insertChildVNodeAnnotations(doc2, vnode, cmpData, hostId, childDepth, index2);
    });
  }
};

// src/hydrate/platform/h-async.ts
var hAsync = (nodeName, vnodeData, ...children) => {
  if (Array.isArray(children) && children.length > 0) {
    const flatChildren = children.flat(Infinity);
    if (flatChildren.some(isPromise)) {
      return Promise.all(flatChildren).then((resolvedChildren) => {
        return h(nodeName, vnodeData, ...resolvedChildren);
      }).catch((err2) => {
        return h(nodeName, vnodeData);
      });
    }
    return h(nodeName, vnodeData, ...children);
  }
  return h(nodeName, vnodeData);
};

// src/hydrate/platform/proxy-host-element.ts
function proxyHostElement(elm, cmpMeta) {
  if (typeof elm.componentOnReady !== "function") {
    elm.componentOnReady = componentOnReady;
  }
  if (typeof elm.forceUpdate !== "function") {
    elm.forceUpdate = forceUpdate2;
  }
  if (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
    elm.shadowRoot = elm;
  }
  if (cmpMeta.$members$ != null) {
    const hostRef = getHostRef(elm);
    const members = Object.entries(cmpMeta.$members$);
    members.forEach(([memberName, m]) => {
      const memberFlags = m[0];
      if (memberFlags & 31 /* Prop */) {
        const attributeName = m[1] || memberName;
        const attrValue = elm.getAttribute(attributeName);
        if (attrValue != null) {
          const parsedAttrValue = parsePropertyValue(attrValue, memberFlags);
          hostRef.$instanceValues$.set(memberName, parsedAttrValue);
        }
        const ownValue = elm[memberName];
        if (ownValue !== void 0) {
          hostRef.$instanceValues$.set(memberName, ownValue);
          delete elm[memberName];
        }
        Object.defineProperty(elm, memberName, {
          get() {
            return getValue(this, memberName);
          },
          set(newValue) {
            setValue(this, memberName, newValue, cmpMeta);
          },
          configurable: true,
          enumerable: true
        });
      } else if (memberFlags & 64 /* Method */) {
        Object.defineProperty(elm, memberName, {
          value(...args) {
            const ref = getHostRef(this);
            return ref.$onInstancePromise$.then(() => ref.$lazyInstance$[memberName](...args)).catch(consoleError);
          }
        });
      }
    });
  }
}
function componentOnReady() {
  return getHostRef(this).$onReadyPromise$;
}
function forceUpdate2() {
}

// src/hydrate/platform/hydrate-app.ts
function hydrateApp(win2, opts, results, afterHydrate, resolve) {
  const connectedElements = /* @__PURE__ */ new Set();
  const createdElements = /* @__PURE__ */ new Set();
  const waitingElements = /* @__PURE__ */ new Set();
  const orgDocumentCreateElement = win2.document.createElement;
  const orgDocumentCreateElementNS = win2.document.createElementNS;
  const resolved2 = Promise.resolve();
  let tmrId;
  let ranCompleted = false;
  function hydratedComplete() {
    global.clearTimeout(tmrId);
    createdElements.clear();
    connectedElements.clear();
    if (!ranCompleted) {
      ranCompleted = true;
      try {
        if (opts.clientHydrateAnnotations) {
          insertVdomAnnotations(win2.document, opts.staticComponents);
        }
        win2.dispatchEvent(new win2.Event("DOMContentLoaded"));
        win2.document.createElement = orgDocumentCreateElement;
        win2.document.createElementNS = orgDocumentCreateElementNS;
      } catch (e) {
        renderCatchError(opts, results, e);
      }
    }
    afterHydrate(win2, opts, results, resolve);
  }
  function hydratedError(err2) {
    renderCatchError(opts, results, err2);
    hydratedComplete();
  }
  function timeoutExceeded() {
    hydratedError(`Hydrate exceeded timeout${waitingOnElementsMsg(waitingElements)}`);
  }
  try {
    let patchedConnectedCallback2 = function() {
      return connectElement2(this);
    }, patchElement2 = function(elm) {
      if (isValidComponent(elm, opts)) {
        const hostRef = getHostRef(elm);
        if (!hostRef) {
          const Cstr = loadModule(
            {
              $tagName$: elm.nodeName.toLowerCase(),
              $flags$: null
            });
          if (Cstr != null && Cstr.cmpMeta != null) {
            createdElements.add(elm);
            elm.connectedCallback = patchedConnectedCallback2;
            registerHost(elm, Cstr.cmpMeta);
            proxyHostElement(elm, Cstr.cmpMeta);
          }
        }
      }
    }, patchChild2 = function(elm) {
      if (elm != null && elm.nodeType === 1) {
        patchElement2(elm);
        const children = elm.children;
        for (let i2 = 0, ii = children.length; i2 < ii; i2++) {
          patchChild2(children[i2]);
        }
      }
    }, connectElement2 = function(elm) {
      createdElements.delete(elm);
      if (isValidComponent(elm, opts) && results.hydratedCount < opts.maxHydrateCount) {
        if (!connectedElements.has(elm) && shouldHydrate(elm)) {
          connectedElements.add(elm);
          return hydrateComponent(win2, results, elm.nodeName, elm, waitingElements);
        }
      }
      return resolved2;
    }, waitLoop2 = function() {
      const toConnect = Array.from(createdElements).filter((elm) => elm.parentElement);
      if (toConnect.length > 0) {
        return Promise.all(toConnect.map(connectElement2)).then(waitLoop2);
      }
      return resolved2;
    };
    win2.document.createElement = function patchedCreateElement(tagName) {
      const elm = orgDocumentCreateElement.call(win2.document, tagName);
      patchElement2(elm);
      return elm;
    };
    win2.document.createElementNS = function patchedCreateElement(namespaceURI, tagName) {
      const elm = orgDocumentCreateElementNS.call(win2.document, namespaceURI, tagName);
      patchElement2(elm);
      return elm;
    };
    tmrId = global.setTimeout(timeoutExceeded, opts.timeout);
    plt.$resourcesUrl$ = new URL(opts.resourcesUrl || "./", doc.baseURI).href;
    patchChild2(win2.document.body);
    waitLoop2().then(hydratedComplete).catch(hydratedError);
  } catch (e) {
    hydratedError(e);
  }
}
async function hydrateComponent(win2, results, tagName, elm, waitingElements) {
  tagName = tagName.toLowerCase();
  const Cstr = loadModule(
    {
      $tagName$: tagName,
      $flags$: null
    });
  if (Cstr != null) {
    const cmpMeta = Cstr.cmpMeta;
    if (cmpMeta != null) {
      waitingElements.add(elm);
      try {
        connectedCallback(elm);
        await elm.componentOnReady();
        results.hydratedCount++;
        const ref = getHostRef(elm);
        const modeName = !ref.$modeName$ ? "$" : ref.$modeName$;
        if (!results.components.some((c) => c.tag === tagName && c.mode === modeName)) {
          results.components.push({
            tag: tagName,
            mode: modeName,
            count: 0,
            depth: -1
          });
        }
      } catch (e) {
        win2.console.error(e);
      }
      waitingElements.delete(elm);
    }
  }
}
function isValidComponent(elm, opts) {
  if (elm != null && elm.nodeType === 1) {
    const tagName = elm.nodeName;
    if (typeof tagName === "string" && tagName.includes("-")) {
      if (opts.excludeComponents.includes(tagName.toLowerCase())) {
        return false;
      }
      return true;
    }
  }
  return false;
}
function shouldHydrate(elm) {
  if (elm.nodeType === 9) {
    return true;
  }
  if (NO_HYDRATE_TAGS.has(elm.nodeName)) {
    return false;
  }
  if (elm.hasAttribute("no-prerender")) {
    return false;
  }
  const parentNode = elm.parentNode;
  if (parentNode == null) {
    return true;
  }
  return shouldHydrate(parentNode);
}
var NO_HYDRATE_TAGS = /* @__PURE__ */ new Set([
  "CODE",
  "HEAD",
  "IFRAME",
  "INPUT",
  "OBJECT",
  "OUTPUT",
  "NOSCRIPT",
  "PRE",
  "SCRIPT",
  "SELECT",
  "STYLE",
  "TEMPLATE",
  "TEXTAREA"
]);
function renderCatchError(opts, results, err2) {
  const diagnostic = {
    level: "error",
    type: "build",
    header: "Hydrate Error",
    messageText: "",
    relFilePath: void 0,
    absFilePath: void 0,
    lines: []
  };
  if (opts.url) {
    try {
      const u = new URL(opts.url);
      if (u.pathname !== "/") {
        diagnostic.header += ": " + u.pathname;
      }
    } catch (e) {
    }
  }
  if (err2 != null) {
    if (err2.stack != null) {
      diagnostic.messageText = err2.stack.toString();
    } else if (err2.message != null) {
      diagnostic.messageText = err2.message.toString();
    } else {
      diagnostic.messageText = err2.toString();
    }
  }
  results.diagnostics.push(diagnostic);
}
function printTag(elm) {
  let tag = `<${elm.nodeName.toLowerCase()}`;
  if (Array.isArray(elm.attributes)) {
    for (let i2 = 0; i2 < elm.attributes.length; i2++) {
      const attr = elm.attributes[i2];
      tag += ` ${attr.name}`;
      if (attr.value !== "") {
        tag += `="${attr.value}"`;
      }
    }
  }
  tag += `>`;
  return tag;
}
function waitingOnElementMsg(waitingElement) {
  let msg = "";
  if (waitingElement) {
    const lines = [];
    msg = " - waiting on:";
    let elm = waitingElement;
    while (elm && elm.nodeType !== 9 && elm.nodeName !== "BODY") {
      lines.unshift(printTag(elm));
      elm = elm.parentElement;
    }
    let indent = "";
    for (const ln of lines) {
      indent += "  ";
      msg += `
${indent}${ln}`;
    }
  }
  return msg;
}
function waitingOnElementsMsg(waitingElements) {
  return Array.from(waitingElements).map(waitingOnElementMsg);
}
var cmpModules = /* @__PURE__ */ new Map();
var getModule = (tagName) => {
  if (typeof tagName === "string") {
    tagName = tagName.toLowerCase();
    const cmpModule = cmpModules.get(tagName);
    if (cmpModule != null) {
      return cmpModule[tagName];
    }
  }
  return null;
};
var loadModule = (cmpMeta, _hostRef, _hmrVersionId) => {
  return getModule(cmpMeta.$tagName$);
};
var isMemberInElement = (elm, memberName) => {
  if (elm != null) {
    if (memberName in elm) {
      return true;
    }
    const cstr = getModule(elm.nodeName);
    if (cstr != null) {
      const hostRef = cstr;
      if (hostRef != null && hostRef.cmpMeta != null && hostRef.cmpMeta.$members$ != null) {
        return memberName in hostRef.cmpMeta.$members$;
      }
    }
  }
  return false;
};
var registerComponents = (Cstrs) => {
  for (const Cstr of Cstrs) {
    const exportName = Cstr.cmpMeta.$tagName$;
    cmpModules.set(exportName, {
      [exportName]: Cstr
    });
  }
};
var win = window;
var doc = win.document;
var writeTask = (cb) => {
  process.nextTick(() => {
    try {
      cb();
    } catch (e) {
      consoleError(e);
    }
  });
};
var resolved = /* @__PURE__ */ Promise.resolve();
var nextTick = (cb) => resolved.then(cb);
var defaultConsoleError = (e) => {
  if (e != null) {
    console.error(e.stack || e.message || e);
  }
};
var consoleError = (e, el) => (defaultConsoleError)(e, el);
var plt = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (h2) => h2(),
  raf: (h2) => requestAnimationFrame(h2),
  ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new win.CustomEvent(eventName, opts)
};
var supportsShadow = false;
var hostRefs = /* @__PURE__ */ new WeakMap();
var getHostRef = (ref) => hostRefs.get(ref);
var registerInstance = (lazyInstance, hostRef) => hostRefs.set(hostRef.$lazyInstance$ = lazyInstance, hostRef);
var registerHost = (elm, cmpMeta) => {
  const hostRef = {
    $flags$: 0,
    $cmpMeta$: cmpMeta,
    $hostElement$: elm,
    $instanceValues$: /* @__PURE__ */ new Map(),
    $renderCount$: 0
  };
  hostRef.$onInstancePromise$ = new Promise((r) => hostRef.$onInstanceResolve$ = r);
  hostRef.$onReadyPromise$ = new Promise((r) => hostRef.$onReadyResolve$ = r);
  elm["s-p"] = [];
  elm["s-rc"] = [];
  return hostRefs.set(elm, hostRef);
};
var styles = /* @__PURE__ */ new Map();

class MyComponent$1 {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (hAsync("div", { key: '4fdb46f45482f7cf13724c662574fd3e8b26d01c' }, hAsync("p", { key: 'f50b709e3dc8c76d2437648108e748769d35281e' }, "Child Comp"), hAsync("inner-child", { key: '02d91b81956334eae137473a052b92dcbf475d20' })));
    }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "child-home",
        "$members$": undefined,
        "$listeners$": undefined,
        "$lazyBundleId$": "-",
        "$attrsToReflect$": []
    }; }
}

function format(first, middle, last) {
    return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

const myComponentCss = ":host{display:block}.header-main{display:flex;height:10vh;justify-content:end;align-items:center;background-color:darkgray;padding-inline:20px}.header-main nav{display:flex;column-gap:20px}";
var MyComponentStyle0 = myComponentCss;

class MyComponent {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.handleEvent = createEvent(this, "handleEvent", 7);
        // handleClick = (val: string) => {
        //   this.dataChanged.emit(val);
        // };
        // @Listen('IncreaseCount')
        // handleIncCount() {
        //   this.count = this.count + 1;
        // }
        this.handleClick = (val) => {
            this.handleEvent.emit(val);
        };
        this.first = undefined;
        this.data = undefined;
        this.myInnerArray = undefined;
        this.middle = undefined;
        this.last = undefined;
        this.useauth = undefined;
        this.useAuthState = undefined;
        this.count = 0;
    }
    handleSeeUseAuthState(newVal) {
        if (newVal)
            console.log('useAuthState', newVal);
    }
    componentWillLoad() {
        console.log('componentWillLoad', this.useauth);
        this.parseMyObjectProp(this.useauth);
        this.parseMyArrayProp(this.data);
    }
    parseMyObjectProp(newValue) {
        // console.log('newvalue', newValue);
        if (newValue)
            this.useAuthState = JSON.parse(newValue);
    }
    parseMyArrayProp(newValue) {
        if (newValue)
            this.myInnerArray = JSON.parse(newValue);
    }
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        var _a;
        return (hAsync(Fragment, { key: '13d87b6e7e395fb5f3725defff0345fbfa839ef8' }, hAsync("slot", { key: 'b0f94e98970135ca89309d81776250608dd2d4df', name: "nav" }), hAsync("div", { key: 'fd4a923c93d95383a906a15d6f23d27221e9afbf' }, "Hello, World! I'm ", this.getText()), this.useAuthState ? hAsync("p", null, (_a = this.useAuthState) === null || _a === void 0 ? void 0 : _a.name) : hAsync("p", null, "The useState value that you sent is :", this.useauth), hAsync("div", { key: '0f1a9ee15e9ff5aaaff03a189d0b2a6f3bd19431', class: "header-main" }, hAsync("nav", { key: '6bb9266001485f6ae8904eb295bebf98307e1a4f' }, hAsync("button", { key: 'ccc299c3e5cea31826dac58e5ad15a4bc08439a4', onClick: this.handleClick.bind(this, 'Home') }, "Home"), hAsync("button", { key: 'aeda4be1992c310897cf9970123df4c4af9b3ef7' }, "Register"), hAsync("button", { key: '87eff7ad178715ec373a3b22a25b56f0b3057df2' }, "login"), hAsync("button", { key: 'da3d1733794d534f814d6d2e5674e5f7f1bed5ad' }, "Admin"), hAsync("button", { key: 'b0c5d276d4d8cae7e853fd6a12b1cae1be0d4848' }, "AboutUs"), hAsync("button", { key: 'ba32248654cdcb2ca8354edf7916f2d2bfd03693' }, "Contact Us")))));
    }
    static get watchers() { return {
        "useAuthState": ["handleSeeUseAuthState"],
        "useauth": ["parseMyObjectProp"],
        "myArray": ["parseMyArrayProp"]
    }; }
    static get style() { return MyComponentStyle0; }
    static get cmpMeta() { return {
        "$flags$": 4,
        "$tagName$": "my-component",
        "$members$": {
            "first": [1],
            "data": [1],
            "myInnerArray": [16],
            "middle": [1],
            "last": [1],
            "useauth": [1025],
            "useAuthState": [32],
            "count": [32]
        },
        "$listeners$": undefined,
        "$lazyBundleId$": "-",
        "$attrsToReflect$": []
    }; }
}

class MyFirstComponent {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.count = undefined;
    }
    render() {
        return (hAsync(Fragment, { key: '2e7379730c780a66b2bab2cd83fc92fb85297530' }, hAsync("inner-child", { key: '3b9231ae6abf713ab40120c5cfd45875929c862f', count: this.count }, hAsync("slot", { key: 'de588ab3a488f323eb976932f2c82c67fb342dda', name: "inner-child" }))));
    }
    static get cmpMeta() { return {
        "$flags$": 9,
        "$tagName$": "child-component",
        "$members$": {
            "count": [2]
        },
        "$listeners$": undefined,
        "$lazyBundleId$": "-",
        "$attrsToReflect$": []
    }; }
}

class MyInnerChild {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.IncreaseCount = createEvent(this, "IncreaseCount", 7);
        this.handleInc = () => {
            this.IncreaseCount.emit();
        };
        this.count = undefined;
    }
    render() {
        return (hAsync("div", { key: '21ff0efa6bb185142b6c532afbc2e60ca75af3af' }, hAsync("slot", { key: 'f0018d32cbdb567050f2f989176b4a641e726a06', name: "inner-child" }), hAsync("p", { key: '9e4b654cfcf7982f88b77c45da12526fd6e41296' }, this.count), hAsync("button", { key: '3ff6af203cb297ca802b3a35b60a642c4be88699', onClick: this.handleInc }, "Inc")));
    }
    static get cmpMeta() { return {
        "$flags$": 4,
        "$tagName$": "inner-child",
        "$members$": {
            "count": [2]
        },
        "$listeners$": undefined,
        "$lazyBundleId$": "-",
        "$attrsToReflect$": []
    }; }
}

registerComponents([
  MyComponent$1,
  MyComponent,
  MyFirstComponent,
  MyInnerChild,
]);

exports.hydrateApp = hydrateApp;


    /*hydrateAppClosure end*/
    hydrateApp(window, $stencilHydrateOpts, $stencilHydrateResults, $stencilAfterHydrate, $stencilHydrateResolve);
  }

  hydrateAppClosure($stencilWindow);
}

/*
 Stencil Hydrate Runner v4.17.1 | MIT Licensed | https://stenciljs.com
 */
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var templateWindows = /* @__PURE__ */ new Map();
function createWindowFromHtml(templateHtml, uniqueId) {
  let templateWindow = templateWindows.get(uniqueId);
  if (templateWindow == null) {
    templateWindow = new MockWindow(templateHtml);
    templateWindows.set(uniqueId, templateWindow);
  }
  const win = cloneWindow(templateWindow);
  return win;
}

// src/utils/helpers.ts
var isString = (v) => typeof v === "string";
var isPromise = (v) => !!v && (typeof v === "object" || typeof v === "function") && typeof v.then === "function";

// src/utils/message-utils.ts
var catchError = (diagnostics, err2, msg) => {
  const diagnostic = {
    level: "error",
    type: "build",
    header: "Build Error",
    messageText: "build error",
    lines: []
  };
  if (isString(msg)) {
    diagnostic.messageText = msg.length ? msg : "UNKNOWN ERROR";
  } else if (err2 != null) {
    if (err2.stack != null) {
      diagnostic.messageText = err2.stack.toString();
    } else {
      if (err2.message != null) {
        diagnostic.messageText = err2.message.length ? err2.message : "UNKNOWN ERROR";
      } else {
        diagnostic.messageText = err2.toString();
      }
    }
  }
  if (diagnostics != null && !shouldIgnoreError(diagnostic.messageText)) {
    diagnostics.push(diagnostic);
  }
  return diagnostic;
};
var hasError = (diagnostics) => {
  if (diagnostics == null || diagnostics.length === 0) {
    return false;
  }
  return diagnostics.some((d) => d.level === "error" && d.type !== "runtime");
};
var shouldIgnoreError = (msg) => {
  return msg === TASK_CANCELED_MSG;
};
var TASK_CANCELED_MSG = `task canceled`;

// src/utils/result.ts
var result_exports = {};
__export(result_exports, {
  err: () => err,
  map: () => map,
  ok: () => ok,
  unwrap: () => unwrap,
  unwrapErr: () => unwrapErr
});
var ok = (value) => ({
  isOk: true,
  isErr: false,
  value
});
var err = (value) => ({
  isOk: false,
  isErr: true,
  value
});
function map(result, fn) {
  if (result.isOk) {
    const val = fn(result.value);
    if (val instanceof Promise) {
      return val.then((newVal) => ok(newVal));
    } else {
      return ok(val);
    }
  }
  if (result.isErr) {
    const value = result.value;
    return err(value);
  }
  throw "should never get here";
}
var unwrap = (result) => {
  if (result.isOk) {
    return result.value;
  } else {
    throw result.value;
  }
};
var unwrapErr = (result) => {
  if (result.isErr) {
    return result.value;
  } else {
    throw result.value;
  }
};

// src/compiler/html/canonical-link.ts
var updateCanonicalLink = (doc, href) => {
  let canonicalLinkElm = doc.head.querySelector('link[rel="canonical"]');
  if (typeof href === "string") {
    if (canonicalLinkElm == null) {
      canonicalLinkElm = doc.createElement("link");
      canonicalLinkElm.setAttribute("rel", "canonical");
      doc.head.appendChild(canonicalLinkElm);
    }
    canonicalLinkElm.setAttribute("href", href);
  } else {
    if (canonicalLinkElm != null) {
      const existingHref = canonicalLinkElm.getAttribute("href");
      if (!existingHref) {
        canonicalLinkElm.parentNode.removeChild(canonicalLinkElm);
      }
    }
  }
};

// src/compiler/html/relocate-meta-charset.ts
var relocateMetaCharset = (doc) => {
  const head = doc.head;
  let charsetElm = head.querySelector("meta[charset]");
  if (charsetElm == null) {
    charsetElm = doc.createElement("meta");
    charsetElm.setAttribute("charset", "utf-8");
  } else {
    charsetElm.remove();
  }
  head.insertBefore(charsetElm, head.firstChild);
};

// src/compiler/style/css-parser/parse-css.ts
var parseCss = (css, filePath) => {
  let lineno = 1;
  let column = 1;
  const diagnostics = [];
  const updatePosition = (str) => {
    const lines = str.match(/\n/g);
    if (lines)
      lineno += lines.length;
    const i = str.lastIndexOf("\n");
    column = ~i ? str.length - i : column + str.length;
  };
  const position = () => {
    const start = { line: lineno, column };
    return (node) => {
      node.position = new ParsePosition(start);
      whitespace();
      return node;
    };
  };
  const error = (msg) => {
    const srcLines = css.split("\n");
    const d = {
      level: "error",
      type: "css",
      language: "css",
      header: "CSS Parse",
      messageText: msg,
      absFilePath: filePath,
      lines: [
        {
          lineIndex: lineno - 1,
          lineNumber: lineno,
          errorCharStart: column,
          text: css[lineno - 1]
        }
      ]
    };
    if (lineno > 1) {
      const previousLine = {
        lineIndex: lineno - 1,
        lineNumber: lineno - 1,
        text: css[lineno - 2],
        errorCharStart: -1,
        errorLength: -1
      };
      d.lines.unshift(previousLine);
    }
    if (lineno + 2 < srcLines.length) {
      const nextLine = {
        lineIndex: lineno,
        lineNumber: lineno + 1,
        text: srcLines[lineno],
        errorCharStart: -1,
        errorLength: -1
      };
      d.lines.push(nextLine);
    }
    diagnostics.push(d);
    return null;
  };
  const stylesheet = () => {
    const rulesList = rules();
    return {
      type: 14 /* StyleSheet */,
      stylesheet: {
        source: filePath,
        rules: rulesList
      }
    };
  };
  const open = () => match(/^{\s*/);
  const close = () => match(/^}/);
  const match = (re) => {
    const m = re.exec(css);
    if (!m)
      return;
    const str = m[0];
    updatePosition(str);
    css = css.slice(str.length);
    return m;
  };
  const rules = () => {
    let node;
    const rules2 = [];
    whitespace();
    comments(rules2);
    while (css.length && css.charAt(0) !== "}" && (node = atrule() || rule())) {
      rules2.push(node);
      comments(rules2);
    }
    return rules2;
  };
  const whitespace = () => match(/^\s*/);
  const comments = (rules2) => {
    let c;
    rules2 = rules2 || [];
    while (c = comment()) {
      rules2.push(c);
    }
    return rules2;
  };
  const comment = () => {
    const pos = position();
    if ("/" !== css.charAt(0) || "*" !== css.charAt(1))
      return null;
    let i = 2;
    while ("" !== css.charAt(i) && ("*" !== css.charAt(i) || "/" !== css.charAt(i + 1)))
      ++i;
    i += 2;
    if ("" === css.charAt(i - 1)) {
      return error("End of comment missing");
    }
    const comment2 = css.slice(2, i - 2);
    column += 2;
    updatePosition(comment2);
    css = css.slice(i);
    column += 2;
    return pos({
      type: 1 /* Comment */,
      comment: comment2
    });
  };
  const selector = () => {
    const m = match(/^([^{]+)/);
    if (!m)
      return null;
    return trim(m[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function(m2) {
      return m2.replace(/,/g, "\u200C");
    }).split(/\s*(?![^(]*\)),\s*/).map(function(s) {
      return s.replace(/\u200C/g, ",");
    });
  };
  const declaration = () => {
    const pos = position();
    let prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!prop)
      return null;
    prop = trim(prop[0]);
    if (!match(/^:\s*/))
      return error(`property missing ':'`);
    const val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);
    const ret = pos({
      type: 4 /* Declaration */,
      property: prop.replace(commentre, ""),
      value: val ? trim(val[0]).replace(commentre, "") : ""
    });
    match(/^[;\s]*/);
    return ret;
  };
  const declarations = () => {
    const decls = [];
    if (!open())
      return error(`missing '{'`);
    comments(decls);
    let decl;
    while (decl = declaration()) {
      decls.push(decl);
      comments(decls);
    }
    if (!close())
      return error(`missing '}'`);
    return decls;
  };
  const keyframe = () => {
    let m;
    const values = [];
    const pos = position();
    while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
      values.push(m[1]);
      match(/^,\s*/);
    }
    if (!values.length)
      return null;
    return pos({
      type: 9 /* KeyFrame */,
      values,
      declarations: declarations()
    });
  };
  const atkeyframes = () => {
    const pos = position();
    let m = match(/^@([-\w]+)?keyframes\s*/);
    if (!m)
      return null;
    const vendor = m[1];
    m = match(/^([-\w]+)\s*/);
    if (!m)
      return error(`@keyframes missing name`);
    const name = m[1];
    if (!open())
      return error(`@keyframes missing '{'`);
    let frame;
    let frames = comments();
    while (frame = keyframe()) {
      frames.push(frame);
      frames = frames.concat(comments());
    }
    if (!close())
      return error(`@keyframes missing '}'`);
    return pos({
      type: 8 /* KeyFrames */,
      name,
      vendor,
      keyframes: frames
    });
  };
  const atsupports = () => {
    const pos = position();
    const m = match(/^@supports *([^{]+)/);
    if (!m)
      return null;
    const supports = trim(m[1]);
    if (!open())
      return error(`@supports missing '{'`);
    const style = comments().concat(rules());
    if (!close())
      return error(`@supports missing '}'`);
    return pos({
      type: 15 /* Supports */,
      supports,
      rules: style
    });
  };
  const athost = () => {
    const pos = position();
    const m = match(/^@host\s*/);
    if (!m)
      return null;
    if (!open())
      return error(`@host missing '{'`);
    const style = comments().concat(rules());
    if (!close())
      return error(`@host missing '}'`);
    return pos({
      type: 6 /* Host */,
      rules: style
    });
  };
  const atmedia = () => {
    const pos = position();
    const m = match(/^@media *([^{]+)/);
    if (!m)
      return null;
    const media = trim(m[1]);
    if (!open())
      return error(`@media missing '{'`);
    const style = comments().concat(rules());
    if (!close())
      return error(`@media missing '}'`);
    return pos({
      type: 10 /* Media */,
      media,
      rules: style
    });
  };
  const atcustommedia = () => {
    const pos = position();
    const m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
    if (!m)
      return null;
    return pos({
      type: 2 /* CustomMedia */,
      name: trim(m[1]),
      media: trim(m[2])
    });
  };
  const atpage = () => {
    const pos = position();
    const m = match(/^@page */);
    if (!m)
      return null;
    const sel = selector() || [];
    if (!open())
      return error(`@page missing '{'`);
    let decls = comments();
    let decl;
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }
    if (!close())
      return error(`@page missing '}'`);
    return pos({
      type: 12 /* Page */,
      selectors: sel,
      declarations: decls
    });
  };
  const atdocument = () => {
    const pos = position();
    const m = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m)
      return null;
    const vendor = trim(m[1]);
    const doc = trim(m[2]);
    if (!open())
      return error(`@document missing '{'`);
    const style = comments().concat(rules());
    if (!close())
      return error(`@document missing '}'`);
    return pos({
      type: 3 /* Document */,
      document: doc,
      vendor,
      rules: style
    });
  };
  const atfontface = () => {
    const pos = position();
    const m = match(/^@font-face\s*/);
    if (!m)
      return null;
    if (!open())
      return error(`@font-face missing '{'`);
    let decls = comments();
    let decl;
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }
    if (!close())
      return error(`@font-face missing '}'`);
    return pos({
      type: 5 /* FontFace */,
      declarations: decls
    });
  };
  const compileAtrule = (nodeName, nodeType) => {
    const re = new RegExp("^@" + nodeName + "\\s*([^;]+);");
    return () => {
      const pos = position();
      const m = match(re);
      if (!m)
        return null;
      const node = {
        type: nodeType
      };
      node[nodeName] = m[1].trim();
      return pos(node);
    };
  };
  const atimport = compileAtrule("import", 7 /* Import */);
  const atcharset = compileAtrule("charset", 0 /* Charset */);
  const atnamespace = compileAtrule("namespace", 11 /* Namespace */);
  const atrule = () => {
    if (css[0] !== "@")
      return null;
    return atkeyframes() || atmedia() || atcustommedia() || atsupports() || atimport() || atcharset() || atnamespace() || atdocument() || atpage() || athost() || atfontface();
  };
  const rule = () => {
    const pos = position();
    const sel = selector();
    if (!sel)
      return error("selector missing");
    comments();
    return pos({
      type: 13 /* Rule */,
      selectors: sel,
      declarations: declarations()
    });
  };
  class ParsePosition {
    constructor(start) {
      this.start = start;
      this.end = { line: lineno, column };
      this.source = filePath;
    }
  }
  ParsePosition.prototype.content = css;
  return {
    diagnostics,
    ...addParent(stylesheet())
  };
};
var trim = (str) => str ? str.trim() : "";
var addParent = (obj, parent) => {
  const isNode = obj && typeof obj.type === "string";
  const childParent = isNode ? obj : parent;
  for (const k in obj) {
    const value = obj[k];
    if (Array.isArray(value)) {
      value.forEach(function(v) {
        addParent(v, childParent);
      });
    } else if (value && typeof value === "object") {
      addParent(value, childParent);
    }
  }
  if (isNode) {
    Object.defineProperty(obj, "parent", {
      configurable: true,
      writable: true,
      enumerable: false,
      value: parent || null
    });
  }
  return obj;
};
var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

// src/compiler/style/css-parser/get-css-selectors.ts
var getCssSelectors = (sel) => {
  SELECTORS.all.length = SELECTORS.tags.length = SELECTORS.classNames.length = SELECTORS.ids.length = SELECTORS.attrs.length = 0;
  sel = sel.replace(/\./g, " .").replace(/\#/g, " #").replace(/\[/g, " [").replace(/\>/g, " > ").replace(/\+/g, " + ").replace(/\~/g, " ~ ").replace(/\*/g, " * ").replace(/\:not\((.*?)\)/g, " ");
  const items = sel.split(" ");
  for (let i = 0, l = items.length; i < l; i++) {
    items[i] = items[i].split(":")[0];
    if (items[i].length === 0)
      continue;
    if (items[i].charAt(0) === ".") {
      SELECTORS.classNames.push(items[i].slice(1));
    } else if (items[i].charAt(0) === "#") {
      SELECTORS.ids.push(items[i].slice(1));
    } else if (items[i].charAt(0) === "[") {
      items[i] = items[i].slice(1).split("=")[0].split("]")[0].trim();
      SELECTORS.attrs.push(items[i].toLowerCase());
    } else if (/[a-z]/g.test(items[i].charAt(0))) {
      SELECTORS.tags.push(items[i].toLowerCase());
    }
  }
  SELECTORS.classNames = SELECTORS.classNames.sort((a, b) => {
    if (a.length < b.length)
      return -1;
    if (a.length > b.length)
      return 1;
    return 0;
  });
  return SELECTORS;
};
var SELECTORS = {
  all: [],
  tags: [],
  classNames: [],
  ids: [],
  attrs: []
};

// src/compiler/style/css-parser/serialize-css.ts
var serializeCss = (stylesheet, serializeOpts) => {
  const usedSelectors = serializeOpts.usedSelectors || null;
  const opts = {
    usedSelectors: usedSelectors || null,
    hasUsedAttrs: !!usedSelectors && usedSelectors.attrs.size > 0,
    hasUsedClassNames: !!usedSelectors && usedSelectors.classNames.size > 0,
    hasUsedIds: !!usedSelectors && usedSelectors.ids.size > 0,
    hasUsedTags: !!usedSelectors && usedSelectors.tags.size > 0
  };
  const rules = stylesheet.rules;
  if (!rules) {
    return "";
  }
  const rulesLen = rules.length;
  const out = [];
  for (let i = 0; i < rulesLen; i++) {
    out.push(serializeCssVisitNode(opts, rules[i], i, rulesLen));
  }
  return out.join("");
};
var serializeCssVisitNode = (opts, node, index, len) => {
  var _a;
  const nodeType = node.type;
  if (nodeType === 4 /* Declaration */) {
    return serializeCssDeclaration(node, index, len);
  }
  if (nodeType === 13 /* Rule */) {
    return serializeCssRule(opts, node);
  }
  if (nodeType === 1 /* Comment */) {
    if (((_a = node.comment) == null ? void 0 : _a[0]) === "!") {
      return `/*${node.comment}*/`;
    } else {
      return "";
    }
  }
  if (nodeType === 10 /* Media */) {
    return serializeCssMedia(opts, node);
  }
  if (nodeType === 8 /* KeyFrames */) {
    return serializeCssKeyframes(opts, node);
  }
  if (nodeType === 9 /* KeyFrame */) {
    return serializeCssKeyframe(opts, node);
  }
  if (nodeType === 5 /* FontFace */) {
    return serializeCssFontFace(opts, node);
  }
  if (nodeType === 15 /* Supports */) {
    return serializeCssSupports(opts, node);
  }
  if (nodeType === 7 /* Import */) {
    return "@import " + node.import + ";";
  }
  if (nodeType === 0 /* Charset */) {
    return "@charset " + node.charset + ";";
  }
  if (nodeType === 12 /* Page */) {
    return serializeCssPage(opts, node);
  }
  if (nodeType === 6 /* Host */) {
    return "@host{" + serializeCssMapVisit(opts, node.rules) + "}";
  }
  if (nodeType === 2 /* CustomMedia */) {
    return "@custom-media " + node.name + " " + node.media + ";";
  }
  if (nodeType === 3 /* Document */) {
    return serializeCssDocument(opts, node);
  }
  if (nodeType === 11 /* Namespace */) {
    return "@namespace " + node.namespace + ";";
  }
  return "";
};
var serializeCssRule = (opts, node) => {
  var _a, _b;
  const decls = node.declarations;
  const usedSelectors = opts.usedSelectors;
  const selectors = (_b = (_a = node.selectors) == null ? void 0 : _a.slice()) != null ? _b : [];
  if (decls == null || decls.length === 0) {
    return "";
  }
  if (usedSelectors) {
    let i;
    let j;
    let include = true;
    for (i = selectors.length - 1; i >= 0; i--) {
      const sel = getCssSelectors(selectors[i]);
      include = true;
      let jlen = sel.classNames.length;
      if (jlen > 0 && opts.hasUsedClassNames) {
        for (j = 0; j < jlen; j++) {
          if (!usedSelectors.classNames.has(sel.classNames[j])) {
            include = false;
            break;
          }
        }
      }
      if (include && opts.hasUsedTags) {
        jlen = sel.tags.length;
        if (jlen > 0) {
          for (j = 0; j < jlen; j++) {
            if (!usedSelectors.tags.has(sel.tags[j])) {
              include = false;
              break;
            }
          }
        }
      }
      if (include && opts.hasUsedAttrs) {
        jlen = sel.attrs.length;
        if (jlen > 0) {
          for (j = 0; j < jlen; j++) {
            if (!usedSelectors.attrs.has(sel.attrs[j])) {
              include = false;
              break;
            }
          }
        }
      }
      if (include && opts.hasUsedIds) {
        jlen = sel.ids.length;
        if (jlen > 0) {
          for (j = 0; j < jlen; j++) {
            if (!usedSelectors.ids.has(sel.ids[j])) {
              include = false;
              break;
            }
          }
        }
      }
      if (!include) {
        selectors.splice(i, 1);
      }
    }
  }
  if (selectors.length === 0) {
    return "";
  }
  const cleanedSelectors = [];
  let cleanedSelector = "";
  if (node.selectors) {
    for (const selector of node.selectors) {
      cleanedSelector = removeSelectorWhitespace(selector);
      if (!cleanedSelectors.includes(cleanedSelector)) {
        cleanedSelectors.push(cleanedSelector);
      }
    }
  }
  return `${cleanedSelectors}{${serializeCssMapVisit(opts, decls)}}`;
};
var serializeCssDeclaration = (node, index, len) => {
  if (node.value === "") {
    return "";
  }
  if (len - 1 === index) {
    return node.property + ":" + node.value;
  }
  return node.property + ":" + node.value + ";";
};
var serializeCssMedia = (opts, node) => {
  const mediaCss = serializeCssMapVisit(opts, node.rules);
  if (mediaCss === "") {
    return "";
  }
  return "@media " + removeMediaWhitespace(node.media) + "{" + mediaCss + "}";
};
var serializeCssKeyframes = (opts, node) => {
  const keyframesCss = serializeCssMapVisit(opts, node.keyframes);
  if (keyframesCss === "") {
    return "";
  }
  return "@" + (node.vendor || "") + "keyframes " + node.name + "{" + keyframesCss + "}";
};
var serializeCssKeyframe = (opts, node) => {
  var _a, _b;
  return ((_b = (_a = node.values) == null ? void 0 : _a.join(",")) != null ? _b : "") + "{" + serializeCssMapVisit(opts, node.declarations) + "}";
};
var serializeCssFontFace = (opts, node) => {
  const fontCss = serializeCssMapVisit(opts, node.declarations);
  if (fontCss === "") {
    return "";
  }
  return "@font-face{" + fontCss + "}";
};
var serializeCssSupports = (opts, node) => {
  const supportsCss = serializeCssMapVisit(opts, node.rules);
  if (supportsCss === "") {
    return "";
  }
  return "@supports " + node.supports + "{" + supportsCss + "}";
};
var serializeCssPage = (opts, node) => {
  var _a, _b;
  const sel = (_b = (_a = node.selectors) == null ? void 0 : _a.join(", ")) != null ? _b : "";
  return "@page " + sel + "{" + serializeCssMapVisit(opts, node.declarations) + "}";
};
var serializeCssDocument = (opts, node) => {
  const documentCss = serializeCssMapVisit(opts, node.rules);
  const doc = "@" + (node.vendor || "") + "document " + node.document;
  if (documentCss === "") {
    return "";
  }
  return doc + "{" + documentCss + "}";
};
var serializeCssMapVisit = (opts, nodes) => {
  let rtn = "";
  if (nodes) {
    for (let i = 0, len = nodes.length; i < len; i++) {
      rtn += serializeCssVisitNode(opts, nodes[i], i, len);
    }
  }
  return rtn;
};
var removeSelectorWhitespace = (selector) => {
  let rtn = "";
  let char = "";
  let inAttr = false;
  selector = selector.trim();
  for (let i = 0, l = selector.length; i < l; i++) {
    char = selector[i];
    if (char === "[" && rtn[rtn.length - 1] !== "\\") {
      inAttr = true;
    } else if (char === "]" && rtn[rtn.length - 1] !== "\\") {
      inAttr = false;
    }
    if (!inAttr && CSS_WS_REG.test(char)) {
      if (CSS_NEXT_CHAR_REG.test(selector[i + 1])) {
        continue;
      }
      if (CSS_PREV_CHAR_REG.test(rtn[rtn.length - 1])) {
        continue;
      }
      rtn += " ";
    } else {
      rtn += char;
    }
  }
  return rtn;
};
var removeMediaWhitespace = (media) => {
  var _a;
  let rtn = "";
  let char = "";
  media = (_a = media == null ? void 0 : media.trim()) != null ? _a : "";
  for (let i = 0, l = media.length; i < l; i++) {
    char = media[i];
    if (CSS_WS_REG.test(char)) {
      if (CSS_WS_REG.test(rtn[rtn.length - 1])) {
        continue;
      }
      rtn += " ";
    } else {
      rtn += char;
    }
  }
  return rtn;
};
var CSS_WS_REG = /\s/;
var CSS_NEXT_CHAR_REG = /[>\(\)\~\,\+\s]/;
var CSS_PREV_CHAR_REG = /[>\(\~\,\+]/;

// src/compiler/style/css-parser/used-selectors.ts
var getUsedSelectors = (elm) => {
  const usedSelectors = {
    attrs: /* @__PURE__ */ new Set(),
    classNames: /* @__PURE__ */ new Set(),
    ids: /* @__PURE__ */ new Set(),
    tags: /* @__PURE__ */ new Set()
  };
  collectUsedSelectors(usedSelectors, elm);
  return usedSelectors;
};
var collectUsedSelectors = (usedSelectors, elm) => {
  if (elm != null && elm.nodeType === 1) {
    const children = elm.children;
    const tagName = elm.nodeName.toLowerCase();
    usedSelectors.tags.add(tagName);
    const attributes = elm.attributes;
    for (let i = 0, l = attributes.length; i < l; i++) {
      const attr = attributes.item(i);
      const attrName = attr.name.toLowerCase();
      usedSelectors.attrs.add(attrName);
      if (attrName === "class") {
        const classList = elm.classList;
        for (let i2 = 0, l2 = classList.length; i2 < l2; i2++) {
          usedSelectors.classNames.add(classList.item(i2));
        }
      } else if (attrName === "id") {
        usedSelectors.ids.add(attr.value);
      }
    }
    if (children) {
      for (let i = 0, l = children.length; i < l; i++) {
        collectUsedSelectors(usedSelectors, children[i]);
      }
    }
  }
};

// src/compiler/html/remove-unused-styles.ts
var removeUnusedStyles = (doc, diagnostics) => {
  try {
    const styleElms = doc.head.querySelectorAll(`style[data-styles]`);
    const styleLen = styleElms.length;
    if (styleLen > 0) {
      const usedSelectors = getUsedSelectors(doc.documentElement);
      for (let i = 0; i < styleLen; i++) {
        removeUnusedStyleText(usedSelectors, diagnostics, styleElms[i]);
      }
    }
  } catch (e) {
    catchError(diagnostics, e);
  }
};
var removeUnusedStyleText = (usedSelectors, diagnostics, styleElm) => {
  try {
    const parseResults = parseCss(styleElm.innerHTML);
    diagnostics.push(...parseResults.diagnostics);
    if (hasError(diagnostics)) {
      return;
    }
    try {
      styleElm.innerHTML = serializeCss(parseResults.stylesheet, {
        usedSelectors
      });
    } catch (e) {
      diagnostics.push({
        level: "warn",
        type: "css",
        header: "CSS Stringify",
        messageText: e,
        lines: []
      });
    }
  } catch (e) {
    diagnostics.push({
      level: "warn",
      type: "css",
      header: "CSS Parse",
      messageText: e,
      lines: []
    });
  }
};

// src/hydrate/runner/inspect-element.ts
function inspectElement(results, elm, depth) {
  const children = elm.children;
  for (let i = 0, ii = children.length; i < ii; i++) {
    const childElm = children[i];
    const tagName = childElm.nodeName.toLowerCase();
    if (tagName.includes("-")) {
      const cmp = results.components.find((c) => c.tag === tagName);
      if (cmp != null) {
        cmp.count++;
        if (depth > cmp.depth) {
          cmp.depth = depth;
        }
      }
    } else {
      switch (tagName) {
        case "a":
          const anchor = collectAttributes(childElm);
          anchor.href = childElm.href;
          if (typeof anchor.href === "string") {
            if (!results.anchors.some((a) => a.href === anchor.href)) {
              results.anchors.push(anchor);
            }
          }
          break;
        case "img":
          const img = collectAttributes(childElm);
          img.src = childElm.src;
          if (typeof img.src === "string") {
            if (!results.imgs.some((a) => a.src === img.src)) {
              results.imgs.push(img);
            }
          }
          break;
        case "link":
          const link = collectAttributes(childElm);
          link.href = childElm.href;
          if (typeof link.rel === "string" && link.rel.toLowerCase() === "stylesheet") {
            if (typeof link.href === "string") {
              if (!results.styles.some((s) => s.link === link.href)) {
                delete link.rel;
                delete link.type;
                results.styles.push(link);
              }
            }
          }
          break;
        case "script":
          const script = collectAttributes(childElm);
          if (childElm.hasAttribute("src")) {
            script.src = childElm.src;
            if (typeof script.src === "string") {
              if (!results.scripts.some((s) => s.src === script.src)) {
                results.scripts.push(script);
              }
            }
          } else {
            const staticDataKey = childElm.getAttribute("data-stencil-static");
            if (staticDataKey) {
              results.staticData.push({
                id: staticDataKey,
                type: childElm.getAttribute("type"),
                content: childElm.textContent
              });
            }
          }
          break;
      }
    }
    depth++;
    inspectElement(results, childElm, depth);
  }
}
function collectAttributes(node) {
  const parsedElm = {};
  const attrs = node.attributes;
  for (let i = 0, ii = attrs.length; i < ii; i++) {
    const attr = attrs.item(i);
    const attrName = attr.nodeName.toLowerCase();
    if (SKIP_ATTRS.has(attrName)) {
      continue;
    }
    const attrValue = attr.nodeValue;
    if (attrName === "class" && attrValue === "") {
      continue;
    }
    parsedElm[attrName] = attrValue;
  }
  return parsedElm;
}
var SKIP_ATTRS = /* @__PURE__ */ new Set(["s-id", "c-id"]);
function patchDomImplementation(doc, opts) {
  let win;
  if (doc.defaultView != null) {
    opts.destroyWindow = true;
    patchWindow(doc.defaultView);
    win = doc.defaultView;
  } else {
    opts.destroyWindow = true;
    opts.destroyDocument = false;
    win = new MockWindow(false);
  }
  if (win.document !== doc) {
    win.document = doc;
  }
  if (doc.defaultView !== win) {
    doc.defaultView = win;
  }
  const HTMLElement = doc.documentElement.constructor.prototype;
  if (typeof HTMLElement.getRootNode !== "function") {
    const elm = doc.createElement("unknown-element");
    const HTMLUnknownElement = elm.constructor.prototype;
    HTMLUnknownElement.getRootNode = getRootNode;
  }
  if (typeof doc.createEvent === "function") {
    const CustomEvent = doc.createEvent("CustomEvent").constructor;
    if (win.CustomEvent !== CustomEvent) {
      win.CustomEvent = CustomEvent;
    }
  }
  try {
    win.__stencil_baseURI = doc.baseURI;
  } catch (e) {
    Object.defineProperty(doc, "baseURI", {
      get() {
        const baseElm = doc.querySelector("base[href]");
        if (baseElm) {
          return new URL(baseElm.getAttribute("href"), win.location.href).href;
        }
        return win.location.href;
      }
    });
  }
  return win;
}
function getRootNode(opts) {
  const isComposed = opts != null && opts.composed === true;
  let node = this;
  while (node.parentNode != null) {
    node = node.parentNode;
    if (isComposed === true && node.parentNode == null && node.host != null) {
      node = node.host;
    }
  }
  return node;
}

// src/hydrate/runner/render-utils.ts
function normalizeHydrateOptions(inputOpts) {
  const outputOpts = Object.assign(
    {
      serializeToHtml: false,
      destroyWindow: false,
      destroyDocument: false
    },
    inputOpts || {}
  );
  if (typeof outputOpts.clientHydrateAnnotations !== "boolean") {
    outputOpts.clientHydrateAnnotations = true;
  }
  if (typeof outputOpts.constrainTimeouts !== "boolean") {
    outputOpts.constrainTimeouts = true;
  }
  if (typeof outputOpts.maxHydrateCount !== "number") {
    outputOpts.maxHydrateCount = 300;
  }
  if (typeof outputOpts.runtimeLogging !== "boolean") {
    outputOpts.runtimeLogging = false;
  }
  if (typeof outputOpts.timeout !== "number") {
    outputOpts.timeout = 15e3;
  }
  if (Array.isArray(outputOpts.excludeComponents)) {
    outputOpts.excludeComponents = outputOpts.excludeComponents.filter(filterValidTags).map(mapValidTags);
  } else {
    outputOpts.excludeComponents = [];
  }
  if (Array.isArray(outputOpts.staticComponents)) {
    outputOpts.staticComponents = outputOpts.staticComponents.filter(filterValidTags).map(mapValidTags);
  } else {
    outputOpts.staticComponents = [];
  }
  return outputOpts;
}
function filterValidTags(tag) {
  return typeof tag === "string" && tag.includes("-");
}
function mapValidTags(tag) {
  return tag.trim().toLowerCase();
}
function generateHydrateResults(opts) {
  if (typeof opts.url !== "string") {
    opts.url = `https://hydrate.stenciljs.com/`;
  }
  if (typeof opts.buildId !== "string") {
    opts.buildId = createHydrateBuildId();
  }
  const results = {
    buildId: opts.buildId,
    diagnostics: [],
    url: opts.url,
    host: null,
    hostname: null,
    href: null,
    pathname: null,
    port: null,
    search: null,
    hash: null,
    html: null,
    httpStatus: null,
    hydratedCount: 0,
    anchors: [],
    components: [],
    imgs: [],
    scripts: [],
    staticData: [],
    styles: [],
    title: null
  };
  try {
    const url = new URL(opts.url, `https://hydrate.stenciljs.com/`);
    results.url = url.href;
    results.host = url.host;
    results.hostname = url.hostname;
    results.href = url.href;
    results.port = url.port;
    results.pathname = url.pathname;
    results.search = url.search;
    results.hash = url.hash;
  } catch (e) {
    renderCatchError(results, e);
  }
  return results;
}
var createHydrateBuildId = () => {
  let chars = "abcdefghijklmnopqrstuvwxyz";
  let buildId = "";
  while (buildId.length < 8) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    buildId += char;
    if (buildId.length === 1) {
      chars += "0123456789";
    }
  }
  return buildId;
};
function renderBuildDiagnostic(results, level, header, msg) {
  const diagnostic = {
    level,
    type: "build",
    header,
    messageText: msg,
    relFilePath: void 0,
    absFilePath: void 0,
    lines: []
  };
  if (results.pathname) {
    if (results.pathname !== "/") {
      diagnostic.header += ": " + results.pathname;
    }
  } else if (results.url) {
    diagnostic.header += ": " + results.url;
  }
  results.diagnostics.push(diagnostic);
  return diagnostic;
}
function renderBuildError(results, msg) {
  return renderBuildDiagnostic(results, "error", "Hydrate Error", msg);
}
function renderCatchError(results, err2) {
  const diagnostic = renderBuildError(results, null);
  if (err2 != null) {
    if (err2.stack != null) {
      diagnostic.messageText = err2.stack.toString();
    } else {
      if (err2.message != null) {
        diagnostic.messageText = err2.message.toString();
      } else {
        diagnostic.messageText = err2.toString();
      }
    }
  }
  return diagnostic;
}

// src/hydrate/runner/runtime-log.ts
function runtimeLogging(win, opts, results) {
  try {
    const pathname = win.location.pathname;
    win.console.error = (...msgs) => {
      const errMsg = msgs.reduce((errMsg2, m) => {
        if (m) {
          if (m.stack != null) {
            return errMsg2 + " " + String(m.stack);
          } else {
            if (m.message != null) {
              return errMsg2 + " " + String(m.message);
            }
          }
        }
        return String(m);
      }, "").trim();
      if (errMsg !== "") {
        renderCatchError(results, errMsg);
        if (opts.runtimeLogging) {
          runtimeLog(pathname, "error", [errMsg]);
        }
      }
    };
    win.console.debug = (...msgs) => {
      renderBuildDiagnostic(results, "debug", "Hydrate Debug", [...msgs].join(", "));
      if (opts.runtimeLogging) {
        runtimeLog(pathname, "debug", msgs);
      }
    };
    if (opts.runtimeLogging) {
      ["log", "warn", "assert", "info", "trace"].forEach((type) => {
        win.console[type] = (...msgs) => {
          runtimeLog(pathname, type, msgs);
        };
      });
    }
  } catch (e) {
    renderCatchError(results, e);
  }
}
function runtimeLog(pathname, type, msgs) {
  global.console[type].apply(global.console, [`[ ${pathname}  ${type} ] `, ...msgs]);
}

// src/hydrate/runner/window-initialize.ts
function initializeWindow(win, doc, opts, results) {
  try {
    win.location.href = opts.url;
  } catch (e) {
    renderCatchError(results, e);
  }
  if (typeof opts.userAgent === "string") {
    try {
      win.navigator.userAgent = opts.userAgent;
    } catch (e) {
    }
  }
  if (typeof opts.cookie === "string") {
    try {
      doc.cookie = opts.cookie;
    } catch (e) {
    }
  }
  if (typeof opts.referrer === "string") {
    try {
      doc.referrer = opts.referrer;
    } catch (e) {
    }
  }
  if (typeof opts.direction === "string") {
    try {
      doc.documentElement.setAttribute("dir", opts.direction);
    } catch (e) {
    }
  }
  if (typeof opts.language === "string") {
    try {
      doc.documentElement.setAttribute("lang", opts.language);
    } catch (e) {
    }
  }
  if (typeof opts.buildId === "string") {
    try {
      doc.documentElement.setAttribute("data-stencil-build", opts.buildId);
    } catch (e) {
    }
  }
  try {
    win.customElements = null;
  } catch (e) {
  }
  if (opts.constrainTimeouts) {
    constrainTimeouts(win);
  }
  runtimeLogging(win, opts, results);
  return win;
}

// src/hydrate/runner/render.ts
function renderToString(html, options) {
  const opts = normalizeHydrateOptions(options);
  opts.serializeToHtml = true;
  return new Promise((resolve) => {
    let win;
    const results = generateHydrateResults(opts);
    if (hasError(results.diagnostics)) {
      resolve(results);
    } else if (typeof html === "string") {
      try {
        opts.destroyWindow = true;
        opts.destroyDocument = true;
        win = new MockWindow(html);
        render(win, opts, results, resolve);
      } catch (e) {
        if (win && win.close) {
          win.close();
        }
        win = null;
        renderCatchError(results, e);
        resolve(results);
      }
    } else if (isValidDocument(html)) {
      try {
        opts.destroyDocument = false;
        win = patchDomImplementation(html, opts);
        render(win, opts, results, resolve);
      } catch (e) {
        if (win && win.close) {
          win.close();
        }
        win = null;
        renderCatchError(results, e);
        resolve(results);
      }
    } else {
      renderBuildError(results, `Invalid html or document. Must be either a valid "html" string, or DOM "document".`);
      resolve(results);
    }
  });
}
function hydrateDocument(doc, options) {
  const opts = normalizeHydrateOptions(options);
  opts.serializeToHtml = false;
  return new Promise((resolve) => {
    let win;
    const results = generateHydrateResults(opts);
    if (hasError(results.diagnostics)) {
      resolve(results);
    } else if (typeof doc === "string") {
      try {
        opts.destroyWindow = true;
        opts.destroyDocument = true;
        win = new MockWindow(doc);
        render(win, opts, results, resolve);
      } catch (e) {
        if (win && win.close) {
          win.close();
        }
        win = null;
        renderCatchError(results, e);
        resolve(results);
      }
    } else if (isValidDocument(doc)) {
      try {
        opts.destroyDocument = false;
        win = patchDomImplementation(doc, opts);
        render(win, opts, results, resolve);
      } catch (e) {
        if (win && win.close) {
          win.close();
        }
        win = null;
        renderCatchError(results, e);
        resolve(results);
      }
    } else {
      renderBuildError(results, `Invalid html or document. Must be either a valid "html" string, or DOM "document".`);
      resolve(results);
    }
  });
}
function render(win, opts, results, resolve) {
  if (!process.__stencilErrors) {
    process.__stencilErrors = true;
    process.on("unhandledRejection", (e) => {
      console.log("unhandledRejection", e);
    });
  }
  initializeWindow(win, win.document, opts, results);
  if (typeof opts.beforeHydrate === "function") {
    try {
      const rtn = opts.beforeHydrate(win.document);
      if (isPromise(rtn)) {
        rtn.then(() => {
          hydrateFactory(win, opts, results, afterHydrate, resolve);
        });
      } else {
        hydrateFactory(win, opts, results, afterHydrate, resolve);
      }
    } catch (e) {
      renderCatchError(results, e);
      finalizeHydrate(win, win.document, opts, results, resolve);
    }
  } else {
    hydrateFactory(win, opts, results, afterHydrate, resolve);
  }
}
function afterHydrate(win, opts, results, resolve) {
  if (typeof opts.afterHydrate === "function") {
    try {
      const rtn = opts.afterHydrate(win.document);
      if (isPromise(rtn)) {
        rtn.then(() => {
          finalizeHydrate(win, win.document, opts, results, resolve);
        });
      } else {
        finalizeHydrate(win, win.document, opts, results, resolve);
      }
    } catch (e) {
      renderCatchError(results, e);
      finalizeHydrate(win, win.document, opts, results, resolve);
    }
  } else {
    finalizeHydrate(win, win.document, opts, results, resolve);
  }
}
function finalizeHydrate(win, doc, opts, results, resolve) {
  try {
    inspectElement(results, doc.documentElement, 0);
    if (opts.removeUnusedStyles !== false) {
      try {
        removeUnusedStyles(doc, results.diagnostics);
      } catch (e) {
        renderCatchError(results, e);
      }
    }
    if (typeof opts.title === "string") {
      try {
        doc.title = opts.title;
      } catch (e) {
        renderCatchError(results, e);
      }
    }
    results.title = doc.title;
    if (opts.removeScripts) {
      removeScripts(doc.documentElement);
    }
    try {
      updateCanonicalLink(doc, opts.canonicalUrl);
    } catch (e) {
      renderCatchError(results, e);
    }
    try {
      relocateMetaCharset(doc);
    } catch (e) {
    }
    if (!hasError(results.diagnostics)) {
      results.httpStatus = 200;
    }
    try {
      const metaStatus = doc.head.querySelector('meta[http-equiv="status"]');
      if (metaStatus != null) {
        const metaStatusContent = metaStatus.getAttribute("content");
        if (metaStatusContent && metaStatusContent.length > 0) {
          results.httpStatus = parseInt(metaStatusContent, 10);
        }
      }
    } catch (e) {
    }
    if (opts.clientHydrateAnnotations) {
      doc.documentElement.classList.add("hydrated");
    }
    if (opts.serializeToHtml) {
      results.html = serializeDocumentToString(doc, opts);
    }
  } catch (e) {
    renderCatchError(results, e);
  }
  if (opts.destroyWindow) {
    try {
      if (!opts.destroyDocument) {
        win.document = null;
        doc.defaultView = null;
      }
      if (win.close) {
        win.close();
      }
    } catch (e) {
      renderCatchError(results, e);
    }
  }
  resolve(results);
}
function serializeDocumentToString(doc, opts) {
  return serializeNodeToHtml(doc, {
    approximateLineWidth: opts.approximateLineWidth,
    outerHtml: false,
    prettyHtml: opts.prettyHtml,
    removeAttributeQuotes: opts.removeAttributeQuotes,
    removeBooleanAttributeQuotes: opts.removeBooleanAttributeQuotes,
    removeEmptyAttributes: opts.removeEmptyAttributes,
    removeHtmlComments: opts.removeHtmlComments,
    serializeShadowRoot: false
  });
}
function isValidDocument(doc) {
  return doc != null && doc.nodeType === 9 && doc.documentElement != null && doc.documentElement.nodeType === 1 && doc.body != null && doc.body.nodeType === 1;
}
function removeScripts(elm) {
  const children = elm.children;
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    removeScripts(child);
    if (child.nodeName === "SCRIPT" || child.nodeName === "LINK" && child.getAttribute("rel") === "modulepreload") {
      child.remove();
    }
  }
}

exports.createWindowFromHtml = createWindowFromHtml;
exports.hydrateDocument = hydrateDocument;
exports.renderToString = renderToString;
exports.serializeDocumentToString = serializeDocumentToString;
