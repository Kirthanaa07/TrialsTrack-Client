export const statusOptions = [
  { name: 'ACTIVE_NOT_RECRUITING', uid: 'active_not_recruiting' },
  { name: 'COMPLETED', uid: 'completed' },
  { name: 'ENROLLING_BY_INVITATION', uid: 'enrolling_by_invitation' },
  { name: 'NOT_YET_RECRUITING', uid: 'not_yet_recruiting' },
  { name: 'RECRUITING', uid: 'recruiting' },
  { name: 'SUSPENDED', uid: 'suspended' },
  { name: 'TERMINATED', uid: 'terminated' },
  { name: 'WITHDRAWN', uid: 'withdrawn' },
  { name: 'AVAILABLE', uid: 'available' },
  { name: 'NO_LONGER_AVAILABLE', uid: 'no_longer_available' },
  { name: 'TEMPORARILY_NOT_AVAILABLE', uid: 'temporarily_not_available' },
  { name: 'APPROVED_FOR_MARKETING', uid: 'approved_for_marketing' },
  { name: 'WITHHELD', uid: 'withheld' },
  { name: 'UNKNOWN', uid: 'unknown' },
];

export const studyTypeOptions = [
  { name: 'OBSERVATIONAL', id: 'observational' },
  { name: 'INTERVENTIONAL', id: 'interventional' },
  { name: 'EXPANDED ACCESS', id: 'expanded_access' },
];

export const trialColumns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NCT', uid: 'nct_id', sortable: true },
  { name: 'TITLE', uid: 'title', sortable: true },
  { name: 'OVERALL STATUS', uid: 'overall_status', sortable: true },
  { name: 'STUDY TYPE', uid: 'study_type' },
  { name: 'PHASE', uid: 'phase' },
  { name: 'BRIEF SUMMARY', uid: 'brief_summary', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
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