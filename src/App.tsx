import React, { useState } from 'react';
import { ActiveTab, UserProfile, Transaction, SupportTicket } from './types';
import { Login } from './components/Login';
import { FVBankLogo, USFlag } from './components/SharedSVGs';
import { DashboardView } from './components/DashboardView';
import { USDAccountView } from './components/USDAccountView';
import { DepositInstructionsView } from './components/DepositInstructionsView';
import { MakePaymentView } from './components/MakePaymentView';
import { HelpSupportView } from './components/HelpSupportView';
import { 
  LayoutGrid, 
  CircleDollarSign, 
  ArrowUpRight, 
  ArrowRightLeft, 
  Briefcase, 
  RefreshCw, 
  HelpCircle, 
  LogOut, 
  Menu, 
  Bell, 
  ChevronDown, 
  UserCircle, 
  X,
  AlertCircle,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Dashboard);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Seed customer profile data precisely responding to user request parameters
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "Coramiller David",
    occupation: "Retired",
    dob: "01/03/1947",
    email: "Coradavemiller@gmail.com",
    phoneNumber: "+1 618 444 7011",
    country: "United States",
    state: "Illinois",
    city: "Springfield",
    usdBalance: 4850000,
  });

  // Seed transaction state with realistic, balanced banking transaction list
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx-101",
      title: "Incoming FedWire Credit",
      date: "06-12-2026",
      amount: 4800000,
      type: "credit",
      status: "completed",
      reference: "WF-USD-9920148",
    },
    {
      id: "tx-102",
      title: "Initial Account Setup Bonus",
      date: "06-11-2026",
      amount: 49529.51,
      type: "credit",
      status: "completed",
      reference: "GRNT-09241"
    },
    {
      id: "tx-103",
      title: "FV Bank Deposit Receipt",
      date: "09-10-2023",
      amount: 470.49,
      type: "credit",
      status: "completed",
      reference: "TX-FV-0149021"
    },
    {
      id: "tx-104",
      title: "Digital Account Fee Sync Charge",
      date: "06-10-2026",
      amount: 120,
      type: "debit",
      status: "completed",
      reference: "FEE-4892A0"
    }
  ]);

  // Seed support ticket log detailing her crypto base fee holding
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "tkt-2048",
      subject: "Verification requirements for outcoming Wire Authorization",
      category: "Crypto Base Fee Hold",
      status: "open",
      createdAt: "06-14-2026",
      messages: [
        {
          sender: "user",
          text: "Hello, I am trying to initiate a wire transfer of my USD balance, but the Make a Payment tab indicates that my crypto base fee is currently pending. How do I proceed to resolve this hold?",
          timestamp: "06-14-2026 10:15 AM",
        },
        {
          sender: "support",
          text: "Dear Cora, thank you for reaching out to FV Bank support. Yes, as an institutional client, custody address synchronicity mandates a Crypto Base Fee settling verification before outward wire channels can be authorized. This base fee ensures compliance with digital asset security standards. Please coordinate with our team to fulfill the pending base fee.",
          timestamp: "06-14-2026 10:45 AM",
        }
      ]
    }
  ]);

  const handleAddTicket = (subject: string, category: string, initialMessage: string) => {
    const newId = `tkt-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newTicket: SupportTicket = {
      id: newId,
      subject,
      category,
      status: "open",
      createdAt: nowStr,
      messages: [
        {
          sender: "user",
          text: initialMessage,
          timestamp: `${nowStr} ${timeStr}`,
        }
      ]
    };

    setTickets([newTicket, ...tickets]);
  };

  const handleAddMessageToTicket = (ticketId: string, text: string) => {
    const nowStr = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setTickets(tickets.map(tkt => {
      if (tkt.id === ticketId) {
        return {
          ...tkt,
          messages: [
            ...tkt.messages,
            {
              sender: "user",
              text,
              timestamp: `${nowStr} ${timeStr}`
            }
          ]
        };
      }
      return tkt;
    }));
  };

  const secureLogout = () => {
    setShowLogoutModal(false);
    setIsLoggedIn(false);
    setActiveTab(ActiveTab.Dashboard);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans">
      
      {/* Persistent Left Sidebar - Responsive Design */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between py-6 transition-transform duration-300
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-6 flex-1 flex flex-col">
          {/* Logo segment */}
          <div className="px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center font-black text-white text-lg font-sans">CD</div>
              <span className="text-slate-900 font-extrabold tracking-tight text-sm uppercase">FV Bank</span>
            </div>
            <button 
              onClick={() => setMobileSidebarOpen(false)} 
              className="md:hidden p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links mimicking exact sidebar screenshot */}
          <nav className="space-y-1.5 px-4 flex-1">
            
            {/* Dashboard Link */}
            <button
              id="sidebar-dashboard"
              onClick={() => {
                setActiveTab(ActiveTab.Dashboard);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === ActiveTab.Dashboard
                  ? 'bg-black text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors'
              }`}
            >
              <LayoutGrid className="w-4.5 h-4.5" />
              <span>Dashboard</span>
            </button>

            {/* USD Account Link */}
            <button
              id="sidebar-usd-account"
              onClick={() => {
                setActiveTab(ActiveTab.USD_Account);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === ActiveTab.USD_Account
                  ? 'bg-black text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors'
              }`}
            >
              <CircleDollarSign className="w-4.5 h-4.5" />
              <span>USD Account</span>
            </button>

            {/* Deposit Instruction Link */}
            <button
              id="sidebar-deposit"
              onClick={() => {
                setActiveTab(ActiveTab.Deposit_Instructions);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === ActiveTab.Deposit_Instructions
                  ? 'bg-black text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors'
              }`}
            >
              <ArrowUpRight className="w-4.5 h-4.5" />
              <span>Deposit Instruction</span>
            </button>

            {/* Make Payment Link */}
            <button
              id="sidebar-payment"
              onClick={() => {
                setActiveTab(ActiveTab.Make_Payment);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === ActiveTab.Make_Payment
                  ? 'bg-black text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors'
              }`}
            >
              <span className="flex items-center gap-3">
                <ArrowRightLeft className="w-4.5 h-4.5" />
                <span>Make a Payment</span>
              </span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* Custody Accounts Link */}
            <button
              onClick={() => alert("Digital Asset Custody (BTC, ETH, USDC) features are active on the main Dashboard.")}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Briefcase className="w-4.5 h-4.5" />
                <span>Custody Accounts</span>
              </span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* Convert Link */}
            <button
              onClick={() => alert("Exchange and Conversion portal is locked pending crypto base fee completion.")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4.5 h-4.5" />
              <span>Convert</span>
            </button>

            {/* Horizontal Line Divider */}
            <div className="py-2 px-4">
              <div className="h-[1px] bg-slate-200" />
            </div>

            {/* Help & Support Link */}
            <button
              id="sidebar-help"
              onClick={() => {
                setActiveTab(ActiveTab.Help_Support);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === ActiveTab.Help_Support
                  ? 'bg-black text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors'
              }`}
            >
              <HelpCircle className="w-4.5 h-4.5" />
              <span>Help & Support</span>
            </button>

          </nav>
        </div>

        {/* Sidebar Footer User Card with design layout specs exactly */}
        <div className="mt-auto p-4 shrink-0">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center gap-3 mb-3 text-left">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold uppercase shrink-0 text-sm">
                CD
              </div>
              <div className="overflow-hidden">
                <p className="text-slate-900 text-xs font-bold truncate leading-snug">{profile.fullName}</p>
                <p className="text-slate-500 text-[10px] truncate underline">{profile.email}</p>
              </div>
            </div>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-rose-650 text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-100 border-0 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout Session
            </button>
          </div>
        </div>
      </aside>

      {/* Outer Click overlay for mobile menu drawer */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)} 
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Body Column containing Header & dynamic Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Header Navigation Bar precisely matching visual hierarchy */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileSidebarOpen(true)} 
              className="md:hidden p-1.5 -ml-1.5 rounded-lg hover:bg-slate-50 text-slate-600 block cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 font-sans">
              <span className="text-slate-400 font-semibold text-xs uppercase hover:text-slate-600 cursor-pointer">FV Bank</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-800 font-bold text-sm select-none">{activeTab}</span>
            </div>
          </div>

          {/* Right hand Header pills (Notification & Profile Dropdown) */}
          <div className="flex items-center gap-3.5 relative">
            
            {/* Notification bell trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileDropdown(false);
                }}
                className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all relative cursor-pointer shadow-xs"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center leading-none">
                  4
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2.5 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-2.5">
                  <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Account Alerts</span>
                    <span className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">Mark read</span>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="p-3.5 space-y-1 bg-amber-50/40 border-l-4 border-amber-400">
                      <p className="font-semibold text-amber-950 flex items-center justify-between">
                        <span>Base Fee Held</span>
                        <span className="text-[9px] font-mono font-medium text-amber-600">Active</span>
                      </p>
                      <p className="text-amber-800/80 leading-normal">Your Crypto Base Fee is currently pending. Outbound wire service is locked.</p>
                    </div>
                    <div className="p-3.5 space-y-1 hover:bg-slate-50">
                      <p className="font-semibold text-slate-900 flex items-center justify-between">
                        <span>Fund Credit Cleared</span>
                        <span className="text-[9px] font-mono font-medium text-slate-400">2 days ago</span>
                      </p>
                      <p className="text-slate-500 leading-normal">US wire inward transfer of $4,800,000.00 has successfully settled.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Picker Dropdown representing logged-in Cora Miller */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-1.5 md:gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 p-1 md:py-1.5 md:px-3 rounded-full transition-all text-xs font-semibold cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  C
                </div>
                <span className="text-slate-700 max-w-[110px] truncate hidden md:inline-block">{profile.fullName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:inline-block" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2.5 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 space-y-3.5">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                      CD
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{profile.fullName}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{profile.occupation}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs text-slate-600 font-medium">
                    <p className="flex justify-between">
                      <span className="text-slate-400">Status</span>
                      <span className="text-slate-900 font-bold">Premium Client</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">DOB</span>
                      <span className="font-mono text-slate-900">{profile.dob}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">Springfield IL</span>
                      <span className="text-slate-900">Illinois, USA</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full py-1.5 bg-rose-50 text-rose-600 font-bold text-[10px] uppercase rounded-lg tracking-wider text-center block hover:bg-rose-100 transition-colors"
                    >
                      Secure Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Core dynamic body panel rendering active views */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto pb-16">
          {activeTab === ActiveTab.Dashboard && (
            <DashboardView 
              userProfile={profile} 
              transactions={transactions} 
              onNavigateToTab={(tabName) => {
                if (tabName === 'USD Account') setActiveTab(ActiveTab.USD_Account);
                if (tabName === 'Deposit Instructions') setActiveTab(ActiveTab.Deposit_Instructions);
              }}
            />
          )}

          {activeTab === ActiveTab.USD_Account && (
            <USDAccountView 
              userProfile={profile} 
              transactions={transactions} 
            />
          )}

          {activeTab === ActiveTab.Deposit_Instructions && (
            <DepositInstructionsView />
          )}

          {activeTab === ActiveTab.Make_Payment && (
            <MakePaymentView />
          )}

          {activeTab === ActiveTab.Help_Support && (
            <HelpSupportView 
              tickets={tickets}
              onAddTicket={handleAddTicket}
              onAddMessageToTicket={handleAddMessageToTicket}
            />
          )}
        </main>
      </div>

      {/* Logout Confirmation Backdrop Modal precisely as requested */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setShowLogoutModal(false)}
            className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-xs" 
          />
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-[380px] w-full relative z-10 shadow-2xl text-center space-y-5 animate-slide-up font-sans">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <LogOut className="w-5.5 h-5.5" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="font-bold text-slate-950 text-lg">Confirm Secure Logout</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                This will terminate your active secure banking session. Please ensure your coordinates are safely completed before exiting.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={secureLogout}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer rounded-2xl"
              >
                Secure Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
