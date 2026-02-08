"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { useState } from "react";
import Button from "@/shared/components/button";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { ActivityAtom } from "../(atoms)/usePortfolioStore";

const ease = [0.25, 0.1, 0.25, 1] as const;

export const ActivitiesSection = ({ isLoading }: { isLoading: boolean }) => {
  const activities = useAtomValue(ActivityAtom);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  if (isLoading) {
    return (
      <Section title="Activities">
        <div className="flex flex-col gap-spacing-400">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease }}
                className="grid grid-cols-1 gap-spacing-400 overflow-hidden md:grid-cols-2">
                {Array.from({ length: 19 }).map((_, index) => (
                  <CardSkeleton key={index} hasTags />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            text={isVisible ? "기타 활동 숨기기" : `기타 활동 ${activities.length}개 보기`}
            onClick={toggleVisibility}
          />
        </div>
      </Section>
    );
  }

  return (
    <Section title="Activities">
      <div className="flex flex-col gap-spacing-400">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease }}
              className="grid grid-cols-1 gap-spacing-400 overflow-hidden md:grid-cols-2">
              {activities.map((activitie, index) => (
                <Card
                  key={index}
                  mainText={activitie.name}
                  subText={`${activitie.startDate} ${activitie.endDate ? `- ${activitie.endDate}` : ""} / ${activitie.role}`}
                  tags={activitie.hosts}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          text={isVisible ? "기타 활동 숨기기" : `기타 활동 ${activities.length}개 보기`}
          onClick={toggleVisibility}
        />
      </div>
    </Section>
  );
};
