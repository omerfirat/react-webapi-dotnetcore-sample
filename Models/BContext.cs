using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SmsApp.Models
{
    public partial class BContext : DbContext
    {
        public BContext()
        {
        }

        public BContext(DbContextOptions<BContext> options)
            : base(options)
        {
        }

        public virtual DbSet<XAuthentications> XAuthentications { get; set; }
        public virtual DbSet<XCustomerDetailsView> XCustomerDetailsView { get; set; }
        public virtual DbSet<XCustomerView> XCustomerView { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("data source=;initial catalog=;uid=;pwd=;packet size=4096;Pooling=False;Connect Timeout=5");
            }
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
