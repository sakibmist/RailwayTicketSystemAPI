using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace RailwayAPI.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) { }

        public virtual DbSet<Station> Stations { get; set; }
        public virtual DbSet<Route> Routes { get; set; }
        public virtual DbSet<Train> Trains { get; set; }
        public virtual DbSet<RouteTrain> RouteTrains { get; set; }
        public virtual DbSet<Class> Classes { get; set; }
        public virtual DbSet<TrainClass> TrainClasses { get; set; }
        public virtual DbSet<TrainWeekend> TrainWeekends { get; set; }
        public virtual DbSet<TrainHoliday> TrainHolidays { get; set; }


// fluent api for composite key
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Route>().HasKey(k => k.Id);
            modelBuilder.Entity<Route>().HasIndex(i => new { i.StationFormId, i.StationToId }).IsUnique();
            modelBuilder.Entity<Route>().HasOne(x=> x.StationFrom).WithMany().HasForeignKey(f => f.StationFormId);
            modelBuilder.Entity<Route>().HasOne(x=> x.StationTo).WithMany().HasForeignKey(f => f.StationToId);
        }
    }
}