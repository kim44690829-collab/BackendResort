package resort.board.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import resort.board.entity.PasswordResetToken;
import resort.board.repository.PasswordResetRepository;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final PasswordResetRepository repository;

    public String createResetToken(String email) {

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setEmail(email);
        resetToken.setToken(token);
        resetToken.setExpireTime(LocalDateTime.now().plusMinutes(15));
        resetToken.setUsed(false);

        repository.save(resetToken);

        return token;
    }
}