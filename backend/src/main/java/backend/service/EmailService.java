package backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBulkExpiryNotification(String toEmail, String userName, String certList) {

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(toEmail);
    message.setSubject("Certificate Expiry Alert");

    message.setText(
        "Hello " + userName + ",\n\n" +
        "The following certificates are expiring soon:\n\n" +
        certList + "\n" +
        "Please take necessary action.\n\n" +
        "Regards,\nAdmin"
    );

    mailSender.send(message);
}
    }