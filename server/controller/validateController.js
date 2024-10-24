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
        let options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit'};
        let indiaTime = currentDate.toLocaleString('en-US', options);

        if (data.enteredstatus === "Not-Checked-IN") {
            await data.updateOne({ enteredstatus: `Checked-IN at ${indiaTime} on ${day}/${month}/${year}` })
        }
        res.json({ message: "QR Found", eventdetail: find?.[0] });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports={getQR};
