// Массив для хранения расходов
let expenses = [];

// Функция для добавления нового расхода
function addExpense(category, amount) {
    expenses.push({
        category: category,
        amount: parseFloat(amount)
    });
    updateUI();
}

// Функция для удаления расхода
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateUI();
}

// Функция для расчета общей суммы расходов
function calculateTotal() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

// Функция для расчета среднего дневного расхода
function calculateAverageDaily() {
    return calculateTotal() / 30;
}

// Функция для получения топ-3 расходов
function getTopExpenses() {
    return [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);
}

// Функция для обновления интерфейса
function updateUI() {
    // Обновление списка расходов
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount.toLocaleString()}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        expensesList.appendChild(row);
    });

    // Обновление статистики
    document.getElementById('totalAmount').textContent = calculateTotal().toLocaleString();
    document.getElementById('averageDaily').textContent = calculateAverageDaily().toLocaleString();

    // Обновление топ-3 расходов
    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = '';
    
    getTopExpenses().forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: ${expense.amount.toLocaleString()} $`;
        topExpensesList.appendChild(li);
    });
}

// Обработчик отправки формы
document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    
    addExpense(category, amount);
    
    // Очистка формы
    this.reset();
});

// Инициализация интерфейса
updateUI(); 