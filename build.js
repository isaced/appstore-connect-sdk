import esbuild from 'esbuild';

async function buildAll() {
    // zod and jose are declared runtime dependencies; keep them external so
    // consumers get a single npm-resolved instance per package.
    const externals = ['zod', 'jose'];
    return Promise.all([
        build('esm', {
            entryPoints: ['src/main.ts', "src/openapi/index.ts", 'src/client.ts', 'src/sdk.ts', 'src/schemas.ts', 'src/zod.ts'],
            format: 'esm',
            outdir: './dist/',
            bundle: true,
            external: externals,
            sourcemap: true,
            platform: 'node'
        }),
        build('cjs', {
            entryPoints: ['src/main.ts', "src/openapi/index.ts", 'src/client.ts', 'src/sdk.ts', 'src/schemas.ts', 'src/zod.ts'],
            format: 'cjs',
            outdir: './dist/cjs',
            bundle: true,
            external: externals,
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
