import esbuild from 'esbuild';

async function buildAll() {
    return Promise.all([
        build('esm', {
            entryPoints: ['src/main.ts', "src/openapi/index.ts", 'src/client.ts', 'src/sdk.ts', 'src/schemas.ts', 'src/zod.ts'],
            format: 'esm',
            outdir: './dist/',
            bundle: true,
            sourcemap: true,
            platform: 'node'
        }),
        build('cjs', {
            entryPoints: ['src/main.ts', "src/openapi/index.ts", 'src/client.ts', 'src/sdk.ts', 'src/schemas.ts', 'src/zod.ts'],
            format: 'cjs',
            outdir: './dist/cjs',
            bundle: true,
            sourcemap: true,
            platform: 'node'
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
