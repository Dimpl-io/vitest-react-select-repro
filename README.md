# vitest-react-select-repro
Project to reproduce a dependency resolution issue with vitest.
This is a monorepo setup with a library ('lib') and a final project ('main').
When running vitest in the main project, 'react' dependency is not resolved, contrary to vite.

## Steps
1. In 'lib' directory, run `yarn install`.
2. In 'main' project, run `yarn install`.
3. In 'main' project, run `yarn run test` : notice that : we get an error saying that "Cannot find module 'react'".
4. You may run `yarn run start` to run vite, and notice that the same component as the one in the test ('ReactSelectWrapperConsumer') works fine.

## Description of the problem
The 'main' project, and the sample test, rely on a 'ReactSelectWrapperConsumer' component in 'main' project which depends on a 'ReactSelectWrapper' component defined in 'lib' project, which depends on [react-select](https://www.npmjs.com/package/react-select) component installed as a dependency in 'lib', which depends on [this package](https://www.npmjs.com/package/use-isomorphic-layout-effect), which relies on the 'react' package, provided in the dependencies the main project.

Thus we have :

(main / ReactSelectWrapperConsumerTest) -> (main / ReactSelectWrapperConsumer) -> (lib / ReactSelectWrapper) -> (lib/node_modules/react-select) -> (lib/node_modules/react-select) -> (lib/node_modules/use-isomorphic-layout-effect) -> (main/node_modules/react)

It looks like vitest does not find the 'react' dependency from main node_modules from the 'use-isomorphic-layout-effect' within the lib node_modules.

Please note that :
- Adding the (commented) alias : 'react': path.resolve(__dirname, './node_modules/react') in the main/vite.config.ts file (to 'enforce' the expected behavior) does not fix the issue;
- We can fix the issue by installing 'use-isomorphic-layout-effect' in the 'main' project (`yarn add use-isomorphic-layout-effect`), and adding the (commented) alias : 'use-isomorphic-layout-effect': path.resolve(__dirname, './node_modules/use-isomorphic-layout-effect') in the main/vite.config.ts file. But this implies: 
  - adding extra dependencies in all final projects for all the packages that have the issue
  - running the tests with different packages than what's being executed in the browser
  - customizing vite.config, whereas the aim of the vitest is to reuse that file.
