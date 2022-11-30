package com.apgarscore.repository;

import org.springframework.data.repository.CrudRepository;

import com.apgarscore.model.Record;

public interface RecordRepository extends CrudRepository<Record, Integer>{
    
}
