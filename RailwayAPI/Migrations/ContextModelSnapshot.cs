﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RailwayAPI.Models;

namespace RailwayAPI.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RailwayAPI.Models.Class", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("RailwayAPI.Models.Route", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("StationFormId");

                    b.Property<int>("StationToId");

                    b.HasKey("Id");

                    b.HasIndex("StationFormId");

                    b.HasIndex("StationToId");

                    b.ToTable("Routes");
                });

            modelBuilder.Entity("RailwayAPI.Models.RouteTrain", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("RouteId");

                    b.Property<int>("TrainId");

                    b.HasKey("Id");

                    b.HasIndex("RouteId");

                    b.HasIndex("TrainId");

                    b.ToTable("RouteTrains");
                });

            modelBuilder.Entity("RailwayAPI.Models.Station", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.HasKey("Id");

                    b.ToTable("Stations");
                });

            modelBuilder.Entity("RailwayAPI.Models.Train", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(15);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15);

                    b.HasKey("Id");

                    b.ToTable("Trains");
                });

            modelBuilder.Entity("RailwayAPI.Models.TrainClass", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClassId");

                    b.Property<double>("Price");

                    b.Property<int>("TrainId");

                    b.HasKey("Id");

                    b.HasIndex("ClassId");

                    b.HasIndex("TrainId");

                    b.ToTable("TrainClasses");
                });

            modelBuilder.Entity("RailwayAPI.Models.TrainHoliday", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Hodliday");

                    b.Property<int>("TrainId");

                    b.HasKey("Id");

                    b.HasIndex("TrainId");

                    b.ToTable("TrainHolidays");
                });

            modelBuilder.Entity("RailwayAPI.Models.TrainWeekend", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("TrainId");

                    b.Property<string>("WeekDayName")
                        .IsRequired()
                        .HasMaxLength(15);

                    b.HasKey("Id");

                    b.HasIndex("TrainId");

                    b.ToTable("TrainWeekends");
                });

            modelBuilder.Entity("RailwayAPI.Models.Route", b =>
                {
                    b.HasOne("RailwayAPI.Models.Station", "StationFrom")
                        .WithMany()
                        .HasForeignKey("StationFormId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RailwayAPI.Models.Station", "StationTo")
                        .WithMany()
                        .HasForeignKey("StationToId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RailwayAPI.Models.RouteTrain", b =>
                {
                    b.HasOne("RailwayAPI.Models.Route", "Route")
                        .WithMany()
                        .HasForeignKey("RouteId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RailwayAPI.Models.Train", "Train")
                        .WithMany()
                        .HasForeignKey("TrainId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RailwayAPI.Models.TrainClass", b =>
                {
                    b.HasOne("RailwayAPI.Models.Class", "Class")
                        .WithMany()
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RailwayAPI.Models.Train", "Train")
                        .WithMany()
                        .HasForeignKey("TrainId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RailwayAPI.Models.TrainHoliday", b =>
                {
                    b.HasOne("RailwayAPI.Models.Train", "Train")
                        .WithMany()
                        .HasForeignKey("TrainId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RailwayAPI.Models.TrainWeekend", b =>
                {
                    b.HasOne("RailwayAPI.Models.Train", "Train")
                        .WithMany()
                        .HasForeignKey("TrainId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
