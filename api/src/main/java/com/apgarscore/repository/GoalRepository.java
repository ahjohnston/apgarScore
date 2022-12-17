package com.apgarscore.repository;

import org.springframework.data.repository.CrudRepository;

import com.apgarscore.model.Goal;

public interface GoalRepository extends CrudRepository<Goal, Integer>{
    Iterable<Goal> findByCadence(String cadence);
}
