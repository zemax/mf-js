# mf JS modules

My personnal daily used stuffs for JS. Feel free to use it.

# Install

```bash
npm install @zemax/mf-js
```

# Use

Use ES6 import

```
import domready from 'mf-js/modules/dom/ready';
```

I also advise you to get some ```core-js``` and ```whatwg-fetch``` polyfills, and starts some happy modern coding !
```
import 'core-js/features/object/assign';
import 'core-js/features/object/values';
import 'core-js/features/array/from';
import 'core-js/features/array/for-each';
import 'core-js/features/symbol/iterator';
import 'core-js/features/promise';
```

# Changelog

## 2016/11/21
- added CSS state for RWD
- added Fullscreen helper
- some unit tests improvments

## 2016/11/18
- **v2 ! Breaking changes !**
- ES6 + CommonJS syntax : use Babel (seriously, use it)
- Drop support of deprecated polyfills 
- Completed tests

## 2016/03/31
- added Easing functions
- added LatLng distance function
