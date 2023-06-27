package ro.safedriving.serviceImpl;



import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import ro.safedriving.exception.TestCarNotFoundException;
import ro.safedriving.model.TestCar;
import ro.safedriving.service.TestCarRepo;



import java.util.List;
import java.util.UUID;


@Service
@Transactional
public class TestCarService {
    private final TestCarRepo testCarRepo;
    @Autowired
    public TestCarService(TestCarRepo testCarRepo) {
        this.testCarRepo = testCarRepo;
    }


    public TestCar addTestCar(TestCar testCar) {
        testCar.setTestCarCode(UUID.randomUUID().toString());
        return testCarRepo.save(testCar);
    }

    public List<TestCar> findAllTestCar() {
        return testCarRepo.findAll();
    }

    public TestCar updateTestCar(TestCar testCar) {
        return testCarRepo.save(testCar);
    }

    public TestCar findTestCarById(Long id) {
        return testCarRepo.findTestCarById(id)
                .orElseThrow(() -> new TestCarNotFoundException("Test Car by id " + id + " was not found"));
    }
    public List<TestCar> findByCategoryId (String categoryId) {
        return testCarRepo.findByCategoryId(categoryId);
    }
    public void deleteTestCar(Long id){
        testCarRepo.deleteTestCarById(id);
    }

}
