import MyTours from "@/components/user/MyTours";
import { ProfileInfo } from "@/components/user/ProfileInfo";
import Transactions from "@/components/user/Transactions";


export const renderContent = (activeTab) => {

  switch (activeTab) {
    case "profile":
      return <ProfileInfo />;
    case "tours":
      return <MyTours />;
    case "transactions":
      return <Transactions />;
    default:
      return <ProfileInfo />;
  }
};
