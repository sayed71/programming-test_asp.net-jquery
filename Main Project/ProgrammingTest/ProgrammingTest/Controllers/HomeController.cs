using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using Grpc.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace ProgrammingTest.Controllers
{
    public class HomeController : Controller
    {
        private IHostingEnvironment _env;

        public HomeController(IHostingEnvironment env)
        {
            _env = env;
        }

        public IActionResult Index()
        {
            return View();
        }

        //Save Operation (Output.txt File)
        public string SaveData(string NumericValue, string AlphanumericValue, string FloatValue)
        {
            try
            {
                if (NumericValue != null || AlphanumericValue != null  || FloatValue != null)
                {
                    var UserData = NumericValue + "," + AlphanumericValue + "," + FloatValue + Environment.NewLine;

                    var webRoot = _env.WebRootPath;
                    var path = System.IO.Path.Combine(webRoot, "file/Output.txt");
                    //System.IO.File.WriteAllText(file, UserData);
                    System.IO.File.AppendAllText(path, UserData);

                    long length = new System.IO.FileInfo(path).Length;

                    return length.ToString();
                }
                else
                {
                    return "No";
                }
            }
            catch
            {
                return "No";
            }
        }

        //Calculate Text File Size
        public string CheckFileSize()
        {
            try
            {
                var webRoot = _env.WebRootPath;
                var path = System.IO.Path.Combine(webRoot, "file/Output.txt");

                long length = new System.IO.FileInfo(path).Length;

                return length.ToString();
            }
            catch
            {
                return "0";
            }
        }

        //Remove All Data (Text File)
        public string DeleteFileData()
        {
            try
            {
                var webRoot = _env.WebRootPath;
                var path = System.IO.Path.Combine(webRoot, "file/Output.txt");

                System.IO.File.WriteAllText(path, String.Empty);

                long length = new System.IO.FileInfo(path).Length;

                return length.ToString();
            }
            catch
            {
                return "No";
            }
        }

        //Show Report Summary (Data Type Wise) - Page 2
        public string ReportSummary()
        {
            try
            {
                int CountTotalData = 0;
                int CountNumericData = 0;
                int CountAlphanumericData = 0;
                int CountFloatData = 0;

                var webRoot = _env.WebRootPath;
                var path = System.IO.Path.Combine(webRoot, "file/Output.txt");

                string[] Mylines = System.IO.File.ReadAllLines(path, Encoding.UTF8);
                int TotalLine = Mylines.Length;

                if (TotalLine > 0)
                {
                    foreach (var lines in Mylines)
                    {
                        string[] arr = lines.Split(',');

                        string NumericData = arr[0].Trim().ToString();
                        string AlphanumericData = arr[1].Trim().ToString();
                        string FloatData = arr[2].Trim().ToString();

                        if (NumericData != "" && NumericData != null && NumericData != "null")
                        {
                            ++CountTotalData;
                            ++CountNumericData;
                        }

                        if (AlphanumericData != "" && AlphanumericData != null && AlphanumericData != "null")
                        {
                            ++CountTotalData;
                            ++CountAlphanumericData;
                        }

                        if (FloatData != "" && FloatData != null && FloatData != "null")
                        {
                            ++CountTotalData;
                            ++CountFloatData;
                        }
                    }
                }

                return CountTotalData.ToString() + "," + CountNumericData.ToString() + "," + CountAlphanumericData.ToString() + "," + CountFloatData.ToString();
            }
            catch
            {
                return "".ToString();
            }
        }

        //Show First 20 Data (Page 2) - Report
        public string GetReportData()
        {
            try
            {
                string FetchData = "";

                var webRoot = _env.WebRootPath;
                var path = System.IO.Path.Combine(webRoot, "file/Output.txt");

                string[] Mylines = System.IO.File.ReadAllLines(path, Encoding.UTF8);
                int TotalLine = Mylines.Length;

                if (TotalLine > 0)
                {
                    int Serial = 0;
                    foreach (var lines in Mylines)
                    {
                        string[] arr = lines.Split(',');

                        string NumericData = arr[0].Trim().ToString();
                        string AlphanumericData = arr[1].Trim().ToString();
                        string FloatData = arr[2].Trim().ToString();

                        if(NumericData != "" && NumericData != null && NumericData != "null")
                        {
                            FetchData += NumericData + " - Numeric,";
                            ++Serial;
                        }

                        if (AlphanumericData != "" && AlphanumericData != null && AlphanumericData != "null")
                        {
                            FetchData += AlphanumericData + " - Alphanumeric,";
                            ++Serial;
                        }

                        if (FloatData != "" && FloatData != null && FloatData != "null")
                        {
                            FetchData += FloatData + " - Float,";
                            ++Serial;
                        }

                        if (Serial>19)
                        {
                            break;
                        }
                    }
                }

                return FetchData.ToString();
            }
            catch
            {
                return "".ToString();
            }
        }
    }
}
