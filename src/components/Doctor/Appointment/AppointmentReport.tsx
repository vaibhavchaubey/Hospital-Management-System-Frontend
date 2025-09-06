import { Fieldset, MultiSelect, Textarea, TextInput } from '@mantine/core';
import { symptoms, tests } from '../../Data/DropdownData';

const AppointmentReport = () => {
  return (
    <div>
      <Fieldset
        className="grid grid-cols-2 gap-4
      "
        legend={
          <span className="text-lg font-medium text-primary-500">
            Personal information
          </span>
        }
        radius="md"
      >
        <MultiSelect
          className="col-span-2"
          withAsterisk
          label="Symptoms"
          placeholder="Pick symptoms"
          data={symptoms}
        />
        <MultiSelect
          className="col-span-2"
          withAsterisk
          label="Tests"
          placeholder="Pick tests"
          data={tests}
        />

        <TextInput
          withAsterisk
          label="Diagnosis"
          placeholder="Enter diagnosis"
        />
        <TextInput
          withAsterisk
          label="Refferal"
          placeholder="Enter refferal details"
        />
        <Textarea
          className="col-span-2"
          withAsterisk
          label="Notes"
          placeholder="Enter any additional notes"
        />
      </Fieldset>
    </div>
  );
};

export default AppointmentReport;

/* 

    private Long id;
    private Long patientId;
    private Long doctorId;
    private Long appointmentId;
    private List<String> symptoms;
    private String diagnosis;
    private List<String> tests;
    private String notes;
    private String referral;
    private PrescriptionDTO prescription;
    private LocalDate followUpDate;
    private LocalDateTime createdAt;
*/
