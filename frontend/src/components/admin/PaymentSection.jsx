import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  Search,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
} from "lucide-react";

const PaymentSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock payment data
  const payments = [
    {
      id: "PAY001",
      userName: "Priya Sharma",
      userEmail: "priya.sharma@email.com",
      amount: 15000,
      type: "Success Fee",
      status: "completed",
      paymentMethod: "UPI",
      transactionId: "TXN123456789",
      date: "2024-01-20",
      description: "Marriage finalized - Priya & Rahul",
    },
    {
      id: "PAY002",
      userName: "Kumar Family",
      userEmail: "kumar.family@email.com",
      amount: 5000,
      type: "Premium Service",
      status: "completed",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN987654321",
      date: "2024-01-19",
      description: "Premium matchmaking service",
    },
    {
      id: "PAY003",
      userName: "Anjali Agarwal",
      userEmail: "anjali.agarwal@email.com",
      amount: 2500,
      type: "Consultation Fee",
      status: "pending",
      paymentMethod: "Credit Card",
      transactionId: "TXN456789123",
      date: "2024-01-18",
      description: "Family consultation session",
    },
    {
      id: "PAY004",
      userName: "Vikram Singh",
      userEmail: "vikram.singh@email.com",
      amount: 1000,
      type: "Profile Boost",
      status: "failed",
      paymentMethod: "UPI",
      transactionId: "TXN789123456",
      date: "2024-01-17",
      description: "Profile visibility boost",
    },
  ];

  // Mock revenue data
  const revenueStats = {
    totalRevenue: 125000,
    monthlyRevenue: 45600,
    pendingPayments: 7500,
    successFees: 89000,
    premiumServices: 28000,
    consultationFees: 8000,
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      },
      failed: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle,
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Management
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Track payments, revenue, and financial transactions
          </p>
        </CardHeader>
      </Card>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ₹{revenueStats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-xs text-green-600 mt-2">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +15% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">
                  ₹{revenueStats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-xs text-blue-600 mt-2">
              Current month earnings
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Fees</p>
                <p className="text-2xl font-bold">
                  ₹{revenueStats.successFees.toLocaleString()}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-xs text-purple-600 mt-2">
              Marriage completion fees
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Payments
                </p>
                <p className="text-2xl font-bold">
                  ₹{revenueStats.pendingPayments.toLocaleString()}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="text-xs text-yellow-600 mt-2">
              Awaiting confirmation
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("completed")}
              >
                Completed
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "failed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("failed")}
              >
                Failed
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Transaction</th>
                  <th className="text-left p-3 font-medium">User</th>
                  <th className="text-left p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{payment.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {payment.transactionId}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{payment.userName}</div>
                        <div className="text-sm text-muted-foreground">
                          {payment.userEmail}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-lg">
                        ₹{payment.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {payment.paymentMethod}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{payment.type}</Badge>
                    </td>
                    <td className="p-3">{getStatusBadge(payment.status)}</td>
                    <td className="p-3">
                      <div className="text-sm">
                        {new Date(payment.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Service Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Success Fees</div>
                  <div className="text-sm text-muted-foreground">
                    Marriage completion fees
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    ₹{revenueStats.successFees.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">71%</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Premium Services</div>
                  <div className="text-sm text-muted-foreground">
                    Enhanced matchmaking
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    ₹{revenueStats.premiumServices.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">22%</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Consultation Fees</div>
                  <div className="text-sm text-muted-foreground">
                    Family consultations
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    ₹{revenueStats.consultationFees.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">7%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">UPI Payments</div>
                    <div className="text-sm text-muted-foreground">
                      45 transactions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹67,500</div>
                  <div className="text-sm text-muted-foreground">54%</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Bank Transfer</div>
                    <div className="text-sm text-muted-foreground">
                      23 transactions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹42,100</div>
                  <div className="text-sm text-muted-foreground">34%</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-muted-foreground">
                      12 transactions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹15,400</div>
                  <div className="text-sm text-muted-foreground">12%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSection;
