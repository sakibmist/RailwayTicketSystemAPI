using System;

namespace RailwayAPI.Dto
{
    public class TrainRouteSearchDto
    {
        public DateTime JourneyDate { get; set; }
        public int StationFormId { get; set; }
        public int StationToId { get; set; }
        public int ClassId { get; set; }

    }
}