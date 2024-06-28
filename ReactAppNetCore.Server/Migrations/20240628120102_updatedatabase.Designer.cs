﻿// <auto-generated />
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using ReactAppNetCore.Server.Repositories;

#nullable disable

namespace ReactAppNetCore.Server.Migrations
{
    [DbContext(typeof(FormDBContext))]
    [Migration("20240628120102_updatedatabase")]
    partial class updatedatabase
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ReactAppNetCore.Server.Models.Answer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<JsonDocument>("answerData")
                        .IsRequired()
                        .HasColumnType("json")
                        .HasColumnName("answer_data");

                    b.Property<bool>("defaultFlag")
                        .HasColumnType("boolean")
                        .HasColumnName("default_flag");

                    b.Property<int>("templateId")
                        .HasColumnType("integer")
                        .HasColumnName("template_id");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("username");

                    b.HasKey("Id");

                    b.HasIndex("templateId");

                    b.ToTable("answer");
                });

            modelBuilder.Entity("ReactAppNetCore.Server.Models.Control", b =>
                {
                    b.Property<int>("templateId")
                        .HasColumnType("integer")
                        .HasColumnName("template_id");

                    b.Property<int>("fieldNo")
                        .HasColumnType("integer")
                        .HasColumnName("field_no");

                    b.Property<JsonDocument>("taskData")
                        .IsRequired()
                        .HasColumnType("json")
                        .HasColumnName("task_data");

                    b.HasKey("templateId", "fieldNo");

                    b.ToTable("control");
                });

            modelBuilder.Entity("ReactAppNetCore.Server.Models.Template", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("template");
                });

            modelBuilder.Entity("ReactAppNetCore.Server.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("username");

                    b.HasKey("Id");

                    b.HasIndex("username")
                        .IsUnique();

                    b.ToTable("user");
                });

            modelBuilder.Entity("ReactAppNetCore.Server.Models.Answer", b =>
                {
                    b.HasOne("ReactAppNetCore.Server.Models.Template", "template")
                        .WithMany("answers")
                        .HasForeignKey("templateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("template");
                });

            modelBuilder.Entity("ReactAppNetCore.Server.Models.Control", b =>
                {
                    b.HasOne("ReactAppNetCore.Server.Models.Template", "template")
                        .WithMany("controls")
                        .HasForeignKey("templateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("template");
                });

            modelBuilder.Entity("ReactAppNetCore.Server.Models.Template", b =>
                {
                    b.Navigation("answers");

                    b.Navigation("controls");
                });
#pragma warning restore 612, 618
        }
    }
}
