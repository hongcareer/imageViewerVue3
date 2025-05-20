import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import fs from 'fs';
import { fileURLToPath } from 'url';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), {
		name: 'copy-files',
		closeBundle() {
			// 构建完成后复制 README 和 package.json 文件到输出目录
			const files = ['README.md', 'package.json'];
			
			files.forEach(file => {
				const sourcePath = path.resolve(__dirname, file);
				const outputPath = path.resolve(__dirname, `input-template-vue3/${file}`);
				
				if (fs.existsSync(sourcePath)) {
					fs.copyFileSync(sourcePath, outputPath);
					console.log(`${file} has been copied to the output directory.`);
				} else {
					console.warn(`${file} not found in the root directory.`);
				}
			});
		}
	}],
	build: {
		outDir: "input-template-vue3", //输出文件名称，与 README 中的包名保持一致
		lib: {
			entry: path.resolve(__dirname, "./src/components/muk-ui/index.js"), //指定组件编译入口文件
			name: "input-template-vue3", // 修改库名称与 README 一致
			fileName: (format) => `index.${format}.js`, // 生成不同格式的文件
			formats: ["umd", "es", "cjs"],
		}, //库编译模式配置
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ["vue"], // 将 Vue 设为外部依赖，避免重复打包
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: "Vue",
				},
			},
		},
	},
	define: {
		// 为生产环境定义 process.env
		'process.env': {},
	},
	server: {
		host: 'localhost',
		port: 3001, // 你可以根据需要修改端口号
		open: true, // 自动打开浏览器，可选
	}
});
