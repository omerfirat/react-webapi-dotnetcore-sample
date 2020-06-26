using System;
using System.Collections.Generic;

namespace SmsApp.Models
{
    public partial class XCustomerDetailsView
    {
        public string CustomerId { get; set; }
        public string CustomerExtId { get; set; }
        public string PartyId { get; set; }
        public string CustomerStatus { get; set; }
        public string CustomerType { get; set; }
        public string CiId { get; set; }
        public string OrgGroupId { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Prefix { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Suffix { get; set; }
        public string FullName { get; set; }
        public DateTime? BirthDate { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? LastUpd { get; set; }
        public string LastUpdBy { get; set; }
        public string CustomerStatusId { get; set; }
        public string TaxDistrict { get; set; }
        public string TaxNo { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PartyType { get; set; }
        public string Email { get; set; }
        public string PostalCode { get; set; }
        public string District { get; set; }
        public string IsNative { get; set; }
        public string Fax { get; set; }
        public string MobilePhoneNumber { get; set; }
        public string HomePhoneNumber { get; set; }
        public string IdentityNumber { get; set; }
        public string OtherPhoneNumber { get; set; }
    }
}
