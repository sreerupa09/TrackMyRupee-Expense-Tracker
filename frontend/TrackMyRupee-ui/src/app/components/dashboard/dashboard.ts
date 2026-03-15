import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  expenses:any[]=[]
  totalExpense=0
  monthlyExpense=0
  remainingBudget=10000

  constructor(private service:ExpenseService){}

  ngOnInit(){
    this.service.getExpenses().subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          this.expenses = [...data];
          
          this.totalExpense = this.expenses
            .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
          
          this.monthlyExpense = this.totalExpense;
          this.remainingBudget = 10000 - this.totalExpense;
        }
      },
      error: (error) => {
        console.error('Error fetching expenses:', error);
        this.expenses = [];
      }
    });
  }
}