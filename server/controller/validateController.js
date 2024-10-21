const Book= require('../models/book')

const getQR = async (req, res) => {
    const {qr} = req.query;
    try {
        const Qrs=await Book.find();
        const find=Qrs.filter((data)=>{return data.paymentqr===qr})
        if(!find){
           return res.json({ message: 'QR Not Found'});
        }
        res.json({message:"QR Found",eventdetail:find?.[0]});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports={getQR};