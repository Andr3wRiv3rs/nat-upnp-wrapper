#nat-upnp-wrapper
This is a wrapper for the nat-upnp module.

##Script Usage

**Map port:**
```js
const mapper = require('nat-upnp-wrapper');
mapper.map(80).then(response => console.log(response.success));
```
Format: `public OR public, private OR [public, [public,private], ..]`

**Unmap port:**
```js
mapper.unmap(80).then(response => ...);
```
Format: `public OR [public, ..]`

**Get Public IP Address:**
```js
mapper.ip().then(ip => console.log(ip));
```