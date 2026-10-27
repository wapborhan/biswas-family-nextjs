import { fetchMembers } from "@/lib/fetchMembers";
import ImportantDaysClient from "./ImportantDaysClient";
export const metadata = {
  title: "গুরুত্বপূর্ণ দিনসমূহ - বিশ্বাস বংশ",
  description:
    "বিশ্বাস পরিবারের সদস্যদের জন্মদিন, বিবাহ বার্ষিকী ও মৃত্যুবার্ষিকী",
};
export default async function ImportantDaysPage() {
  const members = await fetchMembers();
  return (
    <div className="main-page-wrapper">
      <ImportantDaysClient members={members || []} />
    </div>
  );
}
