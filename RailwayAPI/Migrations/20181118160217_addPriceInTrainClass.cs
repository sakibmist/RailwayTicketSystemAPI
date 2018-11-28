using Microsoft.EntityFrameworkCore.Migrations;

namespace RailwayAPI.Migrations
{
    public partial class addPriceInTrainClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "TrainClasses",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "TrainClasses");
        }
    }
}
