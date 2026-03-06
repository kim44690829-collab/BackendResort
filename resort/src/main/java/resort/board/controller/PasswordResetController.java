package resort.board.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import resort.board.dto.ResetRequest;
import resort.board.entity.PasswordResetToken;
import resort.board.entity.User;
import resort.board.repository.PasswordResetRepository;
import resort.board.repository.UserRepository;
import resort.board.service.MailService;
import resort.board.service.PasswordResetService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;
    private final MailService mailService;
    private final UserRepository userRepository;
    private final PasswordResetRepository resetRepository;
    private final PasswordEncoder passwordEncoder;

    // 1️⃣ 비밀번호 재설정 요청
    @PostMapping("/request-reset")
    public ResponseEntity<?> requestReset(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        System.out.println("1단계 통과");


        if (!userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("존재하지 않는 이메일");
        }
        System.out.println("2단계 통과");

        String token = passwordResetService.createResetToken(email);
        System.out.println("3단계 통과");

        mailService.sendResetMail(email, token);
        System.out.println("4단계 통과");


        return ResponseEntity.ok("메일 전송 완료");
    }

    // 2️⃣ 토큰 검증
    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestParam String token) {

        PasswordResetToken resetToken = resetRepository.findByToken(token);

        if (resetToken == null) return ResponseEntity.badRequest().body("잘못된 토큰");
        if (resetToken.isUsed()) return ResponseEntity.badRequest().body("이미 사용됨");
        if (resetToken.getExpireTime().isBefore(LocalDateTime.now())) return ResponseEntity.badRequest().body("만료됨");

        return ResponseEntity.ok("유효");
    }

    // 3️⃣ 비밀번호 변경
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetRequest req) {

        PasswordResetToken token = resetRepository.findByToken(req.getToken());
        if (token == null || token.isUsed()) return ResponseEntity.badRequest().body("유효하지 않음");

        User user = userRepository.findByEmail(token.getEmail());
        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);

        token.setUsed(true);
        resetRepository.save(token);

        return ResponseEntity.ok("비밀번호 변경 완료");
    }
}