import React, { useState } from 'react';
import { USFlag } from './SharedSVGs';
import { UserProfile, Transaction } from '../types';
import { Copy, Check, Download, Printer, HelpCircle, Search, Calendar, FileText } from 'lucide-react';

interface USDAccountViewProps {
  userProfile: UserProfile;
  transactions: Transaction[];
}

export const USDAccountView: React.FC<USDAccountViewProps> = ({ userProfile, transactions }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [txTypeFilter, setTxTypeFilter] = useState('all');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Filter transactions based on type and text
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.title.toLowerCase().includes(searchText.toLowerCase()) || 
                          (tx.reference && tx.reference.toLowerCase().includes(searchText.toLowerCase()));
    
    if (txTypeFilter === 'all') return matchesSearch;
    if (txTypeFilter === 'credit') return matchesSearch && tx.type === 'credit';
    if (txTypeFilter === 'debit') return matchesSearch && tx.type === 'debit';
    return matchesSearch;
  });

  const accountDetails = [
    { label: 'Beneficiary Name', value: userProfile.fullName },
    { label: 'Account Number (DDA)', value: '882049103829' },
    { label: 'ACH/Routing Number', value: '111000025' },
    { label: 'SWIFT/BIC Code', value: 'FVBKUS33XXX' },
    { label: 'Account Type', value: 'USD Fiat Custody Account' },
    { label: 'Bank Address', value: 'FV Bank, Springfield, Illinois, USA' },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Account Overview Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl flex items-center justify-center">
            <USFlag size={44} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>
              <span className="text-xs font-semibold text-slate-400">DDA Checking</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">USD Custody Account</h1>
            <p className="text-xs text-slate-500 mt-1 font-mono">Account DDA: **** **** 3829 • Springfield Branch</p>
          </div>
        </div>

        <div className="text-left md:text-right space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Available Balance</span>
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight block">
            {formatCurrency(userProfile.usdBalance)}
          </span>
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 md:justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            100% Fully Seeded & Cleared
          </span>
        </div>
      </div>

      {/* Account Details & Metadata Copy Segment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Wire & Transfer Instructions Panel */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Banking Coordinates & Details</h2>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">USD Wire / ACH</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accountDetails.map((detail) => (
              <div 
                key={detail.label} 
                className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between group hover:border-blue-100 hover:bg-white transition-all shadow-2xs"
              >
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{detail.label}</span>
                <div className="flex items-center justify-between gap-3 mt-1.5">
                  <span className="text-sm font-semibold text-slate-900 break-all select-all font-mono">
                    {detail.value}
                  </span>
                  <button
                    onClick={() => copyToClipboard(detail.value, detail.label)}
                    className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-500 transition-all cursor-pointer shadow-3xs"
                    title={`Copy ${detail.label}`}
                  >
                    {copiedField === detail.label ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Limit Metrics Right Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Account Features</h3>
              <p className="text-xs text-slate-400 mt-0.5">Assigned tier thresholds</p>
            </div>

            <div className="space-y-3.5 pt-1">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  <span>Daily Transfer Limit</span>
                  <span className="text-slate-900 font-mono">$1,000,000</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-black h-full rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  <span>Monthly Accumulative Limit</span>
                  <span className="text-slate-900 font-mono">$10,000,000</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-black h-full rounded-full" style={{ width: '48.5%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-sans font-semibold">
                Wire deposits are unlimited. Transfer limits apply purely to out-going wire payments from the custody ledger.
              </p>
            </div>
          </div>

          <button
            onClick={() => alert("Printing Official Account letter is downloading...")}
            className="w-full py-3 px-4 mt-4 border border-slate-200 hover:border-black bg-slate-50 text-slate-700 hover:text-black hover:bg-slate-100 font-bold text-xs rounded-2xl tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-black" /> Download Bank Letter (PDF)
          </button>
        </div>
      </div>

      {/* Structured Account Ledger & Transaction Search Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Ledger / Transaction History</h2>
            <p className="text-xs text-slate-400 mt-0.5">Real-time custody operations ledger</p>
          </div>

          {/* Interactive Filters Grid */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search description..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs font-bold border border-slate-200 rounded-xl w-full md:w-48 bg-slate-50 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Credit/Debit Filter Pills */}
            <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-0.5">
              <button
                onClick={() => setTxTypeFilter('all')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  txTypeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setTxTypeFilter('credit')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  txTypeFilter === 'credit' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-500 hover:text-emerald-500'
                }`}
              >
                Credits
              </button>
              <button
                onClick={() => setTxTypeFilter('debit')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  txTypeFilter === 'debit' ? 'bg-white text-rose-500 shadow-xs' : 'text-slate-500 hover:text-rose-500'
                }`}
              >
                Debits
              </button>
            </div>

            {/* Export buttons */}
            <div className="flex gap-1">
              <button
                title="Print Statement"
                onClick={() => window.print()}
                className="p-2 border border-slate-200 rounded-xl text-slate-500 bg-white hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
              <button
                title="Download CSV Ledger"
                onClick={() => alert('Statement downloaded as CSV successfully!')}
                className="p-2 border border-slate-200 rounded-xl text-slate-500 bg-white hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Ledger Table rendering */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                <th className="py-3 px-4 rounded-l-xl">Reference ID</th>
                <th className="py-3 px-4">Transaction / Description</th>
                <th className="py-3 px-4">Ledger Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Value Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-blue-600">
                      {tx.reference || `REF-${tx.id.toUpperCase()}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{tx.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wide">Standard Custody Ledger</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-550">
                      {tx.date}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        tx.type === 'credit' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50/70 text-rose-600'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          tx.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-400'
                        }`} />
                        {tx.status}
                      </span>
                    </td>
                    <td className={`py-3.5 px-4 text-right font-mono font-bold ${
                      tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'
                    }`}>
                      {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                    No transactions match your search/filter parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
