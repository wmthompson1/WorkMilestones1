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
    [Route("api/admin/surveyBase")]
    public class SurveyBaseController : Controller
    {


        ISurveyBaseRepository _rep;
        public SurveyBaseController(ISurveyBaseRepository rep, IMapper mapper) // 
        {
            _rep = rep;

        }


        [HttpGet]
        public IActionResult GetSurveyBase()
        {
            var surveyBase = _rep.GetSurveyBase();

            if (surveyBase == null) return NotFound();

            return Ok(surveyBase);
        }

        [HttpGet("{id}", Name = "GetSurveyBaseById")]
        public IActionResult GetSurveyBaseById(int id)
        {
            var surveyBase = _rep.GetSurveyBaseById(id);

            if (surveyBase == null) return NotFound();

            return Ok(surveyBase);
        }


        [HttpPost]
        public IActionResult PostSurveyBase([FromBody] SurveyBaseNoDateDTO surveyBase)

        {

            if (surveyBase == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _rep.AddSurveyBase(surveyBase);


            return CreatedAtRoute("GetSurveyBaseById", new { id = surveyBase.Id }, surveyBase);

        }
    }
}
