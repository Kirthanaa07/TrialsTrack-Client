export const statusOptions = [
  { name: 'ACTIVE_NOT_RECRUITING', id: 'active_not_recruiting' },
  { name: 'COMPLETED', id: 'completed' },
  { name: 'ENROLLING_BY_INVITATION', id: 'enrolling_by_invitation' },
  { name: 'NOT_YET_RECRUITING', id: 'not_yet_recruiting' },
  { name: 'RECRUITING', id: 'recruiting' },
  { name: 'SUSPENDED', id: 'suspended' },
  { name: 'TERMINATED', id: 'terminated' },
  { name: 'WITHDRAWN', id: 'withdrawn' },
  { name: 'AVAILABLE', id: 'available' },
  { name: 'NO_LONGER_AVAILABLE', id: 'no_longer_available' },
  { name: 'TEMPORARILY_NOT_AVAILABLE', id: 'temporarily_not_available' },
  { name: 'APPROVED_FOR_MARKETING', id: 'approved_for_marketing' },
  { name: 'WITHHELD', id: 'withheld' },
  { name: 'UNKNOWN', id: 'unknown' },
];

export const roleOptions = [
  { name: 'Admin', id: 'admin' },
  { name: 'Researcher', id: 'researcher' },
  { name: 'Patient', id: 'patient' },
];

export const patientStatusOptions = [
  { name: 'NOT_INTERESTED', id: 'not_interested' },
  { name: 'WITHDRAWN', id: 'withdrawn' },
  { name: 'INTERESTED', id: 'interested' },
  { name: 'ENROLLED', id: 'enrolled' },
];

export const studyTypeOptions = [
  { name: 'OBSERVATIONAL', id: 'observational' },
  { name: 'INTERVENTIONAL', id: 'interventional' },
  { name: 'EXPANDED ACCESS', id: 'expanded_access' },
];

export const trialColumns = [
  { name: 'ID', id: 'id', sortable: true },
  { name: 'NCT', id: 'nct_id', sortable: true },
  { name: 'TITLE', id: 'title', sortable: true },
  { name: 'OVERALL STATUS', id: 'overall_status', sortable: true },
  { name: 'STUDY TYPE', id: 'study_type' },
  { name: 'PHASE', id: 'phase' },
  { name: 'BRIEF SUMMARY', id: 'brief_summary', sortable: true },
  { name: 'ACTIONS', id: 'actions' },
];

export const userColumns = [
  { name: 'ID', id: 'id', sortable: true },
  { name: 'NAME', id: 'name', sortable: true },
  { name: 'EMAIL', id: 'email', sortable: true },
  { name: 'ROLE', id: 'role', sortable: true },
  { name: 'LOCATION', id: 'location', sortable: true },
  { name: 'DEPARTMENT', id: 'department' },
  { name: 'AGE', id: 'age', sortable: true },
  { name: 'GENDER', id: 'gender', sortable: true },
  { name: 'DOB', id: 'dob' },
  { name: 'UID', id: 'uid', sortable: true },
  { name: 'ACTIONS', id: 'actions' },
];

export const locationColumns = [
  { name: 'ID', id: 'id', sortable: true },
  { name: 'NAME', id: 'name', sortable: true },
  { name: 'ADDRESS', id: 'address', sortable: true },
  { name: 'GEO LATITUDE', id: 'lat' },
  { name: 'GEO LONGITUDE', id: 'lon', sortable: true },
  { name: 'ACTIONS', id: 'actions' },
];

export const patientColumns = [
  { name: 'ID', id: 'id', sortable: true },
  { name: 'STATUS', id: 'status', sortable: true },
  { name: 'LOCATION', id: 'location', sortable: true },
  { name: 'NAME', id: 'name', sortable: true },
  { name: 'EMAIL', id: 'email', sortable: true },
  { name: 'AGE', id: 'age', sortable: true },
  { name: 'GENDER', id: 'gender' },
  { name: 'DOB', id: 'dob', sortable: true },
  { name: 'ACTIONS', id: 'actions' },
];

export const statusColorMap = {
  ACTIVE_NOT_RECRUITING: 'warning',
  COMPLETED: 'danger',
  ENROLLING_BY_INVITATION: 'warning',
  NOT_YET_RECRUITING: 'danger',
  RECRUITING: 'success',
  SUSPENDED: 'warning',
  TERMINATED: 'danger',
  WITHDRAWN: 'danger',
  AVAILABLE: 'success',
  NO_LONGER_AVAILABLE: 'danger',
  TEMPORARILY_NOT_AVAILABLE: 'danger',
  APPROVED_FOR_MARKETING: 'success',
  WITHHELD: 'warning',
  UNKNOWN: 'warning',
};

export const userRoleColorMap = {
  Admin: 'secondary',
  Researcher: 'primary',
  Patient: 'success',
};

export const patientStatusColorMap = {
  NOT_INTERESTED: 'danger',
  WITHDRAWN: 'danger',
  INTERESTED: 'warning',
  ENROLLED: 'success',
};
