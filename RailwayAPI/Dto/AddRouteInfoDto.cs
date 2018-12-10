using System;

namespace RailwayAPI.Dto
{
    public class AddRouteInfoDto
    {
        public int Id { get; set; }

        public int  TrainId { get; set; }

        public int StationFormId { get; set; }

        public int StationToId { get; set; }
        public TimeSpan DepartureTime { get; set; }



    }
}