using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactAppNetCore.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTemplateTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_control_tamplate_template_id",
                table: "control");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tamplate",
                table: "tamplate");

            migrationBuilder.RenameTable(
                name: "tamplate",
                newName: "template");

            migrationBuilder.AddPrimaryKey(
                name: "PK_template",
                table: "template",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_control_template_template_id",
                table: "control",
                column: "template_id",
                principalTable: "template",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_control_template_template_id",
                table: "control");

            migrationBuilder.DropPrimaryKey(
                name: "PK_template",
                table: "template");

            migrationBuilder.RenameTable(
                name: "template",
                newName: "tamplate");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tamplate",
                table: "tamplate",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_control_tamplate_template_id",
                table: "control",
                column: "template_id",
                principalTable: "tamplate",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
