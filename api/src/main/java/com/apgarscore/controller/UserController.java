package com.apgarscore.controller;

import com.apgarscore.model.User;
import com.apgarscore.repository.UserRepository;
import com.apgarscore.model.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.Map;

@RestController
class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/user/create")
    public ResponseEntity<Object> addNewUser (@RequestParam String name
            , @RequestParam String email) {

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "name", user.getName(),
                "email", user.getEmail(),
                "status", "saved"));
    }

    @GetMapping(path="/user/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }

}