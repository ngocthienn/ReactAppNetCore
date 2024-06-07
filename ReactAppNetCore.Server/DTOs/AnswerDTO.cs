using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace ReactAppNetCore.Server.DTOs
{
    public class AnswerDTO
    {
        public int Id { get; set; }

        public int templateId { get; set; }

        public string username { get; set; }

        public string answerData { get; set; }

        public Boolean defaulFlag { get; set; }
    }
}
