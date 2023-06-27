package ro.safedriving.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.safedriving.model.Programing;
import ro.safedriving.model.TestCar;
import ro.safedriving.model.category;
import ro.safedriving.serviceImpl.CategoryService;
import ro.safedriving.serviceImpl.ProgramingService;

import java.util.List;

@RestController
@RequestMapping("/programing")
public class ProgramingResource {

    private final ProgramingService programingService;
    private TestCar testCar;
    public ProgramingResource(ProgramingService programingService) {
        this.programingService = programingService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Programing>> getAllProgramings() {
        List<Programing> programings = programingService.findAllProgramings();
        return new ResponseEntity<>(programings, HttpStatus.OK);
    }

    @GetMapping("/findProgramingsByTestCar/{testCar}")
    public ResponseEntity<List<Programing>> getByTestCar (@PathVariable("testCar") TestCar testCar) {
        List<Programing> programings = programingService.findByTestCar(testCar);
        return new ResponseEntity<>(programings, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Programing> addPrograming(@RequestBody Programing programing) {
        Programing newPrograming = programingService.addPrograming(programing);
        return new ResponseEntity<>(newPrograming, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePrograming(@PathVariable("id") Integer id) {
        programingService.deletePrograming(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
