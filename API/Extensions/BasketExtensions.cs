using System;
using API.DTOs;
using API.Entities;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDTO toDTO(this Basket basket) 
        {
            return new BasketDTO
            {
                BasketId = basket.BasketId,
                Items = basket.Items.Select(x=> new BasketItemDto
                {
                    ProductId = x.ProductId,
                    Name = x.Product.Name,
                    Price = x.Product.Price,
                    Brand = x.Product.Brand,
                    Type = x.Product.Type,
                    PictureUrl = x.Product.PictureUrl,
                    Quantity = x.Quantity
                }).ToList()
            };
        }

       public static async Task<Basket> GetBasketWithItems(this IQueryable<Basket> query,
        string? baketId){
        return await query
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.BasketId == baketId) 
                ?? throw new Exception("Cannot get cart") ;
       }
    }
}