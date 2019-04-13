let koneksi = require('mysql')
let conn = koneksi.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'sg_3'
})

conn.connect(function(err){
    if(err) throw err;
    console.log("koneksi db berhasil")
});

module.exports = conn;