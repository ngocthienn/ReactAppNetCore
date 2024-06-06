using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAppNetCore.Server.Models;

namespace ReactAppNetCore.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class TemplateController
{
    private readonly DBTemplate _context;

    public TemplateController(DBTemplate context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Template>>> GetTemplates()
    {
        return await _context.templates.ToListAsync();
    }
}