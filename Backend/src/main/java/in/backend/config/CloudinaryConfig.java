// CloudinaryConfig.java
package in.backend.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dj5mkqv5q",
            "api_key", "269511342568594",
            "api_secret", "kF33R_g0SfaHphwNF5pPnlSH-bs"
        ));
    }
}
