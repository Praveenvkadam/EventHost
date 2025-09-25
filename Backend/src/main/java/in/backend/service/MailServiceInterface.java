package in.backend.service;

public interface MailServiceInterface {

    /**
     * Send a password reset email to the given recipient with the reset token.
     *
     * @param to    Recipient email address
     * @param token Password reset token
     */
    void sendPasswordReset(String to, String token);
}
