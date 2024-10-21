const express=require('express');
const {getQR} =require('../controller/validateController')
const router=express.Router();

router.get('/getqr',getQR);


module.exports=router;