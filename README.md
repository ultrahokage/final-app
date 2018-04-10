1. install:

* VS code
* nodejs + npm
* git scm

2. create project folder
3. git init
4. npm init
5. npm install --save-dev eslint
6. https://github.com/airbnb/javascript - style guide
7. https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base - rules installation instaructions
8. paste in package.json section

```json
   "eslintConfig": {
   "extends": "airbnb-base"
   },
```

9. install eslint extension(plugin) for VS code
10. install editor config extension(plugin) for VS code
11. https://github.com/airbnb/javascript/blob/master/.editorconfig paste it in project root directory
12. install prettier - https://prettier.io/docs/en/install.html
13. add prettier config to package.json

```json
    "prettier": {
    "printWidth": 100,
    "singleQuote": true,
    "trailingComma": "all"
    },
```

14. install Prettier - Code Formater (VS code plugin)
