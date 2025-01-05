document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    // Load expenses from local storage
    const loadExpenses = () => {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.forEach(expense => addExpenseToDOM(expense));
    };

    // Save expenses to local storage
    const saveExpenses = (expenses) => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    // Add expense to DOM
    const addExpenseToDOM = ({ id, name, amount }) => {
        const li = document.createElement('li');
        li.setAttribute('data-id', id);
        li.innerHTML = `
            <span>${name}</span>
            <span>$${amount}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        expenseList.appendChild(li);
    };

    // Add expense
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('expense-name').value;
        const amount = document.getElementById('expense-amount').value;

        if (name && amount) {
            const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            const newExpense = { id: Date.now().toString(), name, amount };
            expenses.push(newExpense);
            saveExpenses(expenses);
            addExpenseToDOM(newExpense);

            expenseForm.reset();
        }
    });

    // Edit or delete expense
    expenseList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        const id = li.getAttribute('data-id');
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        if (e.target.classList.contains('edit')) {
            const expense = expenses.find(exp => exp.id === id);
            document.getElementById('expense-name').value = expense.name;
            document.getElementById('expense-amount').value = expense.amount;
            expenses = expenses.filter(exp => exp.id !== id);
            saveExpenses(expenses);
            li.remove();
        } else if (e.target.classList.contains('delete')) {
            expenses = expenses.filter(exp => exp.id !== id);
            saveExpenses(expenses);
            li.remove();
        }
    });

    loadExpenses();
});