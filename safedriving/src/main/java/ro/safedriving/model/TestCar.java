package ro.safedriving.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class TestCar implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column( nullable = false, updatable = false)
    private Long id;
    private String productName;
    private String categoryId;
    private String description;
    private String price;
    private String prodImg;
    private String isAvailable;
    private String color;
    private String efficiency;
    private Integer performance;
    private String transmission;
    private Integer tnr;
    private String audioSist;
    private Integer trunkVol;
    private String additionalTrunkSpace;
    private String wifiCharging;
    private String usbCharging;
    private String centralDisplay;
    private String eCallSistem;
    private String autoPilot;
    private String pcaR;
    private String lvda;
    private String ISLA;
    private String parkingSensors;
    @OneToMany(
            mappedBy = "testCar",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference
    private List<Programing> programings = new ArrayList<>();
    @Column(nullable = false, updatable = false)
    private String testCarCode;

    public TestCar() {
    }

    public TestCar(String productName, String categoryId, String description, String price, String prodImg, String isAvailable, String color, String efficiency, Integer performance, String transmission, Integer tnr, String audioSist, Integer trunkVol, String additionalTrunkSpace, String wifiCharging, String usbCharging, String centralDisplay, String eCallSistem, String autoPilot, String pcaR, String lvda, String ISLA, String parkingSensors, String testCarCode) {
        this.productName = productName;
        this.categoryId = categoryId;
        this.description = description;
        this.price = price;
        this.prodImg = prodImg;
        this.isAvailable = isAvailable;
        this.color = color;
        this.efficiency = efficiency;
        this.performance = performance;
        this.transmission = transmission;
        this.tnr = tnr;
        this.audioSist = audioSist;
        this.trunkVol = trunkVol;
        this.additionalTrunkSpace = additionalTrunkSpace;
        this.wifiCharging = wifiCharging;
        this.usbCharging = usbCharging;
        this.centralDisplay = centralDisplay;
        this.eCallSistem = eCallSistem;
        this.autoPilot = autoPilot;
        this.pcaR = pcaR;
        this.lvda = lvda;
        this.ISLA = ISLA;
        this.parkingSensors = parkingSensors;
        this.testCarCode = testCarCode;
    }

    public List<Programing> getProgramings() {
        return programings;
    }

    public void setProgramings(List<Programing> programings) {
        this.programings = programings;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getProdImg() {
        return prodImg;
    }

    public void setProdImg(String prodImg) {
        this.prodImg = prodImg;
    }

    public String getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(String isAvailable) {
        this.isAvailable = isAvailable;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getEfficiency() {
        return efficiency;
    }

    public void setEfficiency(String efficiency) {
        this.efficiency = efficiency;
    }

    public Integer getPerformance() {
        return performance;
    }

    public void setPerformance(Integer performance) {
        this.performance = performance;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public Integer getTnr() {
        return tnr;
    }

    public void setTnr(Integer tnr) {
        this.tnr = tnr;
    }

    public String getAudioSist() {
        return audioSist;
    }

    public void setAudioSist(String audioSist) {
        this.audioSist = audioSist;
    }

    public Integer getTrunkVol() {
        return trunkVol;
    }

    public void setTrunkVol(Integer trunkVol) {
        this.trunkVol = trunkVol;
    }

    public String getAdditionalTrunkSpace() {
        return additionalTrunkSpace;
    }

    public void setAdditionalTrunkSpace(String additionalTrunkSpace) {
        this.additionalTrunkSpace = additionalTrunkSpace;
    }

    public String getWifiCharging() {
        return wifiCharging;
    }

    public void setWifiCharging(String wifiCharging) {
        this.wifiCharging = wifiCharging;
    }

    public String getUsbCharging() {
        return usbCharging;
    }

    public void setUsbCharging(String usbCharging) {
        this.usbCharging = usbCharging;
    }

    public String getCentralDisplay() {
        return centralDisplay;
    }

    public void setCentralDisplay(String centralDisplay) {
        this.centralDisplay = centralDisplay;
    }

    public String geteCallSistem() {
        return eCallSistem;
    }

    public void seteCallSistem(String eCallSistem) {
        this.eCallSistem = eCallSistem;
    }

    public String getAutoPilot() {
        return autoPilot;
    }

    public void setAutoPilot(String autoPilot) {
        this.autoPilot = autoPilot;
    }

    public String getPcaR() {
        return pcaR;
    }

    public void setPcaR(String pcaR) {
        this.pcaR = pcaR;
    }

    public String getLvda() {
        return lvda;
    }

    public void setLvda(String lvda) {
        this.lvda = lvda;
    }

    public String getISLA() {
        return ISLA;
    }

    public void setISLA(String ISLA) {
        this.ISLA = ISLA;
    }

    public String getParkingSensors() {
        return parkingSensors;
    }

    public void setParkingSensors(String parkingSensors) {
        this.parkingSensors = parkingSensors;
    }

    public String getTestCarCode() {
        return testCarCode;
    }

    public void setTestCarCode(String testCarCode) {
        this.testCarCode = testCarCode;
    }

    @Override
    public String toString() {
        return "TestCar{" +
                "id=" + id +
                ", productName='" + productName + '\'' +
                ", categoryId='" + categoryId + '\'' +
                ", description='" + description + '\'' +
                ", price='" + price + '\'' +
                ", prodImg='" + prodImg + '\'' +
                ", isAvailable='" + isAvailable + '\'' +
                ", color='" + color + '\'' +
                ", efficiency=" + efficiency +
                ", performance=" + performance +
                ", transmission='" + transmission + '\'' +
                ", tnr=" + tnr +
                ", audioSist='" + audioSist + '\'' +
                ", trunkVol=" + trunkVol +
                ", additionalTrunkSpace='" + additionalTrunkSpace + '\'' +
                ", wifiCharging='" + wifiCharging + '\'' +
                ", usbCharging='" + usbCharging + '\'' +
                ", centralDisplay='" + centralDisplay + '\'' +
                ", eCallSistem='" + eCallSistem + '\'' +
                ", autoPilot='" + autoPilot + '\'' +
                ", pcaR='" + pcaR + '\'' +
                ", lvda='" + lvda + '\'' +
                ", ISLA='" + ISLA + '\'' +
                ", parkingSensors='" + parkingSensors + '\'' +
                '}';
    }
}