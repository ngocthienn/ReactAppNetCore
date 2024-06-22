using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace ReactAppNetCore.Server.DTOs
{
    public class AnswerDTO
    {
        public int? Id { get; set; }

        public int? templateId { get; set; }

        public string? username { get; set; }

        public JsonDocument answerData { get; set; }

        public Boolean? defaultFlag { get; set; }
    }
}
