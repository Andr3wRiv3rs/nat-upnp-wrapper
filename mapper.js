const natUpnp = require('nat-upnp')
const client = natUpnp.createClient()

const map = (public,private) => new Promise(res => {
    if (Array.isArray(public)) {
        for (let i in public) if (!Array.isArray(public[i])) public[i] = [public[i],public[i]];

        let i = 0;
        const loop = (p,pr) => {
            client.portMapping({ p, pr, ttl: 1 }, err => {
                console.log(p,pr)
                if (err) res({success:false,err})

                else if (i<ports.length-1) {
                    i++;
                    loop((ports[i][0],ports[i][1]));
                } 

                else res({success:true})
            });
        };

        loop((ports[i][0],ports[i][1]));
    } else {
        private = private || public;
        client.portMapping({ public, private, ttl: 1 }, err => err ? res({success:false,err}) : res({success:true}));
    }
});

const unmap = public => new Promise(res => {
    const um = p => client.portUnmapping({p}, err => err ? res({success:false,err}) : res({success:true}))
    if (Array.isArray(public)) for (let port of public) um(port)
    else um(public)
});

const ip = () => new Promise(res => client.externalIp((err, ip) => err ? res({success:false,err}) : res({success:true,ip})))

exports.map = map;
exports.unmap = unmap;
exports.ip = ip;