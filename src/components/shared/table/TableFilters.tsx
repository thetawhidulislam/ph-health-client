"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FilterOption {
  label: string;
  value: string;
}

interface GenderFilterProps {
  value: string;
  options: FilterOption[];
  onApply: (value: string) => void;
  onClear: () => void;
}

interface AppointmentFeeFilterProps {
  min: string;
  max: string;
  onApply: (min: string, max: string) => void;
  onClear: () => void;
}

interface TableFiltersProps {
  genderFilter: GenderFilterProps;
  appointmentFeeFilter: AppointmentFeeFilterProps;
  disabled?: boolean;
}

const TableFilters = ({
  genderFilter,
  appointmentFeeFilter,
  disabled = false,
}: TableFiltersProps) => {
  const [draftGender, setDraftGender] = useState(genderFilter.value);
  const [feeMin, setFeeMin] = useState(appointmentFeeFilter.min);
  const [feeMax, setFeeMax] = useState(appointmentFeeFilter.max);

  return (
    <div className="rounded-3xl border border-border/70 bg-background/80 p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-semibold">Doctor filters</p>
          <p className="text-sm text-muted-foreground">
            Filter doctors by gender and appointment fee range.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setDraftGender("");
              setFeeMin("");
              setFeeMax("");
              genderFilter.onClear();
              appointmentFeeFilter.onClear();
            }}
            disabled={disabled}
          >
            Clear all
          </Button>
          <Button
            size="sm"
            onClick={() => {
              genderFilter.onApply(draftGender);
              appointmentFeeFilter.onApply(feeMin, feeMax);
            }}
            disabled={disabled}
          >
            Apply filters
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[240px_minmax(560px,1fr)]">
        <div className="rounded-2xl border border-border/70 bg-background p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Gender</p>
              <p className="text-xs text-muted-foreground">Pick one option</p>
            </div>
          </div>
          <div className="space-y-2">
            {genderFilter.options.map((option, index) => (
              <button
                key={`${option.value}-${index}`}
                type="button"
                onClick={() => {
                  setDraftGender(option.value);
                  genderFilter.onApply(option.value);
                }}
                disabled={disabled}
                className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-sm transition ${
                  draftGender === option.value
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-transparent text-foreground hover:border-primary/70 hover:bg-primary/5"
                }`}
              >
                <span>{option.label}</span>
                <span className="text-xs text-muted-foreground">
                  {option.value === draftGender ? "Selected" : ""}
                </span>
              </button>
            ))}
          </div>
        </div>


          <div className="rounded-2xl border border-border/70 bg-background p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Fee range</p>
              <p className="text-xs text-muted-foreground">
                Set minimum and maximum appointment fee.
              </p>
            </div>
            <span className="rounded-full bg-foreground/5 px-2 py-1 text-xs text-muted-foreground">
              Optional
            </span>
          </div>
          <div className="grid gap-3">
            <div>
              <Label htmlFor="fee-min">Min fee</Label>
              <Input
                id="fee-min"
                type="number"
                value={feeMin}
                placeholder="0"
                disabled={disabled}
                onChange={(event) => setFeeMin(event.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="fee-max">Max fee</Label>
              <Input
                id="fee-max"
                type="number"
                value={feeMax}
                placeholder="0"
                disabled={disabled}
                onChange={(event) => setFeeMax(event.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
