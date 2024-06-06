using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace ReactAppNetCore.Server.Models
{
    [Table("control")]
    public class Control
    {
        [Key]
        [Column("template_id")]
        public int templateId { get; set; }


        [Column("field_no")]
        public int fieldNo { get; set; }

        [Column("task_data")]
        public JsonDocument taskData { get; set; }

        public virtual Template template { get; set; }
    }
}
