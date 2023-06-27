package ro.safedriving.serviceImpl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.safedriving.model.Programing;
import ro.safedriving.model.TestCar;
import ro.safedriving.service.ProgramingRepo;

import java.util.List;

@Service
@Transactional
public class ProgramingService {

    private final ProgramingRepo programingRepo;

    @Autowired
    public ProgramingService(ProgramingRepo programingRepo) {
        this.programingRepo = programingRepo;
    }


    public Programing addPrograming(Programing programing) {
        return programingRepo.save(programing);
    }
    public List<Programing> findAllProgramings() {
        return programingRepo.findAll();
    }

    public List<Programing> findByTestCar (TestCar testCar) {
        return programingRepo.findByTestCar(testCar);
    }

    public void deletePrograming(Integer id){
        programingRepo.deleteProgramingById(id);
    }
}
