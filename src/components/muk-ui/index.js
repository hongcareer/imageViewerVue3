import { createApp, h } from "vue";
import ImgViewer from "./ImgViewer/index.vue";

// 创建函数式调用方法
const $imgViewer = (options = {}) => {
	// 创建一个DOM容器
	const container = document.createElement('div');
	document.body.appendChild(container);
	
	// 创建ImgViewer实例
	const app = createApp({
		render() {
			return h(ImgViewer, {
				ImgList: options.imgList || [],
				index: options.index || 0,
				toolInfo: options.toolInfo || {
					layoutChange: true,
					layout: 'v',
					fullTool: [],
					clickFunc: () => {}
				},
				onClose: () => {
					// 关闭时销毁实例
					app.unmount();
					container.remove();
				}
			});
		}
	});
	
	// 挂载实例
	app.mount(container);
	
	// 返回一个对象，包含关闭方法
	return {
		close: () => {
			app.unmount();
			container.remove();
		}
	};
};

// 按需引入
export { ImgViewer };

const component = [ImgViewer];

const ImageViewer = {
	install(App) {
		component.forEach((item) => {
			App.component(item.name, item);
		});
		// 添加到全局属性中，可以通过 this.$imgViewer 调用
		App.config.globalProperties.$imgViewer = $imgViewer;
	},
};

// 导出函数式调用方法
export { $imgViewer };

export default ImageViewer;

// 添加对 CDN 使用的支持
if (typeof window !== 'undefined') {
	// 检查 Vue 的不同可能暴露方式
	const GlobalVue = window.Vue || window.vue || (window.Vue = {});
	
	window.ImageViewer = ImageViewer;
	
	// 如果 Vue 已经加载并有 use 方法
	if (GlobalVue.use) {
		GlobalVue.use(ImageViewer);
	}
	
	// 无论如何都暴露函数式调用
	window.$imgViewer = $imgViewer;
}

