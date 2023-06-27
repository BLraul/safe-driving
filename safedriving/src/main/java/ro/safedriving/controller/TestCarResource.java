package ro.safedriving.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.safedriving.model.TestCar;
import ro.safedriving.serviceImpl.TestCarService;

import java.util.List;

@RestController
@RequestMapping("/testcar")
public class TestCarResource {
    private final TestCarService testCarService;

    public TestCarResource(TestCarService testCarService) {
        this.testCarService = testCarService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TestCar>> getAllTestCar() {
        List<TestCar> testCar = testCarService.findAllTestCar();
        return new ResponseEntity<>(testCar, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<TestCar> getTestCarById (@PathVariable("id") Long id) {
        TestCar testCar = testCarService.findTestCarById(id);
        return new ResponseEntity<>(testCar, HttpStatus.OK);
    }

    @GetMapping("/findCategory/{categoryId}")
    public ResponseEntity<List<TestCar>> getByCategoryId (@PathVariable("categoryId") String categoryId) {
        List<TestCar> testCar = testCarService.findByCategoryId(categoryId);
        return new ResponseEntity<>(testCar, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<TestCar> addTestCar(@RequestBody TestCar testCar) {
        TestCar newTestCar = testCarService.addTestCar(testCar);
        return new ResponseEntity<>(newTestCar, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<TestCar> updateTestCar(@RequestBody TestCar testCar) {
        TestCar updateTestCar = testCarService.updateTestCar(testCar);
        return new ResponseEntity<>(updateTestCar, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTestCar(@PathVariable("id") Long id) {
        testCarService.deleteTestCar(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
