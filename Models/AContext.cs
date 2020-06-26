using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SmsApp.Models
{
    public partial class AContext : DbContext
    {
        public AContext()
        {
        }

        public AContext(DbContextOptions<AContext> options)
            : base(options)
        {
        }

        public virtual DbSet<XErrorCodes> XErrorCodes { get; set; }
        public virtual DbSet<XSms> XSms { get; set; }
        public virtual DbSet<XSmsbulk> XSmsBulk { get; set; }
        public virtual DbSet<XVpnLogin> XVpnLogin { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("data source=;initial catalog=;uid=;pwd=;packet size=4096;Pooling=False;Connect Timeout=5");
            }
        }


        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
