package bg.sofia.uni.fmi.localmarketplace.exception.user;

public class UserAlreadyVendorException extends RuntimeException {
    public UserAlreadyVendorException(String message) {
        super(message);
    }
    public UserAlreadyVendorException(String message, Throwable cause) {
        super(message, cause);
    }
}
