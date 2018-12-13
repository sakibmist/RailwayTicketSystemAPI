using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RailwayAPI.Dto;
using RailwayAPI.Models;

namespace RailwayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StationsController : ControllerBase
    {
        private readonly Context _context;
        public StationsController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllStations()
        {
            try
            {
                var stations = _context.Stations.ToList();
                return Ok(stations);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet("classes")]
        public IActionResult GetAllClass()
        {
            try
            {
                var listofClass = _context.Classes.ToList();
                return Ok(listofClass);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet("{id}", Name = "GetById")]
        public IActionResult GetStaionById(int id)
        {
            try
            {
                var station = _context.Stations.FirstOrDefault(x => x.Id == id);
                return Ok(station);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("destinations/{fromId}")]
        public IActionResult GetDestinationStationsById(int fromId)
        {
            try
            {
                var destinationStations = _context.Routes
                    .Where(x => x.StationFormId == fromId)
                    .Select(x => new DropdownDto
                    {
                        Text = x.StationTo.Name,
                            Value = x.Id
                    }).ToList();
                return Ok(destinationStations);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("stations/{stationFromId}")]
        public IActionResult GetStationToById(int stationFromId)
        {
            try
            {
                var destinationStations = _context.Routes
                    .Where(x => x.StationFormId == stationFromId)
                    .Select(x => new DropdownDto
                    {
                        Text = x.StationTo.Name,
                            Value = x.StationToId
                    }).ToList();
                return Ok(destinationStations);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        //Get all TrainName against the Train route and select date

        [HttpGet("trains/{routeId}/{date}")]
        public IActionResult GetAllTrainByRouteId(int? routeId, DateTime? date) // from RouteTrain
        {
            try
            {
                if (routeId == null || date == null) return BadRequest();
                var weekDayName = $"{date:dddd}";

                var query = _context.RouteTrains.Where(x => x.RouteId == routeId);

                query = query.Where(x => !_context.TrainWeekends.Any(y => y.TrainId == x.TrainId && y.WeekDayName == weekDayName));

                query = query.Where(x => !_context.TrainHolidays.Any(z => z.TrainId == x.TrainId && z.Hodliday.Date == date.Value.Date));

                var trains = query.Select(x => new DropdownDto
                {
                    Text = x.Train.Name,
                        Value = x.Train.Id
                }).ToList();

                return Ok(trains);

            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        //Get all TrainClass and price against the TrainId

        [HttpGet("train-classes/{trainId}")]
        public IActionResult GetAllTrainClassAndPrice(int trainId)
        {
            try
            {
                var Classes = _context.TrainClasses
                    .Where(x => x.TrainId == trainId)
                    .Select(x => new DropdownDto
                    {
                        Text = x.Class.Name,
                            Value = x.Price
                    }).ToList();
                return Ok(Classes);
            }
            catch (Exception)
            {

                return BadRequest();
            }

        }

        //get all train station against the train Id for show in Modal

        [HttpGet("train-route/{trainId}")]
        public IActionResult GetAllTrainRoutes(int trainId)
        {
            try
            {
                var routeStations = _context.RouteTrains
                    .Where(x => x.TrainId == trainId)
                    .OrderBy(x=>x.DepartureTime)
                    .Select(s => new TrainRouteModalDto
                    {
                        Id = s.TrainId,
                        DepartureTime = $"{new DateTime(s.DepartureTime.Ticks):HH:mm}",
                        StationName = s.Route.StationTo.Name  
                    }).ToList();
                return Ok(routeStations);
            }
            catch (Exception)
            {

                return BadRequest();
            }

        }

        //Get all TrainName

        [HttpGet("Train")]
        public IActionResult GetAllTrain()
        {
            try
            {
                var trains = _context.Trains.ToList();
                return Ok(trains);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult AddStation(StationDto dto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest();
                var station = new Station
                {
                    Name = dto.Name
                };
                _context.Stations.Add(station);
                _context.SaveChanges();
                return CreatedAtRoute("GetById", new { id = station.Id }, station);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("search/trains")]
        public IActionResult SearchTrains(TrainRouteSearchDto dto)
        {
            try
            {
                var weekDayName = $"{dto.JourneyDate:dddd}";

                var query = _context.RouteTrains.Where(x =>
                    x.Route.StationFormId == dto.StationFormId &&
                    x.Route.StationToId == dto.StationToId
                );
                query = query.Where(x => _context.TrainClasses.Any(y => y.ClassId == dto.ClassId && y.TrainId == x.TrainId));
                query = query.Where(x => !_context.TrainWeekends.Any(y => y.TrainId == x.TrainId && y.WeekDayName == weekDayName));
                query = query.Where(x => !_context.TrainHolidays.Any(z => z.TrainId == x.TrainId && z.Hodliday.Date == dto.JourneyDate.Date));

                // var results = query.ToList();
                var trains = query.Select(s => new TrainRouteInfoDto // IQueryable aro query possible.
                {
                    Id = s.TrainId,
                    TrainNo = s.Train.Code,
                    TrainName = s.Train.Name,
                    DepartureTime =  $"{new DateTime(s.DepartureTime.Ticks):HH:mm}" //s.DepartureTime.ToString("HH:mm") timespan is object type, so, use string in dto 
                }).ToList();

                return Ok(trains);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateStation(int? id, StationDto dto)
        {
            try
            {
                if (id == null || id != dto.Id) return BadRequest();
                if (!ModelState.IsValid) return BadRequest();
                var station = new Station
                {
                    Id = dto.Id,
                    Name = dto.Name
                };
                _context.Stations.Update(station);
                _context.SaveChanges();
                return CreatedAtRoute("GetById", new { id = station.Id }, station);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteStation(int? id) // nullable operator.
        {
            try
            {
                if (id == null) return BadRequest();
                var station = _context.Stations.FirstOrDefault(x => x.Id == id);
                _context.Stations.Remove(station);
                _context.SaveChanges();
                return CreatedAtRoute("GetById", new { id = station.Id }, station);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}