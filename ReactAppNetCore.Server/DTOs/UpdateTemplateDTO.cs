using ReactAppNetCore.Server.Models;

namespace ReactAppNetCore.Server.DTOs
{
    public class UpdateTemplateDTO
    {
        public List<ControlDTO> controlUpdates {  get; set; }
        public AnswerDTO? answerUpdate { get; set; }
    }
}
