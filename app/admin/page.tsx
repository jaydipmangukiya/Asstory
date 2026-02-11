"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, FileText } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/authentication/AuthProvider";
import { PERMISSIONS } from "@/lib/constant";
import { hasAccess } from "@/lib/permissions";
import PropertyCharts from "@/components/PropertyCharts";
import AuctionPropertyCharts from "@/components/AuctionPropertyCharts";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchStats = useCallback(async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (err: any) {
      toast({
        title: "Failed to load dashboard data ❌",
        description: err?.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (
      !hasAccess(
        user?.permissions,
        PERMISSIONS.DASHBOARD.actions.VIEW,
        user?.role,
      )
    ) {
      return;
    }
    fetchStats();
  }, [user, fetchStats]);

  const cards = stats
    ? [
        {
          title: "Total Users",
          value: stats.totalUsers.toLocaleString(),
          icon: <Users className="h-6 w-6" />,
          color: "text-blue-600",
        },
        {
          title: "Properties Listed",
          value: stats.propertiesListed.toLocaleString(),
          icon: <Building2 className="h-6 w-6" />,
          color: "text-emerald-600",
        },
        {
          title: "Valuations Today",
          value: stats.valuationsToday,
          icon: <FileText className="h-6 w-6" />,
          color: "text-orange-600",
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600">Welcome to Assetory Admin Panel</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))
          : cards.map((stat, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {stat.value}
                      </p>
                    </div>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Property Charts Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Property Analytics
        </h2>
        <PropertyCharts />
      </div>

      {/* Auction Property Charts Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Auction Property Analytics
        </h2>
        <AuctionPropertyCharts />
      </div>
    </div>
  );
}

const StatCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-7 w-16 bg-slate-300 rounded" />
          </div>
          <div className="h-6 w-6 bg-slate-200 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};
