package com.apgarscore.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.apgarscore.model.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Integer> {
    List<Record> findByStartDate(Date startDate);

    List<Record> findByGoalID(Integer goalID);

    Optional<Record> findById(Integer id);

    // Optional<Record> setComplete(Integer id, Boolean complete);

    void deleteById(Integer id); // is there a way to validate that this method has successfully executed

}
