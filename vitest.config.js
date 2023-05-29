import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        framework: 'jest',
        globals: {
            'ts-jest': {
                tsconfig: 'tsconfig.json',
            },
        },
        transform: {
            '^.+\\.[jt]sx?$': 'babel-jest',
        },
    },
});
