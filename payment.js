function payWithPaystack(event) {
    event.preventDefault();

    // Hide the "Pay Now" button
    document.getElementById("payNowButton").style.display = "none";

    // Show loading animation
    document.getElementById("loadingAnimation").style.display = "block";
    document.getElementById("loadingAnimation").classList.add("loading");

    // Simulate payment processing delay (replace with actual payment process)
    setTimeout(() => {
        // Get the total price from the 'amount' element
        const totalPrice = document.getElementById('amount').textContent;

        // Convert the total price to an integer (in pesewas, since Paystack expects the amount in the smallest currency unit)
        const totalAmountInPesewas = parseInt(totalPrice.replace('₵', '').replace('.', '')) * 100;

        // Initialize Paystack handler with your public key
        const handler = PaystackPop.setup({
            key: 'pk_test_f20c005810aae92f473fd37e98dbbef9c75e7d67', // Replace 'your_public_key' with your actual Paystack public key
            email: 'user@example.com', // Replace 'user@example.com' with the user's email address
            amount: totalAmountInPesewas, // Total amount in pesewas
            currency: 'GHS', // Currency (GHS for Ghanaian Cedi)
            ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Generate a unique reference (you can also use a custom reference)
            callback: function(response) {
                // Handle successful payment (you can redirect the user to a success page or display a success message)
                console.log('Payment successful!', response);
            },
            onClose: function() {
                // Handle when the payment popup is closed (optional)
                console.log('Payment popup closed.');

                // Show the "Pay Now" button again after payment popup closes
                document.getElementById("payNowButton").style.display = "block";
            }
        });

        // Open the Paystack payment popup
        handler.openIframe();

        // Hide loading animation after opening payment popup
        document.getElementById("loadingAnimation").style.display = "none";
        document.getElementById("loadingAnimation").classList.remove("loading");
    }, 2000); // Simulate payment processing time (adjust as needed)
}
