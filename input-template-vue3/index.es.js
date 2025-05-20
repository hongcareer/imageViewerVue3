import { ref as R, onMounted as W, onUnmounted as M, watch as j, openBlock as z, createElementBlock as J, withKeys as Q, createApp as Y, h as Z } from "vue";
const ee = (f, x) => {
  const T = f.__vccOpts || f;
  for (const [E, k] of x)
    T[E] = k;
  return T;
}, te = {
  __name: "index",
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
  setup(f, { expose: x, emit: T }) {
    const E = f, k = T, i = R(null), A = R("");
    R([]), R(-1);
    const C = (e) => {
      const a = document.createElement("div");
      a.innerHTML = e;
      const n = (s) => {
        var o, r, p, b, d;
        if (s.nodeType === 3)
          return s.textContent;
        if ((o = s.classList) != null && o.contains("editable-div"))
          return s.textContent || "";
        if ((r = s.classList) != null && r.contains("custom-select")) {
          const u = s.querySelector(".select-option.selected");
          return u ? u.textContent : "";
        }
        if (s.tagName === "SELECT")
          return ((p = s.options[s.selectedIndex]) == null ? void 0 : p.text) || "";
        if (s.tagName === "INPUT") {
          const u = (d = i.value) == null ? void 0 : d.querySelector(`[data-id="${(b = s.closest("[data-id]")) == null ? void 0 : b.dataset.id}"] input`);
          return u ? u.value || "" : s.value || "";
        }
        let l = "";
        for (const u of s.childNodes)
          l += n(u);
        return l;
      };
      return n(a).replace(/\s+/g, " ").trim();
    }, y = (e) => {
      A.value = e;
      const a = C(e);
      console.log("纯文本内容:", a), S.value = a;
    }, X = (e) => {
      e.preventDefault();
      const a = C(A.value);
      console.log("纯文本内容:", a), k("submit", a);
    }, P = (e) => {
      const a = i.value.innerHTML;
      (!a || a.trim() === "" || a === "<br>" || a.replace(/&nbsp;/g, "").trim() === "") && (i.value.innerHTML = ""), i.value.querySelectorAll(".editable-div").forEach((t) => {
        t.textContent.trim() === "" ? t.classList.add("showing-placeholder") : t.classList.remove("showing-placeholder");
      }), y(a);
    }, V = (e) => {
      const a = e.target.closest(".element-placeholder");
      if (a) {
        const n = a.dataset.id;
        U(n);
      }
    }, K = (e) => {
      var a, n, t, s;
      if (!((e.ctrlKey || e.metaKey) && e.key === "z")) {
        if (e.key === "Backspace" || e.key === "Delete") {
          const l = window.getSelection();
          if (!l.rangeCount)
            return;
          const o = l.getRangeAt(0), r = o.startContainer, p = o.startOffset;
          console.log("删除操作:", {
            key: e.key,
            startNodeType: r.nodeType,
            startNodeName: r.nodeName,
            startNodeContent: r.textContent,
            startOffset: p,
            previousSibling: r.previousSibling ? r.previousSibling.nodeName : "none"
          });
          let b = !1, d = null, u = r;
          for (; u && u !== i.value; ) {
            if (u.classList && u.classList.contains("editable-div")) {
              b = !0, d = u;
              break;
            }
            u = u.parentNode;
          }
          if (b) {
            if (e.key === "Backspace" && (d.textContent.length === 1 || o.startOffset === 1 && o.startOffset === o.endOffset) || e.key === "Delete" && (d.textContent.length === 1 || o.startOffset === 0 && o.startOffset === o.endOffset && d.textContent.length === 1)) {
              e.preventDefault(), d.textContent = "", d.classList.add("showing-placeholder");
              const c = document.createRange();
              c.setStart(d, 0), c.collapse(!0), l.removeAllRanges(), l.addRange(c), y(i.value.innerHTML);
              return;
            }
            if (d.textContent.trim() === "" && d.classList.contains("showing-placeholder") && (e.key === "Backspace" || e.key === "Delete")) {
              setTimeout(() => {
                const c = d.closest(".input-wrapper");
                if (c && c.parentNode) {
                  const v = window.getSelection(), m = document.createRange();
                  m.selectNode(c), v.removeAllRanges(), v.addRange(m), document.execCommand("insertText", !1, "");
                  const h = document.createTextNode("​");
                  c.parentNode.insertBefore(h, c.nextSibling), c.remove();
                  const g = document.createRange();
                  g.setStart(h, 0), g.collapse(!0), v.removeAllRanges(), v.addRange(g), document.execCommand("insertText", !1, ""), y(i.value.innerHTML);
                }
              }, 0);
              return;
            }
            return;
          }
          if (e.key === "Backspace" && r.nodeType === Node.TEXT_NODE && p === 0) {
            let w = r.previousSibling;
            for (; w && w.nodeType === Node.TEXT_NODE && w.textContent.trim() === ""; )
              w = w.previousSibling;
            if (w && w.nodeType === Node.ELEMENT_NODE && (w.classList.contains("input-wrapper") || w.classList.contains("select-wrapper"))) {
              const c = w.querySelector(".editable-div");
              if (c && c.textContent.trim() === "" && c.classList.contains("showing-placeholder")) {
                e.preventDefault();
                const m = w, h = window.getSelection(), g = document.createRange();
                g.selectNode(m), h.removeAllRanges(), h.addRange(g), document.execCommand("insertText", !1, "");
                const N = document.createTextNode("​");
                m.parentNode.insertBefore(N, m.nextSibling), m.remove();
                const L = document.createRange();
                L.setStart(N, 0), L.collapse(!0), h.removeAllRanges(), h.addRange(L), document.execCommand("insertText", !1, ""), y(i.value.innerHTML);
                return;
              }
              setTimeout(() => {
                const m = window.getSelection();
                if (!m.rangeCount)
                  return;
                let g = m.getRangeAt(0).startContainer, N = !1, L = null;
                for (; g && g !== i.value; ) {
                  if (g.classList && g.classList.contains("editable-div")) {
                    N = !0, L = g;
                    break;
                  }
                  g = g.parentNode;
                }
                if (N) {
                  const D = L.closest(".input-wrapper");
                  if (D) {
                    document.execCommand("insertText", !1, "");
                    const _ = document.createTextNode("​");
                    D.parentNode.insertBefore(_, D.nextSibling);
                    const O = document.createRange();
                    O.setStart(_, 0), O.collapse(!0), m.removeAllRanges(), m.addRange(O), document.execCommand("insertText", !1, "");
                  }
                }
                y(i.value.innerHTML);
              }, 0);
              return;
            }
          }
          if (e.key === "Delete" && (r.nodeType === Node.TEXT_NODE && p === r.textContent.length || r.nodeType === Node.TEXT_NODE && r.textContent.trim() === "")) {
            let c = r.nextSibling;
            for (; c && c.nodeType === Node.TEXT_NODE && c.textContent.trim() === ""; )
              c = c.nextSibling;
            if (c && c.nodeType === Node.ELEMENT_NODE && c.classList.contains("input-wrapper")) {
              const v = c.querySelector(".editable-div");
              if (v) {
                e.preventDefault(), c.setAttribute("contenteditable", "false"), v.focus();
                const m = window.getSelection(), h = document.createRange();
                v.firstChild && v.firstChild.nodeType === Node.TEXT_NODE ? h.setStart(v.firstChild, 0) : h.setStart(v, 0), h.collapse(!0), m.removeAllRanges(), m.addRange(h), console.log("Del 键处理: 光标已设置到 editable-div", {
                  editableDiv: v,
                  focused: document.activeElement === v
                }), setTimeout(() => {
                  document.activeElement !== v && c.setAttribute("contenteditable", "true");
                }, 300), y(i.value.innerHTML);
                return;
              }
            }
          }
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown") {
          const l = window.getSelection(), o = l.getRangeAt(0), r = ((n = (a = o.startContainer).closest) == null ? void 0 : n.call(a, ".custom-select")) || ((s = (t = o.startContainer.parentElement) == null ? void 0 : t.closest) == null ? void 0 : s.call(t, ".custom-select"));
          if (r) {
            e.preventDefault();
            const b = r.closest(".select-wrapper"), d = document.createRange();
            e.key === "ArrowRight" ? d.setStartAfter(b) : e.key === "ArrowLeft" && d.setStartBefore(b), d.collapse(!0), l.removeAllRanges(), l.addRange(d);
            return;
          }
          const p = document.activeElement;
          if (i.value.contains(p) && p.classList.contains("editable-div")) {
            if (e.key === "ArrowLeft") {
              if (o.startOffset === 0) {
                e.preventDefault();
                const d = p.closest(".input-wrapper").previousElementSibling;
                if (d) {
                  const u = document.createRange();
                  u.setStartAfter(d), u.collapse(!0), l.removeAllRanges(), l.addRange(u);
                }
              }
            } else if (e.key === "ArrowRight" && o.endOffset === p.textContent.length) {
              e.preventDefault();
              const d = p.closest(".input-wrapper").nextElementSibling;
              if (d) {
                const u = document.createRange();
                u.setStartBefore(d), u.collapse(!0), l.removeAllRanges(), l.addRange(u);
              }
            }
          }
        }
      }
    }, U = (e) => {
      const a = E.elements.find((s) => s.id === e);
      if (!a)
        return;
      const n = i.value.querySelector(`[data-id="${e}"]`);
      if (!n)
        return;
      let t;
      a.type === "select" ? (t = document.createElement("select"), a.options.forEach((s) => {
        const l = document.createElement("option");
        l.value = s.value, l.textContent = s.label, t.appendChild(l);
      }), t.value = a.value) : (t = document.createElement("input"), t.type = a.type || "text", t.value = a.value), t.dataset.id = e, n.replaceWith(t), t.focus();
    }, S = R("");
    function $() {
      let e = "";
      E.elements.forEach((a) => {
        const n = F(a);
        e += n + " ";
      }), i.value.innerHTML = e, S.value = C(e);
    }
    W(() => {
      E.showTemplate && $(), i.value.addEventListener("input", (n) => {
        const t = n.target;
        (t.tagName === "SELECT" || t.tagName === "INPUT" || t.classList.contains("editable-div")) && y(i.value.innerHTML);
      }), i.value.querySelectorAll(".editable-div").forEach((n) => {
        n.textContent.trim() === "" ? (n.classList.add("showing-placeholder"), n.innerHTML !== "" && (n.innerHTML = "")) : n.classList.remove("showing-placeholder");
      }), i.value.addEventListener("input", (n) => {
        const t = n.target;
        t.classList && t.classList.contains("editable-div") && (t.textContent.trim() === "" ? t.classList.add("showing-placeholder") : t.classList.remove("showing-placeholder"));
      }), i.value.addEventListener("click", (n) => {
        const t = n.target.closest(".select-trigger");
        if (t) {
          const l = t.closest(".custom-select");
          if (l.classList.toggle("open"), l.classList.contains("open")) {
            const o = l.querySelector(".select-options");
            if (o) {
              const r = t.getBoundingClientRect();
              o.style.top = `${r.bottom}px`, o.style.left = `${r.left}px`, o.style.width = `${Math.max(r.width, 120)}px`;
              const p = o.offsetHeight || 200, b = window.innerHeight;
              r.bottom + p > b && (o.style.top = `${r.top - p}px`);
            }
          }
        }
        const s = n.target.closest(".select-option");
        if (s) {
          const l = s.closest(".custom-select"), o = l.querySelector(".select-trigger");
          s.dataset.value;
          const r = s.textContent;
          l.querySelectorAll(".select-option").forEach((p) => {
            p.classList.remove("selected");
          }), s.classList.add("selected"), o.textContent = r, o.classList.remove("showing-placeholder"), l.classList.remove("open"), y(i.value.innerHTML);
        }
      }), document.addEventListener("click", (n) => {
        n.target.closest(".custom-select") || i.value.querySelectorAll(".custom-select").forEach((t) => {
          t.classList.remove("open");
        });
      }), i.value.addEventListener("click", (n) => {
        const t = n.target.closest(".input-wrapper");
        if (t && !n.target.classList.contains("editable-div")) {
          const s = t.querySelector(".editable-div");
          if (s) {
            n.preventDefault(), s.focus();
            const l = window.getSelection(), o = document.createRange();
            s.lastChild && s.lastChild.nodeType === Node.TEXT_NODE ? o.setStart(s.lastChild, s.lastChild.textContent.length) : o.setStart(s, s.childNodes.length), o.collapse(!0), l.removeAllRanges(), l.addRange(o);
          }
        }
      }), i.value.addEventListener("focusin", (n) => {
        const t = n.target;
        if (t.classList && t.classList.contains("editable-div")) {
          const s = t.closest(".input-wrapper");
          s && (s.setAttribute("contenteditable", "false"), n.stopPropagation());
        }
      }), i.value.addEventListener("focusout", (n) => {
        const t = n.target;
        if (t.classList && t.classList.contains("editable-div")) {
          const s = t.closest(".input-wrapper");
          s && setTimeout(() => {
            document.activeElement !== t && s.setAttribute("contenteditable", "true");
          }, 200);
        }
      }), i.value.addEventListener("keydown", (n) => {
        if (n.key === "Backspace") {
          const t = n.target;
          if (t.classList && t.classList.contains("editable-div")) {
            const s = t.closest(".input-wrapper");
            s && t.textContent.length <= 1 && s.setAttribute("contenteditable", "true");
          }
        }
      });
      const a = (n) => {
        n.target.classList && n.target.classList.contains("editable-div") && n.stopPropagation();
      };
      document.addEventListener("click", a, !0), M(() => {
        document.removeEventListener("click", a, !0);
      }), G();
    }), M(() => {
      window.editorObserver && (window.editorObserver.disconnect(), window.editorObserver = null);
    }), j(() => E.elements, (e) => {
      console.log("newVal", e), E.showTemplate && $();
    });
    const F = (e) => {
      if (e.type === "plaintext")
        return e.value;
      if (e.type === "select") {
        const a = e.value && e.options.some((t) => t.value === e.value), n = a ? e.options.find((t) => t.value === e.value).label : e.placeholder || "请选择";
        return `<span class="select-wrapper" data-id="${e.id}" contenteditable="false">
      <div class="custom-select">
        <div class="select-trigger ${a ? "" : "showing-placeholder"}" 
             data-placeholder="${e.placeholder || "请选择"}">${n}</div>
        <ul class="select-options">
          ${e.options.map(
          (t) => `<li class="select-option${t.value === e.value ? " selected" : ""}" 
                data-value="${t.value}">${t.label}</li>`
        ).join("")}
        </ul>
      </div>
    </span>`;
      } else {
        if (e.type === "date")
          return `<span class="input-wrapper" data-id="${e.id}" contenteditable="false">
      <input type="${e.type || "text"}" value="${e.value}" >
    </span>`;
        if (e.type === "text") {
          const a = !e.value || e.value.trim() === "";
          return `<span class="input-wrapper" data-id="${e.id}" contenteditable="true">
      <div class="editable-div ${a ? "showing-placeholder" : ""}" contenteditable="true" data-placeholder="${e.placeholder || ""}">${e.value || ""}</div>
    </span>`;
        }
      }
    };
    x({
      clearInput: () => {
        i.value.innerHTML = "", A.value = "", S.value = "", y("");
      },
      initialText: S
    });
    const G = () => {
      window.editorObserver || (window.editorObserver = new MutationObserver(() => {
        y(i.value.innerHTML);
      }), window.editorObserver.observe(i.value, {
        childList: !0,
        subtree: !0,
        characterData: !0,
        attributes: !0
      }));
    }, H = document.createElement("style");
    return H.textContent = `
  .editable-div.showing-placeholder:empty::before {
    content: attr(data-placeholder);
    color: rgba(0, 115, 229, 0.45);
    pointer-events: none;
  }
`, document.head.appendChild(H), (e, a) => (z(), J("div", {
      class: "rich-editor",
      ref_key: "editor",
      ref: i,
      contenteditable: "true",
      onInput: P,
      onClick: V,
      onKeydown: [
        K,
        Q(X, ["enter"])
      ],
      "data-placeholder": "即刻开启创作之旅！输入需求，例如：我想要一篇[宣传文案]，主题为[智能手表]，面向[年轻群体]，风格[小红书风格]。涵盖[产品设计]、[健康监测功能]等要点。更多优质模板，点击下方即可挑选"
    }, null, 544));
  }
}, I = /* @__PURE__ */ ee(te, [["__scopeId", "data-v-4606cd6a"]]), q = (f = {}) => {
  const x = document.createElement("div");
  document.body.appendChild(x);
  const T = Y({
    render() {
      return Z(I, {
        ImgList: f.imgList || [],
        index: f.index || 0,
        toolInfo: f.toolInfo || {
          layoutChange: !0,
          layout: "v",
          fullTool: [],
          clickFunc: () => {
          }
        },
        onClose: () => {
          T.unmount(), x.remove();
        }
      });
    }
  });
  return T.mount(x), {
    close: () => {
      T.unmount(), x.remove();
    }
  };
}, ne = [I], B = {
  install(f) {
    ne.forEach((x) => {
      f.component(x.name, x);
    }), f.config.globalProperties.$inputTemplate = q;
  }
};
if (typeof window < "u") {
  const f = window.Vue || window.vue || (window.Vue = {});
  window.InputTemplates = B, f.use && f.use(B), window.$inputTemplate = q;
}
export {
  q as $inputTemplate,
  I as InputTemplate,
  B as default
};
