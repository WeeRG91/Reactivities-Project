using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ChangePaswordDto
    {
        [Required]
        public string CurrentPassword { get; set; } = string.Empty;
        [Required]
        public string NewPassword { get; set; } = string.Empty;
    }
}
