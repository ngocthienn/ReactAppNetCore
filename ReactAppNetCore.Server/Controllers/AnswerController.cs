﻿using System;
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
    public class AnswersController : ControllerBase
    {
        private readonly FormDBContext _context;
        private readonly IMapper _mapper;

        public AnswersController(FormDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Answers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnswerDTO>>> GetAnswers()
        {
            var res = await _context.Answers.ToListAsync();
            return _mapper.Map<List<AnswerDTO>>(res);
        }

        // GET: api/Answers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnswerDTO>> GetAnswer(int id)
        {
            var answer = await _context.Answers.FindAsync(id);

            if (answer == null)
            {
                return NotFound();
            }

            return _mapper.Map<AnswerDTO>(answer);
        }

        // GET: api/Answers/GetAnswerDefault/5
        [HttpGet("[action]/{templateId}")]
        public async Task<ActionResult<AnswerDTO>> GetAnswerDefault(int templateId)
        {
            var answer = await _context.Answers
                                              .FirstOrDefaultAsync(c => c.templateId == templateId && c.defaultFlag == true);
            return Ok(_mapper.Map<AnswerDTO>(answer));
        }

        // GET: api/Answers/GetAnswerNotDefault/5
        [HttpGet("[action]/{templateId}")]
        public async Task<ActionResult<AnswerDTO>> GetAnswerNotDefault(int templateId)
        {
            var answer = await _context.Answers
                                              .FirstOrDefaultAsync(c => c.templateId == templateId && c.defaultFlag == false);
            return Ok(_mapper.Map<AnswerDTO>(answer));
        }

        // PUT: api/Answers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnswer(int id, AnswerDTO answerDTO)
        {
            var answer = _mapper.Map<AnswerDTO>(answerDTO);
            if (id != answer.Id)
            {
                return BadRequest();
            }

            _context.Entry(answer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(id))
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

        // POST: api/Answers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AnswerDTO>> PostAnswer(AnswerDTO answerDTO)
        {
            var answer = _mapper.Map<Answer>(answerDTO);
            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnswer", new { id = answer.Id }, answerDTO);
        }

        // DELETE: api/Answers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnswer(int id)
        {
            var answer = await _context.Answers.FindAsync(id);
            if (answer == null)
            {
                return NotFound();
            }

            _context.Answers.Remove(answer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("[action]/{templateId}")]
        public async Task<ActionResult> UpdateAnswerDefaultWithTemplateId(int templateId, [FromBody] AnswerDTO answerUpdate)
        {
            var answer = await _context.Answers
                                              .FirstOrDefaultAsync(c => c.templateId == templateId && c.defaultFlag == true);
            if (answer == null)
            {
                answer = new Answer();
                answer.templateId = templateId;
                answer.defaultFlag = true;
                answer.username = "admin";
                answer.answerData = answerUpdate.answerData;
                _context.Answers.Add(answer);
            }
            else
            {
                answer.answerData = answerUpdate.answerData;
                _context.Answers.Update(answer);
            }
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("[action]/{id}")]
        public async Task<ActionResult> AddAnswerNotDefaultWithId(int id, [FromBody] AnswerDTO answerUpdate)
        {
            var answer = _mapper.Map<Answer>(answerUpdate);
            answer.templateId = id;
            answer.username = "username";
            answer.defaultFlag = false;
            answer.answerData = answerUpdate.answerData;
            _context.Answers.Update(answer);
            _context.SaveChanges();
            return Ok();
        }

        private bool AnswerExists(int id)
        {
            return _context.Answers.Any(e => e.Id == id);
        }
    }
}