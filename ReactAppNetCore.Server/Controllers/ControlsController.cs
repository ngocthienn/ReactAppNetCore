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
    public class ControlsController : ControllerBase
    {
        private readonly FormDBContext _context;
        private readonly IMapper _mapper;

        public ControlsController(FormDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Controls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Control>>> GetControls()
        {
            return await _context.Controls.ToListAsync();
        }

        // GET: api/Controls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Control>> GetControl(int id)
        {
            var control = await _context.Controls.FindAsync(id);

            if (control == null)
            {
                return NotFound();
            }

            return control;
        }

        // GET: api/Controls/GetControlsWithTemplateId/5
        [HttpGet("[action]/{templateId}")]
        public async Task<ActionResult<IEnumerable<ControlDTO>>> GetControlsWithTemplateId(int templateId)
        {
            var controls = await _context.Controls.Where(c => c.templateId == templateId).OrderBy(c => c.fieldNo).ToListAsync();

            if (controls == null || controls.Count() <= 0)
            {
                return NotFound();
            }

            return _mapper.Map<List<ControlDTO>>(controls);
        }

        // PUT: api/Controls/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutControl(int id, Control control)
        {
            if (id != control.templateId)
            {
                return BadRequest();
            }

            _context.Entry(control).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ControlExists(id))
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

        // POST: api/Controls
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Control>> PostControl(Control control)
        {
            _context.Controls.Add(control);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ControlExists(control.templateId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetControl", new { id = control.templateId }, control);
        }

        // DELETE: api/Controls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteControl(int id)
        {
            var control = await _context.Controls.FindAsync(id);
            if (control == null)
            {
                return NotFound();
            }

            _context.Controls.Remove(control);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ControlExists(int id)
        {
            return _context.Controls.Any(e => e.templateId == id);
        }
    }
}

