import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalOfBudget, setViewExpensesModalOfBudget] = useState();
  const [addExpenseModalOfBudget, setAddExpenseModalOfBudget] = useState();
  const { budgets, getExpensesOfBudget } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalOfBudget(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budget</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: '1rem',
            alignItems: 'flex-start'
          }}
        >
          {budgets.map(budget => {
            const amount = getExpensesOfBudget(budget.id).reduce((total, expense) => total + expense.amount, 0);

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onClickAddExpense={() => openAddExpenseModal(budget.id)}
                onClickViewExpense={() => setViewExpensesModalOfBudget(budget.id)}
              />)
          })}
          <UncategorizedBudgetCard
            onClickAddExpense={openAddExpenseModal}
            onClickViewExpense={() => setViewExpensesModalOfBudget(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalOfBudget}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalOfBudget}
        handleClose={() => setViewExpensesModalOfBudget()}
      />
    </>
  );
}

export default App;
