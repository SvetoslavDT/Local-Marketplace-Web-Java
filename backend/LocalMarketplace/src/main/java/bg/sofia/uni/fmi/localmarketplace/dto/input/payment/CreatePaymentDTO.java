package bg.sofia.uni.fmi.localmarketplace.dto.input.payment;

import bg.sofia.uni.fmi.localmarketplace.vo.PaymentMethod;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request body for creating a new payment")
public record CreatePaymentDTO(
    @Schema(description = "The payment method.", requiredMode = Schema.RequiredMode.REQUIRED)
    PaymentMethod paymentMethod
) {
}