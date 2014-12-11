package com.tienda.andree.controllers;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Component;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;

@Component
public class ReportDownloader {

    protected static Logger logger = LoggerFactory.getLogger(ReportDownloader.class);

    @Autowired
    private DriverManagerDataSource dataSource;

    @SuppressWarnings("unchecked")
    public void downloadPDF(HttpServletResponse response, String reportUrl, String filename, HashMap params) throws ClassNotFoundException, JRException, SQLException {
        InputStream reportStream = this.getClass().getResourceAsStream(reportUrl);
        JasperDesign jd = JRXmlLoader.load(reportStream);
        JasperReport jr = JasperCompileManager.compileReport(jd);
        Connection connection=dataSource.getConnection();
        JasperPrint jp = JasperFillManager.fillReport(jr, params, connection);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ReportExporter.exportToPDF(jp, baos);
        response.setHeader("Content-Disposition", "attachment; filename="+ filename);
        //Si se elige esta opcion el pdf se renderizara en el browser y no se descargara automaticamente.
//        response.setHeader("Content-Disposition", "inline; filename="
//                + fileName);
        // Cada formato tiene su propio Content-Type
        response.setContentType("application/pdf");
        response.setContentLength(baos.size());
        writeReportToResponseStream(response, baos);
    }

    @SuppressWarnings("unchecked")
    public void downloadXLS(HttpServletResponse response, String reportUrl, String filename, HashMap params) throws ClassNotFoundException, JRException, SQLException {

        logger.debug("Descargando reporte en formato xls");

        InputStream reportStream = this.getClass().getResourceAsStream(reportUrl);

        JasperDesign jd = JRXmlLoader.load(reportStream);

        JasperReport jr = JasperCompileManager.compileReport(jd);

        Connection connection=dataSource.getConnection();

        JasperPrint jp = JasperFillManager.fillReport(jr, params, connection);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ReportExporter.exportToXLS(jp, baos);

        response.setHeader("Content-Disposition", "inline; filename="+ filename);
        response.setContentType("application/vnd.ms-excel");
        response.setContentLength(baos.size());
        writeReportToResponseStream(response, baos);
    }

    private void writeReportToResponseStream(HttpServletResponse response, ByteArrayOutputStream baos) {
        logger.debug("Escribiendo reporte al stream");
        try {
            ServletOutputStream outputStream = response.getOutputStream();
            baos.writeTo(outputStream);
            outputStream.flush();

        } catch (Exception e) {
            logger.error("No se pudo escribir el reporte al outputstream");
        }
    }

}

