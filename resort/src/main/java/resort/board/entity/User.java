package resort.board.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "member")
@Data
public class User {
	@Id
    @Column(name = "m_code")   
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mCode;

    @Column(name = "m_email")
    private String email;
    
    @Column(name = "m_pw")
    private String password;
}