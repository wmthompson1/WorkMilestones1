using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AspNetCoreWebAPI.Migrations
{
    public partial class CCTSDev_Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "test");

            migrationBuilder.CreateTable(
                name: "Survey",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 500, nullable: true),
                    Description = table.Column<string>(maxLength: 3000, nullable: true),
                    SurveyTypeCode = table.Column<string>(maxLength: 50, nullable: true),
                    Instructions = table.Column<string>(maxLength: 3000, nullable: true),
                    IsLocked = table.Column<bool>(nullable: false),
                    CloseDate = table.Column<DateTime>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 50, nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 50, nullable: true),
                    SchoolYear = table.Column<string>(maxLength: 7, nullable: true),
                    LeaverYear = table.Column<string>(maxLength: 7, nullable: true),
                    IsReported = table.Column<bool>(nullable: true),
                    OpenDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Survey", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SurveyQuestion",
                schema: "test",
                columns: table => new
                {
                    SurveyId = table.Column<int>(nullable: false),
                    SurveyName = table.Column<string>(maxLength: 500, nullable: true),
                    PageId = table.Column<int>(nullable: false),
                    PageName = table.Column<string>(maxLength: 500, nullable: true),
                    QuestionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    QuestionGroupId = table.Column<string>(maxLength: 50, nullable: true),
                    Text = table.Column<string>(maxLength: 1500, nullable: true),
                    QuestionTypeCode = table.Column<string>(maxLength: 10, nullable: true),
                    QuestionNumberText = table.Column<string>(maxLength: 50, nullable: true),
                    IsRequired = table.Column<bool>(nullable: true),
                    Visible = table.Column<bool>(nullable: true),
                    QuestionSortId = table.Column<decimal>(nullable: true),
                    Instructions = table.Column<string>(maxLength: 2000, nullable: true),
                    PageSortId = table.Column<decimal>(nullable: true),
                    LeaverYear = table.Column<string>(maxLength: 7, nullable: true),
                    SurveyTypeCode = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyQuestion", x => x.QuestionId);
                });

            migrationBuilder.CreateTable(
                name: "SurveyQuestionDetail",
                schema: "test",
                columns: table => new
                {
                    SurveyId = table.Column<int>(nullable: false),
                    SurveyName = table.Column<string>(maxLength: 500, nullable: true),
                    PageId = table.Column<int>(nullable: false),
                    PageName = table.Column<string>(maxLength: 500, nullable: true),
                    QuestionId = table.Column<int>(nullable: false),
                    QuestionGroupId = table.Column<string>(maxLength: 50, nullable: true),
                    Text = table.Column<string>(maxLength: 1500, nullable: true),
                    QuestionTypeCode = table.Column<string>(maxLength: 10, nullable: true),
                    QuestionNumberText = table.Column<string>(maxLength: 50, nullable: true),
                    IsRequired = table.Column<bool>(nullable: true),
                    Visible = table.Column<bool>(nullable: true),
                    QuestionSortId = table.Column<decimal>(nullable: true),
                    Instructions = table.Column<string>(maxLength: 2000, nullable: true),
                    PageSortId = table.Column<decimal>(nullable: true),
                    LeaverYear = table.Column<string>(maxLength: 7, nullable: true),
                    SurveyTypeCode = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyQuestionDetail", x => new { x.SurveyId, x.PageId, x.QuestionId });
                });

            migrationBuilder.CreateTable(
                name: "QItem",
                schema: "test",
                columns: table => new
                {
                    QItemId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    QItemText = table.Column<string>(maxLength: 1500, nullable: true),
                    QuestionId = table.Column<int>(nullable: false),
                    ItemNumberText = table.Column<string>(maxLength: 50, nullable: true),
                    ItemNumberDisplayText = table.Column<string>(maxLength: 20, nullable: true),
                    DisplayAsTextBox = table.Column<bool>(nullable: true),
                    QItemSortId = table.Column<int>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<string>(maxLength: 50, nullable: true),
                    ShortenedText = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QItem", x => x.QItemId);
                    table.ForeignKey(
                        name: "FK_QItem_SurveyQuestion_QuestionId",
                        column: x => x.QuestionId,
                        principalSchema: "test",
                        principalTable: "SurveyQuestion",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QItem_QuestionId",
                schema: "test",
                table: "QItem",
                column: "QuestionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Survey");

            migrationBuilder.DropTable(
                name: "QItem",
                schema: "test");

            migrationBuilder.DropTable(
                name: "SurveyQuestionDetail",
                schema: "test");

            migrationBuilder.DropTable(
                name: "SurveyQuestion",
                schema: "test");
        }
    }
}
