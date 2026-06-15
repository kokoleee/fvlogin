import React, { useState } from 'react';
import { ShieldAlert, Info, ArrowRightLeft, Lock, BadgeHelp } from 'lucide-react';

export const MakePaymentView: React.FC = () => {
  const [paymentPrompt, setPaymentPrompt] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Upper Section Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Make a Payment</h1>
        <p className="text-xs text-slate-500 mt-1">Initiate domestic and international outward wire transfers from USD custody ledger</p>
      </div>

      {/* Prominent Professional Banking Notification Component */}
      <div className="bg-amber-50/60 border border-amber-200 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden">
        {/* Abstract warning background shape */}
        <div className="absolute right-0 top-0 w-24 h-24 bg-amber-200/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/40 pb-3">
              <div>
                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Crucial Pending Notice</h3>
                <p className="text-[10px] text-amber-700/80 font-bold font-mono mt-0.5">Account ID: **** 3829 • Verification Pending</p>
              </div>
              <span className="px-2.5 py-1 bg-amber-600 text-white font-bold text-[10px] rounded-lg uppercase tracking-wider leading-none self-start">
                HOLD ACTIVE
              </span>
            </div>

            {/* Letter Content exactly as instructed */}
            <div className="text-sm text-slate-800 leading-relaxed font-medium space-y-3">
              <p className="font-bold text-[#1a1a1a]">Dear Cora,</p>
              <p className="text-[13px] text-slate-700">
                We are pleased to inform you that your crypto base fee is currently pending and needs to be completed before wire transfer will be available.
              </p>
              <p className="text-[13px] text-slate-700">
                Thank you for your cooperation. We look forward to a successful working account.
              </p>
            </div>

            <div className="p-3 bg-white/80 rounded-2xl text-xs text-amber-800 border border-amber-100/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold">Required Action: Complete Pending Crypto Base Fee</span>
              <span 
                onClick={() => {
                  document.getElementById('sidebar-help')?.click();
                }}
                className="text-slate-900 font-extrabold hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-center shrink-0"
              >
                Help Desk <BadgeHelp className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Inactive Outward Wire Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Locked Outward Wire Form Details */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
          
          {/* Overlay representing the visual locked status or prompt */}
          {paymentPrompt ? (
            <div className="absolute inset-0 bg-white z-30 flex flex-col items-center justify-center p-6 text-center select-none font-sans space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-850 shadow-3xs mb-1">
                <Lock className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Required Verification</h3>
              <p className="text-xs text-slate-600 max-w-sm leading-relaxed font-bold">
                Please contact support through the Support Bot to complete your request.
              </p>
              <button
                onClick={() => {
                  document.getElementById('sidebar-help')?.click();
                }}
                className="px-5 py-2.5 bg-black hover:bg-slate-900 text-white font-extrabold text-xs rounded-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md uppercase tracking-wider"
              >
                Contact Support
              </button>
            </div>
          ) : (
            <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-6 text-center select-none">
              <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-xs mb-4">
                <Lock className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Outbound Wire Transfers Restricted</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1.5 leading-relaxed font-medium">
                Outgoing accounts are temporarily held of safety regulations. Fulfill the pending Crypto Base Fee requirement in the letter notification above to unlock transfers.
              </p>
              <div className="mt-5 flex gap-3">
                <button 
                  onClick={() => setPaymentPrompt(true)}
                  className="px-4 py-2 bg-black hover:bg-slate-900 text-white font-bold text-xs rounded-2xl transition-all shadow-xs cursor-pointer"
                >
                  Pay Base Fee
                </button>
                <button
                  onClick={() => {
                    document.getElementById('sidebar-help')?.click();
                  }}
                  className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-750 text-slate-700 hover:text-slate-900 font-bold text-xs rounded-2xl transition-all shadow-3xs cursor-pointer"
                >
                  Open Support Ticket
                </button>
              </div>
            </div>
          )}

          <div className="space-y-5 opacity-40 pointer-events-none select-none">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4" /> Transfer Request details
              </h3>
              <span className="text-xs text-slate-400">Domestic / International</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Source Account</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm" disabled>
                    <option>USD Custody Account (Available: $4,850,000.00)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Transfer Protocol</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm" disabled>
                    <option>International FedWire SWIFT Code</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Beneficiary Institution Name</label>
                <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm" placeholder="e.g. JPMorgan Chase" disabled />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Beneficiary AC Name</label>
                  <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm" placeholder="Primary Owner Name" disabled />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Beneficiary Routing Number / BIC</label>
                  <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm" placeholder="SWIFT or Routing transit number" disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Beneficiary Account Number (IBAN/DDA)</label>
                  <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm" placeholder="Account Number" disabled />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Payment Amount (USD)</label>
                  <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm" placeholder="0.00" disabled />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Message / Wire Reference Memo</label>
                <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm" placeholder="Optionally identify transfer purpose" disabled />
              </div>

              <button type="button" className="w-full py-3 bg-slate-200 text-slate-400 font-bold rounded-2xl text-sm uppercase" disabled>
                Process Outward Ledger Wire
              </button>
            </div>
          </div>
        </div>

        {/* Ledger Guidance Helper Information on Right side */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <Info className="w-4 h-4 text-slate-900" /> Verification Help
            </h3>
            
            <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
              When launching global custody entities, certain blockchains mandate <strong>Crypto Base Fees</strong> to initialize ledger address synchronicity. These safeguards guarantee that internal multi-sig cold storage networks bind cleanly with the FedWire exchange servers.
            </p>

            <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Status Ledger Metrics</span>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold">Multisig Wallet API</span>
                <span className="font-bold text-emerald-600">Active (100%)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold">Ledger Bond Status</span>
                <span className="font-bold text-rose-500">Hold Pending</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold">Wire Gateway Transit</span>
                <span className="font-bold text-slate-400">Offline (Locked)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
