import esbuild from 'esbuild';

async function buildAll() {
    return Promise.all([
        build('esm', {
            entryPoints: ['src/main.ts', "src/openapi/index.ts"],
            format: 'esm',
            outdir: './dist/',
            bundle: true,
            sourcemap: true,
            minify: true,
        }),
        build('cjs', {
            entryPoints: ['src/main.ts', "src/openapi/index.ts"],
            format: 'cjs',
            outdir: './dist/cjs',
            bundle: true,
            sourcemap: true,
            minify: true,
        }),
    ]);
}

async function build(name, options) {
    console.log(`Building ${name}`);
    return esbuild.build({
        ...options,
    });
}

buildAll().catch(() => process.exit(1));