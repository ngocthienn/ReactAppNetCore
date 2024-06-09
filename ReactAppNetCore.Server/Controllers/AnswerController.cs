using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAppNetCore.Server.DTOs;
using ReactAppNetCore.Server.Models;
using ReactAppNetCore.Server.Repositories;
using System.Text.Json;

namespace ReactAppNetCore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly FormDBContext _formDBContext;

        public AnswerController(FormDBContext formDBContext)
        {
            _formDBContext = formDBContext;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAllAnswer()
        {
            var answer = await _formDBContext.Answers.Where(c => c.defaulFlag == false).ToListAsync();
            return Ok(answer);
        }

        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<Answer>> GetAnswerDefault(int id)
        {
            var answer = await _formDBContext.Answers
                                              .FirstOrDefaultAsync(c => c.templateId == id && c.defaulFlag == true);
            return Ok(answer);
        }


        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<Answer>> GetAnswerNotDefault(int id)
        {
            var answer = await _formDBContext.Answers
                                              .FirstOrDefaultAsync(c => c.Id == id && c.defaulFlag == false);
            return Ok(answer);
        }

        [HttpPost("[action]/{templateId}")]
        public async Task<ActionResult> UpdateAnswerDefaultWithTemplateId(int templateId, [FromBody] AnswerDTO answerUpdate)
        {
            var answer = await _formDBContext.Answers
                                              .FirstOrDefaultAsync(c => c.templateId == templateId && c.defaulFlag == true);
            if(answer == null) 
            {
                answer = new Answer();
                answer.templateId = templateId;
                answer.defaulFlag = true;
                answer.username = "admin";
            }
            answer.answerData = answerUpdate.answerData;
            _formDBContext.Answers.Update(answer);
            _formDBContext.SaveChanges();
            return Ok();
        }

        [HttpPost("[action]/{id}")]
        public async Task<ActionResult> AddAnswerNotDefaultWithId(int id, [FromBody] AnswerDTO answerUpdate)
        {
            var answer = new Answer();
            answer.templateId = id;
            answer.username = "username";
            answer.defaulFlag = false;
            answer.answerData = answerUpdate.answerData;
            _formDBContext.Answers.Update(answer);
            _formDBContext.SaveChanges();
            return Ok();
        }

        //[HttpPost("[action]/{id}")]
        //public async Task<ActionResult> UpdateOrAddAnswerNotDefaultWithId(int id, [FromBody] AnswerDTO answerUpdate)
        //{
        //    var answer = await _formDBContext.Answers
        //                                      .FirstOrDefaultAsync(c => c.Id == id 
        //                                        && c.defaulFlag == false
        //                                        && c.templateId == answerUpdate.templateId);
        //    if (answer == null)
        //    {
        //        answer = new Answer();
        //        answer.templateId = answerUpdate.templateId;
        //        answer.username = "username";
        //    }
        //    answer.defaulFlag = false;
        //    answer.answerData = answerUpdate.answerData;
        //    _formDBContext.Answers.Update(answer);
        //    _formDBContext.SaveChanges();
        //    return Ok();
        //}
    }
}
