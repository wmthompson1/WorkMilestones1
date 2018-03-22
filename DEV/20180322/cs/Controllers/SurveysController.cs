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
    [Route("api/admin/surveys")]
    public class SurveysController : Controller
    {

        private AutoMapper.IMapper _mapper;

        ISurveyRepository _rep;
        public SurveysController(ISurveyRepository rep, IMapper mapper) // 
        {
            _rep = rep;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetSurvey()
        {

            return Ok(_rep.GetSurveys());
        }

        [HttpGet("{id}", Name = "GetSurvey")]
        public IActionResult GetSurvey(int id)
        {
            var survey = _rep.GetSurvey(id);

            if (survey == null) return NotFound();

            return Ok(survey);
        }

        // TODO: Add remaining fields for the table
        [HttpPost]
        public IActionResult PostSurvey([FromBody] SurveyCreateDTO survey)
        {
            if (survey == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // map dto to entity

            var surveyToAdd = new SurveyDTO
            {
                Name = survey.Name,
                Description = survey.Description,
                SurveyTypeCode = survey.SurveyTypeCode,
                Instructions = survey.Instructions,
                IsLocked = survey.IsLocked,

                CloseDate = survey.CloseDate,
                CreateDate = survey.CreateDate,
                CreatedBy = survey.CreatedBy,
                UpdateDate = survey.UpdateDate,
                UpdatedBy = survey.UpdatedBy,

                SchoolYear = survey.SchoolYear,
                LeaverYear = survey.LeaverYear,
                IsReported = survey.IsReported,
                OpenDate = survey.OpenDate

            };

            try
            {
                // save 

                _rep.AddSurvey(surveyToAdd);
                _rep.Save();


                return CreatedAtRoute("GetSurvey", new { id = surveyToAdd.Id }, surveyToAdd);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }



        }

        [HttpPut("{id}")]
        public IActionResult PutSurvey(int id, [FromBody]SurveyUpdateDTO survey)
        {
            if (survey == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var surveyExists = _rep.SurveyExists(id);
            if (!surveyExists) return NotFound();
            _rep.UpdateSurvey(id, survey);
            _rep.Save();

            return NoContent();
        }

        [HttpPut("noDate/{id}")]
        public IActionResult PutSurveyNoDate(int id, [FromBody]SurveyUpdateNoDateDTO survey)
        {
            if (survey == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var surveyExists = _rep.SurveyExists(id);
            if (!surveyExists) return NotFound();
            _rep.UpdateSurveyNoDate(id, survey);
            _rep.Save();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public IActionResult PatchSurvey(int id, [FromBody]JsonPatchDocument<SurveyUpdateDTO> survey)
        {
            if (survey == null) return BadRequest();
            var surveyToUpdate = _rep.GetSurvey(id);
            if (surveyToUpdate == null) return NotFound();
            var surveyPatch = new SurveyUpdateDTO()
            {
                Name = surveyToUpdate.Name,
            };

            survey.ApplyTo(surveyPatch, ModelState);

            if (!ModelState.IsValid) return BadRequest(ModelState);

            //if (surveyPatch.something < 1534)
            //    ModelState.AddModelError("Established",
            //        "This would be an example of back-end data-validation");

            if (!ModelState.IsValid) return BadRequest(ModelState);

            _rep.UpdateSurvey(id, surveyPatch);
            _rep.Save();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSurvey(int id)
        {
            var surveyToDelete = _rep.GetSurvey(id);
            if (surveyToDelete == null) return NotFound();

            _rep.DeleteSurvey(surveyToDelete);
            _rep.Save();

            return NoContent();
        }
    }
}
