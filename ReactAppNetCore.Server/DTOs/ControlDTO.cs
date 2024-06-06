using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace ReactAppNetCore.Server.DTOs
{
    public class ControlDTO
    {
        public int templateId { get; set; }

        public int fieldNo { get; set; }

        public string taskData { get; set; }
    }
}
