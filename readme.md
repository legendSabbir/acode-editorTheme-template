# Acode Editor Theme Template

- clone This repo
- npm install
- Go to `./src/main.js` file and change themeName variable .
- Name Must be lowercase
- Name Must be separated by `-` . example `vscode-dark`
- Then go to `./src/style.scss`
- There Change the selector name exactly as themeName variable from `main.js` with a prefix of `.ace-` . example `.ace-vscode-dark`
- Then inside Just Change color according to your theme
- After finish do `npm run build-release`

For more details about each classes go to [Ace kitchen Sink](https://ace.c9.io/build/kitchen-sink.html) `enable show token info` now on hover you can see each token.
