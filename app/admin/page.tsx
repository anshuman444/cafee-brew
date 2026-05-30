"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import Separator from "@/components/Separator";
import { FiGrid, FiList, FiCheckCircle, FiClock, FiTrash2, FiAward, FiDollarSign, FiUsers } from "react-icons/fi";

interface PlacedOrder {
  id: string;
  name: string;
  category: string;
  basePrice: string;
  totalPrice: string;
  preferences: {
    milk?: string;
    water?: string;
  };
  selectedAddons: { name: string; price: string }[];
  instructions: string;
  timestamp: string;
  status: "Pending" | "Preparing" | "Completed";
}

interface EventBooking {
  id: string;
  eventName: string;
  customerName: string;
  customerEmail: string;
  seats: number;
  totalPrice: string;
  timestamp: string;
}

interface SavedReservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
  timestamp: string;
}

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "events" | "reservations">("orders");
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [bookings, setBookings] = useState<EventBooking[]>([]);
  const [reservations, setReservations] = useState<SavedReservation[]>([]);

  useEffect(() => {
    // Initial data loading from localStorage
    const loadData = () => {
      const storedOrders = localStorage.getItem("zenbrew_orders_v1");
      const storedBookings = localStorage.getItem("zenbrew_bookings_v1");
      const storedReservations = localStorage.getItem("zenbrew_reservations_v1");
      
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      if (storedBookings) setBookings(JSON.parse(storedBookings));
      if (storedReservations) setReservations(JSON.parse(storedReservations));
    };

    loadData();

    // Listen to storage events or set a small polling interval to update dashboard in real-time
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  // Update order status
  const updateOrderStatus = (orderId: string, nextStatus: "Pending" | "Preparing" | "Completed") => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: nextStatus };
      }
      return order;
    });

    setOrders(updated);
    localStorage.setItem("zenbrew_orders_v1", JSON.stringify(updated));
  };

  // Delete an order
  const deleteOrder = (orderId: string) => {
    const updated = orders.filter(order => order.id !== orderId);
    setOrders(updated);
    localStorage.setItem("zenbrew_orders_v1", JSON.stringify(updated));
  };

  // Delete a booking
  const deleteBooking = (bookingId: string) => {
    const updated = bookings.filter(b => b.id !== bookingId);
    setBookings(updated);
    localStorage.setItem("zenbrew_bookings_v1", JSON.stringify(updated));
  };

  // Delete a reservation
  const deleteReservation = (resId: string) => {
    const updated = reservations.filter(r => r.id !== resId);
    setReservations(updated);
    localStorage.setItem("zenbrew_reservations_v1", JSON.stringify(updated));
  };

  // Clear all data
  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all orders, event bookings, and table reservations?")) {
      localStorage.removeItem("zenbrew_orders_v1");
      localStorage.removeItem("zenbrew_bookings_v1");
      localStorage.removeItem("zenbrew_reservations_v1");
      setOrders([]);
      setBookings([]);
      setReservations([]);
    }
  };

  const parsePriceVal = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
  };

  // Calculate quick admin analytics metrics
  const totalRevenue = orders
    .filter(o => o.status === "Completed")
    .reduce((sum, o) => sum + parsePriceVal(o.totalPrice), 0);

  const pendingOrdersCount = orders.filter(o => o.status !== "Completed").length;

  return (
    <div className="bg-primary text-white min-h-screen pb-24">
      {/* Page Hero */}
      <PageHero
        title="Admin Control"
        subtitle="Manage live orders, customize preparation processes, and track seat bookings in real time."
        backgroundImage="/assets/opening-hours/img.png"
      />

      <div className="container mx-auto px-4 mt-16 xl:mt-24 max-w-5xl">
        
        {/* Quick Metrics Analytics Panel */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Revenue */}
          <div className="bg-black/30 border border-white/10 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-secondary text-[11px] uppercase tracking-widest">Completed Sales</p>
              <p className="text-3xl font-primary text-accent font-bold mt-1">₹{totalRevenue.toLocaleString("en-IN")}</p>
            </div>
            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent text-xl bg-accent/5">
              <FiDollarSign />
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-black/30 border border-white/10 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-secondary text-[11px] uppercase tracking-widest">Active Prep Queue</p>
              <p className="text-3xl font-primary text-accent font-bold mt-1">{pendingOrdersCount} Orders</p>
            </div>
            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent text-xl bg-accent/5">
              <FiClock />
            </div>
          </div>

          {/* Event Bookings */}
          <div className="bg-black/30 border border-white/10 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-secondary text-[11px] uppercase tracking-widest">Total Booked Seats</p>
              <p className="text-3xl font-primary text-accent font-bold mt-1">
                {bookings.reduce((sum, b) => sum + b.seats, 0)} Seats
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent text-xl bg-accent/5">
              <FiGrid />
            </div>
          </div>
        </section>

        {/* Dashboard Tabs & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/10 pb-4 mb-8 gap-4">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`pb-2 text-sm uppercase tracking-widest font-semibold transition-colors relative ${
                activeTab === "orders" ? "text-accent" : "text-secondary hover:text-white"
              }`}
            >
              Orders Prep Queue ({orders.length})
              {activeTab === "orders" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              )}
            </button>
            
            <button
              type="button"
              onClick={() => setActiveTab("events")}
              className={`pb-2 text-sm uppercase tracking-widest font-semibold transition-colors relative ${
                activeTab === "events" ? "text-accent" : "text-secondary hover:text-white"
              }`}
            >
              Event Seat Bookings ({bookings.length})
              {activeTab === "events" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reservations")}
              className={`pb-2 text-sm uppercase tracking-widest font-semibold transition-colors relative ${
                activeTab === "reservations" ? "text-accent" : "text-secondary hover:text-white"
              }`}
            >
              Table Reservations ({reservations.length})
              {activeTab === "reservations" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              )}
            </button>
          </div>

          {(orders.length > 0 || bookings.length > 0 || reservations.length > 0) && (
            <button
              type="button"
              onClick={clearAllData}
              className="border border-red-500/20 text-red-400 hover:bg-red-500/5 px-4 py-1.5 rounded text-[11px] uppercase tracking-widest transition-colors font-semibold"
            >
              Reset All Logs
            </button>
          )}
        </div>

        {/* Tab content panels */}
        <div>
          {activeTab === "orders" ? (
            <div className="flex flex-col gap-6">
              {orders.length === 0 ? (
                <div className="text-center py-20 bg-black/10 border border-white/5 rounded-lg text-secondary">
                  <p className="text-lg">No orders in the preparation queue.</p>
                  <p className="text-xs mt-1">Place some orders on the Menu page to populate this screen.</p>
                </div>
              ) : (
                orders.map(order => (
                  <div
                    key={order.id}
                    className="bg-black/40 border border-white/10 rounded-lg p-6 flex flex-col md:flex-row justify-between gap-6 hover:border-white/15 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Status accent strip */}
                    <div className={`absolute top-0 left-0 w-[4px] h-full ${
                      order.status === "Pending" ? "bg-amber-500" :
                      order.status === "Preparing" ? "bg-blue-500" : "bg-emerald-500"
                    }`} />

                    {/* Order Details */}
                    <div className="flex-1 pl-2">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-primary text-lg text-accent tracking-widest font-bold">{order.id}</span>
                        <span className="text-[10px] text-secondary">{order.timestamp}</span>
                        <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                          order.status === "Pending" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                          order.status === "Preparing" ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" :
                          "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      <h3 className="font-primary text-2xl uppercase text-white mb-2">{order.name}</h3>

                      {/* Custom preferences (Steamed milk/Water) */}
                      {(order.preferences.milk || order.preferences.water) && (
                        <div className="flex gap-2 mb-3 text-xs text-accent uppercase tracking-wider font-semibold">
                          {order.preferences.milk && <span>Pref: {order.preferences.milk}</span>}
                          {order.preferences.water && <span>Pref: {order.preferences.water}</span>}
                        </div>
                      )}

                      {/* Selected Addons */}
                      {order.selectedAddons.length > 0 && (
                        <div className="mb-4">
                          <p className="text-[10px] text-secondary uppercase tracking-widest mb-1.5">Addons Included:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {order.selectedAddons.map(addon => (
                              <span key={addon.name} className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-white/80">
                                {addon.name} ({addon.price})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Instructions */}
                      {order.instructions && (
                        <div>
                          <p className="text-[10px] text-secondary uppercase tracking-widest mb-1">Notes/Instructions:</p>
                          <p className="text-xs text-white/70 italic bg-primary/30 p-2.5 rounded border border-white/5 leading-relaxed max-w-xl">
                            &ldquo;{order.instructions}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions and Pricing */}
                    <div className="flex flex-col justify-between items-end gap-4 min-w-[200px] border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                      <div className="text-right">
                        <p className="text-[10px] text-secondary uppercase tracking-widest">Grand Total</p>
                        <p className="text-2xl font-semibold text-accent mt-0.5">{order.totalPrice}</p>
                      </div>

                      {/* Prep Actions */}
                      <div className="flex gap-2 w-full justify-end">
                        {order.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() => updateOrderStatus(order.id, "Preparing")}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded transition-colors font-semibold"
                          >
                            Accept & Prep
                          </button>
                        )}
                        {order.status === "Preparing" && (
                          <button
                            type="button"
                            onClick={() => updateOrderStatus(order.id, "Completed")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded transition-colors font-semibold"
                          >
                            Complete Order
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteOrder(order.id)}
                          className="border border-white/10 hover:border-red-500/30 text-secondary hover:text-red-400 p-2.5 rounded transition-colors"
                          aria-label="Delete Order log"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : activeTab === "events" ? (
            <div className="flex flex-col gap-6">
              {bookings.length === 0 ? (
                <div className="text-center py-20 bg-black/10 border border-white/5 rounded-lg text-secondary">
                  <p className="text-lg">No event bookings registered.</p>
                  <p className="text-xs mt-1">Book some seats on the Events page to populate this screen.</p>
                </div>
              ) : (
                bookings.map(booking => (
                  <div
                    key={booking.id}
                    className="bg-black/40 border border-white/10 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-white/15 transition-all duration-300 w-full"
                  >
                    <div className="flex-1 w-full text-left">
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <span className="font-primary text-lg text-accent tracking-widest font-bold">{booking.id}</span>
                        <span className="text-[10px] text-secondary">{booking.timestamp}</span>
                      </div>
                      
                      <h3 className="font-primary text-2xl uppercase text-white mb-2 leading-none">{booking.eventName}</h3>
                      
                      <div className="flex flex-col gap-1 text-xs text-secondary mt-3">
                        <p>Customer Name: <strong className="text-white">{booking.customerName}</strong></p>
                        <p>Customer Email: <strong className="text-white">{booking.customerEmail}</strong></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 justify-between md:justify-end w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                      <div className="text-left md:text-right flex-shrink-0">
                        <p className="text-[10px] text-secondary uppercase tracking-widest">Seats Booked</p>
                        <p className="text-lg font-bold text-white flex items-center gap-1.5 md:justify-end mt-0.5">
                          <FiUsers className="text-accent text-sm" /> {booking.seats} Seats
                        </p>
                        <p className="text-xs text-accent mt-0.5 font-semibold">Total Cost: {booking.totalPrice}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteBooking(booking.id)}
                        className="border border-white/10 hover:border-red-500/30 text-secondary hover:text-red-400 p-2.5 rounded transition-colors"
                        aria-label="Delete booking log"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {reservations.length === 0 ? (
                <div className="text-center py-20 bg-black/10 border border-white/5 rounded-lg text-secondary">
                  <p className="text-lg">No table reservations registered.</p>
                  <p className="text-xs mt-1">Book some tables on the Reservation page to populate this screen.</p>
                </div>
              ) : (
                reservations.map(res => (
                  <div
                    key={res.id}
                    className="bg-black/40 border border-white/10 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-white/15 transition-all duration-300 w-full"
                  >
                    <div className="flex-1 w-full text-left">
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <span className="font-primary text-lg text-accent tracking-widest font-bold">{res.id}</span>
                        <span className="text-[10px] text-secondary">{res.timestamp}</span>
                      </div>
                      
                      <h3 className="font-primary text-2xl uppercase text-white mb-2 leading-none">Table Booking - {res.guests}</h3>
                      
                      <div className="flex flex-col gap-1 text-xs text-secondary mt-3">
                        <p>Customer Name: <strong className="text-white">{res.name}</strong></p>
                        <p>Contact Number: <strong className="text-white">{res.phone}</strong> | Email: <strong className="text-white">{res.email}</strong></p>
                        <p>Reservation Schedule: <strong className="text-accent">{res.date} at {res.time}</strong></p>
                        {res.requests && (
                          <p className="text-white bg-primary/40 p-2 rounded text-[11px] leading-relaxed italic mt-2">&ldquo;{res.requests}&rdquo;</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-8 justify-between md:justify-end w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                      <button
                        type="button"
                        onClick={() => deleteReservation(res.id)}
                        className="border border-white/10 hover:border-red-500/30 text-secondary hover:text-red-400 p-2.5 rounded transition-colors ml-auto"
                        aria-label="Delete reservation log"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminPage;
