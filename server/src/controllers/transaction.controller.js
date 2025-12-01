const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId: req.userId },
            orderBy: { date: 'desc' },
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.create = async (req, res) => {
    try {
        const { amount, category, description, type, date } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than 0' });
        }

        const transaction = await prisma.transaction.create({
            data: {
                amount: parseFloat(amount),
                category,
                description,
                type,
                date: new Date(date),
                userId: req.userId,
            },
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, category, description, type, date } = req.body;

        const transaction = await prisma.transaction.findUnique({ where: { id: parseInt(id) } });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.userId !== req.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedTransaction = await prisma.transaction.update({
            where: { id: parseInt(id) },
            data: {
                amount: amount ? parseFloat(amount) : undefined,
                category,
                description,
                type,
                date: date ? new Date(date) : undefined,
            },
        });

        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await prisma.transaction.findUnique({ where: { id: parseInt(id) } });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.userId !== req.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await prisma.transaction.delete({ where: { id: parseInt(id) } });

        res.json({ message: 'Transaction removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
