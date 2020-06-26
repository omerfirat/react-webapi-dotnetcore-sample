using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmsApp.Entity
{
    public class XFilter
    {
        public string Customer { get; set; }
        public string Status { get; set; }

        public string Phone { get; set; }
        public DateTime BeginingDate { get; set; }

        public DateTime EndingDate { get; set; }
    }
}
