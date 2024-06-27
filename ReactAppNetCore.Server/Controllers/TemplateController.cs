using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAppNetCore.Server.DTOs;
using ReactAppNetCore.Server.Models;
using ReactAppNetCore.Server.Repositories;

namespace ReactAppNetCore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplatesController : ControllerBase
    {
        private readonly FormDBContext _context;
        private readonly IMapper _mapper;

        public TemplatesController(FormDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Templates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemplateDTO>>> GetTemplates()
        {
            var res = await _context.Templates.ToListAsync();
            return _mapper.Map<List<TemplateDTO>>(res);
        }

        // GET: api/Templates/Search
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<TemplateDTO>>> Search(string? keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
            {
                var res = await _context.Templates.ToListAsync();
                return Ok(_mapper.Map<List<TemplateDTO>>(res));
            }
            var results = await _context.Templates
                .Where(e => EF.Functions.Like(e.name.ToLower(), $"%{keyword.ToLower()}%"))
                .ToListAsync();

            return Ok(_mapper.Map<List<TemplateDTO>>(results));
        }

        // GET: api/Templates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TemplateDTO>> GetTemplate(int id)
        {
            var template = await _context.Templates.FindAsync(id);

            if (template == null)
            {
                return NotFound();
            }

            return _mapper.Map<TemplateDTO>(template);
        }

        // PUT: api/Templates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTemplate(int id, TemplateDTO templateDTO)
        {
            var template = _mapper.Map<TemplateDTO>(templateDTO);
            if (id != template.Id)
            {
                return BadRequest();
            }

            _context.Entry(template).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TemplateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Templates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TemplateDTO>> PostTemplate(TemplateDTO templateDTO)
        {
            var template = _mapper.Map<Template>(templateDTO);
            _context.Templates.Add(template);
            await _context.SaveChangesAsync();
            var res = _mapper.Map<TemplateDTO>(template);

            return CreatedAtAction("GetTemplate", new { id = template.Id }, templateDTO);
        }

        // DELETE: api/Templates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplate(int id)
        {
            var template = await _context.Templates.FindAsync(id);
            if (template == null)
            {
                return NotFound();
            }

            _context.Templates.Remove(template);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("[action]/{id?}")]
        public async Task<ActionResult> AddOrUpdateTemplate(int? id, [FromBody] UpdateTemplateDTO updateTemplateDTO)
        {
            int fieldNo = 0;
            int? templateId = id;
            if (templateId == null)
            {
                var template = new Template();
                template.name = updateTemplateDTO.templateUpdate.name;
                await _context.Templates.AddAsync(template);
                _context.SaveChanges();
                templateId = template.Id;
                foreach (var item in updateTemplateDTO.controlUpdates)
                {
                    var update = _mapper.Map<Control>(item);
                    update.templateId = template.Id;
                    update.fieldNo = ++fieldNo;
                    await _context.Controls.AddAsync(update);
                }
                _context.SaveChanges();
            }
            else
            {
                if (!TemplateExists((int)templateId))
                {
                    return NotFound();
                }

                // Update Template
                var template = await _context.Templates.FindAsync((int)templateId);
                template.name = updateTemplateDTO.templateUpdate.name;
                _context.Entry(template).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                var itemsToDelete = await _context.Controls.Where(i => i.templateId == templateId).ToListAsync();
                _context.Controls.RemoveRange(itemsToDelete);

                foreach (var item in updateTemplateDTO.controlUpdates)
                {
                    var update = _mapper.Map<Control>(item);
                    update.templateId = (int)templateId;
                    update.fieldNo = ++fieldNo;
                    await _context.Controls.AddAsync(update);
                }
                _context.SaveChanges();
            }
            return Ok(new { templateId });
        }

        private bool TemplateExists(int id)
        {
            return _context.Templates.Any(e => e.Id == id);
        }
    }
}