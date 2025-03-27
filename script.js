const emails = [
    {
        sender: "IT Helpdesk",
        email: "it-support@company.com",
        subject: "Urgent: Security Update Required",
        greeting: "Dear Employee,",
        upperBody: "To ensure security, install the latest patch immediately.",
        lowerBody: "Download it here: https://fake-security.com",
        signature: "Best Regards, IT Helpdesk",
        isPhishing: true
    },
    {
        sender: "HR Department",
        email: "hr@company.com",
        subject: "Payroll Update Confirmation",
        greeting: "Hello,",
        upperBody: "Your salary has been processed successfully.",
        lowerBody: "Access the payroll portal: https://real-hr-portal.com",
        signature: "Sincerely, HR Department",
        isPhishing: false
    },
    {
        sender: "Bank Notification",
        email: "alerts@bank.com",
        subject: "Unusual Login Attempt Detected",
        greeting: "Dear Customer,",
        upperBody: "We noticed an unusual login attempt to your account. If this wasn't you, take action immediately.",
        lowerBody: "Secure your account here: https://secure-bank-login.com",
        signature: "Thank you, Your Bank Security Team",
        isPhishing: true
    },
    {
        sender: "Company Admin",
        email: "admin@company.com",
        subject: "Upcoming Maintenance Downtime",
        greeting: "Dear Team,",
        upperBody: "Our systems will undergo scheduled maintenance tonight. Some services may be temporarily unavailable.",
        lowerBody: "More details: https://company-intranet.com/maintenance",
        signature: "Best Regards, IT Administration",
        isPhishing: false
    }
];



        let currentEmail = 0;
        let correctAnswers = 0;
        let startTime;

        function startQuiz() {
            let userEmail = document.getElementById('email').value;
            if (!userEmail) {
                Swal.fire('Error', 'Please enter a valid email.', 'error');
                return;
            }
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('quiz-screen').classList.remove('hidden');
            document.getElementById('user-email').innerText = userEmail;
            currentEmail = 0;
            correctAnswers = 0;
            startTime = new Date();
            emails.sort(() => Math.random() - 0.5);
            loadEmail();
        }

        function loadEmail() {
            let email = emails[currentEmail];
        
            // Update sender and subject
            document.getElementById('sender-name').innerText = email.sender;
            document.getElementById('email-subject').innerText = email.subject;
        
            // Update email greeting, upper body, and signature
            document.getElementById('email-greeting').innerText = email.greeting;
            document.getElementById('email-upper-body').innerText = email.upperBody;
            document.getElementById('email-signature').innerText = email.signature;
        
            // Hide URL in lower body
            let lowerBodyText = email.lowerBody.replace(/(https?:\/\/[^\s]+)/, '');
            document.getElementById('email-lower-body').innerText = lowerBodyText;
        
            // Handle hidden email link
            let emailLink = document.getElementById('email-link');
            let urlMatch = email.lowerBody.match(/(https?:\/\/[^\s]+)/);
            if (urlMatch) {
                emailLink.innerText = '[Click here]';
                emailLink.href = "#";
                emailLink.classList.remove('hidden');
                emailLink.innerText = '[Click here]';
                emailLink.href = "#";
                emailLink.classList.remove('hidden');
                
                // Add tooltip for hover effect
                emailLink.title = urlMatch[0]; // Shows the URL on hover
                
                emailLink.onclick = (event) => {
                    event.preventDefault();
                    Swal.fire('Link Preview', `This link points to: ${urlMatch[0]}`, 'info');
                };

            } else {
                emailLink.classList.add('hidden');
            }
        
            // Generate and update date & time
            let now = new Date();
            let date = now.toLocaleDateString();
            let time = now.toLocaleTimeString();
            document.getElementById('email-date-time').innerText = `Received: ${date} ${time}`;
        }
        
        function answer(isPhishing) {
            let correct = isPhishing === emails[currentEmail].isPhishing;
            let email = emails[currentEmail];
            
            let urlMatch = email.lowerBody.match(/(https?:\/\/[^\s]+)/);
            let detectedUrl = urlMatch ? urlMatch[0] : "No link detected";
        
            if (correct) {
                Swal.fire({
                    title: '✅ Correct!',
                    text: 'Great job! You identified this email correctly.',
                    icon: 'success'
                });
                correctAnswers++;
            } else {
                let warningMessage = `
                    <p><strong>❌ Incorrect!</strong> This email is <span style="color: red; font-weight: bold;">phishing</span>.</p>
                    <p><strong>Warning:</strong> The sender <span style="color: red;">${email.email}</span> looks suspicious.</p>
                    <p>The URL <span style="color: red;">${detectedUrl}</span> is not an official domain.</p>
                    <p><strong>Tips:</strong></p>
                    <ul>
                        <li>Always check sender domains carefully.</li>
                        <li>Look for misspellings and extra words in URLs.</li>
                        <li>Do not click suspicious links in emails.</li>
                    </ul>
                `;
        
                Swal.fire({
                    title: '❌ Incorrect!',
                    html: warningMessage,
                    icon: 'error'
                });
            }
        
            currentEmail++;
        
            if (currentEmail < emails.length) {
                setTimeout(loadEmail, 1000);
            } else {
                showQuizResults();
            }
        }
        
        
        function showQuizResults() {
            let timeTaken = Math.floor((new Date() - startTime) / 1000);
            Swal.fire({
                title: 'Quiz Complete!',
                html: `<p>Questions Attempted: ${emails.length}</p><p>Correct Answers: ${correctAnswers}</p><p>Time Taken: ${timeTaken} seconds</p>`,
                icon: 'success',
                confirmButtonText: 'Return to Login'
            }).then(() => {
                // Hide quiz screen and show login screen
                document.getElementById('quiz-screen').classList.add('hidden');
                document.getElementById('login-screen').classList.remove('hidden');
                document.getElementById('email').value = ''; // Clear email input field
            });
        }
        
        // <header class="header"><span class="google-logo">GMAIL</span></header>