// Sample GET request handler for getting details in database.

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

package edu;

@WebServlet("/GET")
public class GET extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public GET() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String param1 = request.getParameter("param1");
        String param2 = request.getParameter("param2");
        if (param1 != null && param2 != null) {
            out.println("<html><body>");
            out.println("<h1>GET Request Received</h1>");
            out.println("<p>Parameter1: " + param1 + "</p>");
            out.println("<p>Parameter2: " + param2 + "</p>");
            out.println("</body></html>");
        } else {
            out.println("<html><body>");
            out.println("<h1>GET Request Received</h1>");
            out.println("<p>No parameters provided</p>");
            out.println("</body></html>");
        }
    }
}
