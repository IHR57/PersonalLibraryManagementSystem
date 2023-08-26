using Microsoft.EntityFrameworkCore;
using PersonalLibraryManagement.Application.Contracts.Persistence;
using PersonalLibraryManagement.Domain.Entities.Base;
using PersonalLibraryManagement.Infrastructure.Persistence.DatabaseContext;

namespace PersonalLibraryManagement.Persistence.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        protected readonly PersonalLibraryDatabaseContext context;

        public GenericRepository(PersonalLibraryDatabaseContext context)
        {
            this.context = context;
        }

        public async Task CreateAsync(T entity)
        {
            await context.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            context.Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<T>> GetAsync()
        {
            return await context.Set<T>().AsNoTracking().ToListAsync();
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await context.Set<T>()
                .AsNoTracking()
                .FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task UpdateAsync(T entity)
        {
            context.Update(entity);
            context.Entry(entity).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }
    }
}
