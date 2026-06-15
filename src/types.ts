export enum ActiveTab {
  Dashboard = "Dashboard",
  USD_Account = "USD Account",
  Deposit_Instructions = "Deposit Instructions",
  Make_Payment = "Make a Payment",
  Help_Support = "Help & Support",
}

export interface UserProfile {
  fullName: string;
  occupation: string;
  dob: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  usdBalance: number;
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  status: "completed" | "pending" | "failed";
  reference?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: "open" | "resolved" | "in_progress";
  createdAt: string;
  messages: {
    sender: "user" | "support";
    text: string;
    timestamp: string;
  }[];
}
