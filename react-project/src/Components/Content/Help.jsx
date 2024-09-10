const Help = () => {
    return (
        <section className="flex flex-wrap items-center gap-24" id='help'>
          <div className="flex-1 basis-[51rem]">
            <h3 className="text-2xl font-[Arial] text-[#34197f] text-center">Welcome to the Help Center</h3>
            <h4>Booking Process:</h4>
            <ul>
                <li><strong>How to Book a Hotel:</strong> Learn how to search for hotels, select dates, and complete your reservation.</li>
                <li><strong>Modifying or Canceling a Booking:</strong> Instructions on how to change your reservation or cancel it.</li>
            </ul>

            <h4>Account Management:</h4>
            <ul>
                <li><strong>Creating an Account:</strong> Steps to create your EasyBook account.</li>
                <li><strong>Logging In or Password Recovery:</strong> Get help with logging in or recovering a forgotten password.</li>
                <li><strong>Managing Account Settings:</strong> Update your profile information and email preferences.</li>
            </ul>

            <h4>Payment and Pricing:</h4>
            <ul>
                <li><strong>Accepted Payment Methods:</strong> Information on payment options available on EasyBook.</li>
                <li><strong>Understanding Pricing:</strong> Explanation of pricing policies, including taxes and fees.</li>
                <li><strong>Applying Discounts or Promo Codes:</strong> How to apply discounts to your bookings.</li>
            </ul>

            <h4>Hotel Information:</h4>
            <ul>
                <li><strong>Hotel Ratings and Amenities:</strong> Understand hotel ratings and amenities listed on EasyBook.</li>
                <li><strong>Viewing Room Details:</strong> Learn how to view room photos, descriptions, and available amenities.</li>
                <li><strong>Hotel Policies:</strong> Check-in/out times, cancellation fees, and additional charges.</li>
            </ul>

            <h4>Customer Support:</h4>
            <ul>
                <li><strong>Contact Us:</strong> For assistance, reach out to our customer support team.
                    <ul>
                        <li>Phone: +31 620 123 654</li>
                        <li>Email: <a href="mailto:support@easybook.com">support@easybook.com</a></li>
                        <li>Live Chat: Available during business hours (9:00 AM - 6:00 PM, Monday to Friday).</li>
                    </ul>
                </li>
            </ul>

            <h4>Technical Assistance:</h4>
            <ul>
                <li><strong>Troubleshooting Tips:</strong> Solutions for common technical issues like browser compatibility and slow loading times.</li>
                <li><strong>Browser Settings:</strong> Instructions for clearing cache, enabling JavaScript, and updating browser settings.</li>
            </ul>

            <h4>Privacy and Security:</h4>
            <ul>
                <li><strong>Privacy Policy:</strong> Read our privacy policy to understand how we handle your data.</li>
                <li><strong>Security Tips:</strong> Learn how to protect your personal information and prevent fraud.</li>
            </ul>

            <h4>FAQs:</h4>
            <ul>
                <li><strong>Browse Frequently Asked Questions:</strong> Find answers to common inquiries about the services we provide.</li>

            </ul>

            <h3 className="text-2xl font-[Arial] text-[#34197f] text-center">Terms of Service and Policies:</h3>
            <ul>

                <li><strong>Terms of Service:</strong> Please review and agree to the terms of service and booking policies.</li>

            </ul>

            <h4>Feedback and Suggestions:</h4>
            <ul>
                <li><strong>Share Your Thoughts:</strong> We value your feedback! Let us know how we can improve EasyBook.</li>
            </ul>
                  </div>
              </section>
    );
}
export default Help;