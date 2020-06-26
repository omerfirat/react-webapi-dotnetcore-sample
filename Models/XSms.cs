using System;
using System.Collections.Generic;

namespace SmsApp.Models
{
    public partial class XSms
    {
        public int SmsId { get; set; }
        public string Telefon { get; set; }
        public string Mesaj { get; set; }
        public DateTime GirisTarihi { get; set; }
        public DateTime? GonderimTarihi { get; set; }
        public byte? GonderimOk { get; set; }
        public string Kullanici { get; set; }
        public string MesajGrup { get; set; }
        public string MesajId { get; set; }
        public string ErrorCode { get; set; }
        public string Status { get; set; }
    }
}
