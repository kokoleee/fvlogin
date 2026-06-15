import React, { useState } from 'react';
import { USFlag } from './SharedSVGs';
import { Copy, Check, Shield, Info, HelpCircle, FileText, CheckCircle } from 'lucide-react';

export const DepositInstructionsView: React.FC = () => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(key);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const depositDetails = {
    beneficiaryName: "Coramiller David",
    beneficiaryAddr: "Springfield, Illinois, USA",
    bankName: "FV Bank International Corp",
    bankAddress: "Springfield Branch, IL, USA",
    swiftBic: "FVBKUS33XXX",
    routingAch: "111000025",
    routingWire: "021000021",
    accountNum: "882049103829",
    accountType: "USD Fiat Trust / Custody Checking",
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Upper informational banner card with cohesive dark slate minimal styling */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="max-w-3xl">
          <span className="text-[10px] font-bold text-white bg-white/10 border border-white/20 px-3 py-1 rounded-full uppercase tracking-wider">Guides & Ingress</span>
          <h1 className="text-xl md:text-2xl font-bold mt-3 tracking-tight">Deposit Instructions</h1>
          <p className="mt-2 text-xs md:text-sm text-slate-300 leading-relaxed">
            Follow these deposit instructions strictly of FV Bank to credit your fiat USD custody balance instantly. Please ensure your external bank includes the required Beneficiary details during physical wire initiation.
          </p>
        </div>
      </div>

      {/* Main Grid: Info card left & Guidelines right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Wire & ACH coordinates (2 columns on wide) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <USFlag size={24} />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">USD Incoming Wire Instructions</h2>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100/50 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Standard</span>
            </div>

            <div className="space-y-3">
              {/* Row helper component for clean fields */}
              {[
                { label: 'Beneficiary Name (Must match your account name)', value: depositDetails.beneficiaryName, key: 'benName' },
                { label: 'Beneficiary Address', value: depositDetails.beneficiaryAddr, key: 'benAddr' },
                { label: 'Receiving Bank Name', value: depositDetails.bankName, key: 'bankName' },
                { label: 'Receiving Bank SWIFT / BIC', value: depositDetails.swiftBic, key: 'swift' },
                { label: 'Receiving Bank Routing Number (ACH)', value: depositDetails.routingAch, key: 'routingAch' },
                { label: 'Receiving Bank Routing Number (Wire/ABA)', value: depositDetails.routingWire, key: 'routingWire' },
                { label: 'Beneficiary Account Number (DDA)', value: depositDetails.accountNum, key: 'account' },
                { label: 'Account Classification', value: depositDetails.accountType, key: 'type' },
              ].map((item) => (
                <div 
                  key={item.key} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 hover:bg-white border border-slate-100 p-3 rounded-2xl transition-all gap-2"
                >
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-900 font-mono mt-0.5 block">{item.value}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(item.value, item.key)}
                    className="self-start sm:self-center p-1.5 border border-slate-200 hover:border-black hover:bg-slate-50 hover:text-black bg-white text-slate-400 rounded-xl transition-all cursor-pointer shadow-3xs"
                  >
                    {copiedValue === item.key ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold px-1.5 py-0.5">
                        <Check className="w-3 text-emerald-600" /> Copied
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support, Guidance and Security details */}
        <div className="space-y-6">
          
          {/* Regulatory Security Notice Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <Shield className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Security Notice</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              FV Bank International operates in strict compliance with state and national banking statutes. 100% of USD deposits are segregated and retained in secure liquid custody reserves. Wires undergo automatic clearing house security reviews.
            </p>
            <div className="divide-y divide-slate-100 text-xs pt-1">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Reserve Coverage</span>
                <span className="font-bold text-emerald-600">1:1 Backed</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Security Audit</span>
                <span className="font-bold text-slate-800">Verified Cleared</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Processing Time</span>
                <span className="font-bold text-slate-800">1-2 Working Days</span>
              </div>
            </div>
          </div>

          {/* Customer guidance steps card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 text-slate-950">
              <CheckCircle className="w-4 h-4" /> Deposit Steps
            </h3>
            
            <ul className="space-y-3.5 text-xs text-slate-600 font-medium list-none pl-0">
              <li className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-900 font-extrabold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <span>Copy the respective Wire routing and Account numbers shown on your left.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-900 font-extrabold flex items-center justify-center shrink-0 text-[10px]">2</span>
                <span>Log into your external local bank or visit your local branch to initiate an outgoing domestic or international wire.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-900 font-extrabold flex items-center justify-center shrink-0 text-[10px]">3</span>
                <span>Enter "<strong>Coramiller David</strong>" as the beneficiary to guarantee accurate matching credits.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-900 font-extrabold flex items-center justify-center shrink-0 text-[10px]">4</span>
                <span>Deposits are processed automatically and credited directly to your custody balance.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
