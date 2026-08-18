import React, { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import useAuthStore from '../../../store/useAuthStore';
import { apiFetch } from '../../../utils/api';
import { uploadCarImage } from '../../../utils/uploadImage';
import { isKycVerified, kycLabel } from '../../../utils/kyc';

const DashboardProfile = ({ user }) => {
  const { profile, setProfile } = useAuthStore();
  const merged = {
    displayName: profile?.displayName || user?.displayName || '',
    email: user?.email || profile?.email || '',
    phoneNumber: profile?.phoneNumber || '',
    photoURL: profile?.photoURL || user?.photoURL || '',
    kycStatus: profile?.kycStatus || 'pending',
    licenceNumber: profile?.licenceNumber || '',
    licenceImage: profile?.licenceImage || '',
    kycRejectReason: profile?.kycRejectReason || '',
    role: profile?.role || 'both',
  };

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(merged.displayName);
  const [phone, setPhone] = useState(merged.phoneNumber);
  const [licenceNumber, setLicenceNumber] = useState(merged.licenceNumber);
  const [licenceFile, setLicenceFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [kycSaving, setKycSaving] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  useEffect(() => {
    setName(merged.displayName);
    setPhone(merged.phoneNumber);
    setLicenceNumber(merged.licenceNumber);
  }, [merged.displayName, merged.phoneNumber, merged.licenceNumber]);

  const verified = isKycVerified(profile);
  const statusText = verified ? 'Verified' : kycLabel(merged.kycStatus);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setOk('');
    try {
      const data = await apiFetch('api/users/me', {
        method: 'PATCH',
        body: JSON.stringify({ displayName: name.trim(), phoneNumber: phone.trim() }),
      });
      setProfile({ ...profile, ...data.user });
      setEditing(false);
      setOk('Profile saved');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const submitKyc = async (e) => {
    e.preventDefault();
    setKycSaving(true);
    setError('');
    setOk('');
    try {
      let licenceImage = merged.licenceImage;
      if (licenceFile) licenceImage = await uploadCarImage(licenceFile);
      if (!licenceImage) throw new Error('Upload a photo of your driving licence');
      const data = await apiFetch('api/users/me/kyc', {
        method: 'POST',
        body: JSON.stringify({
          licenceNumber: licenceNumber.trim(),
          licenceImage,
        }),
      });
      setProfile({ ...profile, ...data.user });
      setLicenceFile(null);
      setOk('Licence submitted. Admin will verify it.');
    } catch (err) {
      setError(err.message);
    } finally {
      setKycSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-[var(--surface)] rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--line)] p-8">
        <div className="flex justify-between items-start mb-6 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-2">Profile</p>
            <h2 className="text-2xl font-bold text-[var(--ink)]">Personal information</h2>
          </div>
          {!editing && (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        {ok && <p className="text-sm text-[var(--success)] mb-4">{ok}</p>}

        {editing ? (
          <form onSubmit={saveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile" />
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">Email address</label>
              <p className="text-lg font-medium text-[var(--ink)]">{merged.email}</p>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <Button type="submit" variant="primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
              <Button type="button" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">Full name</label>
              <p className="text-lg font-medium text-[var(--ink)]">{merged.displayName || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">Email address</label>
              <p className="text-lg font-medium text-[var(--ink)]">{merged.email || '—'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">Phone number</label>
              <p className="text-lg font-medium text-[var(--ink)]">{merged.phoneNumber || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">Member since</label>
              <p className="text-lg font-medium text-[var(--ink)]">
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : '—'}
              </p>
            </div>
          </div>
        )}
      </div>

      {merged.role !== 'admin' && (
        <form onSubmit={submitKyc} className="bg-[var(--surface)] rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--line)] p-8 space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-2">KYC</p>
            <h2 className="text-2xl font-bold text-[var(--ink)]">Driving licence</h2>
            <p className="text-sm text-[var(--muted)] mt-1">
              Required to book or list. Status: <span className="font-semibold text-[var(--ink)]">{statusText}</span>
            </p>
            {merged.kycStatus === 'rejected' && merged.kycRejectReason && (
              <p className="text-sm text-red-600 mt-2">{merged.kycRejectReason}</p>
            )}
          </div>
          <Input
            label="Licence number"
            value={licenceNumber}
            onChange={(e) => setLicenceNumber(e.target.value)}
            required
            disabled={verified}
          />
          {!verified && (
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">Licence photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLicenceFile(e.target.files?.[0] || null)}
                className="text-sm"
                required={!merged.licenceImage}
              />
              {merged.licenceImage?.startsWith('http') && (
                <img src={merged.licenceImage} alt="Licence on file" className="mt-3 h-28 rounded-md object-cover border border-[var(--line)]" />
              )}
            </div>
          )}
          {!verified && (
            <Button type="submit" variant="accent" disabled={kycSaving}>
              {kycSaving ? 'Submitting…' : 'Submit for verification'}
            </Button>
          )}
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--surface)] rounded-[var(--radius)] p-6 border border-[var(--line)]">
          <h3 className="text-[var(--muted)] font-semibold mb-2 text-sm">Account</h3>
          <p className="text-xl font-bold text-[var(--ink)] truncate">{merged.email?.split('@')[0] || 'Guest'}</p>
        </div>
        <div className="bg-[var(--accent-soft)] rounded-[var(--radius)] p-6 border border-[var(--line)]">
          <h3 className="text-[var(--muted)] font-semibold mb-2 text-sm">Licence</h3>
          <p className="text-xl font-bold text-[var(--accent)]">{statusText}</p>
        </div>
        <div className="bg-[var(--navy)] rounded-[var(--radius)] p-6 border border-[var(--navy)]">
          <h3 className="text-[var(--on-navy)]/70 font-semibold mb-2 text-sm">Role</h3>
          <p className="text-xl font-bold text-[var(--on-navy)]">
            {merged.role === 'admin' ? 'Admin' : 'Renter & host'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
