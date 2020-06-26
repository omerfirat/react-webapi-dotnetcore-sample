using System;
using System.Collections.Generic;

namespace SmsApp.Models
{
    public partial class XAuthentications
    {
        public string EmpId { get; set; }
        public string AuthId { get; set; }
        public string AnswerFieldOne { get; set; }
        public string AnswerFieldTwo { get; set; }
        public string AnswerFieldThree { get; set; }
        public byte[] AnswerFieldFour { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? LastUpd { get; set; }
        public string LastUpdBy { get; set; }
        public string Status { get; set; }
        public string Encrypted { get; set; }
        public string Method { get; set; }
        public bool NeverExpires { get; set; }
    }
}
