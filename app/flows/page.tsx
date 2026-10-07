"use client";

import * as React from "react";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Key,
  Layers,
  Lock,
  Mail,
  Minus,
  Plus,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Trash2,
  User,
  UserPlus,
  Workflow,
  X,
} from "lucide-react";
import { Header } from "@/components/docs/header";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export default function FlowsPage() {
  const { toast } = useToast();
  const [activeFlow, setActiveFlow] = React.useState<"user" | "auth" | "booking" | "ecommerce">("user");

  // 1. Create User Flow States
  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userRole, setUserRole] = React.useState("Engineer");
  const [userErrors, setUserErrors] = React.useState<{ name?: string; email?: string }>({});
  const [isSubmittingUser, setIsSubmittingUser] = React.useState(false);
  const [usersList, setUsersList] = React.useState([
    { id: "1", name: "Sarah Chen", email: "sarah@rose-ui.dev", role: "Architect" },
    { id: "2", name: "Marcus Thorne", email: "marcus@rose-ui.dev", role: "Admin" },
  ]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string } = {};
    if (!userName.trim()) errors.name = "Full name is required.";
    if (!userEmail.trim()) {
      errors.email = "Work email is required.";
    } else if (!userEmail.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }

    if (Object.keys(errors).length > 0) {
      setUserErrors(errors);
      return;
    }

    setUserErrors({});
    setIsSubmittingUser(true);
    setTimeout(() => {
      setIsSubmittingUser(false);
      setUserModalOpen(false);
      setUsersList((prev) => [
        ...prev,
        { id: String(Date.now()), name: userName, email: userEmail, role: userRole },
      ]);
      setUserName("");
      setUserEmail("");
      toast({
        title: "User created successfully",
        description: `${userName} has been invited as ${userRole}.`,
        variant: "success",
      });
    }, 700);
  };

  // 2. Auth Flow States
  const [authStep, setAuthStep] = React.useState<"login" | "dashboard" | "forgot" | "otp" | "resetSuccess">("login");
  const [loginEmail, setLoginEmail] = React.useState("alex.dev@rose-ui.dev");
  const [loginPass, setLoginPass] = React.useState("••••••••••••");
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setAuthStep("dashboard");
      toast({ title: "Welcome back", description: "Authenticated as alex.dev@rose-ui.dev", variant: "success" });
    }, 800);
  };

  // 3. Booking Flow States
  const [bookingStep, setBookingStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = React.useState("Architecture Review (45m)");
  const [bookingDate, setBookingDate] = React.useState<Date | undefined>(undefined);
  React.useEffect(() => {
    setBookingDate(new Date(2026, 9, 15));
  }, []);
  const [selectedTime, setSelectedTime] = React.useState("10:00 AM");
  const [clientName, setClientName] = React.useState("Alex Rivera");
  const [clientEmail, setClientEmail] = React.useState("alex@company.com");

  // 4. E-commerce Flow States
  const [cartDrawerOpen, setCartDrawerOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([
    { id: "item-1", name: "Studio Mechanical Keypad", price: 140, quantity: 1, variant: "Obsidian Black" },
  ]);
  const [checkoutStep, setCheckoutStep] = React.useState<"cart" | "checkout" | "confirmed">("cart");

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" dot>Interactive Orchestrations</Badge>
            <span className="text-[11px] font-mono text-muted-foreground">Multi-Step Production Workflows</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-mono">
            Interactive Flows
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Witness how ROSE UI components seamlessly connect to form complete application flows:
            form validations, modals, state transitions, date picking, and cart checkouts.
          </p>
        </div>

        {/* Flow Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-border/60 pb-2 overflow-x-auto">
          {[
            { id: "user", label: "01. Create User Flow" },
            { id: "auth", label: "02. Authentication Flow" },
            { id: "booking", label: "03. Booking Flow (Date Picker)" },
            { id: "ecommerce", label: "04. E-commerce & Cart Flow" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFlow(tab.id as any)}
              className={cn(
                "rounded-[5px] px-3.5 py-1.5 text-xs font-mono transition-all whitespace-nowrap cursor-pointer select-none",
                activeFlow === tab.id
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* FLOW 1: CREATE USER FLOW */}
        {/* ========================================================================= */}
        {activeFlow === "user" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground font-mono">
                  Organization Directory & User Provisioning
                </h3>
                <p className="text-xs text-muted-foreground">
                  Click &ldquo;Add User&rdquo; to launch the modal form with validation, submitting state, and toast notification.
                </p>
              </div>

              <Dialog open={userModalOpen} onOpenChange={setUserModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2 font-mono text-xs">
                    <UserPlus className="h-3.5 w-3.5" />
                    <span>Add User</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite New Member</DialogTitle>
                    <DialogDescription>
                      Assign organization permissions and send provisioning credentials.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleCreateUser} className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-muted-foreground">Full Name</label>
                      <Input
                        placeholder="e.g. Alex Rivera"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        isError={Boolean(userErrors.name)}
                      />
                      {userErrors.name && (
                        <p className="text-[11px] font-mono text-muted-foreground">{userErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-muted-foreground">Work Email</label>
                      <Input
                        type="email"
                        placeholder="alex@company.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        isError={Boolean(userErrors.email)}
                      />
                      {userErrors.email && (
                        <p className="text-[11px] font-mono text-muted-foreground">{userErrors.email}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-muted-foreground">Role</label>
                      <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        className="w-full h-9 rounded-[6px] border border-input bg-card px-2.5 text-xs text-foreground font-mono focus:ring-1 focus:ring-ring outline-none"
                      >
                        <option value="Architect">Architect</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Designer">Designer</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>

                    <DialogFooter className="pt-2">
                      <DialogClose asChild>
                        <Button variant="ghost" size="sm">Cancel</Button>
                      </DialogClose>
                      <Button size="sm" isLoading={isSubmittingUser} type="submit">
                        Confirm & Invite
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Users Table */}
            <div className="rounded-[8px] border border-border/80 overflow-hidden bg-card">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-secondary/40 border-b border-border/60 text-[11px] uppercase text-muted-foreground">
                  <tr>
                    <th className="p-3.5 pl-6 font-semibold">User</th>
                    <th className="p-3.5 font-semibold">Email</th>
                    <th className="p-3.5 font-semibold">Role</th>
                    <th className="p-3.5 pr-6 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-[11px]">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="p-3.5 pl-6 font-semibold text-foreground font-sans">{u.name}</td>
                      <td className="p-3.5 text-muted-foreground">{u.email}</td>
                      <td className="p-3.5 text-foreground">{u.role}</td>
                      <td className="p-3.5 pr-6 text-right">
                        <Badge dot variant="outline" className="text-[10px]">Active</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FLOW 2: AUTHENTICATION FLOW */}
        {/* ========================================================================= */}
        {activeFlow === "auth" && (
          <div className="max-w-md mx-auto space-y-6">
            {authStep === "login" && (
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-[4px] bg-foreground text-background font-mono font-bold text-xs mb-1">
                    R
                  </div>
                  <CardTitle className="font-mono text-base">Sign in to Console</CardTitle>
                  <CardDescription>Enter credentials to access cloud clusters</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-muted-foreground">Email</label>
                      <Input
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        leftIcon={<Mail className="h-3.5 w-3.5" />}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-muted-foreground">Password</span>
                        <button
                          type="button"
                          onClick={() => setAuthStep("forgot")}
                          className="text-foreground hover:underline"
                        >
                          Forgot?
                        </button>
                      </div>
                      <Input
                        type="password"
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        leftIcon={<Lock className="h-3.5 w-3.5" />}
                      />
                    </div>

                    <Button className="w-full" isLoading={isLoggingIn} type="submit">
                      Authenticate
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {authStep === "dashboard" && (
              <Card className="text-center p-8 space-y-4">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="h-5 w-5 stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="font-mono text-lg">Dashboard Authenticated</CardTitle>
                  <CardDescription>Session token issued for {loginEmail}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setAuthStep("login")}>
                  Sign Out
                </Button>
              </Card>
            )}

            {authStep === "forgot" && (
              <Card className="space-y-4 p-6">
                <CardHeader className="p-0">
                  <CardTitle className="font-mono text-sm">Reset Password</CardTitle>
                  <CardDescription>We will send a 6-digit verification code</CardDescription>
                </CardHeader>
                <Input defaultValue="alex.dev@rose-ui.dev" />
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setAuthStep("login")}>Back</Button>
                  <Button size="sm" className="flex-1" onClick={() => setAuthStep("otp")}>Send Code</Button>
                </div>
              </Card>
            )}

            {authStep === "otp" && (
              <Card className="space-y-4 p-6 text-center">
                <CardHeader className="p-0">
                  <CardTitle className="font-mono text-sm">Enter OTP Code</CardTitle>
                  <CardDescription>Code sent to alex.dev@rose-ui.dev</CardDescription>
                </CardHeader>
                <Input
                  className="text-center font-mono tracking-widest text-base"
                  placeholder="000000"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                />
                <Button
                  className="w-full"
                  disabled={otpCode.length < 4}
                  onClick={() => {
                    setAuthStep("resetSuccess");
                    toast({ title: "Verified", description: "Password reset allowed.", variant: "success" });
                  }}
                >
                  Verify Code
                </Button>
              </Card>
            )}

            {authStep === "resetSuccess" && (
              <Card className="space-y-4 p-6 text-center">
                <CheckCircle2 className="h-8 w-8 mx-auto text-foreground" />
                <CardTitle className="font-mono text-sm">Password Reset Complete</CardTitle>
                <Button size="sm" onClick={() => setAuthStep("login")}>Return to Sign In</Button>
              </Card>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* FLOW 3: BOOKING FLOW (DATE PICKER) */}
        {/* ========================================================================= */}
        {activeFlow === "booking" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-mono text-sm">Service Consultation Booking</CardTitle>
                    <CardDescription>Select service, date, and preferred time slot</CardDescription>
                  </div>
                  <Badge variant="outline">Step {bookingStep} of 4</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {bookingStep === 1 && (
                  <div className="space-y-3">
                    <label className="text-xs font-mono text-muted-foreground uppercase">Choose Service</label>
                    <div className="space-y-2">
                      {[
                        "Architecture Review (45m)",
                        "Codebase Security Audit (60m)",
                        "Performance Tuning Session (30m)",
                      ].map((s) => (
                        <div
                          key={s}
                          onClick={() => setSelectedService(s)}
                          className={cn(
                            "flex items-center justify-between p-3.5 rounded-[6px] border cursor-pointer transition-colors text-xs font-mono",
                            selectedService === s
                              ? "border-foreground bg-secondary/80 font-semibold"
                              : "border-border hover:bg-secondary/30"
                          )}
                        >
                          <span>{s}</span>
                          {selectedService === s && <Check className="h-4 w-4" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-4 text-center">
                    <label className="text-xs font-mono text-muted-foreground uppercase block text-left">
                      Pick Date (Custom Calendar)
                    </label>
                    <div className="flex justify-center">
                      <DatePicker date={bookingDate} onSelect={setBookingDate} />
                    </div>
                    <p className="text-xs font-mono text-muted-foreground">
                      Selected: {bookingDate?.toDateString()}
                    </p>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-3">
                    <label className="text-xs font-mono text-muted-foreground uppercase">Pick Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={cn(
                            "p-2.5 rounded-[4px] border text-xs font-mono text-center transition-colors",
                            selectedTime === t
                              ? "bg-foreground text-background font-semibold"
                              : "border-border hover:bg-secondary"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {bookingStep === 4 && (
                  <div className="space-y-4">
                    <div className="rounded-[6px] border border-border p-4 space-y-2 font-mono text-xs bg-secondary/30">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service:</span>
                        <span className="font-semibold text-foreground">{selectedService}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-semibold text-foreground">{bookingDate?.toDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-semibold text-foreground">{selectedTime}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Your name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                      />
                      <Input
                        placeholder="Your email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="justify-between border-t border-border/40 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={bookingStep === 1}
                  onClick={() => setBookingStep((s) => (s > 1 ? ((s - 1) as any) : s))}
                >
                  Back
                </Button>
                {bookingStep < 4 ? (
                  <Button size="sm" onClick={() => setBookingStep((s) => (s + 1 as any))}>
                    Continue <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Booking confirmed!",
                        description: `Scheduled for ${bookingDate?.toDateString()} at ${selectedTime}.`,
                        variant: "success",
                      });
                      setBookingStep(1);
                    }}
                  >
                    Confirm Booking
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FLOW 4: E-COMMERCE & CART FLOW */}
        {/* ========================================================================= */}
        {activeFlow === "ecommerce" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Product Showcase Card */}
              <Card className="overflow-hidden">
                <div className="h-48 bg-secondary/50 flex items-center justify-center border-b border-border font-mono text-muted-foreground text-xs">
                  [ Obsidian Series Keyboard Hardware ]
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-base">Studio Mechanical Keypad</CardTitle>
                    <span className="font-mono font-bold text-sm text-foreground">$140</span>
                  </div>
                  <CardDescription>
                    CNC anodized aluminum body, hot-swappable tactile switches, and monochrome keycaps.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between pt-0">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                    <span>★★★★★</span>
                    <span>(4.9 / 5.0)</span>
                  </div>
                  <Button
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                      setCartDrawerOpen(true);
                      toast({
                        title: "Added to cart",
                        description: "Studio Mechanical Keypad added to bag.",
                        variant: "success",
                      });
                    }}
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>

              {/* Cart Drawer / Panel Preview */}
              <Card>
                <CardHeader className="border-b border-border/40 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-sm">Shopping Bag</CardTitle>
                    <Badge variant="outline">{cartItems.length} Item</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between font-mono text-xs border-b border-border/30 pb-3">
                      <div>
                        <div className="font-semibold text-foreground">{item.name}</div>
                        <div className="text-[11px] text-muted-foreground">{item.variant}</div>
                        <div className="text-[11px] text-foreground font-semibold mt-1">${item.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="h-6 w-6 rounded border border-border flex items-center justify-center hover:bg-secondary"
                          onClick={() => {
                            if (item.quantity > 1) {
                              setCartItems((prev) =>
                                prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
                              );
                            }
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          className="h-6 w-6 rounded border border-border flex items-center justify-center hover:bg-secondary"
                          onClick={() => {
                            setCartItems((prev) =>
                              prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
                            );
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between font-mono text-xs pt-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold text-foreground">${cartTotal}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Checkout initiated",
                        description: `Order total $${cartTotal} confirmed.`,
                        variant: "success",
                      });
                    }}
                  >
                    Proceed to Checkout (${cartTotal})
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
