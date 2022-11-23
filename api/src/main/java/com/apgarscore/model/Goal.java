package com.apgarscore.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    //add a foreign key!
    // users_id (foreign key);
    private String goalName;
    private String frequency;
    private Integer min_progress_events;
    private String category;
    private Boolean active;
}
