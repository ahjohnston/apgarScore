package com.apgarscore.controller;

import com.apgarscore.model.Record;
import com.apgarscore.repository.RecordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
class RecordController {
    @Autowired
    private RecordRepository recordRepository;

    @CrossOrigin
    @PostMapping(path = "/records/add")
    public Record addRecord(
            @RequestParam Integer goalID,
            @RequestParam(required = false) String plan,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,

            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam boolean complete,

            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateComplete) {

        Record record = new Record();
        record.setGoalID(goalID);
        record.setPlan(plan);
        record.setStartDate(startDate);
        record.setEndDate(endDate);
        record.setComplete(complete);
        record.setDateComplete(dateComplete);
        recordRepository.save(record);

        return record;
        // return ResponseEntity.status(HttpStatus.OK).body(
        // //why can't I add more keys? Also, what the heck is this format?
        // Map.of(
        // "plan", record.getPlan(),
        // "startDate", record.getStartDate(),
        // "status","saved")
        // );

    }

    @CrossOrigin
    @PatchMapping(path = "/records/byId")
    public ResponseEntity<Record> markComplete(
            @RequestParam Integer id,
            @RequestParam(required = false) boolean complete,
            @RequestParam(required = false) String plan) {
        Record updated = recordRepository.findById(id).get();

        if (complete)
            updated.setComplete(complete);
        if (plan != null)
            updated.setPlan(plan);
        recordRepository.save(updated);

        return ResponseEntity.ok(updated);
    }

    @CrossOrigin
    @GetMapping(path = "/records/all")
    public @ResponseBody Iterable<Record> getAllRecords() {
        // This returns a JSON or XML with the goals
        return recordRepository.findAll();
        // return ResponseEntity.ok(HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(path = "/records/byDate")
    public ResponseEntity<List<Record>> getRecordsByStartDate(
            @RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") Date startDate) {
        return new ResponseEntity<List<Record>>(recordRepository.findByStartDate(startDate), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(path = "/records/byId")
    public Optional<Record> getRecordsById(@RequestParam Integer id) {
        return recordRepository.findById(id);
    }

    @CrossOrigin
    @GetMapping(path = "/records/byGoalID")
    public ResponseEntity<List<Record>> getRecordsByGoalID(@RequestParam Integer goalID) {
        return new ResponseEntity<List<Record>>(recordRepository.findByGoalID(goalID), HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping(path = "/records/byId")
    public String deleteRecordById(@RequestParam Integer id) {

        recordRepository.deleteById(id);
        return "Record deleted"; // best practice: add a confirmation that record was deleted
    }
}