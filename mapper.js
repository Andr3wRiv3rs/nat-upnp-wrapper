const natUpnp = require('nat-upnp')
const client = natUpnp.createClient()

const map = (options = {port: 80}) => new Promise(res => {
    port = options.port || null;
    ports = options.ports || null;
    description = options.description || 'Port Mapper';

    if (port && !Array.isArray(port)) port = [port,port]

    protocol = options.protocol || 'TCP';
    if (Array.isArray(ports)) {
        for (let i in ports) if (!Array.isArray(ports[i])) ports[i] = [ports[i],ports[i]];

        let i = 0;
        const loop = (public,private) => {
            client.portMapping({ public, private, description, protocol }, err => {
                if (err) res({success:false,err})

                else if (i<ports.length-1) {
                    i++;
                    loop(ports[i][0],ports[i][1]);
                } 

                else res({success:true})
            });
        };

        if (ports.length>0) loop(ports[0][0],ports[0][1]);
        else res({success:false,err:'No ports defined.'});
    } else if (port) {
        if (!Array.isArray(port)) port = [port,port];
        client.portMapping({ public: port[0], private: port[1], description, protocol }, err => err ? res({success:false,err}) : res({success:true}));
    } else res({success:false,err:'No ports defined.'})
});

const unmap = options => new Promise(res => {
    options.ports = options.ports || options.port || null;
    protocol = options.protocol || "TCP";

    const um = public => client.portUnmapping({public,protocol}, err => err ? res({success:false,err}) : res({success:true}))
    const uma = public => client.portUnmapping({public,protocol}, err => err ? res({success:false,err}) : '')

    if (!options.ports || options.ports.length == 0) res({success:false,err:'No ports defined.'})
    else if (Array.isArray(options.ports)) for (let i in options.ports) {
        uma(options.ports[i])
        if (i == options.ports.length-1) res({success:true})
    } 
    else um(options.ports)
});

const mappings = (local=false) => new Promise(res => client.getMappings({local},(err,results)=> err ? res({success:false,err}) : res({success:true,results})));

const ip = () => new Promise(res => client.externalIp((err, ip) => err ? res({success:false,err}) : res({success:true,ip})))

exports.map = map;
exports.unmap = unmap;
exports.mappings = mappings;
exports.ip = ip;