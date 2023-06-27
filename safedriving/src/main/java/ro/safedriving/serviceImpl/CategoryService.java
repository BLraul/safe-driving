package ro.safedriving.serviceImpl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.safedriving.model.category;
import ro.safedriving.service.CategoryRepo;
import java.util.List;


@Service
@Transactional
public class CategoryService {

    private final CategoryRepo categoryRepo;

    @Autowired
    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }


    public category addCategory(category category) {
        return categoryRepo.save(category);
    }
    public List<category> findAllCategory() {
        return categoryRepo.findAll();
    }
}
