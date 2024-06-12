using System.ComponentModel.DataAnnotations.Schema;

namespace ReactAppNetCore.Server.Models
{
    [Table("template")]
    public class Template
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public string name { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public ICollection<Control> controls { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public ICollection<Answer> answers { get; set; }

        public Template() {
            controls = new HashSet<Control>();
            answers = new HashSet<Answer>();
        }
    }
}
