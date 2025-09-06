const bloodGroups = [
  { value: 'A_POSITIVE', label: 'A+' },
  { value: 'A_NEGATIVE', label: 'A-' },
  { value: 'B_POSITIVE', label: 'B+' },
  { value: 'B_NEGATIVE', label: 'B-' },
  { value: 'AB_POSITIVE', label: 'AB+' },
  { value: 'AB_NEGATIVE', label: 'AB-' },
  { value: 'O_POSITIVE', label: 'O+' },
  { value: 'O_NEGATIVE', label: 'O-' },
];

const bloodGroup: Record<string, string> = {
  A_POSITIVE: 'A+',
  A_NEGATIVE: 'A-',
  B_POSITIVE: 'B+',
  B_NEGATIVE: 'B-',
  AB_POSITIVE: 'AB+',
  AB_NEGATIVE: 'AB-',
  O_POSITIVE: 'O+',
  O_NEGATIVE: 'O-',
};

const doctorSpecializations = [
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Radiology',
  'Oncology',
  'Gynecology',
  'Psychiatry',
  'General Medicine',
];

const doctorDepartments = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Radiology',
  'Oncology',
  'Gynecology',
  'Psychiatry',
  'Emergency',
  'General Surgery',
  'ENT',
  'Urology',
  'Nephrology',
];

const appointmentReasons = [
  'General Checkup',
  'Follow-up Visit',
  'Fever / Cold / Flu',
  'Headache / Migraine',
  'Stomach Pain',
  'Chest Pain',
  'Skin Issues / Allergies',
  'Diabetes Management',
  'Blood Pressure / Hypertension',
  'Cardiac Consultation',
  'Bone / Joint Pain',
  'Pregnancy Checkup',
  'Child Health Consultation',
  'Mental Health / Counseling',
  'Surgery Consultation',
  'Vaccination',
  'Lab Test Review',
  'Prescription Refill',
  'Emergency Consultation',
  'Other',
];

const symptoms = [
  'Fever',
  'Cough',
  'Headache',
  'Fatigue',
  'Sore throat',
  'Shortness of breath',
  'Chest pain',
  'Nausea',
  'Dizziness',
  'Body aches',
  'Loss of appetite',
  'Vomiting',
  'Diarrhea',
  'Back pain',
  'Joint pain',
];

const tests = [
  'Blood Test',
  'Urine Test',
  'X-Ray',
  'MRI Scan',
  'CT Scan',
  'ECG',
  'EEG',
  'Liver Function Test',
  'Kidney Function Test',
  'Thyroid Function Test',
  'Blood Sugar Test',
  'Cholesterol Test',
  'Allergy Test',
  'Ultrasound',
  'Vitamin D Test',
];

export {
  bloodGroups,
  bloodGroup,
  doctorSpecializations,
  doctorDepartments,
  appointmentReasons,
  symptoms,
  tests,
};
