using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmsApp.Models
{
    public partial class XVpnLogin
    {
        public string Id { get; set; }
        public string Telefon { get; set; }
        public string Mesaj { get; set; }
        public DateTime Date { get; set; }
        public string Error { get; set; }
        [NotMapped]
        public string Status { get; set; }
        [NotMapped]
        public string ErrorCode { get; set; }
        [NotMapped]
        public string FullName { get; set; }
    }
}
