package ro.safedriving.service;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.safedriving.model.category;


public interface CategoryRepo extends JpaRepository<category,Long>

{

}
