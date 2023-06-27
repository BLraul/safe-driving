package ro.safedriving.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.safedriving.model.TestCar;
import ro.safedriving.model.category;
import ro.safedriving.serviceImpl.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryResource {
    private final CategoryService categoryService;

    public CategoryResource(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<category>> getAllCategory() {
        List<category> category = categoryService.findAllCategory();
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<category> addCategory(@RequestBody category category) {
        category newCategory = categoryService.addCategory(category);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }
}
