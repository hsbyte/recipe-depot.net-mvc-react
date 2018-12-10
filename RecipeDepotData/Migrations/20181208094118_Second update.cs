using Microsoft.EntityFrameworkCore.Migrations;

namespace RecipeDepotData.Migrations
{
    public partial class Secondupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                table: "Access");

            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                table: "Patrons",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                table: "Patrons");

            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                table: "Access",
                nullable: true);
        }
    }
}
