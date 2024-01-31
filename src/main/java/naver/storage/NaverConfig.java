package naver.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.Data;

@Configuration
@Data
@PropertySource("classpath:/naver.properties")
//프로퍼티 파일에서 선언된 값 중에서
//ncp.* 이름으로 된 프로퍼티 값을 받을 필드를 선언한다.
@ConfigurationProperties(prefix = "ncp")
public class NaverConfig {
    private String endPoint;
    private String regionName;
    private String accessKey;
    private String secretKey;

}