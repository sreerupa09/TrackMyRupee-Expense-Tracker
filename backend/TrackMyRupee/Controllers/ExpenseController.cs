using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackMyRupee.Data;
using TrackMyRupee.Models;

namespace TrackMyRupee.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly AppDBContext _context;

        public ExpenseController(AppDBContext context)
        {
            _context = context;
        }

        // Get all expenses
        [HttpGet]
        public async Task<IActionResult> GetAllExpenses()
        {
            var expenses = await _context.Expenses.ToListAsync();
            return Ok(expenses);
        }

        // Get expense by Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
                return NotFound("Expense not found");

            return Ok(expense);
        }

        // Create a new expense
        [HttpPost]
        public async Task<IActionResult> AddExpense(Expense expense)
        {
            await _context.Expenses.AddAsync(expense);
            await _context.SaveChangesAsync();

            return Ok(expense);
        }

        // Update an existing expense
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Expense updatedExpense)
        {
            if (id != updatedExpense.Id)
                return BadRequest("ID mismatch");

            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
                return NotFound("Expense not found");

            // Update fields
            expense.Title = updatedExpense.Title;
            expense.Amount = updatedExpense.Amount;
            expense.Category = updatedExpense.Category;
            expense.Date = updatedExpense.Date;

            await _context.SaveChangesAsync();

            return Ok(expense);
        }

        // Delete an expense
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
                return NotFound("Expense not found");

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfully");
        }
    }
}
