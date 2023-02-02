package com.apgarscore.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

// import org.hibernate.mapping.List;

// import org.hibernate.annotations.CascadeType;
// import org.hibernate.annotations.Table;
// import org.hibernate.mapping.Set;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "goal")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    // TODO add a foreign key!
    // users_id (foreign key);
    
    
    private String goalName;
    private String cadence;
    private Integer min_progress_events;
    private String category;
    private Boolean active;
    
    @OneToMany(mappedBy = "goalID", fetch = FetchType.LAZY)
    private List<Record> records;
}
