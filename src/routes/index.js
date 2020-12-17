const { Router  } = require('express');
const router = Router();

const admin = require('firebase-admin');
var serviceAccount = require("../../apptickets-16847-firebase-adminsdk-4q2cr-d9c868c70f.json");
const { route } = require('../app');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://apptickets-16847-default-rtdb.firebaseio.com/'
})

const db = admin.database();

router.get('/',(req, res)=>{
    db.ref('tickets').once('value',(snapshot)=>{
        const data = snapshot.val();
        res.json(data);
    })
});

router.post('/',(req,res)=>{
    console.log(req);
    var f = new Date();
    const newTicket ={
        tipo: req.body.tipo,
        fecha: f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(),
        hora:  f.getHours()+ ":" + f.getMinutes() +":"+f.getSeconds()
    }
    console.log(newTicket);
    db.ref('tickets').push(newTicket);
    res.json('OK')
});

router.delete('/:id',(req, res)=>{
     db.ref('tickets/'+req.params.id).remove();
     res.json('OK')

});
module.exports = router;