package com.apgarscore.model;

import lombok.Data;

@Data
public class Message {
    private String messageText;

    public Message(String text) {
        this.messageText = text;
    }

}