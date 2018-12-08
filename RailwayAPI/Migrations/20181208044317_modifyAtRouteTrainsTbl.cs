using Microsoft.EntityFrameworkCore.Migrations;

namespace RailwayAPI.Migrations
{
    public partial class modifyAtRouteTrainsTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DepartureTime",
                table: "RouteTrains",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DepartureTime",
                table: "RouteTrains");
        }
    }
}
