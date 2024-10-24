const Book= require('../models/book')

const getQR = async (req, res) => {
    const {qr} = req.query;
    try {
        const Qrs=await Book.find();
        const find=Qrs.filter((data)=>{return data.paymentqr===qr})
        if(!find){
           return res.json({ message: 'QR Not Found'});
        }
        const data=find?.[0];
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        if (data.enteredstatus === "Not-Checked-IN") {
            await data.updateOne({ enteredstatus: `Checked-IN at ${hours}:${minutes} on  ${day}/${month}/${year}` })
        }
        res.json({ message: "QR Found", eventdetail: find?.[0] });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports={getQR};
