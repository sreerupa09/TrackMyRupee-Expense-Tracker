import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  expenses: any[] = [];
  totalExpense = 0;
  monthlyExpense = 0;
  remainingBudget = 10000;

  constructor(
    private service: ExpenseService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // Backend returns a plain array of expenses (Ok(expenses))
    this.service.getExpenses().subscribe({
      next: (data: any[]) => {
        // assign array directly
        this.expenses = data || [];

        // compute totals
        this.totalExpense = this.expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

        this.monthlyExpense = this.totalExpense;
        this.remainingBudget = 10000 - this.totalExpense;

        console.log('Dashboard: totals computed', {
          total: this.totalExpense,
          remaining: this.remainingBudget,
        });

        // Ensure view updates
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching expenses:', error);
        this.expenses = [];
        this.totalExpense = 0;
        this.monthlyExpense = 0;
        this.remainingBudget = 10000;
      },
    });
  }

  // DELETE
  deleteExpense(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.service.deleteExpense(id).subscribe(() => {
        this.expenses = this.expenses.filter((e) => e.id !== id);
        this.ngOnInit(); // refresh
      });
    }
  }

  // VIEW
  viewExpense(expense: any) {
    const dateObj = new Date(expense.date);

    const formattedDate = dateObj.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const formattedTime = dateObj.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    alert(`
    Title: ${expense.title}
    Amount: ₹${expense.amount}
    Category: ${expense.category}
    Date: ${formattedDate}
    Time: ${formattedTime}
    `);
  }

  // EDIT (simple inline update)
  editExpense(expense: any) {
    const newAmount = prompt('Enter new amount:', expense.amount);

    if (newAmount) {
      const updated = { ...expense, amount: Number(newAmount) };

      this.service.updateExpense(expense.id, updated).subscribe(() => {
        this.ngOnInit(); // refresh
      });
    }
  }
}
