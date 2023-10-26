import typescript from 'rollup-plugin-typescript2'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import cleaner from 'rollup-plugin-cleaner'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import packageJson from './package.json' assert { type: 'json' }


export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'es',
            sourcemap: true,
        }
    ],
    plugins: [
        cleaner({
            targets: ['./dist'],
        }),
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            exclude: [
                '**/*.test.tsx',
            ],
        }),
    ],
}
