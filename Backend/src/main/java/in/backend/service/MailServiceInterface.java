package in.backend.service;

public interface MailServiceInterface {

    /**
     * Send a password reset email to the given recipient with the reset token.
     *
     * @param to    Recipient email address
     * @param token Password reset token
     */
    void sendPasswordReset(String to, String token);

    /**
     * Send an event invitation email with accept/decline links.
     *
     * @param to        Recipient email address
     * @param empName   Employee name
     * @param eventName Event name
     * @param acceptUrl URL for accepting the event
     * @param declineUrl URL for declining the event
     */
    void sendEventInvite(String to, String empName, String eventName, String acceptUrl, String declineUrl);
}
