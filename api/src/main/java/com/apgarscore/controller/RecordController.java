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

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
            @RequestParam String planDate,
            @RequestParam(required = false) String dateComplete) {

        Record record = new Record();
        record.setGoalID(goalID);
        record.setPlan(plan);
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            if (dateComplete != null) {
                record.setDateComplete(sdf.parse(dateComplete));
            }
            record.setPlanDate(sdf.parse(planDate));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        recordRepository.save(record);

        return record;
        // return ResponseEntity.status(HttpStatus.OK).body(
        // //why can't I add more keys? Also, what the heck is this format?
        // Map.of(
        // "plan", record.getPlan(),
        // "status","saved")
        // );

    }

    @CrossOrigin
    @PatchMapping(path = "/records/byId")
    public ResponseEntity<Record> markComplete(
            @RequestParam Integer id,
            @RequestParam(required = false) String dateComplete,
            @RequestParam(required = false) String plan,
            @RequestParam String planDate) {

        Record updated = recordRepository.findById(id).get();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

        if (dateComplete != null) {
            try {
                updated.setDateComplete(sdf.parse(dateComplete));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        } else {
            updated.setDateComplete(null);
        }
        if (plan != null) {
            try {
                updated.setPlanDate(sdf.parse(planDate));
                updated.setPlan(plan);
            } catch (ParseException e) {
                e.printStackTrace();
            }

        }

        recordRepository.save(updated);

        // if NEITHER dateComplete & plan are present, then delete the damn record
        if (dateComplete == null && plan == null) {
            recordRepository.deleteById(id);
            // TODO do this better.
        }
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
    public ResponseEntity<List<Record>> getRecordsByDateComplete(
            @RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") Date dateComplete) {
        return new ResponseEntity<List<Record>>(recordRepository.findByDateComplete(dateComplete), HttpStatus.OK);
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