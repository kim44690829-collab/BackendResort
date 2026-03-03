package resort.board.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    // properties에서 값 가져오기
    @Value("${frontend.url}")
    private String frontendUrl;

    public void sendResetMail(String email, String token) {

        // 하드코딩 제거
        String link = frontendUrl + "/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("bjoj1234@gmail.com"); 
        message.setTo(email);
        message.setSubject("비밀번호 재설정 링크");
        message.setText(
            "아래 링크를 클릭하여 비밀번호를 변경하세요.\n\n" +
            link +
            "\n\n※ 본 링크는 15분 후 만료됩니다."
        );

        mailSender.send(message);
    }
}