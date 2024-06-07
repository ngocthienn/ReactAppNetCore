using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAppNetCore.Server.Models;
using ReactAppNetCore.Server.Repositories;

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

        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<Answer>> GetAnswerDefault(int id)
        {
            return await _formDBContext.Answers.FirstOrDefaultAsync(c => c.templateId == id && c.defaulFlag == true);
        }

        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<Answer>> GetAnswerNotDefault(int id)
        {
            return await _formDBContext.Answers.FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
