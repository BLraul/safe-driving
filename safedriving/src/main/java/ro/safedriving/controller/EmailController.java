package ro.safedriving.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.safedriving.model.EmailMessage;
import ro.safedriving.service.EmailSenderService;
import ro.safedriving.serviceImpl.EmailSenderServiceImpl;

@RestController
@RequestMapping("/email")
public class EmailController {

    private EmailSenderServiceImpl emailSenderServiceImpl;

    public EmailController(EmailSenderServiceImpl emailSenderServiceImpl) {
        this.emailSenderServiceImpl = emailSenderServiceImpl;
    }

    @PostMapping("/send-email")
    public ResponseEntity sendEmail(@RequestBody EmailMessage emailMessage){
        this.emailSenderServiceImpl.sendEmail(emailMessage.getTo(), emailMessage.getSubject(), emailMessage.getMessage().toString());
        return ResponseEntity.ok("Success");
    }
}
