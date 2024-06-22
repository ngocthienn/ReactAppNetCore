using Microsoft.EntityFrameworkCore;
using ReactAppNetCore.Server.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();
builder.Services.AddDbContext<FormDBContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNameCaseInsensitive = true);
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(builder =>
{
    builder.WithOrigins("https://localhost:5173", "https://127.0.0.1:5173", "https://localhost:7298", "https://127.0.0.1:7298")
           .AllowAnyHeader()
           .AllowAnyMethod()
           .AllowCredentials();
});

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
