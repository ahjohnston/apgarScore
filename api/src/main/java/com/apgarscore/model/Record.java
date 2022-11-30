package com.apgarscore.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Getter
@Setter

public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    //add a foreign key!
    // goalID (foreign key);
    private String plan;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
   
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endDate;
    private boolean complete;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateComplete;
}

