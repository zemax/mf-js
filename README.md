# mf JS Modules

My personnal daily used stuffs for JS. Feel free to use it.

# Install

```bash
npm install mf-js
```

# Use

Use ES6 import (prefered, use Babel if needed)

```
import ready from 'mf-js/modules/dom/ready';
```

or CommonJS Syntax
```
const ready = require('mf-js/modules/dom/ready');
```

I also advise you to get some ```core-js``` and ```whatwg-fetch``` polyfills, and starts some happy modern coding !
```
require( 'core-js/fn/object/assign' );
require( 'core-js/fn/object/values' );
require( 'core-js/fn/array/from' );
require( 'core-js/fn/array/for-each' );
require( 'core-js/fn/promise' );
```

# Changelog

## 2016/11/18
- **v2 ! Breaking changes !**
- ES6 + CommonJS syntax : use Babel (seriously, use it)
- Drop support of deprecated polyfills 
- Completed tests

## 2016/03/31
- added Easing functions
- added LatLng distance function
