using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAppNetCore.Server.Models
{
    [TableAttribute("user")]
    public class User
    {
        [ColumnAttribute("id")]
        public int Id { get; set; }

        [ColumnAttribute("username")]
        public string username { get; set; }

        [ColumnAttribute("name")]
        public string name { get; set; }
    }
}