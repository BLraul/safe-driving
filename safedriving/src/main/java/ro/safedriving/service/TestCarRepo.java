package ro.safedriving.service;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.safedriving.model.TestCar;

import java.util.List;
import java.util.Optional;

public interface TestCarRepo  extends JpaRepository<TestCar,Long>

    {
        void deleteTestCarById(Long id);

        Optional<TestCar> findTestCarById(Long id);

        List<TestCar> findByCategoryId(String categoryId);
    }

