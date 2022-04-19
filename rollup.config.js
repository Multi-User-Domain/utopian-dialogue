import typescript from "@rollup/plugin-typescript";
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';

export default {
  input: "./index.tsx",
  plugins: [
    css({ output: 'styles.css', }),
    nodeResolve({ 
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        module: true,
        preferBuiltins: false,
        browser: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    babel({ presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      //["@babel/preset-react", {"runtime": "automatic"}],
      "@babel/preset-react",
      "@babel/preset-typescript",
      ],
      plugins: ["@babel/plugin-syntax-dynamic-import"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      exclude: /node_modules/
    }),
    commonjs({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        include: /node_modules/
    }),
    typescript({ tsconfig: "./tsconfig.json" })
  ],
  external: [],
  paths: {
    "react": "https://unpkg.com/react@17/umd/react.development.js",
    "react-dom": "https://unpkg.com/react-dom@17/umd/react-dom.development.js"
  },
  output: {
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes'
    },
    file: "dist/index.js",
    //dir: 'dist',
    format: "iife",
    //sourcemap: true,
  }
};
