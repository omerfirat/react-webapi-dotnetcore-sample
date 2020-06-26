using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SmsApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Sms.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class XController : ControllerBase
    {
        AContext db = new AContext();
        XappConfig _appConfig;
        public XController(IOptions<XappConfig> appConfig)
        {
            _appConfig = appConfig.Value;
        }

        [HttpGet]
        
        public IEnumerable<SmsApp.Models.XSms> Get()
        {

            var sxSmslist = (from p in db.XSms
                           select p).ToList().Take(100);

            return sxSmslist;
        }

    }
}
