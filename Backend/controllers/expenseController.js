const Expense = require("../models/Expense");
const xlsx = require("xlsx");

//add expense category
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        
        const { icon, category, amount, date } = req.body;
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });
        await newExpense.save();
        res.status(201).json({ message: "Expense category added successfully", Expense: newExpense });
    }
    catch (error) {
        res.status(500).json({ message: "Error in adding Expense category", error: error.message });
    }   

};

//get all expense sources
exports.getAllExpense = async (req, res) => { 
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expense);
    }
    catch (error) {
        res.status(500).json({ message: "Error in fetching expense sources", error: error.message });
    }
};

//delete Expense source
exports.deleteExpense = async (req, res) => {

    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense source deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error in deleting Expense source", error: error.message });
    }
 };

//download income as excel
exports.downloadExpenseExcel = async (req, res) => { 
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        //prepare data for excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date, 
        }));

        //create worksheet and workbook
        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expense");
        xlsx.writeFile(wb,"expense_details.xlsx");
        res.download("expense_details.xlsx");
    }
    catch (error) {
        res.status(500).json({ message: "Error in downloading Expense as excel", error: error.message });
    }

};