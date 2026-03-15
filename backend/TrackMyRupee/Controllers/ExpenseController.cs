using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        public IActionResult GetExpenses()
        {
            return Ok(_context.Expenses.ToList());
        }

        [HttpPost]
        public IActionResult AddExpense([FromBody] Expense expense)
        {
            _context.Expenses.Add(expense);
            _context.SaveChanges();
            return Ok(expense);
        }
    }
}
