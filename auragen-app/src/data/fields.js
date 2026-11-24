// Loan application form fields.
// Each field is [section, key, label, type, options]
// Same fields as form-fields.md and the HTML prototype.
export const FIELDS = [
  ["Personal Details", "fullName", "Full name", "text"],
  ["Personal Details", "dob", "Date of birth", "date"],
  ["Personal Details", "gender", "Gender", "select", ["Female", "Male", "Other"]],
  ["Personal Details", "mobile", "Mobile number", "tel"],
  ["Personal Details", "email", "Email address", "email"],
  ["Address", "address", "Current address", "text"],
  ["Address", "city", "City", "text"],
  ["Address", "state", "State", "text"],
  ["Address", "pin", "PIN code", "text"],
  ["Identity (KYC)", "pan", "PAN number", "text"],
  ["Identity (KYC)", "aadhaar", "Aadhaar number", "text"],
  ["Employment and Income", "empType", "Employment type", "select", ["Salaried", "Self-employed", "Student"]],
  ["Employment and Income", "employer", "Employer name", "text"],
  ["Employment and Income", "income", "Monthly income (INR)", "number"],
  ["Employment and Income", "exp", "Years of experience", "number"],
  ["Loan Details", "amount", "Loan amount (INR)", "number"],
  ["Loan Details", "purpose", "Loan purpose", "select", ["Home", "Education", "Vehicle", "Personal"]],
  ["Loan Details", "tenure", "Repayment period (months)", "number"],
];

// Struggle score at which the form turns into the wizard.
export const STRUGGLE_THRESHOLD = 60;
