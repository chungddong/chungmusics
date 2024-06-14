package com.sophra.chungmusic;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    //회원가입 하는 메서드
    public Users registerUser(Users user) {
        user.setPasswd(bCryptPasswordEncoder.encode(user.getPasswd()));
        return usersRepository.save(user);
    }

    // 사용자 존재 여부 확인 메서드
    public boolean existsByEmail(String email) {
        Optional<Users> user = usersRepository.findByEmail(email);
        return user.isPresent(); // 사용자가 존재하면 true, 존재하지 않으면 false 반환
    }

    public Optional<Users> findbyEmail(String email)
    {
        Optional<Users> user = usersRepository.findByEmail(email);
        return user;
    }
    
    public Boolean confirmUser(Users loginuser) {
        
        //로그인 시도 유저 이메일로 데이터베이스의 유저 비밀번호 가져오기
        Optional<Users> users = usersRepository.findByEmail(loginuser.getEmail());
        //가져온 유저 비밀번호와 로그인 시도 유저가 적은 비밀번호 비교
        Boolean isConfirm = bCryptPasswordEncoder.matches(loginuser.getPasswd(), users.get().getPasswd());
        
        return isConfirm;

    }
}
