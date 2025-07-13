export const departments = [
    'Cardiology',
    'Orthopedics',
    'Pediatrics',
    'Neurology',
    'Dermatology'
  ];
  
  export const hospitals = [
    {
      id: 'hosp1',
      name: 'City Hospital',
      location: 'Pune',
      departments: ['Cardiology', 'Orthopedics']
    },
    {
      id: 'hosp2',
      name: 'Sunshine Clinic',
      location: 'Mumbai',
      departments: ['Pediatrics', 'Neurology']
    }
  ];
  
  export const doctors = [
    {
      id: 'doc1',
      name: 'Dr. Sharma',
      qualifications: 'MBBS, MD',
      specializations: ['Cardiology'],
      experience: 10,
      associatedHospitals: [
        {
          hospitalId: 'hosp1',
          consultationFee: 800,
          availability: [
            { date: '2025-07-13', startTime: '10:00', endTime: '11:00' },
            { date: '2025-07-14', startTime: '14:00', endTime: '15:00' }
          ]
        }
      ]
    }
  ];
  
  export const patients = [
    {
      id: 'pat1',
      name: 'Rahul Verma',
      gender: 'Male',
      dob: '1995-06-01',
      uniqueId: 'Aadhar1234'
    }
  ];
  
  export const appointments = [
    {
      id: 'appt1',
      doctorId: 'doc1',
      patientId: 'pat1',
      hospitalId: 'hosp1',
      timeSlot: {
        date: '2025-07-13',
        startTime: '10:00',
        endTime: '11:00'
      },
      fee: 800,
      department: 'Cardiology'
    }
  ];
  