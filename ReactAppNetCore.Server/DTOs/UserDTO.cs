using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAppNetCore.Server.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }

        public string username { get; set; }

        public string name { get; set; }
    }
}