var nr = {};
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ss(e, t) {
  const o = new Set(e.split(","));
  return t ? (r) => o.has(r.toLowerCase()) : (r) => o.has(r);
}
const tt = nr.NODE_ENV !== "production" ? Object.freeze({}) : {}, is = nr.NODE_ENV !== "production" ? Object.freeze([]) : [], Ct = () => {
}, ns = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), J = Object.assign, as = Object.prototype.hasOwnProperty, b = (e, t) => as.call(e, t), S = Array.isArray, It = (e) => be(e) === "[object Map]", ls = (e) => be(e) === "[object Set]", D = (e) => typeof e == "function", W = (e) => typeof e == "string", we = (e) => typeof e == "symbol", H = (e) => e !== null && typeof e == "object", cs = (e) => (H(e) || D(e)) && D(e.then) && D(e.catch), hs = Object.prototype.toString, be = (e) => hs.call(e), ar = (e) => be(e).slice(8, -1), us = (e) => be(e) === "[object Object]", no = (e) => W(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, lr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (o) => t[o] || (t[o] = e(o));
}, cr = lr((e) => e.charAt(0).toUpperCase() + e.slice(1)), ps = lr((e) => e ? `on${cr(e)}` : ""), vt = (e, t) => !Object.is(e, t), fs = (e, t, o) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: o
  });
};
let Eo;
const hr = () => Eo || (Eo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Pe(e) {
  if (S(e)) {
    const t = {};
    for (let o = 0; o < e.length; o++) {
      const r = e[o], s = W(r) ? ms(r) : Pe(r);
      if (s)
        for (const i in s)
          t[i] = s[i];
    }
    return t;
  } else if (W(e) || H(e))
    return e;
}
const ds = /;(?![^(]*\))/g, vs = /:([^]+)/, gs = /\/\*[^]*?\*\//g;
function ms(e) {
  const t = {};
  return e.replace(gs, "").split(ds).forEach((o) => {
    if (o) {
      const r = o.split(vs);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function j(e) {
  let t = "";
  if (W(e))
    t = e;
  else if (S(e))
    for (let o = 0; o < e.length; o++) {
      const r = j(e[o]);
      r && (t += r + " ");
    }
  else if (H(e))
    for (const o in e)
      e[o] && (t += o + " ");
  return t.trim();
}
var Y = {};
function Mt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ys;
function Ts(e, t = ys) {
  t && t.active && t.effects.push(e);
}
let St;
class ur {
  constructor(t, o, r, s) {
    this.fn = t, this.trigger = o, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Ts(this, s);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Ee();
      for (let t = 0; t < this._depsLength; t++) {
        const o = this.deps[t];
        if (o.computed && (Ss(o.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), xe();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = ft, o = St;
    try {
      return ft = !0, St = this, this._runnings++, xo(this), this.fn();
    } finally {
      Mo(this), this._runnings--, St = o, ft = t;
    }
  }
  stop() {
    var t;
    this.active && (xo(this), Mo(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function Ss(e) {
  return e.value;
}
function xo(e) {
  e._trackId++, e._depsLength = 0;
}
function Mo(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      pr(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function pr(e, t) {
  const o = e.get(t);
  o !== void 0 && t._trackId !== o && (e.delete(t), e.size === 0 && e.cleanup());
}
let ft = !0, Ue = 0;
const fr = [];
function Ee() {
  fr.push(ft), ft = !1;
}
function xe() {
  const e = fr.pop();
  ft = e === void 0 ? !0 : e;
}
function ao() {
  Ue++;
}
function lo() {
  for (Ue--; !Ue && Ke.length; )
    Ke.shift()();
}
function dr(e, t, o) {
  var r;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const s = e.deps[e._depsLength];
    s !== t ? (s && pr(s, e), e.deps[e._depsLength++] = t) : e._depsLength++, Y.NODE_ENV !== "production" && ((r = e.onTrack) == null || r.call(e, J({ effect: e }, o)));
  }
}
const Ke = [];
function vr(e, t, o) {
  var r;
  ao();
  for (const s of e.keys()) {
    let i;
    s._dirtyLevel < t && (i ?? (i = e.get(s) === s._trackId)) && (s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0), s._dirtyLevel = t), s._shouldSchedule && (i ?? (i = e.get(s) === s._trackId)) && (Y.NODE_ENV !== "production" && ((r = s.onTrigger) == null || r.call(s, J({ effect: s }, o))), s.trigger(), (!s._runnings || s.allowRecurse) && s._dirtyLevel !== 2 && (s._shouldSchedule = !1, s.scheduler && Ke.push(s.scheduler)));
  }
  lo();
}
const gr = (e, t) => {
  const o = /* @__PURE__ */ new Map();
  return o.cleanup = e, o.computed = t, o;
}, je = /* @__PURE__ */ new WeakMap(), kt = Symbol(Y.NODE_ENV !== "production" ? "iterate" : ""), qe = Symbol(Y.NODE_ENV !== "production" ? "Map key iterate" : "");
function A(e, t, o) {
  if (ft && St) {
    let r = je.get(e);
    r || je.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(o);
    s || r.set(o, s = gr(() => r.delete(o))), dr(
      St,
      s,
      Y.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: o
      } : void 0
    );
  }
}
function dt(e, t, o, r, s, i) {
  const n = je.get(e);
  if (!n)
    return;
  let a = [];
  if (t === "clear")
    a = [...n.values()];
  else if (o === "length" && S(e)) {
    const c = Number(r);
    n.forEach((l, u) => {
      (u === "length" || !we(u) && u >= c) && a.push(l);
    });
  } else
    switch (o !== void 0 && a.push(n.get(o)), t) {
      case "add":
        S(e) ? no(o) && a.push(n.get("length")) : (a.push(n.get(kt)), It(e) && a.push(n.get(qe)));
        break;
      case "delete":
        S(e) || (a.push(n.get(kt)), It(e) && a.push(n.get(qe)));
        break;
      case "set":
        It(e) && a.push(n.get(kt));
        break;
    }
  ao();
  for (const c of a)
    c && vr(
      c,
      4,
      Y.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: o,
        newValue: r,
        oldValue: s,
        oldTarget: i
      } : void 0
    );
  lo();
}
const ks = /* @__PURE__ */ ss("__proto__,__v_isRef,__isVue"), mr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(we)
), Oo = /* @__PURE__ */ ws();
function ws() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...o) {
      const r = y(this);
      for (let i = 0, n = this.length; i < n; i++)
        A(r, "get", i + "");
      const s = r[t](...o);
      return s === -1 || s === !1 ? r[t](...o.map(y)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...o) {
      Ee(), ao();
      const r = y(this)[t].apply(this, o);
      return lo(), xe(), r;
    };
  }), e;
}
function bs(e) {
  const t = y(this);
  return A(t, "has", e), t.hasOwnProperty(e);
}
class yr {
  constructor(t = !1, o = !1) {
    this._isReadonly = t, this._isShallow = o;
  }
  get(t, o, r) {
    const s = this._isReadonly, i = this._isShallow;
    if (o === "__v_isReactive")
      return !s;
    if (o === "__v_isReadonly")
      return s;
    if (o === "__v_isShallow")
      return i;
    if (o === "__v_raw")
      return r === (s ? i ? br : wr : i ? Hs : kr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const n = S(t);
    if (!s) {
      if (n && b(Oo, o))
        return Reflect.get(Oo, o, r);
      if (o === "hasOwnProperty")
        return bs;
    }
    const a = Reflect.get(t, o, r);
    return (we(o) ? mr.has(o) : ks(o)) || (s || A(t, "get", o), i) ? a : L(a) ? n && no(o) ? a : a.value : H(a) ? s ? Er(a) : Pr(a) : a;
  }
}
class Ps extends yr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, o, r, s) {
    let i = t[o];
    if (!this._isShallow) {
      const c = gt(i);
      if (!bt(r) && !gt(r) && (i = y(i), r = y(r)), !S(t) && L(i) && !L(r))
        return c ? !1 : (i.value = r, !0);
    }
    const n = S(t) && no(o) ? Number(o) < t.length : b(t, o), a = Reflect.set(t, o, r, s);
    return t === y(s) && (n ? vt(r, i) && dt(t, "set", o, r, i) : dt(t, "add", o, r)), a;
  }
  deleteProperty(t, o) {
    const r = b(t, o), s = t[o], i = Reflect.deleteProperty(t, o);
    return i && r && dt(t, "delete", o, void 0, s), i;
  }
  has(t, o) {
    const r = Reflect.has(t, o);
    return (!we(o) || !mr.has(o)) && A(t, "has", o), r;
  }
  ownKeys(t) {
    return A(
      t,
      "iterate",
      S(t) ? "length" : kt
    ), Reflect.ownKeys(t);
  }
}
class Tr extends yr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, o) {
    return Y.NODE_ENV !== "production" && Mt(
      `Set operation on key "${String(o)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, o) {
    return Y.NODE_ENV !== "production" && Mt(
      `Delete operation on key "${String(o)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Es = /* @__PURE__ */ new Ps(), xs = /* @__PURE__ */ new Tr(), Ms = /* @__PURE__ */ new Tr(!0), co = (e) => e, Me = (e) => Reflect.getPrototypeOf(e);
function Qt(e, t, o = !1, r = !1) {
  e = e.__v_raw;
  const s = y(e), i = y(t);
  o || (vt(t, i) && A(s, "get", t), A(s, "get", i));
  const { has: n } = Me(s), a = r ? co : o ? po : Kt;
  if (n.call(s, t))
    return a(e.get(t));
  if (n.call(s, i))
    return a(e.get(i));
  e !== s && e.get(t);
}
function Jt(e, t = !1) {
  const o = this.__v_raw, r = y(o), s = y(e);
  return t || (vt(e, s) && A(r, "has", e), A(r, "has", s)), e === s ? o.has(e) : o.has(e) || o.has(s);
}
function $t(e, t = !1) {
  return e = e.__v_raw, !t && A(y(e), "iterate", kt), Reflect.get(e, "size", e);
}
function Do(e) {
  e = y(e);
  const t = y(this);
  return Me(t).has.call(t, e) || (t.add(e), dt(t, "add", e, e)), this;
}
function Yo(e, t) {
  t = y(t);
  const o = y(this), { has: r, get: s } = Me(o);
  let i = r.call(o, e);
  i ? Y.NODE_ENV !== "production" && Sr(o, r, e) : (e = y(e), i = r.call(o, e));
  const n = s.call(o, e);
  return o.set(e, t), i ? vt(t, n) && dt(o, "set", e, t, n) : dt(o, "add", e, t), this;
}
function Co(e) {
  const t = y(this), { has: o, get: r } = Me(t);
  let s = o.call(t, e);
  s ? Y.NODE_ENV !== "production" && Sr(t, o, e) : (e = y(e), s = o.call(t, e));
  const i = r ? r.call(t, e) : void 0, n = t.delete(e);
  return s && dt(t, "delete", e, void 0, i), n;
}
function Bo() {
  const e = y(this), t = e.size !== 0, o = Y.NODE_ENV !== "production" ? It(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && dt(e, "clear", void 0, void 0, o), r;
}
function te(e, t) {
  return function(r, s) {
    const i = this, n = i.__v_raw, a = y(n), c = t ? co : e ? po : Kt;
    return !e && A(a, "iterate", kt), n.forEach((l, u) => r.call(s, c(l), c(u), i));
  };
}
function ee(e, t, o) {
  return function(...r) {
    const s = this.__v_raw, i = y(s), n = It(i), a = e === "entries" || e === Symbol.iterator && n, c = e === "keys" && n, l = s[e](...r), u = o ? co : t ? po : Kt;
    return !t && A(
      i,
      "iterate",
      c ? qe : kt
    ), {
      // iterator protocol
      next() {
        const { value: h, done: p } = l.next();
        return p ? { value: h, done: p } : {
          value: a ? [u(h[0]), u(h[1])] : u(h),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function lt(e) {
  return function(...t) {
    if (Y.NODE_ENV !== "production") {
      const o = t[0] ? `on key "${t[0]}" ` : "";
      Mt(
        `${cr(e)} operation ${o}failed: target is readonly.`,
        y(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Os() {
  const e = {
    get(i) {
      return Qt(this, i);
    },
    get size() {
      return $t(this);
    },
    has: Jt,
    add: Do,
    set: Yo,
    delete: Co,
    clear: Bo,
    forEach: te(!1, !1)
  }, t = {
    get(i) {
      return Qt(this, i, !1, !0);
    },
    get size() {
      return $t(this);
    },
    has: Jt,
    add: Do,
    set: Yo,
    delete: Co,
    clear: Bo,
    forEach: te(!1, !0)
  }, o = {
    get(i) {
      return Qt(this, i, !0);
    },
    get size() {
      return $t(this, !0);
    },
    has(i) {
      return Jt.call(this, i, !0);
    },
    add: lt("add"),
    set: lt("set"),
    delete: lt("delete"),
    clear: lt("clear"),
    forEach: te(!0, !1)
  }, r = {
    get(i) {
      return Qt(this, i, !0, !0);
    },
    get size() {
      return $t(this, !0);
    },
    has(i) {
      return Jt.call(this, i, !0);
    },
    add: lt("add"),
    set: lt("set"),
    delete: lt("delete"),
    clear: lt("clear"),
    forEach: te(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = ee(
      i,
      !1,
      !1
    ), o[i] = ee(
      i,
      !0,
      !1
    ), t[i] = ee(
      i,
      !1,
      !0
    ), r[i] = ee(
      i,
      !0,
      !0
    );
  }), [
    e,
    o,
    t,
    r
  ];
}
const [
  Ds,
  Ys,
  Cs,
  Bs
] = /* @__PURE__ */ Os();
function ho(e, t) {
  const o = t ? e ? Bs : Cs : e ? Ys : Ds;
  return (r, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(
    b(o, s) && s in r ? o : r,
    s,
    i
  );
}
const Xs = {
  get: /* @__PURE__ */ ho(!1, !1)
}, Is = {
  get: /* @__PURE__ */ ho(!0, !1)
}, Ns = {
  get: /* @__PURE__ */ ho(!0, !0)
};
function Sr(e, t, o) {
  const r = y(o);
  if (r !== o && t.call(e, r)) {
    const s = ar(e);
    Mt(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const kr = /* @__PURE__ */ new WeakMap(), Hs = /* @__PURE__ */ new WeakMap(), wr = /* @__PURE__ */ new WeakMap(), br = /* @__PURE__ */ new WeakMap();
function _s(e) {
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
function Rs(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : _s(ar(e));
}
function Pr(e) {
  return gt(e) ? e : uo(
    e,
    !1,
    Es,
    Xs,
    kr
  );
}
function Er(e) {
  return uo(
    e,
    !0,
    xs,
    Is,
    wr
  );
}
function oe(e) {
  return uo(
    e,
    !0,
    Ms,
    Ns,
    br
  );
}
function uo(e, t, o, r, s) {
  if (!H(e))
    return Y.NODE_ENV !== "production" && Mt(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const n = Rs(e);
  if (n === 0)
    return e;
  const a = new Proxy(
    e,
    n === 2 ? r : o
  );
  return s.set(e, a), a;
}
function wt(e) {
  return gt(e) ? wt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function gt(e) {
  return !!(e && e.__v_isReadonly);
}
function bt(e) {
  return !!(e && e.__v_isShallow);
}
function Ge(e) {
  return wt(e) || gt(e);
}
function y(e) {
  const t = e && e.__v_raw;
  return t ? y(t) : e;
}
function As(e) {
  return Object.isExtensible(e) && fs(e, "__v_skip", !0), e;
}
const Kt = (e) => H(e) ? Pr(e) : e, po = (e) => H(e) ? Er(e) : e, zs = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class xr {
  constructor(t, o, r, s) {
    this.getter = t, this._setter = o, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new ur(
      () => t(this._value),
      () => pe(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r;
  }
  get value() {
    const t = y(this);
    return (!t._cacheable || t.effect.dirty) && vt(t._value, t._value = t.effect.run()) && pe(t, 4), Mr(t), t.effect._dirtyLevel >= 2 && (Y.NODE_ENV !== "production" && this._warnRecursive && Mt(zs, `

getter: `, this.getter), pe(t, 2)), t._value;
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
function Fs(e, t, o = !1) {
  let r, s;
  const i = D(e);
  i ? (r = e, s = Y.NODE_ENV !== "production" ? () => {
    Mt("Write operation failed: computed value is readonly");
  } : Ct) : (r = e.get, s = e.set);
  const n = new xr(r, s, i || !s, o);
  return Y.NODE_ENV !== "production" && t && !o && (n.effect.onTrack = t.onTrack, n.effect.onTrigger = t.onTrigger), n;
}
function Mr(e) {
  var t;
  ft && St && (e = y(e), dr(
    St,
    (t = e.dep) != null ? t : e.dep = gr(
      () => e.dep = void 0,
      e instanceof xr ? e : void 0
    ),
    Y.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function pe(e, t = 4, o) {
  e = y(e);
  const r = e.dep;
  r && vr(
    r,
    t,
    Y.NODE_ENV !== "production" ? {
      target: e,
      type: "set",
      key: "value",
      newValue: o
    } : void 0
  );
}
function L(e) {
  return !!(e && e.__v_isRef === !0);
}
function K(e) {
  return Ls(e, !1);
}
function Ls(e, t) {
  return L(e) ? e : new Vs(e, t);
}
class Vs {
  constructor(t, o) {
    this.__v_isShallow = o, this.dep = void 0, this.__v_isRef = !0, this._rawValue = o ? t : y(t), this._value = o ? t : Kt(t);
  }
  get value() {
    return Mr(this), this._value;
  }
  set value(t) {
    const o = this.__v_isShallow || bt(t) || gt(t);
    t = o ? t : y(t), vt(t, this._rawValue) && (this._rawValue = t, this._value = o ? t : Kt(t), pe(this, 4, t));
  }
}
function Or(e) {
  return L(e) ? e.value : e;
}
const Ws = {
  get: (e, t, o) => Or(Reflect.get(e, t, o)),
  set: (e, t, o, r) => {
    const s = e[t];
    return L(s) && !L(o) ? (s.value = o, !0) : Reflect.set(e, t, o, r);
  }
};
function Us(e) {
  return wt(e) ? e : new Proxy(e, Ws);
}
var m = {};
const Pt = [];
function Ks(e) {
  Pt.push(e);
}
function js() {
  Pt.pop();
}
function w(e, ...t) {
  Ee();
  const o = Pt.length ? Pt[Pt.length - 1].component : null, r = o && o.appContext.config.warnHandler, s = qs();
  if (r)
    Et(
      r,
      o,
      11,
      [
        e + t.map((i) => {
          var n, a;
          return (a = (n = i.toString) == null ? void 0 : n.call(i)) != null ? a : JSON.stringify(i);
        }).join(""),
        o && o.proxy,
        s.map(
          ({ vnode: i }) => `at <${Lr(o, i.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const i = [`[Vue warn]: ${e}`, ...t];
    s.length && i.push(`
`, ...Gs(s)), console.warn(...i);
  }
  xe();
}
function qs() {
  let e = Pt[Pt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const o = t[0];
    o && o.vnode === e ? o.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function Gs(e) {
  const t = [];
  return e.forEach((o, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Zs(o));
  }), t;
}
function Zs({ vnode: e, recurseCount: t }) {
  const o = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${Lr(
    e.component,
    e.type,
    r
  )}`, i = ">" + o;
  return e.props ? [s, ...Qs(e.props), i] : [s + i];
}
function Qs(e) {
  const t = [], o = Object.keys(e);
  return o.slice(0, 3).forEach((r) => {
    t.push(...Dr(r, e[r]));
  }), o.length > 3 && t.push(" ..."), t;
}
function Dr(e, t, o) {
  return W(t) ? (t = JSON.stringify(t), o ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? o ? t : [`${e}=${t}`] : L(t) ? (t = Dr(e, y(t.value), !0), o ? t : [`${e}=Ref<`, t, ">"]) : D(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = y(t), o ? t : [`${e}=`, t]);
}
const fo = {
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
function Et(e, t, o, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    vo(s, t, o);
  }
}
function Vt(e, t, o, r) {
  if (D(e)) {
    const i = Et(e, t, o, r);
    return i && cs(i) && i.catch((n) => {
      vo(n, t, o);
    }), i;
  }
  const s = [];
  for (let i = 0; i < e.length; i++)
    s.push(Vt(e[i], t, o, r));
  return s;
}
function vo(e, t, o, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const n = t.proxy, a = m.NODE_ENV !== "production" ? fo[o] : `https://vuejs.org/error-reference/#runtime-${o}`;
    for (; i; ) {
      const l = i.ec;
      if (l) {
        for (let u = 0; u < l.length; u++)
          if (l[u](e, n, a) === !1)
            return;
      }
      i = i.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      Et(
        c,
        null,
        10,
        [e, n, a]
      );
      return;
    }
  }
  Js(e, o, s, r);
}
function Js(e, t, o, r = !0) {
  if (m.NODE_ENV !== "production") {
    const s = fo[t];
    if (o && Ks(o), w(`Unhandled error${s ? ` during execution of ${s}` : ""}`), o && js(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let ge = !1, Ze = !1;
const q = [];
let ut = 0;
const Nt = [];
let rt = null, ht = 0;
const Yr = /* @__PURE__ */ Promise.resolve();
let go = null;
const $s = 100;
function Qe(e) {
  const t = go || Yr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ti(e) {
  let t = ut + 1, o = q.length;
  for (; t < o; ) {
    const r = t + o >>> 1, s = q[r], i = jt(s);
    i < e || i === e && s.pre ? t = r + 1 : o = r;
  }
  return t;
}
function mo(e) {
  (!q.length || !q.includes(
    e,
    ge && e.allowRecurse ? ut + 1 : ut
  )) && (e.id == null ? q.push(e) : q.splice(ti(e.id), 0, e), Cr());
}
function Cr() {
  !ge && !Ze && (Ze = !0, go = Yr.then(Xr));
}
function Br(e) {
  S(e) ? Nt.push(...e) : (!rt || !rt.includes(
    e,
    e.allowRecurse ? ht + 1 : ht
  )) && Nt.push(e), Cr();
}
function ei(e) {
  if (Nt.length) {
    const t = [...new Set(Nt)].sort(
      (o, r) => jt(o) - jt(r)
    );
    if (Nt.length = 0, rt) {
      rt.push(...t);
      return;
    }
    for (rt = t, m.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ht = 0; ht < rt.length; ht++)
      m.NODE_ENV !== "production" && Ir(e, rt[ht]) || rt[ht]();
    rt = null, ht = 0;
  }
}
const jt = (e) => e.id == null ? 1 / 0 : e.id, oi = (e, t) => {
  const o = jt(e) - jt(t);
  if (o === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return o;
};
function Xr(e) {
  Ze = !1, ge = !0, m.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), q.sort(oi);
  const t = m.NODE_ENV !== "production" ? (o) => Ir(e, o) : Ct;
  try {
    for (ut = 0; ut < q.length; ut++) {
      const o = q[ut];
      if (o && o.active !== !1) {
        if (m.NODE_ENV !== "production" && t(o))
          continue;
        Et(o, null, 14);
      }
    }
  } finally {
    ut = 0, q.length = 0, ei(e), ge = !1, go = null, (q.length || Nt.length) && Xr(e);
  }
}
function Ir(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const o = e.get(t);
    if (o > $s) {
      const r = t.ownerInstance, s = r && Fr(r.type);
      return vo(
        `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, o + 1);
  }
}
const zt = /* @__PURE__ */ new Set();
m.NODE_ENV !== "production" && (hr().__VUE_HMR_RUNTIME__ = {
  createRecord: Ie(ri),
  rerender: Ie(si),
  reload: Ie(ii)
});
const me = /* @__PURE__ */ new Map();
function ri(e, t) {
  return me.has(e) ? !1 : (me.set(e, {
    initialDef: Wt(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Wt(e) {
  return Vr(e) ? e.__vccOpts : e;
}
function si(e, t) {
  const o = me.get(e);
  o && (o.initialDef.render = t, [...o.instances].forEach((r) => {
    t && (r.render = t, Wt(r.type).render = t), r.renderCache = [], r.effect.dirty = !0, r.update();
  }));
}
function ii(e, t) {
  const o = me.get(e);
  if (!o)
    return;
  t = Wt(t), Xo(o.initialDef, t);
  const r = [...o.instances];
  for (const s of r) {
    const i = Wt(s.type);
    zt.has(i) || (i !== o.initialDef && Xo(i, t), zt.add(i)), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (zt.add(i), s.ceReload(t.styles), zt.delete(i)) : s.parent ? (s.parent.effect.dirty = !0, mo(s.parent.update)) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Br(() => {
    for (const s of r)
      zt.delete(
        Wt(s.type)
      );
  });
}
function Xo(e, t) {
  J(e, t);
  for (const o in e)
    o !== "__file" && !(o in t) && delete e[o];
}
function Ie(e) {
  return (t, o) => {
    try {
      return e(t, o);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let et = null, ni = null;
const ai = Symbol.for("v-ndc"), li = (e) => e.__isSuspense;
function ci(e, t) {
  t && t.pendingBranch ? S(e) ? t.effects.push(...e) : t.effects.push(e) : Br(e);
}
const hi = Symbol.for("v-scx"), ui = () => {
  {
    const e = Pi(hi);
    return e || m.NODE_ENV !== "production" && w(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
}, re = {};
function pi(e, t, {
  immediate: o,
  deep: r,
  flush: s,
  once: i,
  onTrack: n,
  onTrigger: a
} = tt) {
  if (t && i) {
    const g = t;
    t = (...At) => {
      g(...At), at();
    };
  }
  m.NODE_ENV !== "production" && r !== void 0 && typeof r == "number" && w(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), m.NODE_ENV !== "production" && !t && (o !== void 0 && w(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && w(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && w(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = (g) => {
    w(
      "Invalid watch source: ",
      g,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, l = Dt, u = (g) => r === !0 ? g : (
    // for deep: false, only traverse root-level properties
    Bt(g, r === !1 ? 1 : void 0)
  );
  let h, p = !1, f = !1;
  if (L(e) ? (h = () => e.value, p = bt(e)) : wt(e) ? (h = () => u(e), p = !0) : S(e) ? (f = !0, p = e.some((g) => wt(g) || bt(g)), h = () => e.map((g) => {
    if (L(g))
      return g.value;
    if (wt(g))
      return u(g);
    if (D(g))
      return Et(g, l, 2);
    m.NODE_ENV !== "production" && c(g);
  })) : D(e) ? t ? h = () => Et(e, l, 2) : h = () => (d && d(), Vt(
    e,
    l,
    3,
    [T]
  )) : (h = Ct, m.NODE_ENV !== "production" && c(e)), t && r) {
    const g = h;
    h = () => Bt(g());
  }
  let d, T = (g) => {
    d = X.onStop = () => {
      Et(g, l, 4), d = X.onStop = void 0;
    };
  }, _;
  if (Oe)
    if (T = Ct, t ? o && Vt(t, l, 3, [
      h(),
      f ? [] : void 0,
      T
    ]) : h(), s === "sync") {
      const g = ui();
      _ = g.__watcherHandles || (g.__watcherHandles = []);
    } else
      return Ct;
  let z = f ? new Array(e.length).fill(re) : re;
  const U = () => {
    if (!(!X.active || !X.dirty))
      if (t) {
        const g = X.run();
        (r || p || (f ? g.some((At, qt) => vt(At, z[qt])) : vt(g, z))) && (d && d(), Vt(t, l, 3, [
          g,
          // pass undefined as the old value when it's changed for the first time
          z === re ? void 0 : f && z[0] === re ? [] : z,
          T
        ]), z = g);
      } else
        X.run();
  };
  U.allowRecurse = !!t;
  let nt;
  s === "sync" ? nt = U : s === "post" ? nt = () => Fo(U, l && l.suspense) : (U.pre = !0, l && (U.id = l.uid), nt = () => mo(U));
  const X = new ur(h, Ct, nt), at = () => {
    X.stop();
  };
  return m.NODE_ENV !== "production" && (X.onTrack = n, X.onTrigger = a), t ? o ? U() : z = X.run() : s === "post" ? Fo(
    X.run.bind(X),
    l && l.suspense
  ) : X.run(), _ && _.push(at), at;
}
function fi(e, t, o) {
  const r = this.proxy, s = W(e) ? e.includes(".") ? di(r, e) : () => r[e] : e.bind(r, r);
  let i;
  D(t) ? i = t : (i = t.handler, o = t);
  const n = zr(this), a = pi(s, i.bind(r), o);
  return n(), a;
}
function di(e, t) {
  const o = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < o.length && r; s++)
      r = r[o[s]];
    return r;
  };
}
function Bt(e, t, o = 0, r) {
  if (!H(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (o >= t)
      return e;
    o++;
  }
  if (r = r || /* @__PURE__ */ new Set(), r.has(e))
    return e;
  if (r.add(e), L(e))
    Bt(e.value, t, o, r);
  else if (S(e))
    for (let s = 0; s < e.length; s++)
      Bt(e[s], t, o, r);
  else if (ls(e) || It(e))
    e.forEach((s) => {
      Bt(s, t, o, r);
    });
  else if (us(e))
    for (const s in e)
      Bt(e[s], t, o, r);
  return e;
}
function Io(e, t) {
  return m.NODE_ENV !== "production" && w("withDirectives can only be used inside render functions."), e;
}
function vi(e, t, o = Dt, r = !1) {
  if (o) {
    const s = o[e] || (o[e] = []), i = t.__weh || (t.__weh = (...n) => {
      if (o.isUnmounted)
        return;
      Ee();
      const a = zr(o), c = Vt(t, o, e, n);
      return a(), xe(), c;
    });
    return r ? s.unshift(i) : s.push(i), i;
  } else if (m.NODE_ENV !== "production") {
    const s = ps(fo[e].replace(/ hook$/, ""));
    w(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const gi = (e) => (t, o = Dt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Oe || e === "sp") && vi(e, (...r) => t(...r), o)
), mi = gi("m");
function No(e, t, o, r) {
  let s;
  const i = o && o[r];
  if (S(e) || W(e)) {
    s = new Array(e.length);
    for (let n = 0, a = e.length; n < a; n++)
      s[n] = t(e[n], n, void 0, i && i[n]);
  } else if (typeof e == "number") {
    m.NODE_ENV !== "production" && !Number.isInteger(e) && w(`The v-for range expect an integer value but got ${e}.`), s = new Array(e);
    for (let n = 0; n < e; n++)
      s[n] = t(n + 1, n, void 0, i && i[n]);
  } else if (H(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (n, a) => t(n, a, void 0, i && i[a])
      );
    else {
      const n = Object.keys(e);
      s = new Array(n.length);
      for (let a = 0, c = n.length; a < c; a++) {
        const l = n[a];
        s[a] = t(e[l], l, a, i && i[a]);
      }
    }
  else
    s = [];
  return o && (o[r] = s), s;
}
const Je = (e) => e ? Ni(e) ? Hi(e) || e.proxy : Je(e.parent) : null, Ut = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ J(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => m.NODE_ENV !== "production" ? oe(e.props) : e.props,
    $attrs: (e) => m.NODE_ENV !== "production" ? oe(e.attrs) : e.attrs,
    $slots: (e) => m.NODE_ENV !== "production" ? oe(e.slots) : e.slots,
    $refs: (e) => m.NODE_ENV !== "production" ? oe(e.refs) : e.refs,
    $parent: (e) => Je(e.parent),
    $root: (e) => Je(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Si(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, mo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Qe.bind(e.proxy)),
    $watch: (e) => fi.bind(e)
  })
), yi = (e) => e === "_" || e === "$", Ne = (e, t) => e !== tt && !e.__isScriptSetup && b(e, t), Ti = {
  get({ _: e }, t) {
    const { ctx: o, setupState: r, data: s, props: i, accessCache: n, type: a, appContext: c } = e;
    if (m.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let l;
    if (t[0] !== "$") {
      const f = n[t];
      if (f !== void 0)
        switch (f) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return o[t];
          case 3:
            return i[t];
        }
      else {
        if (Ne(r, t))
          return n[t] = 1, r[t];
        if (s !== tt && b(s, t))
          return n[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (l = e.propsOptions[0]) && b(l, t)
        )
          return n[t] = 3, i[t];
        if (o !== tt && b(o, t))
          return n[t] = 4, o[t];
        n[t] = 0;
      }
    }
    const u = Ut[t];
    let h, p;
    if (u)
      return (t === "$attrs" || m.NODE_ENV !== "production" && t === "$slots") && A(e, "get", t), u(e);
    if (
      // css module (injected by vue-loader)
      (h = a.__cssModules) && (h = h[t])
    )
      return h;
    if (o !== tt && b(o, t))
      return n[t] = 4, o[t];
    if (
      // global properties
      p = c.config.globalProperties, b(p, t)
    )
      return p[t];
    m.NODE_ENV !== "production" && et && (!W(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== tt && yi(t[0]) && b(s, t) ? w(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === et && w(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, o) {
    const { data: r, setupState: s, ctx: i } = e;
    return Ne(s, t) ? (s[t] = o, !0) : m.NODE_ENV !== "production" && s.__isScriptSetup && b(s, t) ? (w(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== tt && b(r, t) ? (r[t] = o, !0) : b(e.props, t) ? (m.NODE_ENV !== "production" && w(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (m.NODE_ENV !== "production" && w(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (m.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(i, t, {
      enumerable: !0,
      configurable: !0,
      value: o
    }) : i[t] = o, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: o, ctx: r, appContext: s, propsOptions: i }
  }, n) {
    let a;
    return !!o[n] || e !== tt && b(e, n) || Ne(t, n) || (a = i[0]) && b(a, n) || b(r, n) || b(Ut, n) || b(s.config.globalProperties, n);
  },
  defineProperty(e, t, o) {
    return o.get != null ? e._.accessCache[t] = 0 : b(o, "value") && this.set(e, t, o.value, null), Reflect.defineProperty(e, t, o);
  }
};
m.NODE_ENV !== "production" && (Ti.ownKeys = (e) => (w(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Ho(e) {
  return S(e) ? e.reduce(
    (t, o) => (t[o] = null, t),
    {}
  ) : e;
}
function Si(e) {
  const t = e.type, { mixins: o, extends: r } = t, {
    mixins: s,
    optionsCache: i,
    config: { optionMergeStrategies: n }
  } = e.appContext, a = i.get(t);
  let c;
  return a ? c = a : !s.length && !o && !r ? c = t : (c = {}, s.length && s.forEach(
    (l) => ye(c, l, n, !0)
  ), ye(c, t, n)), H(t) && i.set(t, c), c;
}
function ye(e, t, o, r = !1) {
  const { mixins: s, extends: i } = t;
  i && ye(e, i, o, !0), s && s.forEach(
    (n) => ye(e, n, o, !0)
  );
  for (const n in t)
    if (r && n === "expose")
      m.NODE_ENV !== "production" && w(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const a = ki[n] || o && o[n];
      e[n] = a ? a(e[n], t[n]) : t[n];
    }
  return e;
}
const ki = {
  data: _o,
  props: Ao,
  emits: Ao,
  // objects
  methods: Lt,
  computed: Lt,
  // lifecycle
  beforeCreate: N,
  created: N,
  beforeMount: N,
  mounted: N,
  beforeUpdate: N,
  updated: N,
  beforeDestroy: N,
  beforeUnmount: N,
  destroyed: N,
  unmounted: N,
  activated: N,
  deactivated: N,
  errorCaptured: N,
  serverPrefetch: N,
  // assets
  components: Lt,
  directives: Lt,
  // watch
  watch: bi,
  // provide / inject
  provide: _o,
  inject: wi
};
function _o(e, t) {
  return t ? e ? function() {
    return J(
      D(e) ? e.call(this, this) : e,
      D(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function wi(e, t) {
  return Lt(Ro(e), Ro(t));
}
function Ro(e) {
  if (S(e)) {
    const t = {};
    for (let o = 0; o < e.length; o++)
      t[e[o]] = e[o];
    return t;
  }
  return e;
}
function N(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Lt(e, t) {
  return e ? J(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ao(e, t) {
  return e ? S(e) && S(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : J(
    /* @__PURE__ */ Object.create(null),
    Ho(e),
    Ho(t ?? {})
  ) : t;
}
function bi(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const o = J(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    o[r] = N(e[r], t[r]);
  return o;
}
let zo = null;
function Pi(e, t, o = !1) {
  const r = Dt || et;
  if (r || zo) {
    const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : zo._context.provides;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return o && D(t) ? t.call(r && r.proxy) : t;
    m.NODE_ENV !== "production" && w(`injection "${String(e)}" not found.`);
  } else
    m.NODE_ENV !== "production" && w("inject() can only be used inside setup() or functional components.");
}
const Fo = ci, Ei = (e) => e.__isTeleport, Te = Symbol.for("v-fgt"), xi = Symbol.for("v-txt"), $e = Symbol.for("v-cmt"), fe = [];
let G = null;
function ct(e = !1) {
  fe.push(G = e ? null : []);
}
function Mi() {
  fe.pop(), G = fe[fe.length - 1] || null;
}
function Nr(e) {
  return e.dynamicChildren = G || is, Mi(), G && G.push(e), e;
}
function Tt(e, t, o, r, s, i) {
  return Nr(
    V(
      e,
      t,
      o,
      r,
      s,
      i,
      !0
    )
  );
}
function Oi(e, t, o, r, s) {
  return Nr(
    yo(
      e,
      t,
      o,
      r,
      s,
      !0
    )
  );
}
function Di(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Yi = (...e) => Rr(
  ...e
), Hr = "__vInternal", _r = ({ key: e }) => e ?? null, de = ({
  ref: e,
  ref_key: t,
  ref_for: o
}) => (typeof e == "number" && (e = "" + e), e != null ? W(e) || L(e) || D(e) ? { i: et, r: e, k: t, f: !!o } : e : null);
function V(e, t = null, o = null, r = 0, s = null, i = e === Te ? 0 : 1, n = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && _r(t),
    ref: t && de(t),
    scopeId: ni,
    slotScopeIds: null,
    children: o,
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
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: et
  };
  return a ? (To(c, o), i & 128 && e.normalize(c)) : o && (c.shapeFlag |= W(o) ? 8 : 16), m.NODE_ENV !== "production" && c.key !== c.key && w("VNode created with invalid key (NaN). VNode type:", c.type), // avoid a block node from tracking itself
  !n && // has current parent block
  G && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && G.push(c), c;
}
const yo = m.NODE_ENV !== "production" ? Yi : Rr;
function Rr(e, t = null, o = null, r = 0, s = null, i = !1) {
  if ((!e || e === ai) && (m.NODE_ENV !== "production" && !e && w(`Invalid vnode type when creating vnode: ${e}.`), e = $e), Di(e)) {
    const a = Se(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return o && To(a, o), !i && G && (a.shapeFlag & 6 ? G[G.indexOf(e)] = a : G.push(a)), a.patchFlag |= -2, a;
  }
  if (Vr(e) && (e = e.__vccOpts), t) {
    t = Ci(t);
    let { class: a, style: c } = t;
    a && !W(a) && (t.class = j(a)), H(c) && (Ge(c) && !S(c) && (c = J({}, c)), t.style = Pe(c));
  }
  const n = W(e) ? 1 : li(e) ? 128 : Ei(e) ? 64 : H(e) ? 4 : D(e) ? 2 : 0;
  return m.NODE_ENV !== "production" && n & 4 && Ge(e) && (e = y(e), w(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), V(
    e,
    t,
    o,
    r,
    s,
    n,
    i,
    !0
  );
}
function Ci(e) {
  return e ? Ge(e) || Hr in e ? J({}, e) : e : null;
}
function Se(e, t, o = !1) {
  const { props: r, ref: s, patchFlag: i, children: n } = e, a = t ? Xi(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && _r(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      o && s ? S(s) ? s.concat(de(t)) : [s, de(t)] : de(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: m.NODE_ENV !== "production" && i === -1 && S(n) ? n.map(Ar) : n,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Te ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && Se(e.ssContent),
    ssFallback: e.ssFallback && Se(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Ar(e) {
  const t = Se(e);
  return S(e.children) && (t.children = e.children.map(Ar)), t;
}
function Bi(e = " ", t = 0) {
  return yo(xi, null, e, t);
}
function Lo(e = "", t = !1) {
  return t ? (ct(), Oi($e, null, e)) : yo($e, null, e);
}
function To(e, t) {
  let o = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (S(t))
    o = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), To(e, s()), s._c && (s._d = !0));
      return;
    } else {
      o = 32;
      const s = t._;
      !s && !(Hr in t) ? t._ctx = et : s === 3 && et && (et.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    D(t) ? (t = { default: t, _ctx: et }, o = 32) : (t = String(t), r & 64 ? (o = 16, t = [Bi(t)]) : o = 8);
  e.children = t, e.shapeFlag |= o;
}
function Xi(...e) {
  const t = {};
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = j([t.class, r.class]));
      else if (s === "style")
        t.style = Pe([t.style, r.style]);
      else if (ns(s)) {
        const i = t[s], n = r[s];
        n && i !== n && !(S(i) && i.includes(n)) && (t[s] = i ? [].concat(i, n) : n);
      } else
        s !== "" && (t[s] = r[s]);
  }
  return t;
}
let Dt = null;
const Ii = () => Dt || et;
let to;
{
  const e = hr(), t = (o, r) => {
    let s;
    return (s = e[o]) || (s = e[o] = []), s.push(r), (i) => {
      s.length > 1 ? s.forEach((n) => n(i)) : s[0](i);
    };
  };
  to = t(
    "__VUE_INSTANCE_SETTERS__",
    (o) => Dt = o
  ), t(
    "__VUE_SSR_SETTERS__",
    (o) => Oe = o
  );
}
const zr = (e) => {
  const t = Dt;
  return to(e), e.scope.on(), () => {
    e.scope.off(), to(t);
  };
};
function Ni(e) {
  return e.vnode.shapeFlag & 4;
}
let Oe = !1;
function Hi(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Us(As(e.exposed)), {
      get(t, o) {
        if (o in t)
          return t[o];
        if (o in Ut)
          return Ut[o](e);
      },
      has(t, o) {
        return o in t || o in Ut;
      }
    }));
}
const _i = /(?:^|[-_])(\w)/g, Ri = (e) => e.replace(_i, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Fr(e, t = !0) {
  return D(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Lr(e, t, o = !1) {
  let r = Fr(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (i) => {
      for (const n in i)
        if (i[n] === t)
          return n;
    };
    r = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return r ? Ri(r) : o ? "App" : "Anonymous";
}
function Vr(e) {
  return D(e) && "__vccOpts" in e;
}
const Vo = (e, t) => {
  const o = Fs(e, t, Oe);
  if (m.NODE_ENV !== "production") {
    const r = Ii();
    r && r.appContext.config.warnRecursiveComputed && (o._warnRecursive = !0);
  }
  return o;
};
function Ai() {
  if (m.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, o = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, s = {
    header(h) {
      return H(h) ? h.__isVue ? ["div", e, "VueInstance"] : L(h) ? [
        "div",
        {},
        ["span", e, u(h)],
        "<",
        a(h.value),
        ">"
      ] : wt(h) ? [
        "div",
        {},
        ["span", e, bt(h) ? "ShallowReactive" : "Reactive"],
        "<",
        a(h),
        `>${gt(h) ? " (readonly)" : ""}`
      ] : gt(h) ? [
        "div",
        {},
        ["span", e, bt(h) ? "ShallowReadonly" : "Readonly"],
        "<",
        a(h),
        ">"
      ] : null : null;
    },
    hasBody(h) {
      return h && h.__isVue;
    },
    body(h) {
      if (h && h.__isVue)
        return [
          "div",
          {},
          ...i(h.$)
        ];
    }
  };
  function i(h) {
    const p = [];
    h.type.props && h.props && p.push(n("props", y(h.props))), h.setupState !== tt && p.push(n("setup", h.setupState)), h.data !== tt && p.push(n("data", y(h.data)));
    const f = c(h, "computed");
    f && p.push(n("computed", f));
    const d = c(h, "inject");
    return d && p.push(n("injected", d)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: h }]
    ]), p;
  }
  function n(h, p) {
    return p = J({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        h
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((f) => [
          "div",
          {},
          ["span", r, f + ": "],
          a(p[f], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(h, p = !0) {
    return typeof h == "number" ? ["span", t, h] : typeof h == "string" ? ["span", o, JSON.stringify(h)] : typeof h == "boolean" ? ["span", r, h] : H(h) ? ["object", { object: p ? y(h) : h }] : ["span", o, String(h)];
  }
  function c(h, p) {
    const f = h.type;
    if (D(f))
      return;
    const d = {};
    for (const T in h.ctx)
      l(f, T, p) && (d[T] = h.ctx[T]);
    return d;
  }
  function l(h, p, f) {
    const d = h[f];
    if (S(d) && d.includes(p) || H(d) && p in d || h.extends && l(h.extends, p, f) || h.mixins && h.mixins.some((T) => l(T, p, f)))
      return !0;
  }
  function u(h) {
    return bt(h) ? "ShallowRef" : h.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
var zi = {};
const Wr = Symbol("_vod"), Fi = Symbol("_vsh"), eo = {
  beforeMount(e, { value: t }, { transition: o }) {
    e[Wr] = e.style.display === "none" ? "" : e.style.display, o && t ? o.beforeEnter(e) : Ft(e, t);
  },
  mounted(e, { value: t }, { transition: o }) {
    o && t && o.enter(e);
  },
  updated(e, { value: t, oldValue: o }, { transition: r }) {
    !t != !o && (r ? t ? (r.beforeEnter(e), Ft(e, !0), r.enter(e)) : r.leave(e, () => {
      Ft(e, !1);
    }) : Ft(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Ft(e, t);
  }
};
zi.NODE_ENV !== "production" && (eo.name = "show");
function Ft(e, t) {
  e.style.display = t ? e[Wr] : "none", e[Fi] = !t;
}
const Li = ["ctrl", "shift", "alt", "meta"], Vi = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Li.some((o) => e[`${o}Key`] && !t.includes(o))
}, He = (e, t) => {
  const o = e._withMods || (e._withMods = {}), r = t.join(".");
  return o[r] || (o[r] = (s, ...i) => {
    for (let n = 0; n < t.length; n++) {
      const a = Vi[t[n]];
      if (a && a(s, t))
        return;
    }
    return e(s, ...i);
  });
};
var Wi = {};
function Ui() {
  Ai();
}
Wi.NODE_ENV !== "production" && Ui();
const Ki = "data:image/png;base64,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", ji = "data:image/png;base64,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";
/*!
 * better-scroll / better-scroll
 * (c) 2016-2023 ustbhuangyi
 * Released under the MIT License.
 */
/*! *****************************************************************************
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
var oo = function(e, t) {
  return oo = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, r) {
    o.__proto__ = r;
  } || function(o, r) {
    for (var s in r)
      Object.prototype.hasOwnProperty.call(r, s) && (o[s] = r[s]);
  }, oo(e, t);
};
function De(e, t) {
  oo(e, t);
  function o() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (o.prototype = t.prototype, new o());
}
var Q = function() {
  return Q = Object.assign || function(t) {
    for (var o, r = 1, s = arguments.length; r < s; r++) {
      o = arguments[r];
      for (var i in o)
        Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i]);
    }
    return t;
  }, Q.apply(this, arguments);
};
function _e(e, t, o, r) {
  function s(i) {
    return i instanceof o ? i : new o(function(n) {
      n(i);
    });
  }
  return new (o || (o = Promise))(function(i, n) {
    function a(u) {
      try {
        l(r.next(u));
      } catch (h) {
        n(h);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (h) {
        n(h);
      }
    }
    function l(u) {
      u.done ? i(u.value) : s(u.value).then(a, c);
    }
    l((r = r.apply(e, t || [])).next());
  });
}
function Re(e, t) {
  var o = { label: 0, sent: function() {
    if (i[0] & 1)
      throw i[1];
    return i[1];
  }, trys: [], ops: [] }, r, s, i, n;
  return n = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (n[Symbol.iterator] = function() {
    return this;
  }), n;
  function a(l) {
    return function(u) {
      return c([l, u]);
    };
  }
  function c(l) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; o; )
      try {
        if (r = 1, s && (i = l[0] & 2 ? s.return : l[0] ? s.throw || ((i = s.return) && i.call(s), 0) : s.next) && !(i = i.call(s, l[1])).done)
          return i;
        switch (s = 0, i && (l = [l[0] & 2, i.value]), l[0]) {
          case 0:
          case 1:
            i = l;
            break;
          case 4:
            return o.label++, { value: l[1], done: !1 };
          case 5:
            o.label++, s = l[1], l = [0];
            continue;
          case 7:
            l = o.ops.pop(), o.trys.pop();
            continue;
          default:
            if (i = o.trys, !(i = i.length > 0 && i[i.length - 1]) && (l[0] === 6 || l[0] === 2)) {
              o = 0;
              continue;
            }
            if (l[0] === 3 && (!i || l[1] > i[0] && l[1] < i[3])) {
              o.label = l[1];
              break;
            }
            if (l[0] === 6 && o.label < i[1]) {
              o.label = i[1], i = l;
              break;
            }
            if (i && o.label < i[2]) {
              o.label = i[2], o.ops.push(l);
              break;
            }
            i[2] && o.ops.pop(), o.trys.pop();
            continue;
        }
        l = t.call(e, o);
      } catch (u) {
        l = [6, u], s = 0;
      } finally {
        r = i = 0;
      }
    if (l[0] & 5)
      throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}
function ke() {
  for (var e = 0, t = 0, o = arguments.length; t < o; t++)
    e += arguments[t].length;
  for (var r = Array(e), s = 0, t = 0; t < o; t++)
    for (var i = arguments[t], n = 0, a = i.length; n < a; n++, s++)
      r[s] = i[n];
  return r;
}
var qi = [
  {
    sourceKey: "scroller.scrollBehaviorX.currentPos",
    key: "x"
  },
  {
    sourceKey: "scroller.scrollBehaviorY.currentPos",
    key: "y"
  },
  {
    sourceKey: "scroller.scrollBehaviorX.hasScroll",
    key: "hasHorizontalScroll"
  },
  {
    sourceKey: "scroller.scrollBehaviorY.hasScroll",
    key: "hasVerticalScroll"
  },
  {
    sourceKey: "scroller.scrollBehaviorX.contentSize",
    key: "scrollerWidth"
  },
  {
    sourceKey: "scroller.scrollBehaviorY.contentSize",
    key: "scrollerHeight"
  },
  {
    sourceKey: "scroller.scrollBehaviorX.maxScrollPos",
    key: "maxScrollX"
  },
  {
    sourceKey: "scroller.scrollBehaviorY.maxScrollPos",
    key: "maxScrollY"
  },
  {
    sourceKey: "scroller.scrollBehaviorX.minScrollPos",
    key: "minScrollX"
  },
  {
    sourceKey: "scroller.scrollBehaviorY.minScrollPos",
    key: "minScrollY"
  },
  {
    sourceKey: "scroller.scrollBehaviorX.movingDirection",
    key: "movingDirectionX"
  },
  {
    sourceKey: "scroller.scrollBehaviorY.movingDirection",
    key: "movingDirectionY"
  },
  {
    sourceKey: "scroller.scrollBehaviorX.direction",
    key: "directionX"
  },
  {
    sourceKey: "scroller.scrollBehaviorY.direction",
    key: "directionY"
  },
  {
    sourceKey: "scroller.actions.enabled",
    key: "enabled"
  },
  {
    sourceKey: "scroller.animater.pending",
    key: "pending"
  },
  {
    sourceKey: "scroller.animater.stop",
    key: "stop"
  },
  {
    sourceKey: "scroller.scrollTo",
    key: "scrollTo"
  },
  {
    sourceKey: "scroller.scrollBy",
    key: "scrollBy"
  },
  {
    sourceKey: "scroller.scrollToElement",
    key: "scrollToElement"
  },
  {
    sourceKey: "scroller.resetPosition",
    key: "resetPosition"
  }
];
function Z(e) {
  console.error("[BScroll warn]: " + e);
}
function Wo(e, t) {
  if (!e)
    throw new Error("[BScroll] " + t);
}
var ot = typeof window < "u", _t = ot && navigator.userAgent.toLowerCase(), Gi = !!(_t && /wechatdevtools/.test(_t)), Zi = _t && _t.indexOf("android") > 0, Qi = function() {
  if (typeof _t == "string") {
    var e = /os (\d\d?_\d(_\d)?)/, t = e.exec(_t);
    if (!t)
      return !1;
    var o = t[1].split("_").map(function(r) {
      return parseInt(r, 10);
    });
    return o[0] === 13 && o[1] >= 4;
  }
  return !1;
}(), Ur = !1;
if (ot) {
  var Ji = "test-passive";
  try {
    var Uo = {};
    Object.defineProperty(Uo, "passive", {
      get: function() {
        Ur = !0;
      }
    }), window.addEventListener(Ji, function() {
    }, Uo);
  } catch {
  }
}
function F() {
  return window.performance && window.performance.now && window.performance.timing ? window.performance.now() + window.performance.timing.navigationStart : +/* @__PURE__ */ new Date();
}
var B = function(e, t) {
  for (var o in t)
    e[o] = t[o];
  return e;
};
function ro(e) {
  return e == null;
}
function $i(e, t) {
  return Math.sqrt(e * e + t * t);
}
function P(e, t, o) {
  return e < t ? t : e > o ? o : e;
}
function Xt(e, t) {
  if (e.findIndex)
    return e.findIndex(t);
  var o = -1;
  return e.some(function(r, s, i) {
    var n = t(r, s, i);
    if (n)
      return o = s, n;
  }), o;
}
var So = ot && document.createElement("div").style, Ht = function() {
  if (!ot)
    return !1;
  for (var e = [
    {
      key: "standard",
      value: "transform"
    },
    {
      key: "webkit",
      value: "webkitTransform"
    },
    {
      key: "Moz",
      value: "MozTransform"
    },
    {
      key: "O",
      value: "OTransform"
    },
    {
      key: "ms",
      value: "msTransform"
    }
  ], t = 0, o = e; t < o.length; t++) {
    var r = o[t];
    if (So[r.value] !== void 0)
      return r.key;
  }
  return !1;
}();
function st(e) {
  return Ht === !1 ? e : Ht === "standard" ? e === "transitionEnd" ? "transitionend" : e : Ht + e.charAt(0).toUpperCase() + e.substr(1);
}
function Kr(e) {
  return typeof e == "string" ? document.querySelector(e) : e;
}
function tn(e, t, o, r) {
  var s = Ur ? {
    passive: !1,
    capture: !!r
  } : !!r;
  e.addEventListener(t, o, s);
}
function en(e, t, o, r) {
  e.removeEventListener(t, o, {
    capture: !!r
  });
}
function xt(e) {
  e.cancelable && e.preventDefault();
}
function Ko(e) {
  for (var t = 0, o = 0; e; )
    t -= e.offsetLeft, o -= e.offsetTop, e = e.offsetParent;
  return {
    left: t,
    top: o
  };
}
function on(e) {
  var t = e.getBoundingClientRect();
  return {
    left: -(t.left + window.pageXOffset),
    top: -(t.top + window.pageYOffset)
  };
}
var rn = Ht && Ht !== "standard" ? "-" + Ht.toLowerCase() + "-" : "", sn = st("transform"), jr = st("transition"), nn = ot && st("perspective") in So, jo = ot && ("ontouchstart" in window || Gi), an = ot && jr in So, k = {
  transform: sn,
  transition: jr,
  transitionTimingFunction: st("transitionTimingFunction"),
  transitionDuration: st("transitionDuration"),
  transitionDelay: st("transitionDelay"),
  transformOrigin: st("transformOrigin"),
  transitionEnd: st("transitionEnd"),
  transitionProperty: st("transitionProperty")
}, Ae = {
  touchstart: 1,
  touchmove: 1,
  touchend: 1,
  touchcancel: 1,
  mousedown: 2,
  mousemove: 2,
  mouseup: 2
};
function Ot(e) {
  if (e instanceof window.SVGElement) {
    var t = e.getBoundingClientRect();
    return {
      top: t.top,
      left: t.left,
      width: t.width,
      height: t.height
    };
  } else
    return {
      top: e.offsetTop,
      left: e.offsetLeft,
      width: e.offsetWidth,
      height: e.offsetHeight
    };
}
function Rt(e, t) {
  for (var o in t)
    if (t[o].test(e[o]))
      return !0;
  return !1;
}
var ln = Rt;
function cn(e, t) {
  var o = document.createEvent("Event");
  o.initEvent(t, !0, !0), o.pageX = e.pageX, o.pageY = e.pageY, e.target.dispatchEvent(o);
}
function qr(e, t) {
  t === void 0 && (t = "click");
  var o;
  e.type === "mouseup" ? o = e : (e.type === "touchend" || e.type === "touchcancel") && (o = e.changedTouches[0]);
  var r = {};
  o && (r.screenX = o.screenX || 0, r.screenY = o.screenY || 0, r.clientX = o.clientX || 0, r.clientY = o.clientY || 0);
  var s, i = !0, n = !0, a = e.ctrlKey, c = e.shiftKey, l = e.altKey, u = e.metaKey, h = {
    ctrlKey: a,
    shiftKey: c,
    altKey: l,
    metaKey: u
  };
  if (typeof MouseEvent < "u")
    try {
      s = new MouseEvent(t, B(Q({
        bubbles: i,
        cancelable: n
      }, h), r));
    } catch {
      p();
    }
  else
    p();
  function p() {
    s = document.createEvent("Event"), s.initEvent(t, i, n), B(s, r);
  }
  s.forwardedTouchEvent = !0, s._constructed = !0, e.target.dispatchEvent(s);
}
function hn(e) {
  qr(e, "dblclick");
}
function un(e, t) {
  var o = t.firstChild;
  o ? pn(e, o) : t.appendChild(e);
}
function pn(e, t) {
  var o = t.parentNode;
  o.insertBefore(e, t);
}
function fn(e, t) {
  e.removeChild(t);
}
function se(e, t) {
  var o = new RegExp("(^|\\s)" + t + "(\\s|$)");
  return o.test(e.className);
}
function dn(e) {
  return Array.prototype.slice.call(e, 0);
}
function vn(e) {
  return {
    width: e.clientWidth,
    height: e.clientHeight
  };
}
var C = {
  // easeOutQuint
  swipe: {
    style: "cubic-bezier(0.23, 1, 0.32, 1)",
    fn: function(e) {
      return 1 + --e * e * e * e * e;
    }
  },
  // easeOutQuard
  swipeBounce: {
    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fn: function(e) {
      return e * (2 - e);
    }
  },
  // easeOutQuart
  bounce: {
    style: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    fn: function(e) {
      return 1 - --e * e * e * e;
    }
  }
}, gn = 1e3 / 60, pt = ot && window;
function Gr() {
}
var ko = function() {
  return ot ? pt.requestAnimationFrame || pt.webkitRequestAnimationFrame || pt.mozRequestAnimationFrame || pt.oRequestAnimationFrame || // if all else fails, use setTimeout
  function(e) {
    return window.setTimeout(e, e.interval || gn);
  } : Gr;
}(), mt = function() {
  return ot ? pt.cancelAnimationFrame || pt.webkitCancelAnimationFrame || pt.mozCancelAnimationFrame || pt.oCancelAnimationFrame || function(e) {
    window.clearTimeout(e);
  } : Gr;
}(), qo = function(e) {
}, ze = {
  enumerable: !0,
  configurable: !0,
  get: qo,
  set: qo
}, mn = function(e, t) {
  for (var o = t.split("."), r = 0; r < o.length - 1; r++)
    if (e = e[o[r]], typeof e != "object" || !e)
      return;
  var s = o.pop();
  return typeof e[s] == "function" ? function() {
    return e[s].apply(e, arguments);
  } : e[s];
}, yn = function(e, t, o) {
  for (var r = t.split("."), s, i = 0; i < r.length - 1; i++)
    s = r[i], e[s] || (e[s] = {}), e = e[s];
  e[r.pop()] = o;
};
function Tn(e, t, o) {
  ze.get = function() {
    return mn(this, t);
  }, ze.set = function(s) {
    yn(this, t, s);
  }, Object.defineProperty(e, o, ze);
}
var it = (
  /** @class */
  function() {
    function e(t) {
      this.events = {}, this.eventTypes = {}, this.registerType(t);
    }
    return e.prototype.on = function(t, o, r) {
      return r === void 0 && (r = this), this.hasType(t), this.events[t] || (this.events[t] = []), this.events[t].push([o, r]), this;
    }, e.prototype.once = function(t, o, r) {
      var s = this;
      r === void 0 && (r = this), this.hasType(t);
      var i = function() {
        for (var n = [], a = 0; a < arguments.length; a++)
          n[a] = arguments[a];
        s.off(t, i);
        var c = o.apply(r, n);
        if (c === !0)
          return c;
      };
      return i.fn = o, this.on(t, i), this;
    }, e.prototype.off = function(t, o) {
      if (!t && !o)
        return this.events = {}, this;
      if (t) {
        if (this.hasType(t), !o)
          return this.events[t] = [], this;
        var r = this.events[t];
        if (!r)
          return this;
        for (var s = r.length; s--; )
          (r[s][0] === o || r[s][0] && r[s][0].fn === o) && r.splice(s, 1);
        return this;
      }
    }, e.prototype.trigger = function(t) {
      for (var o = [], r = 1; r < arguments.length; r++)
        o[r - 1] = arguments[r];
      this.hasType(t);
      var s = this.events[t];
      if (s)
        for (var i = s.length, n = ke(s), a, c = 0; c < i; c++) {
          var l = n[c], u = l[0], h = l[1];
          if (u && (a = u.apply(h, o), a === !0))
            return a;
        }
    }, e.prototype.registerType = function(t) {
      var o = this;
      t.forEach(function(r) {
        o.eventTypes[r] = r;
      });
    }, e.prototype.destroy = function() {
      this.events = {}, this.eventTypes = {};
    }, e.prototype.hasType = function(t) {
      var o = this.eventTypes, r = o[t] === t;
      r || Z('EventEmitter has used unknown event type: "' + t + '", should be oneof [' + ("" + Object.keys(o).map(function(s) {
        return JSON.stringify(s);
      })) + "]");
    }, e;
  }()
), R = (
  /** @class */
  function() {
    function e(t, o) {
      this.wrapper = t, this.events = o, this.addDOMEvents();
    }
    return e.prototype.destroy = function() {
      this.removeDOMEvents(), this.events = [];
    }, e.prototype.addDOMEvents = function() {
      this.handleDOMEvents(tn);
    }, e.prototype.removeDOMEvents = function() {
      this.handleDOMEvents(en);
    }, e.prototype.handleDOMEvents = function(t) {
      var o = this, r = this.wrapper;
      this.events.forEach(function(s) {
        t(r, s.name, o, !!s.capture);
      });
    }, e.prototype.handleEvent = function(t) {
      var o = t.type;
      this.events.some(function(r) {
        return r.name === o ? (r.handler(t), !0) : !1;
      });
    }, e;
  }()
), Sn = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
    }
    return e;
  }()
), kn = (
  /** @class */
  function(e) {
    De(t, e);
    function t() {
      var o = e.call(this) || this;
      return o.startX = 0, o.startY = 0, o.scrollX = !1, o.scrollY = !0, o.freeScroll = !1, o.directionLockThreshold = 0, o.eventPassthrough = "", o.click = !1, o.dblclick = !1, o.tap = "", o.bounce = {
        top: !0,
        bottom: !0,
        left: !0,
        right: !0
      }, o.bounceTime = 800, o.momentum = !0, o.momentumLimitTime = 300, o.momentumLimitDistance = 15, o.swipeTime = 2500, o.swipeBounceTime = 500, o.deceleration = 15e-4, o.flickLimitTime = 200, o.flickLimitDistance = 100, o.resizePolling = 60, o.probeType = 0, o.stopPropagation = !1, o.preventDefault = !0, o.preventDefaultException = {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/
      }, o.tagException = {
        tagName: /^TEXTAREA$/
      }, o.HWCompositing = !0, o.useTransition = !0, o.bindToWrapper = !1, o.bindToTarget = !1, o.disableMouse = jo, o.disableTouch = !jo, o.autoBlur = !0, o.autoEndDistance = 5, o.outOfBoundaryDampingFactor = 1 / 3, o.specifiedIndexAsContent = 0, o.quadrant = 1, o;
    }
    return t.prototype.merge = function(o) {
      if (!o)
        return this;
      for (var r in o) {
        if (r === "bounce") {
          this.bounce = this.resolveBounce(o[r]);
          continue;
        }
        this[r] = o[r];
      }
      return this;
    }, t.prototype.process = function() {
      return this.translateZ = this.HWCompositing && nn ? " translateZ(1px)" : "", this.useTransition = this.useTransition && an, this.preventDefault = !this.eventPassthrough && this.preventDefault, this.scrollX = this.eventPassthrough === "horizontal" ? !1 : this.scrollX, this.scrollY = this.eventPassthrough === "vertical" ? !1 : this.scrollY, this.freeScroll = this.freeScroll && !this.eventPassthrough, this.scrollX = this.freeScroll ? !0 : this.scrollX, this.scrollY = this.freeScroll ? !0 : this.scrollY, this.directionLockThreshold = this.eventPassthrough ? 0 : this.directionLockThreshold, this;
    }, t.prototype.resolveBounce = function(o) {
      var r = {
        top: !0,
        right: !0,
        bottom: !0,
        left: !0
      }, s = {
        top: !1,
        right: !1,
        bottom: !1,
        left: !1
      }, i;
      return typeof o == "object" ? i = B(r, o) : i = o ? r : s, i;
    }, t;
  }(Sn)
), wn = (
  /** @class */
  function() {
    function e(t, o) {
      this.wrapper = t, this.options = o, this.hooks = new it([
        "beforeStart",
        "start",
        "move",
        "end",
        "click"
      ]), this.handleDOMEvents();
    }
    return e.prototype.handleDOMEvents = function() {
      var t = this.options, o = t.bindToWrapper, r = t.disableMouse, s = t.disableTouch, i = t.click, n = this.wrapper, a = o ? n : window, c = [], l = [], u = !s, h = !r;
      i && c.push({
        name: "click",
        handler: this.click.bind(this),
        capture: !0
      }), u && (c.push({
        name: "touchstart",
        handler: this.start.bind(this)
      }), l.push({
        name: "touchmove",
        handler: this.move.bind(this)
      }, {
        name: "touchend",
        handler: this.end.bind(this)
      }, {
        name: "touchcancel",
        handler: this.end.bind(this)
      })), h && (c.push({
        name: "mousedown",
        handler: this.start.bind(this)
      }), l.push({
        name: "mousemove",
        handler: this.move.bind(this)
      }, {
        name: "mouseup",
        handler: this.end.bind(this)
      })), this.wrapperEventRegister = new R(n, c), this.targetEventRegister = new R(a, l);
    }, e.prototype.beforeHandler = function(t, o) {
      var r = this.options, s = r.preventDefault, i = r.stopPropagation, n = r.preventDefaultException, a = {
        start: function() {
          return s && !Rt(t.target, n);
        },
        end: function() {
          return s && !Rt(t.target, n);
        },
        move: function() {
          return s;
        }
      };
      a[o]() && t.preventDefault(), i && t.stopPropagation();
    }, e.prototype.setInitiated = function(t) {
      t === void 0 && (t = 0), this.initiated = t;
    }, e.prototype.start = function(t) {
      var o = Ae[t.type];
      if (!(this.initiated && this.initiated !== o)) {
        if (this.setInitiated(o), ln(t.target, this.options.tagException)) {
          this.setInitiated();
          return;
        }
        if (!(o === 2 && t.button !== 0) && !this.hooks.trigger(this.hooks.eventTypes.beforeStart, t)) {
          this.beforeHandler(t, "start");
          var r = t.touches ? t.touches[0] : t;
          this.pointX = r.pageX, this.pointY = r.pageY, this.hooks.trigger(this.hooks.eventTypes.start, t);
        }
      }
    }, e.prototype.move = function(t) {
      if (Ae[t.type] === this.initiated) {
        this.beforeHandler(t, "move");
        var o = t.touches ? t.touches[0] : t, r = o.pageX - this.pointX, s = o.pageY - this.pointY;
        if (this.pointX = o.pageX, this.pointY = o.pageY, !this.hooks.trigger(this.hooks.eventTypes.move, {
          deltaX: r,
          deltaY: s,
          e: t
        })) {
          var i = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft, n = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop, a = this.pointX - i, c = this.pointY - n, l = this.options.autoEndDistance;
          (a > document.documentElement.clientWidth - l || c > document.documentElement.clientHeight - l || a < l || c < l) && this.end(t);
        }
      }
    }, e.prototype.end = function(t) {
      Ae[t.type] === this.initiated && (this.setInitiated(), this.beforeHandler(t, "end"), this.hooks.trigger(this.hooks.eventTypes.end, t));
    }, e.prototype.click = function(t) {
      this.hooks.trigger(this.hooks.eventTypes.click, t);
    }, e.prototype.setContent = function(t) {
      t !== this.wrapper && (this.wrapper = t, this.rebindDOMEvents());
    }, e.prototype.rebindDOMEvents = function() {
      this.wrapperEventRegister.destroy(), this.targetEventRegister.destroy(), this.handleDOMEvents();
    }, e.prototype.destroy = function() {
      this.wrapperEventRegister.destroy(), this.targetEventRegister.destroy(), this.hooks.destroy();
    }, e;
  }()
), Fe = {
  x: ["translateX", "px"],
  y: ["translateY", "px"]
}, bn = (
  /** @class */
  function() {
    function e(t) {
      this.setContent(t), this.hooks = new it(["beforeTranslate", "translate"]);
    }
    return e.prototype.getComputedPosition = function() {
      var t = window.getComputedStyle(this.content, null), o = t[k.transform].split(")")[0].split(", "), r = +(o[12] || o[4]) || 0, s = +(o[13] || o[5]) || 0;
      return {
        x: r,
        y: s
      };
    }, e.prototype.translate = function(t) {
      var o = [];
      Object.keys(t).forEach(function(r) {
        if (Fe[r]) {
          var s = Fe[r][0];
          if (s) {
            var i = Fe[r][1], n = t[r];
            o.push(s + "(" + n + i + ")");
          }
        }
      }), this.hooks.trigger(this.hooks.eventTypes.beforeTranslate, o, t), this.style[k.transform] = o.join(" "), this.hooks.trigger(this.hooks.eventTypes.translate, t);
    }, e.prototype.setContent = function(t) {
      this.content !== t && (this.content = t, this.style = t.style);
    }, e.prototype.destroy = function() {
      this.hooks.destroy();
    }, e;
  }()
), Zr = (
  /** @class */
  function() {
    function e(t, o, r) {
      this.translater = o, this.options = r, this.timer = 0, this.hooks = new it([
        "move",
        "end",
        "beforeForceStop",
        "forceStop",
        "callStop",
        "time",
        "timeFunction"
      ]), this.setContent(t);
    }
    return e.prototype.translate = function(t) {
      this.translater.translate(t);
    }, e.prototype.setPending = function(t) {
      this.pending = t;
    }, e.prototype.setForceStopped = function(t) {
      this.forceStopped = t;
    }, e.prototype.setCallStop = function(t) {
      this.callStopWhenPending = t;
    }, e.prototype.setContent = function(t) {
      this.content !== t && (this.content = t, this.style = t.style, this.stop());
    }, e.prototype.clearTimer = function() {
      this.timer && (mt(this.timer), this.timer = 0);
    }, e.prototype.destroy = function() {
      this.hooks.destroy(), mt(this.timer);
    }, e;
  }()
), Pn = function(e, t, o, r) {
  var s = function(l, u) {
    var h = l - u, p = h > 0 ? -1 : h < 0 ? 1 : 0;
    return p;
  }, i = s(t.x, e.x), n = s(t.y, e.y), a = o.x - r.x, c = o.y - r.y;
  return i * a <= 0 && n * c <= 0;
}, En = (
  /** @class */
  function(e) {
    De(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.startProbe = function(o, r) {
      var s = this, i = o, n = function() {
        var a = s.translater.getComputedPosition();
        Pn(o, r, a, i) && s.hooks.trigger(s.hooks.eventTypes.move, a), s.pending || (s.callStopWhenPending ? s.callStopWhenPending = !1 : s.hooks.trigger(s.hooks.eventTypes.end, a)), i = a, s.pending && (s.timer = ko(n));
      };
      this.callStopWhenPending && this.setCallStop(!1), mt(this.timer), n();
    }, t.prototype.transitionTime = function(o) {
      o === void 0 && (o = 0), this.style[k.transitionDuration] = o + "ms", this.hooks.trigger(this.hooks.eventTypes.time, o);
    }, t.prototype.transitionTimingFunction = function(o) {
      this.style[k.transitionTimingFunction] = o, this.hooks.trigger(this.hooks.eventTypes.timeFunction, o);
    }, t.prototype.transitionProperty = function() {
      this.style[k.transitionProperty] = k.transform;
    }, t.prototype.move = function(o, r, s, i) {
      this.setPending(s > 0), this.transitionTimingFunction(i), this.transitionProperty(), this.transitionTime(s), this.translate(r);
      var n = this.options.probeType === 3;
      s && n && this.startProbe(o, r), s || (this._reflow = this.content.offsetHeight, n && this.hooks.trigger(this.hooks.eventTypes.move, r), this.hooks.trigger(this.hooks.eventTypes.end, r));
    }, t.prototype.doStop = function() {
      var o = this.pending;
      if (this.setForceStopped(!1), this.setCallStop(!1), o) {
        this.setPending(!1), mt(this.timer);
        var r = this.translater.getComputedPosition(), s = r.x, i = r.y;
        this.transitionTime(), this.translate({ x: s, y: i }), this.setForceStopped(!0), this.setCallStop(!0), this.hooks.trigger(this.hooks.eventTypes.forceStop, { x: s, y: i });
      }
      return o;
    }, t.prototype.stop = function() {
      var o = this.doStop();
      o && this.hooks.trigger(this.hooks.eventTypes.callStop);
    }, t;
  }(Zr)
), xn = (
  /** @class */
  function(e) {
    De(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.prototype.move = function(o, r, s, i) {
      if (!s) {
        this.translate(r), this.options.probeType === 3 && this.hooks.trigger(this.hooks.eventTypes.move, r), this.hooks.trigger(this.hooks.eventTypes.end, r);
        return;
      }
      this.animate(o, r, s, i);
    }, t.prototype.animate = function(o, r, s, i) {
      var n = this, a = F(), c = a + s, l = this.options.probeType === 3, u = function() {
        var h = F();
        if (h >= c) {
          n.translate(r), l && n.hooks.trigger(n.hooks.eventTypes.move, r), n.hooks.trigger(n.hooks.eventTypes.end, r);
          return;
        }
        h = (h - a) / s;
        var p = i(h), f = {};
        Object.keys(r).forEach(function(d) {
          var T = o[d], _ = r[d];
          f[d] = (_ - T) * p + T;
        }), n.translate(f), l && n.hooks.trigger(n.hooks.eventTypes.move, f), n.pending && (n.timer = ko(u)), n.pending || (n.callStopWhenPending ? n.callStopWhenPending = !1 : n.hooks.trigger(n.hooks.eventTypes.end, r));
      };
      this.setPending(!0), this.callStopWhenPending && this.setCallStop(!1), mt(this.timer), u();
    }, t.prototype.doStop = function() {
      var o = this.pending;
      if (this.setForceStopped(!1), this.setCallStop(!1), o) {
        this.setPending(!1), mt(this.timer);
        var r = this.translater.getComputedPosition();
        this.setForceStopped(!0), this.setCallStop(!0), this.hooks.trigger(this.hooks.eventTypes.forceStop, r);
      }
      return o;
    }, t.prototype.stop = function() {
      var o = this.doStop();
      o && this.hooks.trigger(this.hooks.eventTypes.callStop);
    }, t;
  }(Zr)
);
function Mn(e, t, o) {
  var r = o.useTransition, s = {};
  return Object.defineProperty(s, "probeType", {
    enumerable: !0,
    configurable: !1,
    get: function() {
      return o.probeType;
    }
  }), r ? new En(e, t, s) : new xn(e, t, s);
}
var Go = (
  /** @class */
  function() {
    function e(t, o, r) {
      this.wrapper = t, this.options = r, this.hooks = new it([
        "beforeComputeBoundary",
        "computeBoundary",
        "momentum",
        "end",
        "ignoreHasScroll"
      ]), this.refresh(o);
    }
    return e.prototype.start = function() {
      this.dist = 0, this.setMovingDirection(
        0
        /* Default */
      ), this.setDirection(
        0
        /* Default */
      );
    }, e.prototype.move = function(t) {
      return t = this.hasScroll ? t : 0, this.setMovingDirection(t), this.performDampingAlgorithm(t, this.options.outOfBoundaryDampingFactor);
    }, e.prototype.setMovingDirection = function(t) {
      this.movingDirection = t > 0 ? -1 : t < 0 ? 1 : 0;
    }, e.prototype.setDirection = function(t) {
      this.direction = t > 0 ? -1 : t < 0 ? 1 : 0;
    }, e.prototype.performDampingAlgorithm = function(t, o) {
      var r = this.currentPos + t;
      return (r > this.minScrollPos || r < this.maxScrollPos) && (r > this.minScrollPos && this.options.bounces[0] || r < this.maxScrollPos && this.options.bounces[1] ? r = this.currentPos + t * o : r = r > this.minScrollPos ? this.minScrollPos : this.maxScrollPos), r;
    }, e.prototype.end = function(t) {
      var o = {
        duration: 0
      }, r = Math.abs(this.currentPos - this.startPos);
      if (this.options.momentum && t < this.options.momentumLimitTime && r > this.options.momentumLimitDistance) {
        var s = this.direction === -1 && this.options.bounces[0] || this.direction === 1 && this.options.bounces[1] ? this.wrapperSize : 0;
        o = this.hasScroll ? this.momentum(this.currentPos, this.startPos, t, this.maxScrollPos, this.minScrollPos, s, this.options) : { destination: this.currentPos, duration: 0 };
      } else
        this.hooks.trigger(this.hooks.eventTypes.end, o);
      return o;
    }, e.prototype.momentum = function(t, o, r, s, i, n, a) {
      a === void 0 && (a = this.options);
      var c = t - o, l = Math.abs(c) / r, u = a.deceleration, h = a.swipeBounceTime, p = a.swipeTime, f = Math.min(p, l * 2 / u), d = {
        destination: t + l * l / u * (c < 0 ? -1 : 1),
        duration: f,
        rate: 15
      };
      return this.hooks.trigger(this.hooks.eventTypes.momentum, d, c), d.destination < s ? (d.destination = n ? Math.max(s - n / 4, s - n / d.rate * l) : s, d.duration = h) : d.destination > i && (d.destination = n ? Math.min(i + n / 4, i + n / d.rate * l) : i, d.duration = h), d.destination = Math.round(d.destination), d;
    }, e.prototype.updateDirection = function() {
      var t = this.currentPos - this.absStartPos;
      this.setDirection(t);
    }, e.prototype.refresh = function(t) {
      var o = this.options.rect, r = o.size, s = o.position, i = window.getComputedStyle(this.wrapper, null).position === "static", n = Ot(this.wrapper);
      this.wrapperSize = this.wrapper[r === "width" ? "clientWidth" : "clientHeight"], this.setContent(t);
      var a = Ot(this.content);
      this.contentSize = a[r], this.relativeOffset = a[s], i && (this.relativeOffset -= n[s]), this.computeBoundary(), this.setDirection(
        0
        /* Default */
      );
    }, e.prototype.setContent = function(t) {
      t !== this.content && (this.content = t, this.resetState());
    }, e.prototype.resetState = function() {
      this.currentPos = 0, this.startPos = 0, this.dist = 0, this.setDirection(
        0
        /* Default */
      ), this.setMovingDirection(
        0
        /* Default */
      ), this.resetStartPos();
    }, e.prototype.computeBoundary = function() {
      this.hooks.trigger(this.hooks.eventTypes.beforeComputeBoundary);
      var t = {
        minScrollPos: 0,
        maxScrollPos: this.wrapperSize - this.contentSize
      };
      t.maxScrollPos < 0 && (t.maxScrollPos -= this.relativeOffset, this.options.specifiedIndexAsContent === 0 && (t.minScrollPos = -this.relativeOffset)), this.hooks.trigger(this.hooks.eventTypes.computeBoundary, t), this.minScrollPos = t.minScrollPos, this.maxScrollPos = t.maxScrollPos, this.hasScroll = this.options.scrollable && this.maxScrollPos < this.minScrollPos, !this.hasScroll && this.minScrollPos < this.maxScrollPos && (this.maxScrollPos = this.minScrollPos, this.contentSize = this.wrapperSize);
    }, e.prototype.updatePosition = function(t) {
      this.currentPos = t;
    }, e.prototype.getCurrentPos = function() {
      return this.currentPos;
    }, e.prototype.checkInBoundary = function() {
      var t = this.adjustPosition(this.currentPos), o = t === this.getCurrentPos();
      return {
        position: t,
        inBoundary: o
      };
    }, e.prototype.adjustPosition = function(t) {
      return !this.hasScroll && !this.hooks.trigger(this.hooks.eventTypes.ignoreHasScroll) ? t = this.minScrollPos : t > this.minScrollPos ? t = this.minScrollPos : t < this.maxScrollPos && (t = this.maxScrollPos), t;
    }, e.prototype.updateStartPos = function() {
      this.startPos = this.currentPos;
    }, e.prototype.updateAbsStartPos = function() {
      this.absStartPos = this.currentPos;
    }, e.prototype.resetStartPos = function() {
      this.updateStartPos(), this.updateAbsStartPos();
    }, e.prototype.getAbsDist = function(t) {
      return this.dist += t, Math.abs(this.dist);
    }, e.prototype.destroy = function() {
      this.hooks.destroy();
    }, e;
  }()
), ie, ne, ae, le, Zo = (ie = {}, ie.yes = function(e) {
  return !0;
}, ie.no = function(e) {
  return xt(e), !1;
}, ie), On = (ne = {}, ne.horizontal = (ae = {}, ae.yes = "horizontal", ae.no = "vertical", ae), ne.vertical = (le = {}, le.yes = "vertical", le.no = "horizontal", le), ne), Dn = (
  /** @class */
  function() {
    function e(t, o, r) {
      this.directionLockThreshold = t, this.freeScroll = o, this.eventPassthrough = r, this.reset();
    }
    return e.prototype.reset = function() {
      this.directionLocked = "";
    }, e.prototype.checkMovingDirection = function(t, o, r) {
      return this.computeDirectionLock(t, o), this.handleEventPassthrough(r);
    }, e.prototype.adjustDelta = function(t, o) {
      return this.directionLocked === "horizontal" ? o = 0 : this.directionLocked === "vertical" && (t = 0), {
        deltaX: t,
        deltaY: o
      };
    }, e.prototype.computeDirectionLock = function(t, o) {
      this.directionLocked === "" && !this.freeScroll && (t > o + this.directionLockThreshold ? this.directionLocked = "horizontal" : o >= t + this.directionLockThreshold ? this.directionLocked = "vertical" : this.directionLocked = "none");
    }, e.prototype.handleEventPassthrough = function(t) {
      var o = On[this.directionLocked];
      if (o) {
        if (this.eventPassthrough === o.yes)
          return Zo.yes(t);
        if (this.eventPassthrough === o.no)
          return Zo.no(t);
      }
      return !1;
    }, e;
  }()
), Yn = function(e, t, o) {
  return o === 2 ? [t, -e] : o === 3 ? [-e, -t] : o === 4 ? [-t, e] : [e, t];
}, Cn = (
  /** @class */
  function() {
    function e(t, o, r, s, i) {
      this.hooks = new it([
        "start",
        "beforeMove",
        "scrollStart",
        "scroll",
        "beforeEnd",
        "end",
        "scrollEnd",
        "contentNotMoved",
        "detectMovingDirection",
        "coordinateTransformation"
      ]), this.scrollBehaviorX = t, this.scrollBehaviorY = o, this.actionsHandler = r, this.animater = s, this.options = i, this.directionLockAction = new Dn(i.directionLockThreshold, i.freeScroll, i.eventPassthrough), this.enabled = !0, this.bindActionsHandler();
    }
    return e.prototype.bindActionsHandler = function() {
      var t = this;
      this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.start, function(o) {
        return t.enabled ? t.handleStart(o) : !0;
      }), this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.move, function(o) {
        var r = o.deltaX, s = o.deltaY, i = o.e;
        if (!t.enabled)
          return !0;
        var n = Yn(r, s, t.options.quadrant), a = n[0], c = n[1], l = {
          deltaX: a,
          deltaY: c
        };
        return t.hooks.trigger(t.hooks.eventTypes.coordinateTransformation, l), t.handleMove(l.deltaX, l.deltaY, i);
      }), this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.end, function(o) {
        return t.enabled ? t.handleEnd(o) : !0;
      }), this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.click, function(o) {
        t.enabled && !o._constructed && t.handleClick(o);
      });
    }, e.prototype.handleStart = function(t) {
      var o = F();
      this.fingerMoved = !1, this.contentMoved = !1, this.startTime = o, this.directionLockAction.reset(), this.scrollBehaviorX.start(), this.scrollBehaviorY.start(), this.animater.doStop(), this.scrollBehaviorX.resetStartPos(), this.scrollBehaviorY.resetStartPos(), this.hooks.trigger(this.hooks.eventTypes.start, t);
    }, e.prototype.handleMove = function(t, o, r) {
      if (!this.hooks.trigger(this.hooks.eventTypes.beforeMove, r)) {
        var s = this.scrollBehaviorX.getAbsDist(t), i = this.scrollBehaviorY.getAbsDist(o), n = F();
        if (this.checkMomentum(s, i, n))
          return !0;
        if (this.directionLockAction.checkMovingDirection(s, i, r))
          return this.actionsHandler.setInitiated(), !0;
        var a = this.directionLockAction.adjustDelta(t, o), c = this.scrollBehaviorX.getCurrentPos(), l = this.scrollBehaviorX.move(a.deltaX), u = this.scrollBehaviorY.getCurrentPos(), h = this.scrollBehaviorY.move(a.deltaY);
        if (!this.hooks.trigger(this.hooks.eventTypes.detectMovingDirection)) {
          this.fingerMoved || (this.fingerMoved = !0);
          var p = l !== c || h !== u;
          !this.contentMoved && !p && this.hooks.trigger(this.hooks.eventTypes.contentNotMoved), !this.contentMoved && p && (this.contentMoved = !0, this.hooks.trigger(this.hooks.eventTypes.scrollStart)), this.contentMoved && p && (this.animater.translate({
            x: l,
            y: h
          }), this.dispatchScroll(n));
        }
      }
    }, e.prototype.dispatchScroll = function(t) {
      t - this.startTime > this.options.momentumLimitTime && (this.startTime = t, this.scrollBehaviorX.updateStartPos(), this.scrollBehaviorY.updateStartPos(), this.options.probeType === 1 && this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos())), this.options.probeType > 1 && this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
    }, e.prototype.checkMomentum = function(t, o, r) {
      return r - this.endTime > this.options.momentumLimitTime && o < this.options.momentumLimitDistance && t < this.options.momentumLimitDistance;
    }, e.prototype.handleEnd = function(t) {
      if (!this.hooks.trigger(this.hooks.eventTypes.beforeEnd, t)) {
        var o = this.getCurrentPos();
        if (this.scrollBehaviorX.updateDirection(), this.scrollBehaviorY.updateDirection(), this.hooks.trigger(this.hooks.eventTypes.end, t, o))
          return !0;
        o = this.ensureIntegerPos(o), this.animater.translate(o), this.endTime = F();
        var r = this.endTime - this.startTime;
        this.hooks.trigger(this.hooks.eventTypes.scrollEnd, o, r);
      }
    }, e.prototype.ensureIntegerPos = function(t) {
      this.ensuringInteger = !0;
      var o = t.x, r = t.y, s = this.scrollBehaviorX, i = s.minScrollPos, n = s.maxScrollPos, a = this.scrollBehaviorY, c = a.minScrollPos, l = a.maxScrollPos;
      return o = o > 0 ? Math.ceil(o) : Math.floor(o), r = r > 0 ? Math.ceil(r) : Math.floor(r), o = P(o, n, i), r = P(r, l, c), { x: o, y: r };
    }, e.prototype.handleClick = function(t) {
      Rt(t.target, this.options.preventDefaultException) || (xt(t), t.stopPropagation());
    }, e.prototype.getCurrentPos = function() {
      return {
        x: this.scrollBehaviorX.getCurrentPos(),
        y: this.scrollBehaviorY.getCurrentPos()
      };
    }, e.prototype.refresh = function() {
      this.endTime = 0;
    }, e.prototype.destroy = function() {
      this.hooks.destroy();
    }, e;
  }()
);
function Bn(e) {
  var t = [
    "click",
    "bindToWrapper",
    "disableMouse",
    "disableTouch",
    "preventDefault",
    "stopPropagation",
    "tagException",
    "preventDefaultException",
    "autoEndDistance"
  ].reduce(function(o, r) {
    return o[r] = e[r], o;
  }, {});
  return t;
}
function Qo(e, t, o, r) {
  var s = [
    "momentum",
    "momentumLimitTime",
    "momentumLimitDistance",
    "deceleration",
    "swipeBounceTime",
    "swipeTime",
    "outOfBoundaryDampingFactor",
    "specifiedIndexAsContent"
  ].reduce(function(i, n) {
    return i[n] = e[n], i;
  }, {});
  return s.scrollable = !!e[t], s.bounces = o, s.rect = r, s;
}
function so(e, t, o) {
  o.forEach(function(r) {
    var s, i;
    typeof r == "string" ? s = i = r : (s = r.source, i = r.target), e.on(s, function() {
      for (var n = [], a = 0; a < arguments.length; a++)
        n[a] = arguments[a];
      return t.trigger.apply(t, ke([i], n));
    });
  });
}
function Xn(e, t) {
  for (var o = Object.keys(e), r = 0, s = o; r < s.length; r++) {
    var i = s[r];
    if (e[i] !== t[i])
      return !1;
  }
  return !0;
}
var Jo = 1, In = (
  /** @class */
  function() {
    function e(t, o, r) {
      this.wrapper = t, this.content = o, this.resizeTimeout = 0, this.hooks = new it([
        "beforeStart",
        "beforeMove",
        "beforeScrollStart",
        "scrollStart",
        "scroll",
        "beforeEnd",
        "scrollEnd",
        "resize",
        "touchEnd",
        "end",
        "flick",
        "scrollCancel",
        "momentum",
        "scrollTo",
        "minDistanceScroll",
        "scrollToElement",
        "beforeRefresh"
      ]), this.options = r;
      var s = this.options.bounce, i = s.left, n = s.right, a = s.top, c = s.bottom;
      this.scrollBehaviorX = new Go(t, o, Qo(r, "scrollX", [i, n], {
        size: "width",
        position: "left"
      })), this.scrollBehaviorY = new Go(t, o, Qo(r, "scrollY", [a, c], {
        size: "height",
        position: "top"
      })), this.translater = new bn(this.content), this.animater = Mn(this.content, this.translater, this.options), this.actionsHandler = new wn(this.options.bindToTarget ? this.content : t, Bn(this.options)), this.actions = new Cn(this.scrollBehaviorX, this.scrollBehaviorY, this.actionsHandler, this.animater, this.options);
      var l = this.resize.bind(this);
      this.resizeRegister = new R(window, [
        {
          name: "orientationchange",
          handler: l
        },
        {
          name: "resize",
          handler: l
        }
      ]), this.registerTransitionEnd(), this.init();
    }
    return e.prototype.init = function() {
      var t = this;
      this.bindTranslater(), this.bindAnimater(), this.bindActions(), this.hooks.on(this.hooks.eventTypes.scrollEnd, function() {
        t.togglePointerEvents(!0);
      });
    }, e.prototype.registerTransitionEnd = function() {
      this.transitionEndRegister = new R(this.content, [
        {
          name: k.transitionEnd,
          handler: this.transitionEnd.bind(this)
        }
      ]);
    }, e.prototype.bindTranslater = function() {
      var t = this, o = this.translater.hooks;
      o.on(o.eventTypes.beforeTranslate, function(r) {
        t.options.translateZ && r.push(t.options.translateZ);
      }), o.on(o.eventTypes.translate, function(r) {
        var s = t.getCurrentPos();
        if (t.updatePositions(r), t.actions.ensuringInteger === !0) {
          t.actions.ensuringInteger = !1;
          return;
        }
        (r.x !== s.x || r.y !== s.y) && t.togglePointerEvents(!1);
      });
    }, e.prototype.bindAnimater = function() {
      var t = this;
      this.animater.hooks.on(this.animater.hooks.eventTypes.end, function(o) {
        t.resetPosition(t.options.bounceTime) || (t.animater.setPending(!1), t.hooks.trigger(t.hooks.eventTypes.scrollEnd, o));
      }), so(this.animater.hooks, this.hooks, [
        {
          source: this.animater.hooks.eventTypes.move,
          target: this.hooks.eventTypes.scroll
        },
        {
          source: this.animater.hooks.eventTypes.forceStop,
          target: this.hooks.eventTypes.scrollEnd
        }
      ]);
    }, e.prototype.bindActions = function() {
      var t = this, o = this.actions;
      so(o.hooks, this.hooks, [
        {
          source: o.hooks.eventTypes.start,
          target: this.hooks.eventTypes.beforeStart
        },
        {
          source: o.hooks.eventTypes.start,
          target: this.hooks.eventTypes.beforeScrollStart
        },
        {
          source: o.hooks.eventTypes.beforeMove,
          target: this.hooks.eventTypes.beforeMove
        },
        {
          source: o.hooks.eventTypes.scrollStart,
          target: this.hooks.eventTypes.scrollStart
        },
        {
          source: o.hooks.eventTypes.scroll,
          target: this.hooks.eventTypes.scroll
        },
        {
          source: o.hooks.eventTypes.beforeEnd,
          target: this.hooks.eventTypes.beforeEnd
        }
      ]), o.hooks.on(o.hooks.eventTypes.end, function(r, s) {
        if (t.hooks.trigger(t.hooks.eventTypes.touchEnd, s), t.hooks.trigger(t.hooks.eventTypes.end, s) || !o.fingerMoved && (t.hooks.trigger(t.hooks.eventTypes.scrollCancel), t.checkClick(r)))
          return !0;
        if (t.resetPosition(t.options.bounceTime, C.bounce))
          return t.animater.setForceStopped(!1), !0;
      }), o.hooks.on(o.hooks.eventTypes.scrollEnd, function(r, s) {
        var i = Math.abs(r.x - t.scrollBehaviorX.startPos), n = Math.abs(r.y - t.scrollBehaviorY.startPos);
        if (t.checkFlick(s, i, n)) {
          t.animater.setForceStopped(!1), t.hooks.trigger(t.hooks.eventTypes.flick);
          return;
        }
        if (t.momentum(r, s)) {
          t.animater.setForceStopped(!1);
          return;
        }
        o.contentMoved && t.hooks.trigger(t.hooks.eventTypes.scrollEnd, r), t.animater.forceStopped && t.animater.setForceStopped(!1);
      });
    }, e.prototype.checkFlick = function(t, o, r) {
      var s = 1;
      if (this.hooks.events.flick.length > 1 && t < this.options.flickLimitTime && o < this.options.flickLimitDistance && r < this.options.flickLimitDistance && (r > s || o > s))
        return !0;
    }, e.prototype.momentum = function(t, o) {
      var r = {
        time: 0,
        easing: C.swiper,
        newX: t.x,
        newY: t.y
      }, s = this.scrollBehaviorX.end(o), i = this.scrollBehaviorY.end(o);
      if (r.newX = ro(s.destination) ? r.newX : s.destination, r.newY = ro(i.destination) ? r.newY : i.destination, r.time = Math.max(s.duration, i.duration), this.hooks.trigger(this.hooks.eventTypes.momentum, r, this), r.newX !== t.x || r.newY !== t.y)
        return (r.newX > this.scrollBehaviorX.minScrollPos || r.newX < this.scrollBehaviorX.maxScrollPos || r.newY > this.scrollBehaviorY.minScrollPos || r.newY < this.scrollBehaviorY.maxScrollPos) && (r.easing = C.swipeBounce), this.scrollTo(r.newX, r.newY, r.time, r.easing), !0;
    }, e.prototype.checkClick = function(t) {
      var o = {
        preventClick: this.animater.forceStopped
      };
      if (this.hooks.trigger(this.hooks.eventTypes.checkClick))
        return this.animater.setForceStopped(!1), !0;
      if (!o.preventClick) {
        var r = this.options.dblclick, s = !1;
        if (r && this.lastClickTime) {
          var i = r.delay, n = i === void 0 ? 300 : i;
          F() - this.lastClickTime < n && (s = !0, hn(t));
        }
        return this.options.tap && cn(t, this.options.tap), this.options.click && !Rt(t.target, this.options.preventDefaultException) && qr(t), this.lastClickTime = s ? null : F(), !0;
      }
      return !1;
    }, e.prototype.resize = function() {
      var t = this;
      this.actions.enabled && (Zi && (this.wrapper.scrollTop = 0), clearTimeout(this.resizeTimeout), this.resizeTimeout = window.setTimeout(function() {
        t.hooks.trigger(t.hooks.eventTypes.resize);
      }, this.options.resizePolling));
    }, e.prototype.transitionEnd = function(t) {
      if (!(t.target !== this.content || !this.animater.pending)) {
        var o = this.animater;
        o.transitionTime(), this.resetPosition(this.options.bounceTime, C.bounce) || (this.animater.setPending(!1), this.options.probeType !== 3 && this.hooks.trigger(this.hooks.eventTypes.scrollEnd, this.getCurrentPos()));
      }
    }, e.prototype.togglePointerEvents = function(t) {
      t === void 0 && (t = !0);
      for (var o = this.content.children.length ? this.content.children : [this.content], r = t ? "auto" : "none", s = 0; s < o.length; s++) {
        var i = o[s];
        i.isBScrollContainer || (i.style.pointerEvents = r);
      }
    }, e.prototype.refresh = function(t) {
      var o = this.setContent(t);
      this.hooks.trigger(this.hooks.eventTypes.beforeRefresh), this.scrollBehaviorX.refresh(t), this.scrollBehaviorY.refresh(t), o && (this.translater.setContent(t), this.animater.setContent(t), this.transitionEndRegister.destroy(), this.registerTransitionEnd(), this.options.bindToTarget && this.actionsHandler.setContent(t)), this.actions.refresh(), this.wrapperOffset = Ko(this.wrapper);
    }, e.prototype.setContent = function(t) {
      var o = t !== this.content;
      return o && (this.content = t), o;
    }, e.prototype.scrollBy = function(t, o, r, s) {
      r === void 0 && (r = 0);
      var i = this.getCurrentPos(), n = i.x, a = i.y;
      s = s || C.bounce, t += n, o += a, this.scrollTo(t, o, r, s);
    }, e.prototype.scrollTo = function(t, o, r, s, i) {
      r === void 0 && (r = 0), s === void 0 && (s = C.bounce), i === void 0 && (i = {
        start: {},
        end: {}
      });
      var n = this.options.useTransition ? s.style : s.fn, a = this.getCurrentPos(), c = Q({ x: a.x, y: a.y }, i.start), l = Q({
        x: t,
        y: o
      }, i.end);
      if (this.hooks.trigger(this.hooks.eventTypes.scrollTo, l), !Xn(c, l)) {
        var u = Math.abs(l.x - c.x), h = Math.abs(l.y - c.y);
        u < Jo && h < Jo && (r = 0, this.hooks.trigger(this.hooks.eventTypes.minDistanceScroll)), this.animater.move(c, l, r, n);
      }
    }, e.prototype.scrollToElement = function(t, o, r, s, i) {
      var n = Kr(t), a = Ko(n), c = function(u, h, p) {
        return typeof u == "number" ? u : u ? Math.round(h / 2 - p / 2) : 0;
      };
      r = c(r, n.offsetWidth, this.wrapper.offsetWidth), s = c(s, n.offsetHeight, this.wrapper.offsetHeight);
      var l = function(u, h, p, f) {
        return u -= h, u = f.adjustPosition(u - p), u;
      };
      a.left = l(a.left, this.wrapperOffset.left, r, this.scrollBehaviorX), a.top = l(a.top, this.wrapperOffset.top, s, this.scrollBehaviorY), !this.hooks.trigger(this.hooks.eventTypes.scrollToElement, n, a) && this.scrollTo(a.left, a.top, o, i);
    }, e.prototype.resetPosition = function(t, o) {
      t === void 0 && (t = 0), o === void 0 && (o = C.bounce);
      var r = this.scrollBehaviorX.checkInBoundary(), s = r.position, i = r.inBoundary, n = this.scrollBehaviorY.checkInBoundary(), a = n.position, c = n.inBoundary;
      return i && c ? !1 : (Qi && this.reflow(), this.scrollTo(s, a, t, o), !0);
    }, e.prototype.reflow = function() {
      this._reflow = this.content.offsetHeight;
    }, e.prototype.updatePositions = function(t) {
      this.scrollBehaviorX.updatePosition(t.x), this.scrollBehaviorY.updatePosition(t.y);
    }, e.prototype.getCurrentPos = function() {
      return this.actions.getCurrentPos();
    }, e.prototype.enable = function() {
      this.actions.enabled = !0;
    }, e.prototype.disable = function() {
      mt(this.animater.timer), this.actions.enabled = !1;
    }, e.prototype.destroy = function() {
      var t = this, o = [
        "resizeRegister",
        "transitionEndRegister",
        "actionsHandler",
        "actions",
        "hooks",
        "animater",
        "translater",
        "scrollBehaviorX",
        "scrollBehaviorY"
      ];
      o.forEach(function(r) {
        return t[r].destroy();
      });
    }, e;
  }()
), Ye = (
  /** @class */
  function(e) {
    De(t, e);
    function t(o, r) {
      var s = e.call(this, [
        "refresh",
        "contentChanged",
        "enable",
        "disable",
        "beforeScrollStart",
        "scrollStart",
        "scroll",
        "scrollEnd",
        "scrollCancel",
        "touchEnd",
        "flick",
        "destroy"
      ]) || this, i = Kr(o);
      return i ? (s.plugins = {}, s.options = new kn().merge(r).process(), s.setContent(i).valid && (s.hooks = new it([
        "refresh",
        "enable",
        "disable",
        "destroy",
        "beforeInitialScrollTo",
        "contentChanged"
      ]), s.init(i)), s) : (Z("Can not resolve the wrapper DOM."), s);
    }
    return t.use = function(o) {
      var r = o.pluginName, s = t.plugins.some(function(i) {
        return o === i.ctor;
      });
      return s ? t : ro(r) ? (Z("Plugin Class must specify plugin's name in static property by 'pluginName' field."), t) : (t.pluginsMap[r] = !0, t.plugins.push({
        name: r,
        applyOrder: o.applyOrder,
        ctor: o
      }), t);
    }, t.prototype.setContent = function(o) {
      var r = !1, s = !0, i = o.children[this.options.specifiedIndexAsContent];
      return i ? (r = this.content !== i, r && (this.content = i)) : (Z("The wrapper need at least one child element to be content element to scroll."), s = !1), {
        valid: s,
        contentChanged: r
      };
    }, t.prototype.init = function(o) {
      var r = this;
      this.wrapper = o, o.isBScrollContainer = !0, this.scroller = new In(o, this.content, this.options), this.scroller.hooks.on(this.scroller.hooks.eventTypes.resize, function() {
        r.refresh();
      }), this.eventBubbling(), this.handleAutoBlur(), this.enable(), this.proxy(qi), this.applyPlugins(), this.refreshWithoutReset(this.content);
      var s = this.options, i = s.startX, n = s.startY, a = {
        x: i,
        y: n
      };
      this.hooks.trigger(this.hooks.eventTypes.beforeInitialScrollTo, a) || this.scroller.scrollTo(a.x, a.y);
    }, t.prototype.applyPlugins = function() {
      var o = this, r = this.options;
      t.plugins.sort(function(s, i) {
        var n, a = (n = {}, n.pre = -1, n.post = 1, n), c = s.applyOrder ? a[s.applyOrder] : 0, l = i.applyOrder ? a[i.applyOrder] : 0;
        return c - l;
      }).forEach(function(s) {
        var i = s.ctor;
        r[s.name] && typeof i == "function" && (o.plugins[s.name] = new i(o));
      });
    }, t.prototype.handleAutoBlur = function() {
      this.options.autoBlur && this.on(this.eventTypes.beforeScrollStart, function() {
        var o = document.activeElement;
        o && (o.tagName === "INPUT" || o.tagName === "TEXTAREA") && o.blur();
      });
    }, t.prototype.eventBubbling = function() {
      so(this.scroller.hooks, this, [
        this.eventTypes.beforeScrollStart,
        this.eventTypes.scrollStart,
        this.eventTypes.scroll,
        this.eventTypes.scrollEnd,
        this.eventTypes.scrollCancel,
        this.eventTypes.touchEnd,
        this.eventTypes.flick
      ]);
    }, t.prototype.refreshWithoutReset = function(o) {
      this.scroller.refresh(o), this.hooks.trigger(this.hooks.eventTypes.refresh, o), this.trigger(this.eventTypes.refresh, o);
    }, t.prototype.proxy = function(o) {
      var r = this;
      o.forEach(function(s) {
        var i = s.key, n = s.sourceKey;
        Tn(r, n, i);
      });
    }, t.prototype.refresh = function() {
      var o = this.setContent(this.wrapper), r = o.contentChanged, s = o.valid;
      if (s) {
        var i = this.content;
        this.refreshWithoutReset(i), r && (this.hooks.trigger(this.hooks.eventTypes.contentChanged, i), this.trigger(this.eventTypes.contentChanged, i)), this.scroller.resetPosition();
      }
    }, t.prototype.enable = function() {
      this.scroller.enable(), this.hooks.trigger(this.hooks.eventTypes.enable), this.trigger(this.eventTypes.enable);
    }, t.prototype.disable = function() {
      this.scroller.disable(), this.hooks.trigger(this.hooks.eventTypes.disable), this.trigger(this.eventTypes.disable);
    }, t.prototype.destroy = function() {
      this.hooks.trigger(this.hooks.eventTypes.destroy), this.trigger(this.eventTypes.destroy), this.scroller.destroy();
    }, t.prototype.eventRegister = function(o) {
      this.registerType(o);
    }, t.plugins = [], t.pluginsMap = {}, t;
  }(it)
);
function Ce(e, t) {
  var o = new Ye(e, t);
  return o;
}
Ce.use = Ye.use;
Ce.plugins = Ye.plugins;
Ce.pluginsMap = Ye.pluginsMap;
var io = Ce, Nn = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.wheelEndTimer = 0, this.wheelMoveTimer = 0, this.wheelStart = !1, this.init();
    }
    return e.prototype.init = function() {
      this.handleBScroll(), this.handleOptions(), this.handleHooks(), this.registerEvent();
    }, e.prototype.handleBScroll = function() {
      this.scroll.registerType([
        "alterOptions",
        "mousewheelStart",
        "mousewheelMove",
        "mousewheelEnd"
      ]);
    }, e.prototype.handleOptions = function() {
      var t = this.scroll.options.mouseWheel === !0 ? {} : this.scroll.options.mouseWheel, o = {
        speed: 20,
        invert: !1,
        easeTime: 300,
        discreteTime: 400,
        throttleTime: 0,
        dampingFactor: 0.1
      };
      this.mouseWheelOpt = B(o, t);
    }, e.prototype.handleHooks = function() {
      this.hooksFn = [], this.registerHooks(this.scroll.hooks, "destroy", this.destroy);
    }, e.prototype.registerEvent = function() {
      this.eventRegister = new R(this.scroll.scroller.wrapper, [
        {
          name: "wheel",
          handler: this.wheelHandler.bind(this)
        },
        {
          name: "mousewheel",
          handler: this.wheelHandler.bind(this)
        },
        {
          name: "DOMMouseScroll",
          handler: this.wheelHandler.bind(this)
        }
      ]);
    }, e.prototype.registerHooks = function(t, o, r) {
      t.on(o, r, this), this.hooksFn.push([t, o, r]);
    }, e.prototype.wheelHandler = function(t) {
      if (this.scroll.enabled) {
        this.beforeHandler(t), this.wheelStart || (this.wheelStartHandler(t), this.wheelStart = !0);
        var o = this.getWheelDelta(t);
        this.wheelMoveHandler(o), this.wheelEndDetector(o);
      }
    }, e.prototype.wheelStartHandler = function(t) {
      this.cleanCache();
      var o = this.scroll.scroller, r = o.scrollBehaviorX, s = o.scrollBehaviorY;
      r.setMovingDirection(
        0
        /* Default */
      ), s.setMovingDirection(
        0
        /* Default */
      ), r.setDirection(
        0
        /* Default */
      ), s.setDirection(
        0
        /* Default */
      ), this.scroll.trigger(this.scroll.eventTypes.alterOptions, this.mouseWheelOpt), this.scroll.trigger(this.scroll.eventTypes.mousewheelStart);
    }, e.prototype.cleanCache = function() {
      this.deltaCache = [];
    }, e.prototype.wheelMoveHandler = function(t) {
      var o = this, r = this.mouseWheelOpt, s = r.throttleTime, i = r.dampingFactor;
      if (s && this.wheelMoveTimer)
        this.deltaCache.push(t);
      else {
        var n = this.deltaCache.reduce(function(f, d) {
          return {
            x: f.x + d.x,
            y: f.y + d.y
          };
        }, { x: 0, y: 0 });
        this.cleanCache();
        var a = this.scroll.scroller, c = a.scrollBehaviorX, l = a.scrollBehaviorY;
        c.setMovingDirection(-t.directionX), l.setMovingDirection(-t.directionY), c.setDirection(t.x), l.setDirection(t.y);
        var u = c.performDampingAlgorithm(Math.round(t.x) + n.x, i), h = l.performDampingAlgorithm(Math.round(t.y) + n.x, i);
        if (!this.scroll.trigger(this.scroll.eventTypes.mousewheelMove, {
          x: u,
          y: h
        })) {
          var p = this.getEaseTime();
          (u !== this.scroll.x || h !== this.scroll.y) && this.scroll.scrollTo(u, h, p);
        }
        s && (this.wheelMoveTimer = window.setTimeout(function() {
          o.wheelMoveTimer = 0;
        }, s));
      }
    }, e.prototype.wheelEndDetector = function(t) {
      var o = this;
      window.clearTimeout(this.wheelEndTimer), this.wheelEndTimer = window.setTimeout(function() {
        o.wheelStart = !1, window.clearTimeout(o.wheelMoveTimer), o.wheelMoveTimer = 0, o.scroll.trigger(o.scroll.eventTypes.mousewheelEnd, t);
      }, this.mouseWheelOpt.discreteTime);
    }, e.prototype.getWheelDelta = function(t) {
      var o = this.mouseWheelOpt, r = o.speed, s = o.invert, i = 0, n = 0, a = s ? -1 : 1;
      switch (!0) {
        case "deltaX" in t:
          t.deltaMode === 1 ? (i = -t.deltaX * r, n = -t.deltaY * r) : (i = -t.deltaX, n = -t.deltaY);
          break;
        case "wheelDeltaX" in t:
          i = t.wheelDeltaX / 120 * r, n = t.wheelDeltaY / 120 * r;
          break;
        case "wheelDelta" in t:
          i = n = t.wheelDelta / 120 * r;
          break;
        case "detail" in t:
          i = n = -t.detail / 3 * r;
          break;
      }
      i *= a, n *= a, this.scroll.hasVerticalScroll || (Math.abs(n) > Math.abs(i) && (i = n), n = 0), this.scroll.hasHorizontalScroll || (i = 0);
      var c = i > 0 ? -1 : i < 0 ? 1 : 0, l = n > 0 ? -1 : n < 0 ? 1 : 0;
      return {
        x: i,
        y: n,
        directionX: c,
        directionY: l
      };
    }, e.prototype.beforeHandler = function(t) {
      var o = this.scroll.options, r = o.preventDefault, s = o.stopPropagation, i = o.preventDefaultException;
      r && !Rt(t.target, i) && xt(t), s && t.stopPropagation();
    }, e.prototype.getEaseTime = function() {
      var t = 100, o = this.mouseWheelOpt.easeTime;
      return o < t && Z("easeTime should be greater than 100.If mouseWheel easeTime is too small,scrollEnd will be triggered many times."), Math.max(o, t);
    }, e.prototype.destroy = function() {
      this.eventRegister.destroy(), window.clearTimeout(this.wheelEndTimer), window.clearTimeout(this.wheelMoveTimer), this.hooksFn.forEach(function(t) {
        var o = t[0], r = t[1], s = t[2];
        o.off(r, s);
      });
    }, e.pluginName = "mouseWheel", e.applyOrder = "pre", e;
  }()
), Hn = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.stopObserver = !1, this.init();
    }
    return e.prototype.init = function() {
      this.handleMutationObserver(), this.handleHooks();
    }, e.prototype.handleMutationObserver = function() {
      var t = this;
      if (typeof MutationObserver < "u") {
        var o = 0;
        this.observer = new MutationObserver(function(r) {
          t.mutationObserverHandler(r, o);
        }), this.startObserve(this.observer);
      } else
        this.checkDOMUpdate();
    }, e.prototype.handleHooks = function() {
      var t = this;
      this.hooksFn = [], this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function() {
        t.stopObserve(), t.handleMutationObserver();
      }), this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.enable, function() {
        t.stopObserver && t.handleMutationObserver();
      }), this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.disable, function() {
        t.stopObserve();
      }), this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.destroy, function() {
        t.destroy();
      });
    }, e.prototype.mutationObserverHandler = function(t, o) {
      var r = this;
      if (!this.shouldNotRefresh()) {
        for (var s = !1, i = !1, n = 0; n < t.length; n++) {
          var a = t[n];
          if (a.type !== "attributes") {
            s = !0;
            break;
          } else if (a.target !== this.scroll.scroller.content) {
            i = !0;
            break;
          }
        }
        s ? this.scroll.refresh() : i && (clearTimeout(o), o = window.setTimeout(function() {
          r.shouldNotRefresh() || r.scroll.refresh();
        }, 60));
      }
    }, e.prototype.startObserve = function(t) {
      var o = {
        attributes: !0,
        childList: !0,
        subtree: !0
      };
      t.observe(this.scroll.scroller.content, o);
    }, e.prototype.shouldNotRefresh = function() {
      var t = this.scroll.scroller, o = t.scrollBehaviorX, r = t.scrollBehaviorY, s = o.currentPos > o.minScrollPos || o.currentPos < o.maxScrollPos || r.currentPos > r.minScrollPos || r.currentPos < r.maxScrollPos;
      return t.animater.pending || s;
    }, e.prototype.checkDOMUpdate = function() {
      var t = this, o = this.scroll.scroller.content, r = Ot(o), s = r.width, i = r.height, n = function() {
        if (!t.stopObserver) {
          r = Ot(o);
          var c = r.width, l = r.height;
          (s !== c || i !== l) && t.scroll.refresh(), s = c, i = l, a();
        }
      }, a = function() {
        setTimeout(function() {
          n();
        }, 1e3);
      };
      a();
    }, e.prototype.registerHooks = function(t, o, r) {
      t.on(o, r, this), this.hooksFn.push([t, o, r]);
    }, e.prototype.stopObserve = function() {
      this.stopObserver = !0, this.observer && this.observer.disconnect();
    }, e.prototype.destroy = function() {
      this.stopObserve(), this.hooksFn.forEach(function(t) {
        var o = t[0], r = t[1], s = t[2];
        o.off(r, s);
      }), this.hooksFn.length = 0;
    }, e.pluginName = "observeDOM", e;
  }()
), _n = "plugins.pullDownRefresh", Rn = [
  {
    key: "finishPullDown",
    name: "finishPullDown"
  },
  {
    key: "openPullDown",
    name: "openPullDown"
  },
  {
    key: "closePullDown",
    name: "closePullDown"
  },
  {
    key: "autoPullDownRefresh",
    name: "autoPullDownRefresh"
  }
], An = Rn.map(function(e) {
  return {
    key: e.key,
    sourceKey: _n + "." + e.name
  };
}), Le = "pullingDown", $o = "enterThreshold", tr = "leaveThreshold", zn = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.pulling = 0, this.thresholdBoundary = 0, this.init();
    }
    return e.prototype.setPulling = function(t) {
      this.pulling = t;
    }, e.prototype.setThresholdBoundary = function(t) {
      this.thresholdBoundary = t;
    }, e.prototype.init = function() {
      this.handleBScroll(), this.handleOptions(this.scroll.options.pullDownRefresh), this.handleHooks(), this.watch();
    }, e.prototype.handleBScroll = function() {
      this.scroll.registerType([
        Le,
        $o,
        tr
      ]), this.scroll.proxy(An);
    }, e.prototype.handleOptions = function(t) {
      t === void 0 && (t = {}), t = t === !0 ? {} : t;
      var o = {
        threshold: 90,
        stop: 40
      };
      this.options = B(o, t), this.scroll.options.probeType = 3;
    }, e.prototype.handleHooks = function() {
      var t = this;
      this.hooksFn = [];
      var o = this.scroll.scroller, r = o.scrollBehaviorY;
      this.currentMinScrollY = this.cachedOriginanMinScrollY = r.minScrollPos, this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function() {
        t.finishPullDown();
      }), this.registerHooks(r.hooks, r.hooks.eventTypes.computeBoundary, function(s) {
        s.maxScrollPos > 0 && (s.maxScrollPos = -1), s.minScrollPos = t.currentMinScrollY;
      }), this.hasMouseWheelPlugin() && (this.registerHooks(this.scroll, this.scroll.eventTypes.alterOptions, function(s) {
        var i = 300, n = 350;
        s.discreteTime = i, s.easeTime = n;
      }), this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelEnd, function() {
        o.hooks.trigger(o.hooks.eventTypes.end);
      }));
    }, e.prototype.registerHooks = function(t, o, r) {
      t.on(o, r, this), this.hooksFn.push([t, o, r]);
    }, e.prototype.hasMouseWheelPlugin = function() {
      return !!this.scroll.eventTypes.alterOptions;
    }, e.prototype.watch = function() {
      var t = this.scroll.scroller;
      this.watching = !0, this.registerHooks(t.hooks, t.hooks.eventTypes.end, this.checkPullDown), this.registerHooks(this.scroll, this.scroll.eventTypes.scrollStart, this.resetStateBeforeScrollStart), this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkLocationOfThresholdBoundary), this.hasMouseWheelPlugin() && this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
    }, e.prototype.resetStateBeforeScrollStart = function() {
      this.isFetchingStatus() || (this.setPulling(
        1
        /* MOVING */
      ), this.setThresholdBoundary(
        0
        /* DEFAULT */
      ));
    }, e.prototype.checkLocationOfThresholdBoundary = function() {
      if (this.pulling === 1) {
        var t = this.scroll, o = this.thresholdBoundary !== 1 && this.locateInsideThresholdBoundary(), r = this.thresholdBoundary !== 2 && !this.locateInsideThresholdBoundary();
        o && (this.setThresholdBoundary(
          1
          /* INSIDE */
        ), t.trigger($o)), r && (this.setThresholdBoundary(
          2
          /* OUTSIDE */
        ), t.trigger(tr));
      }
    }, e.prototype.locateInsideThresholdBoundary = function() {
      return this.scroll.y <= this.options.threshold;
    }, e.prototype.unwatch = function() {
      var t = this.scroll, o = t.scroller;
      this.watching = !1, o.hooks.off(o.hooks.eventTypes.end, this.checkPullDown), t.off(t.eventTypes.scrollStart, this.resetStateBeforeScrollStart), t.off(t.eventTypes.scroll, this.checkLocationOfThresholdBoundary), this.hasMouseWheelPlugin() && t.off(t.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
    }, e.prototype.checkPullDown = function() {
      var t = this.options, o = t.threshold, r = t.stop;
      return this.scroll.y < o ? !1 : (this.pulling === 1 && (this.modifyBehaviorYBoundary(r), this.setPulling(
        2
        /* FETCHING */
      ), this.scroll.trigger(Le)), this.scroll.scrollTo(this.scroll.x, r, this.scroll.options.bounceTime, C.bounce), this.isFetchingStatus());
    }, e.prototype.isFetchingStatus = function() {
      return this.pulling === 2;
    }, e.prototype.modifyBehaviorYBoundary = function(t) {
      var o = this.scroll.scroller.scrollBehaviorY;
      this.cachedOriginanMinScrollY = o.minScrollPos, this.currentMinScrollY = t, o.computeBoundary();
    }, e.prototype.finishPullDown = function() {
      if (this.isFetchingStatus()) {
        var t = this.scroll.scroller.scrollBehaviorY;
        this.currentMinScrollY = this.cachedOriginanMinScrollY, t.computeBoundary(), this.setPulling(
          0
          /* DEFAULT */
        ), this.scroll.resetPosition(this.scroll.options.bounceTime, C.bounce);
      }
    }, e.prototype.openPullDown = function(t) {
      t === void 0 && (t = {}), this.handleOptions(t), this.watching || this.watch();
    }, e.prototype.closePullDown = function() {
      this.unwatch();
    }, e.prototype.autoPullDownRefresh = function() {
      var t = this.options, o = t.threshold, r = t.stop;
      this.isFetchingStatus() || !this.watching || (this.modifyBehaviorYBoundary(r), this.scroll.trigger(this.scroll.eventTypes.scrollStart), this.scroll.scrollTo(this.scroll.x, o), this.setPulling(
        2
        /* FETCHING */
      ), this.scroll.trigger(Le), this.scroll.scrollTo(this.scroll.x, r, this.scroll.options.bounceTime, C.bounce));
    }, e.pluginName = "pullDownRefresh", e;
  }()
), Fn = "plugins.pullUpLoad", Ln = [
  {
    key: "finishPullUp",
    name: "finishPullUp"
  },
  {
    key: "openPullUp",
    name: "openPullUp"
  },
  {
    key: "closePullUp",
    name: "closePullUp"
  },
  {
    key: "autoPullUpLoad",
    name: "autoPullUpLoad"
  }
], Vn = Ln.map(function(e) {
  return {
    key: e.key,
    sourceKey: Fn + "." + e.name
  };
}), er = "pullingUp", Wn = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.pulling = !1, this.watching = !1, this.init();
    }
    return e.prototype.init = function() {
      this.handleBScroll(), this.handleOptions(this.scroll.options.pullUpLoad), this.handleHooks(), this.watch();
    }, e.prototype.handleBScroll = function() {
      this.scroll.registerType([er]), this.scroll.proxy(Vn);
    }, e.prototype.handleOptions = function(t) {
      t === void 0 && (t = {}), t = t === !0 ? {} : t;
      var o = {
        threshold: 0
      };
      this.options = B(o, t), this.scroll.options.probeType = 3;
    }, e.prototype.handleHooks = function() {
      var t = this;
      this.hooksFn = [];
      var o = this.scroll.scroller.scrollBehaviorY;
      this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function() {
        t.finishPullUp();
      }), this.registerHooks(o.hooks, o.hooks.eventTypes.computeBoundary, function(r) {
        r.maxScrollPos > 0 && (r.maxScrollPos = -1);
      });
    }, e.prototype.registerHooks = function(t, o, r) {
      t.on(o, r, this), this.hooksFn.push([t, o, r]);
    }, e.prototype.watch = function() {
      this.watching || (this.watching = !0, this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkPullUp));
    }, e.prototype.unwatch = function() {
      this.watching = !1, this.scroll.off(this.scroll.eventTypes.scroll, this.checkPullUp);
    }, e.prototype.checkPullUp = function(t) {
      var o = this, r = this.options.threshold;
      this.scroll.movingDirectionY === 1 && t.y <= this.scroll.maxScrollY + r && (this.pulling = !0, this.scroll.once(this.scroll.eventTypes.scrollEnd, function() {
        o.pulling = !1;
      }), this.unwatch(), this.scroll.trigger(er));
    }, e.prototype.finishPullUp = function() {
      var t = this;
      this.scroll.scroller.scrollBehaviorY.setMovingDirection(
        0
        /* Default */
      ), this.pulling ? this.scroll.once(this.scroll.eventTypes.scrollEnd, function() {
        t.watch();
      }) : this.watch();
    }, e.prototype.openPullUp = function(t) {
      t === void 0 && (t = {}), this.handleOptions(t), this.watch();
    }, e.prototype.closePullUp = function() {
      this.unwatch();
    }, e.prototype.autoPullUpLoad = function() {
      var t = this.options.threshold, o = this.scroll.scroller.scrollBehaviorY;
      if (!(this.pulling || !this.watching)) {
        var r = -1, s = o.maxScrollPos + t + r;
        this.scroll.scroller.scrollBehaviorY.setMovingDirection(r), this.scroll.scrollTo(this.scroll.x, s, this.scroll.options.bounceTime);
      }
    }, e.pluginName = "pullUpLoad", e;
  }()
), Un = (
  /** @class */
  function() {
    function e(t, o) {
      this.indicator = t, this.options = o, this.hooks = new it(["touchStart", "touchMove", "touchEnd"]), this.registerEvents();
    }
    return e.prototype.registerEvents = function() {
      var t = this.options, o = t.disableMouse, r = t.disableTouch, s = [], i = [], n = [];
      o || (s.push({
        name: "mousedown",
        handler: this.start.bind(this)
      }), i.push({
        name: "mousemove",
        handler: this.move.bind(this)
      }), n.push({
        name: "mouseup",
        handler: this.end.bind(this)
      })), r || (s.push({
        name: "touchstart",
        handler: this.start.bind(this)
      }), i.push({
        name: "touchmove",
        handler: this.move.bind(this)
      }), n.push({
        name: "touchend",
        handler: this.end.bind(this)
      }, {
        name: "touchcancel",
        handler: this.end.bind(this)
      })), this.startEventRegister = new R(this.indicator.indicatorEl, s), this.moveEventRegister = new R(window, i), this.endEventRegister = new R(window, n);
    }, e.prototype.BScrollIsDisabled = function() {
      return !this.indicator.scroll.enabled;
    }, e.prototype.start = function(t) {
      if (!this.BScrollIsDisabled()) {
        var o = t.touches ? t.touches[0] : t;
        xt(t), t.stopPropagation(), this.initiated = !0, this.lastPoint = o[this.indicator.keysMap.point], this.hooks.trigger(this.hooks.eventTypes.touchStart);
      }
    }, e.prototype.move = function(t) {
      if (this.initiated) {
        var o = t.touches ? t.touches[0] : t, r = o[this.indicator.keysMap.point];
        xt(t), t.stopPropagation();
        var s = r - this.lastPoint;
        this.lastPoint = r, this.hooks.trigger(this.hooks.eventTypes.touchMove, s);
      }
    }, e.prototype.end = function(t) {
      this.initiated && (this.initiated = !1, xt(t), t.stopPropagation(), this.hooks.trigger(this.hooks.eventTypes.touchEnd));
    }, e.prototype.destroy = function() {
      this.startEventRegister.destroy(), this.moveEventRegister.destroy(), this.endEventRegister.destroy();
    }, e;
  }()
), Kn = (
  /** @class */
  function() {
    function e(t, o) {
      this.scroll = t, this.options = o, this.hooksFn = [], this.wrapper = o.wrapper, this.direction = o.direction, this.indicatorEl = this.wrapper.children[0], this.keysMap = this.getKeysMap(), this.handleFade(), this.handleHooks();
    }
    return e.prototype.handleFade = function() {
      this.options.fade && (this.wrapper.style.opacity = "0");
    }, e.prototype.handleHooks = function() {
      var t = this, o = this.options, r = o.fade, s = o.interactive, i = o.scrollbarTrackClickable, n = this.scroll, a = n.hooks, c = n.scroller.translater.hooks, l = n.scroller.animater.hooks;
      if (this.registerHooks(a, a.eventTypes.refresh, this.refresh), this.registerHooks(c, c.eventTypes.translate, function(d) {
        var T = t.keysMap.hasScroll;
        t.scroll[T] && t.updatePosition(d);
      }), this.registerHooks(l, l.eventTypes.time, this.transitionTime), this.registerHooks(l, l.eventTypes.timeFunction, this.transitionTimingFunction), r && (this.registerHooks(n, n.eventTypes.scrollEnd, function() {
        t.fade();
      }), this.registerHooks(n, n.eventTypes.scrollStart, function() {
        t.fade(!0);
      }), n.eventTypes.mousewheelStart && n.eventTypes.mousewheelEnd && (this.registerHooks(n, n.eventTypes.mousewheelStart, function() {
        t.fade(!0);
      }), this.registerHooks(n, n.eventTypes.mousewheelMove, function() {
        t.fade(!0);
      }), this.registerHooks(n, n.eventTypes.mousewheelEnd, function() {
        t.fade();
      }))), s) {
        var u = this.scroll.options, h = u.disableMouse, p = u.disableTouch;
        this.eventHandler = new Un(this, {
          disableMouse: h,
          disableTouch: p
        });
        var f = this.eventHandler.hooks;
        this.registerHooks(f, f.eventTypes.touchStart, this.startHandler), this.registerHooks(f, f.eventTypes.touchMove, this.moveHandler), this.registerHooks(f, f.eventTypes.touchEnd, this.endHandler);
      }
      i && this.bindClick();
    }, e.prototype.registerHooks = function(t, o, r) {
      t.on(o, r, this), this.hooksFn.push([t, o, r]);
    }, e.prototype.bindClick = function() {
      var t = this.wrapper;
      this.clickEventRegister = new R(t, [
        {
          name: "click",
          handler: this.handleClick.bind(this)
        }
      ]);
    }, e.prototype.handleClick = function(t) {
      var o = this.calculateclickOffsetPos(t), r = this.scroll, s = r.x, i = r.y;
      s = this.direction === "horizontal" ? o : s, i = this.direction === "vertical" ? o : i, this.scroll.scrollTo(s, i, this.options.scrollbarTrackOffsetTime);
    }, e.prototype.calculateclickOffsetPos = function(t) {
      var o = this.keysMap, r = o.point, s = o.domRect, i = this.options.scrollbarTrackOffsetType, n = t[r] - this.wrapperRect[s], a = n < this.currentPos ? -1 : 1, c = 0, l = this.currentPos;
      return i === "step" ? c = this.scrollInfo.baseSize * a : (c = 0, l = n), this.newPos(l, c, this.scrollInfo);
    }, e.prototype.getKeysMap = function() {
      return this.direction === "vertical" ? {
        hasScroll: "hasVerticalScroll",
        size: "height",
        wrapperSize: "clientHeight",
        scrollerSize: "scrollerHeight",
        maxScrollPos: "maxScrollY",
        pos: "y",
        point: "pageY",
        translateProperty: "translateY",
        domRect: "top"
      } : {
        hasScroll: "hasHorizontalScroll",
        size: "width",
        wrapperSize: "clientWidth",
        scrollerSize: "scrollerWidth",
        maxScrollPos: "maxScrollX",
        pos: "x",
        point: "pageX",
        translateProperty: "translateX",
        domRect: "left"
      };
    }, e.prototype.fade = function(t) {
      var o = this.options, r = o.fadeInTime, s = o.fadeOutTime, i = t ? r : s, n = this.wrapper;
      n.style[k.transitionDuration] = i + "ms", n.style.opacity = t ? "1" : "0";
    }, e.prototype.refresh = function() {
      var t = this.keysMap.hasScroll, o = this.scroll, r = o.x, s = o.y;
      if (this.wrapperRect = this.wrapper.getBoundingClientRect(), this.canScroll(o[t])) {
        var i = this.keysMap, n = i.wrapperSize, a = i.scrollerSize, c = i.maxScrollPos;
        this.scrollInfo = this.refreshScrollInfo(this.wrapper[n], o[a], o[c], this.indicatorEl[n]), this.updatePosition({
          x: r,
          y: s
        });
      }
    }, e.prototype.transitionTime = function(t) {
      t === void 0 && (t = 0), this.indicatorEl.style[k.transitionDuration] = t + "ms";
    }, e.prototype.transitionTimingFunction = function(t) {
      this.indicatorEl.style[k.transitionTimingFunction] = t;
    }, e.prototype.canScroll = function(t) {
      return this.wrapper.style.display = t ? "block" : "none", t;
    }, e.prototype.refreshScrollInfo = function(t, o, r, s) {
      var i = Math.max(Math.round(t * t / (o || t || 1)), this.options.minSize);
      this.options.isCustom && (i = s);
      var n = t - i, a = n / r;
      return {
        baseSize: i,
        maxScrollPos: n,
        minScrollPos: 0,
        sizeRatio: a
      };
    }, e.prototype.updatePosition = function(t) {
      var o = this.caculatePosAndSize(t, this.scrollInfo), r = o.pos, s = o.size;
      this.refreshStyle(s, r), this.currentPos = r;
    }, e.prototype.caculatePosAndSize = function(t, o) {
      var r = this.keysMap.pos, s = o.sizeRatio, i = o.baseSize, n = o.maxScrollPos, a = o.minScrollPos, c = this.options.minSize, l = Math.round(s * t[r]), u;
      return l < a ? (u = Math.max(i + l * 3, c), l = a) : l > n ? (u = Math.max(i - (l - n) * 3, c), l = n + i - u) : u = i, {
        pos: l,
        size: u
      };
    }, e.prototype.refreshStyle = function(t, o) {
      var r = this.keysMap, s = r.translateProperty, i = r.size, n = this.scroll.options.translateZ;
      this.indicatorEl.style[i] = t + "px", this.indicatorEl.style[k.transform] = s + "(" + o + "px)" + n;
    }, e.prototype.startHandler = function() {
      this.moved = !1, this.startTime = F(), this.transitionTime(), this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.beforeScrollStart);
    }, e.prototype.moveHandler = function(t) {
      if (!this.moved && !this.indicatorNotMoved(t) && (this.moved = !0, this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollStart)), this.moved) {
        var o = this.newPos(this.currentPos, t, this.scrollInfo);
        this.syncBScroll(o);
      }
    }, e.prototype.endHandler = function() {
      if (this.moved) {
        var t = this.scroll, o = t.x, r = t.y;
        this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollEnd, {
          x: o,
          y: r
        });
      }
    }, e.prototype.indicatorNotMoved = function(t) {
      var o = this.currentPos, r = this.scrollInfo, s = r.maxScrollPos, i = r.minScrollPos, n = o === i && t <= 0 || o === s && t >= 0;
      return n;
    }, e.prototype.syncBScroll = function(t) {
      var o = F(), r = this.scroll, s = r.x, i = r.y, n = r.options, a = r.scroller, c = r.maxScrollY, l = r.minScrollY, u = r.maxScrollX, h = r.minScrollX, p = n.probeType, f = n.momentumLimitTime, d = { x: s, y: i };
      this.direction === "vertical" ? d.y = P(t, c, l) : d.x = P(t, u, h), a.translater.translate(d), o - this.startTime > f && (this.startTime = o, p === 1 && a.hooks.trigger(a.hooks.eventTypes.scroll, d)), p > 1 && a.hooks.trigger(a.hooks.eventTypes.scroll, d);
    }, e.prototype.newPos = function(t, o, r) {
      var s = r.maxScrollPos, i = r.sizeRatio, n = r.minScrollPos, a = t + o;
      return a = P(a, n, s), Math.round(a / i);
    }, e.prototype.destroy = function() {
      var t = this.options, o = t.interactive, r = t.scrollbarTrackClickable, s = t.isCustom;
      o && this.eventHandler.destroy(), r && this.clickEventRegister.destroy(), s || this.wrapper.parentNode.removeChild(this.wrapper), this.hooksFn.forEach(function(i) {
        var n = i[0], a = i[1], c = i[2];
        n.off(a, c);
      }), this.hooksFn.length = 0;
    }, e;
  }()
), jn = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.handleOptions(), this.createIndicators(), this.handleHooks();
    }
    return e.prototype.handleHooks = function() {
      var t = this, o = this.scroll;
      o.hooks.on(o.hooks.eventTypes.destroy, function() {
        for (var r = 0, s = t.indicators; r < s.length; r++) {
          var i = s[r];
          i.destroy();
        }
      });
    }, e.prototype.handleOptions = function() {
      var t = this.scroll.options.scrollbar === !0 ? {} : this.scroll.options.scrollbar, o = {
        fade: !0,
        fadeInTime: 250,
        fadeOutTime: 500,
        interactive: !1,
        customElements: [],
        minSize: 8,
        scrollbarTrackClickable: !1,
        scrollbarTrackOffsetType: "step",
        scrollbarTrackOffsetTime: 300
      };
      this.options = B(o, t);
    }, e.prototype.createIndicators = function() {
      for (var t, o = this.scroll, r = [], s = ["scrollX", "scrollY"], i = [
        "horizontal",
        "vertical"
      ], n = this.options.customElements, a = 0; a < s.length; a++) {
        var c = s[a];
        if (o.options[c]) {
          var l = n.shift(), u = i[a], h = !1, p = l || this.createScrollbarElement(u);
          p !== l ? o.wrapper.appendChild(p) : h = !0, t = Q(Q({ wrapper: p, direction: u }, this.options), { isCustom: h }), r.push(new Kn(o, t));
        }
      }
      this.indicators = r;
    }, e.prototype.createScrollbarElement = function(t, o) {
      o === void 0 && (o = this.options.scrollbarTrackClickable);
      var r = document.createElement("div"), s = document.createElement("div");
      return r.style.cssText = "position:absolute;z-index:9999;overflow:hidden;", s.style.cssText = "box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;", s.className = "bscroll-indicator", t === "horizontal" ? (r.style.cssText += "height:7px;left:2px;right:2px;bottom:0;", s.style.height = "100%", r.className = "bscroll-horizontal-scrollbar") : (r.style.cssText += "width:7px;bottom:2px;top:2px;right:1px;", s.style.width = "100%", r.className = "bscroll-vertical-scrollbar"), o || (r.style.cssText += "pointer-events:none;"), r.appendChild(s), r;
    }, e.pluginName = "scrollbar", e;
  }()
), Qr = {
  pageX: 0,
  pageY: 0,
  x: 0,
  y: 0
}, qn = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  cx: 0,
  cy: 0
}, Gn = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.init();
    }
    return e.prototype.init = function() {
      var t = this.scroll.scroller, o = t.scrollBehaviorX, r = t.scrollBehaviorY;
      this.wrapperWidth = o.wrapperSize, this.wrapperHeight = r.wrapperSize, this.scrollerHeight = r.contentSize, this.scrollerWidth = o.contentSize, this.pages = this.buildPagesMatrix(this.wrapperWidth, this.wrapperHeight), this.pageLengthOfX = this.pages ? this.pages.length : 0, this.pageLengthOfY = this.pages && this.pages[0] ? this.pages[0].length : 0;
    }, e.prototype.getPageStats = function(t, o) {
      return this.pages[t] && this.pages[t][o] ? this.pages[t][o] : qn;
    }, e.prototype.getNearestPageIndex = function(t, o) {
      for (var r = 0, s = 0, i = this.pages.length; r < i - 1 && !(t >= this.pages[r][0].cx); r++)
        ;
      for (i = this.pages[r] ? this.pages[r].length : 0; s < i - 1 && !(o >= this.pages[0][s].cy); s++)
        ;
      return {
        pageX: r,
        pageY: s
      };
    }, e.prototype.buildPagesMatrix = function(t, o) {
      var r = [], s = 0, i, n, a, c = 0, l, u = this.scroll.scroller.scrollBehaviorX.maxScrollPos, h = this.scroll.scroller.scrollBehaviorY.maxScrollPos;
      for (n = Math.round(t / 2), a = Math.round(o / 2); s > -this.scrollerWidth; ) {
        for (r[c] = [], l = 0, i = 0; i > -this.scrollerHeight; )
          r[c][l] = {
            x: Math.max(s, u),
            y: Math.max(i, h),
            width: t,
            height: o,
            cx: s - n,
            cy: i - a
          }, i -= o, l++;
        s -= t, c++;
      }
      return r;
    }, e;
  }()
), Zn = (
  /** @class */
  function() {
    function e(t, o) {
      this.scroll = t, this.slideOptions = o, this.slideX = !1, this.slideY = !1, this.currentPage = B({}, Qr);
    }
    return e.prototype.refresh = function() {
      this.pagesMatrix = new Gn(this.scroll), this.checkSlideLoop(), this.currentPage = this.getAdjustedCurrentPage();
    }, e.prototype.getAdjustedCurrentPage = function() {
      var t = this.currentPage, o = t.pageX, r = t.pageY;
      o = Math.min(o, this.pagesMatrix.pageLengthOfX - 1), r = Math.min(r, this.pagesMatrix.pageLengthOfY - 1), this.loopX && (o = Math.min(o, this.pagesMatrix.pageLengthOfX - 2)), this.loopY && (r = Math.min(r, this.pagesMatrix.pageLengthOfY - 2));
      var s = this.pagesMatrix.getPageStats(o, r), i = s.x, n = s.y;
      return { pageX: o, pageY: r, x: i, y: n };
    }, e.prototype.setCurrentPage = function(t) {
      this.currentPage = t;
    }, e.prototype.getInternalPage = function(t, o) {
      t >= this.pagesMatrix.pageLengthOfX ? t = this.pagesMatrix.pageLengthOfX - 1 : t < 0 && (t = 0), o >= this.pagesMatrix.pageLengthOfY ? o = this.pagesMatrix.pageLengthOfY - 1 : o < 0 && (o = 0);
      var r = this.pagesMatrix.getPageStats(t, o), s = r.x, i = r.y;
      return {
        pageX: t,
        pageY: o,
        x: s,
        y: i
      };
    }, e.prototype.getInitialPage = function(t, o) {
      t === void 0 && (t = !1), o === void 0 && (o = !1);
      var r = this.slideOptions, s = r.startPageXIndex, i = r.startPageYIndex, n = this.loopX ? 1 : 0, a = this.loopY ? 1 : 0, c = t ? n : this.currentPage.pageX, l = t ? a : this.currentPage.pageY;
      o ? (c = this.loopX ? s + 1 : s, l = this.loopY ? i + 1 : i) : (c = t ? n : this.currentPage.pageX, l = t ? a : this.currentPage.pageY);
      var u = this.pagesMatrix.getPageStats(c, l), h = u.x, p = u.y;
      return {
        pageX: c,
        pageY: l,
        x: h,
        y: p
      };
    }, e.prototype.getExposedPage = function(t) {
      var o = B({}, t);
      return this.loopX && (o.pageX = this.fixedPage(o.pageX, this.pagesMatrix.pageLengthOfX - 2)), this.loopY && (o.pageY = this.fixedPage(o.pageY, this.pagesMatrix.pageLengthOfY - 2)), o;
    }, e.prototype.getExposedPageByPageIndex = function(t, o) {
      var r = {
        pageX: t,
        pageY: o
      };
      this.loopX && (r.pageX = t + 1), this.loopY && (r.pageY = o + 1);
      var s = this.pagesMatrix.getPageStats(r.pageX, r.pageY), i = s.x, n = s.y;
      return {
        x: i,
        y: n,
        pageX: t,
        pageY: o
      };
    }, e.prototype.getWillChangedPage = function(t) {
      return t = B({}, t), this.loopX && (t.pageX = this.fixedPage(t.pageX, this.pagesMatrix.pageLengthOfX - 2), t.x = this.pagesMatrix.getPageStats(t.pageX + 1, 0).x), this.loopY && (t.pageY = this.fixedPage(t.pageY, this.pagesMatrix.pageLengthOfY - 2), t.y = this.pagesMatrix.getPageStats(0, t.pageY + 1).y), t;
    }, e.prototype.fixedPage = function(t, o) {
      for (var r = [], s = 0; s < o; s++)
        r.push(s);
      return r.unshift(o - 1), r.push(0), r[t];
    }, e.prototype.getPageStats = function() {
      return this.pagesMatrix.getPageStats(this.currentPage.pageX, this.currentPage.pageY);
    }, e.prototype.getValidPageIndex = function(t, o) {
      var r = this.pagesMatrix.pageLengthOfX - 1, s = this.pagesMatrix.pageLengthOfY - 1, i = 0, n = 0;
      return this.loopX && (t += 1, i = i + 1, r = r - 1), this.loopY && (o += 1, n = n + 1, s = s - 1), t = P(t, i, r), o = P(o, n, s), {
        pageX: t,
        pageY: o
      };
    }, e.prototype.nextPageIndex = function() {
      return this.getPageIndexByDirection(
        "positive"
        /* Positive */
      );
    }, e.prototype.prevPageIndex = function() {
      return this.getPageIndexByDirection(
        "negative"
        /* Negative */
      );
    }, e.prototype.getNearestPage = function(t, o) {
      var r = this.pagesMatrix.getNearestPageIndex(t, o), s = r.pageX, i = r.pageY, n = this.pagesMatrix.getPageStats(s, 0).x, a = this.pagesMatrix.getPageStats(0, i).y;
      return {
        x: n,
        y: a,
        pageX: s,
        pageY: i
      };
    }, e.prototype.getPageByDirection = function(t, o, r) {
      var s = t.pageX, i = t.pageY;
      s === this.currentPage.pageX && (s = P(s + o, 0, this.pagesMatrix.pageLengthOfX - 1)), i === this.currentPage.pageY && (i = P(i + r, 0, this.pagesMatrix.pageLengthOfY - 1));
      var n = this.pagesMatrix.getPageStats(s, 0).x, a = this.pagesMatrix.getPageStats(0, i).y;
      return {
        x: n,
        y: a,
        pageX: s,
        pageY: i
      };
    }, e.prototype.resetLoopPage = function() {
      if (this.loopX) {
        if (this.currentPage.pageX === 0)
          return {
            pageX: this.pagesMatrix.pageLengthOfX - 2,
            pageY: this.currentPage.pageY
          };
        if (this.currentPage.pageX === this.pagesMatrix.pageLengthOfX - 1)
          return {
            pageX: 1,
            pageY: this.currentPage.pageY
          };
      }
      if (this.loopY) {
        if (this.currentPage.pageY === 0)
          return {
            pageX: this.currentPage.pageX,
            pageY: this.pagesMatrix.pageLengthOfY - 2
          };
        if (this.currentPage.pageY === this.pagesMatrix.pageLengthOfY - 1)
          return {
            pageX: this.currentPage.pageX,
            pageY: 1
          };
      }
    }, e.prototype.getPageIndexByDirection = function(t) {
      var o = this.currentPage.pageX, r = this.currentPage.pageY;
      return this.slideX && (o = t === "negative" ? o - 1 : o + 1), this.slideY && (r = t === "negative" ? r - 1 : r + 1), {
        pageX: o,
        pageY: r
      };
    }, e.prototype.checkSlideLoop = function() {
      this.wannaLoop = this.slideOptions.loop, this.pagesMatrix.pageLengthOfX > 1 ? this.slideX = !0 : this.slideX = !1, this.pagesMatrix.pages[0] && this.pagesMatrix.pageLengthOfY > 1 ? this.slideY = !0 : this.slideY = !1, this.loopX = this.wannaLoop && this.slideX, this.loopY = this.wannaLoop && this.slideY, this.slideX && this.slideY && Z("slide does not support two direction at the same time.");
    }, e;
  }()
), Qn = "plugins.slide", Jn = [
  {
    key: "next",
    name: "next"
  },
  {
    key: "prev",
    name: "prev"
  },
  {
    key: "goToPage",
    name: "goToPage"
  },
  {
    key: "getCurrentPage",
    name: "getCurrentPage"
  },
  {
    key: "startPlay",
    name: "startPlay"
  },
  {
    key: "pausePlay",
    name: "pausePlay"
  }
], $n = Jn.map(function(e) {
  return {
    key: e.key,
    sourceKey: Qn + "." + e.name
  };
}), ta = function(e, t) {
  return e.pageX === t.pageX && e.pageY === t.pageY;
}, ea = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.cachedClonedPageDOM = [], this.resetLooping = !1, this.autoplayTimer = 0, this.satisfyInitialization() && this.init();
    }
    return e.prototype.satisfyInitialization = function() {
      return this.scroll.scroller.content.children.length <= 0 ? (Z("slide need at least one slide page to be initialised.please check your DOM layout."), !1) : !0;
    }, e.prototype.init = function() {
      this.willChangeToPage = B({}, Qr), this.handleBScroll(), this.handleOptions(), this.handleHooks(), this.createPages();
    }, e.prototype.createPages = function() {
      this.pages = new Zn(this.scroll, this.options);
    }, e.prototype.handleBScroll = function() {
      this.scroll.registerType(["slideWillChange", "slidePageChanged"]), this.scroll.proxy($n);
    }, e.prototype.handleOptions = function() {
      var t = this.scroll.options.slide === !0 ? {} : this.scroll.options.slide, o = {
        loop: !0,
        threshold: 0.1,
        speed: 400,
        easing: C.bounce,
        listenFlick: !0,
        autoplay: !0,
        interval: 3e3,
        startPageXIndex: 0,
        startPageYIndex: 0
      };
      this.options = B(o, t);
    }, e.prototype.handleLoop = function(t) {
      var o = this.options.loop, r = this.scroll.scroller.content, s = r.children.length;
      o && (r !== t ? (this.resetLoopChangedStatus(), this.removeClonedSlidePage(t), s > 1 && this.cloneFirstAndLastSlidePage(r)) : s === 3 && this.initialised ? (this.removeClonedSlidePage(r), this.moreToOnePageInLoop = !0, this.oneToMorePagesInLoop = !1) : s > 1 ? (this.initialised && this.cachedClonedPageDOM.length === 0 ? (this.oneToMorePagesInLoop = !0, this.moreToOnePageInLoop = !1) : (this.removeClonedSlidePage(r), this.resetLoopChangedStatus()), this.cloneFirstAndLastSlidePage(r)) : this.resetLoopChangedStatus());
    }, e.prototype.resetLoopChangedStatus = function() {
      this.moreToOnePageInLoop = !1, this.oneToMorePagesInLoop = !1;
    }, e.prototype.handleHooks = function() {
      var t = this, o = this.scroll.hooks, r = this.scroll.scroller.hooks, s = this.options.listenFlick;
      this.prevContent = this.scroll.scroller.content, this.hooksFn = [], this.registerHooks(this.scroll, this.scroll.eventTypes.beforeScrollStart, this.pausePlay), this.registerHooks(this.scroll, this.scroll.eventTypes.scrollEnd, this.modifyCurrentPage), this.registerHooks(this.scroll, this.scroll.eventTypes.scrollEnd, this.startPlay), this.scroll.eventTypes.mousewheelMove && (this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelMove, function() {
        return !0;
      }), this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelEnd, function(i) {
        (i.directionX === 1 || i.directionY === 1) && t.next(), (i.directionX === -1 || i.directionY === -1) && t.prev();
      })), this.registerHooks(o, o.eventTypes.refresh, this.refreshHandler), this.registerHooks(o, o.eventTypes.destroy, this.destroy), this.registerHooks(r, r.eventTypes.beforeRefresh, function() {
        t.handleLoop(t.prevContent), t.setSlideInlineStyle();
      }), this.registerHooks(r, r.eventTypes.momentum, this.modifyScrollMetaHandler), this.registerHooks(r, r.eventTypes.scroll, this.scrollHandler), this.registerHooks(r, r.eventTypes.checkClick, this.startPlay), s && this.registerHooks(r, r.eventTypes.flick, this.flickHandler);
    }, e.prototype.startPlay = function() {
      var t = this, o = this.options, r = o.interval, s = o.autoplay;
      s && (clearTimeout(this.autoplayTimer), this.autoplayTimer = window.setTimeout(function() {
        t.next();
      }, r));
    }, e.prototype.pausePlay = function() {
      this.options.autoplay && clearTimeout(this.autoplayTimer);
    }, e.prototype.setSlideInlineStyle = function() {
      var t = [
        {
          direction: "scrollX",
          sizeType: "offsetWidth",
          styleType: "width"
        },
        {
          direction: "scrollY",
          sizeType: "offsetHeight",
          styleType: "height"
        }
      ], o = this.scroll.scroller, r = o.content, s = o.wrapper, i = this.scroll.options;
      t.forEach(function(n) {
        var a = n.direction, c = n.sizeType, l = n.styleType;
        if (i[a]) {
          for (var u = s[c], h = r.children, p = h.length, f = 0; f < p; f++) {
            var d = h[f];
            d.style[l] = u + "px";
          }
          r.style[l] = u * p + "px";
        }
      });
    }, e.prototype.next = function(t, o) {
      var r = this.pages.nextPageIndex(), s = r.pageX, i = r.pageY;
      this.goTo(s, i, t, o);
    }, e.prototype.prev = function(t, o) {
      var r = this.pages.prevPageIndex(), s = r.pageX, i = r.pageY;
      this.goTo(s, i, t, o);
    }, e.prototype.goToPage = function(t, o, r, s) {
      var i = this.pages.getValidPageIndex(t, o);
      this.goTo(i.pageX, i.pageY, r, s);
    }, e.prototype.getCurrentPage = function() {
      return this.exposedPage || this.pages.getInitialPage(!1, !0);
    }, e.prototype.setCurrentPage = function(t) {
      this.pages.setCurrentPage(t), this.exposedPage = this.pages.getExposedPage(t);
    }, e.prototype.nearestPage = function(t, o) {
      var r = this.scroll.scroller, s = r.scrollBehaviorX, i = r.scrollBehaviorY, n = s.maxScrollPos, a = s.minScrollPos, c = i.maxScrollPos, l = i.minScrollPos;
      return this.pages.getNearestPage(P(t, n, a), P(o, c, l));
    }, e.prototype.satisfyThreshold = function(t, o) {
      var r = this.scroll.scroller, s = r.scrollBehaviorX, i = r.scrollBehaviorY, n = !0;
      return Math.abs(t - s.absStartPos) <= this.thresholdX && Math.abs(o - i.absStartPos) <= this.thresholdY && (n = !1), n;
    }, e.prototype.refreshHandler = function(t) {
      var o = this;
      if (this.satisfyInitialization()) {
        this.pages.refresh(), this.computeThreshold();
        var r = this.contentChanged = this.prevContent !== t;
        r && (this.prevContent = t);
        var s = this.pages.getInitialPage(this.oneToMorePagesInLoop || this.moreToOnePageInLoop, r || !this.initialised);
        this.initialised ? this.goTo(s.pageX, s.pageY, 0) : this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.beforeInitialScrollTo, function(i) {
          o.initialised = !0, i.x = s.x, i.y = s.y;
        }), this.startPlay();
      }
    }, e.prototype.computeThreshold = function() {
      var t = this.options.threshold;
      if (t % 1 === 0)
        this.thresholdX = t, this.thresholdY = t;
      else {
        var o = this.pages.getPageStats(), r = o.width, s = o.height;
        this.thresholdX = Math.round(r * t), this.thresholdY = Math.round(s * t);
      }
    }, e.prototype.cloneFirstAndLastSlidePage = function(t) {
      var o = t.children, r = o[o.length - 1].cloneNode(!0), s = o[0].cloneNode(!0);
      un(r, t), t.appendChild(s), this.cachedClonedPageDOM = [r, s];
    }, e.prototype.removeClonedSlidePage = function(t) {
      var o = t && t.children || [];
      o.length && this.cachedClonedPageDOM.forEach(function(r) {
        fn(t, r);
      }), this.cachedClonedPageDOM = [];
    }, e.prototype.modifyCurrentPage = function(t) {
      var o = this.getCurrentPage(), r = o.pageX, s = o.pageY, i = this.nearestPage(t.x, t.y);
      if (this.setCurrentPage(i), this.contentChanged)
        return this.contentChanged = !1, !0;
      var n = this.getCurrentPage(), a = n.pageX, c = n.pageY;
      if (this.pageWillChangeTo(i), this.oneToMorePagesInLoop)
        return this.oneToMorePagesInLoop = !1, !0;
      if (this.moreToOnePageInLoop && r === 0 && s === 0)
        return this.moreToOnePageInLoop = !1, !0;
      if (r !== a || s !== c) {
        var l = this.pages.getExposedPageByPageIndex(a, c);
        this.scroll.trigger(this.scroll.eventTypes.slidePageChanged, l);
      }
      if (this.resetLooping) {
        this.resetLooping = !1;
        return;
      }
      var u = this.pages.resetLoopPage();
      if (u)
        return this.resetLooping = !0, this.goTo(u.pageX, u.pageY, 0), !0;
    }, e.prototype.goTo = function(t, o, r, s) {
      var i = this.pages.getInternalPage(t, o), n = s || this.options.easing || C.bounce, a = i.x, c = i.y, l = a - this.scroll.scroller.scrollBehaviorX.currentPos, u = c - this.scroll.scroller.scrollBehaviorY.currentPos;
      if (!l && !u) {
        this.scroll.scroller.togglePointerEvents(!0);
        return;
      }
      r = r === void 0 ? this.getEaseTime(l, u) : r, this.scroll.scroller.scrollTo(a, c, r, n);
    }, e.prototype.flickHandler = function() {
      var t = this.scroll.scroller, o = t.scrollBehaviorX, r = t.scrollBehaviorY, s = o.currentPos, i = o.startPos, n = o.direction, a = r.currentPos, c = r.startPos, l = r.direction, u = this.pages.currentPage, h = u.pageX, p = u.pageY, f = this.getEaseTime(s - i, a - c);
      this.goTo(h + n, p + l, f);
    }, e.prototype.getEaseTime = function(t, o) {
      return this.options.speed || Math.max(Math.max(Math.min(Math.abs(t), 1e3), Math.min(Math.abs(o), 1e3)), 300);
    }, e.prototype.modifyScrollMetaHandler = function(t) {
      var o = this.scroll.scroller, r = o.scrollBehaviorX, s = o.scrollBehaviorY, i = o.animater, n = t.newX, a = t.newY, c = this.satisfyThreshold(n, a) || i.forceStopped ? this.pages.getPageByDirection(this.nearestPage(n, a), r.direction, s.direction) : this.pages.currentPage;
      t.time = this.getEaseTime(t.newX - c.x, t.newY - c.y), t.newX = c.x, t.newY = c.y, t.easing = this.options.easing || C.bounce;
    }, e.prototype.scrollHandler = function(t) {
      var o = t.x, r = t.y;
      if (this.satisfyThreshold(o, r)) {
        var s = this.nearestPage(o, r);
        this.pageWillChangeTo(s);
      }
    }, e.prototype.pageWillChangeTo = function(t) {
      var o = this.pages.getWillChangedPage(t);
      ta(this.willChangeToPage, o) || (this.willChangeToPage = o, this.scroll.trigger(this.scroll.eventTypes.slideWillChange, this.willChangeToPage));
    }, e.prototype.registerHooks = function(t, o, r) {
      t.on(o, r, this), this.hooksFn.push([t, o, r]);
    }, e.prototype.destroy = function() {
      var t = this.scroll.scroller.content, o = this.options, r = o.loop, s = o.autoplay;
      r && this.removeClonedSlidePage(t), s && clearTimeout(this.autoplayTimer), this.hooksFn.forEach(function(i) {
        var n = i[0], a = i[1], c = i[2];
        n.eventTypes[a] && n.off(a, c);
      }), this.hooksFn.length = 0;
    }, e.pluginName = "slide", e;
  }()
), oa = "plugins.wheel", ra = [
  {
    key: "wheelTo",
    name: "wheelTo"
  },
  {
    key: "getSelectedIndex",
    name: "getSelectedIndex"
  },
  {
    key: "restorePosition",
    name: "restorePosition"
  }
], sa = ra.map(function(e) {
  return {
    key: e.key,
    sourceKey: oa + "." + e.name
  };
}), or = "wheelIndexChanged", ia = {
  rate: 4
}, na = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.init();
    }
    return e.prototype.init = function() {
      this.handleBScroll(), this.handleOptions(), this.handleHooks(), this.refreshBoundary(), this.setSelectedIndex(this.options.selectedIndex);
    }, e.prototype.handleBScroll = function() {
      this.scroll.proxy(sa), this.scroll.registerType([or]);
    }, e.prototype.handleOptions = function() {
      var t = this.scroll.options.wheel === !0 ? {} : this.scroll.options.wheel, o = {
        wheelWrapperClass: "wheel-scroll",
        wheelItemClass: "wheel-item",
        rotate: 25,
        adjustTime: 400,
        selectedIndex: 0,
        wheelDisabledItemClass: "wheel-disabled-item"
      };
      this.options = B(o, t);
    }, e.prototype.handleHooks = function() {
      var t = this, o = this.scroll, r = this.scroll.scroller, s = r.actionsHandler, i = r.scrollBehaviorX, n = r.scrollBehaviorY, a = r.animater, c = r.content;
      o.on(o.eventTypes.scrollEnd, function(l) {
        var u = t.findNearestValidWheel(l.y).index;
        if (r.animater.forceStopped && !t.isAdjustingPosition)
          return t.target = t.items[u], !0;
        t.setSelectedIndex(u), t.isAdjustingPosition && (t.isAdjustingPosition = !1);
      }), this.scroll.hooks.on(this.scroll.hooks.eventTypes.refresh, function(l) {
        l !== c && (c = l, t.setSelectedIndex(t.options.selectedIndex, !0)), t.rotateX(t.scroll.y), t.wheelTo(t.selectedIndex, 0);
      }), this.scroll.hooks.on(this.scroll.hooks.eventTypes.beforeInitialScrollTo, function(l) {
        l.x = 0, l.y = -(t.selectedIndex * t.itemHeight);
      }), r.hooks.on(r.hooks.eventTypes.checkClick, function() {
        var l = dn(t.items).indexOf(t.target);
        return l === -1 || t.wheelTo(l, t.options.adjustTime, C.swipe), !0;
      }), r.hooks.on(r.hooks.eventTypes.scrollTo, function(l) {
        l.y = t.findNearestValidWheel(l.y).y;
      }), r.hooks.on(r.hooks.eventTypes.minDistanceScroll, function() {
        var l = r.animater;
        l.forceStopped === !0 && (l.forceStopped = !1);
      }), r.hooks.on(r.hooks.eventTypes.scrollToElement, function(l, u) {
        if (se(l, t.options.wheelItemClass))
          u.top = t.findNearestValidWheel(u.top).y;
        else
          return !0;
      }), s.hooks.on(s.hooks.eventTypes.beforeStart, function(l) {
        t.target = l.target;
      }), i.hooks.on(i.hooks.eventTypes.computeBoundary, function(l) {
        l.maxScrollPos = 0, l.minScrollPos = 0;
      }), n.hooks.on(n.hooks.eventTypes.computeBoundary, function(l) {
        t.items = t.scroll.scroller.content.children, t.checkWheelAllDisabled(), t.itemHeight = t.items.length > 0 ? n.contentSize / t.items.length : 0, l.maxScrollPos = -t.itemHeight * (t.items.length - 1), l.minScrollPos = 0;
      }), n.hooks.on(n.hooks.eventTypes.momentum, function(l) {
        l.rate = ia.rate, l.destination = t.findNearestValidWheel(l.destination).y;
      }), n.hooks.on(n.hooks.eventTypes.end, function(l) {
        var u = t.findNearestValidWheel(n.currentPos);
        l.destination = u.y, l.duration = t.options.adjustTime;
      }), a.hooks.on(a.hooks.eventTypes.time, function(l) {
        t.transitionDuration(l);
      }), a.hooks.on(a.hooks.eventTypes.timeFunction, function(l) {
        t.timeFunction(l);
      }), a.hooks.on(a.hooks.eventTypes.callStop, function() {
        var l = t.findNearestValidWheel(t.scroll.y).index;
        t.isAdjustingPosition = !0, t.wheelTo(l, 0);
      }), a.translater.hooks.on(a.translater.hooks.eventTypes.translate, function(l) {
        t.rotateX(l.y);
      });
    }, e.prototype.refreshBoundary = function() {
      var t = this.scroll.scroller, o = t.scrollBehaviorX, r = t.scrollBehaviorY, s = t.content;
      o.refresh(s), r.refresh(s);
    }, e.prototype.setSelectedIndex = function(t, o) {
      o === void 0 && (o = !1);
      var r = this.selectedIndex;
      this.selectedIndex = t, r !== t && !o && this.scroll.trigger(or, t);
    }, e.prototype.getSelectedIndex = function() {
      return this.selectedIndex;
    }, e.prototype.wheelTo = function(t, o, r) {
      t === void 0 && (t = 0), o === void 0 && (o = 0);
      var s = -t * this.itemHeight;
      this.scroll.scrollTo(0, s, o, r);
    }, e.prototype.restorePosition = function() {
      var t = this.scroll.pending;
      if (t) {
        var o = this.getSelectedIndex();
        this.scroll.scroller.animater.clearTimer(), this.wheelTo(o, 0);
      }
    }, e.prototype.transitionDuration = function(t) {
      for (var o = 0; o < this.items.length; o++)
        this.items[o].style[k.transitionDuration] = t + "ms";
    }, e.prototype.timeFunction = function(t) {
      for (var o = 0; o < this.items.length; o++)
        this.items[o].style[k.transitionTimingFunction] = t;
    }, e.prototype.rotateX = function(t) {
      for (var o = this.options.rotate, r = o === void 0 ? 25 : o, s = 0; s < this.items.length; s++) {
        var i = r * (t / this.itemHeight + s), n = i.toFixed(3);
        this.items[s].style[k.transform] = "rotateX(" + n + "deg)";
      }
    }, e.prototype.findNearestValidWheel = function(t) {
      t = t > 0 ? 0 : t < this.scroll.maxScrollY ? this.scroll.maxScrollY : t;
      for (var o = Math.abs(Math.round(-t / this.itemHeight)), r = o, s = this.items, i = this.options.wheelDisabledItemClass; o >= 0 && se(s[o], i); )
        o--;
      if (o < 0)
        for (o = r; o <= s.length - 1 && se(s[o], i); )
          o++;
      return o === s.length && (o = r), {
        index: this.wheelItemsAllDisabled ? -1 : o,
        y: -o * this.itemHeight
      };
    }, e.prototype.checkWheelAllDisabled = function() {
      var t = this.options.wheelDisabledItemClass, o = this.items;
      this.wheelItemsAllDisabled = !0;
      for (var r = 0; r < o.length; r++)
        if (!se(o[r], t)) {
          this.wheelItemsAllDisabled = !1;
          break;
        }
    }, e.pluginName = "wheel", e;
  }()
), aa = "plugins.zoom", la = [
  {
    key: "zoomTo",
    name: "zoomTo"
  }
], ca = la.map(function(e) {
  return {
    key: e.key,
    sourceKey: aa + "." + e.name
  };
}), ce = 2, he = 1, ha = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.scale = he, this.prevScale = 1, this.init();
    }
    return e.prototype.init = function() {
      this.handleBScroll(), this.handleOptions(), this.handleHooks(), this.tryInitialZoomTo(this.zoomOpt);
    }, e.prototype.zoomTo = function(t, o, r, s) {
      var i = this.resolveOrigin(o, r), n = i.originX, a = i.originY, c = {
        x: n,
        y: a,
        baseScale: this.scale
      };
      this._doZoomTo(t, c, s, !0);
    }, e.prototype.handleBScroll = function() {
      this.scroll.proxy(ca), this.scroll.registerType([
        "beforeZoomStart",
        "zoomStart",
        "zooming",
        "zoomEnd"
      ]);
    }, e.prototype.handleOptions = function() {
      var t = this.scroll.options.zoom === !0 ? {} : this.scroll.options.zoom, o = {
        start: 1,
        min: 1,
        max: 4,
        initialOrigin: [0, 0],
        minimalZoomDistance: 5,
        bounceTime: 800
      };
      this.zoomOpt = B(o, t);
    }, e.prototype.handleHooks = function() {
      var t = this, o = this.scroll, r = this.scroll.scroller;
      this.wrapper = this.scroll.scroller.wrapper, this.setTransformOrigin(this.scroll.scroller.content);
      var s = r.scrollBehaviorX, i = r.scrollBehaviorY;
      this.hooksFn = [], this.registerHooks(o.hooks, o.hooks.eventTypes.contentChanged, function(n) {
        t.setTransformOrigin(n), t.scale = he, t.tryInitialZoomTo(t.zoomOpt);
      }), this.registerHooks(o.hooks, o.hooks.eventTypes.beforeInitialScrollTo, function() {
        if (t.zoomOpt.start !== he)
          return !0;
      }), this.registerHooks(s.hooks, s.hooks.eventTypes.beforeComputeBoundary, function() {
        var n = Ot(t.scroll.scroller.content);
        s.contentSize = Math.floor(n.width * t.scale);
      }), this.registerHooks(i.hooks, i.hooks.eventTypes.beforeComputeBoundary, function() {
        var n = Ot(t.scroll.scroller.content);
        i.contentSize = Math.floor(n.height * t.scale);
      }), this.registerHooks(r.actions.hooks, r.actions.hooks.eventTypes.start, function(n) {
        var a = n.touches && n.touches.length || 0;
        t.fingersOperation(a), a === ce && t.zoomStart(n);
      }), this.registerHooks(r.actions.hooks, r.actions.hooks.eventTypes.beforeMove, function(n) {
        var a = n.touches && n.touches.length || 0;
        if (t.fingersOperation(a), a === ce)
          return t.zoom(n), !0;
      }), this.registerHooks(r.actions.hooks, r.actions.hooks.eventTypes.beforeEnd, function(n) {
        var a = t.fingersOperation();
        if (a === ce)
          return t.zoomEnd(), !0;
      }), this.registerHooks(r.translater.hooks, r.translater.hooks.eventTypes.beforeTranslate, function(n, a) {
        var c = a.scale ? a.scale : t.prevScale;
        t.prevScale = c, n.push("scale(" + c + ")");
      }), this.registerHooks(r.hooks, r.hooks.eventTypes.scrollEnd, function() {
        t.fingersOperation() === ce && t.scroll.trigger(t.scroll.eventTypes.zoomEnd, {
          scale: t.scale
        });
      }), this.registerHooks(this.scroll.hooks, "destroy", this.destroy);
    }, e.prototype.setTransformOrigin = function(t) {
      t.style[k.transformOrigin] = "0 0";
    }, e.prototype.tryInitialZoomTo = function(t) {
      var o = t.start, r = t.initialOrigin, s = this.scroll.scroller, i = s.scrollBehaviorX, n = s.scrollBehaviorY;
      o !== he && (this.resetBoundaries([i, n]), this.zoomTo(o, r[0], r[1], 0));
    }, e.prototype.fingersOperation = function(t) {
      if (typeof t == "number")
        this.numberOfFingers = t;
      else
        return this.numberOfFingers;
    }, e.prototype._doZoomTo = function(t, o, r, s) {
      var i = this;
      r === void 0 && (r = this.zoomOpt.bounceTime), s === void 0 && (s = !1);
      var n = this.zoomOpt, a = n.min, c = n.max, l = this.scale, u = P(t, a, c);
      (function() {
        if (r === 0) {
          i.scroll.trigger(i.scroll.eventTypes.zooming, {
            scale: u
          });
          return;
        }
        if (r > 0) {
          var h, p = F(), f = p + r, d = function() {
            var T = F();
            if (T >= f) {
              i.scroll.trigger(i.scroll.eventTypes.zooming, {
                scale: u
              }), mt(h);
              return;
            }
            var _ = C.bounce.fn((T - p) / r), z = _ * (u - l) + l;
            i.scroll.trigger(i.scroll.eventTypes.zooming, {
              scale: z
            }), h = ko(d);
          };
          d();
        }
      })(), this.fingersOperation(2), this._zoomTo(u, l, o, r, s);
    }, e.prototype._zoomTo = function(t, o, r, s, i) {
      i === void 0 && (i = !1);
      var n = t / r.baseScale;
      this.setScale(t);
      var a = this.scroll.scroller, c = a.scrollBehaviorX, l = a.scrollBehaviorY;
      this.resetBoundaries([c, l]);
      var u = this.getNewPos(r.x, n, c, !0, i), h = this.getNewPos(r.y, n, l, !0, i);
      (c.currentPos !== Math.round(u) || l.currentPos !== Math.round(h) || t !== o) && a.scrollTo(u, h, s, C.bounce, {
        start: {
          scale: o
        },
        end: {
          scale: t
        }
      });
    }, e.prototype.resolveOrigin = function(t, o) {
      var r = this.scroll.scroller, s = r.scrollBehaviorX, i = r.scrollBehaviorY, n = {
        left: function() {
          return 0;
        },
        top: function() {
          return 0;
        },
        right: function() {
          return s.contentSize;
        },
        bottom: function() {
          return i.contentSize;
        },
        center: function(a) {
          var c = a === 0 ? s.contentSize : i.contentSize;
          return c / 2;
        }
      };
      return {
        originX: typeof t == "number" ? t : n[t](0),
        originY: typeof o == "number" ? o : n[o](1)
      };
    }, e.prototype.zoomStart = function(t) {
      var o = t.touches[0], r = t.touches[1];
      this.startDistance = this.getFingerDistance(t), this.startScale = this.scale;
      var s = on(this.wrapper), i = s.left, n = s.top;
      this.origin = {
        x: Math.abs(o.pageX + r.pageX) / 2 + i - this.scroll.x,
        y: Math.abs(o.pageY + r.pageY) / 2 + n - this.scroll.y,
        baseScale: this.startScale
      }, this.scroll.trigger(this.scroll.eventTypes.beforeZoomStart);
    }, e.prototype.zoom = function(t) {
      var o = this.getFingerDistance(t);
      if (!(!this.zoomed && Math.abs(o - this.startDistance) < this.zoomOpt.minimalZoomDistance)) {
        var r = this.dampingScale(o / this.startDistance * this.startScale), s = r / this.startScale;
        this.setScale(r), this.zoomed || (this.zoomed = !0, this.scroll.trigger(this.scroll.eventTypes.zoomStart));
        var i = this.scroll.scroller, n = i.scrollBehaviorX, a = i.scrollBehaviorY, c = this.getNewPos(this.origin.x, s, n, !1, !1), l = this.getNewPos(this.origin.y, s, a, !1, !1);
        this.scroll.trigger(this.scroll.eventTypes.zooming, {
          scale: this.scale
        }), i.translater.translate({ x: c, y: l, scale: r });
      }
    }, e.prototype.zoomEnd = function() {
      if (this.zoomed) {
        if (this.shouldRebound()) {
          this._doZoomTo(this.scale, this.origin, this.zoomOpt.bounceTime);
          return;
        }
        this.scroll.trigger(this.scroll.eventTypes.zoomEnd, { scale: this.scale });
      }
    }, e.prototype.getFingerDistance = function(t) {
      var o = t.touches[0], r = t.touches[1], s = Math.abs(o.pageX - r.pageX), i = Math.abs(o.pageY - r.pageY);
      return $i(s, i);
    }, e.prototype.shouldRebound = function() {
      var t = this.zoomOpt, o = t.min, r = t.max, s = this.scale;
      if (s !== P(s, o, r))
        return !0;
      var i = this.scroll.scroller, n = i.scrollBehaviorX, a = i.scrollBehaviorY;
      this.resetBoundaries([n, a]);
      var c = n.checkInBoundary().inBoundary, l = n.checkInBoundary().inBoundary;
      return !(c && l);
    }, e.prototype.dampingScale = function(t) {
      var o = this.zoomOpt, r = o.min, s = o.max;
      return t < r ? t = 0.5 * r * Math.pow(2, t / r) : t > s && (t = 2 * s * Math.pow(0.5, s / t)), t;
    }, e.prototype.setScale = function(t) {
      this.scale = t;
    }, e.prototype.resetBoundaries = function(t) {
      t.forEach(function(o) {
        return o.computeBoundary();
      });
    }, e.prototype.getNewPos = function(t, o, r, s, i) {
      i === void 0 && (i = !1);
      var n = t - t * o + (i ? r.currentPos : r.startPos);
      return s && (n = P(n, r.maxScrollPos, r.minScrollPos)), n > 0 ? Math.floor(n) : Math.ceil(n);
    }, e.prototype.registerHooks = function(t, o, r) {
      t.on(o, r, this), this.hooksFn.push([t, o, r]);
    }, e.prototype.destroy = function() {
      this.hooksFn.forEach(function(t) {
        var o = t[0], r = t[1], s = t[2];
        o.off(r, s);
      }), this.hooksFn.length = 0;
    }, e.pluginName = "zoom", e;
  }()
), ua = (
  /** @class */
  function() {
    function e(t) {
      this.ancestors = [], this.descendants = [], this.hooksManager = [], this.analyzed = !1, this.selfScroll = t;
    }
    return e.create = function(t) {
      return new e(t);
    }, e.prototype.hasAncestors = function(t) {
      var o = Xt(this.ancestors, function(r) {
        var s = r[0];
        return s === t;
      });
      return o > -1;
    }, e.prototype.hasDescendants = function(t) {
      var o = Xt(this.descendants, function(r) {
        var s = r[0];
        return s === t;
      });
      return o > -1;
    }, e.prototype.addAncestor = function(t, o) {
      var r = this.ancestors;
      r.push([t, o]), r.sort(function(s, i) {
        return s[1] - i[1];
      });
    }, e.prototype.addDescendant = function(t, o) {
      var r = this.descendants;
      r.push([t, o]), r.sort(function(s, i) {
        return s[1] - i[1];
      });
    }, e.prototype.removeAncestor = function(t) {
      var o = this.ancestors;
      if (o.length) {
        var r = Xt(this.ancestors, function(s) {
          var i = s[0];
          return i === t;
        });
        if (r > -1)
          return o.splice(r, 1);
      }
    }, e.prototype.removeDescendant = function(t) {
      var o = this.descendants;
      if (o.length) {
        var r = Xt(this.descendants, function(s) {
          var i = s[0];
          return i === t;
        });
        if (r > -1)
          return o.splice(r, 1);
      }
    }, e.prototype.registerHooks = function(t, o, r) {
      t.on(o, r), this.hooksManager.push([t, o, r]);
    }, e.prototype.setAnalyzed = function(t) {
      t === void 0 && (t = !1), this.analyzed = t;
    }, e.prototype.purge = function() {
      var t = this;
      this.ancestors.forEach(function(o) {
        var r = o[0];
        r.removeDescendant(t);
      }), this.descendants.forEach(function(o) {
        var r = o[0];
        r.removeAncestor(t);
      }), this.hooksManager.forEach(function(o) {
        var r = o[0], s = o[1], i = o[2];
        r.off(s, i);
      }), this.hooksManager = [];
    }, e;
  }()
), pa = "plugins.nestedScroll", fa = [
  {
    key: "purgeNestedScroll",
    name: "purgeNestedScroll"
  }
], da = fa.map(function(e) {
  return {
    key: e.key,
    sourceKey: pa + "." + e.name
  };
}), va = "INTERNAL_NESTED_SCROLL", ga = function(e) {
  e.forEach(function(t) {
    t.pending && (t.stop(), t.resetPosition());
  });
}, rr = function(e) {
  e.forEach(function(t) {
    t.enable();
  });
}, ue = function(e, t) {
  e.forEach(function(o) {
    (o.hasHorizontalScroll === t.hasHorizontalScroll || o.hasVerticalScroll === t.hasVerticalScroll) && o.disable();
  });
}, ma = function(e) {
  e.forEach(function(t) {
    var o = t.scroller, r = o.actions, s = o.scrollBehaviorX, i = o.scrollBehaviorY;
    r.fingerMoved = !0, r.contentMoved = !1, r.directionLockAction.reset(), s.start(), i.start(), s.resetStartPos(), i.resetStartPos(), r.startTime = +/* @__PURE__ */ new Date();
  });
}, ya = function(e) {
  var t = e.hasHorizontalScroll, o = e.hasVerticalScroll, r = e.x, s = e.y, i = e.minScrollX, n = e.maxScrollX, a = e.minScrollY, c = e.maxScrollY, l = e.movingDirectionX, u = e.movingDirectionY, h = !1, p = r >= i && l === -1, f = r <= n && l === 1, d = s >= a && u === -1, T = s <= c && u === 1;
  return o ? h = d || T : t && (h = p || f), h;
}, Ta = function(e) {
  var t = e.hasHorizontalScroll, o = e.hasVerticalScroll, r = e.x, s = e.y, i = e.minScrollX, n = e.maxScrollX, a = e.minScrollY, c = e.maxScrollY, l = !1, u = r > i, h = r < n, p = s > a, f = s < c;
  return o ? l = p || f : t && (l = u || h), l;
}, Sa = function(e) {
  e.scroller.reflow(), e.resetPosition(
    0
    /* Immediately */
  );
}, ka = function(e, t) {
  for (var o = 0, r = e.parentNode; r && r !== t; )
    o++, r = r.parentNode;
  return o;
}, wa = (
  /** @class */
  function() {
    function e(t) {
      var o = this.handleOptions(t), r = e.instancesMap[o];
      return r || (r = e.instancesMap[o] = this, r.store = [], r.hooksFn = []), r.init(t), r;
    }
    return e.getAllNestedScrolls = function() {
      var t = e.instancesMap;
      return Object.keys(t).map(function(o) {
        return t[o];
      });
    }, e.purgeAllNestedScrolls = function() {
      var t = e.getAllNestedScrolls();
      t.forEach(function(o) {
        return o.purgeNestedScroll();
      });
    }, e.prototype.handleOptions = function(t) {
      var o = t.options.nestedScroll === !0 ? {} : t.options.nestedScroll, r = {
        groupId: va
      };
      this.options = B(r, o);
      var s = typeof this.options.groupId;
      return s !== "string" && s !== "number" && Z("groupId must be string or number for NestedScroll plugin"), this.options.groupId;
    }, e.prototype.init = function(t) {
      t.proxy(da), this.addBScroll(t), this.buildBScrollGraph(), this.analyzeBScrollGraph(), this.ensureEventInvokeSequence(), this.handleHooks(t);
    }, e.prototype.handleHooks = function(t) {
      var o = this;
      this.registerHooks(t.hooks, t.hooks.eventTypes.destroy, function() {
        o.deleteScroll(t);
      });
    }, e.prototype.deleteScroll = function(t) {
      var o = t.wrapper;
      o.isBScrollContainer = void 0;
      var r = this.store, s = this.hooksFn, i = Xt(r, function(p) {
        return p.selfScroll === t;
      });
      if (i > -1) {
        var n = r[i];
        n.purge(), r.splice(i, 1);
      }
      var a = Xt(s, function(p) {
        var f = p[0];
        return f === t.hooks;
      });
      if (a > -1) {
        var c = s[a], l = c[0], u = c[1], h = c[2];
        l.off(u, h), s.splice(a, 1);
      }
    }, e.prototype.addBScroll = function(t) {
      this.store.push(ua.create(t));
    }, e.prototype.buildBScrollGraph = function() {
      for (var t = this.store, o, r, s, i, n = this.store.length, a = 0; a < n; a++) {
        o = t[a], s = o.selfScroll.wrapper;
        for (var c = 0; c < n; c++)
          if (r = t[c], i = r.selfScroll.wrapper, o !== r && s.contains(i)) {
            var l = ka(i, s);
            o.hasDescendants(r) || o.addDescendant(r, l), r.hasAncestors(o) || r.addAncestor(o, l);
          }
      }
    }, e.prototype.analyzeBScrollGraph = function() {
      this.store.forEach(function(t) {
        if (!t.analyzed) {
          var o = t.ancestors, r = t.descendants, s = t.selfScroll, i = function() {
            var c = o.map(function(u) {
              var h = u[0];
              return h.selfScroll;
            }), l = r.map(function(u) {
              var h = u[0];
              return h.selfScroll;
            });
            ga(ke(c, l)), Ta(s) && Sa(s), ma(c), ue(c, s);
          }, n = function() {
            var c = o.map(function(u) {
              var h = u[0];
              return h.selfScroll;
            }), l = r.map(function(u) {
              var h = u[0];
              return h.selfScroll;
            });
            rr(ke(c, l));
          };
          t.registerHooks(s, s.eventTypes.beforeScrollStart, i), t.registerHooks(s, s.eventTypes.touchEnd, n);
          var a = s.scroller.actions.hooks;
          t.registerHooks(a, a.eventTypes.detectMovingDirection, function() {
            var c = o.map(function(f) {
              var d = f[0];
              return d.selfScroll;
            }), l = c[0], u = c.slice(1), h = s.scroller.actions.contentMoved, p = c.length === 0;
            if (h)
              ue(c, s);
            else if (!p && ya(s))
              return ue([s], s), l && rr([l]), ue(u, s), !0;
          }), t.setAnalyzed(!0);
        }
      });
    }, e.prototype.ensureEventInvokeSequence = function() {
      var t = this.store.slice(), o = t.sort(function(r, s) {
        return r.descendants.length - s.descendants.length;
      });
      o.forEach(function(r) {
        var s = r.selfScroll;
        s.scroller.actionsHandler.rebindDOMEvents();
      });
    }, e.prototype.registerHooks = function(t, o, r) {
      t.on(o, r, this), this.hooksFn.push([t, o, r]);
    }, e.prototype.purgeNestedScroll = function() {
      var t = this.options.groupId;
      this.store.forEach(function(o) {
        o.purge();
      }), this.store = [], this.hooksFn.forEach(function(o) {
        var r = o[0], s = o[1], i = o[2];
        r.off(s, i);
      }), this.hooksFn = [], delete e.instancesMap[t];
    }, e.pluginName = "nestedScroll", e.instancesMap = {}, e;
  }()
), sr = 10, ir = 30, ba = (
  /** @class */
  function() {
    function e(t, o) {
      this.wrapperHeight = t, this.tombstoneHeight = o, this.lastDirection = 1, this.lastPos = 0;
    }
    return e.prototype.calculate = function(t, o) {
      var r = t - this.lastPos;
      this.lastPos = t;
      var s = this.getDirection(r), i = this.calculateIndex(0, t, o), n = this.calculateIndex(i, t + this.wrapperHeight, o);
      return s === 1 ? (i -= sr, n += ir) : (i -= ir, n += sr), i < 0 && (i = 0), {
        start: i,
        end: n
      };
    }, e.prototype.getDirection = function(t) {
      var o;
      if (t > 0)
        o = 1;
      else if (t < 0)
        o = 0;
      else
        return this.lastDirection;
      return this.lastDirection = o, o;
    }, e.prototype.calculateIndex = function(t, o, r) {
      if (o <= 0)
        return t;
      for (var s = t, i = r[s] && r[s].pos !== -1 ? r[s].pos : 0, n = i, a = 0; s < r.length && r[s].pos < o; )
        n = r[s].pos, s++;
      return s === r.length && (a = Math.floor((o - n) / this.tombstoneHeight)), s += a, s;
    }, e.prototype.resetState = function() {
      this.lastDirection = 1, this.lastPos = 0;
    }, e;
  }()
), Pa = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
      this.data = null, this.dom = null, this.tombstone = null, this.width = 0, this.height = 0, this.pos = 0;
    }
    return e;
  }()
), Ea = (
  /** @class */
  function() {
    function e(t, o, r) {
      this.fetchFn = o, this.onFetchFinish = r, this.loadedNum = 0, this.fetching = !1, this.hasMore = !0, this.list = t || [];
    }
    return e.prototype.update = function(t) {
      return _e(this, void 0, void 0, function() {
        var o;
        return Re(this, function(r) {
          return this.hasMore || (t = Math.min(t, this.list.length)), t > this.list.length && (o = t - this.list.length, this.addEmptyData(o)), [2, this.checkToFetch(t)];
        });
      });
    }, e.prototype.add = function(t) {
      for (var o = 0; o < t.length; o++)
        this.list[this.loadedNum] ? this.list[this.loadedNum] = Q(Q({}, this.list[this.loadedNum]), { data: t[o] }) : this.list[this.loadedNum] = { data: t[o] }, this.loadedNum++;
      return this.list;
    }, e.prototype.addEmptyData = function(t) {
      for (var o = 0; o < t; o++)
        this.list.push(new Pa());
      return this.list;
    }, e.prototype.fetch = function(t) {
      return _e(this, void 0, void 0, function() {
        var o;
        return Re(this, function(r) {
          switch (r.label) {
            case 0:
              return this.fetching ? [2, []] : (this.fetching = !0, [4, this.fetchFn(t)]);
            case 1:
              return o = r.sent(), this.fetching = !1, [2, o];
          }
        });
      });
    }, e.prototype.checkToFetch = function(t) {
      return _e(this, void 0, void 0, function() {
        var o, r, s;
        return Re(this, function(i) {
          switch (i.label) {
            case 0:
              return this.hasMore ? t <= this.loadedNum ? [
                2
                /*return*/
              ] : (o = t - this.loadedNum, [4, this.fetch(o)]) : [
                2
                /*return*/
              ];
            case 1:
              return r = i.sent(), r instanceof Array && r.length ? (this.add(r), s = this.onFetchFinish(this.list, !0), [2, this.checkToFetch(s)]) : (typeof r == "boolean" && r === !1 && (this.hasMore = !1, this.list.splice(this.loadedNum), this.onFetchFinish(this.list, !1)), [
                2
                /*return*/
              ]);
          }
        });
      });
    }, e.prototype.getList = function() {
      return this.list;
    }, e.prototype.resetState = function() {
      this.loadedNum = 0, this.fetching = !1, this.hasMore = !0, this.list = [];
    }, e;
  }()
), ve = (
  /** @class */
  function() {
    function e(t) {
      this.create = t, this.cached = [], this.width = 0, this.height = 0, this.initialed = !1, this.getSize();
    }
    return e.isTombstone = function(t) {
      return t && t.classList ? t.classList.contains("tombstone") : !1;
    }, e.prototype.getSize = function() {
      if (!this.initialed) {
        var t = this.create();
        t.style.position = "absolute", document.body.appendChild(t), t.style.display = "", this.height = t.offsetHeight, this.width = t.offsetWidth, document.body.removeChild(t), this.cached.push(t);
      }
    }, e.prototype.getOne = function() {
      var t = this.cached.pop();
      if (t) {
        var o = t.style;
        return o.display = "", o.opacity = "1", o[k.transform] = "", o[k.transition] = "", t;
      }
      return this.create();
    }, e.prototype.recycle = function(t) {
      for (var o = 0, r = t; o < r.length; o++) {
        var s = r[o];
        s.style.display = "none", this.cached.push(s);
      }
      return this.cached;
    }, e.prototype.recycleOne = function(t) {
      return this.cached.push(t), this.cached;
    }, e;
  }()
), Ve = 200, xa = (
  /** @class */
  function() {
    function e(t, o, r) {
      this.renderFn = o, this.tombstone = r, this.unusedDom = [], this.timers = [], this.setContent(t);
    }
    return e.prototype.update = function(t, o, r) {
      o >= t.length && (o = t.length - 1), r > t.length && (r = t.length), this.collectUnusedDom(t, o, r), this.createDom(t, o, r), this.cacheHeight(t, o, r);
      var s = this.positionDom(t, o, r), i = s.startPos, n = s.startDelta, a = s.endPos;
      return {
        start: o,
        startPos: i,
        startDelta: n,
        end: r,
        endPos: a
      };
    }, e.prototype.collectUnusedDom = function(t, o, r) {
      for (var s = 0; s < t.length; s++) {
        if (s === o) {
          s = r - 1;
          continue;
        }
        if (t[s].dom) {
          var i = t[s].dom;
          ve.isTombstone(i) ? (this.tombstone.recycleOne(i), i.style.display = "none") : this.unusedDom.push(i), t[s].dom = null;
        }
      }
      return t;
    }, e.prototype.createDom = function(t, o, r) {
      for (var s = o; s < r; s++) {
        var i = t[s].dom, n = t[s].data;
        if (i)
          if (ve.isTombstone(i) && n)
            t[s].tombstone = i, t[s].dom = null;
          else
            continue;
        i = n ? this.renderFn(n, this.unusedDom.pop()) : this.tombstone.getOne(), i.style.position = "absolute", t[s].dom = i, t[s].pos = -1, this.content.appendChild(i);
      }
    }, e.prototype.cacheHeight = function(t, o, r) {
      for (var s = o; s < r; s++)
        t[s].data && !t[s].height && (t[s].height = t[s].dom.offsetHeight);
    }, e.prototype.positionDom = function(t, o, r) {
      for (var s = this, i = [], n = this.getStartPos(t, o, r), a = n.start, c = n.delta, l = a, u = o; u < r; u++) {
        var h = t[u].tombstone;
        if (h) {
          var p = h.style;
          p[k.transition] = rn + "transform " + Ve + "ms, opacity " + Ve + "ms", p[k.transform] = "translateY(" + l + "px)", p.opacity = "0", t[u].tombstone = null, i.push(h);
        }
        t[u].dom && t[u].pos !== l && (t[u].dom.style[k.transform] = "translateY(" + l + "px)", t[u].pos = l), l += t[u].height || this.tombstone.height;
      }
      var f = window.setTimeout(function() {
        s.tombstone.recycle(i);
      }, Ve);
      return this.timers.push(f), {
        startPos: a,
        startDelta: c,
        endPos: l
      };
    }, e.prototype.getStartPos = function(t, o, r) {
      if (t[o] && t[o].pos !== -1)
        return {
          start: t[o].pos,
          delta: 0
        };
      for (var s = t[0].pos === -1 ? 0 : t[0].pos, i = 0; i < o; i++)
        s += t[i].height || this.tombstone.height;
      var n = s, a;
      for (a = o; a < r; a++)
        if (!ve.isTombstone(t[a].dom) && t[a].pos !== -1) {
          s = t[a].pos;
          break;
        }
      var c = a;
      if (c < r)
        for (; c > o; )
          s -= t[c - 1].height, c--;
      var l = n - s;
      return {
        start: s,
        delta: l
      };
    }, e.prototype.removeTombstone = function() {
      for (var t = this.content.querySelectorAll(".tombstone"), o = t.length - 1; o >= 0; o--)
        this.content.removeChild(t[o]);
    }, e.prototype.setContent = function(t) {
      t !== this.content && (this.content = t);
    }, e.prototype.destroy = function() {
      this.removeTombstone(), this.timers.forEach(function(t) {
        clearTimeout(t);
      });
    }, e.prototype.resetState = function() {
      this.destroy(), this.timers = [], this.unusedDom = [];
    }, e;
  }()
), Ma = -2e3, Oa = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.start = 0, this.end = 0, this.init();
    }
    return e.prototype.init = function() {
      var t = this;
      this.handleOptions();
      var o = this.options, r = o.fetch, s = o.render, i = o.createTombstone;
      this.tombstone = new ve(i), this.indexCalculator = new ba(this.scroll.scroller.scrollBehaviorY.wrapperSize, this.tombstone.height), this.domManager = new xa(this.scroll.scroller.content, s, this.tombstone), this.dataManager = new Ea([], r, this.onFetchFinish.bind(this)), this.scroll.on(this.scroll.eventTypes.destroy, this.destroy, this), this.scroll.on(this.scroll.eventTypes.scroll, this.update, this), this.scroll.on(this.scroll.eventTypes.contentChanged, function(a) {
        t.domManager.setContent(a), t.indexCalculator.resetState(), t.domManager.resetState(), t.dataManager.resetState(), t.update({ y: 0 });
      });
      var n = this.scroll.scroller.scrollBehaviorY;
      n.hooks.on(n.hooks.eventTypes.computeBoundary, this.modifyBoundary, this), this.update({ y: 0 });
    }, e.prototype.modifyBoundary = function(t) {
      t.maxScrollPos = Ma;
    }, e.prototype.handleOptions = function() {
      var t = this.scroll.options.infinity;
      t && (typeof t.fetch != "function" && Z("Infinity plugin need fetch Function to new data."), typeof t.render != "function" && Z("Infinity plugin need render Function to render each item."), typeof t.render != "function" && Z("Infinity plugin need createTombstone Function to create tombstone."), this.options = t), this.scroll.options.probeType = 3;
    }, e.prototype.update = function(t) {
      var o = Math.round(-t.y), r = this.indexCalculator.calculate(o, this.dataManager.getList()), s = r.start, i = r.end;
      this.start = s, this.end = i, this.dataManager.update(i), this.updateDom(this.dataManager.getList());
    }, e.prototype.onFetchFinish = function(t, o) {
      var r = this.updateDom(t).end;
      return o || (this.domManager.removeTombstone(), this.scroll.scroller.animater.stop(), this.scroll.resetPosition()), r;
    }, e.prototype.updateDom = function(t) {
      var o = this.domManager.update(t, this.start, this.end), r = o.end, s = o.startPos, i = o.endPos, n = o.startDelta;
      return n && (this.scroll.minScrollY = n), i > this.scroll.maxScrollY && (this.scroll.maxScrollY = -(i - this.scroll.scroller.scrollBehaviorY.wrapperSize)), {
        end: r,
        startPos: s,
        endPos: i
      };
    }, e.prototype.destroy = function() {
      for (var t = this.scroll.scroller, o = t.content, r = t.scrollBehaviorY; o.firstChild; )
        o.removeChild(o.firstChild);
      this.domManager.destroy(), this.scroll.off("scroll", this.update), this.scroll.off("destroy", this.destroy), r.hooks.off(r.hooks.eventTypes.computeBoundary);
    }, e.pluginName = "infinity", e;
  }()
), Da = "plugins.movable", Ya = [
  {
    key: "putAt",
    name: "putAt"
  }
], Ca = Ya.map(function(e) {
  return {
    key: e.key,
    sourceKey: Da + "." + e.name
  };
}), Ba = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.handleBScroll(), this.handleHooks();
    }
    return e.prototype.handleBScroll = function() {
      this.scroll.proxy(Ca);
    }, e.prototype.handleHooks = function() {
      var t = this;
      this.hooksFn = [];
      var o = this.scroll.scroller, r = o.scrollBehaviorX, s = o.scrollBehaviorY, i = function(n, a) {
        n.maxScrollPos > 0 && (n.minScrollPos = a.wrapperSize - a.contentSize, n.maxScrollPos = 0);
      };
      this.registerHooks(r.hooks, r.hooks.eventTypes.ignoreHasScroll, function() {
        return !0;
      }), this.registerHooks(r.hooks, r.hooks.eventTypes.computeBoundary, function(n) {
        i(n, r);
      }), this.registerHooks(s.hooks, s.hooks.eventTypes.ignoreHasScroll, function() {
        return !0;
      }), this.registerHooks(s.hooks, s.hooks.eventTypes.computeBoundary, function(n) {
        i(n, s);
      }), this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.destroy, function() {
        t.destroy();
      });
    }, e.prototype.putAt = function(t, o, r, s) {
      r === void 0 && (r = this.scroll.options.bounceTime), s === void 0 && (s = C.bounce);
      var i = this.resolvePostion(t, o);
      this.scroll.scrollTo(i.x, i.y, r, s);
    }, e.prototype.resolvePostion = function(t, o) {
      var r = this.scroll.scroller, s = r.scrollBehaviorX, i = r.scrollBehaviorY, n = {
        left: function() {
          return 0;
        },
        top: function() {
          return 0;
        },
        right: function() {
          return s.minScrollPos;
        },
        bottom: function() {
          return i.minScrollPos;
        },
        center: function(a) {
          var c = a === 0 ? s.minScrollPos : i.minScrollPos;
          return c / 2;
        }
      };
      return {
        x: typeof t == "number" ? t : n[t](0),
        y: typeof o == "number" ? o : n[o](1)
      };
    }, e.prototype.destroy = function() {
      this.hooksFn.forEach(function(t) {
        var o = t[0], r = t[1], s = t[2];
        o.off(r, s);
      }), this.hooksFn.length = 0;
    }, e.prototype.registerHooks = function(t, o, r) {
      t.on(o, r, this), this.hooksFn.push([t, o, r]);
    }, e.pluginName = "movable", e.applyOrder = "pre", e;
  }()
), Xa = function(e) {
  return e.tagName.toLowerCase() === "img";
}, Ia = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.refreshTimer = 0, this.init();
    }
    return e.prototype.init = function() {
      this.handleOptions(this.scroll.options.observeImage), this.bindEventsToWrapper();
    }, e.prototype.handleOptions = function(t) {
      t === void 0 && (t = {}), t = t === !0 ? {} : t;
      var o = {
        debounceTime: 100
      };
      this.options = B(o, t);
    }, e.prototype.bindEventsToWrapper = function() {
      var t = this.scroll.scroller.wrapper;
      this.imageLoadEventRegister = new R(t, [
        {
          name: "load",
          handler: this.load.bind(this),
          capture: !0
        }
      ]), this.imageErrorEventRegister = new R(t, [
        {
          name: "error",
          handler: this.load.bind(this),
          capture: !0
        }
      ]);
    }, e.prototype.load = function(t) {
      var o = this, r = t.target, s = this.options.debounceTime;
      r && Xa(r) && (s === 0 ? this.scroll.refresh() : (clearTimeout(this.refreshTimer), this.refreshTimer = window.setTimeout(function() {
        o.scroll.refresh();
      }, this.options.debounceTime)));
    }, e.pluginName = "observeImage", e;
  }()
), Na = function(e) {
  var t = {
    ratioX: 0,
    ratioY: 0
  };
  return e && (typeof e == "number" ? t.ratioX = t.ratioY = e : typeof e == "object" && e && (t.ratioX = e.x || 0, t.ratioY = e.y || 0)), t;
}, We = function(e) {
  xt(e), e.stopPropagation();
}, Ha = (
  /** @class */
  function() {
    function e(t, o) {
      this.scroll = t, this.options = o, this.currentPos = {
        x: 0,
        y: 0
      }, this.hooksFn = [], this.handleDOM(), this.handleHooks(), this.handleInteractive();
    }
    return e.prototype.handleDOM = function() {
      var t = this.options, o = t.relationElement, r = t.relationElementHandleElementIndex, s = r === void 0 ? 0 : r;
      this.wrapper = o, this.indicatorEl = this.wrapper.children[s];
    }, e.prototype.handleHooks = function() {
      var t = this, o = this.scroll, r = o.hooks, s = o.scroller.translater.hooks, i = o.scroller.animater.hooks;
      this.registerHooks(r, r.eventTypes.refresh, this.refresh), this.registerHooks(s, s.eventTypes.translate, function(n) {
        t.updatePosition(n);
      }), this.registerHooks(i, i.eventTypes.time, this.transitionTime), this.registerHooks(i, i.eventTypes.timeFunction, this.transitionTimingFunction);
    }, e.prototype.transitionTime = function(t) {
      t === void 0 && (t = 0), this.indicatorEl.style[k.transitionDuration] = t + "ms";
    }, e.prototype.transitionTimingFunction = function(t) {
      this.indicatorEl.style[k.transitionTimingFunction] = t;
    }, e.prototype.handleInteractive = function() {
      this.options.interactive !== !1 && this.registerEvents();
    }, e.prototype.registerHooks = function(t, o, r) {
      t.on(o, r, this), this.hooksFn.push([t, o, r]);
    }, e.prototype.registerEvents = function() {
      var t = this.scroll.options, o = t.disableMouse, r = t.disableTouch, s = [], i = [], n = [];
      o || (s.push({
        name: "mousedown",
        handler: this.start.bind(this)
      }), i.push({
        name: "mousemove",
        handler: this.move.bind(this)
      }), n.push({
        name: "mouseup",
        handler: this.end.bind(this)
      })), r || (s.push({
        name: "touchstart",
        handler: this.start.bind(this)
      }), i.push({
        name: "touchmove",
        handler: this.move.bind(this)
      }), n.push({
        name: "touchend",
        handler: this.end.bind(this)
      }, {
        name: "touchcancel",
        handler: this.end.bind(this)
      })), this.startEventRegister = new R(this.indicatorEl, s), this.moveEventRegister = new R(window, i), this.endEventRegister = new R(window, n);
    }, e.prototype.refresh = function() {
      var t = this.scroll, o = t.x, r = t.y, s = t.hasHorizontalScroll, i = t.hasVerticalScroll, n = t.maxScrollX, a = t.maxScrollY, c = Na(this.options.ratio), l = c.ratioX, u = c.ratioY, h = vn(this.wrapper), p = h.width, f = h.height, d = Ot(this.indicatorEl), T = d.width, _ = d.height;
      s && (this.maxScrollX = p - T, this.translateXSign = this.maxScrollX > 0 ? -1 : 1, this.minScrollX = 0, this.ratioX = l || Math.abs(this.maxScrollX / n)), i && (this.maxScrollY = f - _, this.translateYSign = this.maxScrollY > 0 ? -1 : 1, this.minScrollY = 0, this.ratioY = u || Math.abs(this.maxScrollY / a)), this.updatePosition({
        x: o,
        y: r
      });
    }, e.prototype.start = function(t) {
      if (!this.BScrollIsDisabled()) {
        var o = t.touches ? t.touches[0] : t;
        We(t), this.initiated = !0, this.moved = !1, this.lastPointX = o.pageX, this.lastPointY = o.pageY, this.startTime = F(), this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.beforeScrollStart);
      }
    }, e.prototype.BScrollIsDisabled = function() {
      return !this.scroll.enabled;
    }, e.prototype.move = function(t) {
      if (this.initiated) {
        var o = t.touches ? t.touches[0] : t, r = o.pageX, s = o.pageY;
        We(t);
        var i = r - this.lastPointX, n = s - this.lastPointY;
        if (this.lastPointX = r, this.lastPointY = s, !this.moved && !this.indicatorNotMoved(i, n) && (this.moved = !0, this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollStart)), this.moved) {
          var a = this.getBScrollPosByRatio(this.currentPos, i, n);
          this.syncBScroll(a);
        }
      }
    }, e.prototype.end = function(t) {
      if (this.initiated && (this.initiated = !1, We(t), this.moved)) {
        var o = this.scroll, r = o.x, s = o.y;
        this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollEnd, {
          x: r,
          y: s
        });
      }
    }, e.prototype.getBScrollPosByRatio = function(t, o, r) {
      var s = t.x, i = t.y, n = this.scroll, a = n.hasHorizontalScroll, c = n.hasVerticalScroll, l = n.minScrollX, u = n.maxScrollX, h = n.minScrollY, p = n.maxScrollY, f = this.scroll, d = f.x, T = f.y;
      if (a) {
        var _ = P(s + o, Math.min(this.minScrollX, this.maxScrollX), Math.max(this.minScrollX, this.maxScrollX)), z = Math.round(_ / this.ratioX * this.translateXSign);
        d = P(z, u, l);
      }
      if (c) {
        var U = P(i + r, Math.min(this.minScrollY, this.maxScrollY), Math.max(this.minScrollY, this.maxScrollY)), nt = Math.round(U / this.ratioY * this.translateYSign);
        T = P(nt, p, h);
      }
      return { x: d, y: T };
    }, e.prototype.indicatorNotMoved = function(t, o) {
      var r = this.currentPos, s = r.x, i = r.y, n = s === this.minScrollX && t <= 0 || s === this.maxScrollX && t >= 0, a = i === this.minScrollY && o <= 0 || i === this.maxScrollY && o >= 0;
      return n && a;
    }, e.prototype.syncBScroll = function(t) {
      var o = F(), r = this.scroll, s = r.options, i = r.scroller, n = s.probeType, a = s.momentumLimitTime;
      i.translater.translate(t), o - this.startTime > a && (this.startTime = o, n === 1 && i.hooks.trigger(i.hooks.eventTypes.scroll, t)), n > 1 && i.hooks.trigger(i.hooks.eventTypes.scroll, t);
    }, e.prototype.updatePosition = function(t) {
      var o = this.getIndicatorPosByRatio(t);
      this.applyTransformProperty(o), this.currentPos = Q({}, o);
    }, e.prototype.applyTransformProperty = function(t) {
      var o = this.scroll.options.translateZ, r = [
        "translateX(" + t.x + "px)",
        "translateY(" + t.y + "px)",
        "" + o
      ];
      this.indicatorEl.style[k.transform] = r.join(" ");
    }, e.prototype.getIndicatorPosByRatio = function(t) {
      var o = t.x, r = t.y, s = this.scroll, i = s.hasHorizontalScroll, n = s.hasVerticalScroll, a = Q({}, this.currentPos);
      if (i) {
        var c = Math.round(this.ratioX * o * this.translateXSign);
        a.x = P(c, Math.min(this.minScrollX, this.maxScrollX), Math.max(this.minScrollX, this.maxScrollX));
      }
      if (n) {
        var l = Math.round(this.ratioY * r * this.translateYSign);
        a.y = P(l, Math.min(this.minScrollY, this.maxScrollY), Math.max(this.minScrollY, this.maxScrollY));
      }
      return a;
    }, e.prototype.destroy = function() {
      this.options.interactive !== !1 && (this.startEventRegister.destroy(), this.moveEventRegister.destroy(), this.endEventRegister.destroy()), this.hooksFn.forEach(function(t) {
        var o = t[0], r = t[1], s = t[2];
        o.off(r, s);
      }), this.hooksFn.length = 0;
    }, e;
  }()
), _a = (
  /** @class */
  function() {
    function e(t) {
      this.scroll = t, this.options = [], this.indicators = [], this.handleOptions(), this.handleHooks();
    }
    return e.prototype.handleOptions = function() {
      var t = this.scroll.options.indicators;
      Wo(Array.isArray(t), "'indicators' must be an array.");
      for (var o = 0, r = t; o < r.length; o++) {
        var s = r[o];
        Wo(!!s.relationElement, "'relationElement' must be a HTMLElement."), this.createIndicators(s);
      }
    }, e.prototype.createIndicators = function(t) {
      this.indicators.push(new Ha(this.scroll, t));
    }, e.prototype.handleHooks = function() {
      var t = this, o = this.scroll.hooks;
      o.on(o.eventTypes.destroy, function() {
        for (var r = 0, s = t.indicators; r < s.length; r++) {
          var i = s[r];
          i.destroy();
        }
        t.indicators = [];
      });
    }, e.pluginName = "indicators", e;
  }()
);
io.use(Nn).use(Hn).use(zn).use(Wn).use(jn).use(ea).use(na).use(ha).use(wa).use(Oa).use(Ba).use(Ia).use(_a);
const Ra = "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='&%23231;&%23188;&%23150;&%23231;&%23187;&%23132;&%23229;&%23164;&%23135;&%23228;&%23187;&%23189;'%3e%3cpath%20id='Rectangle%20108'%20d='M2.29199%207.7085C2.29199%206.93193%202.29199%206.54364%202.41886%206.23736C2.58802%205.82898%202.91247%205.50452%203.32085%205.33536C3.62714%205.2085%204.01542%205.2085%204.79199%205.2085H5.62533C8.7316%205.2085%2010.2847%205.2085%2011.5099%205.71597C13.1434%206.39259%2014.4412%207.69042%2015.1179%209.32394C15.6253%2010.5491%2015.6253%2012.1022%2015.6253%2015.2085V15.2085C15.6253%2015.9851%2015.6253%2016.3733%2015.4985%2016.6796C15.3293%2017.088%2015.0048%2017.4125%2014.5965%2017.5816C14.2902%2017.7085%2013.9019%2017.7085%2013.1253%2017.7085H4.79199C4.01542%2017.7085%203.62714%2017.7085%203.32085%2017.5816C2.91247%2017.4125%202.58802%2017.088%202.41886%2016.6796C2.29199%2016.3733%202.29199%2015.9851%202.29199%2015.2085V7.7085Z'%20stroke='black'%20stroke-opacity='0.85'%20stroke-width='1.4'/%3e%3cpath%20id='Union'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.75%201.7777C13.75%201.50855%2013.4986%201.31002%2013.2368%201.37236L9.54549%202.25125C9.19506%202.27103%208.91699%202.56146%208.91699%202.91684C8.91699%203.28503%209.21547%203.58351%209.58366%203.58351C13.057%203.58351%2015.9834%205.55703%2017.1364%208.57166L18.3818%208.09535C17.5284%205.86398%2015.8586%204.13536%2013.75%203.15468V1.7777Z'%20fill='black'%20fill-opacity='0.85'/%3e%3c/g%3e%3c/svg%3e", Aa = "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='&%23229;&%23155;&%23190;&%23230;&%23160;&%23135;/&%23231;&%23186;&%23191;&%23230;&%23128;&%23167;/ZoomInOutlined&%23239;&%23188;&%23136;&%23230;&%23148;&%23190;&%23229;&%23164;&%23167;&%23239;&%23188;&%23137;'%3e%3cpath%20id='Vector'%20d='M5.83301%209.16683L12.4997%209.16683M9.16634%205.8335L9.16634%2012.5002'%20stroke='black'%20stroke-opacity='0.85'%20stroke-width='1.4'/%3e%3cpath%20id='Vector_2'%20d='M14.4604%2014.4797L17.917%2017.9165M16.667%209.1665C16.667%2013.3086%2013.3091%2016.6665%209.16699%2016.6665C5.02486%2016.6665%201.66699%2013.3086%201.66699%209.1665C1.66699%205.02437%205.02486%201.6665%209.16699%201.6665C13.3091%201.6665%2016.667%205.02437%2016.667%209.1665Z'%20stroke='black'%20stroke-opacity='0.85'%20stroke-width='1.4'%20stroke-linecap='square'/%3e%3c/g%3e%3c/svg%3e", za = "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='&%23229;&%23155;&%23190;&%23230;&%23160;&%23135;/&%23231;&%23186;&%23191;&%23230;&%23128;&%23167;/ZoomOutOutlined&%23239;&%23188;&%23136;&%23231;&%23188;&%23169;&%23229;&%23176;&%23143;&%23239;&%23188;&%23137;'%3e%3cpath%20id='Vector%2033'%20d='M5.83398%209.1665L12.5007%209.1665'%20stroke='black'%20stroke-opacity='0.85'%20stroke-width='1.4'/%3e%3cpath%20id='Vector'%20d='M14.4641%2014.476L17.917%2017.9165M16.667%209.1665C16.667%2013.3086%2013.3091%2016.6665%209.16699%2016.6665C5.02486%2016.6665%201.66699%2013.3086%201.66699%209.1665C1.66699%205.02437%205.02486%201.6665%209.16699%201.6665C13.3091%201.6665%2016.667%205.02437%2016.667%209.1665Z'%20stroke='black'%20stroke-opacity='0.85'%20stroke-width='1.4'%20stroke-linecap='square'/%3e%3c/g%3e%3c/svg%3e", Fa = /* @__PURE__ */ V("div", { class: "v" }, null, -1), La = /* @__PURE__ */ V("div", { class: "h" }, null, -1), Va = [
  Fa,
  La
], Wa = ["src"], Ua = ["src", "onClick"], Ka = ["src", "onClick"], ja = {
  name: "ImgViewer"
}, qa = /* @__PURE__ */ Object.assign(ja, {
  props: {
    ImgList: {
      type: Array,
      default: []
    },
    index: {
      type: Number,
      default: 0
    },
    toolInfo: {
      type: Object
    }
  },
  setup(e) {
    const t = e;
    let o = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(window.navigator.userAgent) || document.documentElement.clientWidth < 744;
    const r = K(t.ImgList.length == 1 || o ? "h" : t.toolInfo.layout), s = Vo(() => t.toolInfo.fullTool), i = [
      {
        icon: Ra,
        func: Jr
      },
      {
        icon: Aa,
        func: qt,
        type: "in"
      },
      {
        icon: za,
        func: qt,
        type: "out"
      }
    ], n = Vo(() => [...i, ...s.value]), a = K(null), c = K(null), l = K();
    mi(async () => {
      await Qe(), u();
    });
    const u = () => {
      r.value == "h" ? l.value = new io(".small-list", {
        scrollX: !0,
        eventPassthrough: "vertical",
        probeType: 3
      }) : l.value = new io(".small-list", {
        scrollY: !0,
        probeType: 3
      }), l.value.on("scroll", (v) => {
      }), l.value.refresh();
    }, h = K(t.index);
    function p(v) {
      console.dir(c.value[0]), h.value = v;
    }
    async function f() {
      l.value.refresh(), r.value == "h" ? r.value = "v" : r.value = "h", l.value.scrollTo(0, 0, 300), await Qe(), u();
    }
    const d = document.documentElement.clientHeight, T = document.documentElement.clientWidth;
    function _(v) {
      if (v == "r") {
        if (h.value >= t.ImgList.length - 1) {
          h.value = t.ImgList.length - 1;
          return;
        }
        h.value += 1, r.value == "v" ? z() : nt();
      } else if (v == "l") {
        if (h.value <= 0) {
          h.value = 0;
          return;
        }
        h.value -= 1, r.value == "v" ? U() : X();
      }
    }
    function z() {
      let v = at(c.value[h.value], 10, d - 10, "bottom", "top");
      v[0] === "lower" ? l.value.scrollTo(0, d - c.value[h.value].offsetTop - 100, 300) : (v[0] === "upper" || v[2] < 92) && l.value.scrollTo(0, -c.value[h.value].offsetTop + 28, 300);
    }
    function U() {
      at(c.value[h.value], 10, d - 10, "top")[0] === "upper" && l.value.scrollTo(0, -c.value[h.value].offsetTop, 300);
    }
    function nt() {
      let v = at(c.value[h.value], 0, T - 40, "right", "left");
      v[0] === "lower" ? l.value.scrollTo(T - c.value[h.value].offsetLeft - 110, 0, 300) : (v[0] === "upper" || v[2] < 92) && l.value.scrollTo(-c.value[h.value].offsetLeft + 28, 0, 300);
    }
    function X() {
      at(c.value[h.value], 10, T - 10, "left")[0] === "upper" && l.value.scrollTo(-c.value[h.value].offsetLeft, 0, 300);
    }
    function at(v, O, x, M, $) {
      const I = v.getBoundingClientRect();
      return [I[M] < O ? "upper" : I[M] < x ? "in" : "lower", I[M], I[$]];
    }
    const g = K(1);
    function At(v) {
      v.preventDefault();
      const O = Math.sign(-v.deltaY);
      g.value += 0.1 * O, (g.value <= 0.1 || g.value >= 10) && (g.value = Math.max(Math.min(g.value, 10), 0.1)), v.target.style.scale = g.value;
    }
    function qt(v) {
      v == "in" ? g.value += 0.1 : g.value -= 0.1, (g.value <= 0.1 || g.value >= 10) && (g.value = Math.max(Math.min(g.value, 10), 0.1)), a.value.style.scale = g.value;
    }
    let wo = 0;
    function Jr() {
      wo += 90, a.value.style.rotate = `${wo}deg`;
    }
    const Be = K(null);
    let yt = !1, Gt = 0, Zt = 0;
    function $r(v) {
      let O = v.target, x = v.pageX - O.offsetLeft, M = v.pageY - O.offsetTop;
      yt = !1, Gt = v.clientX, Zt = v.clientY, Be.value.addEventListener("mousemove", $);
      function $(I) {
        Math.abs(I.clientX - Gt) > 10 || Math.abs(I.clientY - Zt) > 10 ? (yt = !0, O.style.left = I.pageX - x + "px", O.style.top = I.pageY - M + "px") : yt = !1;
      }
      window.addEventListener("mouseup", (I) => {
        yt || t.toolInfo.clickFunc(I.target.currentSrc), Be.value.removeEventListener("mousemove", $);
      });
    }
    let E = null;
    const Yt = K(null), bo = K(0), Po = K(0), Xe = K(1);
    function ts(v) {
      Yt.value = v.target, Xe.value = v.touches.length, Xe.value == 1 ? (bo.value = v.changedTouches[0].clientX - Yt.value.offsetLeft, Po.value = v.changedTouches[0].clientY - Yt.value.offsetTop, yt = !1, Gt = v.changedTouches[0].clientX, Zt = v.changedTouches[0].clientX) : E = {
        //多点触屏的第一点
        startX: v.touches[0].pageX,
        startY: v.touches[0].pageY,
        endX: v.touches[0].pageX,
        endY: v.touches[0].pageY,
        //多点触屏的第二点  单点触屏时记录坐标为 -1 
        startX2: v.touches[1] ? v.touches[1].pageX : -1,
        startY2: v.touches[1] ? v.touches[1].pageY : -1,
        endX2: v.touches[1] ? v.touches[1].pageX : -1,
        endY2: v.touches[1] ? v.touches[1].pageY : -1
      };
    }
    function es(v) {
      if (Yt.value, Xe.value == 1) {
        let x = v.changedTouches[0].clientX, M = v.changedTouches[0].clientY;
        if (Math.abs(x - Gt) > 10 || Math.abs(M - Zt) > 10) {
          yt = !0;
          const $ = x - bo.value, I = M - Po.value;
          Yt.value.style.left = $ + "px", Yt.value.style.top = I + "px";
        } else
          yt = !1;
      } else {
        if (E === null)
          return;
        E.endX = v.touches[0].pageX, E.endY = v.touches[0].pageY, E.endX2 = v.touches[1] ? v.touches[1].pageX : -1, E.endY2 = v.touches[1] ? v.touches[1].pageY : -1;
        var O = function(x, M, $, I) {
          return Math.hypot($ - x, I - M);
        };
        if (E.startX2 != -1 && E.endX2 != -1 && E.startY2 != -1 && E.endY2 != -1) {
          let x = O(E.startX, E.startY, E.startX2, E.startY2), M = O(E.endX, E.endY, E.endX2, E.endY2);
          x < M ? g.value <= 4 && (g.value += 0.03) : x > M && g.value >= 0.6 && (g.value -= 0.03), rs(g.value, v);
        }
      }
    }
    function os(v) {
    }
    function rs(v, O) {
      O.target.style.scale = v;
    }
    return (v, O) => (ct(), Tt("div", {
      class: j(["container", r.value == "h" ? "active" : ""])
    }, [
      e.toolInfo.layoutChange && t.ImgList.length > 1 && !Or(o) ? (ct(), Tt("div", {
        key: 0,
        class: j(["horv", r.value == "h" ? "active" : ""]),
        onClick: f
      }, Va, 2)) : Lo("", !0),
      V("div", {
        class: j(["img-wraper", r.value == "h" ? "active" : ""]),
        ref_key: "ImgWrapper",
        ref: Be
      }, [
        V("img", {
          class: "v-img",
          onWheel: At,
          onMousedown: He($r, ["stop"]),
          onTouchstart: ts,
          onTouchmove: es,
          onTouchend: os,
          src: e.ImgList[h.value],
          ref_key: "ImgRef",
          ref: a
        }, null, 40, Wa),
        Io(V("img", {
          src: Ki,
          onClick: O[0] || (O[0] = He((x) => _("l"), ["stop"])),
          class: "img-l"
        }, null, 512), [
          [eo, e.ImgList[0] && h.value != 0]
        ]),
        Io(V("img", {
          src: ji,
          onClick: O[1] || (O[1] = He((x) => _("r"), ["stop"])),
          class: "img-l"
        }, null, 512), [
          [eo, e.ImgList[0] && h.value != e.ImgList.length - 1]
        ])
      ], 2),
      V("div", {
        class: j(["right", r.value == "h" ? "active" : ""])
      }, [
        V("div", {
          class: j(["toolbar", r.value == "h" ? "active" : ""])
        }, [
          (ct(!0), Tt(Te, null, No(n.value, (x, M) => (ct(), Tt("div", {
            class: "tool-wrapper",
            key: M
          }, [
            V("img", {
              src: x.icon,
              alt: "",
              onClick: ($) => x.func(x.type)
            }, null, 8, Ua)
          ]))), 128))
        ], 2),
        t.ImgList.length > 1 ? (ct(), Tt("div", {
          key: 0,
          class: j(["small-list", r.value == "h" ? "active" : ""])
        }, [
          V("div", {
            class: j(["img-list", r.value == "h" ? "active" : ""]),
            style: Pe({
              width: r.value == "h" ? 82 * e.ImgList.length + 18 + "px" : "",
              height: r.value == "v" ? 82 * e.ImgList.length + 18 + "px" : ""
            })
          }, [
            (ct(!0), Tt(Te, null, No(e.ImgList, (x, M) => (ct(), Tt("img", {
              src: x,
              onClick: ($) => p(M),
              class: j({ active: r.value == "h", imgA: M == h.value }),
              key: M,
              ref_for: !0,
              ref_key: "SmallImgRef",
              ref: c
            }, null, 10, Ka))), 128))
          ], 6)
        ], 2)) : Lo("", !0)
      ], 2)
    ], 2));
  }
});
export {
  qa as ImgViewer
};
