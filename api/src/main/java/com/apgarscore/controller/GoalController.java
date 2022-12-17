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
import org.springframework.web.bind.annotation.ResponseBody;
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
            @RequestParam String frequency,
            @RequestParam Integer min_progress_events,
            @RequestParam Boolean active,
            @RequestParam String category
            ) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Goal goal = new Goal();
        goal.setGoalName(goalName);
        goal.setFrequency(frequency);
        goal.setMin_progress_events(min_progress_events);
        goal.setCategory(category);
        goal.setActive(true);
        goalRepository.save(goal);
        return ResponseEntity.status(HttpStatus.OK).body(
        //why can't I add more keys? Also, what the heck is this format?
        Map.of(
                "goalName", goal.getGoalName(),
                "frequency", goal.getFrequency(),
                "status", "saved")
                );
    };

    @CrossOrigin
    @GetMapping(path = "/goals/view")
    public @ResponseBody Iterable<Goal> getAllGoals() {
        // This returns a JSON or XML with the goals
        return goalRepository.findAll();
    }
}