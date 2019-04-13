# nat-upnp-wrapper
This is a wrapper for the nat-upnp module.

## Script Usage

**Map port**
```js
const mapper = require('nat-upnp-wrapper');
mapper.map(options).then(response => console.log(response.success));
```
Options:

```js
{
    "port": 80, // or [public,private]
    "ports": [80,443,[8081,8082]], // takes priority
    "protocol": "UDP" // defaults to "TCP"
}
```


**Unmap port**
```js
mapper.unmap(options).then(response => ...);
```

Options

```js
{
    "port": 80,
    "ports": [80,443,8081],
    "protocol": "UDP"
}
```


**Get Mappings**
```js
mapper.mappings(true).then(response => console.log(response.results));
```
Set to `true` for local results. Defaults to `false`.


**Get Public IP Address**
```js
mapper.ip().then(ip => console.log(ip));
```