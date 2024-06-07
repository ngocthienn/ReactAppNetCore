using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace ReactAppNetCore.Server.Models
{
    [Table("answer")]
    public class Answer
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("template_id")]
        public int templateId { get; set; }

        [Column("username")]
        public string username { get; set; }

        [Column("answer_data")]
        public JsonDocument answerData { get; set; }

        [Column("defaul_flag")]
        public Boolean defaulFlag { get; set; }

        public virtual Template template { get; set; }
    }
}
