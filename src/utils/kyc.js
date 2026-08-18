export function isKycVerified(profile) {
  if (!profile) return false;
  if (profile.role === 'admin') return true;
  if (!profile.kycStatus) return true;
  return profile.kycStatus === 'verified';
}

export function kycLabel(status) {
  if (status === 'verified') return 'Verified';
  if (status === 'rejected') return 'Rejected';
  return 'Pending';
}
