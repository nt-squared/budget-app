import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard"

export default function UncategorizedBudgetCard(props) {
    const { getExpensesOfBudget } = useBudgets();
    const amount = getExpensesOfBudget(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0);

    if (amount === 0) return null;

    return (
        <BudgetCard gray name='Uncatergorized' amount={amount} {...props} />
    )
}
