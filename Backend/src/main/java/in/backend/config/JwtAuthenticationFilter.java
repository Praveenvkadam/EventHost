package in.backend.config;

import in.backend.service.CustomUserDetailsService;
import in.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    // List of public paths that do not require JWT
    private static final List<String> PUBLIC_PATHS = List.of(
            "/api/auth",
            "/api/password",
            "/api/images",
            "/api/services",   // GET requests allowed without token
            "/api/bookings",
            "/api/payment",
            "/api/feedback",
            "/api/orders" ,
            "/api/employees" ,
            "/api/users"
    );

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        // Skip preflight OPTIONS requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) return true;

        // Skip all explicitly public paths
        return PUBLIC_PATHS.stream().anyMatch(path::startsWith) && "GET".equalsIgnoreCase(request.getMethod());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = extractToken(request);

        if (token != null) {
            try {
                String email = jwtService.extractSubject(token);

                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    var userDetails = userDetailsService.loadUserByUsername(email);

                    if (jwtService.validateToken(token, userDetails)) {
                        var authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    } else {
                        unauthorized(response, "Invalid or expired JWT token");
                        return;
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                unauthorized(response, "Invalid or expired JWT token");
                return;
            }
        } else if (requiresAuth(request)) {
            // Token missing on secured endpoint
            unauthorized(response, "Missing JWT token");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }

    private boolean requiresAuth(HttpServletRequest request) {
        String path = request.getRequestURI();
        String method = request.getMethod();
        // POST, PUT, DELETE on /api/services require authentication
        return (path.startsWith("/api/services") && 
                ("POST".equalsIgnoreCase(method) || 
                 "PUT".equalsIgnoreCase(method) || 
                 "DELETE".equalsIgnoreCase(method)));
    }

    private void unauthorized(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\":\"" + message + "\"}");
    }
}
