using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using CCTS.TSF.Business;
using CCTS.TSF.Model;
using CCTS.TSF.Model.Common;
using Microsoft.Extensions.Options;
using Mindscape.Raygun4Net;
// William Thompson
using Microsoft.AspNetCore.Cors;
using System.Linq;

namespace CCTS.TSF.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly IAdminManager _adminManager;
        private readonly AppSettingsModel _settings;

        public AdminController(IOptions<AppSettingsModel> settings, IAdminManager adminManager)
        {
            _adminManager = adminManager;
            _settings = settings.Value;
        }

        [HttpGet("getstatetargets")]
        public async Task<IActionResult> GetStateTargets()
        {
            try
            {
                var results = await _adminManager.GetStateTargets();
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new {error = ex.Message});
            }
        }

        [HttpPost("addtarget")]
        public async Task<IActionResult> AddTarget([FromBody] StateTarget target)
        {
            try
            {
                var results = await _adminManager.AddTarget(target);
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new {error = ex.Message});
            }
        }

        [HttpPost("updatetarget")]
        public async Task<IActionResult> UpdateTarget([FromBody] StateTarget target)
        {
            try
            {
                var results = await _adminManager.UpdateTarget(target);
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new {error = ex.Message});
            }
        }

        [HttpGet("getimports")]
        public async Task<IActionResult> GetImportsList()
        {
            try
            {
                var results = await _adminManager.GetImportsList();
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new {error = ex.Message});
            }
        }

        [HttpPost("importfile")]
        public async Task<IActionResult> ImportFile()
        {
            try
            {
                var body = Content(Request.Body.ToString());
                var file = new StreamReader(Request.Body).ReadToEnd();
                return Ok(file);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new {error = ex.Message});
            }
        }

        [HttpDelete("deleteimport/{id}")]
        public async Task<IActionResult> DeleteImport(int id)
        {
            try
            {
                var results = await _adminManager.DeleteImport(id);
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new {error = ex.Message});
            }
        }

        [HttpGet("getImportErrors/{id}")]
        public async Task<IActionResult> GetImportErrors(int id)
        {
            try
            {
                var results = await _adminManager.GetImportErrors(id);
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new {error = ex.Message});
            }
        }

        [HttpGet("getImportRowDetail/{id}/{rowId}")]
        public async Task<IActionResult> GetImportRowDetail(int id, int rowId)
        {
            try
            {
                var results = await _adminManager.GetImportRowDetails(id, rowId);
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new {error = ex.Message});
            }
        }

        [HttpGet("getDistricts")]
        public async Task<IActionResult> getDistricts()
        {
            try
            {
                var results = await _adminManager.GetDistricts();
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("getAgenciesccts")]
        public async Task<IActionResult> GetAgenciesCCTS()
        {
            try
            {
                var results = await _adminManager.GetAgenciesCCTS();
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("addDistrict")]
        public async Task<IActionResult> AddDistrict([FromBody] Agency agency)
        {
            try
            {
                var results = await _adminManager.AddDistrict(agency);
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new { error = ex.Message });
            }
        }


        [HttpPost("updateDistrict")]
        public async Task<IActionResult> UpdateDistrict([FromBody] UpdateDistrict updateDistrict)
        {
            try
            {
                var results = await _adminManager.UpdateDistrict(updateDistrict);
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete("deleteDistrict/{id}")]
        public async Task<IActionResult> DeleteDistrict(int id)
        {
            try
            {
                var results = await _adminManager.DeleteDistrict(id);
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("getUsersList/{id}")]
        public async Task<IActionResult> GetUsersList(int id)
        {
            try
            {
                var email = "stanleyd@seattleu.edu";
                var results = await _adminManager.GetUsersList(id, email);
                return Ok(results);
            }
            catch(Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("deleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var results = await _adminManager.DeleteUser(id);
                return Ok(results);
            }
            catch(Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new { error = ex.Message });
            }
        }

        // William Thompson snippet starts 2/5/18
        [EnableCors("CorsPolicy")]
        [HttpGet("surveys/{id}", Name = "GetSurvey")]
        public async Task<IActionResult> GetSurvey(int id)
        {
            try
            {
                var results =  _adminManager.GetSurvey(id);
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new { error = ex.Message });
            }
        }

        [EnableCors("CorsPolicy")]
        [HttpGet("surveys")]
        public async Task<IActionResult> GetSurveys()

        {
            try
            {
                var results =  _adminManager.GetSurveys().OrderByDescending(i => i.Id);
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new { error = ex.Message });
            }
        }

        [EnableCors("CorsPolicy")]
        [HttpPost("surveys")]
        public IActionResult Post([FromBody] SurveyCreateDTO survey)
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
                _adminManager.AddSurvey<SurveyCreateDTO>(surveyToAdd);
                _adminManager.SurveySave();
                
                return CreatedAtRoute("GetSurvey", new { id = surveyToAdd.Id }, surveyToAdd);
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
                       
        }

        [EnableCors("CorsPolicy")]
        [HttpPut("surveys/{id}")]
        public IActionResult Put(int id, [FromBody]SurveyUpdateDTO survey)
        {
            if (survey == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var surveyExists = _adminManager.SurveyExists(id);
            if (!surveyExists) return NotFound();
            _adminManager.UpdateSurvey<SurveyUpdateDTO>(id, survey);
            _adminManager.SurveySave();

            return NoContent();
        }

        [EnableCors("CorsPolicy")]
        [HttpDelete("surveys/{id}")]
        public IActionResult Delete(int id)
        {
            var surveyToDelete = _adminManager.GetSurvey(id);
            if (surveyToDelete == null) return NotFound();

            _adminManager.DeleteSurvey<SurveyDTO>(surveyToDelete);
            _adminManager.SurveySave();

            return NoContent();
        }
        // William Thompson snippet ends

        // SurveyQuestionDetail William Thompson

        [EnableCors("CorsPolicy")]
        [HttpGet("surveyQuestionDetails", Name = "GetSurveyQuestionDetails")]
        public async Task<IActionResult> GetSurveyQuestionDetails()
        {
            try
            {
                var results = _adminManager.GetSurveyQuestionDetails();
                return Ok(results);
            }
            catch (Exception ex)
            {
                await new RaygunClient(_settings.ApiKey).SendInBackground(ex);
                return BadRequest(new { error = ex.Message });
            }
        }

        [EnableCors("CorsPolicy")]
        [HttpGet("surveyQuestionDetails/{id}", Name = "GetSurveyQuestionDetail")]
        public IActionResult Get(int id)
        {
            var surveyQuestionDetail = _adminManager.GetSurveyQuestionDetail(id);

            if (surveyQuestionDetail == null) return NotFound();

            return Ok(surveyQuestionDetail);
        }

        [EnableCors("CorsPolicy")]
        [HttpPost("surveyQuestionDetails", Name = "PostSurveyQuestionDetail")]
        public IActionResult Post([FromBody] SurveyDTO survey)

        {

            if (survey == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _adminManager.AddSurveyQuestionDetail(survey);

            return NoContent();

        }

        // William Thompson snippet ends


    }
}
