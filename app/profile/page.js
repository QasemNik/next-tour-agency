"use client";

import { SidebarItem } from "@/helper/profileSidebar";
import { useState } from "react";
import { User, Briefcase, Receipt } from "lucide-react";
import { renderContent } from "@/helper/switchTap";
import { Header } from "@/layout/Header";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 md:flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <ul className="space-y-2">
                <SidebarItem
                  label="پروفایل"
                  tabName="profile"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  icon={<User size={20} />}
                />
                <SidebarItem
                  label="تور های من"
                  tabName="tours"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  icon={<Briefcase size={20} />}
                />
                <SidebarItem
                  label="تراکنش ها"
                  tabName="transactions"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  icon={<Receipt size={20} />}
                />
              </ul>
            </div>
          </aside>
          <main className="w-full md:w-3/4">{renderContent(activeTab)}</main>
        </div>
      </div>
    </div>
  );
}
