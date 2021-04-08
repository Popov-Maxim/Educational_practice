import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.*;

@WebServlet(name = "PageServlet", value = "/page")
public class PageServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        InputStream is = getServletContext().getResourceAsStream("/WEB-INF/page.html");
        Reader in = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        PrintWriter pw = response.getWriter();
        while (in.ready()) {
            pw.print((char) in.read());
        }
    }
}
