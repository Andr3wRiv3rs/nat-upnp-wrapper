const mapper = require('./mapper');
const port = parseInt(process.env.PORT) || 80;
const exit = () => setTimeout(process.exit,10);

if (process.env.UNMAP) {
    mapper.unmap(port).then(data => {
        console.log(Object.assign({ success:false, action: 'unmap', port }, data));
        exit();
    });
} else {
    let res = { success:false, action: 'map', port };

    mapper.map(port).then(data => {
        if (process.env.IP) mapper.ip().then(data => {
            console.log(Object.assign(res,data));
            exit();
        })
        
        else {
            console.log(Object.assign(res,data)); 
            exit();
        }
    })
}