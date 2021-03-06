using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RailwayAPI.Dto;
using RailwayAPI.Models;

namespace RailwayAPI.Controllers
{
    [Authorize]
    [Route("api/trains")]
    [ApiController]
    public class TrainsController : ControllerBase
    {
        private readonly Context _dataContext;
        public TrainsController(Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public IActionResult GetAllData()
        {
            try
            {
                var trains = _dataContext.Trains.ToList();
                return Ok(trains); //200
            }
            catch (System.Exception)
            {
                return BadRequest(); //400
            }
        }

        [HttpGet("{id}", Name = "GetData")]
        public IActionResult GetDataById(int id)
        {
            try
            {
                var data = _dataContext.Trains.FirstOrDefault(x => x.Id == id);
                return Ok(data); //200
            }
            catch (System.Exception)
            {

                return BadRequest(); //400
            }
        }

        [HttpPost]
        public IActionResult AddData(Train train)
        {
            try
            {
                if (train == null) return NotFound(); //404
                _dataContext.Add(train);
                _dataContext.SaveChanges();
                return CreatedAtRoute("GetData", new { id = train.Id }, train); //201
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }

        // add route train and departure time

        [HttpPost("add")]
        public IActionResult AddRouteDataInfo(IEnumerable<AddRouteInfoDto> routeInfoDto)
        {
            using(var sakib = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    foreach (var item in routeInfoDto)
                    {
                        Route route = null;
                        var routeFromDb = _dataContext.Routes.FirstOrDefault(x => x.StationToId == item.StationToId && x.StationFormId == item.StationFormId);
                        if (routeFromDb == null)
                        {
                            route = new Route
                            {
                                StationFormId = item.StationFormId,
                                StationToId = item.StationToId,
                            };
                            _dataContext.Routes.Add(route);
                            _dataContext.SaveChanges();
                        }

                        var routeTrain = new RouteTrain
                        {
                            RouteId = routeFromDb?.Id ?? route.Id,
                            DepartureTime = item.DepartureTime,
                            TrainId = item.TrainId
                        };
                        _dataContext.RouteTrains.Add(routeTrain);
                        _dataContext.SaveChanges();
                    }
                    sakib.Commit();
                    return Ok();
                }
                catch (Exception ex)
                {
                    sakib.Rollback();
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            try
            {
                var data = _dataContext.Trains.FirstOrDefault(x => x.Id == id);
                if (data == null) return null;
                _dataContext.Trains.Remove(data);
                _dataContext.SaveChanges();
                return Ok(); //200
            }
            catch (System.Exception)
            {
                return BadRequest(); // 400
            }
        }

        //get all destination station name against the from stations

        [HttpGet("destinations/{fromId}")]
        public IActionResult GetDestinationStationsById(int fromId)
        {
            try
            {
                var destinationStations = _dataContext.Routes
                    .Where(x => x.StationFormId == fromId)
                    .Select(x => new DropdownDto
                    {
                        Text = x.StationTo.Name,
                            Value = x.StationToId
                    }).ToList();
                return Ok(destinationStations);
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateData(int id, Train customer)
        {
            try
            {
                if (id != customer.Id) return BadRequest("Invalid Data"); // validation status 400
                var data = _dataContext.Trains.FirstOrDefault(x => x.Id == id);
                if (data == null) return NotFound(); // 404
                data.Name = customer.Name;
                _dataContext.Trains.Update(data);
                _dataContext.SaveChanges();
                return NoContent(); // 204
            }
            catch (System.Exception)
            {
                return BadRequest("Error occured"); //400
            }
        }
    }
}