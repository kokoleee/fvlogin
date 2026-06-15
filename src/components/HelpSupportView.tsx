import React, { useState } from 'react';
import { SupportTicket } from '../types';
import { 
  BadgeHelp, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  LifeBuoy, 
  SendHorizontal, 
  User, 
  Clock, 
  AlertCircle,
  FilePlus,
  Ticket
} from 'lucide-react';

interface HelpSupportViewProps {
  tickets: SupportTicket[];
  onAddTicket: (subject: string, category: string, initialMessage: string) => void;
  onAddMessageToTicket: (ticketId: string, text: string) => void;
}

export const HelpSupportView: React.FC<HelpSupportViewProps> = ({ 
  tickets, 
  onAddMessageToTicket 
}) => {
  const [activeTicketId, setActiveTicketId] = useState<string | null>(tickets[0]?.id || null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [newTicketSubject] = useState('');
  const [newTicketCategory] = useState('Crypto Base Fee Verification');
  const [newTicketMessage] = useState('');
  const [chatMessageText, setChatMessageText] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const faqs = [
    {
      q: "What is the Pending Crypto Base Fee holding on my account?",
      a: "For high-volume institutional custody accounts (such as Cora's USD Custody Account), blockchain-backed ledger entries require localized address initialization fees. These fees are temporarily pending which places a security hold on outbound wire transfers. Contact support or use the tickets interface on your left to coordinate direct settlement."
    },
    {
      q: "How long do global incoming wire deposits take to credit?",
      a: "Incoming FedWires and SWIFT transactions generally reflect in your USD custody ledger within 1 to 2 business days of remittance. Ensure correct Beneficiary Name coordinates are included by the remitting banking institution."
    },
    {
      q: "Are the digital asset custody accounts fully segregated?",
      a: "Yes. FV Bank leverages multi-sig cold storage architecture where digital assets (BTC, ETH, USDC) are held in individual client trust ledgers, separated entirely from company operations in accordance with SEC custody regulations."
    },
    {
      q: "How can I obtain a copy of my official Account Verification Letter?",
      a: "Go to the USD Account tab where you can immediately download your formal Account Profile Details as a secure PDF on the right-hand panel."
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("Please contact a support agent through the Support Bot.");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessageText.trim() || !activeTicketId) return;

    onAddMessageToTicket(activeTicketId, chatMessageText.trim());
    setChatMessageText('');

    // Simulate an automatic support advisor response after 1.5 seconds to build a magical experience
    const targetId = activeTicketId;
    setTimeout(() => {
      onAddMessageToTicket(
        targetId, 
        "Dear customer, our specialized wire clearing desk has received your note. We are reviewing the status of your crypto base fee. Please expect a follow-up here within the hour."
      );
    }, 1500);
  };

  const activeTicket = tickets.find(t => t.id === activeTicketId);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Help & Support Center</h1>
        <p className="text-xs text-slate-500 mt-1">Submit tickets, chat with client services, and explore immediate helper directives</p>
      </div>

      {/* Grid: Message center/create ticket left, FAQs right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Tickets and Live Chats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row items-stretch min-h-[500px]">
            
            {/* Tickets Sidebar inside Help */}
            <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50 p-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                    <Ticket className="w-4 h-4 text-black" /> Active Chat ({tickets.length})
                  </span>
                </div>

                <div className="space-y-2">
                  {tickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => setActiveTicketId(ticket.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs font-semibold transition-all relative cursor-pointer ${
                        activeTicketId === ticket.id
                          ? 'bg-slate-950 border-slate-950 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-[9.5px] uppercase font-mono font-bold ${activeTicketId === ticket.id ? 'text-slate-300' : 'text-slate-400'}`}>{ticket.category}</span>
                        <span className={`text-[9px] font-mono font-bold ${activeTicketId === ticket.id ? 'text-slate-300' : 'text-slate-405'}`}>{ticket.createdAt}</span>
                      </div>
                      <h4 className="truncate font-bold pr-2">{ticket.subject}</h4>
                      <div className="mt-2.5 flex items-center gap-1.5 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className={`text-[10px] font-bold capitalize ${activeTicketId === ticket.id ? 'text-slate-200' : 'text-slate-500'}`}>Support Agent BOT</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-105 text-xs text-slate-400 font-sans">
                <span className="flex items-center gap-1.5 font-bold text-slate-600">
                  <Clock className="w-4 h-4 text-black" /> Support Bot: 24/7 Active
                </span>
                <p className="mt-1 font-bold text-[10px] text-slate-400">Avg response: Instant</p>
              </div>
            </div>

            {/* Ticket Conversation Chat Panel */}
            <div className="flex-1 bg-white p-4 md:p-6 flex flex-col justify-between">
              {activeTicket ? (
                <div className="flex-1 flex flex-col h-full justify-between space-y-4 min-h-[380px]">
                  {/* Active Ticket Header */}
                  <div className="border-b border-slate-100 pb-3.5 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs md:text-sm">{activeTicket.subject}</h3>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5 tracking-wider font-mono">
                        System Protocol: Intelligent Support Agent Bot
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase border border-emerald-200/50">
                      Active Chat
                    </span>
                  </div>

                  {/* Message thread logs */}
                  <div className="flex-1 space-y-3.5 overflow-y-auto max-h-[280px] pr-1.5">
                    {activeTicket.messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex gap-2 text-xs max-w-[85%] ${
                          msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                        }`}
                      >
                        {/* Avatar */}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          msg.sender === 'user' ? 'bg-slate-100 text-slate-800 border border-slate-200/50' : 'bg-slate-950 text-white'
                        }`}>
                          {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <LifeBuoy className="w-3.5 h-3.5" />}
                        </div>

                        {/* Speech Bubble */}
                        <div className={`p-3.5 rounded-3xl leading-relaxed font-semibold font-sans ${
                          msg.sender === 'user'
                            ? 'bg-slate-100 text-slate-900 rounded-tr-none border border-slate-200/60'
                            : 'bg-slate-50 text-slate-850 rounded-tl-none border border-slate-200/40'
                        }`}>
                          <p>{msg.text}</p>
                          <span className="text-[9px] text-slate-400 block text-right mt-1.5 font-mono font-bold">{msg.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Chat line */}
                  <form onSubmit={handleSendMessage} className="border-t border-slate-100 pt-3.5 flex gap-2">
                    <input
                      type="text"
                      value={chatMessageText}
                      onChange={(e) => setChatMessageText(e.target.value)}
                      placeholder="Type your message to the Support Bot..."
                      className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:outline-none focus:border-black transition-colors"
                    />
                    <button
                      type="submit"
                      className="p-3 bg-black hover:bg-slate-900 text-white rounded-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
                    >
                      <SendHorizontal className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <MessageSquare className="w-12 h-12 text-slate-200 mb-3" />
                  <p className="text-sm font-semibold">Support Bot offline.</p>
                </div>
              )}
            </div>

          </div>

          {/* Form to raise a brand new Ticket */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2 uppercase tracking-wider border-b border-slate-100 pb-3">
              <FilePlus className="w-4 h-4 text-slate-950" /> Raise a New Support Ticket
            </h3>

            {submitError && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left font-sans">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-black shrink-0 animate-pulse" />
                  <span className="font-extrabold">{submitError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const chatInput = document.querySelector('input[placeholder*="Bot"]');
                    if (chatInput) (chatInput as HTMLInputElement).focus();
                  }}
                  className="px-4 py-2 bg-black hover:bg-slate-900 text-white text-[10px] font-extrabold uppercase rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  Go to Support Bot
                </button>
              </div>
            )}

            <form onSubmit={handleTicketSubmit} className="space-y-4 opacity-55">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Query Category</label>
                  <select
                    value={newTicketCategory}
                    disabled
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold cursor-not-allowed"
                  >
                    <option value="Crypto Base Fee Hold">Crypto Base Fee Hold</option>
                    <option value="USD Outward Wire">USD Outward Wire</option>
                    <option value="Account Deposit Crediting">Account Deposit Crediting</option>
                    <option value="Custody KYC Verification">Custody KYC Verification</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Subject Heading</label>
                  <input
                    type="text"
                    value={newTicketSubject}
                    disabled
                    placeholder="Traditional Ticket Submission is Disabled"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Elaborate Request / Message Details</label>
                <textarea
                  value={newTicketMessage}
                  disabled
                  rows={3}
                  placeholder="Traditional ticket submissions are disabled. Please redirect your request through the Support Bot."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold cursor-not-allowed font-sans"
                ></textarea>
              </div>

              <button
                type="submit"
                className="py-3 px-5 bg-black hover:bg-slate-900 text-white font-bold text-xs rounded-2xl tracking-wider uppercase transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>

        {/* FAQs and Support Directives (1 column) */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 text-slate-950 border-b border-slate-100 pb-3">
              <BadgeHelp className="w-4 h-4" /> Frequently Answered
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isExpanded = expandedFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className="border border-slate-200/60 rounded-2xl overflow-hidden transition-all bg-slate-50/40 hover:bg-white"
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                      className="w-full text-left p-4 flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer"
                    >
                      <span className="pr-2 leading-snug font-sans">{faq.q}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 text-xs text-slate-500 leading-relaxed font-semibold font-sans">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-100 rounded-3xl p-6 shadow-sm space-y-3">
            <h4 className="font-bold text-amber-900 text-xs flex items-center gap-2 uppercase">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 animate-bounce" /> Safety Warning
            </h4>
            <p className="text-xs text-amber-805 text-amber-950 font-sans font-medium leading-relaxed">
              Client services will never request nor ask for your digital asset private keys, passwords, or recovery codes. Always communicate through secure support ticket systems or verified client representatives directly.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
