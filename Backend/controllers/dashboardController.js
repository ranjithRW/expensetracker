// const Income = require("../models/Income");
// const Expense = require("../models/Expense");
// const { isValidObjectId, Types } = require("mongoose");

// //get dashboard data
// exports.getDashboardData = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const userObjectId = new Types.ObjectId(String(userId));

//         //fetch total income & expense
//         const totalIncomeResult = await Income.aggregate([
//             { $match: { user: userObjectId } },
//             { $group: { _id: null, total: { $sum: "$amount" } } }
//         ]);


//         console.log("Total Income Result:", { totalIncomeResult, userId: isValidObjectId(userId) });

//         const totalExpense = await Expense.aggregate([
//             { $match: { user: userObjectId } },
//             { $group: { _id: null, total: { $sum: "$amount" } } }
//         ]);

//         //get income transactions in the last 2 mon(60days)

//         const last60DaysIncomeTransactions = await Income.find({
//             userId,
//             date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
//         }).sort({ date: -1 });

//         //get total income for last 60days
//         const incomeLast60Days = last60DaysIncomeTransactions.reduce(
//             (sum, transaction) => sum + transaction.amount,
//             0
//         );

//         //get expense transactions in the last 30days

//         const last30DaysExpenseTransactions = await Expense.find({
//             userId,
//             date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
//         }).sort({ date: -1 });

//         //get total expenses for last 30days
//         const expensesLast30days = last30DaysExpenseTransactions.reduce(
//             (sum, transaction) => sum + transaction.amount, 0
//         );

//         //fetch last 5 transactions from income & expense
//         const lastTransactions = [
//             ...(await Income.find({ userId }).sort({ date: -1 }).limit(5).map(
//                 (txn) => ({
//                     ...txn.toObject(),
//                     type: "income",
//                 })
//             ),
//             ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5).map(
//                 (txn) => ({
//                     ...txn.toObject(), type: "expense",
//                 })
//             ),
//         ].sort((a, b) => b.date - a.date);

//         //final response
//         res.json({
//             totalBalance:
//                 (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
//             totalIncome: totalIncome[0]?.total || 0,
//             totalExpense: totalExpense[0]?.total || 0,
//             last30DaysExpenses: {
//                 total: expensesLast30days,
//                 transactions: last30DaysExpenseTransactions,
//             },
//             last60DaysIncome: {
//                 total: incomeLast60Days,
//                 transactions: last60DaysIncomeTransactions,
//             },
//             recentTransactions: lastTransactions,

//         });
//     }
//     catch (error) {
//         res.status(500).json({ message: "Error in fetching dashboard data", error: error.message });
//     }
// }






const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

//get dashboard data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        //fetch total income & expense using correct field name
        const totalIncomeResult = await Income.aggregate([
            { $match: { userId: userObjectId } }, // Fixed: use userId instead of user
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        console.log("Total Income Result:", { totalIncomeResult, userId: isValidObjectId(userId) });

        const totalExpenseResult = await Expense.aggregate([
            { $match: { userId: userObjectId } }, // Fixed: use userId instead of user
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        //get income transactions in the last 2 months (60days)
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //get total income for last 60days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //get expense transactions in the last 30days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //get total expenses for last 30days
        const expensesLast30days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        //fetch last 5 transactions from income & expense - FIXED
        const incomeTransactions = await Income.find({ userId }).sort({ date: -1 }).limit(5);
        const expenseTransactions = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

        const lastTransactions = [
            ...incomeTransactions.map((txn) => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...expenseTransactions.map((txn) => ({
                ...txn.toObject(),
                type: "expense",
            })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        //final response - FIXED variable names
        res.json({
            totalBalance:
                (totalIncomeResult[0]?.total || 0) - (totalExpenseResult[0]?.total || 0),
            totalIncome: totalIncomeResult[0]?.total || 0,
            totalExpense: totalExpenseResult[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error in fetching dashboard data", error: error.message });
    }
};