using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using ReactAppNetCore.Server.DTOs;
using ReactAppNetCore.Server.Models;
using ReactAppNetCore.Server.Repositories;
using System.Text.Json;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ReactAppNetCore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        private readonly FormDBContext _formDBContext;

        public TemplateController(FormDBContext formDBContext)
        {
            _formDBContext = formDBContext;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Template>>> GetTemplates()
        {
            return await _formDBContext.Templates.ToListAsync();
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Control>>> GetControls()
        {
            return await _formDBContext.Controls.OrderBy(c => c.fieldNo).ToListAsync();
        }

        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<IEnumerable<Control>>> GetControl(int id)
        {
            return await _formDBContext.Controls.Where(c => c.templateId == id).OrderBy(c => c.fieldNo).ToListAsync();
        }

        //[HttpPost("[action]/{id?}")]
        //public async Task<ActionResult> UpdateControlWithTemplateId(int? id, [FromBody] List<ControlDTO> itemsToUpdate)
        //{
        //    int fieldNo = 0;
        //    if (id == null)
        //    {
        //        var template = new Template();
        //        template.name = "name";
        //        await _formDBContext.Templates.AddAsync(template);
        //        _formDBContext.SaveChanges();
        //        foreach (var item in itemsToUpdate)
        //        {
        //            var update = new Control();
        //            update.templateId = template.Id;
        //            update.fieldNo = ++fieldNo;
        //            update.taskData = JsonDocument.Parse(item.taskData);
        //            await _formDBContext.Controls.AddAsync(update);
        //        }
        //        _formDBContext.SaveChanges();
        //    }
        //    else
        //    {
        //        var itemsInDb = await _formDBContext.Controls.Where(i => i.templateId == id).ToListAsync();

        //        if (itemsInDb == null)
        //        {
        //            return NotFound();
        //        }

        //        var itemsToDelete = await _formDBContext.Controls.Where(i => i.templateId == id).ToListAsync();
        //        _formDBContext.Controls.RemoveRange(itemsToDelete);

        //        foreach (var item in itemsToUpdate)
        //        {
        //            var update = new Control();
        //            update.templateId = (int)id;
        //            update.fieldNo = ++fieldNo;
        //            update.taskData = JsonDocument.Parse(item.taskData);
        //            await _formDBContext.Controls.AddAsync(update);
        //        }
        //        _formDBContext.SaveChanges();
        //    }
        //    return Ok();
        //}

        [HttpPost("[action]/{id?}")]
        public async Task<ActionResult> UpdateControlWithTemplateId(int? id, [FromBody] UpdateTemplateDTO updateTemplateDTO)
        {
            int fieldNo = 0;
            if (id == null)
            {
                var template = new Template();
                template.name = "name";
                await _formDBContext.Templates.AddAsync(template);
                _formDBContext.SaveChanges();
                foreach (var item in updateTemplateDTO.controlUpdates)
                {
                    var update = new Control();
                    update.templateId = template.Id;
                    update.fieldNo = ++fieldNo;
                    update.taskData = JsonDocument.Parse(item.taskData);
                    await _formDBContext.Controls.AddAsync(update);
                }
                if(updateTemplateDTO.answerUpdate != null)
                {
                    var answer = new Answer();
                    answer.templateId = template.Id;
                    answer.username = "admin";
                    answer.answerData = JsonDocument.Parse(updateTemplateDTO.answerUpdate.answerData);
                    answer.defaulFlag = true;
                    await _formDBContext.Answers.AddAsync(answer);
                }
                _formDBContext.SaveChanges();
            }
            else
            {
                var itemsToDelete = await _formDBContext.Controls.Where(i => i.templateId == id).ToListAsync();

                if (itemsToDelete == null)
                {
                    return NotFound();
                }
                _formDBContext.Controls.RemoveRange(itemsToDelete);

                foreach (var item in updateTemplateDTO.controlUpdates)
                {
                    var update = new Control();
                    update.templateId = (int)id;
                    update.fieldNo = ++fieldNo;
                    update.taskData = JsonDocument.Parse(item.taskData);
                    await _formDBContext.Controls.AddAsync(update);
                }
                
                if (updateTemplateDTO.answerUpdate != null)
                {
                    var itemAnswersToDelete = await _formDBContext.Answers.Where(i => i.Id == id && i.defaulFlag == true).ToListAsync();
                    if (itemsToDelete != null)
                    {
                        _formDBContext.Answers.RemoveRange(itemAnswersToDelete);
                    }
                    var answer = new Answer();
                    answer.templateId = (int)id;
                    answer.username = "admin";
                    answer.answerData = JsonDocument.Parse(updateTemplateDTO.answerUpdate.answerData);
                    answer.defaulFlag = true;
                    await _formDBContext.Answers.AddAsync(answer);
                }
                _formDBContext.SaveChanges();
            }
            return Ok();
        }
    }
}
