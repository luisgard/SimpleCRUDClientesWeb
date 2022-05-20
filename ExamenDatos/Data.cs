using ExamenDatos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExamenDatos
{
    public static class Data
    {


        public static List<Cliente> GetListaClientes()

        {

            List<Cliente> tempList;

            using (DsClientesTableAdapters.TA_CLIENTES taClientes = new DsClientesTableAdapters.TA_CLIENTES())
            {
                tempList = taClientes.GetData().Select(a => new Cliente() { Id = a.ID, Nombre = a.NOMBRE.Trim(), Rfc = a.RFC.Trim(), Direccion = a.DIRECCION.Trim(), Cp = a.CP.Trim(), Correo = a.CORREO.Trim() }).ToList();
            }

            return tempList;

        }

        public static Cliente GetListaClientesByID(int id)

        {

            Cliente tempList;

            using (DsClientesTableAdapters.TA_CLIENTES taClientes = new DsClientesTableAdapters.TA_CLIENTES())
            {
                tempList = taClientes.GetDataByID(id).Select(a => new Cliente() { Id = a.ID, Nombre = a.NOMBRE.Trim(), Rfc = a.RFC.Trim(), Direccion = a.DIRECCION.Trim(), Cp = a.CP.Trim(), Correo = a.CORREO.Trim() }).ToList().FirstOrDefault();
            }

            return tempList;

        }
        public static bool ExisteRFC(string rfc)

        {

            bool result = false;

            using (DsClientesTableAdapters.TA_CLIENTES taClientes = new DsClientesTableAdapters.TA_CLIENTES())
            {
                if(taClientes.GetDataByRFC(rfc).Count > 0)
                {
                    result = true;
                }
            }


            return result;
        }


        public static string UpdateCliente(Cliente cliente)

        {

            string result = string.Empty;
            try
            {
                using (DsClientesTableAdapters.TA_CLIENTES taClientes = new DsClientesTableAdapters.TA_CLIENTES())
                {
                    taClientes.UpdateCliente(cliente.Nombre, cliente.Rfc, cliente.Direccion, cliente.Cp, cliente.Correo, cliente.Id);
                }
            }
            catch (Exception exp)
            {
                result = exp.Message;
            }

            return result;

        }
        public static string DeleteCliente(int idCliente)

        {

            string result = string.Empty;
            try
            {
                using (DsClientesTableAdapters.TA_CLIENTES taClientes = new DsClientesTableAdapters.TA_CLIENTES())
                {
                    taClientes.DeleteCliente(idCliente);
                }
            }
            catch (Exception exp)
            {
                result = exp.Message;
            }

            return result;

        }
        public static string InsertCliente(Cliente cliente)

        {

            string result = string.Empty;
            if (ExisteRFC(cliente.Rfc))
            {
                result = $"No se creo u nuevo registro ya que El RFC ({cliente.Rfc}) ya existe, favor de verificar";
            }
            else
            {
                try
                {
                    using (DsClientesTableAdapters.TA_CLIENTES taClientes = new DsClientesTableAdapters.TA_CLIENTES())
                    {
                        taClientes.InsertCliente(cliente.Nombre, cliente.Rfc, cliente.Direccion, cliente.Cp, cliente.Correo);
                    }
                }
                catch (Exception exp)
                {
                    result = exp.Message;
                }
            }

            return result;

        }


    }
}
