using AspNetCoreWebAPI.Models;
using AspNetCoreWebAPI.Services;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using AutoMapper;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using AspNetCoreWebAPI.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Logging;

namespace AspNetCoreWebAPI.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/admin/surveyTransactions")]
    public class SurveyTransactionsController : Controller
    {

        private AutoMapper.IMapper _mapper;

        ISurveyTransactionRepository _rep;
        public SurveyTransactionsController(ISurveyTransactionRepository rep, IMapper mapper) // 
        {
            _rep = rep;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get()
        {

            return Ok(_rep.GetSurveyTransactions());
        }

        [HttpGet("{id}", Name = "GetSurveyTransaction")]
        public IActionResult GetSurveyTransaction(int id)
        {
            var surveyTransaction = _rep.GetSurveyTransaction(id);

            if (surveyTransaction == null) return NotFound();

            return Ok(surveyTransaction);
        }

        //// TODO: Add remaining fields for the table
        //[HttpPost]
        //public IActionResult Post([FromBody] SurveyTransactionUpdateDTO surveyTransaction)
        //{
        //    if (surveyTransaction == null) return BadRequest();
        //    if (!ModelState.IsValid) return BadRequest(ModelState);

        //    // map dto to entity

        //    var surveyTransactionToAdd = new SurveyTransactionDTO
        //    {
        //        Id   = surveyTransaction.Id,
        //        BatchId = surveyTransaction.BatchId,
        //        LeaverYear = surveyTransaction.LeaverYear,
        //        CopyFromId = surveyTransaction.CopyFromId,

        //    };

        //    try
        //    {
        //        // save 

        //        _rep.AddSurveyTransaction(surveyTransactionToAdd);
        //        _rep.SaveSurveyTransaction();


        //        return CreatedAtRoute("GetSurveyTransaction", new { id = surveyTransactionToAdd.Id }, surveyTransactionToAdd);
        //    }
        //    catch (AppException ex)
        //    {
        //        // return error message if there was an exception
        //        return BadRequest(ex.Message);
        //    }



        //}

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]SurveyTransactionUpdateDTO surveyTransaction)
        {
            if (surveyTransaction == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var surveyTransactionExists = _rep.SurveyTransactionExists(id);
            if (!surveyTransactionExists) return NotFound();
            _rep.UpdateSurveyTransaction(id, surveyTransaction);
            _rep.SaveSurveyTransaction();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public IActionResult Patch(int id, [FromBody]JsonPatchDocument<SurveyTransactionUpdateDTO> surveyTransaction)
        {
            if (surveyTransaction == null) return BadRequest();
            var surveyTransactionToUpdate = _rep.GetSurveyTransaction(id);
            if (surveyTransactionToUpdate == null) return NotFound();
            var surveyTransactionPatch = new SurveyTransactionUpdateDTO()
            {
                BatchId = surveyTransactionToUpdate.BatchId,
            };

            surveyTransaction.ApplyTo(surveyTransactionPatch, ModelState);

            if (!ModelState.IsValid) return BadRequest(ModelState);

            //if (surveyTransactionPatch.something < 1534)
            //    ModelState.AddModelError("Established",
            //        "This would be an example of back-end data-validation");

            if (!ModelState.IsValid) return BadRequest(ModelState);

            _rep.UpdateSurveyTransaction(id, surveyTransactionPatch);
            _rep.SaveSurveyTransaction();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var surveyTransactionToDelete = _rep.GetSurveyTransaction(id);
            if (surveyTransactionToDelete == null) return NotFound();

            _rep.DeleteSurveyTransaction(surveyTransactionToDelete);
            _rep.SaveSurveyTransaction();

            return NoContent();
        }
    }
}
