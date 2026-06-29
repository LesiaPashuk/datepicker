export default function (api) {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: '16' }, modules: false }],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [],
  };
}
