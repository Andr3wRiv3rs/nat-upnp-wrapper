const natUpnp = require('nat-upnp')
const client = natUpnp.createClient()

const map = (public,private) => new Promise(res => {
    private = private || public;
    client.portMapping({
        public, 
        private, 
        ttl: 1
    }, err => err ? res({success:false,err}) : res({success:true}))
})

const unmap = public => new Promise(res => client.portUnmapping({public}, err => err ? res({success:false,err}) : res({success:true})));
const ip = () => new Promise(res => client.externalIp((err, ip) => err ? res({success:false,err}) : res({success:true,ip})))

exports.map = map;
exports.unmap = unmap;
exports.ip = ip;