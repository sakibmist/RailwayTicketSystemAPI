using System;

namespace RailwayAPI.Dto
{
    public class TrainRouteModalDto
    {
        public int Id { get; set; } 
        public string StationName { get; set; }
        public TimeSpan DepartureTime { get; set; }
    }
}