using System;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public required DbSet<Product> Products { get; set; }

        public required DbSet<Basket> Baskets { get; set; }
        public required DbSet<Order> Orders { get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole {Id="31d35427-6a74-417c-96e1-3514f4e57747", ConcurrencyStamp="Member", Name = "Member", NormalizedName = "MEMBER"},
                new IdentityRole {Id="fec23ca2-16b8-4657-8a59-32edb185f49f", ConcurrencyStamp="Admin", Name = "Admin", NormalizedName = "ADMIN"}
            );
        }

    }
}