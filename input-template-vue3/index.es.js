import { ref as E, onMounted as V, onUnmounted as $, watch as j, openBlock as W, createElementBlock as z, withKeys as F, nextTick as G } from "vue";
const J = (L, S) => {
  const R = L.__vccOpts || L;
  for (const [x, k] of S)
    R[x] = k;
  return R;
}, Q = {
  name: "ActiveInputTemplate"
}, Y = /* @__PURE__ */ Object.assign(Q, {
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
  setup(L, { expose: S, emit: R }) {
    const x = L, k = R, o = E(null), A = E("");
    E([]), E(-1);
    const D = (e) => {
      const a = document.createElement("div");
      a.innerHTML = e;
      const n = (s) => {
        var r, l, p, h, d;
        if (s.nodeType === 3)
          return s.textContent;
        if ((r = s.classList) != null && r.contains("editable-div"))
          return s.textContent || "";
        if ((l = s.classList) != null && l.contains("custom-select")) {
          const u = s.querySelector(".select-option.selected");
          return u ? u.textContent : "";
        }
        if (s.tagName === "SELECT")
          return ((p = s.options[s.selectedIndex]) == null ? void 0 : p.text) || "";
        if (s.tagName === "INPUT") {
          const u = (d = o.value) == null ? void 0 : d.querySelector(`[data-id="${(h = s.closest("[data-id]")) == null ? void 0 : h.dataset.id}"] input`);
          return u ? u.value || "" : s.value || "";
        }
        let i = "";
        for (const u of s.childNodes)
          i += n(u);
        return i;
      };
      return n(a).replace(/\s+/g, " ").trim();
    }, b = (e) => {
      A.value = e;
      const a = D(e);
      console.log("纯文本内容:", a), N.value = a;
    }, B = (e) => {
      e.preventDefault();
      const a = D(A.value);
      console.log("纯文本内容:", a), k("submit", a);
    }, I = (e) => {
      const a = o.value.innerHTML;
      (!a || a.trim() === "" || a === "<br>" || a.replace(/&nbsp;/g, "").trim() === "") && (o.value.innerHTML = ""), o.value.querySelectorAll(".editable-div").forEach((t) => {
        t.textContent.trim() === "" ? t.classList.add("showing-placeholder") : t.classList.remove("showing-placeholder");
      }), b(a);
    }, q = (e) => {
      const a = e.target.closest(".element-placeholder");
      if (a) {
        const n = a.dataset.id;
        K(n);
      }
    }, X = (e) => {
      var a, n, t, s;
      if (!((e.ctrlKey || e.metaKey) && e.key === "z")) {
        if (e.key === "Backspace" || e.key === "Delete") {
          const i = window.getSelection();
          if (!i.rangeCount)
            return;
          const r = i.getRangeAt(0), l = r.startContainer, p = r.startOffset;
          console.log("删除操作:", {
            key: e.key,
            startNodeType: l.nodeType,
            startNodeName: l.nodeName,
            startNodeContent: l.textContent,
            startOffset: p,
            previousSibling: l.previousSibling ? l.previousSibling.nodeName : "none"
          });
          let h = !1, d = null, u = l;
          for (; u && u !== o.value; ) {
            if (u.classList && u.classList.contains("editable-div")) {
              h = !0, d = u;
              break;
            }
            u = u.parentNode;
          }
          if (h) {
            if (e.key === "Backspace" && (d.textContent.length === 1 || r.startOffset === 1 && r.startOffset === r.endOffset && l.textContent.length === 1) || e.key === "Delete" && (d.textContent.length === 1 || r.startOffset === 0 && r.startOffset === r.endOffset && d.textContent.length === 1)) {
              e.preventDefault(), d.textContent = "", d.classList.add("showing-placeholder");
              const c = document.createRange();
              c.setStart(d, 0), c.collapse(!0), i.removeAllRanges(), i.addRange(c), b(o.value.innerHTML);
              return;
            }
            if (e.key === "Backspace" && l.nodeType === Node.TEXT_NODE && p > 0 && p <= l.textContent.length) {
              e.preventDefault();
              const c = l.textContent, f = c.substring(0, p - 1) + c.substring(p);
              l.textContent = f;
              const v = document.createRange();
              v.setStart(l, p - 1), v.collapse(!0), i.removeAllRanges(), i.addRange(v), d.focus(), b(o.value.innerHTML);
              return;
            }
            if (d.textContent.trim() === "" && d.classList.contains("showing-placeholder") && (e.key === "Backspace" || e.key === "Delete")) {
              setTimeout(() => {
                const c = d.closest(".input-wrapper");
                if (c && c.parentNode) {
                  const f = window.getSelection(), v = document.createRange();
                  v.selectNode(c), f.removeAllRanges(), f.addRange(v), document.execCommand("insertText", !1, "");
                  const w = document.createTextNode("​");
                  c.parentNode.insertBefore(w, c.nextSibling), c.remove();
                  const g = document.createRange();
                  g.setStart(w, 0), g.collapse(!0), f.removeAllRanges(), f.addRange(g), document.execCommand("insertText", !1, ""), b(o.value.innerHTML);
                }
              }, 0);
              return;
            }
            return;
          }
          if (e.key === "Backspace" && l.nodeType === Node.TEXT_NODE && p === 0) {
            let m = l.previousSibling;
            for (; m && m.nodeType === Node.TEXT_NODE && m.textContent.trim() === ""; )
              m = m.previousSibling;
            if (m && m.nodeType === Node.ELEMENT_NODE && (m.classList.contains("input-wrapper") || m.classList.contains("select-wrapper"))) {
              const c = m.querySelector(".editable-div");
              if (c && c.textContent.trim() === "" && c.classList.contains("showing-placeholder")) {
                e.preventDefault();
                const v = m, w = window.getSelection(), g = document.createRange();
                g.selectNode(v), w.removeAllRanges(), w.addRange(g), document.execCommand("insertText", !1, "");
                const y = document.createTextNode("​");
                v.parentNode.insertBefore(y, v.nextSibling), v.remove();
                const T = document.createRange();
                T.setStart(y, 0), T.collapse(!0), w.removeAllRanges(), w.addRange(T), document.execCommand("insertText", !1, ""), b(o.value.innerHTML);
                return;
              }
              setTimeout(() => {
                const v = window.getSelection();
                if (!v.rangeCount)
                  return;
                let g = v.getRangeAt(0).startContainer, y = !1, T = null;
                for (; g && g !== o.value; ) {
                  if (g.classList && g.classList.contains("editable-div")) {
                    y = !0, T = g;
                    break;
                  }
                  g = g.parentNode;
                }
                if (y) {
                  const C = T.closest(".input-wrapper");
                  if (C) {
                    document.execCommand("insertText", !1, "");
                    const M = document.createTextNode("​");
                    C.parentNode.insertBefore(M, C.nextSibling);
                    const _ = document.createRange();
                    _.setStart(M, 0), _.collapse(!0), v.removeAllRanges(), v.addRange(_), document.execCommand("insertText", !1, "");
                  }
                }
                b(o.value.innerHTML);
              }, 0);
              return;
            }
          }
          if (e.key === "Delete" && (l.nodeType === Node.TEXT_NODE && p === l.textContent.length || l.nodeType === Node.TEXT_NODE && l.textContent.trim() === "")) {
            let c = l.nextSibling;
            for (; c && c.nodeType === Node.TEXT_NODE && c.textContent.trim() === ""; )
              c = c.nextSibling;
            if (c && c.nodeType === Node.ELEMENT_NODE && c.classList.contains("input-wrapper")) {
              const f = c.querySelector(".editable-div");
              if (f) {
                e.preventDefault(), c.setAttribute("contenteditable", "false"), f.focus();
                const v = window.getSelection(), w = document.createRange();
                f.firstChild && f.firstChild.nodeType === Node.TEXT_NODE ? w.setStart(f.firstChild, 0) : w.setStart(f, 0), w.collapse(!0), v.removeAllRanges(), v.addRange(w), console.log("Del 键处理: 光标已设置到 editable-div", {
                  editableDiv: f,
                  focused: document.activeElement === f
                }), setTimeout(() => {
                  document.activeElement !== f && c.setAttribute("contenteditable", "true");
                }, 300), b(o.value.innerHTML);
                return;
              }
            }
          }
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown") {
          const i = window.getSelection(), r = i.getRangeAt(0), l = ((n = (a = r.startContainer).closest) == null ? void 0 : n.call(a, ".custom-select")) || ((s = (t = r.startContainer.parentElement) == null ? void 0 : t.closest) == null ? void 0 : s.call(t, ".custom-select"));
          if (l) {
            e.preventDefault();
            const h = l.closest(".select-wrapper"), d = document.createRange();
            e.key === "ArrowRight" ? d.setStartAfter(h) : e.key === "ArrowLeft" && d.setStartBefore(h), d.collapse(!0), i.removeAllRanges(), i.addRange(d);
            return;
          }
          const p = document.activeElement;
          if (o.value.contains(p) && p.classList.contains("editable-div")) {
            if (e.key === "ArrowLeft") {
              if (r.startOffset === 0) {
                e.preventDefault();
                const d = p.closest(".input-wrapper").previousElementSibling;
                if (d) {
                  const u = document.createRange();
                  u.setStartAfter(d), u.collapse(!0), i.removeAllRanges(), i.addRange(u);
                }
              }
            } else if (e.key === "ArrowRight" && r.endOffset === p.textContent.length) {
              e.preventDefault();
              const d = p.closest(".input-wrapper").nextElementSibling;
              if (d) {
                const u = document.createRange();
                u.setStartBefore(d), u.collapse(!0), i.removeAllRanges(), i.addRange(u);
              }
            }
          }
        }
      }
    }, K = (e) => {
      const a = x.elements.find((s) => s.id === e);
      if (!a)
        return;
      const n = o.value.querySelector(`[data-id="${e}"]`);
      if (!n)
        return;
      let t;
      a.type === "select" ? (t = document.createElement("select"), a.options.forEach((s) => {
        const i = document.createElement("option");
        i.value = s.value, i.textContent = s.label, t.appendChild(i);
      }), t.value = a.value) : (t = document.createElement("input"), t.type = a.type || "text", t.value = a.value), t.dataset.id = e, n.replaceWith(t), t.focus();
    }, N = E("");
    function O() {
      if (!o.value) {
        console.warn("Editor element not found");
        return;
      }
      let e = "";
      x.elements.forEach((a) => {
        const n = P(a);
        e += n + " ";
      }), G(() => {
        o.value && (o.value.innerHTML = e, N.value = D(e));
      });
    }
    V(() => {
      if (!o.value) {
        console.warn("Editor element not found");
        return;
      }
      x.showTemplate && O(), o.value.addEventListener("input", (n) => {
        const t = n.target;
        (t.tagName === "SELECT" || t.tagName === "INPUT" || t.classList.contains("editable-div")) && b(o.value.innerHTML);
      }), o.value.querySelectorAll(".editable-div").forEach((n) => {
        n.textContent.trim() === "" ? (n.classList.add("showing-placeholder"), n.innerHTML !== "" && (n.innerHTML = "")) : n.classList.remove("showing-placeholder");
      }), o.value.addEventListener("input", (n) => {
        const t = n.target;
        t.classList && t.classList.contains("editable-div") && (t.textContent.trim() === "" ? t.classList.add("showing-placeholder") : t.classList.remove("showing-placeholder"));
      }), o.value.addEventListener("click", (n) => {
        const t = n.target.closest(".select-trigger");
        if (t) {
          const i = t.closest(".custom-select");
          if (i.classList.toggle("open"), i.classList.contains("open")) {
            const r = i.querySelector(".select-options");
            if (r) {
              const l = t.getBoundingClientRect();
              r.style.top = `${l.bottom}px`, r.style.left = `${l.left}px`, r.style.width = `${Math.max(l.width, 120)}px`;
              const p = r.offsetHeight || 200, h = window.innerHeight;
              l.bottom + p > h && (r.style.top = `${l.top - p}px`);
            }
          }
        }
        const s = n.target.closest(".select-option");
        if (s) {
          const i = s.closest(".custom-select"), r = i.querySelector(".select-trigger");
          s.dataset.value;
          const l = s.textContent;
          i.querySelectorAll(".select-option").forEach((p) => {
            p.classList.remove("selected");
          }), s.classList.add("selected"), r.textContent = l, r.classList.remove("showing-placeholder"), i.classList.remove("open"), b(o.value.innerHTML);
        }
      }), document.addEventListener("click", (n) => {
        n.target.closest(".custom-select") || o.value.querySelectorAll(".custom-select").forEach((t) => {
          t.classList.remove("open");
        });
      }), o.value.addEventListener("click", (n) => {
        const t = n.target.closest(".input-wrapper");
        if (t && !n.target.classList.contains("editable-div")) {
          const s = t.querySelector(".editable-div");
          if (s) {
            n.preventDefault(), s.focus();
            const i = window.getSelection(), r = document.createRange();
            s.lastChild && s.lastChild.nodeType === Node.TEXT_NODE ? r.setStart(s.lastChild, s.lastChild.textContent.length) : r.setStart(s, s.childNodes.length), r.collapse(!0), i.removeAllRanges(), i.addRange(r);
          }
        }
      }), o.value.addEventListener("focusin", (n) => {
        const t = n.target;
        if (t.classList && t.classList.contains("editable-div")) {
          const s = t.closest(".input-wrapper");
          s && (s.setAttribute("contenteditable", "false"), n.stopPropagation());
        }
      }), o.value.addEventListener("focusout", (n) => {
        const t = n.target;
        if (t.classList && t.classList.contains("editable-div")) {
          const s = t.closest(".input-wrapper");
          s && setTimeout(() => {
            document.activeElement !== t && s.setAttribute("contenteditable", "true");
          }, 200);
        }
      }), o.value.addEventListener("keydown", (n) => {
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
      document.addEventListener("click", a, !0), $(() => {
        document.removeEventListener("click", a, !0);
      }), U();
    }), $(() => {
      window.editorObserver && (window.editorObserver.disconnect(), window.editorObserver = null);
    }), j(() => x.elements, (e) => {
      console.log("newVal", e), x.showTemplate && O();
    });
    const P = (e) => {
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
    S({
      clearInput: () => {
        o.value.innerHTML = "", A.value = "", N.value = "", b("");
      },
      initialText: N
    });
    const U = () => {
      window.editorObserver || (window.editorObserver = new MutationObserver(() => {
        b(o.value.innerHTML);
      }), window.editorObserver.observe(o.value, {
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
`, document.head.appendChild(H), (e, a) => (W(), z("div", {
      class: "rich-editor",
      ref_key: "editor",
      ref: o,
      contenteditable: "true",
      onInput: I,
      onClick: q,
      onKeydown: [
        X,
        F(B, ["enter"])
      ],
      "data-placeholder": "即刻开启创作之旅！输入需求，例如：我想要一篇[宣传文案]，主题为[智能手表]，面向[年轻群体]，风格[小红书风格]。涵盖[产品设计]、[健康监测功能]等要点。更多优质模板，点击下方即可挑选"
    }, null, 544));
  }
}), te = /* @__PURE__ */ J(Y, [["__scopeId", "data-v-7deb0070"]]);
export {
  te as ActiveInputTemplate
};
