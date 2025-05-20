var _r = {};
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ue(e, t) {
  const n = new Set(e.split(","));
  return t ? (o) => n.has(o.toLowerCase()) : (o) => n.has(o);
}
const Z = _r.NODE_ENV !== "production" ? Object.freeze({}) : {}, vt = _r.NODE_ENV !== "production" ? Object.freeze([]) : [], se = () => {
}, yi = () => !1, Ut = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), pn = (e) => e.startsWith("onUpdate:"), oe = Object.assign, so = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, wi = Object.prototype.hasOwnProperty, K = (e, t) => wi.call(e, t), M = Array.isArray, yt = (e) => yn(e) === "[object Map]", Oi = (e) => yn(e) === "[object Set]", j = (e) => typeof e == "function", le = (e) => typeof e == "string", vn = (e) => typeof e == "symbol", te = (e) => e !== null && typeof e == "object", lo = (e) => (te(e) || j(e)) && j(e.then) && j(e.catch), xi = Object.prototype.toString, yn = (e) => xi.call(e), co = (e) => yn(e).slice(8, -1), Di = (e) => yn(e) === "[object Object]", uo = (e) => le(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, It = /* @__PURE__ */ Ue(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vi = /* @__PURE__ */ Ue(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), wn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ti = /-(\w)/g, Ot = wn((e) => e.replace(Ti, (t, n) => n ? n.toUpperCase() : "")), Ci = /\B([A-Z])/g, Be = wn(
  (e) => e.replace(Ci, "-$1").toLowerCase()
), On = wn((e) => e.charAt(0).toUpperCase() + e.slice(1)), st = wn((e) => e ? `on${On(e)}` : ""), Xe = (e, t) => !Object.is(e, t), Tt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, hn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Si = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Lo;
const ao = () => Lo || (Lo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function fo(e) {
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = le(o) ? Ii(o) : fo(o);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (le(e) || te(e))
    return e;
}
const Ri = /;(?![^(]*\))/g, $i = /:([^]+)/, Ai = /\/\*[^]*?\*\//g;
function Ii(e) {
  const t = {};
  return e.replace(Ai, "").split(Ri).forEach((n) => {
    if (n) {
      const o = n.split($i);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function po(e) {
  let t = "";
  if (le(e))
    t = e;
  else if (M(e))
    for (let n = 0; n < e.length; n++) {
      const o = po(e[n]);
      o && (t += o + " ");
    }
  else if (te(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Li = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Mi = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Pi = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Fi = /* @__PURE__ */ Ue(Li), ji = /* @__PURE__ */ Ue(Mi), Hi = /* @__PURE__ */ Ue(Pi), ki = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Bi = /* @__PURE__ */ Ue(ki);
function Er(e) {
  return !!e || e === "";
}
var ue = {};
function Ze(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let xe;
class Ui {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = xe, !t && xe && (this.index = (xe.scopes || (xe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = xe;
      try {
        return xe = this, t();
      } finally {
        xe = n;
      }
    } else
      ue.NODE_ENV !== "production" && Ze("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    xe = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    xe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Ki(e, t = xe) {
  t && t.active && t.effects.push(e);
}
function Wi() {
  return xe;
}
let lt;
class ho {
  constructor(t, n, o, r) {
    this.fn = t, this.trigger = n, this.scheduler = o, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Ki(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, tt();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (qi(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), nt();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = Ye, n = lt;
    try {
      return Ye = !0, lt = this, this._runnings++, Mo(this), this.fn();
    } finally {
      Po(this), this._runnings--, lt = n, Ye = t;
    }
  }
  stop() {
    var t;
    this.active && (Mo(this), Po(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function qi(e) {
  return e.value;
}
function Mo(e) {
  e._trackId++, e._depsLength = 0;
}
function Po(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Nr(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Nr(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let Ye = !0, Un = 0;
const br = [];
function tt() {
  br.push(Ye), Ye = !1;
}
function nt() {
  const e = br.pop();
  Ye = e === void 0 ? !0 : e;
}
function mo() {
  Un++;
}
function go() {
  for (Un--; !Un && Kn.length; )
    Kn.shift()();
}
function vr(e, t, n) {
  var o;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && Nr(r, e), e.deps[e._depsLength++] = t) : e._depsLength++, ue.NODE_ENV !== "production" && ((o = e.onTrack) == null || o.call(e, oe({ effect: e }, n)));
  }
}
const Kn = [];
function yr(e, t, n) {
  var o;
  mo();
  for (const r of e.keys()) {
    let i;
    r._dirtyLevel < t && (i ?? (i = e.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = t), r._shouldSchedule && (i ?? (i = e.get(r) === r._trackId)) && (ue.NODE_ENV !== "production" && ((o = r.onTrigger) == null || o.call(r, oe({ effect: r }, n))), r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && Kn.push(r.scheduler)));
  }
  go();
}
const wr = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Wn = /* @__PURE__ */ new WeakMap(), ct = Symbol(ue.NODE_ENV !== "production" ? "iterate" : ""), qn = Symbol(ue.NODE_ENV !== "production" ? "Map key iterate" : "");
function he(e, t, n) {
  if (Ye && lt) {
    let o = Wn.get(e);
    o || Wn.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || o.set(n, r = wr(() => o.delete(n))), vr(
      lt,
      r,
      ue.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function Me(e, t, n, o, r, i) {
  const l = Wn.get(e);
  if (!l)
    return;
  let c = [];
  if (t === "clear")
    c = [...l.values()];
  else if (n === "length" && M(e)) {
    const a = Number(o);
    l.forEach((d, m) => {
      (m === "length" || !vn(m) && m >= a) && c.push(d);
    });
  } else
    switch (n !== void 0 && c.push(l.get(n)), t) {
      case "add":
        M(e) ? uo(n) && c.push(l.get("length")) : (c.push(l.get(ct)), yt(e) && c.push(l.get(qn)));
        break;
      case "delete":
        M(e) || (c.push(l.get(ct)), yt(e) && c.push(l.get(qn)));
        break;
      case "set":
        yt(e) && c.push(l.get(ct));
        break;
    }
  mo();
  for (const a of c)
    a && yr(
      a,
      4,
      ue.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: o,
        oldValue: r,
        oldTarget: i
      } : void 0
    );
  go();
}
const Gi = /* @__PURE__ */ Ue("__proto__,__v_isRef,__isVue"), Or = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(vn)
), Fo = /* @__PURE__ */ zi();
function zi() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = B(this);
      for (let i = 0, l = this.length; i < l; i++)
        he(o, "get", i + "");
      const r = o[t](...n);
      return r === -1 || r === !1 ? o[t](...n.map(B)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      tt(), mo();
      const o = B(this)[t].apply(this, n);
      return go(), nt(), o;
    };
  }), e;
}
function Ji(e) {
  const t = B(this);
  return he(t, "has", e), t.hasOwnProperty(e);
}
class xr {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, o) {
    const r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return o === (r ? i ? $r : Rr : i ? Sr : Cr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const l = M(t);
    if (!r) {
      if (l && K(Fo, n))
        return Reflect.get(Fo, n, o);
      if (n === "hasOwnProperty")
        return Ji;
    }
    const c = Reflect.get(t, n, o);
    return (vn(n) ? Or.has(n) : Gi(n)) || (r || he(t, "get", n), i) ? c : me(c) ? l && uo(n) ? c : c.value : te(c) ? r ? Ar(c) : Eo(c) : c;
  }
}
class Dr extends xr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, r) {
    let i = t[n];
    if (!this._isShallow) {
      const a = Qe(i);
      if (!at(o) && !Qe(o) && (i = B(i), o = B(o)), !M(t) && me(i) && !me(o))
        return a ? !1 : (i.value = o, !0);
    }
    const l = M(t) && uo(n) ? Number(n) < t.length : K(t, n), c = Reflect.set(t, n, o, r);
    return t === B(r) && (l ? Xe(o, i) && Me(t, "set", n, o, i) : Me(t, "add", n, o)), c;
  }
  deleteProperty(t, n) {
    const o = K(t, n), r = t[n], i = Reflect.deleteProperty(t, n);
    return i && o && Me(t, "delete", n, void 0, r), i;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!vn(n) || !Or.has(n)) && he(t, "has", n), o;
  }
  ownKeys(t) {
    return he(
      t,
      "iterate",
      M(t) ? "length" : ct
    ), Reflect.ownKeys(t);
  }
}
class Vr extends xr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return ue.NODE_ENV !== "production" && Ze(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return ue.NODE_ENV !== "production" && Ze(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Yi = /* @__PURE__ */ new Dr(), Xi = /* @__PURE__ */ new Vr(), Zi = /* @__PURE__ */ new Dr(
  !0
), Qi = /* @__PURE__ */ new Vr(!0), _o = (e) => e, xn = (e) => Reflect.getPrototypeOf(e);
function Yt(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const r = B(e), i = B(t);
  n || (Xe(t, i) && he(r, "get", t), he(r, "get", i));
  const { has: l } = xn(r), c = o ? _o : n ? No : Ft;
  if (l.call(r, t))
    return c(e.get(t));
  if (l.call(r, i))
    return c(e.get(i));
  e !== r && e.get(t);
}
function Xt(e, t = !1) {
  const n = this.__v_raw, o = B(n), r = B(e);
  return t || (Xe(e, r) && he(o, "has", e), he(o, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Zt(e, t = !1) {
  return e = e.__v_raw, !t && he(B(e), "iterate", ct), Reflect.get(e, "size", e);
}
function jo(e) {
  e = B(e);
  const t = B(this);
  return xn(t).has.call(t, e) || (t.add(e), Me(t, "add", e, e)), this;
}
function Ho(e, t) {
  t = B(t);
  const n = B(this), { has: o, get: r } = xn(n);
  let i = o.call(n, e);
  i ? ue.NODE_ENV !== "production" && Tr(n, o, e) : (e = B(e), i = o.call(n, e));
  const l = r.call(n, e);
  return n.set(e, t), i ? Xe(t, l) && Me(n, "set", e, t, l) : Me(n, "add", e, t), this;
}
function ko(e) {
  const t = B(this), { has: n, get: o } = xn(t);
  let r = n.call(t, e);
  r ? ue.NODE_ENV !== "production" && Tr(t, n, e) : (e = B(e), r = n.call(t, e));
  const i = o ? o.call(t, e) : void 0, l = t.delete(e);
  return r && Me(t, "delete", e, void 0, i), l;
}
function Bo() {
  const e = B(this), t = e.size !== 0, n = ue.NODE_ENV !== "production" ? yt(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && Me(e, "clear", void 0, void 0, n), o;
}
function Qt(e, t) {
  return function(o, r) {
    const i = this, l = i.__v_raw, c = B(l), a = t ? _o : e ? No : Ft;
    return !e && he(c, "iterate", ct), l.forEach((d, m) => o.call(r, a(d), a(m), i));
  };
}
function en(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, i = B(r), l = yt(i), c = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, d = r[e](...o), m = n ? _o : t ? No : Ft;
    return !t && he(
      i,
      "iterate",
      a ? qn : ct
    ), {
      // iterator protocol
      next() {
        const { value: p, done: v } = d.next();
        return v ? { value: p, done: v } : {
          value: c ? [m(p[0]), m(p[1])] : m(p),
          done: v
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function We(e) {
  return function(...t) {
    if (ue.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      Ze(
        `${On(e)} operation ${n}failed: target is readonly.`,
        B(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function es() {
  const e = {
    get(i) {
      return Yt(this, i);
    },
    get size() {
      return Zt(this);
    },
    has: Xt,
    add: jo,
    set: Ho,
    delete: ko,
    clear: Bo,
    forEach: Qt(!1, !1)
  }, t = {
    get(i) {
      return Yt(this, i, !1, !0);
    },
    get size() {
      return Zt(this);
    },
    has: Xt,
    add: jo,
    set: Ho,
    delete: ko,
    clear: Bo,
    forEach: Qt(!1, !0)
  }, n = {
    get(i) {
      return Yt(this, i, !0);
    },
    get size() {
      return Zt(this, !0);
    },
    has(i) {
      return Xt.call(this, i, !0);
    },
    add: We("add"),
    set: We("set"),
    delete: We("delete"),
    clear: We("clear"),
    forEach: Qt(!0, !1)
  }, o = {
    get(i) {
      return Yt(this, i, !0, !0);
    },
    get size() {
      return Zt(this, !0);
    },
    has(i) {
      return Xt.call(this, i, !0);
    },
    add: We("add"),
    set: We("set"),
    delete: We("delete"),
    clear: We("clear"),
    forEach: Qt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = en(
      i,
      !1,
      !1
    ), n[i] = en(
      i,
      !0,
      !1
    ), t[i] = en(
      i,
      !1,
      !0
    ), o[i] = en(
      i,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    o
  ];
}
const [
  ts,
  ns,
  os,
  rs
] = /* @__PURE__ */ es();
function Dn(e, t) {
  const n = t ? e ? rs : os : e ? ns : ts;
  return (o, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(
    K(n, r) && r in o ? n : o,
    r,
    i
  );
}
const is = {
  get: /* @__PURE__ */ Dn(!1, !1)
}, ss = {
  get: /* @__PURE__ */ Dn(!1, !0)
}, ls = {
  get: /* @__PURE__ */ Dn(!0, !1)
}, cs = {
  get: /* @__PURE__ */ Dn(!0, !0)
};
function Tr(e, t, n) {
  const o = B(n);
  if (o !== n && t.call(e, o)) {
    const r = co(e);
    Ze(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Cr = /* @__PURE__ */ new WeakMap(), Sr = /* @__PURE__ */ new WeakMap(), Rr = /* @__PURE__ */ new WeakMap(), $r = /* @__PURE__ */ new WeakMap();
function us(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function as(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : us(co(e));
}
function Eo(e) {
  return Qe(e) ? e : Vn(
    e,
    !1,
    Yi,
    is,
    Cr
  );
}
function fs(e) {
  return Vn(
    e,
    !1,
    Zi,
    ss,
    Sr
  );
}
function Ar(e) {
  return Vn(
    e,
    !0,
    Xi,
    ls,
    Rr
  );
}
function Nt(e) {
  return Vn(
    e,
    !0,
    Qi,
    cs,
    $r
  );
}
function Vn(e, t, n, o, r) {
  if (!te(e))
    return ue.NODE_ENV !== "production" && Ze(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const l = as(e);
  if (l === 0)
    return e;
  const c = new Proxy(
    e,
    l === 2 ? o : n
  );
  return r.set(e, c), c;
}
function ut(e) {
  return Qe(e) ? ut(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Qe(e) {
  return !!(e && e.__v_isReadonly);
}
function at(e) {
  return !!(e && e.__v_isShallow);
}
function Gn(e) {
  return ut(e) || Qe(e);
}
function B(e) {
  const t = e && e.__v_raw;
  return t ? B(t) : e;
}
function Ir(e) {
  return Object.isExtensible(e) && hn(e, "__v_skip", !0), e;
}
const Ft = (e) => te(e) ? Eo(e) : e, No = (e) => te(e) ? Ar(e) : e, ds = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class Lr {
  constructor(t, n, o, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new ho(
      () => t(this._value),
      () => nn(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = o;
  }
  get value() {
    const t = B(this);
    return (!t._cacheable || t.effect.dirty) && Xe(t._value, t._value = t.effect.run()) && nn(t, 4), Mr(t), t.effect._dirtyLevel >= 2 && (ue.NODE_ENV !== "production" && this._warnRecursive && Ze(ds, `

getter: `, this.getter), nn(t, 2)), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function ps(e, t, n = !1) {
  let o, r;
  const i = j(e);
  i ? (o = e, r = ue.NODE_ENV !== "production" ? () => {
    Ze("Write operation failed: computed value is readonly");
  } : se) : (o = e.get, r = e.set);
  const l = new Lr(o, r, i || !r, n);
  return ue.NODE_ENV !== "production" && t && !n && (l.effect.onTrack = t.onTrack, l.effect.onTrigger = t.onTrigger), l;
}
function Mr(e) {
  var t;
  Ye && lt && (e = B(e), vr(
    lt,
    (t = e.dep) != null ? t : e.dep = wr(
      () => e.dep = void 0,
      e instanceof Lr ? e : void 0
    ),
    ue.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function nn(e, t = 4, n) {
  e = B(e);
  const o = e.dep;
  o && yr(
    o,
    t,
    ue.NODE_ENV !== "production" ? {
      target: e,
      type: "set",
      key: "value",
      newValue: n
    } : void 0
  );
}
function me(e) {
  return !!(e && e.__v_isRef === !0);
}
function Ct(e) {
  return hs(e, !1);
}
function hs(e, t) {
  return me(e) ? e : new ms(e, t);
}
class ms {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : B(t), this._value = n ? t : Ft(t);
  }
  get value() {
    return Mr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || at(t) || Qe(t);
    t = n ? t : B(t), Xe(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Ft(t), nn(this, 4, t));
  }
}
function gs(e) {
  return me(e) ? e.value : e;
}
const _s = {
  get: (e, t, n) => gs(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return me(r) && !me(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Pr(e) {
  return ut(e) ? e : new Proxy(e, _s);
}
var f = {};
const ft = [];
function on(e) {
  ft.push(e);
}
function rn() {
  ft.pop();
}
function x(e, ...t) {
  tt();
  const n = ft.length ? ft[ft.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = Es();
  if (o)
    ke(
      o,
      n,
      11,
      [
        e + t.map((i) => {
          var l, c;
          return (c = (l = i.toString) == null ? void 0 : l.call(i)) != null ? c : JSON.stringify(i);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: i }) => `at <${An(n, i.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const i = [`[Vue warn]: ${e}`, ...t];
    r.length && i.push(`
`, ...Ns(r)), console.warn(...i);
  }
  nt();
}
function Es() {
  let e = ft[ft.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function Ns(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...bs(n));
  }), t;
}
function bs({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${An(
    e.component,
    e.type,
    o
  )}`, i = ">" + n;
  return e.props ? [r, ...vs(e.props), i] : [r + i];
}
function vs(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...Fr(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Fr(e, t, n) {
  return le(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : me(t) ? (t = Fr(e, B(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : j(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = B(t), n ? t : [`${e}=`, t]);
}
const bo = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function ke(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (r) {
    Kt(r, t, n);
  }
}
function Ce(e, t, n, o) {
  if (j(e)) {
    const i = ke(e, t, n, o);
    return i && lo(i) && i.catch((l) => {
      Kt(l, t, n);
    }), i;
  }
  const r = [];
  for (let i = 0; i < e.length; i++)
    r.push(Ce(e[i], t, n, o));
  return r;
}
function Kt(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const l = t.proxy, c = f.NODE_ENV !== "production" ? bo[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; i; ) {
      const d = i.ec;
      if (d) {
        for (let m = 0; m < d.length; m++)
          if (d[m](e, l, c) === !1)
            return;
      }
      i = i.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      ke(
        a,
        null,
        10,
        [e, l, c]
      );
      return;
    }
  }
  ys(e, n, r, o);
}
function ys(e, t, n, o = !0) {
  if (f.NODE_ENV !== "production") {
    const r = bo[t];
    if (n && on(n), x(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && rn(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let jt = !1, zn = !1;
const ge = [];
let Ie = 0;
const wt = [];
let He = null, qe = 0;
const jr = /* @__PURE__ */ Promise.resolve();
let vo = null;
const ws = 100;
function Os(e) {
  const t = vo || jr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function xs(e) {
  let t = Ie + 1, n = ge.length;
  for (; t < n; ) {
    const o = t + n >>> 1, r = ge[o], i = Ht(r);
    i < e || i === e && r.pre ? t = o + 1 : n = o;
  }
  return t;
}
function Tn(e) {
  (!ge.length || !ge.includes(
    e,
    jt && e.allowRecurse ? Ie + 1 : Ie
  )) && (e.id == null ? ge.push(e) : ge.splice(xs(e.id), 0, e), Hr());
}
function Hr() {
  !jt && !zn && (zn = !0, vo = jr.then(Ur));
}
function Ds(e) {
  const t = ge.indexOf(e);
  t > Ie && ge.splice(t, 1);
}
function kr(e) {
  M(e) ? wt.push(...e) : (!He || !He.includes(
    e,
    e.allowRecurse ? qe + 1 : qe
  )) && wt.push(e), Hr();
}
function Uo(e, t, n = jt ? Ie + 1 : 0) {
  for (f.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < ge.length; n++) {
    const o = ge[n];
    if (o && o.pre) {
      if (e && o.id !== e.uid || f.NODE_ENV !== "production" && yo(t, o))
        continue;
      ge.splice(n, 1), n--, o();
    }
  }
}
function Br(e) {
  if (wt.length) {
    const t = [...new Set(wt)].sort(
      (n, o) => Ht(n) - Ht(o)
    );
    if (wt.length = 0, He) {
      He.push(...t);
      return;
    }
    for (He = t, f.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), qe = 0; qe < He.length; qe++)
      f.NODE_ENV !== "production" && yo(e, He[qe]) || He[qe]();
    He = null, qe = 0;
  }
}
const Ht = (e) => e.id == null ? 1 / 0 : e.id, Vs = (e, t) => {
  const n = Ht(e) - Ht(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Ur(e) {
  zn = !1, jt = !0, f.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ge.sort(Vs);
  const t = f.NODE_ENV !== "production" ? (n) => yo(e, n) : se;
  try {
    for (Ie = 0; Ie < ge.length; Ie++) {
      const n = ge[Ie];
      if (n && n.active !== !1) {
        if (f.NODE_ENV !== "production" && t(n))
          continue;
        ke(n, null, 14);
      }
    }
  } finally {
    Ie = 0, ge.length = 0, Br(e), jt = !1, vo = null, (ge.length || wt.length) && Ur(e);
  }
}
function yo(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > ws) {
      const o = t.ownerInstance, r = o && Ei(o.type);
      return Kt(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
let dt = !1;
const Et = /* @__PURE__ */ new Set();
f.NODE_ENV !== "production" && (ao().__VUE_HMR_RUNTIME__ = {
  createRecord: Pn(Kr),
  rerender: Pn(Ss),
  reload: Pn(Rs)
});
const mt = /* @__PURE__ */ new Map();
function Ts(e) {
  const t = e.type.__hmrId;
  let n = mt.get(t);
  n || (Kr(t, e.type), n = mt.get(t)), n.instances.add(e);
}
function Cs(e) {
  mt.get(e.type.__hmrId).instances.delete(e);
}
function Kr(e, t) {
  return mt.has(e) ? !1 : (mt.set(e, {
    initialDef: Lt(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Lt(e) {
  return Ni(e) ? e.__vccOpts : e;
}
function Ss(e, t) {
  const n = mt.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Lt(o.type).render = t), o.renderCache = [], dt = !0, o.effect.dirty = !0, o.update(), dt = !1;
  }));
}
function Rs(e, t) {
  const n = mt.get(e);
  if (!n)
    return;
  t = Lt(t), Ko(n.initialDef, t);
  const o = [...n.instances];
  for (const r of o) {
    const i = Lt(r.type);
    Et.has(i) || (i !== n.initialDef && Ko(i, t), Et.add(i)), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (Et.add(i), r.ceReload(t.styles), Et.delete(i)) : r.parent ? (r.parent.effect.dirty = !0, Tn(r.parent.update)) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  kr(() => {
    for (const r of o)
      Et.delete(
        Lt(r.type)
      );
  });
}
function Ko(e, t) {
  oe(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Pn(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let Le, $t = [], Jn = !1;
function Wt(e, ...t) {
  Le ? Le.emit(e, ...t) : Jn || $t.push({ event: e, args: t });
}
function Wr(e, t) {
  var n, o;
  Le = e, Le ? (Le.enabled = !0, $t.forEach(({ event: r, args: i }) => Le.emit(r, ...i)), $t = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((i) => {
    Wr(i, t);
  }), setTimeout(() => {
    Le || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Jn = !0, $t = []);
  }, 3e3)) : (Jn = !0, $t = []);
}
function $s(e, t) {
  Wt("app:init", e, t, {
    Fragment: Ae,
    Text: qt,
    Comment: Se,
    Static: an
  });
}
function As(e) {
  Wt("app:unmount", e);
}
const Is = /* @__PURE__ */ wo(
  "component:added"
  /* COMPONENT_ADDED */
), qr = /* @__PURE__ */ wo(
  "component:updated"
  /* COMPONENT_UPDATED */
), Ls = /* @__PURE__ */ wo(
  "component:removed"
  /* COMPONENT_REMOVED */
), Ms = (e) => {
  Le && typeof Le.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !Le.cleanupBuffer(e) && Ls(e);
};
function wo(e) {
  return (t) => {
    Wt(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const Ps = /* @__PURE__ */ Gr(
  "perf:start"
  /* PERFORMANCE_START */
), Fs = /* @__PURE__ */ Gr(
  "perf:end"
  /* PERFORMANCE_END */
);
function Gr(e) {
  return (t, n, o) => {
    Wt(e, t.appContext.app, t.uid, t, n, o);
  };
}
function js(e, t, n) {
  Wt(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
function Hs(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const o = e.vnode.props || Z;
  if (f.NODE_ENV !== "production") {
    const {
      emitsOptions: m,
      propsOptions: [p]
    } = e;
    if (m)
      if (!(t in m))
        (!p || !(st(t) in p)) && x(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${st(t)}" prop.`
        );
      else {
        const v = m[t];
        j(v) && (v(...n) || x(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let r = n;
  const i = t.startsWith("update:"), l = i && t.slice(7);
  if (l && l in o) {
    const m = `${l === "modelValue" ? "model" : l}Modifiers`, { number: p, trim: v } = o[m] || Z;
    v && (r = n.map((R) => le(R) ? R.trim() : R)), p && (r = n.map(Si));
  }
  if (f.NODE_ENV !== "production" && js(e, t, r), f.NODE_ENV !== "production") {
    const m = t.toLowerCase();
    m !== t && o[st(m)] && x(
      `Event "${m}" is emitted in component ${An(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Be(
        t
      )}" instead of "${t}".`
    );
  }
  let c, a = o[c = st(t)] || // also try camelCase event handler (#2249)
  o[c = st(Ot(t))];
  !a && i && (a = o[c = st(Be(t))]), a && Ce(
    a,
    e,
    6,
    r
  );
  const d = o[c + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, Ce(
      d,
      e,
      6,
      r
    );
  }
}
function zr(e, t, n = !1) {
  const o = t.emitsCache, r = o.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let l = {}, c = !1;
  if (!j(e)) {
    const a = (d) => {
      const m = zr(d, t, !0);
      m && (c = !0, oe(l, m));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !c ? (te(e) && o.set(e, null), null) : (M(i) ? i.forEach((a) => l[a] = null) : oe(l, i), te(e) && o.set(e, l), l);
}
function Cn(e, t) {
  return !e || !Ut(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), K(e, t[0].toLowerCase() + t.slice(1)) || K(e, Be(t)) || K(e, t));
}
let ye = null, Jr = null;
function mn(e) {
  const t = ye;
  return ye = e, Jr = e && e.type.__scopeId || null, t;
}
function ks(e, t = ye, n) {
  if (!t || e._n)
    return e;
  const o = (...r) => {
    o._d && nr(-1);
    const i = mn(t);
    let l;
    try {
      l = e(...r);
    } finally {
      mn(i), o._d && nr(1);
    }
    return f.NODE_ENV !== "production" && qr(t), l;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
let Yn = !1;
function gn() {
  Yn = !0;
}
function Fn(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: i,
    propsOptions: [l],
    slots: c,
    attrs: a,
    emit: d,
    render: m,
    renderCache: p,
    data: v,
    setupState: R,
    ctx: H,
    inheritAttrs: U
  } = e;
  let ce, re;
  const _e = mn(e);
  f.NODE_ENV !== "production" && (Yn = !1);
  try {
    if (n.shapeFlag & 4) {
      const S = r || o, $ = f.NODE_ENV !== "production" && R.__isScriptSetup ? new Proxy(S, {
        get(E, T, P) {
          return x(
            `Property '${String(
              T
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(E, T, P);
        }
      }) : S;
      ce = De(
        m.call(
          $,
          S,
          p,
          i,
          R,
          v,
          H
        )
      ), re = a;
    } else {
      const S = t;
      f.NODE_ENV !== "production" && a === i && gn(), ce = De(
        S.length > 1 ? S(
          i,
          f.NODE_ENV !== "production" ? {
            get attrs() {
              return gn(), a;
            },
            slots: c,
            emit: d
          } : { attrs: a, slots: c, emit: d }
        ) : S(
          i,
          null
          /* we know it doesn't need it */
        )
      ), re = t.props ? a : Bs(a);
    }
  } catch (S) {
    Pt.length = 0, Kt(S, e, 1), ce = Te(Se);
  }
  let Q = ce, b;
  if (f.NODE_ENV !== "production" && ce.patchFlag > 0 && ce.patchFlag & 2048 && ([Q, b] = Yr(ce)), re && U !== !1) {
    const S = Object.keys(re), { shapeFlag: $ } = Q;
    if (S.length) {
      if ($ & 7)
        l && S.some(pn) && (re = Us(
          re,
          l
        )), Q = et(Q, re);
      else if (f.NODE_ENV !== "production" && !Yn && Q.type !== Se) {
        const E = Object.keys(a), T = [], P = [];
        for (let k = 0, W = E.length; k < W; k++) {
          const z = E[k];
          Ut(z) ? pn(z) || T.push(z[2].toLowerCase() + z.slice(3)) : P.push(z);
        }
        P.length && x(
          `Extraneous non-props attributes (${P.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
        ), T.length && x(
          `Extraneous non-emits event listeners (${T.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (f.NODE_ENV !== "production" && !Wo(Q) && x(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), Q = et(Q), Q.dirs = Q.dirs ? Q.dirs.concat(n.dirs) : n.dirs), n.transition && (f.NODE_ENV !== "production" && !Wo(Q) && x(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Q.transition = n.transition), f.NODE_ENV !== "production" && b ? b(Q) : ce = Q, mn(_e), ce;
}
const Yr = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Oo(t, !1);
  if (o) {
    if (f.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return Yr(o);
  } else
    return [e, void 0];
  const r = t.indexOf(o), i = n ? n.indexOf(o) : -1, l = (c) => {
    t[r] = c, n && (i > -1 ? n[i] = c : c.patchFlag > 0 && (e.dynamicChildren = [...n, c]));
  };
  return [De(o), l];
};
function Oo(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    if (Bt(r)) {
      if (r.type !== Se || r.children === "v-if") {
        if (n)
          return;
        if (n = r, f.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Oo(n.children);
      }
    } else
      return;
  }
  return n;
}
const Bs = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Ut(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Us = (e, t) => {
  const n = {};
  for (const o in e)
    (!pn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, Wo = (e) => e.shapeFlag & 7 || e.type === Se;
function Ks(e, t, n) {
  const { props: o, children: r, component: i } = e, { props: l, children: c, patchFlag: a } = t, d = i.emitsOptions;
  if (f.NODE_ENV !== "production" && (r || c) && dt || t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return o ? qo(o, l, d) : !!l;
    if (a & 8) {
      const m = t.dynamicProps;
      for (let p = 0; p < m.length; p++) {
        const v = m[p];
        if (l[v] !== o[v] && !Cn(d, v))
          return !0;
      }
    }
  } else
    return (r || c) && (!c || !c.$stable) ? !0 : o === l ? !1 : o ? l ? qo(o, l, d) : !0 : !!l;
  return !1;
}
function qo(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < o.length; r++) {
    const i = o[r];
    if (t[i] !== e[i] && !Cn(n, i))
      return !0;
  }
  return !1;
}
function Ws({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const qs = Symbol.for("v-ndc"), Gs = (e) => e.__isSuspense;
function zs(e, t) {
  t && t.pendingBranch ? M(e) ? t.effects.push(...e) : t.effects.push(e) : kr(e);
}
const Js = Symbol.for("v-scx"), Ys = () => {
  {
    const e = cn(Js);
    return e || f.NODE_ENV !== "production" && x(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
}, tn = {};
function sn(e, t, n) {
  return f.NODE_ENV !== "production" && !j(t) && x(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Xr(e, t, n);
}
function Xr(e, t, {
  immediate: n,
  deep: o,
  flush: r,
  once: i,
  onTrack: l,
  onTrigger: c
} = Z) {
  if (t && i) {
    const E = t;
    t = (...T) => {
      E(...T), $();
    };
  }
  f.NODE_ENV !== "production" && o !== void 0 && typeof o == "number" && x(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), f.NODE_ENV !== "production" && !t && (n !== void 0 && x(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && x(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && x(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (E) => {
    x(
      "Invalid watch source: ",
      E,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = fe, m = (E) => o === !0 ? E : (
    // for deep: false, only traverse root-level properties
    bt(E, o === !1 ? 1 : void 0)
  );
  let p, v = !1, R = !1;
  if (me(e) ? (p = () => e.value, v = at(e)) : ut(e) ? (p = () => m(e), v = !0) : M(e) ? (R = !0, v = e.some((E) => ut(E) || at(E)), p = () => e.map((E) => {
    if (me(E))
      return E.value;
    if (ut(E))
      return m(E);
    if (j(E))
      return ke(E, d, 2);
    f.NODE_ENV !== "production" && a(E);
  })) : j(e) ? t ? p = () => ke(e, d, 2) : p = () => (H && H(), Ce(
    e,
    d,
    3,
    [U]
  )) : (p = se, f.NODE_ENV !== "production" && a(e)), t && o) {
    const E = p;
    p = () => bt(E());
  }
  let H, U = (E) => {
    H = b.onStop = () => {
      ke(E, d, 4), H = b.onStop = void 0;
    };
  }, ce;
  if ($n)
    if (U = se, t ? n && Ce(t, d, 3, [
      p(),
      R ? [] : void 0,
      U
    ]) : p(), r === "sync") {
      const E = Ys();
      ce = E.__watcherHandles || (E.__watcherHandles = []);
    } else
      return se;
  let re = R ? new Array(e.length).fill(tn) : tn;
  const _e = () => {
    if (!(!b.active || !b.dirty))
      if (t) {
        const E = b.run();
        (o || v || (R ? E.some((T, P) => Xe(T, re[P])) : Xe(E, re))) && (H && H(), Ce(t, d, 3, [
          E,
          // pass undefined as the old value when it's changed for the first time
          re === tn ? void 0 : R && re[0] === tn ? [] : re,
          U
        ]), re = E);
      } else
        b.run();
  };
  _e.allowRecurse = !!t;
  let Q;
  r === "sync" ? Q = _e : r === "post" ? Q = () => ve(_e, d && d.suspense) : (_e.pre = !0, d && (_e.id = d.uid), Q = () => Tn(_e));
  const b = new ho(p, se, Q), S = Wi(), $ = () => {
    b.stop(), S && so(S.effects, b);
  };
  return f.NODE_ENV !== "production" && (b.onTrack = l, b.onTrigger = c), t ? n ? _e() : re = b.run() : r === "post" ? ve(
    b.run.bind(b),
    d && d.suspense
  ) : b.run(), ce && ce.push($), $;
}
function Xs(e, t, n) {
  const o = this.proxy, r = le(e) ? e.includes(".") ? Zr(o, e) : () => o[e] : e.bind(o, o);
  let i;
  j(t) ? i = t : (i = t.handler, n = t);
  const l = Gt(this), c = Xr(r, i.bind(o), n);
  return l(), c;
}
function Zr(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
function bt(e, t, n = 0, o) {
  if (!te(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (o = o || /* @__PURE__ */ new Set(), o.has(e))
    return e;
  if (o.add(e), me(e))
    bt(e.value, t, n, o);
  else if (M(e))
    for (let r = 0; r < e.length; r++)
      bt(e[r], t, n, o);
  else if (Oi(e) || yt(e))
    e.forEach((r) => {
      bt(r, t, n, o);
    });
  else if (Di(e))
    for (const r in e)
      bt(e[r], t, n, o);
  return e;
}
function Qr(e) {
  Vi(e) && x("Do not use built-in directive ids as custom directive id: " + e);
}
function rt(e, t, n, o) {
  const r = e.dirs, i = t && t.dirs;
  for (let l = 0; l < r.length; l++) {
    const c = r[l];
    i && (c.oldValue = i[l].value);
    let a = c.dir[o];
    a && (tt(), Ce(a, n, 8, [
      e.el,
      c,
      e,
      t
    ]), nt());
  }
}
const ln = (e) => !!e.type.__asyncLoader, xo = (e) => e.type.__isKeepAlive;
function Zs(e, t) {
  ei(e, "a", t);
}
function Qs(e, t) {
  ei(e, "da", t);
}
function ei(e, t, n = fe) {
  const o = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Sn(t, o, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      xo(r.parent.vnode) && el(o, t, n, r), r = r.parent;
  }
}
function el(e, t, n, o) {
  const r = Sn(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  _n(() => {
    so(o[t], r);
  }, n);
}
function Sn(e, t, n = fe, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...l) => {
      if (n.isUnmounted)
        return;
      tt();
      const c = Gt(n), a = Ce(t, n, e, l);
      return c(), nt(), a;
    });
    return o ? r.unshift(i) : r.push(i), i;
  } else if (f.NODE_ENV !== "production") {
    const r = st(bo[e].replace(/ hook$/, ""));
    x(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Ke = (e) => (t, n = fe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!$n || e === "sp") && Sn(e, (...o) => t(...o), n)
), tl = Ke("bm"), ti = Ke("m"), nl = Ke("bu"), ol = Ke("u"), rl = Ke("bum"), _n = Ke("um"), il = Ke("sp"), sl = Ke(
  "rtg"
), ll = Ke(
  "rtc"
);
function cl(e, t = fe) {
  Sn("ec", e, t);
}
const Xn = (e) => e ? gi(e) ? So(e) || e.proxy : Xn(e.parent) : null, pt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ oe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => f.NODE_ENV !== "production" ? Nt(e.props) : e.props,
    $attrs: (e) => f.NODE_ENV !== "production" ? Nt(e.attrs) : e.attrs,
    $slots: (e) => f.NODE_ENV !== "production" ? Nt(e.slots) : e.slots,
    $refs: (e) => f.NODE_ENV !== "production" ? Nt(e.refs) : e.refs,
    $parent: (e) => Xn(e.parent),
    $root: (e) => Xn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Vo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, Tn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Os.bind(e.proxy)),
    $watch: (e) => Xs.bind(e)
  })
), Do = (e) => e === "_" || e === "$", jn = (e, t) => e !== Z && !e.__isScriptSetup && K(e, t), ni = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: r, props: i, accessCache: l, type: c, appContext: a } = e;
    if (f.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let d;
    if (t[0] !== "$") {
      const R = l[t];
      if (R !== void 0)
        switch (R) {
          case 1:
            return o[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (jn(o, t))
          return l[t] = 1, o[t];
        if (r !== Z && K(r, t))
          return l[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && K(d, t)
        )
          return l[t] = 3, i[t];
        if (n !== Z && K(n, t))
          return l[t] = 4, n[t];
        Zn && (l[t] = 0);
      }
    }
    const m = pt[t];
    let p, v;
    if (m)
      return t === "$attrs" ? (he(e, "get", t), f.NODE_ENV !== "production" && gn()) : f.NODE_ENV !== "production" && t === "$slots" && he(e, "get", t), m(e);
    if (
      // css module (injected by vue-loader)
      (p = c.__cssModules) && (p = p[t])
    )
      return p;
    if (n !== Z && K(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      v = a.config.globalProperties, K(v, t)
    )
      return v[t];
    f.NODE_ENV !== "production" && ye && (!le(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== Z && Do(t[0]) && K(r, t) ? x(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === ye && x(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: i } = e;
    return jn(r, t) ? (r[t] = n, !0) : f.NODE_ENV !== "production" && r.__isScriptSetup && K(r, t) ? (x(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== Z && K(o, t) ? (o[t] = n, !0) : K(e.props, t) ? (f.NODE_ENV !== "production" && x(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (f.NODE_ENV !== "production" && x(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (f.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(i, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: i }
  }, l) {
    let c;
    return !!n[l] || e !== Z && K(e, l) || jn(t, l) || (c = i[0]) && K(c, l) || K(o, l) || K(pt, l) || K(r.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : K(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
f.NODE_ENV !== "production" && (ni.ownKeys = (e) => (x(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function ul(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(pt).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => pt[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: se
    });
  }), t;
}
function al(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: se
    });
  });
}
function fl(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(B(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (Do(o[0])) {
        x(
          `setup() return property ${JSON.stringify(
            o
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, o, {
        enumerable: !0,
        configurable: !0,
        get: () => n[o],
        set: se
      });
    }
  });
}
function Go(e) {
  return M(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function dl() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? x(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let Zn = !0;
function pl(e) {
  const t = Vo(e), n = e.proxy, o = e.ctx;
  Zn = !1, t.beforeCreate && zo(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: l,
    watch: c,
    provide: a,
    inject: d,
    // lifecycle
    created: m,
    beforeMount: p,
    mounted: v,
    beforeUpdate: R,
    updated: H,
    activated: U,
    deactivated: ce,
    beforeDestroy: re,
    beforeUnmount: _e,
    destroyed: Q,
    unmounted: b,
    render: S,
    renderTracked: $,
    renderTriggered: E,
    errorCaptured: T,
    serverPrefetch: P,
    // public API
    expose: k,
    inheritAttrs: W,
    // assets
    components: z,
    directives: de,
    filters: X
  } = t, G = f.NODE_ENV !== "production" ? dl() : null;
  if (f.NODE_ENV !== "production") {
    const [C] = e.propsOptions;
    if (C)
      for (const L in C)
        G("Props", L);
  }
  if (d && hl(d, o, G), l)
    for (const C in l) {
      const L = l[C];
      j(L) ? (f.NODE_ENV !== "production" ? Object.defineProperty(o, C, {
        value: L.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[C] = L.bind(n), f.NODE_ENV !== "production" && G("Methods", C)) : f.NODE_ENV !== "production" && x(
        `Method "${C}" has type "${typeof L}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (r) {
    f.NODE_ENV !== "production" && !j(r) && x(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const C = r.call(n, n);
    if (f.NODE_ENV !== "production" && lo(C) && x(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !te(C))
      f.NODE_ENV !== "production" && x("data() should return an object.");
    else if (e.data = Eo(C), f.NODE_ENV !== "production")
      for (const L in C)
        G("Data", L), Do(L[0]) || Object.defineProperty(o, L, {
          configurable: !0,
          enumerable: !0,
          get: () => C[L],
          set: se
        });
  }
  if (Zn = !0, i)
    for (const C in i) {
      const L = i[C], ee = j(L) ? L.bind(n, n) : j(L.get) ? L.get.bind(n, n) : se;
      f.NODE_ENV !== "production" && ee === se && x(`Computed property "${C}" has no getter.`);
      const pe = !j(L) && j(L.set) ? L.set.bind(n) : f.NODE_ENV !== "production" ? () => {
        x(
          `Write operation failed: computed property "${C}" is readonly.`
        );
      } : se, ie = rc({
        get: ee,
        set: pe
      });
      Object.defineProperty(o, C, {
        enumerable: !0,
        configurable: !0,
        get: () => ie.value,
        set: (we) => ie.value = we
      }), f.NODE_ENV !== "production" && G("Computed", C);
    }
  if (c)
    for (const C in c)
      oi(c[C], o, n, C);
  if (a) {
    const C = j(a) ? a.call(n) : a;
    Reflect.ownKeys(C).forEach((L) => {
      bl(L, C[L]);
    });
  }
  m && zo(m, e, "c");
  function Y(C, L) {
    M(L) ? L.forEach((ee) => C(ee.bind(n))) : L && C(L.bind(n));
  }
  if (Y(tl, p), Y(ti, v), Y(nl, R), Y(ol, H), Y(Zs, U), Y(Qs, ce), Y(cl, T), Y(ll, $), Y(sl, E), Y(rl, _e), Y(_n, b), Y(il, P), M(k))
    if (k.length) {
      const C = e.exposed || (e.exposed = {});
      k.forEach((L) => {
        Object.defineProperty(C, L, {
          get: () => n[L],
          set: (ee) => n[L] = ee
        });
      });
    } else
      e.exposed || (e.exposed = {});
  S && e.render === se && (e.render = S), W != null && (e.inheritAttrs = W), z && (e.components = z), de && (e.directives = de);
}
function hl(e, t, n = se) {
  M(e) && (e = Qn(e));
  for (const o in e) {
    const r = e[o];
    let i;
    te(r) ? "default" in r ? i = cn(
      r.from || o,
      r.default,
      !0
    ) : i = cn(r.from || o) : i = cn(r), me(i) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[o] = i, f.NODE_ENV !== "production" && n("Inject", o);
  }
}
function zo(e, t, n) {
  Ce(
    M(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function oi(e, t, n, o) {
  const r = o.includes(".") ? Zr(n, o) : () => n[o];
  if (le(e)) {
    const i = t[e];
    j(i) ? sn(r, i) : f.NODE_ENV !== "production" && x(`Invalid watch handler specified by key "${e}"`, i);
  } else if (j(e))
    sn(r, e.bind(n));
  else if (te(e))
    if (M(e))
      e.forEach((i) => oi(i, t, n, o));
    else {
      const i = j(e.handler) ? e.handler.bind(n) : t[e.handler];
      j(i) ? sn(r, i, e) : f.NODE_ENV !== "production" && x(`Invalid watch handler specified by key "${e.handler}"`, i);
    }
  else
    f.NODE_ENV !== "production" && x(`Invalid watch option: "${o}"`, e);
}
function Vo(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: l }
  } = e.appContext, c = i.get(t);
  let a;
  return c ? a = c : !r.length && !n && !o ? a = t : (a = {}, r.length && r.forEach(
    (d) => En(a, d, l, !0)
  ), En(a, t, l)), te(t) && i.set(t, a), a;
}
function En(e, t, n, o = !1) {
  const { mixins: r, extends: i } = t;
  i && En(e, i, n, !0), r && r.forEach(
    (l) => En(e, l, n, !0)
  );
  for (const l in t)
    if (o && l === "expose")
      f.NODE_ENV !== "production" && x(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = ml[l] || n && n[l];
      e[l] = c ? c(e[l], t[l]) : t[l];
    }
  return e;
}
const ml = {
  data: Jo,
  props: Yo,
  emits: Yo,
  // objects
  methods: At,
  computed: At,
  // lifecycle
  beforeCreate: be,
  created: be,
  beforeMount: be,
  mounted: be,
  beforeUpdate: be,
  updated: be,
  beforeDestroy: be,
  beforeUnmount: be,
  destroyed: be,
  unmounted: be,
  activated: be,
  deactivated: be,
  errorCaptured: be,
  serverPrefetch: be,
  // assets
  components: At,
  directives: At,
  // watch
  watch: _l,
  // provide / inject
  provide: Jo,
  inject: gl
};
function Jo(e, t) {
  return t ? e ? function() {
    return oe(
      j(e) ? e.call(this, this) : e,
      j(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function gl(e, t) {
  return At(Qn(e), Qn(t));
}
function Qn(e) {
  if (M(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function be(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function At(e, t) {
  return e ? oe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Yo(e, t) {
  return e ? M(e) && M(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : oe(
    /* @__PURE__ */ Object.create(null),
    Go(e),
    Go(t ?? {})
  ) : t;
}
function _l(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = oe(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = be(e[o], t[o]);
  return n;
}
function ri() {
  return {
    app: null,
    config: {
      isNativeTag: yi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let El = 0;
function Nl(e, t) {
  return function(o, r = null) {
    j(o) || (o = oe({}, o)), r != null && !te(r) && (f.NODE_ENV !== "production" && x("root props passed to app.mount() must be an object."), r = null);
    const i = ri(), l = /* @__PURE__ */ new WeakSet();
    let c = !1;
    const a = i.app = {
      _uid: El++,
      _component: o,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: sr,
      get config() {
        return i.config;
      },
      set config(d) {
        f.NODE_ENV !== "production" && x(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(d, ...m) {
        return l.has(d) ? f.NODE_ENV !== "production" && x("Plugin has already been applied to target app.") : d && j(d.install) ? (l.add(d), d.install(a, ...m)) : j(d) ? (l.add(d), d(a, ...m)) : f.NODE_ENV !== "production" && x(
          'A plugin must either be a function or an object with an "install" function.'
        ), a;
      },
      mixin(d) {
        return i.mixins.includes(d) ? f.NODE_ENV !== "production" && x(
          "Mixin has already been applied to target app" + (d.name ? `: ${d.name}` : "")
        ) : i.mixins.push(d), a;
      },
      component(d, m) {
        return f.NODE_ENV !== "production" && ro(d, i.config), m ? (f.NODE_ENV !== "production" && i.components[d] && x(`Component "${d}" has already been registered in target app.`), i.components[d] = m, a) : i.components[d];
      },
      directive(d, m) {
        return f.NODE_ENV !== "production" && Qr(d), m ? (f.NODE_ENV !== "production" && i.directives[d] && x(`Directive "${d}" has already been registered in target app.`), i.directives[d] = m, a) : i.directives[d];
      },
      mount(d, m, p) {
        if (c)
          f.NODE_ENV !== "production" && x(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          f.NODE_ENV !== "production" && d.__vue_app__ && x(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const v = Te(o, r);
          return v.appContext = i, p === !0 ? p = "svg" : p === !1 && (p = void 0), f.NODE_ENV !== "production" && (i.reload = () => {
            e(
              et(v),
              d,
              p
            );
          }), m && t ? t(v, d) : e(v, d, p), c = !0, a._container = d, d.__vue_app__ = a, f.NODE_ENV !== "production" && (a._instance = v.component, $s(a, sr)), So(v.component) || v.component.proxy;
        }
      },
      unmount() {
        c ? (e(null, a._container), f.NODE_ENV !== "production" && (a._instance = null, As(a)), delete a._container.__vue_app__) : f.NODE_ENV !== "production" && x("Cannot unmount an app that is not mounted.");
      },
      provide(d, m) {
        return f.NODE_ENV !== "production" && d in i.provides && x(
          `App already provides property with key "${String(d)}". It will be overwritten with the new value.`
        ), i.provides[d] = m, a;
      },
      runWithContext(d) {
        const m = Mt;
        Mt = a;
        try {
          return d();
        } finally {
          Mt = m;
        }
      }
    };
    return a;
  };
}
let Mt = null;
function bl(e, t) {
  if (!fe)
    f.NODE_ENV !== "production" && x("provide() can only be used inside setup().");
  else {
    let n = fe.provides;
    const o = fe.parent && fe.parent.provides;
    o === n && (n = fe.provides = Object.create(o)), n[e] = t;
  }
}
function cn(e, t, n = !1) {
  const o = fe || ye;
  if (o || Mt) {
    const r = o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : Mt._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && j(t) ? t.call(o && o.proxy) : t;
    f.NODE_ENV !== "production" && x(`injection "${String(e)}" not found.`);
  } else
    f.NODE_ENV !== "production" && x("inject() can only be used inside setup() or functional components.");
}
function vl(e, t, n, o = !1) {
  const r = {}, i = {};
  hn(i, Rn, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), ii(e, t, r, i);
  for (const l in e.propsOptions[0])
    l in r || (r[l] = void 0);
  f.NODE_ENV !== "production" && li(t || {}, r, e), n ? e.props = o ? r : fs(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function yl(e) {
  for (; e; ) {
    if (e.type.__hmrId)
      return !0;
    e = e.parent;
  }
}
function wl(e, t, n, o) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: l }
  } = e, c = B(r), [a] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(f.NODE_ENV !== "production" && yl(e)) && (o || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const m = e.vnode.dynamicProps;
      for (let p = 0; p < m.length; p++) {
        let v = m[p];
        if (Cn(e.emitsOptions, v))
          continue;
        const R = t[v];
        if (a)
          if (K(i, v))
            R !== i[v] && (i[v] = R, d = !0);
          else {
            const H = Ot(v);
            r[H] = eo(
              a,
              c,
              H,
              R,
              e,
              !1
            );
          }
        else
          R !== i[v] && (i[v] = R, d = !0);
      }
    }
  } else {
    ii(e, t, r, i) && (d = !0);
    let m;
    for (const p in c)
      (!t || // for camelCase
      !K(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((m = Be(p)) === p || !K(t, m))) && (a ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[m] !== void 0) && (r[p] = eo(
        a,
        c,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (i !== c)
      for (const p in i)
        (!t || !K(t, p)) && (delete i[p], d = !0);
  }
  d && Me(e, "set", "$attrs"), f.NODE_ENV !== "production" && li(t || {}, r, e);
}
function ii(e, t, n, o) {
  const [r, i] = e.propsOptions;
  let l = !1, c;
  if (t)
    for (let a in t) {
      if (It(a))
        continue;
      const d = t[a];
      let m;
      r && K(r, m = Ot(a)) ? !i || !i.includes(m) ? n[m] = d : (c || (c = {}))[m] = d : Cn(e.emitsOptions, a) || (!(a in o) || d !== o[a]) && (o[a] = d, l = !0);
    }
  if (i) {
    const a = B(n), d = c || Z;
    for (let m = 0; m < i.length; m++) {
      const p = i[m];
      n[p] = eo(
        r,
        a,
        p,
        d[p],
        e,
        !K(d, p)
      );
    }
  }
  return l;
}
function eo(e, t, n, o, r, i) {
  const l = e[n];
  if (l != null) {
    const c = K(l, "default");
    if (c && o === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && j(a)) {
        const { propsDefaults: d } = r;
        if (n in d)
          o = d[n];
        else {
          const m = Gt(r);
          o = d[n] = a.call(
            null,
            t
          ), m();
        }
      } else
        o = a;
    }
    l[
      0
      /* shouldCast */
    ] && (i && !c ? o = !1 : l[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Be(n)) && (o = !0));
  }
  return o;
}
function si(e, t, n = !1) {
  const o = t.propsCache, r = o.get(e);
  if (r)
    return r;
  const i = e.props, l = {}, c = [];
  let a = !1;
  if (!j(e)) {
    const m = (p) => {
      a = !0;
      const [v, R] = si(p, t, !0);
      oe(l, v), R && c.push(...R);
    };
    !n && t.mixins.length && t.mixins.forEach(m), e.extends && m(e.extends), e.mixins && e.mixins.forEach(m);
  }
  if (!i && !a)
    return te(e) && o.set(e, vt), vt;
  if (M(i))
    for (let m = 0; m < i.length; m++) {
      f.NODE_ENV !== "production" && !le(i[m]) && x("props must be strings when using array syntax.", i[m]);
      const p = Ot(i[m]);
      Xo(p) && (l[p] = Z);
    }
  else if (i) {
    f.NODE_ENV !== "production" && !te(i) && x("invalid props options", i);
    for (const m in i) {
      const p = Ot(m);
      if (Xo(p)) {
        const v = i[m], R = l[p] = M(v) || j(v) ? { type: v } : oe({}, v);
        if (R) {
          const H = Qo(Boolean, R.type), U = Qo(String, R.type);
          R[
            0
            /* shouldCast */
          ] = H > -1, R[
            1
            /* shouldCastTrue */
          ] = U < 0 || H < U, (H > -1 || K(R, "default")) && c.push(p);
        }
      }
    }
  }
  const d = [l, c];
  return te(e) && o.set(e, d), d;
}
function Xo(e) {
  return e[0] !== "$" && !It(e) ? !0 : (f.NODE_ENV !== "production" && x(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function to(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Zo(e, t) {
  return to(e) === to(t);
}
function Qo(e, t) {
  return M(t) ? t.findIndex((n) => Zo(n, e)) : j(t) && Zo(t, e) ? 0 : -1;
}
function li(e, t, n) {
  const o = B(t), r = n.propsOptions[0];
  for (const i in r) {
    let l = r[i];
    l != null && Ol(
      i,
      o[i],
      l,
      f.NODE_ENV !== "production" ? Nt(o) : o,
      !K(e, i) && !K(e, Be(i))
    );
  }
}
function Ol(e, t, n, o, r) {
  const { type: i, required: l, validator: c, skipCheck: a } = n;
  if (l && r) {
    x('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !l)) {
    if (i != null && i !== !0 && !a) {
      let d = !1;
      const m = M(i) ? i : [i], p = [];
      for (let v = 0; v < m.length && !d; v++) {
        const { valid: R, expectedType: H } = Dl(t, m[v]);
        p.push(H || ""), d = R;
      }
      if (!d) {
        x(Vl(e, t, p));
        return;
      }
    }
    c && !c(t, o) && x('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const xl = /* @__PURE__ */ Ue(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Dl(e, t) {
  let n;
  const o = to(t);
  if (xl(o)) {
    const r = typeof e;
    n = r === o.toLowerCase(), !n && r === "object" && (n = e instanceof t);
  } else
    o === "Object" ? n = te(e) : o === "Array" ? n = M(e) : o === "null" ? n = e === null : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function Vl(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(On).join(" | ")}`;
  const r = n[0], i = co(t), l = er(t, r), c = er(t, i);
  return n.length === 1 && tr(r) && !Tl(r, i) && (o += ` with value ${l}`), o += `, got ${i} `, tr(i) && (o += `with value ${c}.`), o;
}
function er(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function tr(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Tl(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const ci = (e) => e[0] === "_" || e === "$stable", To = (e) => M(e) ? e.map(De) : [De(e)], Cl = (e, t, n) => {
  if (t._n)
    return t;
  const o = ks((...r) => (f.NODE_ENV !== "production" && fe && (!n || n.root === fe.root) && x(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), To(t(...r))), n);
  return o._c = !1, o;
}, ui = (e, t, n) => {
  const o = e._ctx;
  for (const r in e) {
    if (ci(r))
      continue;
    const i = e[r];
    if (j(i))
      t[r] = Cl(r, i, o);
    else if (i != null) {
      f.NODE_ENV !== "production" && x(
        `Non-function value encountered for slot "${r}". Prefer function slots for better performance.`
      );
      const l = To(i);
      t[r] = () => l;
    }
  }
}, ai = (e, t) => {
  f.NODE_ENV !== "production" && !xo(e.vnode) && x(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = To(t);
  e.slots.default = () => n;
}, Sl = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = B(t), hn(t, "_", n)) : ui(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && ai(e, t);
  hn(e.slots, Rn, 1);
}, Rl = (e, t, n) => {
  const { vnode: o, slots: r } = e;
  let i = !0, l = Z;
  if (o.shapeFlag & 32) {
    const c = t._;
    c ? f.NODE_ENV !== "production" && dt ? (oe(r, t), Me(e, "set", "$slots")) : n && c === 1 ? i = !1 : (oe(r, t), !n && c === 1 && delete r._) : (i = !t.$stable, ui(t, r)), l = t;
  } else
    t && (ai(e, t), l = { default: 1 });
  if (i)
    for (const c in r)
      !ci(c) && l[c] == null && delete r[c];
};
function no(e, t, n, o, r = !1) {
  if (M(e)) {
    e.forEach(
      (v, R) => no(
        v,
        t && (M(t) ? t[R] : t),
        n,
        o,
        r
      )
    );
    return;
  }
  if (ln(o) && !r)
    return;
  const i = o.shapeFlag & 4 ? So(o.component) || o.component.proxy : o.el, l = r ? null : i, { i: c, r: a } = e;
  if (f.NODE_ENV !== "production" && !c) {
    x(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, m = c.refs === Z ? c.refs = {} : c.refs, p = c.setupState;
  if (d != null && d !== a && (le(d) ? (m[d] = null, K(p, d) && (p[d] = null)) : me(d) && (d.value = null)), j(a))
    ke(a, c, 12, [l, m]);
  else {
    const v = le(a), R = me(a);
    if (v || R) {
      const H = () => {
        if (e.f) {
          const U = v ? K(p, a) ? p[a] : m[a] : a.value;
          r ? M(U) && so(U, i) : M(U) ? U.includes(i) || U.push(i) : v ? (m[a] = [i], K(p, a) && (p[a] = m[a])) : (a.value = [i], e.k && (m[e.k] = a.value));
        } else
          v ? (m[a] = l, K(p, a) && (p[a] = l)) : R ? (a.value = l, e.k && (m[e.k] = l)) : f.NODE_ENV !== "production" && x("Invalid template ref type:", a, `(${typeof a})`);
      };
      l ? (H.id = -1, ve(H, n)) : H();
    } else
      f.NODE_ENV !== "production" && x("Invalid template ref type:", a, `(${typeof a})`);
  }
}
let St, Je;
function Fe(e, t) {
  e.appContext.config.performance && Nn() && Je.mark(`vue-${t}-${e.uid}`), f.NODE_ENV !== "production" && Ps(e, t, Nn() ? Je.now() : Date.now());
}
function je(e, t) {
  if (e.appContext.config.performance && Nn()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end";
    Je.mark(o), Je.measure(
      `<${An(e, e.type)}> ${t}`,
      n,
      o
    ), Je.clearMarks(n), Je.clearMarks(o);
  }
  f.NODE_ENV !== "production" && Fs(e, t, Nn() ? Je.now() : Date.now());
}
function Nn() {
  return St !== void 0 || (typeof window < "u" && window.performance ? (St = !0, Je = window.performance) : St = !1), St;
}
function $l() {
  const e = [];
  if (f.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const ve = zs;
function Al(e) {
  return Il(e);
}
function Il(e, t) {
  $l();
  const n = ao();
  n.__VUE__ = !0, f.NODE_ENV !== "production" && Wr(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: r,
    patchProp: i,
    createElement: l,
    createText: c,
    createComment: a,
    setText: d,
    setElementText: m,
    parentNode: p,
    nextSibling: v,
    setScopeId: R = se,
    insertStaticContent: H
  } = e, U = (s, u, h, g = null, _ = null, w = null, D = void 0, y = null, O = f.NODE_ENV !== "production" && dt ? !1 : !!u.dynamicChildren) => {
    if (s === u)
      return;
    s && !Rt(s, u) && (g = Jt(s), Ee(s, _, w, !0), s = null), u.patchFlag === -2 && (O = !1, u.dynamicChildren = null);
    const { type: N, ref: V, shapeFlag: I } = u;
    switch (N) {
      case qt:
        ce(s, u, h, g);
        break;
      case Se:
        re(s, u, h, g);
        break;
      case an:
        s == null ? _e(u, h, g, D) : f.NODE_ENV !== "production" && Q(s, u, h, D);
        break;
      case Ae:
        de(
          s,
          u,
          h,
          g,
          _,
          w,
          D,
          y,
          O
        );
        break;
      default:
        I & 1 ? $(
          s,
          u,
          h,
          g,
          _,
          w,
          D,
          y,
          O
        ) : I & 6 ? X(
          s,
          u,
          h,
          g,
          _,
          w,
          D,
          y,
          O
        ) : I & 64 || I & 128 ? N.process(
          s,
          u,
          h,
          g,
          _,
          w,
          D,
          y,
          O,
          gt
        ) : f.NODE_ENV !== "production" && x("Invalid VNode type:", N, `(${typeof N})`);
    }
    V != null && _ && no(V, s && s.ref, w, u || s, !u);
  }, ce = (s, u, h, g) => {
    if (s == null)
      o(
        u.el = c(u.children),
        h,
        g
      );
    else {
      const _ = u.el = s.el;
      u.children !== s.children && d(_, u.children);
    }
  }, re = (s, u, h, g) => {
    s == null ? o(
      u.el = a(u.children || ""),
      h,
      g
    ) : u.el = s.el;
  }, _e = (s, u, h, g) => {
    [s.el, s.anchor] = H(
      s.children,
      u,
      h,
      g,
      s.el,
      s.anchor
    );
  }, Q = (s, u, h, g) => {
    if (u.children !== s.children) {
      const _ = v(s.anchor);
      S(s), [u.el, u.anchor] = H(
        u.children,
        h,
        _,
        g
      );
    } else
      u.el = s.el, u.anchor = s.anchor;
  }, b = ({ el: s, anchor: u }, h, g) => {
    let _;
    for (; s && s !== u; )
      _ = v(s), o(s, h, g), s = _;
    o(u, h, g);
  }, S = ({ el: s, anchor: u }) => {
    let h;
    for (; s && s !== u; )
      h = v(s), r(s), s = h;
    r(u);
  }, $ = (s, u, h, g, _, w, D, y, O) => {
    u.type === "svg" ? D = "svg" : u.type === "math" && (D = "mathml"), s == null ? E(
      u,
      h,
      g,
      _,
      w,
      D,
      y,
      O
    ) : k(
      s,
      u,
      _,
      w,
      D,
      y,
      O
    );
  }, E = (s, u, h, g, _, w, D, y) => {
    let O, N;
    const { props: V, shapeFlag: I, transition: A, dirs: F } = s;
    if (O = s.el = l(
      s.type,
      w,
      V && V.is,
      V
    ), I & 8 ? m(O, s.children) : I & 16 && P(
      s.children,
      O,
      null,
      g,
      _,
      Hn(s, w),
      D,
      y
    ), F && rt(s, null, g, "created"), T(O, s, s.scopeId, D, g), V) {
      for (const J in V)
        J !== "value" && !It(J) && i(
          O,
          J,
          null,
          V[J],
          w,
          s.children,
          g,
          _,
          Pe
        );
      "value" in V && i(O, "value", null, V.value, w), (N = V.onVnodeBeforeMount) && $e(N, g, s);
    }
    f.NODE_ENV !== "production" && (Object.defineProperty(O, "__vnode", {
      value: s,
      enumerable: !1
    }), Object.defineProperty(O, "__vueParentComponent", {
      value: g,
      enumerable: !1
    })), F && rt(s, null, g, "beforeMount");
    const q = Ll(_, A);
    q && A.beforeEnter(O), o(O, u, h), ((N = V && V.onVnodeMounted) || q || F) && ve(() => {
      N && $e(N, g, s), q && A.enter(O), F && rt(s, null, g, "mounted");
    }, _);
  }, T = (s, u, h, g, _) => {
    if (h && R(s, h), g)
      for (let w = 0; w < g.length; w++)
        R(s, g[w]);
    if (_) {
      let w = _.subTree;
      if (f.NODE_ENV !== "production" && w.patchFlag > 0 && w.patchFlag & 2048 && (w = Oo(w.children) || w), u === w) {
        const D = _.vnode;
        T(
          s,
          D,
          D.scopeId,
          D.slotScopeIds,
          _.parent
        );
      }
    }
  }, P = (s, u, h, g, _, w, D, y, O = 0) => {
    for (let N = O; N < s.length; N++) {
      const V = s[N] = y ? Ge(s[N]) : De(s[N]);
      U(
        null,
        V,
        u,
        h,
        g,
        _,
        w,
        D,
        y
      );
    }
  }, k = (s, u, h, g, _, w, D) => {
    const y = u.el = s.el;
    let { patchFlag: O, dynamicChildren: N, dirs: V } = u;
    O |= s.patchFlag & 16;
    const I = s.props || Z, A = u.props || Z;
    let F;
    if (h && it(h, !1), (F = A.onVnodeBeforeUpdate) && $e(F, h, u, s), V && rt(u, s, h, "beforeUpdate"), h && it(h, !0), f.NODE_ENV !== "production" && dt && (O = 0, D = !1, N = null), N ? (W(
      s.dynamicChildren,
      N,
      y,
      h,
      g,
      Hn(u, _),
      w
    ), f.NODE_ENV !== "production" && un(s, u)) : D || ee(
      s,
      u,
      y,
      null,
      h,
      g,
      Hn(u, _),
      w,
      !1
    ), O > 0) {
      if (O & 16)
        z(
          y,
          u,
          I,
          A,
          h,
          g,
          _
        );
      else if (O & 2 && I.class !== A.class && i(y, "class", null, A.class, _), O & 4 && i(y, "style", I.style, A.style, _), O & 8) {
        const q = u.dynamicProps;
        for (let J = 0; J < q.length; J++) {
          const ne = q[J], ae = I[ne], Oe = A[ne];
          (Oe !== ae || ne === "value") && i(
            y,
            ne,
            ae,
            Oe,
            _,
            s.children,
            h,
            g,
            Pe
          );
        }
      }
      O & 1 && s.children !== u.children && m(y, u.children);
    } else
      !D && N == null && z(
        y,
        u,
        I,
        A,
        h,
        g,
        _
      );
    ((F = A.onVnodeUpdated) || V) && ve(() => {
      F && $e(F, h, u, s), V && rt(u, s, h, "updated");
    }, g);
  }, W = (s, u, h, g, _, w, D) => {
    for (let y = 0; y < u.length; y++) {
      const O = s[y], N = u[y], V = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        O.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (O.type === Ae || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Rt(O, N) || // - In the case of a component, it could contain anything.
        O.shapeFlag & 70) ? p(O.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      U(
        O,
        N,
        V,
        null,
        g,
        _,
        w,
        D,
        !0
      );
    }
  }, z = (s, u, h, g, _, w, D) => {
    if (h !== g) {
      if (h !== Z)
        for (const y in h)
          !It(y) && !(y in g) && i(
            s,
            y,
            h[y],
            null,
            D,
            u.children,
            _,
            w,
            Pe
          );
      for (const y in g) {
        if (It(y))
          continue;
        const O = g[y], N = h[y];
        O !== N && y !== "value" && i(
          s,
          y,
          N,
          O,
          D,
          u.children,
          _,
          w,
          Pe
        );
      }
      "value" in g && i(s, "value", h.value, g.value, D);
    }
  }, de = (s, u, h, g, _, w, D, y, O) => {
    const N = u.el = s ? s.el : c(""), V = u.anchor = s ? s.anchor : c("");
    let { patchFlag: I, dynamicChildren: A, slotScopeIds: F } = u;
    f.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (dt || I & 2048) && (I = 0, O = !1, A = null), F && (y = y ? y.concat(F) : F), s == null ? (o(N, h, g), o(V, h, g), P(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      h,
      V,
      _,
      w,
      D,
      y,
      O
    )) : I > 0 && I & 64 && A && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    s.dynamicChildren ? (W(
      s.dynamicChildren,
      A,
      h,
      _,
      w,
      D,
      y
    ), f.NODE_ENV !== "production" ? un(s, u) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (u.key != null || _ && u === _.subTree) && un(
        s,
        u,
        !0
        /* shallow */
      )
    )) : ee(
      s,
      u,
      h,
      V,
      _,
      w,
      D,
      y,
      O
    );
  }, X = (s, u, h, g, _, w, D, y, O) => {
    u.slotScopeIds = y, s == null ? u.shapeFlag & 512 ? _.ctx.activate(
      u,
      h,
      g,
      D,
      O
    ) : G(
      u,
      h,
      g,
      _,
      w,
      D,
      O
    ) : Y(s, u, O);
  }, G = (s, u, h, g, _, w, D) => {
    const y = s.component = zl(
      s,
      g,
      _
    );
    if (f.NODE_ENV !== "production" && y.type.__hmrId && Ts(y), f.NODE_ENV !== "production" && (on(s), Fe(y, "mount")), xo(s) && (y.ctx.renderer = gt), f.NODE_ENV !== "production" && Fe(y, "init"), Xl(y), f.NODE_ENV !== "production" && je(y, "init"), y.asyncDep) {
      if (_ && _.registerDep(y, C), !s.el) {
        const O = y.subTree = Te(Se);
        re(null, O, u, h);
      }
    } else
      C(
        y,
        s,
        u,
        h,
        _,
        w,
        D
      );
    f.NODE_ENV !== "production" && (rn(), je(y, "mount"));
  }, Y = (s, u, h) => {
    const g = u.component = s.component;
    if (Ks(s, u, h))
      if (g.asyncDep && !g.asyncResolved) {
        f.NODE_ENV !== "production" && on(u), L(g, u, h), f.NODE_ENV !== "production" && rn();
        return;
      } else
        g.next = u, Ds(g.update), g.effect.dirty = !0, g.update();
    else
      u.el = s.el, g.vnode = u;
  }, C = (s, u, h, g, _, w, D) => {
    const y = () => {
      if (s.isMounted) {
        let { next: V, bu: I, u: A, parent: F, vnode: q } = s;
        {
          const _t = fi(s);
          if (_t) {
            V && (V.el = q.el, L(s, V, D)), _t.asyncDep.then(() => {
              s.isUnmounted || y();
            });
            return;
          }
        }
        let J = V, ne;
        f.NODE_ENV !== "production" && on(V || s.vnode), it(s, !1), V ? (V.el = q.el, L(s, V, D)) : V = q, I && Tt(I), (ne = V.props && V.props.onVnodeBeforeUpdate) && $e(ne, F, V, q), it(s, !0), f.NODE_ENV !== "production" && Fe(s, "render");
        const ae = Fn(s);
        f.NODE_ENV !== "production" && je(s, "render");
        const Oe = s.subTree;
        s.subTree = ae, f.NODE_ENV !== "production" && Fe(s, "patch"), U(
          Oe,
          ae,
          // parent may have changed if it's in a teleport
          p(Oe.el),
          // anchor may have changed if it's in a fragment
          Jt(Oe),
          s,
          _,
          w
        ), f.NODE_ENV !== "production" && je(s, "patch"), V.el = ae.el, J === null && Ws(s, ae.el), A && ve(A, _), (ne = V.props && V.props.onVnodeUpdated) && ve(
          () => $e(ne, F, V, q),
          _
        ), f.NODE_ENV !== "production" && qr(s), f.NODE_ENV !== "production" && rn();
      } else {
        let V;
        const { el: I, props: A } = u, { bm: F, m: q, parent: J } = s, ne = ln(u);
        if (it(s, !1), F && Tt(F), !ne && (V = A && A.onVnodeBeforeMount) && $e(V, J, u), it(s, !0), I && Mn) {
          const ae = () => {
            f.NODE_ENV !== "production" && Fe(s, "render"), s.subTree = Fn(s), f.NODE_ENV !== "production" && je(s, "render"), f.NODE_ENV !== "production" && Fe(s, "hydrate"), Mn(
              I,
              s.subTree,
              s,
              _,
              null
            ), f.NODE_ENV !== "production" && je(s, "hydrate");
          };
          ne ? u.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !s.isUnmounted && ae()
          ) : ae();
        } else {
          f.NODE_ENV !== "production" && Fe(s, "render");
          const ae = s.subTree = Fn(s);
          f.NODE_ENV !== "production" && je(s, "render"), f.NODE_ENV !== "production" && Fe(s, "patch"), U(
            null,
            ae,
            h,
            g,
            s,
            _,
            w
          ), f.NODE_ENV !== "production" && je(s, "patch"), u.el = ae.el;
        }
        if (q && ve(q, _), !ne && (V = A && A.onVnodeMounted)) {
          const ae = u;
          ve(
            () => $e(V, J, ae),
            _
          );
        }
        (u.shapeFlag & 256 || J && ln(J.vnode) && J.vnode.shapeFlag & 256) && s.a && ve(s.a, _), s.isMounted = !0, f.NODE_ENV !== "production" && Is(s), u = h = g = null;
      }
    }, O = s.effect = new ho(
      y,
      se,
      () => Tn(N),
      s.scope
      // track it in component's effect scope
    ), N = s.update = () => {
      O.dirty && O.run();
    };
    N.id = s.uid, it(s, !0), f.NODE_ENV !== "production" && (O.onTrack = s.rtc ? (V) => Tt(s.rtc, V) : void 0, O.onTrigger = s.rtg ? (V) => Tt(s.rtg, V) : void 0, N.ownerInstance = s), N();
  }, L = (s, u, h) => {
    u.component = s;
    const g = s.vnode.props;
    s.vnode = u, s.next = null, wl(s, u.props, g, h), Rl(s, u.children, h), tt(), Uo(s), nt();
  }, ee = (s, u, h, g, _, w, D, y, O = !1) => {
    const N = s && s.children, V = s ? s.shapeFlag : 0, I = u.children, { patchFlag: A, shapeFlag: F } = u;
    if (A > 0) {
      if (A & 128) {
        ie(
          N,
          I,
          h,
          g,
          _,
          w,
          D,
          y,
          O
        );
        return;
      } else if (A & 256) {
        pe(
          N,
          I,
          h,
          g,
          _,
          w,
          D,
          y,
          O
        );
        return;
      }
    }
    F & 8 ? (V & 16 && Pe(N, _, w), I !== N && m(h, I)) : V & 16 ? F & 16 ? ie(
      N,
      I,
      h,
      g,
      _,
      w,
      D,
      y,
      O
    ) : Pe(N, _, w, !0) : (V & 8 && m(h, ""), F & 16 && P(
      I,
      h,
      g,
      _,
      w,
      D,
      y,
      O
    ));
  }, pe = (s, u, h, g, _, w, D, y, O) => {
    s = s || vt, u = u || vt;
    const N = s.length, V = u.length, I = Math.min(N, V);
    let A;
    for (A = 0; A < I; A++) {
      const F = u[A] = O ? Ge(u[A]) : De(u[A]);
      U(
        s[A],
        F,
        h,
        null,
        _,
        w,
        D,
        y,
        O
      );
    }
    N > V ? Pe(
      s,
      _,
      w,
      !0,
      !1,
      I
    ) : P(
      u,
      h,
      g,
      _,
      w,
      D,
      y,
      O,
      I
    );
  }, ie = (s, u, h, g, _, w, D, y, O) => {
    let N = 0;
    const V = u.length;
    let I = s.length - 1, A = V - 1;
    for (; N <= I && N <= A; ) {
      const F = s[N], q = u[N] = O ? Ge(u[N]) : De(u[N]);
      if (Rt(F, q))
        U(
          F,
          q,
          h,
          null,
          _,
          w,
          D,
          y,
          O
        );
      else
        break;
      N++;
    }
    for (; N <= I && N <= A; ) {
      const F = s[I], q = u[A] = O ? Ge(u[A]) : De(u[A]);
      if (Rt(F, q))
        U(
          F,
          q,
          h,
          null,
          _,
          w,
          D,
          y,
          O
        );
      else
        break;
      I--, A--;
    }
    if (N > I) {
      if (N <= A) {
        const F = A + 1, q = F < V ? u[F].el : g;
        for (; N <= A; )
          U(
            null,
            u[N] = O ? Ge(u[N]) : De(u[N]),
            h,
            q,
            _,
            w,
            D,
            y,
            O
          ), N++;
      }
    } else if (N > A)
      for (; N <= I; )
        Ee(s[N], _, w, !0), N++;
    else {
      const F = N, q = N, J = /* @__PURE__ */ new Map();
      for (N = q; N <= A; N++) {
        const Ne = u[N] = O ? Ge(u[N]) : De(u[N]);
        Ne.key != null && (f.NODE_ENV !== "production" && J.has(Ne.key) && x(
          "Duplicate keys found during update:",
          JSON.stringify(Ne.key),
          "Make sure keys are unique."
        ), J.set(Ne.key, N));
      }
      let ne, ae = 0;
      const Oe = A - q + 1;
      let _t = !1, $o = 0;
      const Vt = new Array(Oe);
      for (N = 0; N < Oe; N++)
        Vt[N] = 0;
      for (N = F; N <= I; N++) {
        const Ne = s[N];
        if (ae >= Oe) {
          Ee(Ne, _, w, !0);
          continue;
        }
        let Re;
        if (Ne.key != null)
          Re = J.get(Ne.key);
        else
          for (ne = q; ne <= A; ne++)
            if (Vt[ne - q] === 0 && Rt(Ne, u[ne])) {
              Re = ne;
              break;
            }
        Re === void 0 ? Ee(Ne, _, w, !0) : (Vt[Re - q] = N + 1, Re >= $o ? $o = Re : _t = !0, U(
          Ne,
          u[Re],
          h,
          null,
          _,
          w,
          D,
          y,
          O
        ), ae++);
      }
      const Ao = _t ? Ml(Vt) : vt;
      for (ne = Ao.length - 1, N = Oe - 1; N >= 0; N--) {
        const Ne = q + N, Re = u[Ne], Io = Ne + 1 < V ? u[Ne + 1].el : g;
        Vt[N] === 0 ? U(
          null,
          Re,
          h,
          Io,
          _,
          w,
          D,
          y,
          O
        ) : _t && (ne < 0 || N !== Ao[ne] ? we(Re, h, Io, 2) : ne--);
      }
    }
  }, we = (s, u, h, g, _ = null) => {
    const { el: w, type: D, transition: y, children: O, shapeFlag: N } = s;
    if (N & 6) {
      we(s.component.subTree, u, h, g);
      return;
    }
    if (N & 128) {
      s.suspense.move(u, h, g);
      return;
    }
    if (N & 64) {
      D.move(s, u, h, gt);
      return;
    }
    if (D === Ae) {
      o(w, u, h);
      for (let I = 0; I < O.length; I++)
        we(O[I], u, h, g);
      o(s.anchor, u, h);
      return;
    }
    if (D === an) {
      b(s, u, h);
      return;
    }
    if (g !== 2 && N & 1 && y)
      if (g === 0)
        y.beforeEnter(w), o(w, u, h), ve(() => y.enter(w), _);
      else {
        const { leave: I, delayLeave: A, afterLeave: F } = y, q = () => o(w, u, h), J = () => {
          I(w, () => {
            q(), F && F();
          });
        };
        A ? A(w, q, J) : J();
      }
    else
      o(w, u, h);
  }, Ee = (s, u, h, g = !1, _ = !1) => {
    const {
      type: w,
      props: D,
      ref: y,
      children: O,
      dynamicChildren: N,
      shapeFlag: V,
      patchFlag: I,
      dirs: A
    } = s;
    if (y != null && no(y, null, h, s, !0), V & 256) {
      u.ctx.deactivate(s);
      return;
    }
    const F = V & 1 && A, q = !ln(s);
    let J;
    if (q && (J = D && D.onVnodeBeforeUnmount) && $e(J, u, s), V & 6)
      Dt(s.component, h, g);
    else {
      if (V & 128) {
        s.suspense.unmount(h, g);
        return;
      }
      F && rt(s, null, u, "beforeUnmount"), V & 64 ? s.type.remove(
        s,
        u,
        h,
        _,
        gt,
        g
      ) : N && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== Ae || I > 0 && I & 64) ? Pe(
        N,
        u,
        h,
        !1,
        !0
      ) : (w === Ae && I & 384 || !_ && V & 16) && Pe(O, u, h), g && ot(s);
    }
    (q && (J = D && D.onVnodeUnmounted) || F) && ve(() => {
      J && $e(J, u, s), F && rt(s, null, u, "unmounted");
    }, h);
  }, ot = (s) => {
    const { type: u, el: h, anchor: g, transition: _ } = s;
    if (u === Ae) {
      f.NODE_ENV !== "production" && s.patchFlag > 0 && s.patchFlag & 2048 && _ && !_.persisted ? s.children.forEach((D) => {
        D.type === Se ? r(D.el) : ot(D);
      }) : zt(h, g);
      return;
    }
    if (u === an) {
      S(s);
      return;
    }
    const w = () => {
      r(h), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (s.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: D, delayLeave: y } = _, O = () => D(h, w);
      y ? y(s.el, w, O) : O();
    } else
      w();
  }, zt = (s, u) => {
    let h;
    for (; s !== u; )
      h = v(s), r(s), s = h;
    r(u);
  }, Dt = (s, u, h) => {
    f.NODE_ENV !== "production" && s.type.__hmrId && Cs(s);
    const { bum: g, scope: _, update: w, subTree: D, um: y } = s;
    g && Tt(g), _.stop(), w && (w.active = !1, Ee(D, s, u, h)), y && ve(y, u), ve(() => {
      s.isUnmounted = !0;
    }, u), u && u.pendingBranch && !u.isUnmounted && s.asyncDep && !s.asyncResolved && s.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve()), f.NODE_ENV !== "production" && Ms(s);
  }, Pe = (s, u, h, g = !1, _ = !1, w = 0) => {
    for (let D = w; D < s.length; D++)
      Ee(s[D], u, h, g, _);
  }, Jt = (s) => s.shapeFlag & 6 ? Jt(s.component.subTree) : s.shapeFlag & 128 ? s.suspense.next() : v(s.anchor || s.el);
  let In = !1;
  const Ro = (s, u, h) => {
    s == null ? u._vnode && Ee(u._vnode, null, null, !0) : U(
      u._vnode || null,
      s,
      u,
      null,
      null,
      null,
      h
    ), In || (In = !0, Uo(), Br(), In = !1), u._vnode = s;
  }, gt = {
    p: U,
    um: Ee,
    m: we,
    r: ot,
    mt: G,
    mc: P,
    pc: ee,
    pbc: W,
    n: Jt,
    o: e
  };
  let Ln, Mn;
  return t && ([Ln, Mn] = t(
    gt
  )), {
    render: Ro,
    hydrate: Ln,
    createApp: Nl(Ro, Ln)
  };
}
function Hn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function it({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ll(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function un(e, t, n = !1) {
  const o = e.children, r = t.children;
  if (M(o) && M(r))
    for (let i = 0; i < o.length; i++) {
      const l = o[i];
      let c = r[i];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = r[i] = Ge(r[i]), c.el = l.el), n || un(l, c)), c.type === qt && (c.el = l.el), f.NODE_ENV !== "production" && c.type === Se && !c.el && (c.el = l.el);
    }
}
function Ml(e) {
  const t = e.slice(), n = [0];
  let o, r, i, l, c;
  const a = e.length;
  for (o = 0; o < a; o++) {
    const d = e[o];
    if (d !== 0) {
      if (r = n[n.length - 1], e[r] < d) {
        t[o] = r, n.push(o);
        continue;
      }
      for (i = 0, l = n.length - 1; i < l; )
        c = i + l >> 1, e[n[c]] < d ? i = c + 1 : l = c;
      d < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), n[i] = o);
    }
  }
  for (i = n.length, l = n[i - 1]; i-- > 0; )
    n[i] = l, l = t[l];
  return n;
}
function fi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : fi(t);
}
const Pl = (e) => e.__isTeleport, Ae = Symbol.for("v-fgt"), qt = Symbol.for("v-txt"), Se = Symbol.for("v-cmt"), an = Symbol.for("v-stc"), Pt = [];
let Ve = null;
function Fl(e = !1) {
  Pt.push(Ve = e ? null : []);
}
function jl() {
  Pt.pop(), Ve = Pt[Pt.length - 1] || null;
}
let kt = 1;
function nr(e) {
  kt += e;
}
function Hl(e) {
  return e.dynamicChildren = kt > 0 ? Ve || vt : null, jl(), kt > 0 && Ve && Ve.push(e), e;
}
function kl(e, t, n, o, r, i) {
  return Hl(
    pi(
      e,
      t,
      n,
      o,
      r,
      i,
      !0
    )
  );
}
function Bt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Rt(e, t) {
  return f.NODE_ENV !== "production" && t.shapeFlag & 6 && Et.has(t.type) ? (e.shapeFlag &= -257, t.shapeFlag &= -513, !1) : e.type === t.type && e.key === t.key;
}
const Bl = (...e) => hi(
  ...e
), Rn = "__vInternal", di = ({ key: e }) => e ?? null, fn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? le(e) || me(e) || j(e) ? { i: ye, r: e, k: t, f: !!n } : e : null);
function pi(e, t = null, n = null, o = 0, r = null, i = e === Ae ? 0 : 1, l = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && di(t),
    ref: t && fn(t),
    scopeId: Jr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ye
  };
  return c ? (Co(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= le(n) ? 8 : 16), f.NODE_ENV !== "production" && a.key !== a.key && x("VNode created with invalid key (NaN). VNode type:", a.type), kt > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  Ve && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ve.push(a), a;
}
const Te = f.NODE_ENV !== "production" ? Bl : hi;
function hi(e, t = null, n = null, o = 0, r = null, i = !1) {
  if ((!e || e === qs) && (f.NODE_ENV !== "production" && !e && x(`Invalid vnode type when creating vnode: ${e}.`), e = Se), Bt(e)) {
    const c = et(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Co(c, n), kt > 0 && !i && Ve && (c.shapeFlag & 6 ? Ve[Ve.indexOf(e)] = c : Ve.push(c)), c.patchFlag |= -2, c;
  }
  if (Ni(e) && (e = e.__vccOpts), t) {
    t = Ul(t);
    let { class: c, style: a } = t;
    c && !le(c) && (t.class = po(c)), te(a) && (Gn(a) && !M(a) && (a = oe({}, a)), t.style = fo(a));
  }
  const l = le(e) ? 1 : Gs(e) ? 128 : Pl(e) ? 64 : te(e) ? 4 : j(e) ? 2 : 0;
  return f.NODE_ENV !== "production" && l & 4 && Gn(e) && (e = B(e), x(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), pi(
    e,
    t,
    n,
    o,
    r,
    l,
    i,
    !0
  );
}
function Ul(e) {
  return e ? Gn(e) || Rn in e ? oe({}, e) : e : null;
}
function et(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: i, children: l } = e, c = t ? Wl(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && di(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? M(r) ? r.concat(fn(t)) : [r, fn(t)] : fn(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: f.NODE_ENV !== "production" && i === -1 && M(l) ? l.map(mi) : l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ae ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && et(e.ssContent),
    ssFallback: e.ssFallback && et(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function mi(e) {
  const t = et(e);
  return M(e.children) && (t.children = e.children.map(mi)), t;
}
function Kl(e = " ", t = 0) {
  return Te(qt, null, e, t);
}
function De(e) {
  return e == null || typeof e == "boolean" ? Te(Se) : M(e) ? Te(
    Ae,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Ge(e) : Te(qt, null, String(e));
}
function Ge(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : et(e);
}
function Co(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (M(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Co(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Rn in t) ? t._ctx = ye : r === 3 && ye && (ye.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    j(t) ? (t = { default: t, _ctx: ye }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Kl(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Wl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = po([t.class, o.class]));
      else if (r === "style")
        t.style = fo([t.style, o.style]);
      else if (Ut(r)) {
        const i = t[r], l = o[r];
        l && i !== l && !(M(i) && i.includes(l)) && (t[r] = i ? [].concat(i, l) : l);
      } else
        r !== "" && (t[r] = o[r]);
  }
  return t;
}
function $e(e, t, n, o = null) {
  Ce(e, t, 7, [
    n,
    o
  ]);
}
const ql = ri();
let Gl = 0;
function zl(e, t, n) {
  const o = e.type, r = (t ? t.appContext : e.appContext) || ql, i = {
    uid: Gl++,
    vnode: e,
    type: o,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Ui(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: si(o, r),
    emitsOptions: zr(o, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Z,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: Z,
    data: Z,
    props: Z,
    attrs: Z,
    slots: Z,
    refs: Z,
    setupState: Z,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return f.NODE_ENV !== "production" ? i.ctx = ul(i) : i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Hs.bind(null, i), e.ce && e.ce(i), i;
}
let fe = null;
const Jl = () => fe || ye;
let bn, oo;
{
  const e = ao(), t = (n, o) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(o), (i) => {
      r.length > 1 ? r.forEach((l) => l(i)) : r[0](i);
    };
  };
  bn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => fe = n
  ), oo = t(
    "__VUE_SSR_SETTERS__",
    (n) => $n = n
  );
}
const Gt = (e) => {
  const t = fe;
  return bn(e), e.scope.on(), () => {
    e.scope.off(), bn(t);
  };
}, or = () => {
  fe && fe.scope.off(), bn(null);
}, Yl = /* @__PURE__ */ Ue("slot,component");
function ro(e, { isNativeTag: t }) {
  (Yl(e) || t(e)) && x(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function gi(e) {
  return e.vnode.shapeFlag & 4;
}
let $n = !1;
function Xl(e, t = !1) {
  t && oo(t);
  const { props: n, children: o } = e.vnode, r = gi(e);
  vl(e, n, r, t), Sl(e, o);
  const i = r ? Zl(e, t) : void 0;
  return t && oo(!1), i;
}
function Zl(e, t) {
  var n;
  const o = e.type;
  if (f.NODE_ENV !== "production") {
    if (o.name && ro(o.name, e.appContext.config), o.components) {
      const i = Object.keys(o.components);
      for (let l = 0; l < i.length; l++)
        ro(i[l], e.appContext.config);
    }
    if (o.directives) {
      const i = Object.keys(o.directives);
      for (let l = 0; l < i.length; l++)
        Qr(i[l]);
    }
    o.compilerOptions && Ql() && x(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ir(new Proxy(e.ctx, ni)), f.NODE_ENV !== "production" && al(e);
  const { setup: r } = o;
  if (r) {
    const i = e.setupContext = r.length > 1 ? tc(e) : null, l = Gt(e);
    tt();
    const c = ke(
      r,
      e,
      0,
      [
        f.NODE_ENV !== "production" ? Nt(e.props) : e.props,
        i
      ]
    );
    if (nt(), l(), lo(c)) {
      if (c.then(or, or), t)
        return c.then((a) => {
          rr(e, a, t);
        }).catch((a) => {
          Kt(a, e, 0);
        });
      if (e.asyncDep = c, f.NODE_ENV !== "production" && !e.suspense) {
        const a = (n = o.name) != null ? n : "Anonymous";
        x(
          `Component <${a}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      rr(e, c, t);
  } else
    _i(e, t);
}
function rr(e, t, n) {
  j(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : te(t) ? (f.NODE_ENV !== "production" && Bt(t) && x(
    "setup() should not return VNodes directly - return a render function instead."
  ), f.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Pr(t), f.NODE_ENV !== "production" && fl(e)) : f.NODE_ENV !== "production" && t !== void 0 && x(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), _i(e, n);
}
let io;
const Ql = () => !io;
function _i(e, t, n) {
  const o = e.type;
  if (!e.render) {
    if (!t && io && !o.render) {
      const r = o.template || Vo(e).template;
      if (r) {
        f.NODE_ENV !== "production" && Fe(e, "compile");
        const { isCustomElement: i, compilerOptions: l } = e.appContext.config, { delimiters: c, compilerOptions: a } = o, d = oe(
          oe(
            {
              isCustomElement: i,
              delimiters: c
            },
            l
          ),
          a
        );
        o.render = io(r, d), f.NODE_ENV !== "production" && je(e, "compile");
      }
    }
    e.render = o.render || se;
  }
  {
    const r = Gt(e);
    tt();
    try {
      pl(e);
    } finally {
      nt(), r();
    }
  }
  f.NODE_ENV !== "production" && !o.render && e.render === se && !t && (o.template ? x(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : x("Component is missing template or render function."));
}
function ir(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    f.NODE_ENV !== "production" ? {
      get(t, n) {
        return gn(), he(e, "get", "$attrs"), t[n];
      },
      set() {
        return x("setupContext.attrs is readonly."), !1;
      },
      deleteProperty() {
        return x("setupContext.attrs is readonly."), !1;
      }
    } : {
      get(t, n) {
        return he(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function ec(e) {
  return e.slotsProxy || (e.slotsProxy = new Proxy(e.slots, {
    get(t, n) {
      return he(e, "get", "$slots"), t[n];
    }
  }));
}
function tc(e) {
  const t = (n) => {
    if (f.NODE_ENV !== "production" && (e.exposed && x("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (M(n) ? o = "array" : me(n) && (o = "ref")), o !== "object" && x(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  return f.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return ir(e);
    },
    get slots() {
      return ec(e);
    },
    get emit() {
      return (n, ...o) => e.emit(n, ...o);
    },
    expose: t
  }) : {
    get attrs() {
      return ir(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function So(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Pr(Ir(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in pt)
          return pt[n](e);
      },
      has(t, n) {
        return n in t || n in pt;
      }
    }));
}
const nc = /(?:^|[-_])(\w)/g, oc = (e) => e.replace(nc, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ei(e, t = !0) {
  return j(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function An(e, t, n = !1) {
  let o = Ei(t);
  if (!o && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (o = r[1]);
  }
  if (!o && e && e.parent) {
    const r = (i) => {
      for (const l in i)
        if (i[l] === t)
          return l;
    };
    o = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return o ? oc(o) : n ? "App" : "Anonymous";
}
function Ni(e) {
  return j(e) && "__vccOpts" in e;
}
const rc = (e, t) => {
  const n = ps(e, t, $n);
  if (f.NODE_ENV !== "production") {
    const o = Jl();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function ic(e, t, n) {
  const o = arguments.length;
  return o === 2 ? te(t) && !M(t) ? Bt(t) ? Te(e, null, [t]) : Te(e, t) : Te(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && Bt(n) && (n = [n]), Te(e, t, n));
}
function sc() {
  if (f.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, r = {
    header(p) {
      return te(p) ? p.__isVue ? ["div", e, "VueInstance"] : me(p) ? [
        "div",
        {},
        ["span", e, m(p)],
        "<",
        c(p.value),
        ">"
      ] : ut(p) ? [
        "div",
        {},
        ["span", e, at(p) ? "ShallowReactive" : "Reactive"],
        "<",
        c(p),
        `>${Qe(p) ? " (readonly)" : ""}`
      ] : Qe(p) ? [
        "div",
        {},
        ["span", e, at(p) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(p),
        ">"
      ] : null : null;
    },
    hasBody(p) {
      return p && p.__isVue;
    },
    body(p) {
      if (p && p.__isVue)
        return [
          "div",
          {},
          ...i(p.$)
        ];
    }
  };
  function i(p) {
    const v = [];
    p.type.props && p.props && v.push(l("props", B(p.props))), p.setupState !== Z && v.push(l("setup", p.setupState)), p.data !== Z && v.push(l("data", B(p.data)));
    const R = a(p, "computed");
    R && v.push(l("computed", R));
    const H = a(p, "inject");
    return H && v.push(l("injected", H)), v.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: p }]
    ]), v;
  }
  function l(p, v) {
    return v = oe({}, v), Object.keys(v).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        p
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(v).map((R) => [
          "div",
          {},
          ["span", o, R + ": "],
          c(v[R], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(p, v = !0) {
    return typeof p == "number" ? ["span", t, p] : typeof p == "string" ? ["span", n, JSON.stringify(p)] : typeof p == "boolean" ? ["span", o, p] : te(p) ? ["object", { object: v ? B(p) : p }] : ["span", n, String(p)];
  }
  function a(p, v) {
    const R = p.type;
    if (j(R))
      return;
    const H = {};
    for (const U in p.ctx)
      d(R, U, v) && (H[U] = p.ctx[U]);
    return H;
  }
  function d(p, v, R) {
    const H = p[R];
    if (M(H) && H.includes(v) || te(H) && v in H || p.extends && d(p.extends, v, R) || p.mixins && p.mixins.some((U) => d(U, v, R)))
      return !0;
  }
  function m(p) {
    return at(p) ? "ShallowRef" : p.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
const sr = "3.4.21", ht = f.NODE_ENV !== "production" ? x : se;
var xt = {};
const lc = "http://www.w3.org/2000/svg", cc = "http://www.w3.org/1998/Math/MathML", ze = typeof document < "u" ? document : null, lr = ze && /* @__PURE__ */ ze.createElement("template"), uc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const r = t === "svg" ? ze.createElementNS(lc, e) : t === "mathml" ? ze.createElementNS(cc, e) : ze.createElement(e, n ? { is: n } : void 0);
    return e === "select" && o && o.multiple != null && r.setAttribute("multiple", o.multiple), r;
  },
  createText: (e) => ze.createTextNode(e),
  createComment: (e) => ze.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ze.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, r, i) {
    const l = n ? n.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      lr.innerHTML = o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e;
      const c = lr.content;
      if (o === "svg" || o === "mathml") {
        const a = c.firstChild;
        for (; a.firstChild; )
          c.appendChild(a.firstChild);
        c.removeChild(a);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, ac = Symbol("_vtc");
function fc(e, t, n) {
  const o = e[ac];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const cr = Symbol("_vod"), dc = Symbol("_vsh"), pc = Symbol(xt.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), hc = /(^|;)\s*display\s*:/;
function mc(e, t, n) {
  const o = e.style, r = le(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (le(t))
        for (const l of t.split(";")) {
          const c = l.slice(0, l.indexOf(":")).trim();
          n[c] == null && dn(o, c, "");
        }
      else
        for (const l in t)
          n[l] == null && dn(o, l, "");
    for (const l in n)
      l === "display" && (i = !0), dn(o, l, n[l]);
  } else if (r) {
    if (t !== n) {
      const l = o[pc];
      l && (n += ";" + l), o.cssText = n, i = hc.test(n);
    }
  } else
    t && e.removeAttribute("style");
  cr in e && (e[cr] = i ? o.display : "", e[dc] && (o.display = "none"));
}
const gc = /[^\\];\s*$/, ur = /\s*!important$/;
function dn(e, t, n) {
  if (M(n))
    n.forEach((o) => dn(e, t, o));
  else if (n == null && (n = ""), xt.NODE_ENV !== "production" && gc.test(n) && ht(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = _c(e, t);
    ur.test(n) ? e.setProperty(
      Be(o),
      n.replace(ur, ""),
      "important"
    ) : e[o] = n;
  }
}
const ar = ["Webkit", "Moz", "ms"], kn = {};
function _c(e, t) {
  const n = kn[t];
  if (n)
    return n;
  let o = Ot(t);
  if (o !== "filter" && o in e)
    return kn[t] = o;
  o = On(o);
  for (let r = 0; r < ar.length; r++) {
    const i = ar[r] + o;
    if (i in e)
      return kn[t] = i;
  }
  return t;
}
const fr = "http://www.w3.org/1999/xlink";
function Ec(e, t, n, o, r) {
  if (o && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(fr, t.slice(6, t.length)) : e.setAttributeNS(fr, t, n);
  else {
    const i = Bi(t);
    n == null || i && !Er(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
  }
}
function Nc(e, t, n, o, r, i, l) {
  if (t === "innerHTML" || t === "textContent") {
    o && l(o, r, i), e[t] = n ?? "";
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && // custom elements may use _value internally
  !c.includes("-")) {
    const d = c === "OPTION" ? e.getAttribute("value") || "" : e.value, m = n ?? "";
    (d !== m || !("_value" in e)) && (e.value = m), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const d = typeof e[t];
    d === "boolean" ? n = Er(n) : n == null && d === "string" ? (n = "", a = !0) : d === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch (d) {
    xt.NODE_ENV !== "production" && !a && ht(
      `Failed setting prop "${t}" on <${c.toLowerCase()}>: value ${n} is invalid.`,
      d
    );
  }
  a && e.removeAttribute(t);
}
function bc(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function vc(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const dr = Symbol("_vei");
function yc(e, t, n, o, r = null) {
  const i = e[dr] || (e[dr] = {}), l = i[t];
  if (o && l)
    l.value = o;
  else {
    const [c, a] = wc(t);
    if (o) {
      const d = i[t] = Dc(o, r);
      bc(e, c, d, a);
    } else
      l && (vc(e, c, l, a), i[t] = void 0);
  }
}
const pr = /(?:Once|Passive|Capture)$/;
function wc(e) {
  let t;
  if (pr.test(e)) {
    t = {};
    let o;
    for (; o = e.match(pr); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Be(e.slice(2)), t];
}
let Bn = 0;
const Oc = /* @__PURE__ */ Promise.resolve(), xc = () => Bn || (Oc.then(() => Bn = 0), Bn = Date.now());
function Dc(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    Ce(
      Vc(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = xc(), n;
}
function Vc(e, t) {
  if (M(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((o) => (r) => !r._stopped && o && o(r));
  } else
    return t;
}
const hr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Tc = (e, t, n, o, r, i, l, c, a) => {
  const d = r === "svg";
  t === "class" ? fc(e, o, d) : t === "style" ? mc(e, n, o) : Ut(t) ? pn(t) || yc(e, t, n, o, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Cc(e, t, o, d)) ? Nc(
    e,
    t,
    o,
    i,
    l,
    c,
    a
  ) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Ec(e, t, o, d));
};
function Cc(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && hr(t) && j(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return hr(t) && le(n) ? !1 : t in e;
}
const Sc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Rc = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = (r) => {
    if (!("key" in r))
      return;
    const i = Be(r.key);
    if (t.some((l) => l === i || Sc[l] === i))
      return e(r);
  });
}, $c = /* @__PURE__ */ oe({ patchProp: Tc }, uc);
let mr;
function Ac() {
  return mr || (mr = Al($c));
}
const Ic = (...e) => {
  const t = Ac().createApp(...e);
  xt.NODE_ENV !== "production" && (Mc(t), Pc(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const r = Fc(o);
    if (!r)
      return;
    const i = t._component;
    !j(i) && !i.render && !i.template && (i.template = r.innerHTML), r.innerHTML = "";
    const l = n(r, !1, Lc(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), l;
  }, t;
};
function Lc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Mc(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Fi(t) || ji(t) || Hi(t),
    writable: !1
  });
}
function Pc(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        ht(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return ht(o), n;
      },
      set() {
        ht(o);
      }
    });
  }
}
function Fc(e) {
  if (le(e)) {
    const t = document.querySelector(e);
    return xt.NODE_ENV !== "production" && !t && ht(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return xt.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && ht(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
var jc = {};
function Hc() {
  sc();
}
jc.NODE_ENV !== "production" && Hc();
const kc = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Bc = {
  name: "InputTemplate"
}, Uc = /* @__PURE__ */ Object.assign(Bc, {
  props: {
    elements: {
      type: Array,
      default: () => []
    },
    showTemplate: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["change", "submit"],
  setup(e, { expose: t, emit: n }) {
    const o = e, r = n, i = Ct(null), l = Ct("");
    Ct([]), Ct(-1);
    const c = (b) => {
      const S = document.createElement("div");
      S.innerHTML = b;
      const $ = (T) => {
        var k, W, z, de, X;
        if (T.nodeType === 3)
          return T.textContent;
        if ((k = T.classList) != null && k.contains("editable-div"))
          return T.textContent || "";
        if ((W = T.classList) != null && W.contains("custom-select")) {
          const G = T.querySelector(".select-option.selected");
          return G ? G.textContent : "";
        }
        if (T.tagName === "SELECT")
          return ((z = T.options[T.selectedIndex]) == null ? void 0 : z.text) || "";
        if (T.tagName === "INPUT") {
          const G = (X = i.value) == null ? void 0 : X.querySelector(`[data-id="${(de = T.closest("[data-id]")) == null ? void 0 : de.dataset.id}"] input`);
          return G ? G.value || "" : T.value || "";
        }
        let P = "";
        for (const G of T.childNodes)
          P += $(G);
        return P;
      };
      return $(S).replace(/\s+/g, " ").trim();
    }, a = (b) => {
      l.value = b;
      const S = c(b);
      console.log("纯文本内容:", S), H.value = S;
    }, d = (b) => {
      b.preventDefault();
      const S = c(l.value);
      console.log("纯文本内容:", S), r("submit", S);
    }, m = (b) => {
      const S = i.value.innerHTML;
      (!S || S.trim() === "" || S === "<br>" || S.replace(/&nbsp;/g, "").trim() === "") && (i.value.innerHTML = ""), i.value.querySelectorAll(".editable-div").forEach((E) => {
        E.textContent.trim() === "" ? E.classList.add("showing-placeholder") : E.classList.remove("showing-placeholder");
      }), a(S);
    }, p = (b) => {
      const S = b.target.closest(".element-placeholder");
      if (S) {
        const $ = S.dataset.id;
        R($);
      }
    }, v = (b) => {
      var S, $, E, T;
      if (!((b.ctrlKey || b.metaKey) && b.key === "z")) {
        if (b.key === "Backspace" || b.key === "Delete") {
          const P = window.getSelection();
          if (!P.rangeCount)
            return;
          const k = P.getRangeAt(0), W = k.startContainer, z = k.startOffset;
          console.log("删除操作:", {
            key: b.key,
            startNodeType: W.nodeType,
            startNodeName: W.nodeName,
            startNodeContent: W.textContent,
            startOffset: z,
            previousSibling: W.previousSibling ? W.previousSibling.nodeName : "none"
          });
          let de = !1, X = null, G = W;
          for (; G && G !== i.value; ) {
            if (G.classList && G.classList.contains("editable-div")) {
              de = !0, X = G;
              break;
            }
            G = G.parentNode;
          }
          if (de) {
            if (b.key === "Backspace" && (X.textContent.length === 1 || k.startOffset === 1 && k.startOffset === k.endOffset) || b.key === "Delete" && (X.textContent.length === 1 || k.startOffset === 0 && k.startOffset === k.endOffset && X.textContent.length === 1)) {
              b.preventDefault(), X.textContent = "", X.classList.add("showing-placeholder");
              const C = document.createRange();
              C.setStart(X, 0), C.collapse(!0), P.removeAllRanges(), P.addRange(C), a(i.value.innerHTML);
              return;
            }
            if (X.textContent.trim() === "" && X.classList.contains("showing-placeholder") && (b.key === "Backspace" || b.key === "Delete")) {
              setTimeout(() => {
                const C = X.closest(".input-wrapper");
                if (C && C.parentNode) {
                  const L = window.getSelection(), ee = document.createRange();
                  ee.selectNode(C), L.removeAllRanges(), L.addRange(ee), document.execCommand("insertText", !1, "");
                  const pe = document.createTextNode("​");
                  C.parentNode.insertBefore(pe, C.nextSibling), C.remove();
                  const ie = document.createRange();
                  ie.setStart(pe, 0), ie.collapse(!0), L.removeAllRanges(), L.addRange(ie), document.execCommand("insertText", !1, ""), a(i.value.innerHTML);
                }
              }, 0);
              return;
            }
            return;
          }
          if (b.key === "Backspace" && W.nodeType === Node.TEXT_NODE && z === 0) {
            let Y = W.previousSibling;
            for (; Y && Y.nodeType === Node.TEXT_NODE && Y.textContent.trim() === ""; )
              Y = Y.previousSibling;
            if (Y && Y.nodeType === Node.ELEMENT_NODE && (Y.classList.contains("input-wrapper") || Y.classList.contains("select-wrapper"))) {
              const C = Y.querySelector(".editable-div");
              if (C && C.textContent.trim() === "" && C.classList.contains("showing-placeholder")) {
                b.preventDefault();
                const ee = Y, pe = window.getSelection(), ie = document.createRange();
                ie.selectNode(ee), pe.removeAllRanges(), pe.addRange(ie), document.execCommand("insertText", !1, "");
                const we = document.createTextNode("​");
                ee.parentNode.insertBefore(we, ee.nextSibling), ee.remove();
                const Ee = document.createRange();
                Ee.setStart(we, 0), Ee.collapse(!0), pe.removeAllRanges(), pe.addRange(Ee), document.execCommand("insertText", !1, ""), a(i.value.innerHTML);
                return;
              }
              setTimeout(() => {
                const ee = window.getSelection();
                if (!ee.rangeCount)
                  return;
                let ie = ee.getRangeAt(0).startContainer, we = !1, Ee = null;
                for (; ie && ie !== i.value; ) {
                  if (ie.classList && ie.classList.contains("editable-div")) {
                    we = !0, Ee = ie;
                    break;
                  }
                  ie = ie.parentNode;
                }
                if (we) {
                  const ot = Ee.closest(".input-wrapper");
                  if (ot) {
                    document.execCommand("insertText", !1, "");
                    const zt = document.createTextNode("​");
                    ot.parentNode.insertBefore(zt, ot.nextSibling);
                    const Dt = document.createRange();
                    Dt.setStart(zt, 0), Dt.collapse(!0), ee.removeAllRanges(), ee.addRange(Dt), document.execCommand("insertText", !1, "");
                  }
                }
                a(i.value.innerHTML);
              }, 0);
              return;
            }
          }
          if (b.key === "Delete" && (W.nodeType === Node.TEXT_NODE && z === W.textContent.length || W.nodeType === Node.TEXT_NODE && W.textContent.trim() === "")) {
            let C = W.nextSibling;
            for (; C && C.nodeType === Node.TEXT_NODE && C.textContent.trim() === ""; )
              C = C.nextSibling;
            if (C && C.nodeType === Node.ELEMENT_NODE && C.classList.contains("input-wrapper")) {
              const L = C.querySelector(".editable-div");
              if (L) {
                b.preventDefault(), C.setAttribute("contenteditable", "false"), L.focus();
                const ee = window.getSelection(), pe = document.createRange();
                L.firstChild && L.firstChild.nodeType === Node.TEXT_NODE ? pe.setStart(L.firstChild, 0) : pe.setStart(L, 0), pe.collapse(!0), ee.removeAllRanges(), ee.addRange(pe), console.log("Del 键处理: 光标已设置到 editable-div", {
                  editableDiv: L,
                  focused: document.activeElement === L
                }), setTimeout(() => {
                  document.activeElement !== L && C.setAttribute("contenteditable", "true");
                }, 300), a(i.value.innerHTML);
                return;
              }
            }
          }
        }
        if (b.key === "ArrowLeft" || b.key === "ArrowRight" || b.key === "ArrowUp" || b.key === "ArrowDown") {
          const P = window.getSelection(), k = P.getRangeAt(0), W = (($ = (S = k.startContainer).closest) == null ? void 0 : $.call(S, ".custom-select")) || ((T = (E = k.startContainer.parentElement) == null ? void 0 : E.closest) == null ? void 0 : T.call(E, ".custom-select"));
          if (W) {
            b.preventDefault();
            const de = W.closest(".select-wrapper"), X = document.createRange();
            b.key === "ArrowRight" ? X.setStartAfter(de) : b.key === "ArrowLeft" && X.setStartBefore(de), X.collapse(!0), P.removeAllRanges(), P.addRange(X);
            return;
          }
          const z = document.activeElement;
          if (i.value.contains(z) && z.classList.contains("editable-div")) {
            if (b.key === "ArrowLeft") {
              if (k.startOffset === 0) {
                b.preventDefault();
                const X = z.closest(".input-wrapper").previousElementSibling;
                if (X) {
                  const G = document.createRange();
                  G.setStartAfter(X), G.collapse(!0), P.removeAllRanges(), P.addRange(G);
                }
              }
            } else if (b.key === "ArrowRight" && k.endOffset === z.textContent.length) {
              b.preventDefault();
              const X = z.closest(".input-wrapper").nextElementSibling;
              if (X) {
                const G = document.createRange();
                G.setStartBefore(X), G.collapse(!0), P.removeAllRanges(), P.addRange(G);
              }
            }
          }
        }
      }
    }, R = (b) => {
      const S = o.elements.find((T) => T.id === b);
      if (!S)
        return;
      const $ = i.value.querySelector(`[data-id="${b}"]`);
      if (!$)
        return;
      let E;
      S.type === "select" ? (E = document.createElement("select"), S.options.forEach((T) => {
        const P = document.createElement("option");
        P.value = T.value, P.textContent = T.label, E.appendChild(P);
      }), E.value = S.value) : (E = document.createElement("input"), E.type = S.type || "text", E.value = S.value), E.dataset.id = b, $.replaceWith(E), E.focus();
    }, H = Ct("");
    function U() {
      let b = "";
      o.elements.forEach((S) => {
        const $ = ce(S);
        b += $ + " ";
      }), i.value.innerHTML = b, H.value = c(b);
    }
    ti(() => {
      o.showTemplate && U(), i.value.addEventListener("input", ($) => {
        const E = $.target;
        (E.tagName === "SELECT" || E.tagName === "INPUT" || E.classList.contains("editable-div")) && a(i.value.innerHTML);
      }), i.value.querySelectorAll(".editable-div").forEach(($) => {
        $.textContent.trim() === "" ? ($.classList.add("showing-placeholder"), $.innerHTML !== "" && ($.innerHTML = "")) : $.classList.remove("showing-placeholder");
      }), i.value.addEventListener("input", ($) => {
        const E = $.target;
        E.classList && E.classList.contains("editable-div") && (E.textContent.trim() === "" ? E.classList.add("showing-placeholder") : E.classList.remove("showing-placeholder"));
      }), i.value.addEventListener("click", ($) => {
        const E = $.target.closest(".select-trigger");
        if (E) {
          const P = E.closest(".custom-select");
          if (P.classList.toggle("open"), P.classList.contains("open")) {
            const k = P.querySelector(".select-options");
            if (k) {
              const W = E.getBoundingClientRect();
              k.style.top = `${W.bottom}px`, k.style.left = `${W.left}px`, k.style.width = `${Math.max(W.width, 120)}px`;
              const z = k.offsetHeight || 200, de = window.innerHeight;
              W.bottom + z > de && (k.style.top = `${W.top - z}px`);
            }
          }
        }
        const T = $.target.closest(".select-option");
        if (T) {
          const P = T.closest(".custom-select"), k = P.querySelector(".select-trigger");
          T.dataset.value;
          const W = T.textContent;
          P.querySelectorAll(".select-option").forEach((z) => {
            z.classList.remove("selected");
          }), T.classList.add("selected"), k.textContent = W, k.classList.remove("showing-placeholder"), P.classList.remove("open"), a(i.value.innerHTML);
        }
      }), document.addEventListener("click", ($) => {
        $.target.closest(".custom-select") || i.value.querySelectorAll(".custom-select").forEach((E) => {
          E.classList.remove("open");
        });
      }), i.value.addEventListener("click", ($) => {
        const E = $.target.closest(".input-wrapper");
        if (E && !$.target.classList.contains("editable-div")) {
          const T = E.querySelector(".editable-div");
          if (T) {
            $.preventDefault(), T.focus();
            const P = window.getSelection(), k = document.createRange();
            T.lastChild && T.lastChild.nodeType === Node.TEXT_NODE ? k.setStart(T.lastChild, T.lastChild.textContent.length) : k.setStart(T, T.childNodes.length), k.collapse(!0), P.removeAllRanges(), P.addRange(k);
          }
        }
      }), i.value.addEventListener("focusin", ($) => {
        const E = $.target;
        if (E.classList && E.classList.contains("editable-div")) {
          const T = E.closest(".input-wrapper");
          T && (T.setAttribute("contenteditable", "false"), $.stopPropagation());
        }
      }), i.value.addEventListener("focusout", ($) => {
        const E = $.target;
        if (E.classList && E.classList.contains("editable-div")) {
          const T = E.closest(".input-wrapper");
          T && setTimeout(() => {
            document.activeElement !== E && T.setAttribute("contenteditable", "true");
          }, 200);
        }
      }), i.value.addEventListener("keydown", ($) => {
        if ($.key === "Backspace") {
          const E = $.target;
          if (E.classList && E.classList.contains("editable-div")) {
            const T = E.closest(".input-wrapper");
            T && E.textContent.length <= 1 && T.setAttribute("contenteditable", "true");
          }
        }
      });
      const S = ($) => {
        $.target.classList && $.target.classList.contains("editable-div") && $.stopPropagation();
      };
      document.addEventListener("click", S, !0), _n(() => {
        document.removeEventListener("click", S, !0);
      }), _e();
    }), _n(() => {
      window.editorObserver && (window.editorObserver.disconnect(), window.editorObserver = null);
    }), sn(() => o.elements, (b) => {
      console.log("newVal", b), o.showTemplate && U();
    });
    const ce = (b) => {
      if (b.type === "plaintext")
        return b.value;
      if (b.type === "select") {
        const S = b.value && b.options.some((E) => E.value === b.value), $ = S ? b.options.find((E) => E.value === b.value).label : b.placeholder || "请选择";
        return `<span class="select-wrapper" data-id="${b.id}" contenteditable="false">
      <div class="custom-select">
        <div class="select-trigger ${S ? "" : "showing-placeholder"}" 
             data-placeholder="${b.placeholder || "请选择"}">${$}</div>
        <ul class="select-options">
          ${b.options.map(
          (E) => `<li class="select-option${E.value === b.value ? " selected" : ""}" 
                data-value="${E.value}">${E.label}</li>`
        ).join("")}
        </ul>
      </div>
    </span>`;
      } else {
        if (b.type === "date")
          return `<span class="input-wrapper" data-id="${b.id}" contenteditable="false">
      <input type="${b.type || "text"}" value="${b.value}" >
    </span>`;
        if (b.type === "text") {
          const S = !b.value || b.value.trim() === "";
          return `<span class="input-wrapper" data-id="${b.id}" contenteditable="true">
      <div class="editable-div ${S ? "showing-placeholder" : ""}" contenteditable="true" data-placeholder="${b.placeholder || ""}">${b.value || ""}</div>
    </span>`;
        }
      }
    };
    t({
      clearInput: () => {
        i.value.innerHTML = "", l.value = "", H.value = "", a("");
      },
      initialText: H
    });
    const _e = () => {
      window.editorObserver || (window.editorObserver = new MutationObserver(() => {
        a(i.value.innerHTML);
      }), window.editorObserver.observe(i.value, {
        childList: !0,
        subtree: !0,
        characterData: !0,
        attributes: !0
      }));
    }, Q = document.createElement("style");
    return Q.textContent = `
  .editable-div.showing-placeholder:empty::before {
    content: attr(data-placeholder);
    color: rgba(0, 115, 229, 0.45);
    pointer-events: none;
  }
`, document.head.appendChild(Q), (b, S) => (Fl(), kl("div", {
      class: "rich-editor",
      ref_key: "editor",
      ref: i,
      contenteditable: "true",
      onInput: m,
      onClick: p,
      onKeydown: [
        v,
        Rc(d, ["enter"])
      ],
      "data-placeholder": "即刻开启创作之旅！输入需求，例如：我想要一篇[宣传文案]，主题为[智能手表]，面向[年轻群体]，风格[小红书风格]。涵盖[产品设计]、[健康监测功能]等要点。更多优质模板，点击下方即可挑选"
    }, null, 544));
  }
}), bi = /* @__PURE__ */ kc(Uc, [["__scopeId", "data-v-f0219748"]]), vi = (e = {}) => {
  const t = document.createElement("div");
  document.body.appendChild(t);
  let n = null;
  const o = Ic({
    render() {
      return ic(bi, {
        elements: e.elements || [],
        showTemplate: e.showTemplate || !1,
        submit: e.submit,
        ref: (r) => {
          n = r, e.ref && typeof e.ref == "function" && e.ref(r);
        },
        onClose: () => {
          o.unmount(), t.remove();
        }
      });
    }
  });
  return o.mount(t), {
    close: () => {
      o.unmount(), t.remove();
    },
    instance: n
  };
}, Kc = [bi], gr = {
  install(e) {
    Kc.forEach((t) => {
      e.component(t.name, t);
    }), e.config.globalProperties.$inputTemplate = vi;
  }
};
if (typeof window < "u") {
  const e = window.Vue || window.vue || (window.Vue = {});
  window.InputTemplates = gr, e.use && e.use(gr), window.$inputTemplate = vi;
}
export {
  vi as $inputTemplate,
  bi as InputTemplate,
  gr as default
};
