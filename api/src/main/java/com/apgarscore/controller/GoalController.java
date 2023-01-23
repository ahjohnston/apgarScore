package com.apgarscore.controller;

import com.apgarscore.model.Goal;
import com.apgarscore.repository.GoalRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.Map;

@CrossOrigin
@RestController // This means that this class is a Controller
class GoalController {
    @Autowired
    private GoalRepository goalRepository;

    
    @CrossOrigin
    @PostMapping(path = "/goals/add") // Map ONLY POST Requests
    public ResponseEntity<Object> addGoal(
            @RequestParam String goalName,
            @RequestParam String cadence,
            @RequestParam Integer min_progress_events,
            @RequestParam Boolean active,
            @RequestParam (required=false) String category
            ) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Goal goal = new Goal();
        goal.setGoalName(goalName);
        goal.setCadence(cadence);
        goal.setMin_progress_events(min_progress_events);
        goal.setCategory(category);
        goal.setActive(true);
        goalRepository.save(goal);
        return ResponseEntity.status(HttpStatus.OK).body(
        //why can't I add more keys? Also, what the heck is this format?
        Map.of(
                "goalName", goal.getGoalName(),
                "cadence", goal.getCadence(),
                "status", "saved")
                );
    };

    @CrossOrigin
    @GetMapping(path = "/goals/view")
    public ResponseEntity <Iterable<Goal>> getAllGoals(
        @RequestParam(required=false) String cadence
    ) {
        // This returns a JSON or XML with the goals
        if(cadence != null) return new ResponseEntity<Iterable<Goal>> (goalRepository.findByCadence(cadence), HttpStatus.OK);
        return new ResponseEntity <Iterable<Goal>> (goalRepository.findAll(), HttpStatus.OK);
    }
}