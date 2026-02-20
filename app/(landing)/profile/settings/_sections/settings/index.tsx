import ProfileBody from "@/app/(landing)/profile/_layout/profile-body";
import SettingsForm from "@/app/(landing)/profile/settings/_sections/settings/settings-form";

export default function Settings() {
  return (
    <ProfileBody title="Tənzimləmələr">
      <SettingsForm />
    </ProfileBody>
  );
}
