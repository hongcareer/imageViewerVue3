var cn = {};
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ro(e, t) {
  const n = new Set(e.split(","));
  return t ? (o) => n.has(o.toLowerCase()) : (o) => n.has(o);
}
const G = cn.NODE_ENV !== "production" ? Object.freeze({}) : {}, so = cn.NODE_ENV !== "production" ? Object.freeze([]) : [], ye = () => {
}, io = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), P = Object.assign, lo = Object.prototype.hasOwnProperty, O = (e, t) => lo.call(e, t), w = Array.isArray, Ne = (e) => $e(e) === "[object Map]", co = (e) => $e(e) === "[object Set]", M = (e) => typeof e == "function", H = (e) => typeof e == "string", Je = (e) => typeof e == "symbol", V = (e) => e !== null && typeof e == "object", ao = (e) => (V(e) || M(e)) && M(e.then) && M(e.catch), uo = Object.prototype.toString, $e = (e) => uo.call(e), an = (e) => $e(e).slice(8, -1), fo = (e) => $e(e) === "[object Object]", bt = (e) => H(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, un = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, fn = un((e) => e.charAt(0).toUpperCase() + e.slice(1)), ho = un((e) => e ? `on${fn(e)}` : ""), oe = (e, t) => !Object.is(e, t), po = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let jt;
const dn = () => jt || (jt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function et(e) {
  if (w(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = H(o) ? Eo(o) : et(o);
      if (r)
        for (const s in r)
          t[s] = r[s];
    }
    return t;
  } else if (H(e) || V(e))
    return e;
}
const go = /;(?![^(]*\))/g, mo = /:([^]+)/, vo = /\/\*[^]*?\*\//g;
function Eo(e) {
  const t = {};
  return e.replace(vo, "").split(go).forEach((n) => {
    if (n) {
      const o = n.split(mo);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function q(e) {
  let t = "";
  if (H(e))
    t = e;
  else if (w(e))
    for (let n = 0; n < e.length; n++) {
      const o = q(e[n]);
      o && (t += o + " ");
    }
  else if (V(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
var D = {};
function me(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let wo;
function yo(e, t = wo) {
  t && t.active && t.effects.push(e);
}
let ue;
class hn {
  constructor(t, n, o, r) {
    this.fn = t, this.trigger = n, this.scheduler = o, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, yo(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, tt();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (bo(n.computed), this._dirtyLevel >= 4))
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
    let t = te, n = ue;
    try {
      return te = !0, ue = this, this._runnings++, Ut(this), this.fn();
    } finally {
      Pt(this), this._runnings--, ue = n, te = t;
    }
  }
  stop() {
    var t;
    this.active && (Ut(this), Pt(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function bo(e) {
  return e.value;
}
function Ut(e) {
  e._trackId++, e._depsLength = 0;
}
function Pt(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      pn(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function pn(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let te = !0, ft = 0;
const gn = [];
function tt() {
  gn.push(te), te = !1;
}
function nt() {
  const e = gn.pop();
  te = e === void 0 ? !0 : e;
}
function Nt() {
  ft++;
}
function Ct() {
  for (ft--; !ft && dt.length; )
    dt.shift()();
}
function mn(e, t, n) {
  var o;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && pn(r, e), e.deps[e._depsLength++] = t) : e._depsLength++, D.NODE_ENV !== "production" && ((o = e.onTrack) == null || o.call(e, P({ effect: e }, n)));
  }
}
const dt = [];
function vn(e, t, n) {
  var o;
  Nt();
  for (const r of e.keys()) {
    let s;
    r._dirtyLevel < t && (s ?? (s = e.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = t), r._shouldSchedule && (s ?? (s = e.get(r) === r._trackId)) && (D.NODE_ENV !== "production" && ((o = r.onTrigger) == null || o.call(r, P({ effect: r }, n))), r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && dt.push(r.scheduler)));
  }
  Ct();
}
const En = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, ht = /* @__PURE__ */ new WeakMap(), fe = Symbol(D.NODE_ENV !== "production" ? "iterate" : ""), pt = Symbol(D.NODE_ENV !== "production" ? "Map key iterate" : "");
function z(e, t, n) {
  if (te && ue) {
    let o = ht.get(e);
    o || ht.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || o.set(n, r = En(() => o.delete(n))), mn(
      ue,
      r,
      D.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function ne(e, t, n, o, r, s) {
  const i = ht.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (n === "length" && w(e)) {
    const u = Number(o);
    i.forEach((p, d) => {
      (d === "length" || !Je(d) && d >= u) && l.push(p);
    });
  } else
    switch (n !== void 0 && l.push(i.get(n)), t) {
      case "add":
        w(e) ? bt(n) && l.push(i.get("length")) : (l.push(i.get(fe)), Ne(e) && l.push(i.get(pt)));
        break;
      case "delete":
        w(e) || (l.push(i.get(fe)), Ne(e) && l.push(i.get(pt)));
        break;
      case "set":
        Ne(e) && l.push(i.get(fe));
        break;
    }
  Nt();
  for (const u of l)
    u && vn(
      u,
      4,
      D.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: o,
        oldValue: r,
        oldTarget: s
      } : void 0
    );
  Ct();
}
const No = /* @__PURE__ */ ro("__proto__,__v_isRef,__isVue"), wn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Je)
), Gt = /* @__PURE__ */ Co();
function Co() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = g(this);
      for (let s = 0, i = this.length; s < i; s++)
        z(o, "get", s + "");
      const r = o[t](...n);
      return r === -1 || r === !1 ? o[t](...n.map(g)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      tt(), Nt();
      const o = g(this)[t].apply(this, n);
      return Ct(), nt(), o;
    };
  }), e;
}
function Oo(e) {
  const t = g(this);
  return z(t, "has", e), t.hasOwnProperty(e);
}
class yn {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, o) {
    const r = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return o === (r ? s ? Rn : On : s ? Fo : Cn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = w(t);
    if (!r) {
      if (i && O(Gt, n))
        return Reflect.get(Gt, n, o);
      if (n === "hasOwnProperty")
        return Oo;
    }
    const l = Reflect.get(t, n, o);
    return (Je(n) ? wn.has(n) : No(n)) || (r || z(t, "get", n), s) ? l : Y(l) ? i && bt(n) ? l : l.value : V(l) ? r ? Mn(l) : In(l) : l;
  }
}
class Ro extends yn {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, r) {
    let s = t[n];
    if (!this._isShallow) {
      const u = re(s);
      if (!he(o) && !re(o) && (s = g(s), o = g(o)), !w(t) && Y(s) && !Y(o))
        return u ? !1 : (s.value = o, !0);
    }
    const i = w(t) && bt(n) ? Number(n) < t.length : O(t, n), l = Reflect.set(t, n, o, r);
    return t === g(r) && (i ? oe(o, s) && ne(t, "set", n, o, s) : ne(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = O(t, n), r = t[n], s = Reflect.deleteProperty(t, n);
    return s && o && ne(t, "delete", n, void 0, r), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!Je(n) || !wn.has(n)) && z(t, "has", n), o;
  }
  ownKeys(t) {
    return z(
      t,
      "iterate",
      w(t) ? "length" : fe
    ), Reflect.ownKeys(t);
  }
}
class bn extends yn {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return D.NODE_ENV !== "production" && me(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return D.NODE_ENV !== "production" && me(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Io = /* @__PURE__ */ new Ro(), Mo = /* @__PURE__ */ new bn(), So = /* @__PURE__ */ new bn(!0), Ot = (e) => e, ot = (e) => Reflect.getPrototypeOf(e);
function ze(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const r = g(e), s = g(t);
  n || (oe(t, s) && z(r, "get", t), z(r, "get", s));
  const { has: i } = ot(r), l = o ? Ot : n ? Mt : _e;
  if (i.call(r, t))
    return l(e.get(t));
  if (i.call(r, s))
    return l(e.get(s));
  e !== r && e.get(t);
}
function Fe(e, t = !1) {
  const n = this.__v_raw, o = g(n), r = g(e);
  return t || (oe(e, r) && z(o, "has", e), z(o, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Ye(e, t = !1) {
  return e = e.__v_raw, !t && z(g(e), "iterate", fe), Reflect.get(e, "size", e);
}
function Bt(e) {
  e = g(e);
  const t = g(this);
  return ot(t).has.call(t, e) || (t.add(e), ne(t, "add", e, e)), this;
}
function Zt(e, t) {
  t = g(t);
  const n = g(this), { has: o, get: r } = ot(n);
  let s = o.call(n, e);
  s ? D.NODE_ENV !== "production" && Nn(n, o, e) : (e = g(e), s = o.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), s ? oe(t, i) && ne(n, "set", e, t, i) : ne(n, "add", e, t), this;
}
function Wt(e) {
  const t = g(this), { has: n, get: o } = ot(t);
  let r = n.call(t, e);
  r ? D.NODE_ENV !== "production" && Nn(t, n, e) : (e = g(e), r = n.call(t, e));
  const s = o ? o.call(t, e) : void 0, i = t.delete(e);
  return r && ne(t, "delete", e, void 0, s), i;
}
function Kt() {
  const e = g(this), t = e.size !== 0, n = D.NODE_ENV !== "production" ? Ne(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && ne(e, "clear", void 0, void 0, n), o;
}
function Xe(e, t) {
  return function(o, r) {
    const s = this, i = s.__v_raw, l = g(i), u = t ? Ot : e ? Mt : _e;
    return !e && z(l, "iterate", fe), i.forEach((p, d) => o.call(r, u(p), u(d), s));
  };
}
function He(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, s = g(r), i = Ne(s), l = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, p = r[e](...o), d = n ? Ot : t ? Mt : _e;
    return !t && z(
      s,
      "iterate",
      u ? pt : fe
    ), {
      // iterator protocol
      next() {
        const { value: c, done: f } = p.next();
        return f ? { value: c, done: f } : {
          value: l ? [d(c[0]), d(c[1])] : d(c),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function k(e) {
  return function(...t) {
    if (D.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      me(
        `${fn(e)} operation ${n}failed: target is readonly.`,
        g(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function xo() {
  const e = {
    get(s) {
      return ze(this, s);
    },
    get size() {
      return Ye(this);
    },
    has: Fe,
    add: Bt,
    set: Zt,
    delete: Wt,
    clear: Kt,
    forEach: Xe(!1, !1)
  }, t = {
    get(s) {
      return ze(this, s, !1, !0);
    },
    get size() {
      return Ye(this);
    },
    has: Fe,
    add: Bt,
    set: Zt,
    delete: Wt,
    clear: Kt,
    forEach: Xe(!1, !0)
  }, n = {
    get(s) {
      return ze(this, s, !0);
    },
    get size() {
      return Ye(this, !0);
    },
    has(s) {
      return Fe.call(this, s, !0);
    },
    add: k("add"),
    set: k("set"),
    delete: k("delete"),
    clear: k("clear"),
    forEach: Xe(!0, !1)
  }, o = {
    get(s) {
      return ze(this, s, !0, !0);
    },
    get size() {
      return Ye(this, !0);
    },
    has(s) {
      return Fe.call(this, s, !0);
    },
    add: k("add"),
    set: k("set"),
    delete: k("delete"),
    clear: k("clear"),
    forEach: Xe(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = He(
      s,
      !1,
      !1
    ), n[s] = He(
      s,
      !0,
      !1
    ), t[s] = He(
      s,
      !1,
      !0
    ), o[s] = He(
      s,
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
  Do,
  _o,
  To,
  Ao
] = /* @__PURE__ */ xo();
function Rt(e, t) {
  const n = t ? e ? Ao : To : e ? _o : Do;
  return (o, r, s) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(
    O(n, r) && r in o ? n : o,
    r,
    s
  );
}
const Vo = {
  get: /* @__PURE__ */ Rt(!1, !1)
}, Lo = {
  get: /* @__PURE__ */ Rt(!0, !1)
}, zo = {
  get: /* @__PURE__ */ Rt(!0, !0)
};
function Nn(e, t, n) {
  const o = g(n);
  if (o !== n && t.call(e, o)) {
    const r = an(e);
    me(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Cn = /* @__PURE__ */ new WeakMap(), Fo = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ new WeakMap(), Rn = /* @__PURE__ */ new WeakMap();
function Yo(e) {
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
function Xo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Yo(an(e));
}
function In(e) {
  return re(e) ? e : It(
    e,
    !1,
    Io,
    Vo,
    Cn
  );
}
function Mn(e) {
  return It(
    e,
    !0,
    Mo,
    Lo,
    On
  );
}
function qe(e) {
  return It(
    e,
    !0,
    So,
    zo,
    Rn
  );
}
function It(e, t, n, o, r) {
  if (!V(e))
    return D.NODE_ENV !== "production" && me(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = r.get(e);
  if (s)
    return s;
  const i = Xo(e);
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? o : n
  );
  return r.set(e, l), l;
}
function de(e) {
  return re(e) ? de(e.__v_raw) : !!(e && e.__v_isReactive);
}
function re(e) {
  return !!(e && e.__v_isReadonly);
}
function he(e) {
  return !!(e && e.__v_isShallow);
}
function gt(e) {
  return de(e) || re(e);
}
function g(e) {
  const t = e && e.__v_raw;
  return t ? g(t) : e;
}
function Ho(e) {
  return Object.isExtensible(e) && po(e, "__v_skip", !0), e;
}
const _e = (e) => V(e) ? In(e) : e, Mt = (e) => V(e) ? Mn(e) : e, qo = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class Sn {
  constructor(t, n, o, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new hn(
      () => t(this._value),
      () => Pe(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = o;
  }
  get value() {
    const t = g(this);
    return (!t._cacheable || t.effect.dirty) && oe(t._value, t._value = t.effect.run()) && Pe(t, 4), xn(t), t.effect._dirtyLevel >= 2 && (D.NODE_ENV !== "production" && this._warnRecursive && me(qo, `

getter: `, this.getter), Pe(t, 2)), t._value;
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
function jo(e, t, n = !1) {
  let o, r;
  const s = M(e);
  s ? (o = e, r = D.NODE_ENV !== "production" ? () => {
    me("Write operation failed: computed value is readonly");
  } : ye) : (o = e.get, r = e.set);
  const i = new Sn(o, r, s || !r, n);
  return D.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
function xn(e) {
  var t;
  te && ue && (e = g(e), mn(
    ue,
    (t = e.dep) != null ? t : e.dep = En(
      () => e.dep = void 0,
      e instanceof Sn ? e : void 0
    ),
    D.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function Pe(e, t = 4, n) {
  e = g(e);
  const o = e.dep;
  o && vn(
    o,
    t,
    D.NODE_ENV !== "production" ? {
      target: e,
      type: "set",
      key: "value",
      newValue: n
    } : void 0
  );
}
function Y(e) {
  return !!(e && e.__v_isRef === !0);
}
function I(e) {
  return Uo(e, !1);
}
function Uo(e, t) {
  return Y(e) ? e : new Po(e, t);
}
class Po {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : g(t), this._value = n ? t : _e(t);
  }
  get value() {
    return xn(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || he(t) || re(t);
    t = n ? t : g(t), oe(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : _e(t), Pe(this, 4, t));
  }
}
function Dn(e) {
  return Y(e) ? e.value : e;
}
const Go = {
  get: (e, t, n) => Dn(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return Y(r) && !Y(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Bo(e) {
  return de(e) ? e : new Proxy(e, Go);
}
var h = {};
const pe = [];
function Zo(e) {
  pe.push(e);
}
function Wo() {
  pe.pop();
}
function b(e, ...t) {
  tt();
  const n = pe.length ? pe[pe.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = Ko();
  if (o)
    ge(
      o,
      n,
      11,
      [
        e + t.map((s) => {
          var i, l;
          return (l = (i = s.toString) == null ? void 0 : i.call(s)) != null ? l : JSON.stringify(s);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: s }) => `at <${Bn(n, s.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    r.length && s.push(`
`, ...Qo(r)), console.warn(...s);
  }
  nt();
}
function Ko() {
  let e = pe[pe.length - 1];
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
function Qo(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...ko(n));
  }), t;
}
function ko({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${Bn(
    e.component,
    e.type,
    o
  )}`, s = ">" + n;
  return e.props ? [r, ...Jo(e.props), s] : [r + s];
}
function Jo(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(..._n(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function _n(e, t, n) {
  return H(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : Y(t) ? (t = _n(e, g(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : M(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = g(t), n ? t : [`${e}=`, t]);
}
const St = {
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
function ge(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (r) {
    xt(r, t, n);
  }
}
function Se(e, t, n, o) {
  if (M(e)) {
    const s = ge(e, t, n, o);
    return s && ao(s) && s.catch((i) => {
      xt(i, t, n);
    }), s;
  }
  const r = [];
  for (let s = 0; s < e.length; s++)
    r.push(Se(e[s], t, n, o));
  return r;
}
function xt(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy, l = h.NODE_ENV !== "production" ? St[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; s; ) {
      const p = s.ec;
      if (p) {
        for (let d = 0; d < p.length; d++)
          if (p[d](e, i, l) === !1)
            return;
      }
      s = s.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      ge(
        u,
        null,
        10,
        [e, i, l]
      );
      return;
    }
  }
  $o(e, n, r, o);
}
function $o(e, t, n, o = !0) {
  if (h.NODE_ENV !== "production") {
    const r = St[t];
    if (n && Zo(n), b(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Wo(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Ze = !1, mt = !1;
const j = [];
let ee = 0;
const Ce = [];
let K = null, $ = 0;
const Tn = /* @__PURE__ */ Promise.resolve();
let Dt = null;
const er = 100;
function ae(e) {
  const t = Dt || Tn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function tr(e) {
  let t = ee + 1, n = j.length;
  for (; t < n; ) {
    const o = t + n >>> 1, r = j[o], s = Te(r);
    s < e || s === e && r.pre ? t = o + 1 : n = o;
  }
  return t;
}
function _t(e) {
  (!j.length || !j.includes(
    e,
    Ze && e.allowRecurse ? ee + 1 : ee
  )) && (e.id == null ? j.push(e) : j.splice(tr(e.id), 0, e), An());
}
function An() {
  !Ze && !mt && (mt = !0, Dt = Tn.then(Ln));
}
function Vn(e) {
  w(e) ? Ce.push(...e) : (!K || !K.includes(
    e,
    e.allowRecurse ? $ + 1 : $
  )) && Ce.push(e), An();
}
function nr(e) {
  if (Ce.length) {
    const t = [...new Set(Ce)].sort(
      (n, o) => Te(n) - Te(o)
    );
    if (Ce.length = 0, K) {
      K.push(...t);
      return;
    }
    for (K = t, h.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), $ = 0; $ < K.length; $++)
      h.NODE_ENV !== "production" && zn(e, K[$]) || K[$]();
    K = null, $ = 0;
  }
}
const Te = (e) => e.id == null ? 1 / 0 : e.id, or = (e, t) => {
  const n = Te(e) - Te(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Ln(e) {
  mt = !1, Ze = !0, h.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), j.sort(or);
  const t = h.NODE_ENV !== "production" ? (n) => zn(e, n) : ye;
  try {
    for (ee = 0; ee < j.length; ee++) {
      const n = j[ee];
      if (n && n.active !== !1) {
        if (h.NODE_ENV !== "production" && t(n))
          continue;
        ge(n, null, 14);
      }
    }
  } finally {
    ee = 0, j.length = 0, nr(e), Ze = !1, Dt = null, (j.length || Ce.length) && Ln(e);
  }
}
function zn(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > er) {
      const o = t.ownerInstance, r = o && Gn(o.type);
      return xt(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const Re = /* @__PURE__ */ new Set();
h.NODE_ENV !== "production" && (dn().__VUE_HMR_RUNTIME__ = {
  createRecord: ct(rr),
  rerender: ct(sr),
  reload: ct(ir)
});
const We = /* @__PURE__ */ new Map();
function rr(e, t) {
  return We.has(e) ? !1 : (We.set(e, {
    initialDef: xe(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function xe(e) {
  return Zn(e) ? e.__vccOpts : e;
}
function sr(e, t) {
  const n = We.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, xe(o.type).render = t), o.renderCache = [], o.effect.dirty = !0, o.update();
  }));
}
function ir(e, t) {
  const n = We.get(e);
  if (!n)
    return;
  t = xe(t), Qt(n.initialDef, t);
  const o = [...n.instances];
  for (const r of o) {
    const s = xe(r.type);
    Re.has(s) || (s !== n.initialDef && Qt(s, t), Re.add(s)), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (Re.add(s), r.ceReload(t.styles), Re.delete(s)) : r.parent ? (r.parent.effect.dirty = !0, _t(r.parent.update)) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Vn(() => {
    for (const r of o)
      Re.delete(
        xe(r.type)
      );
  });
}
function Qt(e, t) {
  P(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function ct(e) {
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
let B = null, lr = null;
const cr = Symbol.for("v-ndc"), ar = (e) => e.__isSuspense;
function ur(e, t) {
  t && t.pendingBranch ? w(e) ? t.effects.push(...e) : t.effects.push(e) : Vn(e);
}
const fr = Symbol.for("v-scx"), dr = () => {
  {
    const e = Or(fr);
    return e || h.NODE_ENV !== "production" && b(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
}, je = {};
function Ue(e, t, n) {
  return h.NODE_ENV !== "production" && !M(t) && b(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Fn(e, t, n);
}
function Fn(e, t, {
  immediate: n,
  deep: o,
  flush: r,
  once: s,
  onTrack: i,
  onTrigger: l
} = G) {
  if (t && s) {
    const m = t;
    t = (...Oe) => {
      m(...Oe), Ee();
    };
  }
  h.NODE_ENV !== "production" && o !== void 0 && typeof o == "number" && b(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), h.NODE_ENV !== "production" && !t && (n !== void 0 && b(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && b(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && b(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const u = (m) => {
    b(
      "Invalid watch source: ",
      m,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, p = ve, d = (m) => o === !0 ? m : (
    // for deep: false, only traverse root-level properties
    be(m, o === !1 ? 1 : void 0)
  );
  let c, f = !1, v = !1;
  if (Y(e) ? (c = () => e.value, f = he(e)) : de(e) ? (c = () => d(e), f = !0) : w(e) ? (v = !0, f = e.some((m) => de(m) || he(m)), c = () => e.map((m) => {
    if (Y(m))
      return m.value;
    if (de(m))
      return d(m);
    if (M(m))
      return ge(m, p, 2);
    h.NODE_ENV !== "production" && u(m);
  })) : M(e) ? t ? c = () => ge(e, p, 2) : c = () => (N && N(), Se(
    e,
    p,
    3,
    [T]
  )) : (c = ye, h.NODE_ENV !== "production" && u(e)), t && o) {
    const m = c;
    c = () => be(m());
  }
  let N, T = (m) => {
    N = _.onStop = () => {
      ge(m, p, 4), N = _.onStop = void 0;
    };
  }, Q;
  if (rt)
    if (T = ye, t ? n && Se(t, p, 3, [
      c(),
      v ? [] : void 0,
      T
    ]) : c(), r === "sync") {
      const m = dr();
      Q = m.__watcherHandles || (m.__watcherHandles = []);
    } else
      return ye;
  let Z = v ? new Array(e.length).fill(je) : je;
  const W = () => {
    if (!(!_.active || !_.dirty))
      if (t) {
        const m = _.run();
        (o || f || (v ? m.some((Oe, Ae) => oe(Oe, Z[Ae])) : oe(m, Z))) && (N && N(), Se(t, p, 3, [
          m,
          // pass undefined as the old value when it's changed for the first time
          Z === je ? void 0 : v && Z[0] === je ? [] : Z,
          T
        ]), Z = m);
      } else
        _.run();
  };
  W.allowRecurse = !!t;
  let se;
  r === "sync" ? se = W : r === "post" ? se = () => rn(W, p && p.suspense) : (W.pre = !0, p && (W.id = p.uid), se = () => _t(W));
  const _ = new hn(c, ye, se), Ee = () => {
    _.stop();
  };
  return h.NODE_ENV !== "production" && (_.onTrack = i, _.onTrigger = l), t ? n ? W() : Z = _.run() : r === "post" ? rn(
    _.run.bind(_),
    p && p.suspense
  ) : _.run(), Q && Q.push(Ee), Ee;
}
function hr(e, t, n) {
  const o = this.proxy, r = H(e) ? e.includes(".") ? pr(o, e) : () => o[e] : e.bind(o, o);
  let s;
  M(t) ? s = t : (s = t.handler, n = t);
  const i = Pn(this), l = Fn(r, s.bind(o), n);
  return i(), l;
}
function pr(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
function be(e, t, n = 0, o) {
  if (!V(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (o = o || /* @__PURE__ */ new Set(), o.has(e))
    return e;
  if (o.add(e), Y(e))
    be(e.value, t, n, o);
  else if (w(e))
    for (let r = 0; r < e.length; r++)
      be(e[r], t, n, o);
  else if (co(e) || Ne(e))
    e.forEach((r) => {
      be(r, t, n, o);
    });
  else if (fo(e))
    for (const r in e)
      be(e[r], t, n, o);
  return e;
}
function kt(e, t) {
  return h.NODE_ENV !== "production" && b("withDirectives can only be used inside render functions."), e;
}
function gr(e, t, n = ve, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      tt();
      const l = Pn(n), u = Se(t, n, e, i);
      return l(), nt(), u;
    });
    return o ? r.unshift(s) : r.push(s), s;
  } else if (h.NODE_ENV !== "production") {
    const r = ho(St[e].replace(/ hook$/, ""));
    b(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Yn = (e) => (t, n = ve) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!rt || e === "sp") && gr(e, (...o) => t(...o), n)
), mr = Yn("m"), vr = Yn("um");
function Jt(e, t, n, o) {
  let r;
  const s = n && n[o];
  if (w(e) || H(e)) {
    r = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      r[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == "number") {
    h.NODE_ENV !== "production" && !Number.isInteger(e) && b(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let i = 0; i < e; i++)
      r[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (V(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (i, l) => t(i, l, void 0, s && s[l])
      );
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let l = 0, u = i.length; l < u; l++) {
        const p = i[l];
        r[l] = t(e[p], p, l, s && s[l]);
      }
    }
  else
    r = [];
  return n && (n[o] = r), r;
}
const vt = (e) => e ? Lr(e) ? zr(e) || e.proxy : vt(e.parent) : null, De = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ P(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => h.NODE_ENV !== "production" ? qe(e.props) : e.props,
    $attrs: (e) => h.NODE_ENV !== "production" ? qe(e.attrs) : e.attrs,
    $slots: (e) => h.NODE_ENV !== "production" ? qe(e.slots) : e.slots,
    $refs: (e) => h.NODE_ENV !== "production" ? qe(e.refs) : e.refs,
    $parent: (e) => vt(e.parent),
    $root: (e) => vt(e.root),
    $emit: (e) => e.emit,
    $options: (e) => yr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, _t(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ae.bind(e.proxy)),
    $watch: (e) => hr.bind(e)
  })
), Er = (e) => e === "_" || e === "$", at = (e, t) => e !== G && !e.__isScriptSetup && O(e, t), wr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: l, appContext: u } = e;
    if (h.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let p;
    if (t[0] !== "$") {
      const v = i[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return o[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (at(o, t))
          return i[t] = 1, o[t];
        if (r !== G && O(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && O(p, t)
        )
          return i[t] = 3, s[t];
        if (n !== G && O(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = De[t];
    let c, f;
    if (d)
      return (t === "$attrs" || h.NODE_ENV !== "production" && t === "$slots") && z(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (c = l.__cssModules) && (c = c[t])
    )
      return c;
    if (n !== G && O(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = u.config.globalProperties, O(f, t)
    )
      return f[t];
    h.NODE_ENV !== "production" && B && (!H(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== G && Er(t[0]) && O(r, t) ? b(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === B && b(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: s } = e;
    return at(r, t) ? (r[t] = n, !0) : h.NODE_ENV !== "production" && r.__isScriptSetup && O(r, t) ? (b(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== G && O(o, t) ? (o[t] = n, !0) : O(e.props, t) ? (h.NODE_ENV !== "production" && b(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (h.NODE_ENV !== "production" && b(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (h.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: s }
  }, i) {
    let l;
    return !!n[i] || e !== G && O(e, i) || at(t, i) || (l = s[0]) && O(l, i) || O(o, i) || O(De, i) || O(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : O(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
h.NODE_ENV !== "production" && (wr.ownKeys = (e) => (b(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function $t(e) {
  return w(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function yr(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: r,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let u;
  return l ? u = l : !r.length && !n && !o ? u = t : (u = {}, r.length && r.forEach(
    (p) => Ke(u, p, i, !0)
  ), Ke(u, t, i)), V(t) && s.set(t, u), u;
}
function Ke(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && Ke(e, s, n, !0), r && r.forEach(
    (i) => Ke(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      h.NODE_ENV !== "production" && b(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = br[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const br = {
  data: en,
  props: nn,
  emits: nn,
  // objects
  methods: Me,
  computed: Me,
  // lifecycle
  beforeCreate: A,
  created: A,
  beforeMount: A,
  mounted: A,
  beforeUpdate: A,
  updated: A,
  beforeDestroy: A,
  beforeUnmount: A,
  destroyed: A,
  unmounted: A,
  activated: A,
  deactivated: A,
  errorCaptured: A,
  serverPrefetch: A,
  // assets
  components: Me,
  directives: Me,
  // watch
  watch: Cr,
  // provide / inject
  provide: en,
  inject: Nr
};
function en(e, t) {
  return t ? e ? function() {
    return P(
      M(e) ? e.call(this, this) : e,
      M(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Nr(e, t) {
  return Me(tn(e), tn(t));
}
function tn(e) {
  if (w(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function A(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Me(e, t) {
  return e ? P(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function nn(e, t) {
  return e ? w(e) && w(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : P(
    /* @__PURE__ */ Object.create(null),
    $t(e),
    $t(t ?? {})
  ) : t;
}
function Cr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = P(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = A(e[o], t[o]);
  return n;
}
let on = null;
function Or(e, t, n = !1) {
  const o = ve || B;
  if (o || on) {
    const r = o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : on._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && M(t) ? t.call(o && o.proxy) : t;
    h.NODE_ENV !== "production" && b(`injection "${String(e)}" not found.`);
  } else
    h.NODE_ENV !== "production" && b("inject() can only be used inside setup() or functional components.");
}
const rn = ur, Rr = (e) => e.__isTeleport, Qe = Symbol.for("v-fgt"), Ir = Symbol.for("v-txt"), Et = Symbol.for("v-cmt"), Ge = [];
let U = null;
function J(e = !1) {
  Ge.push(U = e ? null : []);
}
function Mr() {
  Ge.pop(), U = Ge[Ge.length - 1] || null;
}
function Xn(e) {
  return e.dynamicChildren = U || so, Mr(), U && U.push(e), e;
}
function ce(e, t, n, o, r, s) {
  return Xn(
    X(
      e,
      t,
      n,
      o,
      r,
      s,
      !0
    )
  );
}
function Sr(e, t, n, o, r) {
  return Xn(
    Tt(
      e,
      t,
      n,
      o,
      r,
      !0
    )
  );
}
function xr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Dr = (...e) => jn(
  ...e
), Hn = "__vInternal", qn = ({ key: e }) => e ?? null, Be = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? H(e) || Y(e) || M(e) ? { i: B, r: e, k: t, f: !!n } : e : null);
function X(e, t = null, n = null, o = 0, r = null, s = e === Qe ? 0 : 1, i = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && qn(t),
    ref: t && Be(t),
    scopeId: lr,
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
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: B
  };
  return l ? (At(u, n), s & 128 && e.normalize(u)) : n && (u.shapeFlag |= H(n) ? 8 : 16), h.NODE_ENV !== "production" && u.key !== u.key && b("VNode created with invalid key (NaN). VNode type:", u.type), // avoid a block node from tracking itself
  !i && // has current parent block
  U && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && U.push(u), u;
}
const Tt = h.NODE_ENV !== "production" ? Dr : jn;
function jn(e, t = null, n = null, o = 0, r = null, s = !1) {
  if ((!e || e === cr) && (h.NODE_ENV !== "production" && !e && b(`Invalid vnode type when creating vnode: ${e}.`), e = Et), xr(e)) {
    const l = ke(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && At(l, n), !s && U && (l.shapeFlag & 6 ? U[U.indexOf(e)] = l : U.push(l)), l.patchFlag |= -2, l;
  }
  if (Zn(e) && (e = e.__vccOpts), t) {
    t = _r(t);
    let { class: l, style: u } = t;
    l && !H(l) && (t.class = q(l)), V(u) && (gt(u) && !w(u) && (u = P({}, u)), t.style = et(u));
  }
  const i = H(e) ? 1 : ar(e) ? 128 : Rr(e) ? 64 : V(e) ? 4 : M(e) ? 2 : 0;
  return h.NODE_ENV !== "production" && i & 4 && gt(e) && (e = g(e), b(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), X(
    e,
    t,
    n,
    o,
    r,
    i,
    s,
    !0
  );
}
function _r(e) {
  return e ? gt(e) || Hn in e ? P({}, e) : e : null;
}
function ke(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: i } = e, l = t ? Ar(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && qn(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? w(r) ? r.concat(Be(t)) : [r, Be(t)] : Be(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: h.NODE_ENV !== "production" && s === -1 && w(i) ? i.map(Un) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Qe ? s === -1 ? 16 : s | 16 : s,
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
    ssContent: e.ssContent && ke(e.ssContent),
    ssFallback: e.ssFallback && ke(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Un(e) {
  const t = ke(e);
  return w(e.children) && (t.children = e.children.map(Un)), t;
}
function Tr(e = " ", t = 0) {
  return Tt(Ir, null, e, t);
}
function sn(e = "", t = !1) {
  return t ? (J(), Sr(Et, null, e)) : Tt(Et, null, e);
}
function At(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (w(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), At(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Hn in t) ? t._ctx = B : r === 3 && B && (B.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    M(t) ? (t = { default: t, _ctx: B }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Tr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Ar(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = q([t.class, o.class]));
      else if (r === "style")
        t.style = et([t.style, o.style]);
      else if (io(r)) {
        const s = t[r], i = o[r];
        i && s !== i && !(w(s) && s.includes(i)) && (t[r] = s ? [].concat(s, i) : i);
      } else
        r !== "" && (t[r] = o[r]);
  }
  return t;
}
let ve = null;
const Vr = () => ve || B;
let wt;
{
  const e = dn(), t = (n, o) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(o), (s) => {
      r.length > 1 ? r.forEach((i) => i(s)) : r[0](s);
    };
  };
  wt = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ve = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => rt = n
  );
}
const Pn = (e) => {
  const t = ve;
  return wt(e), e.scope.on(), () => {
    e.scope.off(), wt(t);
  };
};
function Lr(e) {
  return e.vnode.shapeFlag & 4;
}
let rt = !1;
function zr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Bo(Ho(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in De)
          return De[n](e);
      },
      has(t, n) {
        return n in t || n in De;
      }
    }));
}
const Fr = /(?:^|[-_])(\w)/g, Yr = (e) => e.replace(Fr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Gn(e, t = !0) {
  return M(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Bn(e, t, n = !1) {
  let o = Gn(t);
  if (!o && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (o = r[1]);
  }
  if (!o && e && e.parent) {
    const r = (s) => {
      for (const i in s)
        if (s[i] === t)
          return i;
    };
    o = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return o ? Yr(o) : n ? "App" : "Anonymous";
}
function Zn(e) {
  return M(e) && "__vccOpts" in e;
}
const ln = (e, t) => {
  const n = jo(e, t, rt);
  if (h.NODE_ENV !== "production") {
    const o = Vr();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Xr() {
  if (h.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, r = {
    header(c) {
      return V(c) ? c.__isVue ? ["div", e, "VueInstance"] : Y(c) ? [
        "div",
        {},
        ["span", e, d(c)],
        "<",
        l(c.value),
        ">"
      ] : de(c) ? [
        "div",
        {},
        ["span", e, he(c) ? "ShallowReactive" : "Reactive"],
        "<",
        l(c),
        `>${re(c) ? " (readonly)" : ""}`
      ] : re(c) ? [
        "div",
        {},
        ["span", e, he(c) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(c),
        ">"
      ] : null : null;
    },
    hasBody(c) {
      return c && c.__isVue;
    },
    body(c) {
      if (c && c.__isVue)
        return [
          "div",
          {},
          ...s(c.$)
        ];
    }
  };
  function s(c) {
    const f = [];
    c.type.props && c.props && f.push(i("props", g(c.props))), c.setupState !== G && f.push(i("setup", c.setupState)), c.data !== G && f.push(i("data", g(c.data)));
    const v = u(c, "computed");
    v && f.push(i("computed", v));
    const N = u(c, "inject");
    return N && f.push(i("injected", N)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: c }]
    ]), f;
  }
  function i(c, f) {
    return f = P({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        c
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((v) => [
          "div",
          {},
          ["span", o, v + ": "],
          l(f[v], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(c, f = !0) {
    return typeof c == "number" ? ["span", t, c] : typeof c == "string" ? ["span", n, JSON.stringify(c)] : typeof c == "boolean" ? ["span", o, c] : V(c) ? ["object", { object: f ? g(c) : c }] : ["span", n, String(c)];
  }
  function u(c, f) {
    const v = c.type;
    if (M(v))
      return;
    const N = {};
    for (const T in c.ctx)
      p(v, T, f) && (N[T] = c.ctx[T]);
    return N;
  }
  function p(c, f, v) {
    const N = c[v];
    if (w(N) && N.includes(f) || V(N) && f in N || c.extends && p(c.extends, f, v) || c.mixins && c.mixins.some((T) => p(T, f, v)))
      return !0;
  }
  function d(c) {
    return he(c) ? "ShallowRef" : c.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
var Hr = {};
const Wn = Symbol("_vod"), qr = Symbol("_vsh"), yt = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[Wn] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Ie(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: o }) {
    !t != !n && (o ? t ? (o.beforeEnter(e), Ie(e, !0), o.enter(e)) : o.leave(e, () => {
      Ie(e, !1);
    }) : Ie(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Ie(e, t);
  }
};
Hr.NODE_ENV !== "production" && (yt.name = "show");
function Ie(e, t) {
  e.style.display = t ? e[Wn] : "none", e[qr] = !t;
}
const jr = ["ctrl", "shift", "alt", "meta"], Ur = {
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
  exact: (e, t) => jr.some((n) => e[`${n}Key`] && !t.includes(n))
}, ut = (e, t) => {
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = (r, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = Ur[t[i]];
      if (l && l(r, t))
        return;
    }
    return e(r, ...s);
  });
};
var Pr = {};
function Gr() {
  Xr();
}
Pr.NODE_ENV !== "production" && Gr();
const Br = "data:image/png;base64,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", Zr = "data:image/png;base64,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", Wr = "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='&%23231;&%23188;&%23150;&%23231;&%23187;&%23132;&%23229;&%23164;&%23135;&%23228;&%23187;&%23189;'%3e%3cpath%20id='Rectangle%20108'%20d='M2.29199%207.7085C2.29199%206.93193%202.29199%206.54364%202.41886%206.23736C2.58802%205.82898%202.91247%205.50452%203.32085%205.33536C3.62714%205.2085%204.01542%205.2085%204.79199%205.2085H5.62533C8.7316%205.2085%2010.2847%205.2085%2011.5099%205.71597C13.1434%206.39259%2014.4412%207.69042%2015.1179%209.32394C15.6253%2010.5491%2015.6253%2012.1022%2015.6253%2015.2085V15.2085C15.6253%2015.9851%2015.6253%2016.3733%2015.4985%2016.6796C15.3293%2017.088%2015.0048%2017.4125%2014.5965%2017.5816C14.2902%2017.7085%2013.9019%2017.7085%2013.1253%2017.7085H4.79199C4.01542%2017.7085%203.62714%2017.7085%203.32085%2017.5816C2.91247%2017.4125%202.58802%2017.088%202.41886%2016.6796C2.29199%2016.3733%202.29199%2015.9851%202.29199%2015.2085V7.7085Z'%20stroke='black'%20stroke-opacity='0.85'%20stroke-width='1.4'/%3e%3cpath%20id='Union'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.75%201.7777C13.75%201.50855%2013.4986%201.31002%2013.2368%201.37236L9.54549%202.25125C9.19506%202.27103%208.91699%202.56146%208.91699%202.91684C8.91699%203.28503%209.21547%203.58351%209.58366%203.58351C13.057%203.58351%2015.9834%205.55703%2017.1364%208.57166L18.3818%208.09535C17.5284%205.86398%2015.8586%204.13536%2013.75%203.15468V1.7777Z'%20fill='black'%20fill-opacity='0.85'/%3e%3c/g%3e%3c/svg%3e", Kr = "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='&%23229;&%23155;&%23190;&%23230;&%23160;&%23135;/&%23231;&%23186;&%23191;&%23230;&%23128;&%23167;/ZoomInOutlined&%23239;&%23188;&%23136;&%23230;&%23148;&%23190;&%23229;&%23164;&%23167;&%23239;&%23188;&%23137;'%3e%3cpath%20id='Vector'%20d='M5.83301%209.16683L12.4997%209.16683M9.16634%205.8335L9.16634%2012.5002'%20stroke='black'%20stroke-opacity='0.85'%20stroke-width='1.4'/%3e%3cpath%20id='Vector_2'%20d='M14.4604%2014.4797L17.917%2017.9165M16.667%209.1665C16.667%2013.3086%2013.3091%2016.6665%209.16699%2016.6665C5.02486%2016.6665%201.66699%2013.3086%201.66699%209.1665C1.66699%205.02437%205.02486%201.6665%209.16699%201.6665C13.3091%201.6665%2016.667%205.02437%2016.667%209.1665Z'%20stroke='black'%20stroke-opacity='0.85'%20stroke-width='1.4'%20stroke-linecap='square'/%3e%3c/g%3e%3c/svg%3e", Qr = "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='&%23229;&%23155;&%23190;&%23230;&%23160;&%23135;/&%23231;&%23186;&%23191;&%23230;&%23128;&%23167;/ZoomOutOutlined&%23239;&%23188;&%23136;&%23231;&%23188;&%23169;&%23229;&%23176;&%23143;&%23239;&%23188;&%23137;'%3e%3cpath%20id='Vector%2033'%20d='M5.83398%209.1665L12.5007%209.1665'%20stroke='black'%20stroke-opacity='0.85'%20stroke-width='1.4'/%3e%3cpath%20id='Vector'%20d='M14.4641%2014.476L17.917%2017.9165M16.667%209.1665C16.667%2013.3086%2013.3091%2016.6665%209.16699%2016.6665C5.02486%2016.6665%201.66699%2013.3086%201.66699%209.1665C1.66699%205.02437%205.02486%201.6665%209.16699%201.6665C13.3091%201.6665%2016.667%205.02437%2016.667%209.1665Z'%20stroke='black'%20stroke-opacity='0.85'%20stroke-width='1.4'%20stroke-linecap='square'/%3e%3c/g%3e%3c/svg%3e", kr = /* @__PURE__ */ X("div", { class: "v" }, null, -1), Jr = /* @__PURE__ */ X("div", { class: "h" }, null, -1), $r = [
  kr,
  Jr
], es = ["src"], ts = ["src", "onClick"], ns = ["src", "onClick"], os = {
  name: "ImgViewer"
}, rs = /* @__PURE__ */ Object.assign(os, {
  props: {
    ImgList: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    },
    toolInfo: {
      type: Object,
      default: () => ({
        layoutChange: !0,
        fullTool: [],
        clickFunc: () => {
        }
      })
    }
  },
  setup(e) {
    const t = e;
    let n = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(window.navigator.userAgent) || document.documentElement.clientWidth < 744;
    const o = I(t.ImgList.length == 1 || n ? "h" : t.toolInfo.layout), r = ln(() => t.toolInfo.fullTool), s = [
      {
        icon: Wr,
        func: Jn
      },
      {
        icon: Kr,
        func: Yt,
        type: "in"
      },
      {
        icon: Qr,
        func: Yt,
        type: "out"
      }
    ], i = ln(() => [...s, ...r.value]), l = I(!1), u = I(null), p = I(null), d = I(null), c = I(null), f = I(!1), v = I(0), N = I(0), T = I(0), Q = I(0), Z = I(document.documentElement.clientWidth), W = I(document.documentElement.clientHeight), se = async () => {
      if (await ae(), !u.value || !p.value || !d.value || !c.value) {
        console.warn("ImgViewer: 组件初始化失败，某些必要的DOM元素未找到");
        return;
      }
      Ee(), l.value = !0;
    };
    mr(async () => {
      await se(), window.addEventListener("resize", _);
    }), Ue(() => t.ImgList, async () => {
      await se();
    }, { deep: !0 }), Ue(() => t.index, async () => {
      l.value && (await ae(), ie());
    }), vr(() => {
      window.removeEventListener("resize", _), l.value = !1;
    });
    function _() {
      Z.value = document.documentElement.clientWidth, W.value = document.documentElement.clientHeight;
    }
    function Ee() {
      d.value && (d.value.style.overflow = (o.value === "h", "auto"), d.value.style.scrollBehavior = "smooth", d.value.addEventListener("mousedown", m), d.value.addEventListener("touchstart", Oe));
    }
    function m(a) {
      f.value = !0, v.value = a.pageX - d.value.offsetLeft, N.value = a.pageY - d.value.offsetTop, T.value = d.value.scrollLeft, Q.value = d.value.scrollTop, document.addEventListener("mousemove", Ae), document.addEventListener("mouseup", Lt);
    }
    function Oe(a) {
      f.value = !0, v.value = a.touches[0].pageX - d.value.offsetLeft, N.value = a.touches[0].pageY - d.value.offsetTop, T.value = d.value.scrollLeft, Q.value = d.value.scrollTop, document.addEventListener("touchmove", Vt), document.addEventListener("touchend", zt);
    }
    function Ae(a) {
      if (!f.value)
        return;
      a.preventDefault();
      const E = a.pageX - d.value.offsetLeft, y = a.pageY - d.value.offsetTop, C = E - v.value, x = y - N.value;
      o.value === "h" ? d.value.scrollLeft = T.value - C : d.value.scrollTop = Q.value - x;
    }
    function Vt(a) {
      if (!f.value)
        return;
      a.preventDefault();
      const E = a.touches[0].pageX - d.value.offsetLeft, y = a.touches[0].pageY - d.value.offsetTop, C = E - v.value, x = y - N.value;
      o.value === "h" ? d.value.scrollLeft = T.value - C : d.value.scrollTop = Q.value - x;
    }
    function Lt() {
      f.value = !1, document.removeEventListener("mousemove", Ae), document.removeEventListener("mouseup", Lt);
    }
    function zt() {
      f.value = !1, document.removeEventListener("touchmove", Vt), document.removeEventListener("touchend", zt);
    }
    async function Kn() {
      o.value === "h" ? o.value = "v" : o.value = "h", await ae(), Ee(), ie();
    }
    const F = I(t.index);
    function Qn(a) {
      F.value = a, ie();
    }
    function Ft(a) {
      if (a == "r") {
        if (F.value >= t.ImgList.length - 1) {
          F.value = t.ImgList.length - 1;
          return;
        }
        F.value += 1, ie();
      } else if (a == "l") {
        if (F.value <= 0) {
          F.value = 0;
          return;
        }
        F.value -= 1, ie();
      }
    }
    function ie() {
      !d.value || !p.value || ae(() => {
        const a = p.value[F.value];
        if (!a)
          return;
        const E = d.value, y = E.getBoundingClientRect(), C = a.getBoundingClientRect();
        if (o.value === "h") {
          const x = y.width, L = C.width, it = a.offsetLeft, lt = E.scrollWidth - x;
          let le = it - (x - L) / 2;
          le = Math.max(0, Math.min(le, lt)), E.scrollLeft = le;
        } else {
          const x = y.height, L = C.height, it = a.offsetTop, lt = E.scrollHeight - x;
          let le = it - (x - L) / 2;
          le = Math.max(0, Math.min(le, lt)), E.scrollTop = le;
        }
      });
    }
    Ue(F, () => {
      ae(() => {
        ie();
      });
    }), Ue(o, () => {
      ae(() => {
        ie();
      });
    });
    const S = I(1);
    function kn(a) {
      if (!l.value || !u.value)
        return;
      a.preventDefault();
      const E = Math.sign(-a.deltaY);
      S.value += 0.1 * E, (S.value <= 0.1 || S.value >= 10) && (S.value = Math.max(Math.min(S.value, 10), 0.1)), u.value.style.scale = S.value;
    }
    function Yt(a) {
      !l.value || !u.value || (a == "in" ? S.value += 0.1 : S.value -= 0.1, (S.value <= 0.1 || S.value >= 10) && (S.value = Math.max(Math.min(S.value, 10), 0.1)), u.value.style.scale = S.value);
    }
    let Xt = 0;
    function Jn() {
      !l.value || !u.value || (Xt += 90, u.value.style.rotate = `${Xt}deg`);
    }
    let Ve = 0, Le = 0;
    function $n(a) {
      if (!l.value || !c.value)
        return;
      let E = a.target, y = a.pageX - E.offsetLeft, C = a.pageY - E.offsetTop;
      f.value = !1, Ve = a.clientX, Le = a.clientY, c.value.addEventListener("mousemove", x);
      function x(L) {
        l.value && (Math.abs(L.clientX - Ve) > 10 || Math.abs(L.clientY - Le) > 10 ? (f.value = !0, E.style.left = L.pageX - y + "px", E.style.top = L.pageY - C + "px") : f.value = !1);
      }
      window.addEventListener("mouseup", (L) => {
        !f.value && t.toolInfo.clickFunc && t.toolInfo.clickFunc(L.target.currentSrc), c.value && c.value.removeEventListener("mousemove", x);
      });
    }
    let R = null;
    const we = I(null), Ht = I(0), qt = I(0), st = I(1);
    function eo(a) {
      we.value = a.target, st.value = a.touches.length, st.value == 1 ? (Ht.value = a.changedTouches[0].clientX - we.value.offsetLeft, qt.value = a.changedTouches[0].clientY - we.value.offsetTop, f.value = !1, Ve = a.changedTouches[0].clientX, Le = a.changedTouches[0].clientX) : R = {
        //多点触屏的第一点
        startX: a.touches[0].pageX,
        startY: a.touches[0].pageY,
        endX: a.touches[0].pageX,
        endY: a.touches[0].pageY,
        //多点触屏的第二点  单点触屏时记录坐标为 -1 
        startX2: a.touches[1] ? a.touches[1].pageX : -1,
        startY2: a.touches[1] ? a.touches[1].pageY : -1,
        endX2: a.touches[1] ? a.touches[1].pageX : -1,
        endY2: a.touches[1] ? a.touches[1].pageY : -1
      };
    }
    function to(a) {
      if (we.value, st.value == 1) {
        let y = a.changedTouches[0].clientX, C = a.changedTouches[0].clientY;
        if (Math.abs(y - Ve) > 10 || Math.abs(C - Le) > 10) {
          f.value = !0;
          const x = y - Ht.value, L = C - qt.value;
          we.value.style.left = x + "px", we.value.style.top = L + "px";
        } else
          f.value = !1;
      } else {
        if (R === null)
          return;
        R.endX = a.touches[0].pageX, R.endY = a.touches[0].pageY, R.endX2 = a.touches[1] ? a.touches[1].pageX : -1, R.endY2 = a.touches[1] ? a.touches[1].pageY : -1;
        var E = function(y, C, x, L) {
          return Math.hypot(x - y, L - C);
        };
        if (R.startX2 != -1 && R.endX2 != -1 && R.startY2 != -1 && R.endY2 != -1) {
          let y = E(R.startX, R.startY, R.startX2, R.startY2), C = E(R.endX, R.endY, R.endX2, R.endY2);
          y < C ? S.value <= 4 && (S.value += 0.03) : y > C && S.value >= 0.6 && (S.value -= 0.03), oo(S.value, a);
        }
      }
    }
    function no(a) {
    }
    function oo(a, E) {
      E.target.style.scale = a;
    }
    return (a, E) => (J(), ce("div", {
      class: q(["container", o.value == "h" ? "active" : ""])
    }, [
      e.toolInfo.layoutChange && t.ImgList.length > 1 && !Dn(n) ? (J(), ce("div", {
        key: 0,
        class: q(["horv", o.value == "h" ? "active" : ""]),
        onClick: Kn
      }, $r, 2)) : sn("", !0),
      X("div", {
        class: q(["img-wraper", o.value == "h" ? "active" : ""]),
        ref_key: "ImgWrapper",
        ref: c
      }, [
        X("img", {
          class: "v-img",
          onWheel: kn,
          onMousedown: ut($n, ["stop"]),
          onTouchstart: eo,
          onTouchmove: to,
          onTouchend: no,
          src: e.ImgList[F.value],
          ref_key: "ImgRef",
          ref: u
        }, null, 40, es),
        kt(X("img", {
          src: Br,
          onClick: E[0] || (E[0] = ut((y) => Ft("l"), ["stop"])),
          class: "img-l"
        }, null, 512), [
          [yt, e.ImgList[0] && F.value != 0]
        ]),
        kt(X("img", {
          src: Zr,
          onClick: E[1] || (E[1] = ut((y) => Ft("r"), ["stop"])),
          class: "img-l"
        }, null, 512), [
          [yt, e.ImgList[0] && F.value != e.ImgList.length - 1]
        ])
      ], 2),
      X("div", {
        class: q(["right", o.value == "h" ? "active" : ""])
      }, [
        X("div", {
          class: q(["toolbar", o.value == "h" ? "active" : ""])
        }, [
          (J(!0), ce(Qe, null, Jt(i.value, (y, C) => (J(), ce("div", {
            class: "tool-wrapper",
            key: C
          }, [
            X("img", {
              src: y.icon,
              alt: "",
              onClick: (x) => y.func(y.type)
            }, null, 8, ts)
          ]))), 128))
        ], 2),
        t.ImgList.length > 1 ? (J(), ce("div", {
          key: 0,
          class: q(["small-list", o.value == "h" ? "active" : ""]),
          ref_key: "scrollContainer",
          ref: d
        }, [
          X("div", {
            class: q(["img-list", o.value == "h" ? "active" : ""]),
            style: et({
              width: o.value == "h" ? 82 * e.ImgList.length + 18 + "px" : "",
              height: o.value == "v" ? 82 * e.ImgList.length + 18 + "px" : ""
            })
          }, [
            (J(!0), ce(Qe, null, Jt(e.ImgList, (y, C) => (J(), ce("img", {
              src: y,
              onClick: (x) => Qn(C),
              class: q({ active: o.value == "h", imgA: C == F.value }),
              key: C,
              ref_for: !0,
              ref_key: "SmallImgRef",
              ref: p
            }, null, 10, ns))), 128))
          ], 6)
        ], 2)) : sn("", !0)
      ], 2)
    ], 2));
  }
});
export {
  rs as ImgViewer
};
