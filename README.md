#nat-upnp-wrapper
This is a wrapper for the nat-upnp module.

##Script Usage

Map port:
```js
const mapper = require('nat-upnp-wrapper');
mapper.map(80).then(response => console.log(response.success));
```

With private port:
```js
mapper.map(80, 80).then(response => ...);
```

Unmap port:
```js
mapper.unmap(80).then(response => ...);
```

Get Public IP Address:
```js
mapper.ip().then(ip => console.log(ip));
```