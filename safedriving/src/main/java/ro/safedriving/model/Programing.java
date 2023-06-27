package ro.safedriving.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import javax.xml.crypto.Data;
import java.io.Serializable;

@Entity
public class Programing implements Serializable {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(nullable = false, updatable = false)
        private Integer id;
        private String firstName;
        private String lastName;
        private String age;
        private String city;
        private String phone;
        private String email;
        private String data;
        @ManyToOne
        @JoinColumn(name = "car_id")
        @JsonBackReference
        private TestCar testCar;

    public Programing() {
    }

    public Programing(String firstName, String lastName, String age, String city, String phone, String email, String data, TestCar testCar) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.data = data;
        this.testCar = testCar;
    }

    public TestCar getTestCar() {
        return testCar;
    }

    public void setTestCar(TestCar testCar) {
        this.testCar = testCar;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Programing{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age='" + age + '\'' +
                ", city='" + city + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", data='" + data + '\'' +
                ", testCar=" + testCar +
                '}';
    }
}
