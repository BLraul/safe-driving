package ro.safedriving.service;

public interface EmailSenderService {
    void sendEmail(String to, String subject, String message);
}
