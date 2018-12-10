using Microsoft.EntityFrameworkCore.Migrations;

namespace RecipeDepotData.Migrations
{
    public partial class Initialupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Patrons_PatronEmail",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_PatronEmail",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "PatronEmail",
                table: "Reviews");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Reviews",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_Email",
                table: "Reviews",
                column: "Email");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Patrons_Email",
                table: "Reviews",
                column: "Email",
                principalTable: "Patrons",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Patrons_Email",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_Email",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Reviews");

            migrationBuilder.AddColumn<string>(
                name: "PatronEmail",
                table: "Reviews",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_PatronEmail",
                table: "Reviews",
                column: "PatronEmail");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Patrons_PatronEmail",
                table: "Reviews",
                column: "PatronEmail",
                principalTable: "Patrons",
                principalColumn: "Email",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
