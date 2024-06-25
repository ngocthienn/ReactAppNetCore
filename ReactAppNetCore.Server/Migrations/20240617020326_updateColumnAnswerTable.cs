using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactAppNetCore.Server.Migrations
{
    /// <inheritdoc />
    public partial class updateColumnAnswerTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "defaul_flag",
                table: "answer",
                newName: "default_flag");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "default_flag",
                table: "answer",
                newName: "defaul_flag");
        }
    }
}
