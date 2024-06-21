import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		setupFiles: ['/.test/setup.ts'],
		environment: 'jsdom',
		deps: {
			optimizer: {
				web: {
					include: ['vitest-canvas-mock']
				}
			}
		},
		poolOptions: {
			threads: {
				singleThread: true
			}
		},
		environmentOptions: {
			jsdom: {
				resources: 'usable'
			}
		}
	}
});
