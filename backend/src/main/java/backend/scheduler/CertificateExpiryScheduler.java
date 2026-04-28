package backend.scheduler;

import backend.Certification;
import backend.repository.CertificationRepository;
import backend.repository.UserRepository;
import backend.model.User;
import backend.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;

@Component
public class CertificateExpiryScheduler {

    @Autowired
    private CertificationRepository certificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 * * * * ?") // every 1 minute (for testing)
    public void checkExpiringCertificates() {

        LocalDate today = LocalDate.now().plusDays(7);

         List<Certification> expiringCerts =
            certificationRepository.findByExpiryDateBefore(today);

        System.out.println("Scheduler running...");
        System.out.println("Certificates found: " + expiringCerts.size());

        for (Certification cert : expiringCerts) {

    User user = userRepository.findById(cert.getUserId()).orElse(null);

    if (user != null) {
        emailService.sendBulkExpiryNotification(
    user.getEmail(),
    user.getName(),
    cert.getCertificationName()
);
    }
}
    }
}