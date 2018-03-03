using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.IO;
using AspNetCoreWebAPI.Services;
using AspNetCoreWebAPI.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using AutoMapper;
using Serilog;
using Serilog.Events;

namespace AspNetCoreWebAPI
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true);

            if (env.IsDevelopment())
            {
                builder.AddUserSecrets<Startup>();
            }

            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .WriteTo.Console()
               
                .CreateLogger();

            Configuration = builder.Build();

        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddLogging(loggingBuilder =>
            loggingBuilder.AddSerilog(dispose: true));
            
            services.AddDirectoryBrowser();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            var conn = Configuration["connectionStrings:sqlConnection"];
            //var conn = Configuration["connectionStrings:CCTSTSFContext"];
            
            services.AddDbContext<SqlDbContext>(options =>
                options.UseSqlServer(conn));


            services.AddScoped(typeof(IGenericEFRepository), typeof(GenericEFRepository));
            services.AddScoped(typeof(ISurveyRepository), typeof(SurveySqlRepository));
            services.AddScoped(typeof(ISurveyQuestionDetailRepository), typeof(SurveyQuestionDetailSqlRepository));
            services.AddScoped(typeof(ISurveyQuestionRepository), typeof(SurveyQuestionSqlRepository));

            services.AddMvc();

            //automapper William Thompson
            services.AddAutoMapper(typeof(Startup)); 

            // CORS
            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("CorsPolicy"));

            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        // logging update, William Thompson 1/15/2017 see program.cs
        // **NOTE: Serilog logging recommends getting rid of startup logging, but the logging init (2.0) is in main.
        // https://github.com/serilog/serilog-aspnetcore


        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
 

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseDirectoryBrowser();
            app.UseStatusCodePages();

            // CORS William Thompson
            app.UseCors("CorsPolicy");

            app.UseCors(builder =>
               builder.WithOrigins("http://localhost:4200"));

            // IMPORTANT: Make sure UseCors() is called BEFORE this
            app.UseMvc();


        }
    }
}
