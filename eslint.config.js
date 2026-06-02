import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    // Beritahu ESLint untuk memeriksa semua file .js dan .jsx
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // Mengaktifkan fitur JSX agar ESLint paham tag HTML < di dalam React
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      // Menggabungkan environment Browser dan Node agar paham 'localStorage', 'console', 'process', dll.
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off', // Di React modern tidak wajib import React dari 'react'
      'react/prop-types': 'off', // Mematikan validasi prop-types agar mempermudah tim koding
      'no-unused-vars': 'warn', // Variabel yang tidak terpakai hanya berstatus peringatan kuning
    },
    settings: {
      react: {
        version: 'detect', // Otomatis mendeteksi versi React yang dipakai frontend
      },
    },
  },
  configPrettier,
];
