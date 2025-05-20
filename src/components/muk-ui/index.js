import { createApp, h } from "vue";
import ActiveInputTemplate from "./ActiveInputTemplate/index.vue";

// // 创建函数式调用方法
// const $inputTemplate = (options = {}) => {
// 	// 创建一个DOM容器
// 	const container = document.createElement('div');
// 	document.body.appendChild(container);
	
// 	let componentInstance = null;
	
// 	// 创建ImgViewer实例
// 	const app = createApp({
// 		render() {
// 			return h(InputTemplate, {
// 				elements: options.elements || [],
// 				showTemplate: options.showTemplate || false,
// 				submit: options.submit,
// 				ref: (el) => {
// 					componentInstance = el;
// 					if (options.ref && typeof options.ref === 'function') {
// 						options.ref(el);
// 					}
// 				},
// 				onClose: () => {
// 					// 关闭时销毁实例
// 					app.unmount();
// 					container.remove();
// 				}
// 			});
// 		}
// 	});
	
// 	// 挂载实例
// 	app.mount(container);
	
// 	// 返回一个对象，包含关闭方法和组件实例
// 	return {
// 		close: () => {
// 			app.unmount();
// 			container.remove();
// 		},
// 		instance: componentInstance
// 	};
// };

// 按需引入
export { ActiveInputTemplate };

// const component = [InputTemplate];

// const InputTemplates = {
// 	install(App) {
// 		component.forEach((item) => {
// 			App.component(item.name, item);
// 		});
// 		// 添加到全局属性中，可以通过 this.$imgViewer 调用
// 		App.config.globalProperties.$inputTemplate = $inputTemplate;
// 	},
// };

// // 导出函数式调用方法
// export { $inputTemplate };

// export default InputTemplates;

// // 添加对 CDN 使用的支持
// if (typeof window !== 'undefined') {
// 	// 检查 Vue 的不同可能暴露方式
// 	const GlobalVue = window.Vue || window.vue || (window.Vue = {});
	
// 	window.InputTemplates = InputTemplates;
	
// 	// 如果 Vue 已经加载并有 use 方法
// 	if (GlobalVue.use) {
// 		GlobalVue.use(InputTemplates);
// 	}
	
// 	// 无论如何都暴露函数式调用
// 	window.$inputTemplate = $inputTemplate;
// }

