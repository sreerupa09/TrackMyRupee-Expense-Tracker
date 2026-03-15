using System;
using System.Collections.Generic;
using TrackMyRupee.Models;
using Microsoft.EntityFrameworkCore;

namespace TrackMyRupee.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options) { }

        public DbSet<Expense> Expenses { get; set; }
    }
}
