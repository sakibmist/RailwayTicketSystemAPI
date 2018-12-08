using Microsoft.EntityFrameworkCore.Migrations;

namespace RailwayAPI.Migrations
{
    public partial class modifyAtRouteTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DepartureTime",
                table: "RouteTrains");

            migrationBuilder.AddColumn<string>(
                name: "DepartureTime",
                table: "Routes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DepartureTime",
                table: "Routes");

            migrationBuilder.AddColumn<string>(
                name: "DepartureTime",
                table: "RouteTrains",
                nullable: true);
        }
    }
}
