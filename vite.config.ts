import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
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
