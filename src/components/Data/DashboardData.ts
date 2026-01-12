const appointmentsData = [
  { date: 'Jan 2025', appointments: 20 },
  { date: 'Feb 2025', appointments: 25 },
  { date: 'Mar 2025', appointments: 18 },
  { date: 'Apr 2025', appointments: 30 },
  { date: 'May 2025', appointments: 22 },
  { date: 'Jun 2025', appointments: 28 },
  { date: 'Jul 2025', appointments: 35 },
  { date: 'Aug 2025', appointments: 40 },
  { date: 'Sep 2025', appointments: 32 },
  { date: 'Oct 2025', appointments: 27 },
  { date: 'Nov 2025', appointments: 38 },
  { date: 'Dec 2025', appointments: 45 },
];

const doctorsData = [
  { date: 'Jan 2025', doctors: 20 },
  { date: 'Feb 2025', doctors: 23 },
  { date: 'Mar 2025', doctors: 21 },
  { date: 'Apr 2025', doctors: 25 },
  { date: 'May 2025', doctors: 24 },
  { date: 'Jun 2025', doctors: 28 },
  { date: 'Jul 2025', doctors: 26 },
  { date: 'Aug 2025', doctors: 30 },
  { date: 'Sep 2025', doctors: 29 },
  { date: 'Oct 2025', doctors: 31 },
  { date: 'Nov 2025', doctors: 30 },
  { date: 'Dec 2025', doctors: 33 },
];

const patientsData = [
  { date: 'Jan 2025', patients: 42 },
  { date: 'Feb 2025', patients: 38 },
  { date: 'Mar 2025', patients: 47 },
  { date: 'Apr 2025', patients: 35 },
  { date: 'May 2025', patients: 51 },
  { date: 'Jun 2025', patients: 44 },
  { date: 'Jul 2025', patients: 58 },
  { date: 'Aug 2025', patients: 49 },
  { date: 'Sep 2025', patients: 53 },
  { date: 'Oct 2025', patients: 46 },
  { date: 'Nov 2025', patients: 60 },
  { date: 'Dec 2025', patients: 55 },
];

const diseaseData = [
  { name: 'Diabetes', value: 420, color: 'indigo.6' },
  { name: 'Heart Disease', value: 310, color: 'red.6' },
  { name: 'Asthma', value: 190, color: 'teal.6' },
  { name: 'Covid-19', value: 220, color: 'orange.6' },
  { name: 'Hypertension', value: 340, color: 'blue.6' },
  { name: 'Migraine', value: 210, color: 'pink.6' },
];

const medicines = [
  {
    name: 'Paracetamol',
    dosage: '500mg',
    stock: 75,
    manufacturer: 'Pfizer',
  },
  {
    name: 'Tylenol',
    dosage: '250mg',
    stock: 60,
    manufacturer: 'MediLife',
  },
  {
    name: 'Aspirin',
    dosage: '50mg',
    stock: 50,
    manufacturer: 'Pfizer',
  },
  {
    name: 'Ibuprofen',
    dosage: '100mg',
    stock: 40,
    manufacturer: 'MediLife',
  },
  {
    name: 'Advil',
    dosage: '500mg',
    stock: 30,
    manufacturer: 'MediLife',
  },
];

const patients = [
  {
    name: 'John Doe',
    email: 'johndoe@gmail',
    location: 'New York',
    bloodGroup: 'A+',
  },
  {
    name: 'Jane Smith',
    email: 'janesmith@gmail',
    location: 'Los Angeles',
    bloodGroup: 'B+',
  },
  {
    name: 'Michael Johnson',
    email: 'michaeljohnson@gmail',
    location: 'Chicago',
    bloodGroup: 'O+',
  },
  {
    name: 'Emily Davis',
    email: 'emilydavis@gmail',
    location: 'Houston',
    bloodGroup: 'AB+',
  },
  {
    name: 'Robert Wilson',
    email: 'robertwilson@gmail',
    location: 'Miami',
    bloodGroup: 'O-',
  },
];

const doctors = [
  {
    name: 'John Doe',
    email: 'johndoe@gmail',
    location: 'New York',
    department: 'Cardiology',
  },
  {
    name: 'Jane Smith',
    email: 'janesmith@gmail',
    location: 'Los Angeles',
    department: 'Neurology',
  },
  {
    name: 'Michael Johnson',
    email: 'michaeljohnson@gmail',
    location: 'Chicago',
    department: 'Orthopedics',
  },
  {
    name: 'Emily Davis',
    email: 'emilydavis@gmail',
    location: 'Houston',
    department: 'Pediatrics',
  },
  {
    name: 'Robert Wilson',
    email: 'robertwilson@gmail',
    location: 'Miami',
    department: 'Dermatology',
  },
];

const appointments = [
  {
    time: '9:00 AM',
    patient: 'John Doe',
    reason: 'General Checkup',
    doctor: 'Dr. Smith',
  },
  {
    time: '11:30 AM',
    patient: 'Jane Smith',
    reason: 'Chest Pain',
    doctor: 'Dr. Johnson',
  },
  {
    time: '2:00 PM',
    patient: 'Michael Johnson',
    reason: 'Headache',
    doctor: 'Dr. Williams',
  },
  {
    time: '4:30 PM',
    patient: 'Emily Davis',
    reason: 'Stomach Pain',
    doctor: 'Dr. Brown',
  },
  {
    time: '7:00 PM',
    patient: 'Robert Wilson',
    reason: 'Fever',
    doctor: 'Dr. Davis',
  },
];

export {
  appointments,
  appointmentsData,
  diseaseData,
  doctors,
  doctorsData,
  medicines,
  patients,
  patientsData,
};
