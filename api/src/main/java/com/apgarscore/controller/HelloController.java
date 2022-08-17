package com.apgarscore.controller;

import com.apgarscore.model.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
class HelloController {

    @GetMapping("/")
    String getIndex() {
        Message message = new Message("Welcome to the ApgarScore API.");
        return message.getMessageText();
    }
    @GetMapping("/hello")
    String getHi() {
        Message message = new Message("Hi There!");
        return message.getMessageText();
    }

    @GetMapping("/new")
    String hahahaha() {
       return "new";
    }

}