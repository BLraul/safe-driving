package ro.safedriving.service;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.safedriving.model.Programing;
import ro.safedriving.model.TestCar;

import java.util.List;


public interface ProgramingRepo extends JpaRepository<Programing,Integer> {

    List<Programing> findByTestCar(TestCar testCar);

    void deleteProgramingById(Integer id);
}
