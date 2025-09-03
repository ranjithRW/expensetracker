const Income = require("../models/Income");
const xlsx = require("xlsx");

//add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });
        await newIncome.save();
        res.status(201).json({ message: "Income source added successfully", income: newIncome });
    }
    catch (error) {
        res.status(500).json({ message: "Error in adding income source", error: error.message });
    }   

};

//get all income sources
exports.getAllIncome = async (req, res) => { 
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(income);
    }
    catch (error) {
        res.status(500).json({ message: "Error in fetching income sources", error: error.message });
    }
};

//delete income source
exports.deleteIncome = async (req, res) => {
    // const userId = req.user.id;

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income source deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error in deleting income source", error: error.message });
    }
 };

//download income as excel
exports.downloadIncomeExcel = async (req, res) => { 
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        //prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date, 
        }));

        //create worksheet and workbook
        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Income");
        xlsx.writeFile(wb,"Income_details.xlsx");
        res.download("Income_details.xlsx");
    }
    catch (error) {
        res.status(500).json({ message: "Error in downloading income as excel", error: error.message });
    }

};