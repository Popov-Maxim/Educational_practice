import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.PrintWriter;

@WebFilter(filterName = "InfoFilter",urlPatterns = "/*")
public class InfoFilter implements Filter {
    @Override
    public void init(FilterConfig config) throws ServletException {
    }
    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        long timeStart = System.currentTimeMillis();
        chain.doFilter(request, response);
        long timeEnd = System.currentTimeMillis();
        PrintWriter pw = response.getWriter();
        if(((HttpServletRequest)request).getMethod().equals("POST")){
            pw.println("{");
            String url = ((HttpServletRequest)request).getRequestURL().toString();
            String queryString = ((HttpServletRequest)request).getQueryString();
            String methodHTTP = ((HttpServletRequest)request).getMethod();
            pw.println("\"sucesss\" : \"" + methodHTTP + "\",");
            pw.println("\"URL\" : \"" + url + (queryString!=null?("?" + queryString):"\","));
            pw.println("\"time\" : " + (timeEnd-timeStart));
            pw.println("}");
        } else {
            pw.print("<body><br>");
            String url = ((HttpServletRequest) request).getRequestURL().toString();
            String queryString = ((HttpServletRequest) request).getQueryString();
            String methodHTTP = ((HttpServletRequest) request).getMethod();
            pw.println(methodHTTP + " - "
                    + url + (queryString != null ? ("?" + queryString) : "") + " - "
                    + (timeEnd - timeStart) + "ms");
            pw.println("</body>");
        }
    }
}
