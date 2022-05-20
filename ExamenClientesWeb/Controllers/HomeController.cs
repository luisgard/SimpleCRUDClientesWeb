using ExamenDatos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExamenClientesWeb.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public JsonResult List()
        {
            return Json(ExamenDatos.Data.GetListaClientes(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Cliente cliente)
        {
            return Json(ExamenDatos.Data.InsertCliente(cliente), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var Clientetemp = ExamenDatos.Data.GetListaClientesByID(ID);
            return Json(Clientetemp, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Cliente cliente)
        {
            return Json(ExamenDatos.Data.UpdateCliente(cliente), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(ExamenDatos.Data.DeleteCliente(ID), JsonRequestBehavior.AllowGet);
        }
    }
}