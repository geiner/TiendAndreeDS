package com.tienda.andree.services.implement;

import com.tienda.andree.controllers.ReportDownloader;
import com.tienda.andree.services.ReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;


/**
 * Service para procesamiento de reportes jasper.
 */
@Service
public class ReportServiceImpl implements ReportService {

    protected static Logger logger = LoggerFactory.getLogger(ReportServiceImpl.class);

    @Autowired
    private ReportDownloader reportDownloader;

    @Autowired
    ServletContext context;

    @Override
    public void BoletaVenta(HttpServletResponse response, String nombres, String apellidos, Integer dni, String direccion, Integer n_pedido, String usuario) {
        String rutaReporte="/reportes/boleta_venta.jrxml";
        HashMap params = new HashMap();
        params.put("nombres", nombres);
        params.put("apellidos", apellidos);
        params.put("dni", dni);
        params.put("direccion", direccion);
        params.put("n_pedido", n_pedido);
        params.put("usuario", usuario);
        try {
            System.out.println("download");
            reportDownloader.downloadPDF(response, rutaReporte, "boleta.pdf", params);
        } catch (Exception e) {
            System.out.println("catch");
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }

    @Override
    public void FacturaVenta(HttpServletResponse response, String nombres, String apellidos, Integer dni, String direccion, Integer n_pedido, String usuario, String ruc) {
        String rutaReporte="/reportes/factura_venta.jrxml";
        HashMap params = new HashMap();
        params.put("nombres", nombres);
        params.put("apellidos", apellidos);
        params.put("dni", dni);
        params.put("direccion", direccion);
        params.put("n_pedido", n_pedido);
        params.put("usuario", usuario);
        params.put("ruc", ruc);
        try {
            System.out.println("download");
            reportDownloader.downloadPDF(response, rutaReporte, "factura.pdf", params);
        } catch (Exception e) {
            System.out.println("catch");
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }
}
