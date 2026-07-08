"use client";

import { useEffect, useState } from "react";

import {
  fetchBadges,
  fetchUserBadges,
  type Badge,
} from "@/services/badge.service";

type Props = {
  companyId: string;
};

export default function BadgeCard({
  companyId,
}: Props) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [owned, setOwned] = useState<string[]>([]);

  useEffect(() => {
    loadBadges();
  }, [companyId]);

  async function loadBadges() {
    try {
      const allBadges = await fetchBadges();
      const userBadges =
        await fetchUserBadges(companyId);

      setBadges(allBadges);

      setOwned(
        userBadges.map((b) => b.badge_code)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-2xl bg-white shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        🏅 Achievements
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {badges.map((badge) => {
          const unlocked =
            owned.includes(badge.code);

          return (
            <div
              key={badge.code}
              className={`rounded-xl p-5 border transition
                ${
                  unlocked
                    ? "bg-yellow-50 border-yellow-400"
                    : "bg-slate-100 border-slate-300 opacity-60"
                }`}
            >
              <div className="text-3xl">
                {badge.icon}
              </div>

              <h3 className="font-bold mt-2">
                {badge.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {badge.description}
              </p>

              <p className="mt-3 font-semibold">
                {unlocked
                  ? "✅ 獲得済み"
                  : "🔒 未獲得"}
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
}