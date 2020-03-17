# eslint-plugin-lodash-to-native

Search and replace lodash _.map, on native Array.map if this possible

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-lodash-to-native`:

```
$ npm install -S https://github.com/namtyda/eslint-plugin-lodash-to-native.git

```

## Usage

Add `lodash-to-native` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
    "plugins": [
        "lodash-to-native"
    ]

```


Then configure the rules you want to use under the rules section.

```json
     "rules": {
      "lodash-to-native/map": "warn"
  },
```

## Supported Rules

* Fill in provided rules here





