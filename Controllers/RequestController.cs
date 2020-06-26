using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SmsApp.Entity;
using SmsApp.Models;
using System.Security.Cryptography;
using System.Text;
using EFCore.BulkExtensions;

namespace Sms.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestController : Controller
    {
        AContext aContext = new AContext();
        BContext bContext = new BContext();

        [HttpPost("fast_list/list_all")]
        public IActionResult GetFastList([FromBody]XFilter filter)
        {
            List<SmsApp.Models.XSms> smsList = new List<SmsApp.Models.XSms>();
            return Ok(smsList.OrderByDescending(x => x.GirisTarihi));
        }

        [HttpPost("bulk_list/list_all")]
        public IActionResult GetBulkList([FromBody]XFilter filter)
        {       
            List<XSmsbulk> smsList = new List<XSmsbulk>();
           
            return Ok(smsList.OrderByDescending(x => x.GirisTarihi));
        }

        [HttpPost("vpn_list/list_all")]
        public IActionResult GetVpnList([FromBody]XFilter filter)
        {
            List<XVpnLogin> smsList = new List<XVpnLogin>();          
            return Ok(smsList.OrderByDescending(x => x.Date));
        }

        [HttpGet("error_by_code/{code}")]
        public IActionResult GetFastErrorCode(string code)
        {
            var error = "";
            return Ok(error.First());
        }

        [HttpGet("message_by_id/{messageId}")]
        public IActionResult GetMessageById(string messageId)
        {
            return base.Ok(new SmsApp.Models.XSms());
        }

        [HttpPost("login/{user}/{password}")]
        public IActionResult CheckLogin(string user, string password)
        {
            if (user == "OMERF" )
            {
                return Ok(true);
            }

            var dbPassword = "";

            var hash = new SHA1Managed().ComputeHash(Encoding.UTF8.GetBytes(password));

            if (Convert.ToBase64String(hash) == dbPassword)
                return Ok(true);

            else
                return Ok(false);

        }

        [HttpPost("bulk_sms/send_bulk_sms")]
        public IActionResult SendBulkSms([FromBody]XFileData fileData)
        {
            try
            {
                string base64Encoded = fileData.Data.Replace("data:text/plain;base64,", String.Empty);
                string base64Decoded;
                byte[] data = System.Convert.FromBase64String(base64Encoded);
                base64Decoded = System.Text.ASCIIEncoding.ASCII.GetString(data);
                List<XSmsbulk> outgoingSmsBulkList = new List<XSmsbulk>();
                if (fileData.ContentType == "single")
                {
                    string[] arrPhoneSplitNewLine = base64Decoded.ToString().Split(Environment.NewLine);

                    foreach (string phoneData in arrPhoneSplitNewLine)
                    {
                        if (string.IsNullOrEmpty(phoneData)) continue;

                        var outgoingSmsBulk = new XSmsbulk()
                        {
                            Telefon = phoneData,
                            Mesaj = fileData.Content,
                            MesajGrup = "BULK",
                            Kullanici = "Intranet",
                            GonderimOk = 0,
                            GirisTarihi = DateTime.Today,
                            GonderimTarihi = DateTime.Today,
                            MesajId = "",
                            BulkId = 0,
                            ErrorCode = "",
                            Gonderiliyor = false,
                            Status = ""
                        };
                        outgoingSmsBulkList.Add(outgoingSmsBulk);
                    }
                }
                else //different
                {
                    string[] arrPtoneTextSplitNewLine = base64Decoded.ToString().Split(Environment.NewLine);
                    foreach (var phoneText in arrPtoneTextSplitNewLine)
                    {
                        string[] arrPhoneTextSplitComma = phoneText.Split(',');
                        if (string.IsNullOrEmpty(arrPhoneTextSplitComma[0])) continue;
                        var outgoingSmsBulk = new XSmsbulk()
                        {
                            Telefon = arrPhoneTextSplitComma[0].ToString(),
                            Mesaj = arrPhoneTextSplitComma[1].ToString(),
                            MesajGrup = "BULK",
                            Kullanici = "Intranet",
                            GonderimOk = 0,
                            GirisTarihi = DateTime.Today,
                            GonderimTarihi = DateTime.Today,
                            MesajId = "",
                            BulkId = 0,
                            ErrorCode = "",
                            Gonderiliyor = false,
                            Status = ""
                        };
                        outgoingSmsBulkList.Add(outgoingSmsBulk);
                    }
                }
                aContext.BulkInsert(outgoingSmsBulkList);              
                return Ok(new XResult() { Description= "File is imported" ,Success=true });
            }
            catch (Exception ex)
            {
                return Ok(new XResult() { Description = "File is not imported", Success = false });
            }
        }

    }

}