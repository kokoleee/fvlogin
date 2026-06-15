import React, { useState } from 'react';
import { USFlag, BitcoinIcon, EthereumIcon, USDCIcon } from './SharedSVGs';
import { Transaction, UserProfile } from '../types';
import { 
  DollarSign, 
  Plus, 
  QrCode, 
  TrendingUp, 
  User, 
  ShieldCheck, 
  Briefcase, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  Info 
} from 'lucide-react';

interface DashboardViewProps {
  userProfile: UserProfile;
  transactions: Transaction[];
  onNavigateToTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  userProfile, 
  transactions, 
  onNavigateToTab 
}) => {
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [selectedTxAccount, setSelectedTxAccount] = useState('All Accounts');

  // Format currency helper
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Portfolio Balance Banner styled with absolute precision using Minimal design aesthetics */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Background icon decoration with subtle transparency */}
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <svg className="w-24 h-24 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.21 1.87 1.48 0 2.22-.85 2.22-1.78 0-1.12-.87-1.64-3.08-2.17-2.45-.6-3.92-1.65-3.92-3.87 0-1.95 1.51-3.23 3.27-3.59V3.53h2.67v1.86c1.39.26 2.67 1.13 2.87 2.92h-1.91c-.13-1.01-.76-1.57-1.86-1.57-1.16 0-1.95.53-1.95 1.52 0 1.01.69 1.45 2.81 1.95 2.65.62 4.19 1.63 4.19 4.07 0 2.05-1.4 3.32-3.32 3.81z"/>
          </svg>
        </div>
        
        <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">USD Portfolio Balance</p>
        <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          ${userProfile.usdBalance.toLocaleString()}.<span className="text-2xl md:text-3xl opacity-40">00</span>
        </h3>
        
        <div className="mt-6 flex flex-wrap gap-2.5">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100/50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Active Custody Account
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-full border border-slate-200 flex items-center gap-1">
            Primary Savings Portfolio
          </span>
        </div>
      </div>

      {/* Profile Details expander block matching "Customer Information" */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xs overflow-hidden">
        <button
          onClick={() => setShowProfileDetails(!showProfileDetails)}
          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition-all font-sans"
        >
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-slate-100 text-slate-900 rounded-xl">
              <User className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Account Holder Profile</h3>
              <p className="text-xs text-slate-400 mt-0.5">Cora Miller • Springfield, Illinois</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-black">
              {showProfileDetails ? 'Collapse Profile' : 'Expand Profile'}
            </span>
            <ChevronRight className={`w-4 h-4 text-black transition-transform ${showProfileDetails ? 'rotate-90' : 'rotate-0'}`} />
          </div>
        </button>

        {showProfileDetails && (
          <div className="px-6 pb-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm bg-slate-50/20">
            {/* Customer Info */}
            <div className="space-y-3.5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Human Profile
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-400 font-medium">Full Name</span>
                  <span className="font-bold text-slate-900">{userProfile.fullName}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-400 font-medium">Occupation</span>
                  <span className="font-bold text-slate-900">{userProfile.occupation}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-400 font-medium">Birth Date</span>
                  <span className="font-mono font-bold text-slate-900">{userProfile.dob}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3.5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-500" /> Contact Info
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-400 font-medium">Email</span>
                  <span className="font-bold text-slate-900 break-all text-right">{userProfile.email}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-400 font-medium">Phone Number</span>
                  <span className="font-mono font-bold text-slate-900">{userProfile.phoneNumber}</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3.5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" /> Location Details
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-400 font-medium">Country</span>
                  <span className="font-bold text-slate-900">{userProfile.country}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-400 font-medium">State</span>
                  <span className="font-bold text-slate-900">{userProfile.state}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-400 font-medium">City</span>
                  <span className="font-bold text-slate-900">{userProfile.city}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fiat Custody (01) Section Exactly Mimicking the Reference Style */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 mb-4 flex items-center gap-2 uppercase tracking-wider">
          Fiat Custody <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full text-[10px] font-extrabold">(01)</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* USD Custody Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between min-h-[160px] relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <USFlag size={32} />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">USD</h3>
                  <p className="text-xs text-slate-400">Custody Account (USD)</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {formatCurrency(userProfile.usdBalance)}
              </p>
            </div>
          </div>

          {/* Apply for New Account Button Card mimics the plus dashed card */}
          <button
            onClick={() => onNavigateToTab('USD Account')}
            className="border-2 border-dashed border-slate-200 rounded-3xl p-6 hover:border-black hover:bg-slate-50/50 transition-all flex flex-col items-center justify-center min-h-[160px] text-center group cursor-pointer border-slate-200"
          >
            <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-slate-100 flex items-center justify-center transition-colors">
              <Plus className="w-5 h-5 text-slate-400 group-hover:text-black" />
            </div>
            <span className="mt-3 text-xs font-bold text-slate-500 group-hover:text-slate-800 uppercase tracking-wider">
              Apply for New Account
            </span>
          </button>
        </div>
      </div>

      {/* Digital Asset Custody (03) Section Exactly Mimicking the Reference Style */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 mb-4 flex items-center gap-2 uppercase tracking-wider">
          Digital Asset Custody <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full text-[10px] font-extrabold">(03)</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          
          {/* Bitcoin Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between min-h-[180px] relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <BitcoinIcon size={32} />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Bitcoin</h3>
                  <p className="text-xs text-slate-400">Custody (BTC)</p>
                </div>
              </div>
              <QrCode className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
            
            <div className="mt-6 space-y-1">
              <p className="text-xs font-mono font-bold text-slate-400">0.00100000 BTC</p>
              <p className="text-xl font-extrabold text-slate-950">$27.67</p>
            </div>
          </div>

          {/* Ethereum Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between min-h-[180px] relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <EthereumIcon size={32} />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Ethereum</h3>
                  <p className="text-xs text-slate-400">Custody (ETH)</p>
                </div>
              </div>
              <QrCode className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
            
            <div className="mt-6 space-y-1">
              <p className="text-xs font-mono font-bold text-slate-400">0.00 ETH</p>
              <p className="text-xl font-extrabold text-slate-950">$0.00</p>
            </div>
          </div>

          {/* USD Coin Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between min-h-[180px] relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <USDCIcon size={32} />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">USD Coin</h3>
                  <p className="text-xs text-slate-400">Custody (USDC)</p>
                </div>
              </div>
              <QrCode className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
            
            <div className="mt-6 space-y-1">
              <p className="text-xs font-mono font-bold text-slate-400">0.00 USDC</p>
              <p className="text-xl font-extrabold text-slate-950">$0.00</p>
            </div>
          </div>

          {/* Apply Card */}
          <button
            onClick={() => onNavigateToTab('USD Account')}
            className="border-2 border-dashed border-slate-200 rounded-3xl p-6 hover:border-black hover:bg-slate-50/50 transition-all flex flex-col items-center justify-center min-h-[180px] text-center group cursor-pointer border-slate-200"
          >
            <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-slate-100 flex items-center justify-center transition-colors">
              <Plus className="w-5 h-5 text-slate-400 group-hover:text-black" />
            </div>
            <span className="mt-3 text-xs font-bold text-slate-500 group-hover:text-slate-800 uppercase tracking-wider">
              Apply for New Account
            </span>
          </button>

        </div>
      </div>

      {/* Recent Transactions List with Filter mimicking screenshot */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Transactions</h2>
          <div className="flex items-center gap-2">
            <select
              value={selectedTxAccount}
              onChange={(e) => setSelectedTxAccount(e.target.value)}
              className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer transition-all"
            >
              <option value="All Accounts">Account (USD)</option>
              <option value="BTC">Account (BTC)</option>
              <option value="Custody">Custody Accounts</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="py-4 flex items-center justify-between hover:bg-slate-50/40 px-2 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50/70 text-rose-500'
                }`}>
                  <DollarSign className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{tx.title}</h4>
                  <p className="text-xs font-bold font-mono text-slate-400 mt-0.5">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold font-mono ${
                  tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'
                }`}>
                  {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
                <span className="text-[10px] font-bold block text-slate-400 mt-0.5 uppercase tracking-wide">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
