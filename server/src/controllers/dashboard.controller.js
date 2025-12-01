const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getStats = async (req, res) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId: req.userId },
        });

        const totalIncome = transactions
            .filter(t => t.type === 'ingreso')
            .reduce((acc, curr) => acc + curr.amount, 0);

        const totalExpense = transactions
            .filter(t => t.type === 'gasto')
            .reduce((acc, curr) => acc + curr.amount, 0);

        const balance = totalIncome - totalExpense;

        // Agrupar gastos por categoría
        const expensesByCategory = transactions
            .filter(t => t.type === 'gasto')
            .reduce((acc, curr) => {
                acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
                return acc;
            }, {});

        res.json({
            totalIncome,
            totalExpense,
            balance,
            expensesByCategory,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
