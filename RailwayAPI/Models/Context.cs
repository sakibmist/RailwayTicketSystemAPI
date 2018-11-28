using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RailwayAPI.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }

        public virtual DbSet<Station> Stations { get; set; }
        public virtual DbSet<Route> Routes { get; set; }
        public virtual DbSet<Train> Trains { get; set; }
        public virtual DbSet<RouteTrain> RouteTrains { get; set; }
        public virtual DbSet<Class> Classes { get; set; }
        public virtual DbSet<TrainClass> TrainClasses { get; set; }
        public virtual DbSet<TrainWeekend> TrainWeekends { get; set; }
        public virtual DbSet<TrainHoliday> TrainHolidays { get; set; }

    }
}
