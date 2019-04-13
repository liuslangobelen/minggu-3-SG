let express = require('express');
let app = express();
let conn = require('./koneksi');
let body_parser = require('body-parser');

app.use(body_parser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('halaman utama');
})

app.get('/mahasiswa',(req,res)=>{
    conn.query('select * from mahasiswa JOIN fakultas on (fakultas.id_fakultas=mahasiswa.fakultas)',(err,rows,fields)=>{
        res.send(rows);
 
    })
})
app.post('/mahasiswa',(req,res)=>{
    let data_insert = [
        req.body.nim,
        req.body.nama,
        req.body.fakultas,
        req.body.angkatan
    ];
    conn.query('INSERT into mahasiswa (nim,nama,fakultas,angkatan) values (?,?,?,?)',data_insert,(err,rows,fields)=>{
        if(err){
            res.send({data : false})
        }else{
            res.send({data : true})
        }
    })
})
app.put('/mahasiswa/:nim',(req,res)=>{
    let data_update = [
        req.body.nim,
        req.body.nama,
        req.body.fakultas,
        req.body.angkatan,
        req.params.nim
    ]
    conn.query('UPDATE mahasiswa SET nim=?,nama=?,fakultas=?,angkatan=? WHERE nim=?',data_update,(err,rows,fields)=>{
        if(err){
            res.send({data : false})
        }else{
            res.send({data : true})
        }
    })
})
app.delete('/mahasiswa/:nim',(req,res)=>{
    conn.query('delete from mahasiswa where nim = ?',req.params.nim,(err,rows,fields)=>{
        if(err){
            res.send({data : false})
        }else{
            res.send({data : true})
        }
    })
})

app.listen(3000);