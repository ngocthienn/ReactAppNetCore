using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ReactAppNetCore.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddTemplateAndControlTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tamplate",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tamplate", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "control",
                columns: table => new
                {
                    template_id = table.Column<int>(type: "integer", nullable: false),
                    field_no = table.Column<int>(type: "integer", nullable: false),
                    task_data = table.Column<string>(type: "json", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_control", x => new { x.template_id, x.field_no });
                    table.ForeignKey(
                        name: "FK_control_tamplate_template_id",
                        column: x => x.template_id,
                        principalTable: "tamplate",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "control");

            migrationBuilder.DropTable(
                name: "tamplate");
        }
    }
}
