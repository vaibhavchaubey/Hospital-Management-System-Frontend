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

export { bloodGroups, bloodGroup, doctorSpecializations, doctorDepartments };
