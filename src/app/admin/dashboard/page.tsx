"use client";

import {
  Shield,
  Globe,
  AlertTriangle,
  Users,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="text-primary" size={32} />

        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-muted-foreground">
            Manage CulturalVault heritage data
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="border rounded-2xl p-6">
          <Globe className="mb-4 text-primary" />
          <h3>Total Sites</h3>
          <p className="text-3xl font-bold">8</p>
        </div>

        <div className="border rounded-2xl p-6">
          <AlertTriangle className="mb-4 text-red-500" />
          <h3>High Risk</h3>
          <p className="text-3xl font-bold">1</p>
        </div>

        <div className="border rounded-2xl p-6">
          <Users className="mb-4 text-blue-500" />
          <h3>Visitors</h3>
          <p className="text-3xl font-bold">12K</p>
        </div>

        <div className="border rounded-2xl p-6">
          <Shield className="mb-4 text-green-500" />
          <h3>Protected Sites</h3>
          <p className="text-3xl font-bold">7</p>
        </div>
      </div>

      <div className="border rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Heritage Site Management
        </h2>

        <button className="bg-primary text-white px-5 py-3 rounded-xl">
          Add Heritage Site
        </button>
      </div>
    </div>
  );
}